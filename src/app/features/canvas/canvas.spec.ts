import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Canvas } from './canvas';

// p5 no puede renderizar sobre el <canvas> de jsdom (no implementa el contexto 2D),
// por lo que su arranque real lanzaría errores. Para esta prueba —que solo verifica
// que el componente se crea— sustituimos p5 por un stub inofensivo.
vi.mock('p5', () => ({ default: class { remove() {} } }));

describe('Canvas', () => {
  let component: Canvas;
  let fixture: ComponentFixture<Canvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Canvas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Canvas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
