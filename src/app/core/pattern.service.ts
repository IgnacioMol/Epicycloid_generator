import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LineRecord, PatternParams, SimulationSession } from '../models/pattern-params.model';

export type CanvasAction = 'play' | 'pause' | 'clear' | 'reset' | 'import-json';

export const DEFAULT_PARAMS: PatternParams = {
  orbit1Radius: 150,
  orbit2Radius: 200,
  orbit1EllipseX: 1.0,
  orbit1EllipseY: 1.0,
  orbit2EllipseX: 1.0,
  orbit2EllipseY: 1.0,
  orbit1Angle: 0,
  orbit2Angle: 0,
  orbit1SpeedRpm: 6.0,
  orbit2SpeedRpm: 3.0,
  initialAngle1: 0,
  initialAngle2: 0,
  lineColor: '#ffffff',
  lineAlpha: 0.6,
  strokeWeight: 1,
  lineInterval: 0,
  visualizationMode: 'lines',
};

@Injectable({ providedIn: 'root' })
export class PatternService {
  private paramsSubject = new BehaviorSubject<PatternParams>(DEFAULT_PARAMS);
  private actionSubject = new Subject<CanvasAction>();

  params$ = this.paramsSubject.asObservable();
  action$ = this.actionSubject.asObservable();

  // Set by CanvasComponent; shared with ExportModal for rendering
  lineHistory: LineRecord[] = [];
  canvasDimensions = { w: 0, h: 0 };

  // Session recording
  sessions: SimulationSession[] = [];
  private _sessionParams: PatternParams | null = null;
  private _sessionFrameCount = 0;
  private _sessionActive = false;

  // Live canvas state (updated each active frame by canvas.ts)
  private _stateAngle1 = 0;
  private _stateAngle2 = 0;
  private _stateTipX = 0;
  private _stateTipY = 0;
  private _stateFirstPoint = true;

  // State to restore in canvas after JSON import
  importState: { angle1: number; angle2: number; tipX: number; tipY: number; firstPoint: boolean } | null = null;

  updateParams(params: PatternParams): void {
    this.paramsSubject.next(params);
  }

  getCurrentParams(): PatternParams {
    return this.paramsSubject.value;
  }

  dispatch(action: CanvasAction): void {
    this.actionSubject.next(action);
  }

  beginSession(params: PatternParams): void {
    this._sessionParams = { ...params };
    this._sessionFrameCount = 0;
    this._sessionActive = true;
  }

  incrementSessionFrame(): void {
    if (this._sessionActive) this._sessionFrameCount++;
  }

  /** Called by canvas each active frame, after angle increments, to track end state. */
  setCurrentState(angle1: number, angle2: number, tipX: number, tipY: number, firstPoint: boolean): void {
    this._stateAngle1 = angle1;
    this._stateAngle2 = angle2;
    this._stateTipX = tipX;
    this._stateTipY = tipY;
    this._stateFirstPoint = firstPoint;
  }

  endSession(): void {
    if (!this._sessionActive || !this._sessionParams) return;
    this._sessionActive = false;
    if (this._sessionFrameCount > 0) {
      this.sessions.push({
        sessionIndex: this.sessions.length + 1,
        params: this._sessionParams,
        frameCount: this._sessionFrameCount,
        durationSeconds: parseFloat((this._sessionFrameCount / 60).toFixed(3)),
        endAngle1: this._stateAngle1,
        endAngle2: this._stateAngle2,
        endTipX: this._stateTipX,
        endTipY: this._stateTipY,
        endFirstPoint: this._stateFirstPoint,
      });
    }
    this._sessionParams = null;
    this._sessionFrameCount = 0;
  }

  /** Returns a snapshot of the active (not yet ended) session, or null if idle. */
  snapshotActiveSession(): SimulationSession | null {
    if (!this._sessionActive || !this._sessionParams || this._sessionFrameCount === 0) return null;
    return {
      sessionIndex: this.sessions.length + 1,
      params: { ...this._sessionParams },
      frameCount: this._sessionFrameCount,
      durationSeconds: parseFloat((this._sessionFrameCount / 60).toFixed(3)),
      endAngle1: this._stateAngle1,
      endAngle2: this._stateAngle2,
      endTipX: this._stateTipX,
      endTipY: this._stateTipY,
      endFirstPoint: this._stateFirstPoint,
    };
  }

  clearSessions(): void {
    this.sessions = [];
    this._sessionParams = null;
    this._sessionFrameCount = 0;
    this._sessionActive = false;
    this._stateAngle1 = 0;
    this._stateAngle2 = 0;
    this._stateTipX = 0;
    this._stateTipY = 0;
    this._stateFirstPoint = true;
    this.importState = null;
  }
}
