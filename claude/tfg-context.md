# Contexto completo de la aplicación — Epicycloid Generator
> Documento de referencia para la redacción de la memoria del TFG.
> Cubre matemática, arquitectura, decisiones de diseño, flujo de datos e interacción de usuario.

---

## 1. Descripción general del proyecto

**Epicycloid Generator** es una aplicación web interactiva desarrollada como Trabajo de Fin de Grado. Su propósito es generar composiciones visuales paramétricas a partir de la interferencia entre dos puntos orbitantes independientes. El resultado son patrones abstractos similares al _string art_ (arte de cuerdas) y a las curvas de Lissajous.

La aplicación no es un editor artístico convencional: el usuario no dibuja directamente. En su lugar, configura parámetros matemáticos (radios, velocidades angulares, fases iniciales, factores elípticos, inclinación orbital) y la aplicación anima la geometría en tiempo real, acumulando las trazas resultantes en el lienzo. El control del usuario es indirecto y paramétrico, lo que convierte la exploración de patrones en el eje central de la experiencia.

---

## 2. Base matemática del sistema de simulación

### 2.1 Modelo orbital de dos planetas

El núcleo matemático de la aplicación simula dos puntos independientes que orbitan alrededor de un mismo centro (coordenadas `[0, 0]` en espacio mundo). Cada planeta describe una trayectoria elíptica inclinada, definida por:

- **Radio** (`R`): distancia máxima al centro.
- **Factores elípticos X e Y** (`eX`, `eY`): escalan los semiejes de la elipse. Si `eX = eY = 1`, la trayectoria es circular.
- **Inclinación orbital** (`orbitAngle`): rota el plano de la órbita respecto al eje horizontal, en grados.
- **Velocidad angular** (`rpm`): cuántas vueltas completas da el planeta por minuto.
- **Fase inicial** (`initialAngle`): ángulo de partida en grados, que desplaza la posición inicial del planeta.

Las coordenadas del planeta en cada fotograma se calculan así:

```
// Posición en espacio local (sin rotación de plano)
lx = R * eX * cos(angle + initialAngle_rad)
ly = R * eY * sin(angle + initialAngle_rad)

// Rotación del plano orbital (inclinación)
x = lx * cos(orbitAngle_rad) - ly * sin(orbitAngle_rad)
y = lx * sin(orbitAngle_rad) + ly * cos(orbitAngle_rad)
```

El ángulo acumulado `angle` se incrementa en cada fotograma según:

```
RPM_TO_RAD_PER_FRAME = (2π) / (60 fps × 60 s/min) = 2π / 3600
angle += rpm * RPM_TO_RAD_PER_FRAME
```

Este factor de conversión es constante porque la aplicación corre a 60 fps fijos. 1 RPM equivale a `2π / 3600 ≈ 0.001745` radianes por fotograma.

### 2.2 Por qué este modelo genera patrones artísticos

La clave estética es que **el dibujo no son las órbitas, sino la línea que conecta los dos planetas en cada fotograma**. Cuando las velocidades de los dos planetas tienen una relación racional (p. ej. 2:1, 3:2, 5:3), los patrones son periódicos y se cierran. Cuando la relación es irracional, el patrón jamás se cierra y rellena el espacio de forma cuasi-aleatoria. La superposición de miles de estas líneas, con opacidad baja, produce el efecto de densidad visual que caracteriza la aplicación.

### 2.3 Modo intersección de líneas (_lines mode_)

En este modo ambas órbitas son independientes y parten del mismo centro. La línea se dibuja **entre los dos planetas** en cada fotograma (o cada N segundos si el usuario configura un intervalo).

```
Planeta 1: origen (0,0) → P1
Planeta 2: origen (0,0) → P2
Dibujo: segmento(P1, P2)
```

### 2.4 Modo curva epicicloidal (_curve mode_)

En este modo la segunda órbita no parte del centro, sino del extremo del brazo de la primera. La segunda órbita _gira alrededor del punto de la primera_. El dibujo traza el camino continuo del punto final del segundo brazo:

```
Planeta 1: origen → P1
Planeta 2: P1 → P1 + offset2
Dibujo: camino continuo del punto P1 + offset2
```

Esto genera curvas epicicloidales propiamente dichas (hipotrocoides/epitrocoides en el caso general con factores elípticos).

### 2.5 Por qué dos modos en lugar de uno

Los dos modos producen familias visuales distintas: el modo líneas genera composiciones que recuerdan al string art (nudos de tensión entre dos puntos orbitantes), mientras que el modo curva genera trazas continuas similares al pantógrafo o al espirógrafo. Tener ambos modos en la misma aplicación, con los mismos controles, permite explorar el contraste entre interferencia de líneas y trayectoria continua, que es la distinción fundamental entre ambas familias de curvas.

---

## 3. Stack tecnológico y justificación

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Angular | 21 |
| Gráficos | p5.js | 2.2.3 |
| Estado | RxJS | 7 |
| Estilos | Bootstrap | 5.3 |
| Tests | Vitest | 4 |
| Despliegue | Netlify | — |

### 3.1 Angular

Angular fue elegido como framework estructural del proyecto por varios motivos relacionados con los requisitos del TFG:

- **Componentes standalone**: Angular 21 usa componentes standalone sin `NgModule`, lo que simplifica la arquitectura y hace el código más legible y mantenible (RNF6).
- **Inyección de dependencias**: el servicio central (`PatternService`) se provee como singleton mediante `providedIn: 'root'`, garantizando que el estado sea único y compartido entre todos los componentes sin acoplamiento directo.
- **`[(ngModel)]` bidireccional**: los controles de parámetros usan _two-way binding_ nativamente. Cada cambio en el input actualiza el modelo y viceversa, sin código de sincronización manual.
- **Ciclo de vida (`AfterViewInit`, `OnDestroy`)**: permiten inicializar p5.js exactamente cuando el DOM está listo y destruir el sketch al desmontar el componente, evitando fugas de memoria.
- **`NgZone`**: permite ejecutar el bucle de animación de p5 fuera de la detección de cambios de Angular (véase sección 6.4).
- **Tipado estricto**: TypeScript garantiza coherencia entre el modelo de datos y su uso en la vista, lo que es especialmente relevante al trabajar con el modelo paramétrico (`PatternParams`).

### 3.2 p5.js

p5.js es una librería JavaScript diseñada específicamente para gráficos creativos, con un modelo de bucle `setup/draw` que encaja perfectamente con la naturaleza animada de la simulación:

- **Modo instancia**: p5 puede operar en modo global (variables globales) o instancia (objeto local). Se usa modo instancia para que el sketch esté encapsulado dentro del componente Angular, sin contaminar el scope global.
- **`frameRate(60)`**: fija la cadencia de animación a 60 fps, lo que garantiza que la constante de conversión RPM→rad/fotograma sea exacta.
- **`windowResized`**: p5 expone un _hook_ nativo para redimensionar el canvas cuando cambia el tamaño de la ventana, que se usa para mantener el canvas responsivo (RF13).
- **`mouseWheel`**: captura la rueda del ratón sobre el canvas para implementar el zoom interactivo.

No obstante, el renderizado de las líneas acumuladas **no usa la API de p5** directamente — se usa la Canvas 2D API nativa a través de `drawingContext` (véase sección 7).

### 3.3 RxJS

RxJS gestiona el flujo de datos reactivo entre componentes sin crear dependencias directas entre ellos:

- **`BehaviorSubject<PatternParams>`**: guarda el último valor emitido y lo entrega inmediatamente a cualquier suscriptor nuevo. Se usa para los parámetros porque el canvas necesita conocer el estado actual al iniciar.
- **`Subject<CanvasAction>`**: no guarda estado; solo envía el evento en el momento de la emisión. Se usa para acciones puntuales (play, pause, clear, reset, import-json) que no tienen sentido reproducir si no hay nadie escuchando en ese instante.

Elegir el tipo correcto de Subject no es solo una cuestión de rendimiento: un `BehaviorSubject` para las acciones causaría que el canvas ejecutase la última acción almacenada cada vez que se reinicia, produciendo comportamiento incorrecto.

### 3.4 Bootstrap

Se usa exclusivamente para el layout de dos columnas (canvas izquierda / controles derecha) y para los componentes visuales del panel de controles (acordeones, botones, inputs). No se introdujo ningún framework CSS propio para no duplicar esfuerzo con Bootstrap, que cubre perfectamente los requisitos de maquetación del proyecto.

### 3.5 Vitest

Vitest como runner de tests unitarios sobre JSDOM. Es compatible con el toolchain de Angular 21 y más rápido que Jest en proyectos Vite-based. Los tests cubren la lógica del servicio y las transformaciones matemáticas.

### 3.6 Netlify

Netlify es la plataforma de despliegue (RNF12). La aplicación es una SPA Angular sin backend, por lo que cualquier hosting estático es válido. Se eligió Netlify por:
- Integración directa con GitHub (CI/CD automático en cada push a `main`).
- Configuración mínima: _Build Command_ `npm run build`, _Publish Directory_ `dist/epicycloid-generator/browser`.
- Generación de URL pública permanente sin coste.

---

## 4. Arquitectura de la aplicación

### 4.1 Estructura de carpetas

```
src/app/
├── app.ts / app.html / app.css      # Componente raíz — layout Bootstrap col-8 / col-4
├── app.config.ts                    # Providers globales de Angular
├── app.routes.ts                    # Sin routing (SPA de una sola vista)
│
├── core/
│   └── pattern.service.ts           # Singleton de estado: params$, action$, lineHistory, sessions
│
├── features/
│   ├── canvas/                      # Sketch p5.js + simulación + zoom
│   ├── controls/                    # Panel de parámetros + acciones + export/import JSON
│   ├── export-modal/                # Modal de exportación PNG (offscreen canvas)
│   ├── tutorial/                    # Modal de bienvenida con persistencia localStorage
│   └── presets/                     # Placeholder vacío — RF7 no implementado
│
└── models/
    └── pattern-params.model.ts      # Interfaces: PatternParams, SimulationSession, LineRecord,
                                     # ExportOptions, VisualizationMode
```

### 4.2 Por qué esta división en componentes

La separación `core/` vs `features/` responde a un principio claro de responsabilidad:

- **`core/`**: lógica de negocio y estado global. No sabe nada de la vista. Puede probarse en aislamiento.
- **`features/`**: componentes visuales que consumen el servicio. Cada uno tiene una responsabilidad única y no se comunican directamente entre sí.

Esta separación garantiza que si un componente desaparece (p. ej. se elimina el `Tutorial`), el resto de la aplicación funciona sin cambios.

### 4.3 Componente raíz (`app.ts`)

El componente raíz es un contenedor puro de layout: no tiene lógica, solo importa y renderiza `Canvas`, `Controls` y `Tutorial`. El layout de Bootstrap lo divide en dos columnas:
- **`col-8`**: canvas (columna izquierda, área de dibujo)
- **`col-4`**: panel de controles (columna derecha)

El componente `Tutorial` se renderiza como overlay con z-index elevado, independiente del layout de columnas.

---

## 5. Modelo de datos

### 5.1 `PatternParams` — parámetros de simulación

Es la interfaz central del sistema. Define completamente el estado matemático y visual de una simulación:

```typescript
interface PatternParams {
  orbit1Radius: number;      // Radio de la órbita 1 en píxeles (10–500)
  orbit2Radius: number;      // Radio de la órbita 2 en píxeles (10–500)
  orbit1EllipseX: number;    // Factor elíptico horizontal órbita 1 (0.1–2; 1.0 = círculo)
  orbit1EllipseY: number;    // Factor elíptico vertical órbita 1
  orbit2EllipseX: number;    // Factor elíptico horizontal órbita 2
  orbit2EllipseY: number;    // Factor elíptico vertical órbita 2
  orbit1Angle: number;       // Inclinación del plano de órbita 1 en grados (0–360)
  orbit2Angle: number;       // Inclinación del plano de órbita 2 en grados
  orbit1SpeedRpm: number;    // Velocidad angular órbita 1 en RPM (0–100)
  orbit2SpeedRpm: number;    // Velocidad angular órbita 2 en RPM
  initialAngle1: number;     // Fase inicial planeta 1 en grados (0–360)
  initialAngle2: number;     // Fase inicial planeta 2 en grados
  lineColor: string;         // Color del trazo en formato hexadecimal '#rrggbb'
  lineAlpha: number;         // Opacidad de cada línea (0–1)
  strokeWeight: number;      // Grosor del trazo en píxeles (0.5–10)
  lineInterval: number;      // Segundos entre líneas consecutivas en modo lines (0 = cada fotograma)
  visualizationMode: 'curve' | 'lines';   // Modo de visualización activo
}
```

Por qué todos estos campos en un solo objeto: permite serializar el estado completo de una sesión en un único JSON, copiar y comparar estados fácilmente, y emitir el estado completo a través de `BehaviorSubject` sin riesgo de estados parcialmente actualizados.

### 5.2 `LineRecord` — segmento de dibujo

```typescript
interface LineRecord {
  x1: number; y1: number;   // Punto de inicio en coordenadas mundo
  x2: number; y2: number;   // Punto de fin en coordenadas mundo
  r: number; g: number; b: number;  // Componentes RGB del color (0–255)
  a: number;                // Alpha en escala 0–255 (no 0–1)
  sw: number;               // strokeWeight en píxeles
}
```

Los colores se almacenan como componentes RGB enteros (no como string hex) por eficiencia: en el bucle de renderizado, que itera potencialmente sobre cientos de miles de registros cada fotograma, construir `rgba(${r},${g},${b},${a/255})` a partir de componentes ya separados es más rápido que parsear un string hex en cada iteración.

Las coordenadas son **coordenadas mundo**, relativas al centro del canvas `(0, 0)`. Son independientes de la resolución de pantalla y del zoom, lo que permite redibuja el historial a cualquier escala sin pérdida de calidad.

### 5.3 `SimulationSession` — sesión de simulación

```typescript
interface SimulationSession {
  sessionIndex: number;          // Número ordinal de la sesión
  params: PatternParams;         // Snapshot de los parámetros activos durante esta sesión
  frameCount: number;            // Fotogramas totales de la sesión
  durationSeconds: number;       // Duración en segundos (frameCount / 60)
  endAngle1: number;             // Ángulo acumulado de la órbita 1 al finalizar la sesión
  endAngle2: number;             // Ángulo acumulado de la órbita 2 al finalizar la sesión
  endTipX: number;               // Posición X del punto final (solo relevante en modo curve)
  endTipY: number;               // Posición Y del punto final
  endFirstPoint: boolean;        // Si el siguiente punto es el primero del trazo continuo
}
```

Una **sesión** es un bloque Play→Pause. Cada vez que el usuario pulsa Play se inicia una sesión nueva, y cada vez que pulsa Pause (o la simulación se detiene automáticamente) se cierra la sesión activa. Esto permite que el JSON exportado capture la historia completa del dibujo como una secuencia de sesiones, cada una con sus propios parámetros.

Por qué guardar `endAngle1/2` y `endTipX/Y`: al importar un JSON, la aplicación debe poder **reconstruir exactamente las mismas líneas** que se dibujaron originalmente. Para eso, `replayToLines()` recorre todas las sesiones en orden, manteniendo continuidad de ángulos entre ellas. Al finalizar, las posiciones angulares del final de la última sesión se restauran en el canvas para que el usuario pueda continuar el dibujo desde donde lo dejó.

### 5.4 `CanvasAction` — acciones sobre el canvas

```typescript
type CanvasAction = 'play' | 'pause' | 'clear' | 'reset' | 'import-json';
```

Union type exhaustiva. El compilador de TypeScript obliga a cubrir todos los casos en el `switch` del canvas, lo que previene ramas olvidadas al añadir nuevas acciones.

---

## 6. Flujo de datos

### 6.1 Flujo de parámetros (Controls → Canvas)

```
Usuario modifica un input en Controls
  └─ [(ngModel)] actualiza this.params en Controls
  └─ onParamChange() emite patternService.updateParams({ ...this.params })
       └─ BehaviorSubject<PatternParams>.next(params)
            └─ Canvas: params$.subscribe(p => this.params = p)
                     └─ p.draw() lee this.params en cada fotograma
```

El canvas nunca modifica los parámetros. Los lee solo para la simulación. Los controles son la única fuente de escritura de `params$`.

### 6.2 Flujo de acciones (Controls → Canvas)

```
Usuario pulsa un botón en Controls (play, pause, clear, reset…)
  └─ Controls llama patternService.dispatch('acción')
       └─ Subject<CanvasAction>.next('acción')
            └─ Canvas: action$.subscribe(a => this.onAction(a))
                     └─ onAction() modifica el estado interno del canvas
```

Las acciones son síncronas. `Subject.next()` llama al suscriptor en el mismo hilo, sin delay, antes de retornar. Esto es relevante para el import (véase sección 8.3).

### 6.3 Flujo de sesiones y estado

```
Play → patternService.beginSession(params)        // Abre la sesión
  └─ Cada fotograma activo:
       └─ patternService.incrementSessionFrame()   // Contador de fotogramas
       └─ patternService.setCurrentState(...)      // Guarda ángulos y posición actuales
  └─ Pause / auto-stop:
       └─ patternService.endSession()              // Cierra y guarda la sesión en sessions[]
```

### 6.4 Angular Zone y p5.js

Angular usa Zone.js para detectar cambios automáticamente. Zone.js parchea `requestAnimationFrame` para que cada llamada dispare la detección de cambios de Angular. Si p5 corre dentro de la zona de Angular, cada fotograma (60 veces por segundo) activa un ciclo completo de detección de cambios, lo que degrada el rendimiento (RNF5, RNF8).

Solución: p5 se inicializa **fuera de la zona de Angular**:

```typescript
ngAfterViewInit(): void {
  this.subs.add(this.patternService.params$.subscribe(p => this.params = p));
  this.subs.add(this.patternService.action$.subscribe(a => this.onAction(a)));
  this.ngZone.runOutsideAngular(() => this.initSketch());
}
```

Cuando el canvas necesita notificar a Angular de un evento (p. ej. que la simulación terminó), debe re-entrar en la zona explícitamente:

```typescript
this.ngZone.run(() => this.patternService.notifySimulationFinished());
```

Sin `runOutsideAngular`, el rendimiento cae drásticamente. Sin `ngZone.run()` al notificar, Angular no detecta el cambio de estado.

---

## 7. Sistema de renderizado — historial vectorial

### 7.1 Por qué no se usa un bitmap acumulado

La aproximación más intuitiva para acumular dibujos en un canvas es no limpiar el fondo entre fotogramas, dejando las líneas previas visibles. Sin embargo, esto impide:
- **Zoom**: no se puede escalar un bitmap sin pérdida de calidad (aliasing, desenfoque).
- **Exportación a alta resolución**: el bitmap tiene la resolución de la pantalla; no puede exportarse a 2× o 4× sin degradarse.
- **Importación desde JSON**: no hay forma de reconstruir el dibujo a partir del JSON si el patrón solo existe como píxeles.
- **Reset/Clear selectivo**: borrar solo algunas líneas es imposible en un bitmap acumulado.

La solución implementada es mantener un **historial explícito de segmentos** (`lineHistory: LineRecord[]`) y redibujar todos los segmentos cada fotograma sobre un fondo limpio.

### 7.2 Canvas 2D API en lugar de p5 API

El historial se renderiza usando la Canvas 2D API nativa, no las funciones de dibujo de p5 (`p.line()`, etc.). El motivo es crítico: **el comportamiento del alpha**.

La especificación de Canvas 2D pinta cada píxel exactamente una vez dentro de un solo `beginPath → stroke`. Si se pasan múltiples segmentos dentro del mismo path antes de llamar `stroke()`, los segmentos solapados no acumulan alpha — todos quedan con la misma intensidad que un único trazo.

Para que líneas superpuestas acumulen alpha correctamente (creando zonas más brillantes donde se cruzan más líneas), cada segmento necesita su propio `stroke()`:

```typescript
for (const ln of history) {
  ctx.strokeStyle = `rgba(${ln.r},${ln.g},${ln.b},${ln.a / 255})`;
  ctx.lineWidth = ln.sw;
  ctx.beginPath();
  ctx.moveTo(ln.x1, ln.y1);
  ctx.lineTo(ln.x2, ln.y2);
  ctx.stroke();   // un stroke individual por segmento
}
```

Este comportamiento es el que produce el efecto visual de densidad caracterísico de la aplicación: las zonas donde se cruzan muchas líneas se vuelven más brillantes/opacas.

### 7.3 Zoom

El zoom se aplica como transformación de la Canvas 2D API (`ctx.translate` + `ctx.scale`) antes de dibujar el historial, y como `p.scale()` para las guías orbitales. Las coordenadas del historial son siempre en espacio mundo (sin zoom aplicado), así que cambiar el zoom solo afecta a cómo se visualizan, no a los datos.

Rango de zoom: 0.33× – 8×. El usuario puede hacer zoom con la rueda del ratón sobre el canvas o con los botones ＋/− de la esquina inferior derecha.

El zoom no afecta al cálculo de nuevas líneas: `angle1`, `angle2` y la lógica de simulación son independientes del zoom.

---

## 8. Sistema de exportación e importación JSON

### 8.1 Por qué sesiones independientes en el JSON

El usuario puede cambiar parámetros entre sesiones (p. ej. cambiar el color o el grosor entre bloques Play-Pause). Si el JSON guardase solo los parámetros finales, no sería posible reconstruir las sesiones anteriores que usaron parámetros diferentes. Por eso el JSON es una lista de sesiones, cada una con su snapshot de `PatternParams`.

```json
{
  "metadata": {
    "exportedAt": "2026-06-04T10:30:00.000Z",
    "totalSessions": 3,
    "visualizationMode": "lines"
  },
  "sessions": [
    {
      "sessionIndex": 1,
      "params": { ... },
      "frameCount": 3600,
      "durationSeconds": 60.0,
      "endAngle1": 12.566...,
      "endAngle2": 6.283...,
      "endTipX": 0,
      "endTipY": 0,
      "endFirstPoint": true
    },
    ...
  ]
}
```

### 8.2 `replayToLines()` — reconstrucción matemática

Al importar un JSON, la función `replayToLines()` en `Controls` recorre todas las sesiones y ejecuta la misma simulación matemática que el canvas ejecutó en tiempo real, fotograma a fotograma:

```typescript
for (const session of sessions) {
  // Configura constantes de la sesión (rpm, colores, modo, etc.)
  for (let frame = 0; frame < session.frameCount; frame++) {
    // Calcula posiciones con la misma fórmula que canvas.ts
    // Empuja el LineRecord al array si corresponde dibujar en este fotograma
    angle1 += s1;
    angle2 += s2;
  }
  // Guarda el estado angular final de la sesión
  session.endAngle1 = angle1; ...
}
```

El resultado es matemáticamente idéntico al historial original porque usa exactamente las mismas fórmulas y constantes. No hay ningún estado gráfico que preservar.

### 8.3 Restauración del estado angular para continuar el dibujo

Después del import, el usuario puede pulsar Play y continuar dibujando. Para que la nueva sesión arranque exactamente donde terminó la última sesión importada, los ángulos (`angle1`, `angle2`) y la posición del punto final (`prevTipX/Y`, `firstPoint`) del canvas deben ser los del final de la última sesión.

El flujo es:

1. `replayToLines()` calcula los estados finales de todas las sesiones (mutando `session.endAngle1/2/…` en el último loop).
2. `Controls` escribe `patternService.importState` con el estado final de la última sesión.
3. `Controls` llama `patternService.dispatch('import-json')` — síncronamente, el canvas lee `importState` y actualiza sus variables internas de ángulo y posición.
4. `Controls` asigna `patternService.lineHistory = computedLines` — el historial reconstruido sustituye al anterior.

**Orden crítico**: `updateParams` debe ejecutarse antes que `dispatch('import-json')`. El canvas tiene un bloque que detecta si el modo de visualización cambió (`mode !== this.activeMode`) y, si lo detecta, borra `lineHistory`. Si `dispatch` se llamase antes de `updateParams`, el canvas aún tendría el modo antiguo y lo detectaría como cambio al recibir `updateParams`, borrando el historial recién asignado. Para evitar esto:
1. `updateParams(lastParams)` se llama primero — el canvas actualiza `this.params` (incluyendo el nuevo modo).
2. En el handler `import-json` del canvas se asigna explícitamente `this.activeMode = this.params.visualizationMode` — así el bloque de detección de cambio de modo no dispara.
3. Solo entonces se asigna `lineHistory`.

---

## 9. Componentes en detalle

### 9.1 `PatternService` (singleton)

El servicio central. Actúa como bus de estado compartido entre todos los componentes:

| Propiedad/método | Tipo | Propósito |
|---|---|---|
| `params$` | `BehaviorSubject<PatternParams>` | Estado actual de los parámetros |
| `action$` | `Subject<CanvasAction>` | Comandos puntuales al canvas |
| `lineHistory` | `LineRecord[]` | Array de segmentos de dibujo (mutable) |
| `canvasDimensions` | `{w, h}` | Tamaño del canvas en pantalla |
| `sessions` | `SimulationSession[]` | Historial de sesiones completadas |
| `importState` | objeto o `null` | Estado angular a restaurar tras un import |
| `updateParams()` | método | Emite nuevos parámetros |
| `dispatch()` | método | Emite una acción al canvas |
| `beginSession()` | método | Abre una nueva sesión |
| `incrementSessionFrame()` | método | Incrementa el contador de fotogramas |
| `setCurrentState()` | método | Actualiza los ángulos/posición actuales |
| `endSession()` | método | Cierra la sesión activa y la guarda |
| `snapshotActiveSession()` | método | Lee la sesión activa sin cerrarla (para export con sesión en curso) |
| `clearSessions()` | método | Borra todo el historial de sesiones y estado |

El servicio nunca interactúa con el DOM ni con p5. Es puro TypeScript y puede testearse en aislamiento.

### 9.2 `Canvas` — componente de renderizado

Es el componente más complejo. Combina Angular (para el ciclo de vida y los bindings) con p5.js (para la animación).

**Estado interno del canvas** (variables de clase, no expuestas al exterior):

| Variable | Propósito |
|---|---|
| `isPaused` | Si la simulación está detenida |
| `isDrawing` | Si debe acumular líneas en el historial |
| `angle1 / angle2` | Ángulos acumulados de cada órbita |
| `prevTipX / prevTipY` | Posición del punto final del fotograma anterior (modo curve) |
| `firstPoint` | Si el próximo punto es el primero del trazo continuo |
| `activeMode` | Modo activo reconocido por el canvas |
| `clearPending / resetPending` | Flags de acción diferida (se ejecutan en p.draw()) |
| `zoom` | Factor de zoom actual |
| `framesSinceLastLine` | Contador para el intervalo entre líneas (modo lines) |

Los flags `clearPending` y `resetPending` existen porque las acciones `clear` y `reset` se reciben en `onAction()`, que corre en la zona de Angular (suscripción al Subject), pero la lógica que modifica `lineHistory` debe ejecutarse dentro de `p.draw()`. Usar un flag diferido es el patrón estándar para comunicar Angular→p5 sin condiciones de carrera.

**Lifecycle**:
- `ngAfterViewInit()`: suscribe a `params$` y `action$`, luego llama `initSketch()`.
- `ngOnDestroy()`: cancela suscripciones y llama `sketch.remove()` para liberar el canvas del DOM.

### 9.3 `Controls` — panel de parámetros

Responsable de:
1. **Enlazar los parámetros** al modelo mediante `[(ngModel)]` y emitirlos a `PatternService` en cada cambio.
2. **Despachar acciones** (play, pause, clear, reset) al canvas vía `PatternService`.
3. **Exportar el patrón** a JSON (serializa `sessions` + sesión activa si la hay).
4. **Importar un JSON**, reconstruir las líneas con `replayToLines()`, y restaurar el estado.

El panel usa secciones colapsables de Bootstrap para los cuatro grupos de parámetros: Órbita 1, Órbita 2, Visual, Parámetros avanzados. Los controles se deshabilitan mientras `isPlaying = true`, lo que obliga al usuario a pausar antes de cambiar parámetros en curso.

### 9.4 `ExportModal` — exportación PNG

Modal que aparece al pulsar "Exportar imagen". Redibuja `patternService.lineHistory` sobre un `<canvas>` offscreen usando Canvas 2D API. Al ser un redibujo matemático del historial, la calidad es vectorial e independiente de la resolución del canvas en pantalla.

**Opciones del modal**:
- **Color de fondo**: selector de color libre o fondo transparente (PNG con alpha).
- **Zoom de exportación** (0.2×–4×): escala el dibujo dentro de la imagen exportada.
- **Multiplicador de resolución** (1×/2×/4×): multiplica las dimensiones del canvas en píxeles, produciendo imágenes de hasta 4× la resolución de pantalla.
- **Mostrar guías / punto central**: incluye u omite las elipses orbitales y el punto amarillo central.
- **Nombre de archivo**: nombre libre o nombre por defecto (`epicycloid_lineas_AAAA-MM-DD`).
- **Preview en tiempo real**: un canvas pequeño de máx. 320 px se actualiza con cada cambio de opción.

La exportación descarga un PNG usando `canvas.toDataURL('image/png')` con un link `<a>` temporal.

### 9.5 `Tutorial` — modal de bienvenida

Se muestra automáticamente la primera vez que el usuario abre la aplicación. Cuando el usuario cierra el modal con "No volver a mostrar" marcado, escribe la clave `epicycloid_tutorial_seen` en `localStorage`. En visitas posteriores, el modal no se muestra. El botón `?` en la esquina del panel de controles abre el tutorial en cualquier momento.

---

## 10. Interacción del usuario — guía completa

### 10.1 Primera visita

El usuario ve el modal de tutorial, que explica los dos modos y los controles básicos. Puede cerrarlo y marcarlo para no volver a mostrar.

### 10.2 Exploración básica

1. Pulsar **▶ Play** — arranca la animación. El canvas comienza a acumular líneas.
2. Observar cómo el patrón emerge gradualmente. Las zonas de alta densidad se vuelven más brillantes por acumulación de alpha.
3. Pulsar **⏸ Pausa** — detiene la animación. Los controles se desbloquean.

### 10.3 Modificación de parámetros

Con la simulación pausada, el usuario puede cambiar cualquier parámetro y pulsar Play de nuevo para continuar el dibujo con los nuevos valores. Cada bloque Play-Pause es una sesión independiente. Esto permite, por ejemplo:
- Iniciar con color blanco, pausar, cambiar a rojo, continuar.
- Cambiar la velocidad angular de una órbita a mitad del dibujo.
- Cambiar el grosor del trazo entre sesiones.

El lienzo **no se limpia al cambiar parámetros** (salvo el modo de visualización, que borra porque las coordenadas de ambos modos no son comparables).

### 10.4 Simulación por vueltas

La sección "Simular por órbitas" permite ejecutar exactamente N vueltas de una órbita antes de detenerse automáticamente:
1. Seleccionar la órbita de referencia (1 o 2).
2. Indicar el número de vueltas (acepta decimales, p. ej. `2.5`).
3. Pulsar **Simular**. El canvas acumula ángulo de referencia y se detiene cuando alcanza `N * 2π`.

Esto es especialmente útil cuando el usuario conoce la relación de velocidades y quiere obtener exactamente un ciclo completo del patrón antes de detenerse.

### 10.5 Zoom del canvas

- **Rueda del ratón** sobre el canvas: zoom in/out.
- **Botones ＋/−** en la esquina inferior derecha: zoom in/out en pasos de 0.15×.
- Rango: 0.33× (alejado) – 8× (acercado).
- El zoom afecta solo a la vista; no cambia las coordenadas del historial ni la simulación.

### 10.6 Limpiar y reiniciar

- **⬜ Limpiar lienzo**: borra el historial de líneas y reinicia los ángulos a 0. No cambia los parámetros.
- **↺ Reset**: restaura todos los parámetros a sus valores por defecto y borra el historial.

### 10.7 Exportar imagen

1. Pulsar **↓ Exportar imagen** — abre el modal de exportación.
2. Configurar fondo, zoom de exportación, resolución y opciones de guías.
3. Preview en tiempo real.
4. Pulsar **Guardar PNG** — descarga el archivo.

### 10.8 Exportar patrón (JSON)

1. Pulsar **↓ Exportar patrón (JSON)**.
2. Se descarga automáticamente un archivo `epicycloid_patron_AAAA-MM-DD.json` con todas las sesiones de la sesión actual (incluyendo la activa si la hay).
3. El archivo puede compartirse, guardarse y reimportarse en cualquier momento.

### 10.9 Importar patrón (JSON)

1. Pulsar **↑ Importar patrón (JSON)**.
2. Seleccionar un archivo `.json` exportado previamente.
3. La aplicación reconstruye el dibujo matemáticamente (en milisegundos, sin animación de replay).
4. Los parámetros del panel se actualizan al estado de la última sesión importada.
5. El usuario puede pulsar **▶ Play** para continuar el dibujo desde donde lo dejó.

---

## 11. Requisitos funcionales — estado de implementación

| ID | Descripción | Estado |
|---|---|---|
| RF1 | Generar composiciones visuales a partir de patrones orbitales paramétricos | Implementado — ambos modos funcionales |
| RF2 | Modificar parámetros en tiempo real (radios, velocidades, fases, colores…) | Implementado — todos los parámetros vinculados con `[(ngModel)]` |
| RF3 | Canvas actualiza dinámicamente sin recarga de página | Implementado — suscripción reactiva vía BehaviorSubject |
| RF4 | Iniciar, pausar y reiniciar la animación | Implementado — botones Play / Pausa |
| RF5 | Limpiar el canvas y empezar desde cero | Implementado — botón Limpiar |
| RF6 | Guardar composición como imagen PNG | Implementado — ExportModal con opciones de resolución, zoom, fondo y guías |
| RF7 | Guardar y recuperar presets de parámetros con nombre | **No implementado** — componente placeholder vacío |
| RF8 | Alternar entre modo curva epicicloidal y modo intersección de líneas | Implementado — botón de alternancia, ambos modos operativos |
| RF9 | Controles interactivos: sliders, selectores, campos numéricos | Implementado — sliders en fases e inclinación; inputs numéricos en el resto; selector de color nativo |
| RF10 | Mostrar valores actuales de los parámetros en pantalla | Implementado — inputs numéricos siempre reflejan el valor actual |
| RF11 | Integración correcta Angular ↔ p5.js | Implementado — modo instancia, AfterViewInit, OnDestroy, zona Angular |
| RF12 | Componentes Angular modulares y reutilizables | Implementado — Canvas / Controls / PatternService desacoplados |
| RF13 | Canvas responsivo que se adapta al tamaño de la ventana | Implementado — `windowResized` de p5 redimensiona canvas y actualiza `canvasDimensions` |
| RF14 | Variación aleatoria automática de parámetros | **No implementado** |
| RF15 | Restaurar parámetros por defecto en cualquier momento | Implementado — botón Reset restaura `DEFAULT_PARAMS` |

## 12. Requisitos no funcionales — decisiones de implementación

| ID | Descripción | Decisión de implementación |
|---|---|---|
| RNF1 | Compatibilidad con navegadores modernos | HTML5 Canvas API, ES2022+, sin APIs propietarias |
| RNF2 | Angular como framework estructural | Angular 21 standalone, sin NgModules |
| RNF3 | p5.js para gráficos, integración correcta en Angular | Modo instancia, `runOutsideAngular`, `sketch.remove()` en `OnDestroy` |
| RNF4 | UI intuitiva para usuarios no técnicos | Tutorial de bienvenida, labels descriptivos, controles agrupados por categoría |
| RNF5 | Rendimiento fluido en dispositivos de gama media | p5 fuera de la zona Angular; posible degradación con >100k segmentos |
| RNF6 | Arquitectura modular y mantenible | Separación core/features, responsabilidades únicas por componente |
| RNF7 | Código bien documentado y estructurado | Tipado estricto TypeScript; archivos de contexto en `claude/` |
| RNF8 | Minimizar uso de CPU durante animación continua | `runOutsideAngular` evita ciclos de detección de cambios innecesarios |
| RNF9 | Layout responsivo para escritorio y tableta | Bootstrap grid col-8/col-4; canvas ocupa el espacio disponible |
| RNF10 | Manejo básico de errores en inputs | **Pendiente** — no hay clamp ni validación activa en `onParamChange()` |
| RNF11 | Compatible con Chrome, Firefox, Edge, Opera | Canvas 2D API estándar; probado en Chrome y Firefox |
| RNF12 | Despliegue en Netlify | CI/CD automático desde GitHub en cada push a `main` |

---

## 12. Limitaciones conocidas y trabajo futuro

### Limitaciones activas

1. **RPM = 0 en modo simulación**: si la velocidad de la órbita de referencia es 0 RPM, el acumulador de ángulo nunca alcanza el objetivo y la simulación no termina. No hay guard en la UI.
2. **Rendimiento con historial grande**: `lineHistory` se redibuja completo cada fotograma. Con >100.000 segmentos el rendimiento puede degradarse en dispositivos de gama baja.
3. **Resize del canvas**: al redimensionar la ventana, las coordenadas de `lineHistory` siguen siendo válidas (son en espacio mundo), pero el punto de continuidad del trazo se reinicia (`firstPoint = true`). Esto solo afecta a la sesión activa.

### Trabajo futuro

- **RF7 — Presets**: guardar y recuperar conjuntos de parámetros con nombre en `localStorage`. El componente `presets/` existe como placeholder.
- **RF14 — Variación aleatoria**: parámetros que varían automáticamente dentro de rangos configurables por el usuario.
- **RNF10 — Validación de inputs**: clamp en `onParamChange()` o directivas de validación en los inputs para prevenir valores fuera de rango.

---

## Apéndice A — Valores por defecto (`DEFAULT_PARAMS`)

| Parámetro | Valor por defecto |
|---|---|
| Radio órbita 1 | 150 px |
| Radio órbita 2 | 200 px |
| Velocidad órbita 1 | 6.0 RPM |
| Velocidad órbita 2 | 3.0 RPM |
| Fase inicial ambas | 0° |
| Factor elíptico X/Y (ambas órbitas) | 1.0 (círculo perfecto) |
| Inclinación (ambas órbitas) | 0° |
| Color de trazo | `#ffffff` (blanco) |
| Opacidad | 0.6 |
| Grosor | 1 px |
| Intervalo entre líneas | 0 (continuo — una línea por fotograma) |
| Modo de visualización | `lines` (intersección de líneas) |

---

## Apéndice B — Constante de conversión RPM→rad/fotograma

```
RPM_TO_RAD_PER_FRAME = (2π) / (60 fps × 60 s/min)
                      = 6.283... / 3600
                      ≈ 0.001745 rad/fotograma
```

A 6 RPM: `6 × 0.001745 ≈ 0.01047 rad/fotograma`. En 3600 fotogramas (1 minuto a 60 fps), el ángulo acumulado es exactamente `6 × 2π = 37.7 rad`, es decir, 6 vueltas completas. La conversión es exacta.

---

## Apéndice C — Estructura del JSON exportado

```json
{
  "metadata": {
    "exportedAt": "ISO 8601 timestamp",
    "totalSessions": 2,
    "visualizationMode": "lines"
  },
  "sessions": [
    {
      "sessionIndex": 1,
      "params": {
        "orbit1Radius": 150,
        "orbit2Radius": 200,
        "orbit1EllipseX": 1, "orbit1EllipseY": 1,
        "orbit2EllipseX": 1, "orbit2EllipseY": 1,
        "orbit1Angle": 0, "orbit2Angle": 0,
        "orbit1SpeedRpm": 6, "orbit2SpeedRpm": 3,
        "initialAngle1": 0, "initialAngle2": 0,
        "lineColor": "#ffffff",
        "lineAlpha": 0.6,
        "strokeWeight": 1,
        "lineInterval": 0,
        "visualizationMode": "lines"
      },
      "frameCount": 3600,
      "durationSeconds": 60.0,
      "endAngle1": 37.699...,
      "endAngle2": 18.849...,
      "endTipX": 0,
      "endTipY": 0,
      "endFirstPoint": true
    }
  ]
}
```
