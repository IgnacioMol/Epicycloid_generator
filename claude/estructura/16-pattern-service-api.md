# 16 — `PatternService`: el estado central (API completa)

Referencia **exhaustiva** del servicio que actúa como **única fuente de verdad** del proyecto. Archivo: [pattern.service.ts](src/app/core/pattern.service.ts). Visión de flujo en [04 — Flujo de ejecución y datos](04-flujo-ejecucion-y-datos.md); modelo de datos en [17 — Modelo de datos](17-modelo-de-datos.md).

Es un servicio *singleton* (`@Injectable({ providedIn: 'root' })`), por lo que `Canvas`, `Controls` y `ExportModal` comparten **la misma instancia**. Desacopla a esos componentes (no se conocen entre sí; RNF6).

---

## Constantes y valores por defecto

### `RPM_TO_RAD_PER_FRAME` ([pattern.service.ts:7](src/app/core/pattern.service.ts#L7))
```ts
const RPM_TO_RAD_PER_FRAME = (Math.PI * 2) / (60 * 60); // 2π / (60 s · 60 fps)
```
Convierte velocidad en RPM a radianes por fotograma (60 fps). **Se define en dos sitios** (aquí y en [canvas.ts:8](src/app/features/canvas/canvas.ts#L8)) porque la simulación se calcula en dos lugares: el bucle vivo (`draw()`) y la reconstrucción (`replaySessionsToLines()`). Ambos deben usar la misma constante para que el *replay* coincida exactamente con el dibujo original.

### `DEFAULT_PARAMS` ([pattern.service.ts:9-27](src/app/core/pattern.service.ts#L9-L27))
El patrón por defecto: órbitas de radio 150/200, círculos (factores elípticos 1), sin inclinación, velocidades 6.0/3.0 RPM, fases 0, color blanco, opacidad 0.6, grosor 1, sin intervalo, modo `lines`. Es el estado inicial de `paramsSubject`, la base de `applyPreset()`/`reset()` y el punto de partida de los presets (que solo sobrescriben lo que difiere).

### `CanvasAction` ([pattern.service.ts:5](src/app/core/pattern.service.ts#L5))
```ts
type CanvasAction = 'play' | 'pause' | 'clear' | 'reset' | 'import-json' | 'undo';
```
El conjunto cerrado de órdenes que `Controls` puede enviar al `Canvas` por `action$`.

---

## Canales de comunicación (observables RxJS)

| Miembro | Tipo | Rol |
|---|---|---|
| `paramsSubject` | `BehaviorSubject<PatternParams>` (privado) | Guarda y emite los **parámetros activos**. Es `BehaviorSubject` (no `Subject`) para que todo nuevo suscriptor reciba **inmediatamente** el valor actual. |
| `actionSubject` | `Subject<CanvasAction>` (privado) | Emite **órdenes puntuales**. Es `Subject` (sin valor inicial) porque una acción solo interesa en el momento en que ocurre. |
| `params$` | `Observable<PatternParams>` | Versión pública de solo lectura de `paramsSubject`. El `Canvas` se suscribe. |
| `action$` | `Observable<CanvasAction>` | Versión pública de `actionSubject`. El `Canvas` se suscribe. |

**Por qué `BehaviorSubject` para params y `Subject` para acciones:** los parámetros son **estado** (siempre hay un valor vigente); las acciones son **eventos** (no tienen "valor actual"). Esta distinción es un buen punto a defender ante el tribunal ([13](13-preguntas-tribunal.md)).

---

## Estado mutable compartido (leído directamente, sin observables)

| Campo | Tipo | Quién lo escribe / lee |
|---|---|---|
| `lineHistory` | `LineRecord[]` | Lo **escribe** `Canvas.draw()` (añade cada línea) y lo **leen** `ExportModal` (para exportar) y el propio canvas (para pintar la estela). |
| `canvasDimensions` | `{w,h}` | Lo fija `Canvas` en `setup`/`windowResized`; lo lee `ExportModal` para la resolución. |
| `sessions` | `SimulationSession[]` | Bloques de animación completados. Lo gestionan `endSession`/`removeLastSession`/`clearSessions`. |
| `importState` | `{angle1,angle2,tipX,tipY,firstPoint} \| null` | Estado a restaurar en el lienzo tras importar JSON; lo fija `Controls.onFileSelected`, lo lee `Canvas` en `onAction('import-json')`. |

**Campos privados de la sesión activa** ([pattern.service.ts:43-52](src/app/core/pattern.service.ts#L43-L52)): `_sessionParams`, `_sessionFrameCount`, `_sessionActive` (la sesión en curso) y `_stateAngle1/2`, `_stateTipX/Y`, `_stateFirstPoint` (el estado vivo del dibujo, que el canvas actualiza cada fotograma).

**Por qué observables + estado mutable mezclados:** los observables *avisan* de cambios de forma reactiva y desacoplada; el estado mutable lo lee el bucle de p5 **directamente cada fotograma**, sin pasar por Angular, para que el dibujo sea barato (RNF8). Ver [04](04-flujo-ejecucion-y-datos.md).

---

## Métodos — API pública

### Parámetros y acciones
- **`updateParams(params)`** ([pattern.service.ts:57-59](src/app/core/pattern.service.ts#L57-L59)): emite nuevos parámetros por `params$` (`paramsSubject.next`). El lienzo los recoge y redibuja al siguiente fotograma. RF2/RF3.
- **`getCurrentParams()`** ([pattern.service.ts:61-63](src/app/core/pattern.service.ts#L61-L63)): devuelve el valor actual de `paramsSubject` sin suscribirse. Lo usa `ExportModal`.
- **`dispatch(action)`** ([pattern.service.ts:65-67](src/app/core/pattern.service.ts#L65-L67)): emite una orden por `action$`.

### Ciclo de vida de una sesión
- **`beginSession(params)`** ([pattern.service.ts:69-73](src/app/core/pattern.service.ts#L69-L73)): copia los parámetros del bloque, reinicia el contador de fotogramas y marca la sesión activa. Lo llama `Canvas` al recibir `'play'`.
- **`incrementSessionFrame()`** ([pattern.service.ts:75-77](src/app/core/pattern.service.ts#L75-L77)): suma un fotograma a la sesión activa (cada fotograma dibujado).
- **`setCurrentState(angle1, angle2, tipX, tipY, firstPoint)`** ([pattern.service.ts:80-86](src/app/core/pattern.service.ts#L80-L86)): guarda el **estado final vivo** del dibujo (se llama cada fotograma activo, tras incrementar ángulos).
- **`endSession()`** ([pattern.service.ts:88-106](src/app/core/pattern.service.ts#L88-L106)): cierra la sesión activa y, **si tuvo al menos un fotograma**, la añade a `sessions[]` con sus parámetros, nº de fotogramas, duración (`frameCount/60`) y estado final. Lo llama `Canvas` al `'pause'`.
- **`snapshotActiveSession()`** ([pattern.service.ts:109-122](src/app/core/pattern.service.ts#L109-L122)): devuelve una **copia** de la sesión en curso (o `null`). Permite exportar aunque la animación no se haya detenido (lo usa `exportJson`).

### Deshacer y reconstrucción
- **`removeLastSession()`** ([pattern.service.ts:130-139](src/app/core/pattern.service.ts#L130-L139)): si hay sesión activa, la cierra; si no quedan sesiones, vacía `lineHistory` y devuelve `null`; si quedan, retira la última (`sessions.pop()`) y **reconstruye** `lineHistory` con `replaySessionsToLines(sessions)`. Devuelve la sesión retirada. Base del deshacer (RF5).
- **`replaySessionsToLines(sessions)`** ([pattern.service.ts:147-206](src/app/core/pattern.service.ts#L147-L206)): **reproduce la simulación** de cada sesión fotograma a fotograma, aplicando la misma matemática que `draw()` ([03](03-modelo-matematico.md)), y regenera la lista completa de `LineRecord`. De paso **actualiza el estado final** (`endAngle1/2`, `endTipX/Y`, `endFirstPoint`) de cada sesión, para poder continuar desde la última. **Se reutiliza tanto al deshacer como al importar**, lo que garantiza un resultado idéntico al dibujo original. Es el método más algorítmicamente denso del servicio.

### Limpieza
- **`clearSessions()`** ([pattern.service.ts:208-219](src/app/core/pattern.service.ts#L208-L219)): reinicia todas las sesiones, el estado de sesión activa, el estado vivo y `importState`. Lo usa `Canvas` en reset y cambio de modo.

---

## Invariante clave

> Estando en pausa, **`lineHistory` es exactamente igual al *replay* de `sessions[]`**.

Sobre esta garantía se construyen el **deshacer** (quitar una sesión y recomputar) y la **importación** (cargar sesiones y recomputar). Es la razón de que el modelo guarde **sesiones (datos)** y no píxeles: permite deshacer, exportar/importar y rerasterizar al hacer zoom. Ver [12 — Decisiones técnicas](12-decisiones-tecnicas.md).

---

## Diagrama de colaboración (texto)

```
Controls  --updateParams()-->  PatternService.params$  --suscripción-->  Canvas.draw()
Controls  --dispatch(accion)-> PatternService.action$  --suscripción-->  Canvas.onAction()
Canvas    --lineHistory.push / setCurrentState / incrementSessionFrame--> PatternService (estado)
ExportModal --lee lineHistory / canvasDimensions / getCurrentParams()--> PatternService
```
