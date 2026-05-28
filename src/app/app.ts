import { Component } from '@angular/core';
import { Canvas } from './features/canvas/canvas';
import { Controls } from './features/controls/controls';
import { Tutorial } from './features/tutorial/tutorial';

@Component({
  selector: 'app-root',
  imports: [Canvas, Controls, Tutorial],
  templateUrl: './app.html'
})
export class AppComponent {}