# Epicycloid Generator — Project Overview

## What this is

A web application built as a **TFG (Trabajo de Fin de Grado)** for university. It generates visual compositions based on orbital interference patterns — two independent planets orbiting the same center, with the artwork being the line drawn between them each frame. The result is similar to string art and Lissajous curves.

The app combines Angular for UI/state management and p5.js for real-time canvas rendering.

## Goal

Allow users to interactively manipulate mathematical parameters (radii, angular speeds, phase, ellipse shape, tilt, color, stroke) and watch the resulting pattern draw itself in real time. Think of it as a parametric spirograph with two independent orbits.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 (standalone components, no NgModules) |
| Graphics | p5.js 2.2.3 (instance mode, runs outside Angular zone) |
| State | RxJS — BehaviorSubject for params, Subject for actions |
| Styling | Bootstrap 5.3 |
| Testing | Vitest 4 |
| Deployment | Vercel |

## Two visualization modes

1. **Line intersection mode** (default) — both orbits originate from the center; a line is drawn between the two planets every frame (or every N seconds via `lineInterval`).
2. **Epicicloidal curve mode** — orbit 2 revolves around the tip of orbit 1; the path of the endpoint is traced.

## Current implementation status

### Done
- Full `PatternParams` model (radii, RPM speeds, initial angles, ellipse factors, orbit tilt, lineColor, lineAlpha, strokeWeight, lineInterval, visualizationMode)
- Canvas rendering: trail layer (`p5.Graphics`), both visualization modes, orbital guides, planet dots, responsive resize
- Controls panel: all params bound via `[(ngModel)]`, collapsible sections (Orbit 1, Orbit 2, Visual, Parámetros avanzados)
- Play / Pause / Clear / Reset actions
- Simulate N orbits: run exactly N revolutions of a selected orbit then auto-stop
- Angular ↔ p5.js integration (instance mode, `ngZone.runOutsideAngular`, `OnDestroy` cleanup)

### Not yet done
- Save as image (RF6)
- Presets — named parameter sets saved to `localStorage` (RF7)
- Random variation mode (RF14)
- Error handling for invalid inputs (RNF10)

## Design docs

- `claude/feature-time-rewind.md` — design proposal for a time-rewind feature (go backward through the simulation, erasing lines as you go). Not yet implemented.

## Deployment target

Vercel (public hosting, no backend required). Each push to `main` auto-deploys.
