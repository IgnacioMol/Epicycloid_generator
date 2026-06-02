import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import p5 from 'p5';
import { Subscription } from 'rxjs';
import { CanvasAction, DEFAULT_PARAMS, PatternService } from '../../core/pattern.service';
import { LineRecord, PatternParams, VisualizationMode } from '../../models/pattern-params.model';

const RPM_TO_RAD_PER_FRAME = (Math.PI * 2) / (60 * 60); // at 60 fps
const ZOOM_STEP = 0.15;
const MIN_ZOOM = 1 / 3;
const MAX_ZOOM = 8;

@Component({
  selector: 'app-canvas',
  standalone: true,
  templateUrl: './canvas.html',
  styleUrl: './canvas.css',
})
export class Canvas implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: false }) container!: ElementRef;

  private sketch!: p5;
  private params: PatternParams = { ...DEFAULT_PARAMS };
  private subs = new Subscription();

  // Animation state — read by sketch closure each frame
  private isPaused = true;
  private isDrawing = false;
  private angle1 = 0;
  private angle2 = 0;
  private prevTipX = 0;
  private prevTipY = 0;
  private firstPoint = true;
  private activeMode: VisualizationMode = DEFAULT_PARAMS.visualizationMode;
  private clearPending = false;
  private resetPending = false;
  private framesSinceLastLine = 0;

  // View state
  private zoom = 1;

  constructor(private patternService: PatternService) {}

  ngAfterViewInit(): void {
    this.subs.add(this.patternService.params$.subscribe((p) => (this.params = p)));
    this.subs.add(this.patternService.action$.subscribe((a) => this.onAction(a)));
    this.initSketch();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.sketch?.remove();
  }

  zoomIn(): void {
    this.zoom = Math.min(MAX_ZOOM, parseFloat((this.zoom + ZOOM_STEP).toFixed(2)));
  }

  zoomOut(): void {
    this.zoom = Math.max(MIN_ZOOM, parseFloat((this.zoom - ZOOM_STEP).toFixed(2)));
  }

  private onAction(action: CanvasAction): void {
    switch (action) {
      case 'play':
        this.patternService.beginSession(this.params);
        this.isPaused = false;
        this.isDrawing = true;
        break;
      case 'pause':
        if (!this.isPaused) this.patternService.endSession();
        this.isPaused = !this.isPaused;
        break;
      case 'clear':
        this.clearPending = true;
        break;
      case 'reset':
        this.resetPending = true;
        break;
      case 'import-json': {
        const s = this.patternService.importState;
        this.angle1 = s?.angle1 ?? 0;
        this.angle2 = s?.angle2 ?? 0;
        this.prevTipX = s?.tipX ?? 0;
        this.prevTipY = s?.tipY ?? 0;
        this.firstPoint = s?.firstPoint ?? true;
        this.framesSinceLastLine = 0;
        this.isPaused = true; this.isDrawing = false;
        this.activeMode = this.params.visualizationMode;
        break;
      }
    }
  }

  private initSketch(): void {
    this.sketch = new p5((p: p5) => {
      let canvasEl: HTMLElement | null = null;

      p.setup = () => {
        const el = this.container.nativeElement;
        canvasEl = p.createCanvas(el.offsetWidth, el.offsetHeight).elt as HTMLElement;
        this.patternService.canvasDimensions = { w: el.offsetWidth, h: el.offsetHeight };
        this.activeMode = this.params.visualizationMode;
        p.frameRate(60);
      };

      p.windowResized = () => {
        const el = this.container.nativeElement;
        p.resizeCanvas(el.offsetWidth, el.offsetHeight);
        this.patternService.canvasDimensions = { w: el.offsetWidth, h: el.offsetHeight };
        // Line history uses canvas-space coords — resize keeps them valid
        this.firstPoint = true;
      };

      p.mouseWheel = (event: any) => {
        if (event.target !== canvasEl) return;
        if (event.delta < 0) this.zoomIn();
        else this.zoomOut();
        return false;
      };

      p.draw = () => {
        if (!this.params) return;

        const {
          orbit1Radius: R1, orbit2Radius: R2,
          orbit1EllipseX: eX1, orbit1EllipseY: eY1,
          orbit2EllipseX: eX2, orbit2EllipseY: eY2,
          orbit1Angle, orbit2Angle,
          orbit1SpeedRpm: rpm1, orbit2SpeedRpm: rpm2,
          initialAngle1, initialAngle2,
          lineColor, lineAlpha, strokeWeight: sw,
          visualizationMode: mode, lineInterval,
        } = this.params;

        const s1 = (rpm1 || 0) * RPM_TO_RAD_PER_FRAME;
        const s2 = (rpm2 || 0) * RPM_TO_RAD_PER_FRAME;
        const init1 = (initialAngle1 * Math.PI) / 180;
        const init2 = (initialAngle2 * Math.PI) / 180;
        const a1 = (orbit1Angle * Math.PI) / 180;
        const a2 = (orbit2Angle * Math.PI) / 180;

        // — Pending actions —

        if (this.resetPending) {
          this.patternService.endSession();
          this.patternService.clearSessions();
          this.patternService.lineHistory = [];
          this.angle1 = 0; this.angle2 = 0;
          this.firstPoint = true;
          this.isPaused = true; this.isDrawing = false;
          this.activeMode = mode;
          this.resetPending = false;
          this.framesSinceLastLine = 0;
        }

        if (this.clearPending) {
          this.patternService.lineHistory = [];
          this.angle1 = 0; this.angle2 = 0;
          this.firstPoint = true;
          this.clearPending = false;
          this.framesSinceLastLine = 0;
        }

        if (mode !== this.activeMode) {
          this.patternService.endSession();
          this.patternService.clearSessions();
          this.patternService.lineHistory = [];
          this.angle1 = 0; this.angle2 = 0;
          this.firstPoint = true;
          this.isPaused = true; this.isDrawing = false;
          this.activeMode = mode;
          this.framesSinceLastLine = 0;
        }

        const cx = p.width / 2;
        const cy = p.height / 2;

        // — Compute planet positions —

        let x1: number, y1: number, x2: number, y2: number;

        const lx1 = R1 * eX1 * Math.cos(this.angle1 + init1);
        const ly1 = R1 * eY1 * Math.sin(this.angle1 + init1);
        x1 = lx1 * Math.cos(a1) - ly1 * Math.sin(a1);
        y1 = lx1 * Math.sin(a1) + ly1 * Math.cos(a1);

        const lx2 = R2 * eX2 * Math.cos(this.angle2 + init2);
        const ly2 = R2 * eY2 * Math.sin(this.angle2 + init2);
        const rx2 = lx2 * Math.cos(a2) - ly2 * Math.sin(a2);
        const ry2 = lx2 * Math.sin(a2) + ly2 * Math.cos(a2);

        if (mode === 'curve') {
          x2 = x1 + rx2;
          y2 = y1 + ry2;
        } else {
          x2 = rx2;
          y2 = ry2;
        }

        // — Render —

        p.background(10, 10, 20);

        // Draw accumulated lines via raw Canvas 2D — vector quality at any zoom level.
        // p5's push/translate/scale writes directly to the canvas context, so the
        // transform set here is already active when we use ctx.moveTo/lineTo.
        const history = this.patternService.lineHistory;
        if (history.length > 0) {
          const ctx = (p as any).drawingContext as CanvasRenderingContext2D;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.scale(this.zoom, this.zoom);

          // Each line needs its own stroke() call so overlapping lines
          // accumulate alpha correctly (a single batched stroke() paints each
          // pixel only once, collapsing intersections to the same intensity).
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          for (const ln of history) {
            ctx.strokeStyle = `rgba(${ln.r},${ln.g},${ln.b},${ln.a / 255})`;
            ctx.lineWidth = ln.sw;
            ctx.beginPath();
            ctx.moveTo(ln.x1, ln.y1);
            ctx.lineTo(ln.x2, ln.y2);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Orbital guides and planet dots (p5 methods, same world space)
        p.push();
        p.translate(cx, cy);
        p.scale(this.zoom);
        p.noFill();
        p.strokeWeight(1);

        if (mode === 'curve') {
          p.stroke(60, 90, 180);
          p.push(); p.rotate(a1); p.ellipse(0, 0, R1 * eX1 * 2, R1 * eY1 * 2); p.pop();
          p.stroke(60, 90, 180, 160);
          p.line(0, 0, x1, y1);

          p.stroke(180, 60, 60);
          p.push(); p.translate(x1, y1); p.rotate(a2); p.ellipse(0, 0, R2 * eX2 * 2, R2 * eY2 * 2); p.pop();
          p.stroke(180, 60, 60, 160);
          p.line(x1, y1, x2, y2);
        } else {
          p.stroke(60, 90, 180);
          p.push(); p.rotate(a1); p.ellipse(0, 0, R1 * eX1 * 2, R1 * eY1 * 2); p.pop();
          p.stroke(60, 90, 180, 160);
          p.line(0, 0, x1, y1);

          p.stroke(180, 60, 60);
          p.push(); p.rotate(a2); p.ellipse(0, 0, R2 * eX2 * 2, R2 * eY2 * 2); p.pop();
          p.stroke(180, 60, 60, 160);
          p.line(0, 0, x2, y2);
        }

        // Center dot
        p.noStroke();
        p.fill(255, 200, 0);
        p.circle(0, 0, 10);

        // Planet dots
        p.fill(120, 170, 255);
        p.circle(x1, y1, 10);
        p.fill(255, 110, 110);
        p.circle(x2, y2, 8);

        p.pop();

        // — Update —

        if (!this.isPaused) {
          if (this.isDrawing) {
            const hex = lineColor.replace('#', '');
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);
            const a = Math.round(lineAlpha * 255);

            const record = (lx1: number, ly1: number, lx2: number, ly2: number): LineRecord =>
              ({ x1: lx1, y1: ly1, x2: lx2, y2: ly2, r, g, b, a, sw });

            if (mode === 'curve') {
              if (!this.firstPoint) {
                this.patternService.lineHistory.push(record(this.prevTipX, this.prevTipY, x2, y2));
              }
              this.prevTipX = x2;
              this.prevTipY = y2;
              this.firstPoint = false;
            } else {
              const framesNeeded = lineInterval > 0 ? Math.max(1, Math.round(lineInterval * 60)) : 1;
              if (this.framesSinceLastLine % framesNeeded === 0) {
                this.patternService.lineHistory.push(record(x1, y1, x2, y2));
              }
              this.framesSinceLastLine++;
            }
          }

          this.patternService.incrementSessionFrame();
          this.angle1 += s1;
          this.angle2 += s2;
          this.patternService.setCurrentState(this.angle1, this.angle2, this.prevTipX, this.prevTipY, this.firstPoint);
        }
      };
    }, this.container.nativeElement);
  }
}
