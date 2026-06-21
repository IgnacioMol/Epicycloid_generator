import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should expose the active language label', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // El selector de idioma muestra el nombre del idioma activo.
    expect(typeof app.currentLanguageLabel).toBe('string');
    expect(app.currentLanguageLabel.length).toBeGreaterThan(0);
  });

  it('should start with the language menu closed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.langMenuOpen).toBe(false);
  });
});
