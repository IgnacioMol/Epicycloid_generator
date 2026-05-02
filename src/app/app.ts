import { Component } from '@angular/core';
import { Canvas } from './features/canvas/canvas';
import { Controls } from './features/controls/controls';

@Component({
  selector: 'app-root',
  imports: [Canvas, Controls],
  templateUrl: './app.html'
})
export class AppComponent {}