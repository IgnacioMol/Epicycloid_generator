# Architecture

## Folder structure

```
src/app/
├── app.ts                        # Root component — layout shell only
├── app.html                      # Bootstrap grid: left=canvas (col-8), right=controls (col-4)
├── app.routes.ts                 # Empty routes (single-page, no routing needed)
├── app.config.ts                 # provideBrowserGlobalErrorListeners, provideRouter
│
├── core/
│   ├── pattern.service.ts        # Singleton state: BehaviorSubject<PatternParams>
│   └── pattern.ts                # Empty Injectable (placeholder, not used yet)
│
├── features/
│   ├── canvas/
│   │   ├── canvas.ts             # p5.js sketch lives here; subscribes to PatternService
│   │   ├── canvas.html           # Currently a placeholder div, not yet wired to p5
│   │   └── canvas.css
│   ├── controls/
│   │   ├── controls.ts           # Owns local PatternParams copy, calls patternService.updateParams()
│   │   ├── controls.html         # Slider/input placeholders (not yet bound to params)
│   │   └── controls.css
│   └── presets/
│       ├── presets.ts            # Empty placeholder component
│       ├── presets.html
│       └── presets.css
│
└── models/
    └── pattern-params.model.ts   # PatternParams interface
```

## Data flow

```
Controls component
  └─ updates PatternParams locally
  └─ calls PatternService.updateParams(params)
         └─ BehaviorSubject emits new value
                └─ Canvas component subscribes via params$
                       └─ p5 draw() loop reads this.params each frame
```

## PatternParams model (current state)

```typescript
interface PatternParams {
  orbit1Radius: number;
  orbit2Radius: number;
  orbit1Speed: number;    // radians per frame
  orbit2Speed: number;
  color: string;          // hex line color
  strokeWeight: number;
  phase: number;
}
```

Needs expansion with: `orbit1EllipseX/Y`, `orbit2EllipseX/Y`, `initialAngle1/2`, `lineAlpha`, `showOrbits`, `showPlanets`, `showCenter`. See `implementation-notes.md` for the full target interface.

## p5.js integration pattern

p5 is instantiated in **instance mode** inside `canvas.ts ngOnInit()`:

```typescript
this.sketch = new p5((p: p5) => {
  p.setup = () => { ... };
  p.draw = () => { ... };
}, this.container.nativeElement);
```

The sketch closure captures `this` (the Angular component), so it reads `this.params` directly each frame. This is the correct pattern for Angular — avoids global p5 sketch conflicts.

## Known issues / next steps

- Controls sliders are not yet bound via `[(ngModel)]` — they don't emit updates to PatternService.
- Canvas draw loop uses "orbit2 centered on orbit1's point" — **incorrect**. Per the Processing prototype, both orbits are independent (both centered at origin), and the artwork is a line drawn between the two planets each frame.
- Missing `p5.Graphics` trail layer — currently drawing directly on the canvas background. Needs a separate offscreen buffer so background can be cleared per frame without erasing the pattern.
- PatternParams missing ellipse factors, initial angles, alpha, and display toggles.
