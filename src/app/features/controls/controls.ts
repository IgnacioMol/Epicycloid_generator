import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DEFAULT_PARAMS, PatternService } from '../../core/pattern.service';
import { PatternParams } from '../../models/pattern-params.model';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './controls.html',
  styleUrl: './controls.css',
})
export class Controls {
  params: PatternParams = { ...DEFAULT_PARAMS };
  isPlaying = false;

  constructor(private patternService: PatternService) {}

  onParamChange(): void {
    this.clampParams();
    this.patternService.updateParams({ ...this.params });
  }

  private clampParams(): void {
    const p = this.params;
    const d = DEFAULT_PARAMS;
    const safe = (v: number, fallback: number) => (v == null || isNaN(v)) ? fallback : v;

    p.orbit1Radius   = Math.min(500,  Math.max(10,   safe(p.orbit1Radius,   d.orbit1Radius)));
    p.orbit2Radius   = Math.min(500,  Math.max(10,   safe(p.orbit2Radius,   d.orbit2Radius)));
    p.orbit1SpeedRpm = Math.min(100,  Math.max(0,    safe(p.orbit1SpeedRpm, d.orbit1SpeedRpm)));
    p.orbit2SpeedRpm = Math.min(100,  Math.max(0,    safe(p.orbit2SpeedRpm, d.orbit2SpeedRpm)));
    p.initialAngle1  = Math.min(360,  Math.max(0,    safe(p.initialAngle1,  d.initialAngle1)));
    p.initialAngle2  = Math.min(360,  Math.max(0,    safe(p.initialAngle2,  d.initialAngle2)));
    p.orbit1Angle    = Math.min(360,  Math.max(0,    safe(p.orbit1Angle,    d.orbit1Angle)));
    p.orbit2Angle    = Math.min(360,  Math.max(0,    safe(p.orbit2Angle,    d.orbit2Angle)));
    p.orbit1EllipseX = Math.min(2,    Math.max(0.1,  safe(p.orbit1EllipseX, d.orbit1EllipseX)));
    p.orbit1EllipseY = Math.min(2,    Math.max(0.1,  safe(p.orbit1EllipseY, d.orbit1EllipseY)));
    p.orbit2EllipseX = Math.min(2,    Math.max(0.1,  safe(p.orbit2EllipseX, d.orbit2EllipseX)));
    p.orbit2EllipseY = Math.min(2,    Math.max(0.1,  safe(p.orbit2EllipseY, d.orbit2EllipseY)));
    p.lineAlpha      = Math.min(1,    Math.max(0.05, safe(p.lineAlpha,      d.lineAlpha)));
    p.strokeWeight   = Math.min(10,   Math.max(0.5,  safe(p.strokeWeight,   d.strokeWeight)));
    p.lineInterval   = Math.min(60,   Math.max(0,    safe(p.lineInterval,   d.lineInterval)));
  }

  toggleMode(): void {
    this.params = {
      ...this.params,
      visualizationMode: this.params.visualizationMode === 'curve' ? 'lines' : 'curve',
    };
    this.patternService.updateParams(this.params);
  }

  play(): void {
    this.isPlaying = true;
    this.patternService.dispatch('play');
  }

  pause(): void {
    this.isPlaying = false;
    this.patternService.dispatch('pause');
  }

  clear(): void {
    this.patternService.dispatch('clear');
  }

  reset(): void {
    this.params = { ...DEFAULT_PARAMS };
    this.isPlaying = false;
    this.patternService.updateParams(this.params);
    this.patternService.dispatch('reset');
  }

  formatInterval(seconds: number): string {
    if (seconds <= 0) return 'Continuo';
    return seconds.toFixed(3) + 's';
  }
}
