import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PatternParams } from '../models/pattern-params.model';

export type CanvasAction = 'play' | 'pause' | 'clear' | 'reset';

export const DEFAULT_PARAMS: PatternParams = {
  orbit1Radius: 150,
  orbit2Radius: 200,
  orbit1EllipseX: 1.0,
  orbit1EllipseY: 1.0,
  orbit2EllipseX: 1.0,
  orbit2EllipseY: 1.0,
  orbit1Speed: 0.0105,   // ~TWO_PI/600 — ~1 orbit every 10s at 60fps
  orbit2Speed: 0.0052,   // half speed — produces complex patterns
  initialAngle1: 0,
  initialAngle2: 0,
  lineColor: '#ffffff',
  lineAlpha: 0.6,
  strokeWeight: 1,
  visualizationMode: 'lines',
};

@Injectable({ providedIn: 'root' })
export class PatternService {
  private paramsSubject = new BehaviorSubject<PatternParams>(DEFAULT_PARAMS);
  private actionSubject = new Subject<CanvasAction>();

  params$ = this.paramsSubject.asObservable();
  action$ = this.actionSubject.asObservable();

  updateParams(params: PatternParams): void {
    this.paramsSubject.next(params);
  }

  getCurrentParams(): PatternParams {
    return this.paramsSubject.value;
  }

  dispatch(action: CanvasAction): void {
    this.actionSubject.next(action);
  }
}
