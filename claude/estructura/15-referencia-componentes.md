# 15 — Referencia de componentes (clase a clase, miembro a miembro)

Recorrido **exhaustivo** de cada componente Angular del proyecto: sus campos, métodos y el porqué de cada uno, con referencia al archivo y la línea. Complementa la visión de [02 — Arquitectura](02-arquitectura.md). Para el servicio de estado, ver [16 — PatternService](16-pattern-service-api.md); para el modelo de datos, [17 — Modelo de datos](17-modelo-de-datos.md).

Componentes cubiertos: `AppComponent`, `Canvas`, `Controls`, `ExportModal`, `Tutorial`. (El sistema i18n se trata en [07](07-i18n.md) y [07b](07b-pipe-traduccion.md).)

---

## `AppComponent` — componente raíz

Archivo: [app.ts](src/app/app.ts) · plantilla [app.html](src/app/app.html).

Es el componente raíz (`selector: 'app-root'`). Compone la vista y gobierna el **selector de idioma**. Importa `Canvas`, `Controls` y `Tutorial` (componentes *standalone*).

| Miembro | Tipo | Qué hace |
|---|---|---|
| `i18n` | `I18nService` (inyectado con `inject()`) | Acceso al idioma activo y a la lista de idiomas. |
| `langMenuOpen` | `boolean` | Si el desplegable de idiomas está abierto. Lo alterna la plantilla. |
| `currentLanguageLabel` | getter `string` | Nombre del idioma activo (`label`) para mostrarlo en el botón; lo busca en `i18n.languages` comparando con `i18n.lang()`. |
| `selectLang(code)` | método | Llama a `i18n.setLang(code)` y cierra el menú. |

**Detalle clave:** el getter `currentLanguageLabel` **lee la señal `i18n.lang()`**. Por eso, al cambiar de idioma, Angular marca `AppComponent` como "sucio" y dispara un ciclo de detección de cambios que retraduce toda la interfaz (mecanismo explicado en [07b](07b-pipe-traduccion.md)). `AppComponent` es, por tanto, el "ancla reactiva" del cambio de idioma en una app *zoneless*.

---

## `Canvas` — el lienzo p5.js

Archivo: [canvas.ts](src/app/features/canvas/canvas.ts) · plantilla [canvas.html](src/app/features/canvas/canvas.html) · estilos [canvas.css](src/app/features/canvas/canvas.css).

Es el **único** componente que conoce p5.js. Implementa `AfterViewInit` y `OnDestroy`. Toda la generación gráfica (RF1) y el rendimiento ([05](05-renderizado-rendimiento.md)) viven aquí.

### Constantes de módulo ([canvas.ts:8-11](src/app/features/canvas/canvas.ts#L8-L11))
- `RPM_TO_RAD_PER_FRAME = (2π)/(60·60)` — conversión de RPM a radianes por fotograma a 60 fps.
- `ZOOM_STEP = 0.15`, `MIN_ZOOM = 1/3`, `MAX_ZOOM = 8` — paso y límites del zoom.

### Campos
| Campo | Qué es |
|---|---|
| `container` (`@ViewChild('canvasContainer')`) | El `div` del DOM donde p5 inserta el `<canvas>`. |
| `sketch: p5` | La instancia de p5 en *instance mode*. |
| `params: PatternParams` | Copia local de los parámetros activos (actualizada por la suscripción a `params$`). |
| `subs: Subscription` | Agrupa las suscripciones para liberarlas en `ngOnDestroy`. |
| `trailLayer: p5.Graphics` | **Capa fuera de pantalla** donde se acumulan las líneas (ver [05](05-renderizado-rendimiento.md)). |
| `renderedLineCount` | Cuántas líneas del historial ya están volcadas en `trailLayer` (clave del pintado incremental O(1)). |
| `trailDirty` | Bandera que fuerza la reconstrucción completa de la estela (zoom/resize/clear/reset/cambio de modo/import). |
| `isPaused`, `isDrawing` | Estado de la animación (pausada / dibujando). |
| `angle1`, `angle2` | Ángulos acumulados de cada órbita (radianes). |
| `prevTipX`, `prevTipY`, `firstPoint` | Punto extremo anterior en modo curva y si es el primer punto. |
| `activeMode` | Modo de visualización actualmente "montado" en el lienzo (para detectar cambios de modo). |
| `clearPending`, `resetPending` | Acciones diferidas que se procesan al inicio del próximo `draw()`. |
| `framesSinceLastLine` | Contador para el intervalo entre líneas en modo líneas. |
| `zoom` | Factor de zoom de la vista. |

### Métodos de ciclo de vida
- **`ngAfterViewInit()`** ([canvas.ts:51-55](src/app/features/canvas/canvas.ts#L51-L55)): se suscribe a `params$` (actualiza `this.params`) y a `action$` (llama a `onAction`), y arranca p5 con `initSketch()`. Se hace aquí (no en el constructor) porque necesita que `container` ya exista en el DOM.
- **`ngOnDestroy()`** ([canvas.ts:57-60](src/app/features/canvas/canvas.ts#L57-L60)): `subs.unsubscribe()` y `sketch.remove()`. Buena higiene de memoria (RNF6/RNF8): evita fugas de suscripciones y detiene el bucle de p5.

### Zoom
- **`zoomIn()` / `zoomOut()`** ([canvas.ts:62-70](src/app/features/canvas/canvas.ts#L62-L70)): ajustan `zoom` dentro de `[MIN_ZOOM, MAX_ZOOM]` y marcan `trailDirty = true` para **re-rasterizar** la estela nítida a la nueva escala (no se escala un bitmap).

### `onAction(action)` — traduce órdenes del servicio a estado del lienzo
[canvas.ts:72-115](src/app/features/canvas/canvas.ts#L72-L115). Un `switch` sobre `CanvasAction`:
- `'play'`: `beginSession(params)`, `isPaused = false`, `isDrawing = true`.
- `'pause'`: si no estaba en pausa, `endSession()`; invierte `isPaused`.
- `'clear'`: marca `clearPending` (se procesa en `draw()`).
- `'undo'`: restaura ángulos y punto extremo desde la **última sesión restante** (`sessions.at(-1)`), pausa, deja de dibujar y marca `trailDirty`.
- `'reset'`: marca `resetPending`.
- `'import-json'`: restaura el estado desde `patternService.importState`, fija `activeMode` al modo del patrón importado y marca `trailDirty`.

**Por qué `clear`/`reset` son diferidos:** modifican estado que el bucle `draw()` también toca; aplazarlos al inicio del fotograma evita condiciones de carrera entre el evento de Angular y el bucle de p5.

### `initSketch()` — la instancia de p5
[canvas.ts:117-352](src/app/features/canvas/canvas.ts#L117-L352). Crea `new p5(sketch, container)` y define sus *callbacks*:
- **`p.setup`**: crea el `<canvas>` al tamaño del contenedor, guarda `canvasDimensions` en el servicio, crea `trailLayer` con la misma densidad de píxeles (`pixelDensity`), fija 60 fps.
- **`p.windowResized`**: redimensiona lienzo y capa, actualiza `canvasDimensions`, marca `trailDirty` (la estela se re-rasteriza; se pierde lo acumulado, decisión consciente — ver [05](05-renderizado-rendimiento.md)).
- **`p.mouseWheel`**: zoom solo si el evento ocurre sobre el `<canvas>`; devuelve `false` para no hacer scroll de la página.
- **`p.draw`**: el bucle por fotograma. Es el corazón del sistema; su anatomía completa está en [05](05-renderizado-rendimiento.md) y el modelo matemático en [03](03-modelo-matematico.md). Resumen de fases: (1) lee y desestructura `params`; (2) procesa acciones diferidas (`resetPending`, `clearPending`, cambio de modo); (3) calcula la posición de los dos planetas; (4) pinta incrementalmente la estela en `trailLayer` (función interna `paintLines`); (5) vuelca fondo + estela + guías + planetas; (6) si está activo, registra la línea, incrementa la sesión y avanza los ángulos.

**Detalle de `paintLines(from, to)`** ([canvas.ts:242-259](src/app/features/canvas/canvas.ts#L242-L259)): accede al `drawingContext` 2D de la capa, aplica `translate(cx,cy)` + `scale(zoom)` y pinta cada línea con **su propio `stroke()`** (necesario para que la opacidad se acumule en las intersecciones).

---

## `Controls` — panel de parámetros y acciones

Archivo: [controls.ts](src/app/features/controls/controls.ts) · plantilla [controls.html](src/app/features/controls/controls.html) · estilos [controls.css](src/app/features/controls/controls.css).

Reúne todos los controles del patrón y los botones de acción. Importa `FormsModule` (para `[(ngModel)]`), `ExportModal`, `TranslatePipe`. Crea el `ExportModal` bajo demanda.

### `PARAM_RANGES` — única fuente de verdad de rangos
[controls.ts:19-35](src/app/features/controls/controls.ts#L19-L35). Un `Record<NumericParam, {min,max,step}>` que **refleja exactamente** los `min/max/step` de los controles del HTML. Se usa para **validar** (`clampParams`, RNF10) y **aleatorizar** (`randomize`, RF12). El tipo `NumericParam` ([controls.ts:11-17](src/app/features/controls/controls.ts#L11-L17)) enumera los 15 parámetros numéricos.

### Campos
| Campo | Qué es |
|---|---|
| `params: PatternParams` | Los parámetros que edita el usuario (arranca en `DEFAULT_PARAMS`). |
| `isPlaying: boolean` | Si la animación está en marcha (bloquea controles, RNF4). |
| `showExportModal: boolean` | Si el diálogo de exportación está visible. |
| `presets` | El catálogo `PATTERN_PRESETS` (RF7), para el desplegable. |
| `selectedPresetId` | Id del ejemplo elegido; `''` = ninguno. |
| `i18n` | `I18nService`, para `formatInterval`. |
| `patternService` | Inyectado **público** (la plantilla lo usa). |

### Métodos de edición
- **`onParamChange()`** ([controls.ts:58-61](src/app/features/controls/controls.ts#L58-L61)): tras cualquier edición manual, pone `selectedPresetId = ''` (ya no es un ejemplo puro) y emite `updateParams({...params})`. RF2/RF3.
- **`applyPreset()`** ([controls.ts:63-69](src/app/features/controls/controls.ts#L63-L69)): busca el preset por id y fusiona `{ ...DEFAULT_PARAMS, ...preset.params }` (o solo `DEFAULT_PARAMS` si la opción es vacía); emite los parámetros. RF7. Ver [18](18-presets.md).
- **`toggleMode()`** ([controls.ts:71-77](src/app/features/controls/controls.ts#L71-L77)): alterna `visualizationMode` entre `curve`/`lines` y emite. RF8 (el cambio de modo limpia el lienzo en `draw()`).

### Acciones de animación
- **`play()`** / **`pause()`** ([controls.ts:79-87](src/app/features/controls/controls.ts#L79-L87)): fijan `isPlaying` y despachan `'play'`/`'pause'`. RF4.
- **`clear()`** ([controls.ts:89-98](src/app/features/controls/controls.ts#L89-L98)): el **deshacer incremental** (RF5). Si reproducía, pausa; `removeLastSession()`; si quedó algo, restaura los parámetros de la sesión anterior; despacha `'undo'`.
- **`reset()`** ([controls.ts:100-106](src/app/features/controls/controls.ts#L100-L106)): vuelve a `DEFAULT_PARAMS`, limpia el preset, emite y despacha `'reset'`. RF13.

### Aleatorizar y validar
- **`randomize()`** ([controls.ts:115-126](src/app/features/controls/controls.ts#L115-L126)): asigna a cada parámetro numérico (salvo `lineInterval`) un valor aleatorio dentro de rango con `randInRange`, más un color con `randColor`. Conserva el modo. RF12.
- **`clampParams()`** ([controls.ts:129-142](src/app/features/controls/controls.ts#L129-L142)): recorre `PARAM_RANGES` y corrige cualquier valor `NaN` o fuera de `[min,max]` al límite correspondiente. Se invoca desde el evento `(change)` de los campos numéricos. RNF10.
- **`randInRange({min,max,step})`** ([controls.ts:145-150](src/app/features/controls/controls.ts#L145-L150)): valor aleatorio **alineado al step** y redondeado a los decimales del step (evita errores de coma flotante).
- **`randColor()`** ([controls.ts:153-156](src/app/features/controls/controls.ts#L153-L156)): hex `#rrggbb` aleatorio.
- **`formatInterval(seconds)`** ([controls.ts:158-161](src/app/features/controls/controls.ts#L158-L161)): muestra "continuo" (traducido) si es 0, o `Xs` si no.

### Exportar / importar patrón (E/S JSON, RF7)
- **`exportJson()`** ([controls.ts:163-187](src/app/features/controls/controls.ts#L163-L187)): reúne `sessions` + la sesión activa (`snapshotActiveSession()`), arma un objeto `{ metadata, sessions }`, lo serializa y lo descarga como `epicycloid_patron_YYYY-MM-DD.json` vía `Blob` + enlace temporal. Si no hay sesiones, no hace nada.
- **`triggerImport()`** ([controls.ts:189-195](src/app/features/controls/controls.ts#L189-L195)): crea un `<input type="file">` oculto y lo dispara.
- **`onFileSelected(event)`** ([controls.ts:197-236](src/app/features/controls/controls.ts#L197-L236)): lee el archivo con `FileReader`, parsea, **valida** (que haya `sessions` y que cada una tenga `params` y `frameCount`), reconstruye el dibujo con `replaySessionsToLines()`, restaura `importState` y los parámetros, y despacha `'import-json'`. Si el JSON es inválido, el `catch` lo descarta en silencio (RNF10).

---

## `ExportModal` — diálogo de exportación de imagen (RF6)

Archivo: [export-modal.ts](src/app/features/export-modal/export-modal.ts) · plantilla [export-modal.html](src/app/features/export-modal/export-modal.html) · estilos [export-modal.css](src/app/features/export-modal/export-modal.css).

Ventana modal que genera el PNG final. Implementa `AfterViewInit`. Emite `@Output() close` para que `Controls` lo oculte.

### Campos
| Campo | Qué es |
|---|---|
| `close` (`@Output`) | Evento para cerrar el diálogo. |
| `previewCanvasRef` (`@ViewChild`) | El `<canvas>` de previsualización. |
| `options: ExportOptions` | Fondo, mostrar guías, mostrar punto central. Por defecto fondo `#0a0a14`. |
| `isTransparent` | Si el fondo es transparente (alterna `options.bgColor`). |
| `exportZoom` (`[0.2, 4]`) | Zoom de la imagen exportada. |
| `exportScale` (`1`/`2`/`4`) | Factor de resolución. |
| `fileName` | Nombre personalizado (si vacío, usa `defaultFileName`). |

### Getters
- **`defaultFileName`** ([export-modal.ts:35-40](src/app/features/export-modal/export-modal.ts#L35-L40)): `epicycloid_<curva|lineas>_<fecha>`.
- **`resolvedFileName`** ([export-modal.ts:42-44](src/app/features/export-modal/export-modal.ts#L42-L44)): el nombre final + `.png`.
- **`exportResolution`** ([export-modal.ts:52-56](src/app/features/export-modal/export-modal.ts#L52-L56)): resolución resultante (`w·scale × h·scale`).

### Métodos
- **`ngAfterViewInit()`**: primera `renderPreview()`.
- **`onTransparentToggle()` / `onOptionChange()`**: actualizan opciones y re-renderizan la previsualización.
- **`buildExportCanvas()`** ([export-modal.ts:70-145](src/app/features/export-modal/export-modal.ts#L70-L145)): el núcleo. Crea un `<canvas>` en memoria a `w·scale × h·scale`; pinta el fondo (salvo transparente); dibuja **todo `lineHistory`** a calidad vectorial con `translate`+`scale`; opcionalmente dibuja las guías orbitales (elipses punteadas, color por órbita) y el punto central. No captura un bitmap del lienzo: **redibuja desde los vectores**, por eso es nítido a cualquier resolución ([05](05-renderizado-rendimiento.md)).
- **`renderPreview()`** ([export-modal.ts:147-160](src/app/features/export-modal/export-modal.ts#L147-L160)): reutiliza `buildExportCanvas()` y lo escala a un máximo de 320 px para la vista previa, de modo que coincida con el resultado real.
- **`save()`** ([export-modal.ts:162-168](src/app/features/export-modal/export-modal.ts#L162-L168)): construye el canvas final y lo descarga con `toDataURL('image/png')`.

---

## `Tutorial` — guía de bienvenida (RNF4)

Archivo: [tutorial.ts](src/app/features/tutorial/tutorial.ts) · plantilla [tutorial.html](src/app/features/tutorial/tutorial.html) · estilos [tutorial.css](src/app/features/tutorial/tutorial.css).

Modal de bienvenida que se muestra en el primer acceso y es reabrible con el botón "?".

| Miembro | Qué hace |
|---|---|
| `STORAGE_KEY = 'epicycloid_tutorial_seen'` | Clave de `localStorage`. |
| `visible` | Arranca `true` si **no** existe la marca en `localStorage` (primer acceso). |
| `dontShowAgain` | Estado de la casilla "No volver a mostrar". |
| `open()` | Reabre el tutorial (reinicia `dontShowAgain`). |
| `close()` | Si `dontShowAgain`, persiste la marca en `localStorage`; oculta el modal. |

**Persistencia:** es uno de los dos únicos usos de `localStorage` del proyecto (el otro es el idioma, [07](07-i18n.md)). Ver [16 — PatternService](16-pattern-service-api.md) y [12 — Decisiones técnicas](12-decisiones-tecnicas.md) sobre por qué no hay más persistencia.
