import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import p5 from 'p5';
import { PatternService } from '../../core/pattern.service';
import { PatternParams } from '../../models/pattern-params.model';

@Component({
  selector: 'app-canvas',
  standalone: true,
  templateUrl: './canvas.html'
})
export class Canvas implements OnInit {

  @ViewChild('canvasContainer', { static: true }) container!: ElementRef;

  sketch!: p5;
  params!: PatternParams;

  constructor(private patternService: PatternService) {}

  ngOnInit(): void {

    // 🔗 Suscripción a cambios
    this.patternService.params$.subscribe(p => {
      this.params = p;
    });

    this.sketch = new p5((p: p5) => {
      let t = 0;
      let trail: { x: number, y: number }[] = [];
      p.setup = () => {
        p.createCanvas(800, 600);
        p.background(0);
      };

      p.draw = () => {
        p.translate(p.width / 2, p.height / 2);

        if (!this.params) return;

        const {
          orbit1Radius,
          orbit2Radius,
          orbit1Speed,
          orbit2Speed,
          orbit1EllipseX,
          orbit1EllipseY,
          orbit2EllipseX,
          orbit2EllipseY
        } = this.params;

        // 🔵 ORBITA 1
        let x1 = orbit1Radius * orbit1EllipseX * Math.cos(t * orbit1Speed);
        let y1 = orbit1Radius * orbit1EllipseY * Math.sin(t * orbit1Speed);

        // 🔴 ORBITA 2 (relativa a la primera)
        let x2 = x1 + orbit2Radius * orbit2EllipseX * Math.cos(t * orbit2Speed);
        let y2 = y1 + orbit2Radius * orbit2EllipseY * Math.sin(t * orbit2Speed);

        // Guardar trazo
        trail.push({ x: x2, y: y2 });

        // Dibujar trazo
        p.stroke(255);
        p.noFill();

        p.beginShape();
        for (let pt of trail) {
          p.vertex(pt.x, pt.y);
        }
        p.endShape();

        t += 1;
      };

    }, this.container.nativeElement);
  }
}