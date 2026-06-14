import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LineRecord, PatternParams, SimulationSession } from '../models/pattern-params.model';

export type CanvasAction = 'play' | 'pause' | 'clear' | 'reset' | 'import-json' | 'undo';

const RPM_TO_RAD_PER_FRAME = (Math.PI * 2) / (60 * 60); // at 60 fps

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

  /**
   * Elimina la última sesión dibujada (deshacer). Si hay una sesión activa sin
   * cerrar, la cierra primero para poder retirarla. Tras quitarla, recalcula el
   * historial de líneas reproduciendo las sesiones restantes, de modo que el
   * lienzo refleje exactamente lo que queda.
   */
  removeLastSession(): void {
    if (this._sessionActive) this.endSession();
    if (this.sessions.length === 0) {
      this.lineHistory = [];
      return;
    }
    this.sessions.pop();
    this.lineHistory = this.replaySessionsToLines(this.sessions);
  }

  /**
   * Reconstruye la colección de líneas a partir de una lista de sesiones,
   * reproduciendo la simulación de cada bloque. Actualiza además el estado final
   * (ángulos y punto extremo) de cada sesión, para poder continuar el dibujo a
   * partir de la última. Se usa tanto al importar un patrón como al deshacer.
   */
  replaySessionsToLines(sessions: SimulationSession[]): LineRecord[] {
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

      session.endAngle1 = angle1;
      session.endAngle2 = angle2;
      session.endTipX = prevTipX;
      session.endTipY = prevTipY;
      session.endFirstPoint = firstPoint;
    }

    return lines;
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
