import { Injectable, signal } from '@angular/core';
import es from './es.json';
import en from './en.json';
import id from './id.json';
import cs from './cs.json';

export type Lang = 'es' | 'en' | 'id' | 'cs';

/** Una opción de idioma del selector. `label` es el nombre nativo mostrado. */
export interface LanguageOption {
  code: Lang;
  label: string;
}

/**
 * Idiomas disponibles. Para añadir uno nuevo basta con:
 *   1. crear su archivo `xx.json`,
 *   2. importarlo y registrarlo en `DICTS`,
 *   3. añadir su código al tipo `Lang` y una entrada aquí.
 * El selector de la interfaz se genera automáticamente a partir de esta lista.
 */
export const LANGUAGES: readonly LanguageOption[] = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'cs', label: 'Čeština' },
];

/** Idioma por defecto cuando el navegador no coincide con ninguno disponible. */
const DEFAULT_LANG: Lang = 'en';

/** Diccionario anidado de traducciones (clave → texto o subobjeto). */
type Dict = { [key: string]: string | Dict };

const DICTS: Record<Lang, Dict> = {
  es: es as Dict,
  en: en as Dict,
  id: id as Dict,
  cs: cs as Dict,
};
const STORAGE_KEY = 'epicycloid_lang';

/**
 * Servicio de internacionalización (i18n) en tiempo de ejecución.
 *
 * - Mantiene el idioma activo en una señal reactiva (`lang`), de modo que al
 *   cambiarlo la interfaz se actualiza sin recargar la página.
 * - Detecta el idioma inicial: primero la preferencia guardada del usuario y,
 *   si no existe, el idioma del navegador (español si empieza por "es", inglés
 *   en cualquier otro caso).
 * - Persiste la elección manual en localStorage.
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  /** Lista de idiomas disponibles, para construir el selector. */
  readonly languages = LANGUAGES;

  readonly lang = signal<Lang>(this.detectInitialLang());

  constructor() {
    // Refleja el idioma activo en el atributo <html lang> (accesibilidad/SEO).
    document.documentElement.lang = this.lang();
  }

  /** Cambia el idioma activo y guarda la preferencia. */
  setLang(lang: Lang): void {
    this.lang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }

  /** Alterna entre español e inglés. */
  toggle(): void {
    this.setLang(this.lang() === 'es' ? 'en' : 'es');
  }

  /**
   * Traduce una clave separada por puntos (p. ej. "controls.title") al idioma
   * activo. Si la clave no existe, devuelve la propia clave como aviso visible.
   */
  translate(key: string): string {
    const value = key
      .split('.')
      .reduce<string | Dict | undefined>(
        (node, part) => (node && typeof node === 'object' ? node[part] : undefined),
        DICTS[this.lang()],
      );
    return typeof value === 'string' ? value : key;
  }

  private detectInitialLang(): Lang {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.some((l) => l.code === saved)) return saved as Lang;

    const browser = (navigator.language || '').toLowerCase();
    const match = LANGUAGES.find((l) => browser.startsWith(l.code));
    return match ? match.code : DEFAULT_LANG;
  }
}
