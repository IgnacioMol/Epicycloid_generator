# Diario de desarrollo — Epicycloid Generator (TFG)

Registro cronológico de sesiones de trabajo y cambios relevantes del proyecto.

---

## 2026-06-13 (sesión 2) — Ajuste de rangos y validación de inputs (RNF10)

### Cambios realizados

**Nuevos límites min/max de parámetros (`controls.html`)**
- Grosor de trazo: `0–1` (step 0.1; antes 0.5–10).
- Intervalo entre líneas: `0–1 s` (antes el número llegaba a 60 y el slider a 10).
- Velocidad angular (ambas órbitas): `1–50 RPM` (antes 0–100).
- Radio (ambas órbitas): `50–350` (antes 10–500).

**Validación de rango en todos los inputs (RNF10)**
- `controls.ts`: nuevo mapa `PARAM_RANGES` (min/max/step de cada parámetro numérico) como única fuente de verdad, reutilizado por la aleatorización y la validación.
- Nuevo método `clampParams()`: si un valor se sale por arriba o por abajo (o es inválido/NaN), lo fija al máximo o mínimo correspondiente. Se invoca con el evento `(change)` de cada input numérico (al confirmar la edición, no en cada pulsación, para no impedir la escritura).
- `randomize()` refactorizado para iterar sobre `PARAM_RANGES`, de modo que los nuevos rangos se aplican automáticamente también a la aleatorización.

### Estado al cierre de sesión
- RNF10 (validación de inputs) completado.
- Pendiente: RF7 (presets), RNF12 (despliegue en Netlify).

---

## 2026-06-13 — RF12: aleatorización controlada de parámetros

### Cambios realizados

**Nueva funcionalidad: generación de variaciones aleatorias controladas (RF12)**
- `controls.ts`: nuevo método `randomize()` que asigna un valor aleatorio a cada parámetro del patrón. Cada valor queda dentro de los mismos límites `min`/`max` y alineado al `step` definido en los controles del HTML, garantizando que el resultado sea siempre reproducible manualmente por el usuario (ningún valor "imposible" de introducir).
- Helpers privados: `randInRange(min, max, step)` (alinea al step y redondea para evitar errores de coma flotante) y `randColor()` (color hexadecimal `#rrggbb` aleatorio).
- Se conserva el modo de visualización (`visualizationMode`): no es un valor numérico sino la decisión del usuario sobre qué tipo de patrón generar.
- `controls.html`: nuevo botón "🎲 Aleatorizar parámetros" situado encima de los botones Play/Pausa, deshabilitado mientras la simulación está en curso (`isPlaying`).

### Estado al cierre de sesión
- RF12 (variación aleatoria) completado.
- Pendiente: RF7 (presets), RNF10 (validación de inputs), RNF12 (despliegue en Vercel).

---

## 2026-06-02 (sesión 2) — Correcciones de importación JSON + estado final de sesión

### Cambios realizados

**Bug: canvas en blanco tras importar JSON con modo de visualización distinto**
- Causa raíz: en `onFileSelected`, el orden era `dispatch('import-json')` → `updateParams()`. Al llegar el siguiente frame al canvas, `this.params.visualizationMode` ya era el modo importado pero `this.activeMode` seguía siendo el modo anterior. El bloque `if (mode !== this.activeMode)` en `p.draw()` detectaba el cambio y limpiaba `lineHistory`, borrando el patrón recién importado.
- Corrección en `controls.ts`: invertir el orden — `updateParams()` antes de `dispatch` — para que `this.params` en canvas ya tenga el modo correcto cuando se ejecuta el handler.
- Corrección en `canvas.ts`: añadir `this.activeMode = this.params.visualizationMode` en el case `'import-json'`, de forma que en el siguiente frame no se detecte ningún cambio de modo.

**Mejora: selector de fichero sin filtro de extensión**
- Eliminado `input.accept = '.json,application/json'` para que el patrón pueda importarse con cualquier nombre de archivo.

**Nueva funcionalidad: estado angular final por sesión**
- `SimulationSession` ampliado con `endAngle1`, `endAngle2`, `endTipX`, `endTipY`, `endFirstPoint`.
- `PatternService`: nuevo método `setCurrentState()`. `endSession()` y `snapshotActiveSession()` usan esos valores para rellenar los campos `end*`. `clearSessions()` los resetea.
- `canvas.ts`: llama a `setCurrentState()` tras cada incremento de ángulo en el loop activo. Al recibir `'import-json'`, restaura los ángulos y la posición del extremo de curva desde `patternService.importState`.
- `controls.ts`: `replayToLines()` calcula y guarda el estado final por sesión. Antes del `dispatch`, copia el estado de la última sesión a `patternService.importState`.
- Efecto: al importar un JSON y pulsar Play, la animación continúa exactamente desde donde terminó la última sesión exportada.
- Retrocompatibilidad: JSONs sin campos `end*` usan `?? 0` / `?? true` como fallback.

**Rama de trabajo:** `feature/export_pattern_json`

### Estado al cierre de sesión
- Importación robusta: el canvas siempre muestra el patrón al importar, independientemente del modo de visualización activo.
- El dibujo puede continuarse tras importar sin discontinuidad de ángulo ni posición.
- Pendiente: RF7 (presets), RF14 (variación aleatoria), RNF10 (validación de inputs), RNF12 (despliegue en Vercel).

---

## 2026-06-02 — Exportación e importación de patrón en JSON

### Cambios realizados

**Nuevo modelo: `SimulationSession` (`pattern-params.model.ts`)**
- Interfaz `{ sessionIndex, params, frameCount, durationSeconds }` que representa un bloque continuo de simulación: los parámetros con los que se lanzó y cuántos frames estuvo activa.

**Tracking de sesiones en `PatternService`**
- Nuevos métodos: `beginSession(params)`, `incrementSessionFrame()`, `endSession()`, `snapshotActiveSession()`, `clearSessions()`.
- El array `sessions: SimulationSession[]` acumula todas las sesiones completadas. Una sesión comienza cuando el usuario pulsa Play y termina cuando pulsa Pausa, Reset, o cambia de modo de visualización.

**Integración en `canvas.ts`**
- `play` → llama a `beginSession(params)` con los parámetros actuales.
- `pause` (si estaba en marcha) → llama a `endSession()`.
- `reset` / cambio de modo → llama a `endSession()` + `clearSessions()` antes de limpiar el estado visual.
- Cada frame activo (`!isPaused`) → llama a `incrementSessionFrame()`.
- Nuevo action `'import-json'`: resetea ángulos, `firstPoint`, contadores y deja `isPaused = true` sin tocar `lineHistory` (permite cargar el historial externamente de forma atómica).

**Exportar patrón (JSON) — `controls.ts` / `controls.html`**
- Botón «↓ Exportar patrón (JSON)» (deshabilitado si no hay ninguna sesión registrada).
- Genera un JSON con `metadata` (fecha, total de sesiones, modo) y el array `sessions`, incluyendo un snapshot de la sesión activa si la simulación está en marcha en el momento de exportar.
- La descarga se dispara con `URL.createObjectURL` + click programático.

**Importar patrón (JSON) — `controls.ts` / `controls.html`**
- Botón «↑ Importar patrón (JSON)» que abre el selector de fichero nativo (`.json`).
- Valida estructura mínima (`sessions`, `params`, `frameCount`) y descarta archivos malformados silenciosamente.
- Reproduce matemáticamente todas las sesiones frame a frame con la misma lógica que `canvas.ts`: ángulos y posición de punta de curva son continuos entre sesiones, igual que en la simulación en vivo.
- Instantáneo: las líneas se calculan de golpe y se inyectan en `patternService.lineHistory`. Los controles se actualizan con los parámetros de la última sesión importada.

**Rama de trabajo:** `feature/export_pattern_json`

### Estructura del JSON exportado
```json
{
  "metadata": { "exportedAt": "…", "totalSessions": 2, "visualizationMode": "lines" },
  "sessions": [
    { "sessionIndex": 1, "frameCount": 360, "durationSeconds": 6.0, "params": { … } },
    { "sessionIndex": 2, "frameCount": 120, "durationSeconds": 2.0, "params": { … } }
  ]
}
```

### Estado al cierre de sesión
- Exportación e importación de patrón JSON completamente funcionales.
- Reproducción matemática exacta: un JSON importado genera el mismo dibujo que la sesión original.
- Pendiente: RF7 (presets), RF14 (variación aleatoria), RNF10 (validación de inputs), RNF12 (despliegue en Vercel).

---

## 2026-05-30 — RF6: Exportación de imagen + corrección de calidad de líneas

### Cambios realizados

**Nuevo componente: `ExportModal` (`src/app/features/export-modal/`)**
- Modal completo de exportación accesible desde el botón «↓ Exportar imagen» en el panel de controles.
- **Opciones de exportación:**
  - Fondo: color libre con selector de color o transparente (checkerboard en la preview).
  - Zoom de exportación: slider 0.2×–4× para controlar el área visible en la imagen exportada.
  - Resolución: multiplicador 1×/2×/4× (escala todo el canvas de salida).
  - Visibilidad de círculos de referencia y punto central en la imagen exportada.
  - **Nombre del archivo**: campo de texto libre; si se deja vacío se usa `epicycloid_<modo>_<YYYY-MM-DD>.png`.
- **Vista previa en tiempo real** (máx. 320 px) que refleja todos los cambios de opciones.
- La imagen se renderiza redibuando el historial de líneas sobre un `<canvas>` offscreen con la API Canvas 2D, garantizando calidad vectorial independiente de la resolución elegida.

**Refactorización del trail buffer → historial vectorial (`canvas.ts`, `pattern.service.ts`)**
- Eliminado el trail buffer (`p5.Graphics`, `TRAIL_SCALE = 3`) que upscaleaba un bitmap y perdía calidad al hacer zoom in.
- Reemplazado por `lineHistory: LineRecord[]` en `PatternService`: array de segmentos `{x1,y1,x2,y2,r,g,b,a,sw}` en coordenadas de mundo.
- En cada frame `p.draw`, las líneas se redibujan con la API Canvas 2D (`ctx.save/translate/scale/restore`) a la transformación activa, obteniendo calidad vectorial a cualquier nivel de zoom.
- `LineRecord` e `ExportOptions` añadidos a `pattern-params.model.ts`.

**Corrección de bug: alpha incorrecto a zoom > 1**
- Al agrupar varios segmentos en un único `beginPath … stroke()`, Canvas 2D pinta cada píxel una sola vez dentro de esa llamada (comportamiento de spec), colapsando intersecciones a la misma intensidad plana.
- Solución: cada `LineRecord` tiene su propio `ctx.beginPath() / ctx.moveTo / ctx.lineTo / ctx.stroke()`. Las líneas superpuestas acumulan alpha correctamente via compositing `source-over`.
- El fix se aplica tanto en `canvas.ts` (render en tiempo real) como en `export-modal.ts` (render de exportación).

**Rama de trabajo:** `update/view`

### Estado al cierre de sesión
- RF6 completamente implementado: exportación PNG con opciones de fondo, zoom, resolución, visibilidad y nombre de archivo.
- Zoom del lienzo sin pérdida de calidad a ningún nivel.
- Pendiente: RF7 (presets), RF10 (mostrar valores actuales), RF14 (variación aleatoria), RNF10 (validación de inputs), RNF12 (despliegue en Vercel).

---

## 2026-05-29 — Zoom en el lienzo (scroll y botones)

### Cambios realizados

**Zoom interactivo en el canvas (`src/app/features/canvas/`)**
- `canvas.ts`: añadida variable `zoom` (rango 0.33×–8×, paso 0.15). Métodos públicos `zoomIn()` y `zoomOut()`. Handler `p.mouseWheel` con guard de límites del canvas (`p.mouseX/mouseY`) para que el scroll solo haga zoom cuando el puntero está sobre el lienzo y no interfiera con el scroll del panel de controles. Render pipeline: `translate(cx,cy) → scale(zoom)` con trail e imaged como `p.image(trail, -tcx, -tcy)`. Trail buffer creado a **3× el tamaño del canvas** (`TRAIL_SCALE = 3`) para que al zoom mínimo (1/3) el buffer llene exactamente la pantalla y no aparezcan bordes de recorte al alejar la vista.
- `canvas.html`: envuelto en `.canvas-wrapper` (posición relativa). Añadido panel `.zoom-controls` superpuesto en la esquina inferior derecha con dos botones (`zoomIn` / `zoomOut`) con iconos Font Awesome 6 solid (`fa-solid fa-magnifying-glass-plus/minus`).
- `canvas.css`: estilos para `.canvas-wrapper`, `.zoom-controls` y `.zoom-btn` (fondo semitransparente, borde, hover).

**Correcciones de esta sesión**
- Icono de lupa: cambiado de `fa-regular` a `fa-solid` (la variante `regular` requiere FA Pro; `solid` está en la versión gratuita).
- Recorte de líneas al hacer zoom out: resuelto con el trail buffer 3×.
- Scroll en controles: resuelto con guard de coordenadas en `mouseWheel` (sustituido posteriormente por guard de `event.target`).
- Scroll del tutorial interceptado por el zoom: p5 2.x registra `wheel` a nivel `window`, por lo que el handler se disparaba aunque el modal estuviese encima del canvas. Solución: almacenar el elemento canvas nativo en `canvasEl` al crear el sketch y comprobar `event.target !== canvasEl` antes de actuar; si el scroll no viene del canvas se retorna sin `return false`, dejando el comportamiento por defecto del browser intacto.
- Ventana del tutorial demasiado grande tras añadir el nuevo paso: `tutorial.css` actualizado con `max-height: min(600px, 90vh)` y layout flex-column; `.tutorial-steps` pasa a `overflow-y: auto` con scrollbar fina (4 px) para absorber contenido extra sin agrandar el card.

**Tutorial (`src/app/features/tutorial/`)**
- `tutorial.html`: añadido paso 4 «Zoom en el lienzo» explicando la rueda del ratón y los botones de lupa.
- `tutorial.css`: card con altura máxima y scroll interno en la lista de pasos.

**Dependencia externa**
- `index.html`: añadido Font Awesome 6.7.2 CDN (`all.min.css`).

**Rama de trabajo:** `update/view`

### Estado al cierre de sesión
- Zoom funcional con scroll del ratón y botones de lupa; no interfiere con el scroll del tutorial ni del panel de controles.
- Pendiente: RF6 (guardar imagen), RF7 (presets), RF14 (variación aleatoria).

---

## 2026-05-28 (sesión 3) — Tutorial de bienvenida y botón de ayuda

### Cambios realizados

**Nuevo componente: `Tutorial` (`src/app/features/tutorial/`)**
- Popup modal que aparece automáticamente al cargar la página con cinco pasos de inicio rápido: modo de visualización, ajuste de órbitas, Play, parámetros avanzados y controles de lienzo.
- Opción "No volver a mostrar" con persistencia en `localStorage` (`epicycloid_tutorial_seen`).
- Se puede cerrar pulsando el botón "¡Empezar!" o haciendo clic fuera del card.
- Animaciones de entrada: fade-in en el overlay, slide-up en el card.

**Botón de ayuda `?`**
- Botón circular fijo en la esquina superior izquierda (`position: fixed`), siempre visible.
- Al pulsarlo vuelve a abrir el tutorial (resetea también el checkbox "No volver a mostrar").

**Integración en el app raíz**
- `app.ts`: importa `Tutorial` como standalone component.
- `app.html`: añade `<app-tutorial>` antes del layout principal.

### Estado al cierre de sesión
- Tutorial funcional con persistencia de preferencia de usuario.
- Pendiente: RF6 (guardar imagen), RF7 (presets), RF14 (variación aleatoria), re-implementación del bug de simulate con corrección de `ngZone`.

---

## 2026-05-28 — Refinamiento de UI, simulate N órbitas y documentación

### Cambios realizados

**Nueva funcionalidad: Simular por N órbitas**
- El usuario puede seleccionar una órbita de referencia (1 o 2) e indicar un número de vueltas (p. ej. `2.5`).
- La simulación corre exactamente esas vueltas y se detiene sola.
- Implementado en: `PatternService` (nuevos `SimulateConfig`, `startSimulate()`, `simulationFinished$`), `canvas.ts` (acumulador de ángulo por frame), `controls.ts` (nuevos campos y método `simulate()`), `controls.html` (bloque de UI).

**Refinamiento del panel de controles**
- Las secciones **Órbita 1**, **Órbita 2**, **Visual** y **Parámetros avanzados** son ahora colapsables (`<details>`).
- Los sliders se eliminaron de todos los parámetros salvo los ángulos (Fase inicial e Inclinación), donde sí aportan valor visual. El resto usa solo campos numéricos.

**Correcciones de bugs**
- Investigado y corregido el bug de interfaz bloqueada tras finalizar la simulación: la causa raíz era que p5.js corría dentro de la zona de Angular (Zone.js parcheaba su `requestAnimationFrame`), por lo que `ngZone.run()` era un no-op y Angular nunca detectaba el cambio de `isPlaying`. Solución: inicializar p5 con `ngZone.runOutsideAngular()`.
- La acción `pause` en el canvas ya no hace toggle de `isPaused` sino que lo pone a `true` de forma explícita. Reanudar siempre pasa por Play.

**Documentación actualizada**
- `README.md`: refleja la UI actual (colapsables, simulate, tabla de parámetros completa).
- `claude/overview.md`: estado real de implementación (hecho / pendiente).
- `claude/implementation-notes.md`: interfaz `PatternParams` real, convención RPM→rad/frame, patrón `runOutsideAngular`, contrato de estado Controls↔Canvas.
- `claude/feature-time-rewind.md` (**nuevo**): doc de diseño para la funcionalidad de retroceder en el tiempo (pendiente de implementar).

### Estado al cierre de sesión
- Funcionalidad base completa y funcional.
- Simulate N órbitas implementado; bug de desbloqueo de UI en investigación/corrección.
- Pendiente: RF6 (guardar imagen), RF7 (presets), RF14 (variación aleatoria).

---

## 2026-05-04 — Actualización del README

### Cambios realizados
- `README.md` actualizado con instrucciones de uso, guía de parámetros y sección de despliegue en Vercel.

---

## 2026-05-02 — Controles y canvas funcionales (`fc7cf0d`, `141613a`)

### Cambios realizados

**Canvas (`canvas.ts`)**
- Integración completa de p5.js en modo instancia dentro de `ngAfterViewInit`.
- Capa de trazado independiente (`p5.Graphics trail`) para acumular líneas sin borrar el fondo.
- Dos modos de visualización implementados:
  - **Intersección de líneas**: línea entre dos planetas independientes en cada frame.
  - **Curva epicicloidal**: planeta 2 orbita alrededor del extremo del planeta 1; se traza el punto final.
- Soporte de parámetros avanzados: factores elípticos X/Y, inclinación de órbita (rotación del plano).
- Canvas responsive (`p.windowResized`): redimensiona canvas y buffer trail al cambiar el tamaño de ventana.
- Acciones `play`, `pause`, `clear`, `reset` recibidas desde `PatternService`.

**Controles (`controls.ts` / `controls.html`)**
- Todos los parámetros de `PatternParams` enlazados con `[(ngModel)]`.
- Sección de parámetros avanzados colapsable (`<details>`).
- Botones Play / Pausa / Limpiar lienzo / Reset conectados al servicio.
- Bloqueo de controles durante la simulación (`params-locked`).

**Modelo de datos (`pattern-params.model.ts`)**
- Interfaz `PatternParams` completa: radios, velocidades RPM, ángulos iniciales, factores elípticos, inclinación, color, alpha, grosor, intervalo de líneas, modo de visualización.

**Servicio (`pattern.service.ts`)**
- `BehaviorSubject<PatternParams>` para el estado de parámetros.
- `Subject<CanvasAction>` para comandos puntuales (play, pause, clear, reset).

### Estado al cierre de sesión
- Generador funcional con ambos modos. Parámetros completamente enlazados.

---

## 2026-04-26 — Setup inicial del proyecto (`93007af`)

### Cambios realizados
- Proyecto Angular 21 creado con Angular CLI.
- Estructura de carpetas: `core/`, `features/canvas/`, `features/controls/`, `features/presets/`, `models/`.
- Componentes raíz con layout Bootstrap: canvas a la izquierda (col-8), controles a la derecha (col-4).
- Dependencias instaladas: p5.js 2.2.3, Bootstrap 5.3, Vitest.
- Configuración de Vitest para tests unitarios en entorno jsdom.
- Carpeta `claude/` con documentación de contexto inicial para el asistente IA.

### Estado al cierre de sesión
- Scaffolding completo. Canvas y controles como placeholders sin funcionalidad.

---

_Este archivo se actualiza al final de cada sesión de trabajo._
