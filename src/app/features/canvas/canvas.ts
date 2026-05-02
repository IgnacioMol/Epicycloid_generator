import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import p5 from 'p5';
import { Subscription } from 'rxjs';
import { CanvasAction, DEFAULT_PARAMS, PatternService } from '../../core/pattern.service';
import { PatternParams, VisualizationMode } from '../../models/pattern-params.model';

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

  private onAction(action: CanvasAction): void {
    switch (action) {
      case 'play':
        this.isPaused = false;
        this.isDrawing = true;
        break;
      case 'pause':
        this.isPaused = !this.isPaused;
        break;
      case 'clear':
        this.clearPending = true;
        break;
      case 'reset':
        this.resetPending = true;
        break;
    }
  }

  private initSketch(): void {
    this.sketch = new p5((p: p5) => {
      let trail: p5.Graphics | null = null;

      p.setup = () => {
        const el = this.container.nativeElement;
        p.createCanvas(el.offsetWidth, el.offsetHeight);
        trail = p.createGraphics(el.offsetWidth, el.offsetHeight);
        trail.clear();
        this.activeMode = this.params.visualizationMode;
        p.frameRate(60);
      };

      p.windowResized = () => {
        const el = this.container.nativeElement;
        p.resizeCanvas(el.offsetWidth, el.offsetHeight);
        trail?.remove();
        trail = p.createGraphics(el.offsetWidth, el.offsetHeight);
        trail.clear();
        this.firstPoint = true;
      };

      p.draw = () => {
        if (!this.params || !trail) return;

        const {
          orbit1Radius: R1,
          orbit2Radius: R2,
          orbit1EllipseX: eX1,
          orbit1EllipseY: eY1,
          orbit2EllipseX: eX2,
          orbit2EllipseY: eY2,
          orbit1Speed: s1,
          orbit2Speed: s2,
          initialAngle1,
          initialAngle2,
          lineColor,
          lineAlpha,
          strokeWeight: sw,
          visualizationMode: mode,
        } = this.params;

        // — Pending actions —

        if (this.resetPending) {
          trail.clear();
          this.angle1 = 0;
          this.angle2 = 0;
          this.firstPoint = true;
          this.isPaused = true;
          this.isDrawing = false;
          this.activeMode = mode;
          this.resetPending = false;
        }

        if (this.clearPending) {
          trail.clear();
          this.angle1 = 0;
          this.angle2 = 0;
          this.firstPoint = true;
          this.clearPending = false;
        }

        // On mode switch: clear trail, reset angles, pause
        if (mode !== this.activeMode) {
          trail.clear();
          this.angle1 = 0;
          this.angle2 = 0;
          this.firstPoint = true;
          this.isPaused = true;
          this.isDrawing = false;
          this.activeMode = mode;
        }

        const init1 = (initialAngle1 * Math.PI) / 180;
        const init2 = (initialAngle2 * Math.PI) / 180;
        const cx = p.width / 2;
        const cy = p.height / 2;

        // — Compute planet positions —

        let x1: number, y1: number, x2: number, y2: number;

        if (mode === 'curve') {
          // Orbit 2 revolves around orbit 1's planet (chained epicycloid)
          x1 = R1 * eX1 * Math.cos(this.angle1 + init1);
          y1 = R1 * eY1 * Math.sin(this.angle1 + init1);
          x2 = x1 + R2 * eX2 * Math.cos(this.angle2 + init2);
          y2 = y1 + R2 * eY2 * Math.sin(this.angle2 + init2);
        } else {
          // Both orbits centered at origin (Processing prototype model)
          x1 = R1 * eX1 * Math.cos(this.angle1 + init1);
          y1 = R1 * eY1 * Math.sin(this.angle1 + init1);
          x2 = R2 * eX2 * Math.cos(this.angle2 + init2);
          y2 = R2 * eY2 * Math.sin(this.angle2 + init2);
        }

        // — Render —

        p.background(10, 10, 20);

        // Paste accumulated trail (absolute pixel coords, before translate)
        p.image(trail, 0, 0);

        // Translate to center for orbital overlay
        p.translate(cx, cy);

        // Draw orbital guides
        p.noFill();
        p.strokeWeight(1);

        if (mode === 'curve') {
          p.stroke(60, 90, 180);
          p.ellipse(0, 0, R1 * eX1 * 2, R1 * eY1 * 2);
          p.stroke(60, 90, 180, 160);
          p.line(0, 0, x1, y1);

          p.stroke(180, 60, 60);
          p.ellipse(x1, y1, R2 * eX2 * 2, R2 * eY2 * 2);
          p.stroke(180, 60, 60, 160);
          p.line(x1, y1, x2, y2);
        } else {
          p.stroke(60, 90, 180);
          p.ellipse(0, 0, R1 * eX1 * 2, R1 * eY1 * 2);
          p.stroke(60, 90, 180, 160);
          p.line(0, 0, x1, y1);

          p.stroke(180, 60, 60);
          p.ellipse(0, 0, R2 * eX2 * 2, R2 * eY2 * 2);
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

        // — Update —

        if (!this.isPaused) {
          if (this.isDrawing) {
            const hex = lineColor.replace('#', '');
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);
            const a = Math.round(lineAlpha * 255);

            trail.stroke(r, g, b, a);
            trail.strokeWeight(sw);
            trail.noFill();

            if (mode === 'curve') {
              // Trace path of the tip point (x2, y2)
              if (!this.firstPoint) {
                trail.line(cx + this.prevTipX, cy + this.prevTipY, cx + x2, cy + y2);
              }
              this.prevTipX = x2;
              this.prevTipY = y2;
            } else {
              // Draw line between the two independent planets
              trail.line(cx + x1, cy + y1, cx + x2, cy + y2);
            }

            this.firstPoint = false;
          }

          this.angle1 += s1;
          this.angle2 += s2;
        }
      };
    }, this.container.nativeElement);
  }
}
