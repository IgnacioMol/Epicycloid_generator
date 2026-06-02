import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DEFAULT_PARAMS, PatternService } from '../../core/pattern.service';
import { LineRecord, PatternParams, SimulationSession } from '../../models/pattern-params.model';
import { ExportModal } from '../export-modal/export-modal';

const RPM_TO_RAD_PER_FRAME = (Math.PI * 2) / (60 * 60);

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [FormsModule, ExportModal],
  templateUrl: './controls.html',
  styleUrl: './controls.css',
})
export class Controls {
  params: PatternParams = { ...DEFAULT_PARAMS };
  isPlaying = false;
  showExportModal = false;

  constructor(public patternService: PatternService) {}

  onParamChange(): void {
    this.patternService.updateParams({ ...this.params });
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

  exportJson(): void {
    const completed = [...this.patternService.sessions];
    const active = this.patternService.snapshotActiveSession();
    const allSessions = active ? [...completed, active] : completed;

    if (allSessions.length === 0) return;

    const data = {
      metadata: {
        exportedAt: new Date().toISOString(),
        totalSessions: allSessions.length,
        visualizationMode: this.params.visualizationMode,
      },
      sessions: allSessions,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    link.download = `epicycloid_patron_${date}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  triggerImport(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = (e) => this.onFileSelected(e);
    input.click();
  }

  private onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (!data?.sessions || !Array.isArray(data.sessions) || data.sessions.length === 0) return;

        const sessions: SimulationSession[] = data.sessions;
        for (const s of sessions) {
          if (!s.params || typeof s.frameCount !== 'number') return;
        }

        const computedLines = this.replayToLines(sessions);
        const lastParams: PatternParams = sessions[sessions.length - 1].params;

        this.isPlaying = false;
        this.patternService.endSession();
        this.patternService.dispatch('import-json');
        this.patternService.lineHistory = computedLines;
        this.patternService.sessions = sessions;
        this.params = { ...lastParams };
        this.patternService.updateParams(lastParams);
      } catch {
        // Invalid JSON — silently ignore
      }
    };
    reader.readAsText(file);
  }

  private replayToLines(sessions: SimulationSession[]): LineRecord[] {
    const lines: LineRecord[] = [];
    let angle1 = 0, angle2 = 0;
    let prevTipX = 0, prevTipY = 0;
    let firstPoint = true;
    let framesSinceLastLine = 0;

    for (const session of sessions) {
      const p = session.params;
      const s1 = (p.orbit1SpeedRpm || 0) * RPM_TO_RAD_PER_FRAME;
      const s2 = (p.orbit2SpeedRpm || 0) * RPM_TO_RAD_PER_FRAME;
      const init1 = (p.initialAngle1 * Math.PI) / 180;
      const init2 = (p.initialAngle2 * Math.PI) / 180;
      const a1 = (p.orbit1Angle * Math.PI) / 180;
      const a2 = (p.orbit2Angle * Math.PI) / 180;

      const hex = p.lineColor.replace('#', '');
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const a = Math.round(p.lineAlpha * 255);
      const sw = p.strokeWeight;
      const mode = p.visualizationMode;
      const framesNeeded = p.lineInterval > 0 ? Math.max(1, Math.round(p.lineInterval * 60)) : 1;

      for (let frame = 0; frame < session.frameCount; frame++) {
        const lx1 = p.orbit1Radius * p.orbit1EllipseX * Math.cos(angle1 + init1);
        const ly1 = p.orbit1Radius * p.orbit1EllipseY * Math.sin(angle1 + init1);
        const x1 = lx1 * Math.cos(a1) - ly1 * Math.sin(a1);
        const y1 = lx1 * Math.sin(a1) + ly1 * Math.cos(a1);

        const lx2 = p.orbit2Radius * p.orbit2EllipseX * Math.cos(angle2 + init2);
        const ly2 = p.orbit2Radius * p.orbit2EllipseY * Math.sin(angle2 + init2);
        const rx2 = lx2 * Math.cos(a2) - ly2 * Math.sin(a2);
        const ry2 = lx2 * Math.sin(a2) + ly2 * Math.cos(a2);

        const x2 = mode === 'curve' ? x1 + rx2 : rx2;
        const y2 = mode === 'curve' ? y1 + ry2 : ry2;

        if (mode === 'curve') {
          if (!firstPoint) lines.push({ x1: prevTipX, y1: prevTipY, x2, y2, r, g, b, a, sw });
          prevTipX = x2; prevTipY = y2; firstPoint = false;
        } else {
          if (framesSinceLastLine % framesNeeded === 0) lines.push({ x1, y1, x2, y2, r, g, b, a, sw });
          framesSinceLastLine++;
        }

        angle1 += s1;
        angle2 += s2;
      }
    }

    return lines;
  }
}
