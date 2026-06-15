# 05 — Renderizado y rendimiento

Toda la lógica vive en el bucle `draw()` y los ayudantes de [canvas.ts](src/app/features/canvas/canvas.ts). Este apartado explica el **porqué** de las decisiones de rendimiento, que son las que cumplen **RNF5** (fluidez en tiempo real) y **RNF8** (mínimo consumo de CPU).

## El problema que resuelve: dibujar miles de líneas sin frenar

Una composición puede acumular **decenas de miles de líneas**. El enfoque ingenuo —repintar todo el historial cada fotograma— tiene coste **O(N) por fotograma**: cuanto más dibujas, más lento va, hasta congelarse, aunque el patrón ya esté quieto. (Este era el enfoque inicial, ya descartado.)

## La solución: capa de estela incremental (O(1) por fotograma)

Las líneas se acumulan en una **capa fuera de pantalla** (`p5.Graphics`, llamada `trailLayer`). Cada fotograma se pintan **solo los segmentos nuevos** desde el fotograma anterior, no todo el historial:

```
main canvas cada frame =
    background()                 // limpia
  + image(trailLayer)           // vuelca la estela ya acumulada (1 operación)
  + guías y planetas "vivos"    // dibujados encima, en p5
```

- `renderedLineCount` lleva la cuenta de cuántas líneas del historial ya están volcadas en la capa. Solo se pintan las que van de `renderedLineCount` a `lineHistory.length`. → coste **O(1)** por fotograma (independiente del total acumulado).

## Reconstrucción completa: `trailDirty`

A veces hay que **repintar toda la estela desde cero**. Eso ocurre solo en eventos puntuales, marcados con la bandera `trailDirty`:

- zoom, redimensionado de ventana, limpiar/deshacer, reset, cambio de modo e importación.
- o si el historial **encogió** (`lineHistory.length < renderedLineCount`), p. ej. al deshacer.

Cuando `trailDirty` está activa, se limpia la capa y se repinta todo el historial una vez; después se vuelve al modo incremental.

## Calidad del zoom (RF11 y nitidez)

Al reconstruir la capa, **los vectores se re-rasterizan a la escala (zoom) actual**, no se escala un bitmap. Por eso el zoom **mantiene la nitidez** en lugar de pixelar. Además, `trailLayer.pixelDensity(p.pixelDensity())` iguala la densidad de píxeles del lienzo principal (pantallas retina/HiDPI).

## Acumulación de alpha correcta

Cada línea se pinta con su **propio `stroke()`** (no en un único trazo por lotes). Esto es necesario para que la **opacidad se acumule** correctamente donde las líneas se cruzan (un único `stroke()` por lotes colapsaría las intersecciones y perdería el degradado característico del arte generativo translúcido).

## Zoom (RF11)

- Rueda del ratón sobre el lienzo (`mouseWheel`) o botones ＋/− (`zoomIn()`, `zoomOut()`), dentro de un rango `[1/3, 8]`.
- El zoom solo cambia la **vista** (escala de dibujo), no el contenido acumulado; por eso marca `trailDirty` para re-rasterizar nítido.

## Lienzo responsivo (RF11, RNF9)

- `windowResized` redimensiona el lienzo y la capa de estela al tamaño del contenedor.
- Trade-off conocido: al redimensionar se **pierde la estela acumulada** (cambian las dimensiones en píxeles), y se marca `trailDirty` para re-rasterizar. Es una decisión consciente.

## Por qué encaja con *zoneless*

Como se explica en [04](04-flujo-ejecucion-y-datos.md), el bucle de p5 corre fuera del ciclo de detección de cambios de Angular (no hay Zone.js). Combinado con el pintado incremental O(1), el resultado es una animación fluida que **no satura ni el render gráfico ni el framework** — exactamente lo que piden RNF5 y RNF8.

## Exportación: re-render a calidad vectorial

El diálogo de exportación **no captura un bitmap del lienzo**, sino que **vuelve a dibujar** todo el `lineHistory` sobre un `<canvas>` nuevo (`buildExportCanvas()` en [export-modal.ts](src/app/features/export-modal/export-modal.ts)), a la resolución elegida (1×, 2×, 4×) y zoom de exportación. Así la imagen exportada es **nítida a cualquier escala** y puede incluir/ocultar guías y punto central, con fondo de color o transparente. Véase [06 — Funcionalidades](06-funcionalidades.md) (RF6).
