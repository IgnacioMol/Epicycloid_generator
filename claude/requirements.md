# Requirements

## Functional requirements

| ID | Description | Status |
|---|---|---|
| RF1 | Generate visual compositions from parametric orbital patterns | Done — both modes functional |
| RF2 | User can modify parameters in real time (radii, speeds, orbits, phase, color, stroke…) | Done — all params bound via [(ngModel)]; updates emit to PatternService on every change |
| RF3 | Canvas updates dynamically on parameter change without page reload | Done — service subscription reactive |
| RF4 | Start, pause, and restart animation | Done — Play / Pause buttons wired via PatternService.dispatch() |
| RF5 | Clear canvas and start fresh | Done — Clear button wired |
| RF6 | Save composition as image (standard format, e.g. PNG) | Done — ExportModal: fondo, zoom, resolución 1×/2×/4×, nombre de archivo, preview en tiempo real |
| RF7 | Store and recover named parameter presets | Not done — Presets component is empty placeholder |
| RF8 | Toggle between **epicicloidal curve mode** and **line intersection mode** | Done — toggle button in controls panel, both modes implemented |
| RF9 | Interactive controls: sliders, selectors, numeric fields | Done — sliders en fases iniciales e inclinación; inputs numéricos en el resto; selector de color nativo |
| RF10 | Display current parameter values on screen | Done — los inputs numéricos siempre muestran el valor actual; se actualizan en tiempo real |
| RF11 | Correct Angular ↔ p5.js integration | Done — instance mode, AfterViewInit, responsive, OnDestroy cleanup |
| RF12 | Modular reusable Angular components | Done — Canvas / Controls / PatternService decoupled correctly |
| RF13 | Responsive canvas adapting to window size | Done — windowResized handler resizes canvas and trail buffer |
| RF14 | Automatic pattern variation via controlled random values | Not done |
| RF15 | Reset parameters to defaults at any time | Done — Reset button restores DEFAULT_PARAMS and clears canvas |

## Non-functional requirements

| ID | Description |
|---|---|
| RNF1 | Compatible with modern browsers (HTML5, CSS3, ES6+) |
| RNF2 | Angular as structural framework |
| RNF3 | p5.js for graphics, correctly integrated in Angular |
| RNF4 | Intuitive UI for non-technical users |
| RNF5 | Smooth real-time performance on mid-range devices |
| RNF6 | Modular, maintainable, scalable Angular architecture |
| RNF7 | Well-documented and structured source code |
| RNF8 | Minimize unnecessary CPU use during continuous animation |
| RNF9 | Responsive layout for desktop and tablet resolutions |
| RNF10 | Basic error handling for invalid parameter inputs |
| RNF11 | Compatible with Chrome, Firefox, Edge, and Opera |
| RNF12 | Deployed on Netlify (public cloud hosting) |

## Priority order for implementation

1. Fix canvas mounting (RF11 blocker) — wire `#canvasContainer` in `canvas.html`
2. Unify `PatternParams` model and bind controls (RF2, RF3, RF9, RF10)
3. Play / Pause / Reset / Clear (RF4, RF5, RF15)
4. Responsive canvas (RF13)
5. Save as image (RF6)
6. Line intersection mode (RF8)
7. Presets (RF7)
8. Random variation (RF14)
9. Error handling (RNF10)
10. Vercel deploy (RNF12)
