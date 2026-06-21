# 18 — Ejemplos predefinidos / Presets (RF7)

Cómo se implementa RF7 ("almacenar configuraciones de parámetros predefinidas y recuperarlas"). Archivo: [presets.ts](src/app/features/presets/presets.ts). Integración en [controls.ts](src/app/features/controls/controls.ts) y [controls.html](src/app/features/controls/controls.html).

> **Aclaración importante:** `features/presets/` **no es un componente Angular**, sino un **módulo de datos** (un `.ts` que solo exporta una interfaz y un array de constantes). Documentación anterior lo describía como "placeholder vacío"; eso ya no es cierto.

---

## Qué es un preset aquí

RF7 se ha resuelto como un **catálogo de ejemplos curados integrados**: un desplegable con configuraciones de parámetros **con nombre** que el usuario aplica con un clic para explorar la herramienta. No son presets de usuario persistidos en `localStorage`; esa faceta la cubre la **exportación/importación de patrones en JSON** (ver [15](15-referencia-componentes.md), `exportJson`/`onFileSelected`). Juntos cumplen "guardar y recuperar configuraciones".

---

## La interfaz `PatternPreset` ([presets.ts:11-16](src/app/features/presets/presets.ts#L11-L16))

```ts
export interface PatternPreset {
  id: string;                  // identificador estable; valor del <select> y clave i18n del nombre
  params: Partial<PatternParams>;  // solo los valores que difieren de DEFAULT_PARAMS
}
```

Dos decisiones de diseño:
1. **`params` es `Partial`**: un preset solo declara lo que cambia respecto a `DEFAULT_PARAMS`. Al aplicarlo se fusiona sobre los valores por defecto, de modo que cada ejemplo deja el panel en un estado **completo y reproducible** sin tener que repetir los 17 campos.
2. **El nombre visible no está en el dato**: se traduce con la clave i18n `controls.presets.<id>` (ver los JSON en [src/app/core/i18n/](src/app/core/i18n/)). Así los ejemplos también son multilingües (RF14).

---

## El catálogo `PATTERN_PRESETS` ([presets.ts:24-111](src/app/features/presets/presets.ts#L24-L111))

Seis ejemplos integrados. El desplegable arranca **vacío** (lienzo en blanco con los valores por defecto); estos son las opciones seleccionables:

| `id` | Modo | Rasgo distintivo |
|---|---|---|
| `fiveRose` | lines | Rosa de 5 pétalos (relación de velocidades 7:2). |
| `eightStar` | lines | Estrella de 8 puntas (9:1). |
| `epiFlower` | curve | Flor epicicloide (3:17). |
| `ellipticMandala` | lines | Mandala con órbitas elípticas e inclinadas. |
| `hypnoticSpiral` | curve | Espiral por velocidades casi iguales (5:5.3). |
| `crown` | lines | "Corona": elipses extremas, fases y opacidad muy baja. |

Cada entrada fija solo los campos relevantes (modo, radios, velocidades, color, alfa y, en algunos, factores elípticos/inclinación/fases). Por ejemplo, `ellipticMandala` ([presets.ts:61-77](src/app/features/presets/presets.ts#L61-L77)) usa factores elípticos distintos por eje e inclinación de 30° para romper la simetría circular.

---

## Cómo se integra en el panel

### En `Controls`
- `presets = PATTERN_PRESETS` ([controls.ts:50](src/app/features/controls/controls.ts#L50)) y `selectedPresetId = ''` ([controls.ts:52](src/app/features/controls/controls.ts#L52)).
- **`applyPreset()`** ([controls.ts:63-69](src/app/features/controls/controls.ts#L63-L69)):
  ```ts
  const preset = this.presets.find((p) => p.id === this.selectedPresetId);
  this.params = preset ? { ...DEFAULT_PARAMS, ...preset.params } : { ...DEFAULT_PARAMS };
  this.patternService.updateParams({ ...this.params });
  ```
  Si hay preset, fusiona sobre los valores por defecto; si la opción es vacía, restablece los valores por defecto. Emite los parámetros para que el lienzo se actualice al instante.

### En la plantilla ([controls.html](src/app/features/controls/controls.html))
```html
<select [(ngModel)]="selectedPresetId" (ngModelChange)="applyPreset()">
  <option value="">{{ 'controls.examplesNone' | t }}</option>
  @for (preset of presets; track preset.id) {
    <option [value]="preset.id">{{ ('controls.presets.' + preset.id) | t }}</option>
  }
</select>
```
Las opciones se generan dinámicamente con `@for` a partir del catálogo, y el nombre se traduce con una **clave dinámica** (`'controls.presets.' + preset.id`).

### Sincronización del selector
El `selectedPresetId` vuelve a `''` en cuanto el usuario **deja de estar en un ejemplo puro**: en `onParamChange()` ([controls.ts:59](src/app/features/controls/controls.ts#L59)), `randomize()` ([controls.ts:124](src/app/features/controls/controls.ts#L124)), `reset()` ([controls.ts:102](src/app/features/controls/controls.ts#L102)) y `onFileSelected()` ([controls.ts:217](src/app/features/controls/controls.ts#L217)). Así el desplegable refleja con honestidad si lo que se ve sigue siendo el ejemplo elegido o ya es una configuración modificada.

---

## Cómo añadir un ejemplo nuevo

1. Añadir una entrada `{ id: 'miEjemplo', params: { ... } }` a `PATTERN_PRESETS` ([presets.ts](src/app/features/presets/presets.ts)) con solo los campos que difieran de `DEFAULT_PARAMS`.
2. Añadir la traducción del nombre bajo `controls.presets.miEjemplo` en **cada** JSON de idioma ([es.json](src/app/core/i18n/es.json), [ca.json](src/app/core/i18n/ca.json), [en.json](src/app/core/i18n/en.json), [id.json](src/app/core/i18n/id.json), [cs.json](src/app/core/i18n/cs.json)).

No hay que tocar el HTML ni la lógica: el `@for` y `applyPreset()` lo recogen automáticamente.
