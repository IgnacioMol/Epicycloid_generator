import { Component, inject } from '@angular/core';
import { Canvas } from './features/canvas/canvas';
import { Controls } from './features/controls/controls';
import { Tutorial } from './features/tutorial/tutorial';
import { I18nService, Lang } from './core/i18n/i18n.service';

@Component({
  selector: 'app-root',
  imports: [Canvas, Controls, Tutorial],
  templateUrl: './app.html'
})
export class AppComponent {
  readonly i18n = inject(I18nService);

  /** Controla si el desplegable de idiomas está abierto. */
  langMenuOpen = false;

  /** Nombre del idioma activo, para mostrarlo en el botón del selector. */
  get currentLanguageLabel(): string {
    return this.i18n.languages.find((l) => l.code === this.i18n.lang())?.label ?? '';
  }

  selectLang(code: Lang): void {
    this.i18n.setLang(code);
    this.langMenuOpen = false;
  }
}