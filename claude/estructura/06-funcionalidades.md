# 06 — Funcionalidades (cada RF: qué, dónde y por qué)

Cada funcionalidad del usuario, con su requisito, dónde se implementa y la razón de su diseño.

## RF1 — Generación de patrones epicicloidales
**Dónde:** bucle `draw()` de [canvas.ts](src/app/features/canvas/canvas.ts). **Cómo/por qué:** ver [03 — Modelo matemático](03-modelo-matematico.md). El algoritmo es paramétrico y determinista, lo que permite reproducibilidad (export/import).

## RF2 — Editar parámetros en tiempo real
**Dónde:** [controls.html](src/app/features/controls/controls.html) (cada control con `[(ngModel)]` + `(ngModelChange)="onParamChange()"`), [controls.ts](src/app/features/controls/controls.ts). **Cómo:** `onParamChange()` → `PatternService.updateParams()` → el lienzo lee `params$`. **Por qué así:** el enlace bidireccional de Angular hace trivial mantener sincronizados modelo y vista; el servicio desacopla Controls del Canvas.

## RF3 — Redibujado dinámico sin recargar
**Dónde:** suscripción de `Canvas` a `params$`. **Por qué:** la app es de página única; el cambio se refleja en el siguiente fotograma sin recarga ni petición de red.

## RF4 — Play / Pausa / Reiniciar
**Dónde:** `play()`, `pause()`, `reset()` en [controls.ts](src/app/features/controls/controls.ts) → `dispatch()` → `onAction()` en canvas. **Cómo:** `play` abre una sesión y activa el dibujo; `pause` la cierra (`endSession`) y conserva el dibujo; `reset` (RF13) vuelve a los valores por defecto y limpia. **Por qué:** las sesiones permiten registrar bloques reproducibles (ver [04](04-flujo-ejecucion-y-datos.md)).

## RF5 — Limpiar lienzo → «Deshacer última sesión»
**Dónde:** `clear()` en [controls.ts](src/app/features/controls/controls.ts) + `removeLastSession()`/`replaySessionsToLines()` en [pattern.service.ts](src/app/core/pattern.service.ts) + caso `'undo'` en canvas. **Cómo:** cada pulsación elimina el último bloque dibujado; si se reproducía, primero pausa; recomputa `lineHistory` reproduciendo las sesiones restantes y **restaura los parámetros al estado previo a esa sesión**. **Por qué:** se reinterpretó "limpiar" como un **deshacer incremental** (más útil que borrar todo de golpe); el borrado total sigue disponible en **Reset**. Se apoya en la invariante `lineHistory == replay(sessions)`.

## RF6 — Exportar imagen (PNG)
**Dónde:** [export-modal.ts](src/app/features/export-modal/export-modal.ts) + [export-modal.html](src/app/features/export-modal/export-modal.html). **Cómo:** `buildExportCanvas()` re-dibuja el historial a calidad vectorial (resolución 1×/2×/4×, zoom de exportación, fondo color/transparente, guías y punto central opcionales) con previsualización en vivo; `save()` descarga el PNG. **Por qué re-dibuja en vez de capturar bitmap:** para obtener nitidez a cualquier resolución (ver [05](05-renderizado-rendimiento.md)).

## RF7 — Ejemplos predefinidos / presets
**Dónde:** catálogo `PATTERN_PRESETS` en [presets.ts](src/app/features/presets/presets.ts); en [controls.ts](src/app/features/controls/controls.ts), `applyPreset()` y el desplegable de [controls.html](src/app/features/controls/controls.html). **Cómo:** cada preset es un `Partial<PatternParams>` con nombre (clave i18n `controls.presets.<id>`); al elegirlo, `applyPreset()` fusiona `{ ...DEFAULT_PARAMS, ...preset.params }` y emite los parámetros, dejando el panel listo para reproducir. La opción vacía (`selectedPresetId = ''`) deja el lienzo en blanco con los valores por defecto, y cualquier edición manual la devuelve a vacío. **Por qué este enfoque:** RF7 pide "almacenar configuraciones predefinidas y recuperarlas"; se resolvió como un **catálogo de ejemplos curados integrados** (no como presets de usuario persistidos en `localStorage`), complementado por la **E/S de patrones en JSON** (exportar/importar) para que el usuario guarde y recupere sus propias composiciones. Detalle completo en [18 — Presets](18-presets.md).

## RF8 — Alternar modo de visualización (curva / líneas)
**Dónde:** `toggleMode()` en [controls.ts](src/app/features/controls/controls.ts); el cambio de modo en `draw()` limpia el lienzo y reinicia sesiones. **Por qué limpia:** ambos modos producen composiciones no comparables; mezclarlas no tendría sentido visual.

## RF9 — Controles interactivos
**Dónde:** [controls.html](src/app/features/controls/controls.html). **Cómo:** *sliders* (`range`) en fases e inclinación, **campos numéricos** en el resto, selector de **color** nativo, y un botón de alternancia de modo. Secciones plegables (`<details>`) agrupan Órbita 1, Órbita 2, Visual y Parámetros avanzados. **Por qué la mezcla slider+número:** exploración rápida (slider) + precisión (número).

## RF10 — Mostrar valores actuales
**Dónde:** los propios `input` numéricos enlazados con `ngModel` muestran y actualizan el valor en tiempo real. **Por qué:** el valor visible y editable son el mismo control (no hay duplicación de estado).

## RF11 — Lienzo responsivo
**Dónde:** `windowResized` en canvas + layout flex en [styles.css](src/styles.css). Ver [05](05-renderizado-rendimiento.md). **También** el zoom (rueda/botones).

## RF12 — Variaciones automáticas (aleatorio controlado)
**Dónde:** `randomize()` + `randInRange()`/`randColor()` en [controls.ts](src/app/features/controls/controls.ts). **Cómo:** asigna a cada parámetro un valor aleatorio **dentro de su rango válido y respetando el `step`** (de `PARAM_RANGES`), más un color aleatorio. **Por qué "controlado":** el resultado siempre es válido y reproducible manualmente por el usuario. El **modo de visualización NO se aleatoriza** (es decisión deliberada del usuario), y el botón se deshabilita durante la reproducción.

## RF13 — Restablecer a valores por defecto
**Dónde:** `reset()` en controls → `dispatch('reset')`. **Cómo:** restaura `DEFAULT_PARAMS` (definidos en [pattern.service.ts](src/app/core/pattern.service.ts)) y limpia el lienzo y las sesiones.

## RF14 — Multilingüe (i18n)
**Dónde:** todo el sistema i18n. Detalle completo en [07 — i18n](07-i18n.md).

## Funciones transversales

- **Exportar/Importar patrón (JSON):** `exportJson()` / `triggerImport()` / `onFileSelected()` en [controls.ts](src/app/features/controls/controls.ts). Exporta las sesiones (metadatos + parámetros + duración); al importar, valida el archivo y **reconstruye** el dibujo con `replaySessionsToLines()`, restaurando el estado para poder continuar. Si el JSON es inválido, se descarta silenciosamente (gestión de errores, RNF10).
- **Tutorial:** [tutorial.ts](src/app/features/tutorial/tutorial.ts) — se muestra en el primer acceso (persistencia en `localStorage`), reabrible con el botón "?". Apoya **RNF4** (UI intuitiva para usuarios sin conocimientos previos).
- **Validación de entradas (RNF10):** `clampParams()` en controls corrige valores fuera de rango o `NaN` al confirmar la edición (evento `(change)`), ajustándolos al `min`/`max` correspondiente.
