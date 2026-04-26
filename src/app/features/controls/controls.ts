import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatternService } from '../../core/pattern.service';
import { PatternParams } from '../../models/pattern-params.model';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './controls.html'
})
export class Controls {

  params: PatternParams = {
    R: 100,
    r: 40,
    d: 60,
    speed: 0.01,
    color: '#ffffff',
    strokeWeight: 1,
    phase: 0
  };

  constructor(private patternService: PatternService) {}

  update() {
    this.patternService.updateParams(this.params);
  }
}