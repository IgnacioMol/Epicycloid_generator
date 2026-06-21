# 17 — Modelo de datos (interfaces y tipos)

Referencia campo a campo de los tipos del proyecto. Archivo principal: [pattern-params.model.ts](src/app/models/pattern-params.model.ts) (solo interfaces, **sin lógica**). Tipos auxiliares en [pattern.service.ts](src/app/core/pattern.service.ts) y [presets.ts](src/app/features/presets/presets.ts).

---

## `VisualizationMode` ([pattern-params.model.ts:1](src/app/models/pattern-params.model.ts#L1))
```ts
type VisualizationMode = 'curve' | 'lines';
```
Los dos modos de dibujo (RF8). `lines` = string art (línea entre los dos planetas desde el centro); `curve` = epicicloide continua (el planeta 2 cabalga sobre el extremo del 1). Modelo matemático en [03](03-modelo-matematico.md).

---

## `PatternParams` ([pattern-params.model.ts:3-32](src/app/models/pattern-params.model.ts#L3-L32))

El objeto que define **una composición completa**. Es el tipo que circula por `params$`. 17 campos:

| Campo | Tipo | Unidad/Rango | Significado |
|---|---|---|---|
| `orbit1Radius` | number | 50–350 px | Radio de la órbita 1. |
| `orbit2Radius` | number | 50–350 px | Radio de la órbita 2. |
| `orbit1EllipseX` | number | 0.1–2 (1 = círculo) | Escala horizontal de la elipse de la órbita 1. |
| `orbit1EllipseY` | number | 0.1–2 | Escala vertical de la elipse de la órbita 1. |
| `orbit2EllipseX` | number | 0.1–2 | Escala horizontal de la elipse de la órbita 2. |
| `orbit2EllipseY` | number | 0.1–2 | Escala vertical de la elipse de la órbita 2. |
| `orbit1Angle` | number | 0–360° | Inclinación (rotación del plano) de la órbita 1. |
| `orbit2Angle` | number | 0–360° | Inclinación de la órbita 2. |
| `orbit1SpeedRpm` | number | 1–50 RPM | Velocidad angular de la órbita 1. |
| `orbit2SpeedRpm` | number | 1–50 RPM | Velocidad angular de la órbita 2. |
| `initialAngle1` | number | 0–360° | Fase inicial (ángulo de partida) de la órbita 1. |
| `initialAngle2` | number | 0–360° | Fase inicial de la órbita 2. |
| `lineColor` | string | hex `#rrggbb` | Color del trazo. |
| `lineAlpha` | number | 0.05–1 | Opacidad del trazo (la acumulación translúcida crea degradados). |
| `strokeWeight` | number | 0–1 | Grosor del trazo. |
| `lineInterval` | number | 0–1 s | Segundos entre líneas en modo `lines` (0 = cada fotograma). |
| `visualizationMode` | `VisualizationMode` | — | Modo de dibujo. |

> La **forma** del patrón depende sobre todo de la **relación** entre `orbit1SpeedRpm` y `orbit2SpeedRpm`. Los rangos válidos están centralizados en `PARAM_RANGES` ([controls.ts:19-35](src/app/features/controls/controls.ts#L19-L35)) y reflejan los `min/max/step` del HTML.

---

## `ExportOptions` ([pattern-params.model.ts:34-38](src/app/models/pattern-params.model.ts#L34-L38))

Opciones del diálogo de exportación (RF6):

| Campo | Tipo | Significado |
|---|---|---|
| `bgColor` | string | Color de fondo hex, o `'transparent'`. |
| `showGuides` | boolean | Incluir las guías orbitales (elipses) en la imagen. |
| `showCenterDot` | boolean | Incluir el punto central. |

(El zoom y el factor de resolución de exportación **no** están aquí: son campos propios de `ExportModal` — `exportZoom`, `exportScale` — ver [15](15-referencia-componentes.md).)

---

## `LineRecord` ([pattern-params.model.ts:40-46](src/app/models/pattern-params.model.ts#L40-L46))

Un **segmento dibujado**, ya "rasterizado" a datos (no a píxeles):

| Campo | Tipo | Significado |
|---|---|---|
| `x1,y1` / `x2,y2` | number | Extremos del segmento, en coordenadas de mundo (centradas en el lienzo). |
| `r,g,b` | number | Color del trazo (0–255), ya convertido desde el hex. |
| `a` | number | Alfa 0–255 (`lineAlpha·255`). |
| `sw` | number | Grosor (`strokeWeight`). |

`lineHistory: LineRecord[]` es la lista completa de segmentos del dibujo. La produce `Canvas.draw()` y `replaySessionsToLines()`, y la consume el pintado de la estela y la exportación. **Guardar el color por línea** (no global) permite que sesiones con distinto color convivan en el mismo dibujo.

---

## `SimulationSession` ([pattern-params.model.ts:48-58](src/app/models/pattern-params.model.ts#L48-L58))

Un **bloque de animación** entre un Play y una Pausa. Es la unidad del deshacer y de la E/S JSON:

| Campo | Tipo | Significado |
|---|---|---|
| `sessionIndex` | number | Índice 1-based del bloque. |
| `params` | `PatternParams` | Los parámetros con los que se dibujó el bloque. |
| `frameCount` | number | Cuántos fotogramas duró. |
| `durationSeconds` | number | `frameCount/60`, redondeado a 3 decimales. |
| `endAngle1`, `endAngle2` | number | Ángulos acumulados al final del bloque. |
| `endTipX`, `endTipY` | number | Punto extremo al final (modo curva). |
| `endFirstPoint` | boolean | Si quedó pendiente el primer punto (modo curva). |

**Por qué guarda el estado final:** para poder **continuar** dibujando desde donde quedó (al importar o tras deshacer) sin recalcular todo, y para reconstruir con `replaySessionsToLines()`. El conjunto `sessions: SimulationSession[]` es, en esencia, la **representación serializable y reproducible** de una composición — lo que se exporta a JSON.

---

## Tipos auxiliares (en otros archivos)

- **`CanvasAction`** ([pattern.service.ts:5](src/app/core/pattern.service.ts#L5)): `'play' | 'pause' | 'clear' | 'reset' | 'import-json' | 'undo'`. Las órdenes de `action$`.
- **`NumericParam`** ([controls.ts:11-17](src/app/features/controls/controls.ts#L11-L17)): unión de los 15 parámetros numéricos; tipa `PARAM_RANGES`.
- **`Lang`** y **`LanguageOption`** ([i18n.service.ts:8-14](src/app/core/i18n/i18n.service.ts#L8-L14)): idioma y entrada del selector. Ver [07](07-i18n.md).
- **`PatternPreset`** ([presets.ts:11-16](src/app/features/presets/presets.ts#L11-L16)): un ejemplo predefinido. Ver [18](18-presets.md).

---

## Forma del JSON exportado

`exportJson()` ([controls.ts:163-187](src/app/features/controls/controls.ts#L163-L187)) produce:

```json
{
  "metadata": {
    "exportedAt": "2026-06-21T...Z",
    "totalSessions": 3,
    "visualizationMode": "lines"
  },
  "sessions": [ /* array de SimulationSession */ ]
}
```

Al importar, `onFileSelected()` valida que exista `sessions` (array no vacío) y que cada sesión tenga `params` y `frameCount` numérico; el resto se reconstruye. Los `metadata` son informativos.
