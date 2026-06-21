import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DEFAULT_PARAMS, PatternService } from '../../core/pattern.service';
import { PatternParams, SimulationSession } from '../../models/pattern-params.model';
import { ExportModal } from '../export-modal/export-modal';
import { PATTERN_PRESETS } from '../presets/presets';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { I18nService } from '../../core/i18n/i18n.service';

/** Rango válido (min/max) y paso de cada parámetro numérico, espejo de los controles del HTML. */
type NumericParam =
  | 'orbit1Radius' | 'orbit2Radius'
  | 'orbit1EllipseX' | 'orbit1EllipseY' | 'orbit2EllipseX' | 'orbit2EllipseY'
  | 'orbit1Angle' | 'orbit2Angle'
  | 'orbit1SpeedRpm' | 'orbit2SpeedRpm'
  | 'initialAngle1' | 'initialAngle2'
  | 'lineAlpha' | 'strokeWeight' | 'lineInterval';

const PARAM_RANGES: Record<NumericParam, { min: number; max: number; step: number }> = {
  orbit1Radius: { min: 50, max: 350, step: 5 },
  orbit2Radius: { min: 50, max: 350, step: 5 },
  orbit1EllipseX: { min: 0.1, max: 2, step: 0.05 },
  orbit1EllipseY: { min: 0.1, max: 2, step: 0.05 },
  orbit2EllipseX: { min: 0.1, max: 2, step: 0.05 },
  orbit2EllipseY: { min: 0.1, max: 2, step: 0.05 },
  orbit1Angle: { min: 0, max: 360, step: 1 },
  orbit2Angle: { min: 0, max: 360, step: 1 },
  orbit1SpeedRpm: { min: 1, max: 50, step: 0.1 },
  orbit2SpeedRpm: { min: 1, max: 50, step: 0.1 },
  initialAngle1: { min: 0, max: 360, step: 1 },
  initialAngle2: { min: 0, max: 360, step: 1 },
  lineAlpha: { min: 0.05, max: 1, step: 0.05 },
  strokeWeight: { min: 0, max: 1, step: 0.1 },
  lineInterval: { min: 0, max: 1, step: 0.05 },
};

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [FormsModule, ExportModal, TranslatePipe],
  templateUrl: './controls.html',
  styleUrl: './controls.css',
})
export class Controls {
  params: PatternParams = { ...DEFAULT_PARAMS };
  isPlaying = false;
  showExportModal = false;

  /** Catálogo de ejemplos predefinidos (RF7) para el desplegable. */
  readonly presets = PATTERN_PRESETS;
  /** Id del ejemplo seleccionado; '' = ninguno (lienzo en blanco, valores por defecto). */
  selectedPresetId = '';

  private readonly i18n = inject(I18nService);

  constructor(public patternService: PatternService) {}

  onParamChange(): void {
    this.selectedPresetId = '';
    this.patternService.updateParams({ ...this.params });
  }
  
  applyPreset(): void {
    const preset = this.presets.find((p) => p.id === this.selectedPresetId);
    this.params = preset
      ? { ...DEFAULT_PARAMS, ...preset.params }
      : { ...DEFAULT_PARAMS };
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
    if (this.isPlaying) this.pause();
    const removed = this.patternService.removeLastSession();
    if (removed) {
      const last = this.patternService.sessions.at(-1);
      this.params = { ...(last ? last.params : removed.params) };
      this.patternService.updateParams(this.params);
    }
    this.patternService.dispatch('undo');
  }

  reset(): void {
    this.params = { ...DEFAULT_PARAMS };
    this.selectedPresetId = '';
    this.isPlaying = false;
    this.patternService.updateParams(this.params);
    this.patternService.dispatch('reset');
  }

  /**
   * Genera un patrón "único" asignando valores aleatorios a cada parámetro,
   * siempre dentro de los límites min/max y respetando el step de cada control,
   * de modo que el resultado sea reproducible manualmente por el usuario.
   * El modo de visualización se conserva (no es un valor numérico, sino la
   * decisión del usuario sobre qué tipo de patrón quiere generar).
   */
  randomize(): void {
    const next = { ...this.params };
    for (const key of Object.keys(PARAM_RANGES) as NumericParam[]) {
      // El intervalo entre líneas se conserva: solo lo cambia el usuario.
      if (key === 'lineInterval') continue;
      next[key] = this.randInRange(PARAM_RANGES[key]);
    }
    next.lineColor = this.randColor();
    this.params = next;
    this.selectedPresetId = '';
    this.patternService.updateParams({ ...this.params });
  }
  
  
  clampParams(): void {
    for (const key of Object.keys(PARAM_RANGES) as NumericParam[]) {
      const { min, max } = PARAM_RANGES[key];
      const value = this.params[key];
      if (typeof value !== 'number' || Number.isNaN(value)) {
        this.params[key] = min;
      } else if (value < min) {
        this.params[key] = min;
      } else if (value > max) {
        this.params[key] = max;
      }
    }
    this.patternService.updateParams({ ...this.params });
  }

  /** Valor aleatorio en [min, max] alineado al step, redondeado para evitar errores de coma flotante. */
  private randInRange({ min, max, step }: { min: number; max: number; step: number }): number {
    const steps = Math.round((max - min) / step);
    const value = min + Math.round(Math.random() * steps) * step;
    const decimals = (step.toString().split('.')[1] || '').length;
    return parseFloat(value.toFixed(decimals));
  }

  /** Color hexadecimal aleatorio en formato '#rrggbb'. */
  private randColor(): string {
    const channel = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${channel()}${channel()}${channel()}`;
  }

  formatInterval(seconds: number): string {
    if (seconds <= 0) return this.i18n.translate('controls.continuous');
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

        const computedLines = this.patternService.replaySessionsToLines(sessions);
        const lastSession = sessions[sessions.length - 1];
        const lastParams: PatternParams = lastSession.params;

        this.isPlaying = false;
        this.selectedPresetId = '';
        this.patternService.endSession();
        this.params = { ...lastParams };
        this.patternService.updateParams(lastParams);
        this.patternService.importState = {
          angle1: lastSession.endAngle1,
          angle2: lastSession.endAngle2,
          tipX: lastSession.endTipX,
          tipY: lastSession.endTipY,
          firstPoint: lastSession.endFirstPoint,
        };
        this.patternService.dispatch('import-json');
        this.patternService.lineHistory = computedLines;
        this.patternService.sessions = sessions;
      } catch {
        // Invalid JSON — silently ignore
      }
    };
    reader.readAsText(file);
  }
}
