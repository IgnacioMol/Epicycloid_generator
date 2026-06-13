import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from './i18n.service';

/**
 * Pipe de traducción. Uso en plantilla: {{ 'controls.title' | t }}.
 *
 * Es un pipe impuro (`pure: false`) a propósito: así se reevalúa en cada ciclo
 * de detección de cambios y refleja el idioma activo inmediatamente cuando el
 * usuario lo cambia, sin necesidad de recargar.
 */
@Pipe({ name: 't', standalone: true, pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  transform(key: string): string {
    return this.i18n.translate(key);
  }
}
