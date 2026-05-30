import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DEFAULT_PARAMS, PatternService } from '../../core/pattern.service';
import { PatternParams } from '../../models/pattern-params.model';
import { ExportModal } from '../export-modal/export-modal';

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

  constructor(private patternService: PatternService) {}

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
}
