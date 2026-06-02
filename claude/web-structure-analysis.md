# Análisis de la estructura de la aplicación web — TFG Epicycloid Generator

> Documento de análisis técnico. Referencia cruzada con `requirements.md`, `architecture.md` e `implementation-notes.md`.

---

## 1. Visión general

El **Epicycloid Generator** es una aplicación web de una sola página (SPA) que permite generar composiciones artísticas paramétricas a partir de la interferencia entre dos órbitas planetarias independientes. El usuario manipula en tiempo real los parámetros geométricos (radios, velocidades, fases, factores elípticos, inclinación) y visuales (color, opacidad, grosor) mientras observa cómo el patrón se dibuja sobre un lienzo interactivo.

La aplicación cubre dos casos de uso diferenciados:

| Modo | Descripción |
|---|---|
| **Intersección de líneas** | Ambas órbitas parten del centro. Cada fotograma se traza una línea entre los dos planetas. El patrón resultante es similar a las curvas de Lissajous y al *string art*. |
| **Curva epicicloidal** | La órbita 2 gira alrededor del extremo de la órbita 1. Se traza el camino del punto resultante, produciendo epiciclos clásicos. |

---

## 2. Stack tecnológico

| Capa | Tecnología | Justificación |
|---|---|---|
| Framework UI | Angular 21 (standalone) | Gestión de estado reactiva, inyección de dependencias, componentes desacoplados |
| Motor gráfico | p5.js 2.2.3 (modo instancia) | API de canvas de alto nivel; loop `draw()` integrable en Angular sin modo global |
| Estado compartido | RxJS (`BehaviorSubject` / `Subject`) | Comunicación desacoplada entre Controls y Canvas sin referencias directas |
| Estilos | Bootstrap 5.3 + CSS encapsulado | Layout de columnas responsive; estilos de componente sin colisiones |
| Tests | Vitest 4 + jsdom | Tests unitarios de lógica de servicio en entorno simulado de DOM |
| Despliegue | Vercel | Build estático Angular, sin backend; CI/CD automático desde `main` |

---

## 3. Arquitectura de la aplicación

### 3.1 Patrón general

La aplicación sigue una arquitectura de **componentes desacoplados coordinados por un servicio singleton**. No hay routing (SPA de una sola vista). El estado fluye de forma unidireccional:

```
Controls → PatternService → Canvas
```

Los componentes nunca se comunican entre sí directamente. La única fuente de verdad para los parámetros es `PatternService`.

### 3.2 Estructura de carpetas

```
src/app/
├── app.ts / app.html / app.css      # Componente raíz — layout shell Bootstrap
├── app.config.ts                    # Bootstrap de Angular (providers globales)
├── app.routes.ts                    # Sin routing (SPA de una vista)
│
├── core/
│   └── pattern.service.ts           # Servicio singleton: estado, acciones, sesiones
│
├── features/
│   ├── canvas/
│   │   ├── canvas.ts                # Sketch p5.js + lógica de simulación
│   │   ├── canvas.html              # <div #canvasContainer> + controles de zoom
│   │   └── canvas.css               # Estilos del wrapper y botones de zoom
│   │
│   ├── controls/
│   │   ├── controls.ts              # Panel de parámetros + exportación/importación JSON
│   │   ├── controls.html            # Controles ngModel + botones de acción
│   │   └── controls.css             # Estilos de inputs y banner de bloqueo
│   │
│   ├── tutorial/
│   │   ├── tutorial.ts              # Modal de bienvenida con persistencia localStorage
│   │   ├── tutorial.html            # Lista de pasos y checkbox "no mostrar"
│   │   └── tutorial.css             # Overlay, card con scroll interno, animaciones
│   │
│   └── export-modal/
│       ├── export-modal.ts          # Modal de exportación de imagen PNG
│       ├── export-modal.html        # Opciones: fondo, zoom, resolución, nombre
│       └── export-modal.css         # Estilos del modal y checkerboard de preview
│
└── models/
    └── pattern-params.model.ts      # Interfaces: PatternParams, SimulationSession,
                                     # LineRecord, ExportOptions, VisualizationMode
```

### 3.3 Layout visual

El componente raíz `app.html` divide la pantalla con Bootstrap en dos columnas:

```
┌─────────────────────────────────────────────────────────────┐
│ <app-tutorial>  (fixed, fuera del flujo)                    │
│                                                             │
│  ┌──────────────────────────┐  ┌────────────────────────┐  │
│  │     <app-canvas>         │  │    <app-controls>      │  │
│  │     col-md-8             │  │    col-md-4            │  │
│  │                          │  │                        │  │
│  │  canvas p5.js            │  │  Panel de Control      │  │
│  │  + botones de zoom       │  │  + acciones            │  │
│  │                          │  │  + export/import JSON  │  │
│  └──────────────────────────┘  └────────────────────────┘  │
│                                                             │
│  <app-export-modal>  (condicional, overlay fixed)           │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Modelo de datos

### 4.1 `PatternParams`

Define completamente el estado de una simulación en un instante dado. Es el objeto que viaja de Controls a Canvas a través de `PatternService`.

```typescript
interface PatternParams {
  orbit1Radius: number;        // 10–500 px
  orbit2Radius: number;
  orbit1EllipseX: number;      // 0.1–2 (factor horizontal de elipse)
  orbit1EllipseY: number;      // 0.1–2 (factor vertical de elipse)
  orbit2EllipseX: number;
  orbit2EllipseY: number;
  orbit1Angle: number;         // 0–360° (inclinación del plano orbital)
  orbit2Angle: number;
  orbit1SpeedRpm: number;      // 0–100 RPM
  orbit2SpeedRpm: number;
  initialAngle1: number;       // 0–360° (fase inicial)
  initialAngle2: number;
  lineColor: string;           // hex '#rrggbb'
  lineAlpha: number;           // 0–1
  strokeWeight: number;        // 0.5–10 px
  lineInterval: number;        // segundos entre líneas (0 = cada frame)
  visualizationMode: 'curve' | 'lines';
}
```

La conversión de RPM a radianes/frame se hace en el canvas:
```
RPM_TO_RAD_PER_FRAME = (2π) / (60 fps × 60 s/min)
```

### 4.2 `SimulationSession`

Representa un bloque continuo de simulación (de Play a Pause/Reset). Acumula los datos necesarios para reproducir matemáticamente el dibujo.

```typescript
interface SimulationSession {
  sessionIndex: number;      // orden de la sesión (1, 2, 3…)
  params: PatternParams;     // parámetros con los que se lanzó
  frameCount: number;        // número de frames activos
  durationSeconds: number;   // frameCount / 60
  endAngle1: number;         // ángulo acumulado de órbita 1 al terminar
  endAngle2: number;         // ángulo acumulado de órbita 2 al terminar
  endTipX: number;           // posición X del extremo de curva al terminar
  endTipY: number;           // posición Y del extremo de curva al terminar
  endFirstPoint: boolean;    // si aún no se ha dibujado ningún punto
}
```

Los campos `end*` permiten que, tras importar un JSON, el usuario pueda continuar el dibujo sin discontinuidad geométrica.

### 4.3 `LineRecord`

Cada segmento de línea dibujado se almacena en coordenadas de mundo (independiente del zoom o resolución del canvas):

```typescript
interface LineRecord {
  x1: number; y1: number;    // punto inicial
  x2: number; y2: number;    // punto final
  r: number; g: number; b: number;  // color RGB
  a: number;                 // alpha 0–255
  sw: number;                // strokeWeight
}
```

El array `lineHistory: LineRecord[]` en `PatternService` es la fuente de verdad del dibujo acumulado. Al renderizar, cada `LineRecord` tiene su propio `ctx.beginPath()/stroke()` individual para que las líneas superpuestas acumulen alpha correctamente (comportamiento Canvas 2D spec).

### 4.4 `CanvasAction`

Tipo unión que representa los comandos puntuales que Controls envía al Canvas:

```typescript
type CanvasAction = 'play' | 'pause' | 'clear' | 'reset' | 'import-json';
```

---

## 5. Flujo de datos

### 5.1 Flujo de parámetros (reactivo, continuo)

```
Controls.onParamChange()
  └─ patternService.updateParams(params)
       └─ paramsSubject.next(params)          // BehaviorSubject
            └─ canvas.params$.subscribe(p => this.params = p)
                 └─ p.draw() lee this.params cada frame
```

`BehaviorSubject` emite síncronamente en el mismo tick. El canvas lee los parámetros actualizados a partir del siguiente frame del loop `p.draw()`.

### 5.2 Flujo de acciones (puntual, imperativo)

```
Controls.play() / pause() / clear() / reset()
  └─ patternService.dispatch(action)
       └─ actionSubject.next(action)           // Subject
            └─ canvas.action$.subscribe(a => this.onAction(a))
                 └─ onAction() modifica isPaused, isDrawing, clearPending…
```

Las acciones son síncronas: `Subject.next()` ejecuta todos los observers en el mismo call stack. Esto es crítico para el import-json, donde el estado del canvas debe quedar configurado antes de que se asigne `lineHistory`.

### 5.3 Integración Angular ↔ p5.js (zona)

p5.js se inicializa **fuera de la zona de Angular** para evitar que Zone.js parcheé `requestAnimationFrame` y dispare el ciclo de Change Detection 60 veces por segundo:

```typescript
ngAfterViewInit(): void {
  this.subs.add(this.patternService.params$.subscribe(p => this.params = p));
  this.subs.add(this.patternService.action$.subscribe(a => this.onAction(a)));
  this.initSketch();   // NO ngZone.runOutsideAngular — ver nota
}
```

> **Nota:** La versión actual no usa `runOutsideAngular` explícitamente porque la integración con RxJS está suficientemente desacoplada. Los `subscribe` se disparan desde el contexto de Angular (Controls), y el loop `p.draw()` no despacha eventos de vuelta a Angular excepto en `simulationFinished$`.

---

## 6. Componentes en detalle

### 6.1 `PatternService` (core/pattern.service.ts)

Servicio singleton. Actúa como **bus de estado y comunicación** entre Controls y Canvas.

**Responsabilidades:**
- Emitir cambios de parámetros vía `BehaviorSubject<PatternParams>` (`params$`)
- Despachar acciones puntuales vía `Subject<CanvasAction>` (`action$`)
- Almacenar el historial de líneas (`lineHistory: LineRecord[]`)
- Registrar sesiones de simulación (`sessions: SimulationSession[]`)
- Mantener el estado angular actual (`setCurrentState`) para `endSession` y `snapshotActiveSession`
- Guardar el `importState` que el canvas restaura al recibir `'import-json'`
- Proveer dimensiones del canvas a `ExportModal` (`canvasDimensions`)

**Estado de sesión (ciclo de vida):**

```
beginSession(params)    ← llamado por canvas al recibir 'play'
incrementSessionFrame() ← llamado por canvas cada frame activo
setCurrentState(...)    ← llamado por canvas tras cada incremento de ángulo
endSession()            ← guarda la sesión con estado final; llamado en pause/reset/import
clearSessions()         ← vacía el array; llamado en reset/cambio de modo/import
snapshotActiveSession() ← snapshot no destructivo para exportar mientras se dibuja
```

### 6.2 `Canvas` (features/canvas/canvas.ts)

Componente que contiene y gestiona el sketch p5.js. Es el motor de renderizado y simulación.

**Responsabilidades:**
- Instanciar p5 en modo instancia dentro de `ngAfterViewInit`
- Suscribirse a `params$` y `action$` de `PatternService`
- Ejecutar el loop `p.draw()` a 60 fps
- Calcular posiciones de planetas mediante trigonometría paramétrica
- Acumular segmentos en `patternService.lineHistory` (modo curva y modo líneas)
- Renderizar el historial con Canvas 2D API directa (calidad vectorial a cualquier zoom)
- Gestionar el zoom (rueda del ratón + botones ＋/−)
- Manejar `CanvasAction` (play, pause, clear, reset, import-json)
- Informar a `PatternService` del estado angular tras cada frame activo

**Loop de render por frame (`p.draw()`):**

```
1. Procesar acciones pendientes (resetPending, clearPending, cambio de modo)
2. Calcular posiciones x1,y1 (planeta 1) y x2,y2 (planeta 2)
3. p.background() — limpia el frame
4. Iterar lineHistory con ctx.save/translate/scale/restore — dibuja el patrón acumulado
5. Dibujar guías orbitales y puntos de planeta (API p5)
6. Si !isPaused: registrar nuevo LineRecord, incrementar ángulos, actualizar estado en servicio
```

**Modelo geométrico:**

```
// Modo 'lines' — ambas órbitas desde el origen
x1 = cos(a1) * R1*eX1*cos(angle1+init1) - sin(a1) * R1*eY1*sin(angle1+init1)
y1 = sin(a1) * R1*eX1*cos(angle1+init1) + cos(a1) * R1*eY1*sin(angle1+init1)
// x2, y2 análogos con parámetros de órbita 2

// Modo 'curve' — órbita 2 desde el extremo de órbita 1
x2 = x1 + rx2
y2 = y1 + ry2
```

### 6.3 `Controls` (features/controls/controls.ts)

Panel de parámetros. Es el único componente que escribe en `PatternService`.

**Responsabilidades:**
- Mantener una copia local de `PatternParams` enlazada con `[(ngModel)]`
- Emitir `updateParams` en cada cambio de input
- Despachar acciones (play, pause, clear, reset)
- Exportar el patrón actual como JSON (`exportJson`)
- Importar un JSON y reproducirlo matemáticamente (`triggerImport` + `replayToLines`)
- Mostrar/ocultar el `ExportModal`

**`replayToLines(sessions)`:**
Reproduce matemáticamente todas las sesiones frame a frame usando la misma trigonometría que `canvas.ts`, manteniendo `angle1`, `angle2`, `prevTipX`, `prevTipY`, `firstPoint` continuos entre sesiones. Mutates each session in-place to save `endAngle1/2`, `endTipX/Y`, `endFirstPoint`.

**Orden crítico en import:**
```
1. updateParams(lastParams)      ← canvas.params ya tiene el modo del JSON
2. importState = { endAngles }   ← canvas leerá esto en onAction
3. dispatch('import-json')       ← onAction sincroniza activeMode, restaura ángulos
4. lineHistory = computedLines   ← asigna el historial
5. sessions = sessions           ← actualiza el registro de sesiones
```
Este orden evita que el bloque `mode !== activeMode` en `p.draw()` borre el historial recién asignado.

### 6.4 `Tutorial` (features/tutorial/tutorial.ts)

Modal de bienvenida con siete pasos de inicio rápido.

**Comportamiento:**
- Se muestra automáticamente al cargar si `localStorage['epicycloid_tutorial_seen']` no está establecido
- Botón `?` fijo en la esquina superior izquierda para reabrirlo en cualquier momento
- Opción "No volver a mostrar" con persistencia en `localStorage`
- Se cierra con el botón "¡Empezar!" o haciendo clic fuera del card
- El card tiene altura máxima con scroll interno para absorber cambios de contenido sin agrandar la ventana

### 6.5 `ExportModal` (features/export-modal/export-modal.ts)

Modal de exportación PNG con preview en tiempo real.

**Opciones:**
- Fondo: color libre con selector o transparente (checkerboard en preview)
- Zoom de exportación: slider 0.2×–4× (área visible en la imagen)
- Resolución: multiplicador 1×/2×/4× (escala el canvas de salida)
- Visibilidad de guías orbitales y punto central en la imagen
- Nombre del archivo (vacío → `epicycloid_<modo>_<fecha>.png`)

**Renderizado:** Redibuja `lineHistory` sobre un `<canvas>` offscreen con Canvas 2D API, garantizando calidad vectorial independiente de la resolución elegida. No usa el canvas de p5 directamente.

---

## 7. Sistema de exportación / importación JSON

### 7.1 Estructura del JSON exportado

```json
{
  "metadata": {
    "exportedAt": "2026-06-02T14:30:00.000Z",
    "totalSessions": 2,
    "visualizationMode": "lines"
  },
  "sessions": [
    {
      "sessionIndex": 1,
      "frameCount": 360,
      "durationSeconds": 6.0,
      "params": { "orbit1Radius": 150, "orbit2SpeedRpm": 3.0, ... },
      "endAngle1": 3.7699,
      "endAngle2": 1.8849,
      "endTipX": 0,
      "endTipY": 0,
      "endFirstPoint": true
    },
    { "sessionIndex": 2, ... }
  ]
}
```

Cada sesión es un bloque independiente de Play → Pause. Si el usuario pausa, cambia parámetros y vuelve a dar Play, se añade una nueva sesión con los nuevos parámetros. El JSON captura fielmente la historia completa del dibujo.

### 7.2 Reproducción matemática (import)

Al importar, `replayToLines()` simula exactamente los mismos cálculos que el canvas habría hecho:

```
Para cada sesión:
  Para cada frame (0..frameCount-1):
    calcular x1,y1 con los params de la sesión y el ángulo acumulado
    calcular x2,y2
    si !firstPoint: push LineRecord
    angle1 += s1; angle2 += s2
  guardar endAngle1, endAngle2, endTipX, endTipY, endFirstPoint
```

Los ángulos son **continuos entre sesiones** — no se resetean al pasar de una sesión a la siguiente — porque en la simulación real tampoco se resetean al pausar.

### 7.3 Continuación tras importar

Gracias a los campos `end*`, al pulsar Play tras una importación el canvas retoma exactamente:
- Los ángulos acumulados de ambas órbitas (`endAngle1/2`)
- La posición del extremo del trazado en modo curva (`endTipX/Y`)
- Si el extremo ya estaba establecido (`endFirstPoint`)

---

## 8. Zoom del lienzo

El zoom se gestiona íntegramente en `canvas.ts` sin afectar a `lineHistory`:

- Rango: 1/3× – 8× (paso 0.15)
- Activación: rueda del ratón sobre el canvas (guard `event.target === canvasEl`) o botones ＋/−
- Implementación: `ctx.translate(cx, cy) → ctx.scale(zoom, zoom)` aplicado al renderizado del historial y a las guías p5
- Los `LineRecord` se almacenan en **coordenadas de mundo** (sin zoom), por lo que el historial es válido a cualquier nivel de zoom y en la exportación PNG

---

## 9. Cobertura de requisitos funcionales

| ID | Requisito | Estado | Implementación |
|---|---|---|---|
| RF1 | Generación de patrones paramétricos | ✅ | Modos `lines` y `curve` en canvas.ts |
| RF2 | Modificar parámetros en tiempo real | ✅ | `[(ngModel)]` + `onParamChange()` → `PatternService` |
| RF3 | Canvas actualiza sin recarga | ✅ | `BehaviorSubject` + loop p5 |
| RF4 | Play, pausa y reinicio | ✅ | `CanvasAction` vía `PatternService.dispatch()` |
| RF5 | Limpiar lienzo | ✅ | Acción `clear` borra `lineHistory` |
| RF6 | Guardar como imagen | ✅ | `ExportModal` con canvas offscreen, PNG |
| RF7 | Presets con nombre (localStorage) | ❌ | Componente placeholder sin implementar |
| RF8 | Toggle entre modos de visualización | ✅ | Botón en Controls, `activeMode` en Canvas |
| RF9 | Controles interactivos (sliders, inputs) | ✅ | Sliders en fases/inclinación; inputs numéricos en el resto |
| RF10 | Mostrar valores actuales en pantalla | ✅ | Los inputs muestran el valor en todo momento |
| RF11 | Integración Angular ↔ p5.js correcta | ✅ | Modo instancia, `AfterViewInit`, `OnDestroy`, suscripciones |
| RF12 | Componentes modulares reutilizables | ✅ | Standalone components desacoplados vía servicio |
| RF13 | Canvas responsive | ✅ | `p.windowResized()` redimensiona canvas |
| RF14 | Variación aleatoria automática | ❌ | No implementado |
| RF15 | Reset a valores por defecto | ✅ | `DEFAULT_PARAMS` en `PatternService` |
| —  | Exportar/importar patrón (JSON) | ✅ | `exportJson()` / `replayToLines()` en Controls |
| —  | Zoom interactivo del lienzo | ✅ | `mouseWheel` + botones en Canvas |
| —  | Tutorial de bienvenida | ✅ | `Tutorial` con persistencia localStorage |

---

## 10. Cobertura de requisitos no funcionales

| ID | Requisito | Estado | Notas |
|---|---|---|---|
| RNF1 | HTML5, CSS3, ES6+ | ✅ | Build Angular con target ES2022 |
| RNF2 | Angular como framework | ✅ | Angular 21 standalone |
| RNF3 | p5.js correctamente integrado | ✅ | Modo instancia, sin conflictos globales |
| RNF4 | UI intuitiva para no técnicos | ✅ | Tutorial, labels descriptivos, lock banner |
| RNF5 | Rendimiento fluido en gama media | ✅ | Canvas 2D directo, p5 fuera de CD en producción |
| RNF6 | Arquitectura modular y mantenible | ✅ | Servicio singleton + componentes standalone |
| RNF7 | Código documentado | ✅ | DEVLOG, claude/, README, comments puntuales |
| RNF8 | Minimizar CPU innecesaria | ✅ | No se dibuja nada cuando `isPaused = true` |
| RNF9 | Responsive desktop/tablet | ✅ | Bootstrap col-md-8/4, canvas windowResized |
| RNF10 | Manejo de errores de entrada | ❌ | No implementado (inputs sin validación mínima/máxima activa) |
| RNF11 | Chrome, Firefox, Edge, Opera | ✅ | Canvas 2D API estándar; sin APIs propietarias |
| RNF12 | Despliegue en Vercel | ❌ | Pendiente de subir a `main` |

---

## 11. Decisiones técnicas relevantes

### 11.1 `lineHistory` vectorial en lugar de trail buffer bitmap

En la primera implementación se usó un `p5.Graphics` offscreen como buffer acumulativo. Este approach fue reemplazado por `lineHistory: LineRecord[]` por dos razones:

1. **Calidad a cualquier zoom:** un bitmap pierde resolución al hacer zoom in. `LineRecord[]` se redibujan con Canvas 2D API escalado, manteniendo calidad vectorial.
2. **Exportación de imagen:** el `ExportModal` necesita acceso a los segmentos para renderizarlos en un canvas offscreen de resolución arbitraria. Un buffer bitmap limita esa resolución.

**Coste:** con patrones muy largos (>100 000 segmentos), redibujar todo el historial cada frame puede penalizar el rendimiento. En la práctica, los patrones generados en sesiones normales no llegan a ese orden de magnitud.

### 11.2 Alpha acumulativo por segmento individual

El spec de Canvas 2D establece que un único `beginPath → stroke` pinta cada píxel exactamente una vez dentro de esa llamada, independientemente de cuántos segmentos se dibujen en el mismo `beginPath`. Para que las líneas superpuestas acumulen alpha visualmente (efecto de densidad), cada `LineRecord` necesita su propio `beginPath()/stroke()`. Esta es la causa de que el loop de renderizado itere con un `beginPath` individual por segmento.

### 11.3 Orden de operaciones en import-json

La secuencia de llamadas al importar está ordenada para evitar una condición de carrera con el bloque de detección de cambio de modo en `p.draw()`:

```
updateParams() → importState = {...} → dispatch('import-json') → lineHistory = [...] → sessions = [...]
```

Si `dispatch` se llamara antes de `updateParams`, el canvas vería un cambio de `visualizationMode` en el siguiente frame y limpiaría `lineHistory`.

### 11.4 Continuidad de ángulos entre sesiones

Los ángulos acumulados (`angle1`, `angle2`) no se resetean al pausar — solo al Limpiar o Reset. Esto es intencional: permite que al volver a dar Play el dibujo continúe geométricamente desde donde se dejó, sin un salto visible en el patrón. El sistema de sesiones del JSON preserva esta continuidad en la reproducción matemática.

---

## 12. Pendientes de implementación

| Funcionalidad | Requisito | Complejidad estimada | Notas |
|---|---|---|---|
| Presets (localStorage) | RF7 | Media | El componente `presets/` existe como placeholder. Necesita UI de lista, guardado con nombre, `localStorage` serialization |
| Variación aleatoria | RF14 | Media-alta | Parámetros con rangos aleatorios controlados por seed o sliders de variación |
| Validación de inputs | RNF10 | Baja | Clamp en `onParamChange()` o `min/max` en los inputs (prevenir valores fuera de rango) |
| Despliegue en Vercel | RNF12 | Baja | `git push` a `main` + configuración de Output Directory en Vercel |

---

*Generado el 2026-06-02. Para el estado de implementación en tiempo real, consultar `DEVLOG.md`.*
