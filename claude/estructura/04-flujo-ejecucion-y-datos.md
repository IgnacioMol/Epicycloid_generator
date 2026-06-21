# 04 — Flujo de ejecución y de datos

## Integración p5.js ↔ Angular (RNF3) y por qué es *zoneless*

`Canvas` crea una instancia de p5.js en **modo *instance*** dentro de `initSketch()`, pasándole el contenedor del DOM. p5 define sus *callbacks* `setup`, `draw`, `windowResized` y `mouseWheel`, y arranca su **propio bucle de render con `requestAnimationFrame` a 60 fps**.

El proyecto **no incluye `zone.js`** (es *zoneless*). Esto es deliberado y tiene una consecuencia decisiva:

> Sin Zone.js, el bucle de p5 (que se apoya en `requestAnimationFrame`) **no provoca ciclos de detección de cambios de Angular en cada fotograma**. Si Zone.js estuviera presente, parchearía `requestAnimationFrame` y Angular re-evaluaría la vista 60 veces por segundo innecesariamente. Al ser *zoneless*, el dibujo a 60 fps corre "por su cuenta" y Angular solo trabaja cuando hay un evento real del usuario o cambia una señal. Esto satisface **RNF8** (minimizar CPU en animación continua) y **RNF5** (rendimiento fluido) de forma elegante, sin necesidad de `ngZone.runOutsideAngular`.

¿Qué dispara entonces la detección de cambios en Angular? Los eventos de plantilla (`(click)`, `(ngModelChange)`…) y los cambios de **señales** (signals). Por eso la interfaz reacciona a las acciones del usuario, pero el lienzo no carga la detección de cambios.

## El hub de estado: `PatternService`

`PatternService` ([pattern.service.ts](src/app/core/pattern.service.ts)) centraliza el estado y la comunicación. Expone:

- **Dos observables (RxJS)** como canales de comunicación:
  - `params$` (un `BehaviorSubject<PatternParams>`): los **parámetros activos**. Cuando cambian, el lienzo se entera.
  - `action$` (un `Subject<CanvasAction>`): **órdenes puntuales** al lienzo (`'play' | 'pause' | 'clear' | 'reset' | 'import-json' | 'undo'`).
- **Estado mutable compartido** (leído directamente por el lienzo y el exportador):
  - `lineHistory: LineRecord[]` — todas las líneas dibujadas.
  - `sessions: SimulationSession[]` — los bloques de animación completados.
  - `canvasDimensions`, `importState`, y el estado interno de la sesión activa.
- **Métodos** para manipular ese estado: `updateParams()`, `dispatch()`, `beginSession()`, `endSession()`, `incrementSessionFrame()`, `setCurrentState()`, `snapshotActiveSession()`, `removeLastSession()`, `replaySessionsToLines()`, `clearSessions()`.

**Por qué observables + estado mutable mezclados:** los observables sirven para *avisar* (Controls → Canvas) de forma reactiva y desacoplada (los componentes no se conocen entre sí, RNF6). El estado mutable (`lineHistory`, `sessions`) lo lee el bucle de p5 directamente cada fotograma, sin pasar por Angular, para que el dibujo sea barato (RNF8).

## Flujo de datos: editar un parámetro (RF2, RF3)

```
Usuario edita un control (ngModel)
  → Controls.onParamChange()
    → PatternService.updateParams(params)         // paramsSubject.next(...)
      → Canvas (suscrito a params$) actualiza su copia this.params
        → el próximo draw() del bucle p5 ya usa los nuevos valores  → cambio visible
```

No hay recarga de página ni petición a servidor: el redibujado es **dinámico** (RF3) y **en tiempo real** (RF2). El lienzo refleja el cambio en el siguiente fotograma (≤ ~16 ms).

## Flujo de control: una acción (play, pausa, deshacer…)

```
Usuario pulsa un botón
  → Controls.play() / pause() / clear() / reset() / ...
    → PatternService.dispatch('play' | 'pause' | 'undo' | ...)   // actionSubject.next(...)
      → Canvas (suscrito a action$) ejecuta onAction(accion)
        → cambia banderas internas (isPaused, isDrawing, trailDirty, ...) o
          marca acciones pendientes (clearPending, resetPending)
            → el bucle draw() actúa en consecuencia
```

Las suscripciones se crean en `ngAfterViewInit()` de `Canvas` y se liberan en `ngOnDestroy()` (buena higiene de memoria, RNF6/RNF8).

## El bucle de dibujo `draw()` (cada fotograma)

Resumen de lo que hace `draw()` en cada fotograma (detalle de rendimiento en [05](05-renderizado-rendimiento.md)):

1. Procesa acciones pendientes (`clearPending`, `resetPending`, cambio de modo).
2. Calcula las posiciones de los dos planetas (ver [03 — Modelo matemático](03-modelo-matematico.md)).
3. Pinta en la capa de estela solo los **segmentos nuevos**; repinta el fondo + la estela + las guías y planetas vivos.
4. **Si no está en pausa y está dibujando:** añade la nueva línea a `lineHistory`, avanza la sesión (`incrementSessionFrame()`, `setCurrentState()`) e incrementa los ángulos.

## Sesiones: qué son y por qué

Una **sesión** es cada bloque de animación entre que el usuario pulsa **Play** y **Pausa**:

- `play()` → `beginSession(params)` captura los parámetros del bloque.
- Mientras dibuja, `incrementSessionFrame()` cuenta fotogramas y `setCurrentState()` guarda el estado final (ángulos y punto extremo).
- `pause()` → `endSession()` registra la sesión en `sessions[]` (con sus parámetros, nº de fotogramas, duración y estado final).

**Por qué importan:** las sesiones permiten (a) **exportar/importar** el patrón como una secuencia de bloques reproducible (E/S JSON, parte de RF7), y (b) el **deshacer por sesiones** (RF5): quitar la última sesión y recomputar el dibujo reproduciendo las restantes con `replaySessionsToLines()`.

**Invariante clave:** estando en pausa, `lineHistory` equivale exactamente al *replay* de `sessions[]`. Sobre esa garantía se construyen el deshacer y la importación.
