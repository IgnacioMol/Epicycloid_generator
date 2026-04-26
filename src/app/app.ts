import { Component } from '@angular/core';
import { Canvas } from './features/canvas/canvas';
import { Controls } from './features/controls/controls';
import { PatternParams } from './models/pattern-params.model';

@Component({
  selector: 'app-root',
  imports: [Canvas, Controls],
  templateUrl: './app.html'
})
export class AppComponent {

  currentParams!: PatternParams;

  onParamsChange(params: PatternParams) {
    this.currentParams = params;
  }
}