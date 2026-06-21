# 07b — El pipe de traducción `| t` en detalle

Documento centrado en **cómo funciona exactamente** el pipe de traducción `TranslatePipe` y en **por qué se eligió esta forma** de traducir y no otra. Complementa la visión general de [07-i18n.md](claude/estructura/07-i18n.md).

Archivos implicados:
- [translate.pipe.ts](src/app/core/i18n/translate.pipe.ts) — el pipe.
- [i18n.service.ts](src/app/core/i18n/i18n.service.ts) — el servicio que resuelve las claves.

---

## 1. Qué es un *pipe* y cómo se usa aquí

Un **pipe** en Angular es una transformación que se aplica a un valor dentro de una plantilla con la sintaxis `valor | nombrePipe`. Angular trae pipes de serie (`| date`, `| uppercase`, `| number`…); aquí se ha creado uno propio llamado `t` (de *translate*).

En las plantillas se usa así:

```html
<!-- texto normal -->
<label>{{ 'controls.radius' | t }}</label>

<!-- texto que contiene HTML (p. ej. el tutorial) -->
<p [innerHTML]="'tutorial.step1Body' | t"></p>
```

El pipe recibe **una clave** (`'controls.radius'`) y devuelve **el texto traducido** al idioma activo. La clave no es el texto en español: es un identificador estable e independiente del idioma.

---

## 2. Cómo funciona por dentro, paso a paso

### 2.1. El pipe (`TranslatePipe`)

```ts
@Pipe({ name: 't', standalone: true, pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  transform(key: string): string {
    return this.i18n.translate(key);
  }
}
```

El pipe es deliberadamente **mínimo**: no guarda estado ni diccionarios. Lo único que hace es:
1. **Inyectar** el `I18nService` (inyección de dependencias de Angular con `inject()`).
2. En su método `transform(key)`, **delegar** la resolución en `i18n.translate(key)` y devolver el resultado.

Toda la lógica real vive en el servicio; el pipe es solo el "puente" entre la plantilla y el servicio.

### 2.2. La resolución de la clave (`I18nService.translate`)

```ts
translate(key: string): string {
  const value = key
    .split('.')                       // 'controls.radius' → ['controls', 'radius']
    .reduce<string | Dict | undefined>(
      (node, part) => (node && typeof node === 'object' ? node[part] : undefined),
      DICTS[this.lang()],             // arranca en el diccionario del idioma ACTIVO
    );
  return typeof value === 'string' ? value : key;  // si no es texto, devuelve la propia clave
}
```

Los diccionarios son **JSON anidados por componente**, por ejemplo `es.json`:

```json
{
  "controls": { "radius": "Radio", "play": "Reproducir" },
  "tutorial": { "step1Body": "Ajusta los parámetros…" }
}
```

El método:
1. Parte la clave por los puntos: `'controls.radius'` → `['controls', 'radius']`.
2. Toma como punto de partida `DICTS[this.lang()]`, es decir, **el diccionario del idioma activo** (lee la señal `lang()`).
3. Con `reduce`, va descendiendo por el objeto: primero `dict['controls']` (un subobjeto), luego `['radius']` (el texto).
4. Si al final obtiene una **cadena**, la devuelve traducida. Si la clave **no existe** (obtiene `undefined` o un subobjeto), devuelve **la propia clave** como aviso visible de que falta una traducción (no rompe la interfaz).

El punto clave es el paso 2: como `translate` lee `this.lang()` **en cada llamada**, siempre traduce contra el idioma vigente en ese momento.

### 2.3. El cambio de idioma

```ts
readonly lang = signal<Lang>(this.detectInitialLang());

setLang(lang: Lang): void {
  this.lang.set(lang);                       // 1) actualiza la señal reactiva
  localStorage.setItem(STORAGE_KEY, lang);   // 2) persiste la preferencia
  document.documentElement.lang = lang;      // 3) refleja el idioma en <html lang>
}
```

`lang` es una **señal** (`signal`). Cuando `setLang()` la cambia, Angular sabe que algo reactivo se ha modificado y programa un ciclo de detección de cambios.

---

## 3. La pieza clave: por qué el pipe es **impuro** (`pure: false`)

Por defecto, los pipes de Angular son **puros**: solo se reevalúan cuando **cambia su argumento de entrada** (aquí, la clave `'controls.radius'`). Pero la clave **nunca cambia** —siempre es la misma—; lo que cambia es el **idioma**. Si el pipe fuera puro, al cambiar de idioma los textos **no se actualizarían**, porque Angular no detectaría ningún cambio en el argumento.

Marcándolo **impuro** (`pure: false`), Angular lo reevalúa **en cada ciclo de detección de cambios**. Así, en cuanto el idioma cambia y se dispara un ciclo, todos los `| t` vuelven a llamar a `translate()`, que ahora lee el nuevo `lang()`, y la interfaz entera se retraduce **al instante, sin recargar la página**.

### ¿Por qué se dispara el ciclo siendo la app *zoneless*?

La aplicación es **zoneless** (sin Zone.js), así que no hay detección automática "mágica". Funciona porque `AppComponent` **lee la señal `lang()`** en su propia plantilla (para la etiqueta del idioma activo y resaltar la opción elegida). Cuando `setLang()` cambia la señal:
1. Angular marca `AppComponent` como "sucio" (depende de esa señal).
2. Programa un ciclo de detección de cambios.
3. Al refrescar el árbol (los componentes **no** son `OnPush`), **todos los pipes `t` impuros se reevalúan**.
4. Los textos se actualizan al momento.

Es decir, la señal es el disparador y el pipe impuro es lo que propaga la retraducción a toda la interfaz.

---

## 4. Por qué esta forma y no otra (justificación de diseño)

Se valoraron varias alternativas antes de optar por el **pipe impuro + servicio basado en signals**:

### Alternativa A — i18n nativo de Angular (`@angular/localize`)
- Funciona en **tiempo de compilación**: genera **un *build* distinto por idioma**.
- Cambiar de idioma obliga a **recargar o redirigir** a otra versión de la app.
- **Descartada** porque el requisito (RF14) pide un **selector instantáneo** que cambie el idioma en caliente, sin recargar. El enfoque compile-time es justo lo contrario.

### Alternativa B — Librerías de terceros (ngx-translate, Transloco)
- Ofrecen i18n en runtime, parecido a lo que se buscaba.
- **Descartada** por dos motivos: (1) el entorno de `npm` daba un problema de certificado (`UNABLE_TO_VERIFY_LEAF_SIGNATURE`) que hacía poco fiable instalar paquetes nuevos, y (2) añadir una dependencia externa pesada para algo que se resuelve en pocas líneas no compensaba.

### Alternativa C — Enlazar getters/métodos en la plantilla (`{{ traducir('clave') }}`)
- Llamar a un método del componente en cada texto.
- Es esencialmente lo que hace el pipe, pero **un pipe es más limpio y reutilizable**: se declara una vez (`| t`), no hay que repetir un método en cada componente, y deja claro en la plantilla que es una traducción.

### Opción elegida — pipe impuro `| t` + `I18nService` con signals
Reúne lo mejor para este proyecto:
- **Runtime + cambio instantáneo** sin recargar (cumple RF14 tal cual se pidió).
- **Sin dependencias externas** (evita el problema de `npm` y reduce el tamaño del bundle).
- **Diccionarios JSON importados directamente** (con `resolveJsonModule`), que van en el *bundle*: no hay petición HTTP ni parpadeo de carga del idioma.
- **Muy extensible**: añadir un idioma son 4 toques (crear `xx.json`, registrarlo en `DICTS`, añadir el código al tipo `Lang` y una entrada a `LANGUAGES`), sin tocar la interfaz.
- Para el TFG aporta además un **argumento técnico interesante**: comparar el i18n *compile-time* (Angular nativo) frente al *runtime* (esta solución).

---

## 5. Contrapartida (y por qué es asumible)

Un pipe impuro se ejecuta **muchas veces** (en cada ciclo de detección de cambios, por cada uso en plantilla), no solo cuando cambia su entrada. En una app con miles de textos podría ser un coste a vigilar.

Aquí es **perfectamente asumible** porque:
- `translate()` es una operación **muy barata**: un `split` y un `reduce` sobre un objeto pequeño en memoria.
- El número de textos visibles a la vez es reducido (un panel de control y, como mucho, un diálogo).
- No hay llamadas de red ni cálculos pesados dentro del pipe.

El beneficio (traducción instantánea de toda la interfaz, con un código mínimo y sin dependencias) compensa de sobra ese coste.

---

## 6. Resumen en una frase

> El `| t` es un **pipe impuro** que, por cada texto, pide al `I18nService` la traducción de una **clave** contra el **diccionario del idioma activo** (una señal); al ser impuro se reevalúa en cada ciclo de detección de cambios, de modo que cambiar la señal de idioma **retraduce toda la interfaz al instante y sin recargar**, sin necesidad de librerías externas ni de un *build* por idioma.
