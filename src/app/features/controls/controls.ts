import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanvasAction, DEFAULT_PARAMS, PatternService } from '../../core/pattern.service';
import { PatternParams } from '../../models/pattern-params.model';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './controls.html',
})
export class Controls {
  params: PatternParams = { ...DEFAULT_PARAMS };

  constructor(private patternService: PatternService) {}

  toggleMode(): void {
    this.params = {
      ...this.params,
      visualizationMode: this.params.visualizationMode === 'curve' ? 'lines' : 'curve',
    };
    this.patternService.updateParams(this.params);
  }

  dispatch(action: CanvasAction): void {
    this.patternService.dispatch(action);
  }

  reset(): void {
    this.params = { ...DEFAULT_PARAMS };
    this.patternService.updateParams(this.params);
    this.patternService.dispatch('reset');
  }
}
