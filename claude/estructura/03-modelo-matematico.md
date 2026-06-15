# 03 — Modelo matemático

Este es el corazón de **RF1** (generación de composiciones epicicloidales mediante algoritmos parametrizables). La lógica vive en el bucle `draw()` de [canvas.ts](src/app/features/canvas/canvas.ts) y se replica, para reconstruir patrones, en `replaySessionsToLines()` de [pattern.service.ts](src/app/core/pattern.service.ts).

## Idea central

Hay **dos "planetas"** que orbitan **de forma independiente alrededor del mismo punto central** (el centro del lienzo). El arte surge de **la línea que une a los dos planetas** (o del rastro del segundo planeta), fotograma a fotograma.

> ⚠️ Modelo correcto: las dos órbitas son independientes respecto al centro. NO es "la órbita 2 centrada en el punto de la órbita 1" salvo en el modo curva, donde el segundo planeta se *desplaza* respecto al primero (ver abajo).

## Posición de cada planeta

Para cada órbita se parte de una elipse paramétrica (un círculo si los factores elípticos valen 1), y luego se **rota** según la inclinación de esa órbita:

```
# Órbita 1 (R1 = radio, eX1/eY1 = factores elípticos, a1 = inclinación, init1 = fase inicial)
lx1 = R1 · eX1 · cos(angle1 + init1)
ly1 = R1 · eY1 · sin(angle1 + init1)
x1  = lx1 · cos(a1) − ly1 · sin(a1)      # rotación por la inclinación a1
y1  = lx1 · sin(a1) + ly1 · cos(a1)

# Órbita 2 (R2, eX2/eY2, a2, init2) → da un vector (rx2, ry2)
lx2 = R2 · eX2 · cos(angle2 + init2)
ly2 = R2 · eY2 · sin(angle2 + init2)
rx2 = lx2 · cos(a2) − ly2 · sin(a2)
ry2 = lx2 · sin(a2) + ly2 · cos(a2)
```

`(x1, y1)` es la posición del planeta 1. `(rx2, ry2)` es la posición del planeta 2 **relativa al centro**.

## Los dos modos de visualización (RF8)

El parámetro `visualizationMode` decide cómo se combinan ambos planetas:

- **Modo «líneas» (`lines`):** ambos planetas parten del centro. El planeta 2 es directamente `(rx2, ry2)`. Cada fotograma se dibuja **la línea entre planeta 1 y planeta 2**:
  ```
  x2 = rx2 ;  y2 = ry2
  línea( (x1,y1) , (x2,y2) )
  ```
  El patrón es la acumulación de esas líneas (figuras tipo "string art").

- **Modo «curva epicicloidal» (`curve`):** el planeta 2 se **desplaza respecto al planeta 1** (su órbita "cabalga" sobre el extremo de la primera). Se traza el **camino del punto extremo** uniendo su posición anterior con la actual:
  ```
  x2 = x1 + rx2 ;  y2 = y1 + ry2
  línea( puntoExtremoAnterior , (x2,y2) )
  ```
  El resultado es una **curva epicicloide** continua.

## Avance del tiempo: de RPM a radianes por fotograma

Las velocidades se expresan en **RPM** (revoluciones por minuto) porque es intuitivo para el usuario, pero internamente hay que convertirlas a **radianes por fotograma** asumiendo 60 fps:

```
RPM_TO_RAD_PER_FRAME = (2π) / (60 · 60)      # 60 s/min · 60 fps
s1 = orbit1SpeedRpm · RPM_TO_RAD_PER_FRAME
s2 = orbit2SpeedRpm · RPM_TO_RAD_PER_FRAME
```

Cada fotograma activo: `angle1 += s1; angle2 += s2`.

**La forma del patrón depende sobre todo de la RELACIÓN entre las dos velocidades** (`s1/s2`): relaciones racionales simples dan figuras cerradas; relaciones más complejas, patrones densos. Los radios, fases iniciales, factores elípticos e inclinación modulan la geometría.

## Intervalo entre líneas (solo modo «líneas»)

En modo líneas, `lineInterval` (segundos) permite no dibujar una línea por fotograma, sino una cada N fotogramas:

```
framesNeeded = lineInterval > 0 ? max(1, round(lineInterval · 60)) : 1
# se dibuja la línea solo cuando framesSinceLastLine % framesNeeded == 0
```

Esto permite patrones más "limpios" (menos densos) sin cambiar la velocidad.

## Parámetros (rango y unidad)

| Parámetro | Rango | Unidad | Efecto |
|---|---|---|---|
| `orbit1Radius`, `orbit2Radius` | 50–350 | px | Tamaño de cada órbita |
| `orbit1SpeedRpm`, `orbit2SpeedRpm` | 1–50 | RPM | Velocidad angular (la relación define la forma) |
| `initialAngle1`, `initialAngle2` | 0–360 | ° | Fase inicial (desfase del punto de partida) |
| `orbit1EllipseX/Y`, `orbit2EllipseX/Y` | 0.1–2 | factor | Aplasta/estira la órbita (1 = círculo) |
| `orbit1Angle`, `orbit2Angle` | 0–360 | ° | Inclinación (rotación del plano de la órbita) |
| `lineColor` | hex | — | Color del trazo |
| `lineAlpha` | 0.05–1 | — | Opacidad (la acumulación de trazos translúcidos crea degradados) |
| `strokeWeight` | 0–1 | — | Grosor del trazo |
| `lineInterval` | 0–1 | s | Intervalo entre líneas (modo líneas) |
| `visualizationMode` | curve \| lines | — | Modo de visualización |

Los rangos son la **única fuente de verdad** en `PARAM_RANGES` ([controls.ts](src/app/features/controls/controls.ts)), espejo de los `min/max/step` del HTML, y se usan tanto para validar (**RNF10**) como para aleatorizar (**RF12**).

## Reproducibilidad

El modelo es **determinista**: dados los mismos parámetros y el mismo número de fotogramas, se obtiene exactamente el mismo dibujo. De ahí que se pueda **exportar/importar** un patrón como JSON (lista de sesiones con sus parámetros y duración) y **reconstruirlo** reproduciendo la simulación — eso hace `replaySessionsToLines()`. Véase [06 — Funcionalidades](06-funcionalidades.md).
