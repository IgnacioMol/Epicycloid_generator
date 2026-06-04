# Architecture

> Para un análisis exhaustivo ver `web-structure-analysis.md`. Este archivo es el resumen de referencia rápida.

## Folder structure

```
src/app/
├── app.ts / app.html / app.css      # Root — layout Bootstrap col-8 / col-4
├── app.config.ts                    # Bootstrap de Angular (providers globales)
├── app.routes.ts                    # Sin routing (SPA de una sola vista)
│
├── core/
│   └── pattern.service.ts           # Singleton: params$, action$, lineHistory, sessions
│
├── features/
│   ├── canvas/
│   │   ├── canvas.ts                # Sketch p5.js + simulación + zoom
│   │   ├── canvas.html              # <div #canvasContainer> + botones de zoom
│   │   └── canvas.css
│   ├── controls/
│   │   ├── controls.ts              # Panel de parámetros + export/import JSON
│   │   ├── controls.html            # ngModel bindings + botones de acción
│   │   └── controls.css
│   ├── tutorial/
│   │   ├── tutorial.ts              # Modal de bienvenida (localStorage)
│   │   ├── tutorial.html
│   │   └── tutorial.css
│   └── export-modal/
│       ├── export-modal.ts          # Modal de exportación PNG
│       ├── export-modal.html
│       └── export-modal.css
│
└── models/
    └── pattern-params.model.ts      # PatternParams, SimulationSession, LineRecord,
                                     # ExportOptions, VisualizationMode
```

## Data flow

```
Controls component
  └─ [(ngModel)] bindings → onParamChange()
  └─ patternService.updateParams(params)
       └─ BehaviorSubject<PatternParams> emits
            └─ Canvas: params$.subscribe(p => this.params = p)
                     └─ p.draw() loop reads this.params each frame

Controls → patternService.dispatch(action)
  └─ Subject<CanvasAction> emits ('play'|'pause'|'clear'|'reset'|'import-json')
       └─ Canvas: action$.subscribe(a => this.onAction(a))
```

## PatternParams model (current)

```typescript
interface PatternParams {
  orbit1Radius: number;        // 10–500 px
  orbit2Radius: number;
  orbit1EllipseX: number;      // 0.1–2
  orbit1EllipseY: number;
  orbit2EllipseX: number;
  orbit2EllipseY: number;
  orbit1Angle: number;         // 0–360° orbit tilt
  orbit2Angle: number;
  orbit1SpeedRpm: number;      // 0–100 RPM
  orbit2SpeedRpm: number;
  initialAngle1: number;       // 0–360° phase
  initialAngle2: number;
  lineColor: string;           // '#rrggbb'
  lineAlpha: number;           // 0–1
  strokeWeight: number;        // 0.5–10 px
  lineInterval: number;        // seconds between lines (0 = every frame)
  visualizationMode: 'curve' | 'lines';
}
```

Speed conversion: `RPM_TO_RAD_PER_FRAME = (2π) / (60 * 60)` at 60 fps.

## p5.js integration pattern

Always instance mode inside `ngAfterViewInit`:

```typescript
ngAfterViewInit(): void {
  this.subs.add(this.patternService.params$.subscribe(p => this.params = p));
  this.subs.add(this.patternService.action$.subscribe(a => this.onAction(a)));
  this.initSketch();
}

// Destroy on component destroy to prevent memory leaks
ngOnDestroy() {
  this.subs.unsubscribe();
  this.sketch?.remove();
}
```

## Session tracking (JSON export/import)

Each Play→Pause block is a `SimulationSession` stored in `PatternService.sessions[]`. On export, all sessions serialize to JSON with params + frameCount + end angular state. On import, `replayToLines()` in Controls reproduces all segments mathematically and restores end state so drawing can continue seamlessly.

## Known active limitations

- If reference orbit speed = 0 RPM, simulate mode's angle accumulator never reaches target (no guard in UI yet)
- `lineHistory` is redrawn fully every frame — large patterns (>100k segments) may impact performance
- On window resize, `lineHistory` coordinates remain valid but visual continuity of the curve tip is reset (`firstPoint = true`)
