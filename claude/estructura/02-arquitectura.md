# 02 — Arquitectura

## Estructura de carpetas

```
src/
├── index.html              Documento HTML raíz; carga Font Awesome y <app-root>
├── main.ts                 Arranque (bootstrapApplication)
├── styles.css              Estilos globales (importa Bootstrap; layout; selector de idioma)
└── app/
    ├── app.ts              AppComponent (componente raíz)
    ├── app.html            Plantilla raíz: tutorial, selector de idioma, layout 70/30
    ├── app.config.ts       Proveedores de la aplicación
    ├── app.routes.ts       Rutas (vacío: app de página única)
    ├── core/
    │   ├── pattern.service.ts   PatternService — el "cerebro" del estado
    │   ├── pattern.ts           Pattern — clase vacía (scaffold sin usar)
    │   └── i18n/
    │       ├── i18n.service.ts  I18nService — idioma activo, detección, persistencia
    │       ├── translate.pipe.ts  TranslatePipe — pipe `| t`
    │       └── es/ca/en/id/cs.json   Diccionarios de traducción (5 idiomas)
    ├── models/
    │   └── pattern-params.model.ts   Interfaces del modelo de datos
    └── features/
        ├── canvas/         Canvas — el lienzo p5.js
        ├── controls/       Controls — panel de parámetros y acciones
        ├── export-modal/   ExportModal — diálogo de exportación de imagen
        ├── tutorial/       Tutorial — guía de bienvenida
        └── presets/        presets.ts — catálogo de ejemplos (RF7, módulo de datos)
```

Esta organización **por *features*** (cada componente en su carpeta con `.ts`/`.html`/`.css`) más un **`core`** para servicios y un **`models`** para tipos responde a **RNF6** (modularidad, mantenibilidad, escalabilidad).

## Arranque de la aplicación

1. [src/main.ts](src/main.ts): `bootstrapApplication(AppComponent, appConfig)`.
2. [src/app/app.config.ts](src/app/app.config.ts): registra los proveedores globales — `provideBrowserGlobalErrorListeners()` y `provideRouter(routes)`. **No registra `zone.js` ni detección de cambios basada en zona** → la app es **zoneless**.
3. [src/app/app.routes.ts](src/app/app.routes.ts): `routes = []`. No hay navegación entre pantallas; toda la app es **una sola vista** (coherente con el carácter de página única).

## Árbol de componentes

```
AppComponent (app-root)
├── Tutorial         (app-tutorial)      guía de inicio, overlay
├── (selector de idioma)                 botón desplegable en app.html
└── .app-layout
    ├── Canvas       (app-canvas)        70% — lienzo p5.js
    └── Controls     (app-controls)      30% — panel de control
        └── ExportModal (app-export-modal)  se crea bajo demanda (showExportModal)
```

- **`AppComponent`** ([app.ts](src/app/app.ts)): contiene `Canvas`, `Controls` y `Tutorial`; inyecta `I18nService` y gestiona el selector de idioma (`langMenuOpen`, `selectLang()`, `currentLanguageLabel`).
- **`Canvas`** ([canvas.ts](src/app/features/canvas/canvas.ts)): crea y gobierna la instancia de p5.js; ejecuta el bucle de dibujo, el zoom y la respuesta a acciones. Es el único que "habla" con p5.
- **`Controls`** ([controls.ts](src/app/features/controls/controls.ts)): todos los controles de parámetros (vía `[(ngModel)]`) y los botones de acción. Crea `ExportModal` cuando se exporta una imagen.
- **`ExportModal`** ([export-modal.ts](src/app/features/export-modal/export-modal.ts)): diálogo con previsualización y opciones de exportación a PNG.
- **`Tutorial`** ([tutorial.ts](src/app/features/tutorial/tutorial.ts)): guía mostrada en el primer acceso (persiste "no volver a mostrar" en `localStorage`).

## Servicios (estado compartido)

- **`PatternService`** ([pattern.service.ts](src/app/core/pattern.service.ts)) — `providedIn: 'root'`, instancia única. Es el **punto central de comunicación y estado**: parámetros activos, historial de líneas, sesiones de animación y los canales de eventos. Detalle en [04 — Flujo de datos](04-flujo-ejecucion-y-datos.md) y [05 — Renderizado](05-renderizado-rendimiento.md).
- **`I18nService`** ([i18n.service.ts](src/app/core/i18n/i18n.service.ts)) — idioma activo (señal), detección del navegador y persistencia. Detalle en [07 — i18n](07-i18n.md).

¿Por qué servicios y no comunicación directa entre componentes? Porque `Canvas` y `Controls` son **hermanos** (no padre-hijo), y un servicio compartido los desacopla: ninguno conoce al otro, ambos dependen del servicio (RNF6).

## Modelo de datos

[pattern-params.model.ts](src/app/models/pattern-params.model.ts) define las interfaces (solo tipos, sin lógica):

- **`PatternParams`** — todos los parámetros de una composición: radios, factores elípticos (X/Y) e inclinación de cada órbita, velocidades en RPM, fases iniciales, color/opacidad/grosor de línea, intervalo entre líneas y modo de visualización.
- **`SimulationSession`** — un bloque de animación (entre play y pausa): sus parámetros, número de fotogramas, duración y el estado final (ángulos y punto extremo) para poder continuar o reconstruir.
- **`LineRecord`** — un segmento dibujado: coordenadas `(x1,y1)–(x2,y2)`, color `r,g,b,a` y grosor `sw`.
- **`ExportOptions`** — opciones del diálogo de exportación: color de fondo, mostrar guías, mostrar punto central.
- **`VisualizationMode`** — `'curve' | 'lines'`.

## Nota sobre archivos "scaffold"

- [pattern.ts](src/app/core/pattern.ts) (`class Pattern {}`) está **vacío**: es andamiaje generado que no se usa (no confundir con `pattern.service.ts`, que es el servicio real).
- [presets.ts](src/app/features/presets/presets.ts) **sí está implementado**, pero no como componente: es un **módulo de datos** que exporta la interfaz `PatternPreset` y el catálogo `PATTERN_PRESETS` (RF7). `Controls` lo importa para poblar el desplegable de ejemplos. Detalle en [18 — Presets](18-presets.md).
