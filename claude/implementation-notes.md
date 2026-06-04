# Implementation Notes

## Core simulation model

**IMPORTANT:** Both planets orbit **independently around the same central point**. The artwork is the LINE drawn between the two planets each frame — NOT orbit2 centered on orbit1.

```
planet1 = rotate(a1) * (R1 * eX1 * cos(angle1 + init1),  R1 * eY1 * sin(angle1 + init1))
planet2 = rotate(a2) * (R2 * eX2 * cos(angle2 + init2),  R2 * eY2 * sin(angle2 + init2))
draw line(planet1, planet2)   // this IS the artwork
angle1 += s1;  angle2 += s2;
```

Where `a1`/`a2` are orbit tilt angles (orbit plane rotation), `eX`/`eY` are ellipse scale factors.

In **curve mode** the second planet is offset from the first (`x2 = x1 + rx2`), creating a true epicycloid chain. In **lines mode** both planets are independent from the origin.

## Current PatternParams model

```typescript
interface PatternParams {
  // Orbit geometry
  orbit1Radius: number;        // 10–500 px
  orbit2Radius: number;
  orbit1EllipseX: number;      // 0.1–2, horizontal ellipse scale (1.0 = circle)
  orbit1EllipseY: number;      // 0.1–2, vertical ellipse scale
  orbit2EllipseX: number;
  orbit2EllipseY: number;
  orbit1Angle: number;         // 0–360°, orbit tilt (plane rotation)
  orbit2Angle: number;

  // Angular speeds (stored as RPM, converted to rad/frame inside canvas)
  orbit1SpeedRpm: number;      // 0–100 RPM
  orbit2SpeedRpm: number;

  // Initial phase angles (degrees, 0–360)
  initialAngle1: number;
  initialAngle2: number;

  // Line visuals
  lineColor: string;           // hex e.g. '#ffffff'
  lineAlpha: number;           // 0–1
  strokeWeight: number;        // 0.5–10 px

  // Seconds between drawn lines in 'lines' mode (0 = every frame)
  lineInterval: number;

  visualizationMode: 'curve' | 'lines';
}
```

Speed conversion: `RPM_TO_RAD_PER_FRAME = (2π) / (60 * 60)` at 60 fps.

## Line history rendering

All drawn segments are stored as `LineRecord[]` in `PatternService.lineHistory`. Each record holds world-space coordinates + color + alpha + strokeWeight. The main canvas clears every frame; the history is redrawn via raw Canvas 2D API each frame.

```typescript
p.draw = () => {
  p.background(10, 10, 20);   // clears frame

  const ctx = (p as any).drawingContext as CanvasRenderingContext2D;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(zoom, zoom);
  for (const ln of patternService.lineHistory) {
    ctx.strokeStyle = `rgba(${ln.r},${ln.g},${ln.b},${ln.a / 255})`;
    ctx.lineWidth = ln.sw;
    ctx.beginPath();
    ctx.moveTo(ln.x1, ln.y1);
    ctx.lineTo(ln.x2, ln.y2);
    ctx.stroke();              // individual stroke per segment — accumulates alpha correctly
  }
  ctx.restore();
  // ... draw orbital guides, planet dots (p5 API) ...
};
```

**Por qué un `stroke()` individual por segmento:** Canvas 2D spec pinta cada píxel exactamente una vez dentro de un solo `beginPath → stroke`. Sin esto, líneas superpuestas colapsan a la misma intensidad en lugar de acumular alpha.

**Ventajas frente al `p5.Graphics` trail anterior:**
- Calidad vectorial a cualquier nivel de zoom (no degradación de bitmap)
- `ExportModal` puede redibujar el historial en un canvas offscreen de resolución arbitraria
- El JSON export/import puede reproducir el patrón matemáticamente sin depender del buffer gráfico

## Angular ↔ p5.js zone integration

p5 must run **outside Angular's zone** to avoid triggering change detection on every draw frame (60 fps × CD = performance issue):

```typescript
ngAfterViewInit(): void {
  this.subs.add(this.patternService.params$.subscribe(p => this.params = p));
  this.subs.add(this.patternService.action$.subscribe(a => this.onAction(a)));
  this.ngZone.runOutsideAngular(() => this.initSketch());
}
```

When the canvas needs Angular to react to something (e.g. simulation finished), cross back explicitly:

```typescript
this.ngZone.run(() => this.patternService.notifySimulationFinished());
```

Without `runOutsideAngular`, Zone.js patches p5's `requestAnimationFrame` and every frame triggers Angular's CD cycle. Without `ngZone.run()` on the notification, the subscription fires but Angular never detects the state change.

## PatternService

Singleton (`providedIn: 'root'`). Two channels:

- `params$` — `BehaviorSubject<PatternParams>`: canvas subscribes and reads params each frame.
- `action$` — `Subject<CanvasAction>`: one-shot commands (`play`, `pause`, `clear`, `reset`, `simulate`).
- `simulationFinished$` — `Subject<void>`: canvas emits when simulate mode auto-stops; controls reacts by resetting `isPlaying`.

## Simulate N orbits feature

User selects an orbit reference (1 or 2) and a number of revolutions. The canvas counts accumulated angle for the reference orbit and auto-stops when target is reached.

```typescript
// Canvas state
private simulateMode = false;
private simulateAngleAccum = 0;
private simulateAngleTarget = 0;   // orbits * 2π
private simulateOrbitRef: 1 | 2 = 1;

// Per-frame (inside !isPaused block)
if (this.simulateMode) {
  const step = this.simulateOrbitRef === 1 ? Math.abs(s1) : Math.abs(s2);
  this.simulateAngleAccum += step;
  if (this.simulateAngleAccum >= this.simulateAngleTarget) {
    this.simulateMode = false;
    this.isPaused = true;
    this.isDrawing = false;
    this.ngZone.run(() => this.patternService.notifySimulationFinished());
  }
}
```

Edge case: if the reference orbit's speed is 0, the target is never reached. The UI should guard against this (disable simulate button or show warning when rpm = 0).

## Controls ↔ Canvas state contract

`isPlaying` in Controls and `isPaused`/`isDrawing` in Canvas must stay in sync:

| User action | Controls | Canvas |
|---|---|---|
| Play | `isPlaying = true` | `isPaused = false`, `isDrawing = true` |
| Pause | `isPlaying = false` | `isPaused = true` |
| Simulate start | `isPlaying = true` | `isPaused = false`, `isDrawing = true`, `simulateMode = true` |
| Simulate end (auto) | `isPlaying = false` (via `simulationFinished$`) | `isPaused = true`, `isDrawing = false`, `simulateMode = false` |
| Reset | `isPlaying = false` | `isPaused = true`, `isDrawing = false`, angles zeroed, trail cleared |

**Pause is not a toggle** — it always sets `isPaused = true`. Resuming always goes through Play.

## p5 instance mode

Always use instance mode (callback constructor), never global mode:

```typescript
this.sketch = new p5((p: p5) => {
  p.setup = () => { ... };
  p.draw  = () => { ... };
}, this.container.nativeElement);
```

Destroy on component destroy to prevent memory leaks:

```typescript
ngOnDestroy() {
  this.subs.unsubscribe();
  this.sketch?.remove();
}
```

## Save as image (RF6 — implementado via ExportModal)

El componente `ExportModal` redibuja `patternService.lineHistory` sobre un `<canvas>` offscreen con Canvas 2D API (no usa `p5.saveCanvas`). Esto garantiza calidad vectorial independiente de la resolución del canvas en pantalla.

Opciones disponibles: fondo (color libre o transparente), zoom de exportación (0.2×–4×), multiplicador de resolución (1×/2×/4×), visibilidad de guías y punto central, nombre de archivo libre.

La preview en tiempo real se renderiza en un `<canvas>` de máx. 320 px actualizando con cada cambio de opción.

## Presets (RF7 — not yet implemented)

Store named `PatternParams` objects in `localStorage`. The Presets component should list saved presets, allow saving under a name, and on click emit the preset back through PatternService.
