import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PatternParams } from '../models/pattern-params.model';

@Injectable({
  providedIn: 'root'
})
export class PatternService {

  private paramsSubject = new BehaviorSubject<PatternParams>({
    R: 100,
    r: 40,
    d: 60,
    speed: 0.01,
    color: '#ffffff',
    strokeWeight: 1,
    phase: 0
  });

  params$ = this.paramsSubject.asObservable();

  updateParams(params: PatternParams) {
    this.paramsSubject.next(params);
  }

  getCurrentParams(): PatternParams {
    return this.paramsSubject.value;
  }
}