# 20 — Configuración, build y despliegue

Todo lo que rodea al código: arranque, proveedores, configuración del compilador, dependencias, build y despliegue. Cubre RNF2, RNF12 y el contexto de la integración *zoneless*.

---

## Arranque de la aplicación

1. **[index.html](src/index.html)** — documento raíz. Define `<app-root>`, fija `<base href="/">` y carga **Font Awesome 6.7.2** por CDN (iconos del zoom). Nota: el `<title>` es "EpicycloidGenerator" y `<html lang="en">` (el `lang` real lo sobrescribe `I18nService` en tiempo de ejecución).
2. **[main.ts](src/main.ts)** — `bootstrapApplication(AppComponent, appConfig)`. Arranque *standalone* (sin `NgModule` raíz).
3. **[app.config.ts](src/app/app.config.ts)** — proveedores globales:
   - `provideBrowserGlobalErrorListeners()` — captura errores globales del navegador.
   - `provideRouter(routes)` — registra el router (con rutas vacías).
   - **No registra `provideZoneChangeDetection` ni `zone.js`** → la app es **zoneless**. Esta ausencia es la decisión clave de rendimiento (ver [04](04-flujo-ejecucion-y-datos.md) y [05](05-renderizado-rendimiento.md)).
4. **[app.routes.ts](src/app/app.routes.ts)** — `routes: Routes = []`. No hay navegación: aplicación de **página única** con una sola vista.

---

## Configuración de TypeScript

- **[tsconfig.json](tsconfig.json)** — base del proyecto.
- **[tsconfig.app.json](tsconfig.app.json)** — config de la app. Detalle relevante: **`"resolveJsonModule": true`** ([tsconfig.app.json:8](tsconfig.app.json#L8)), que permite **importar los diccionarios JSON directamente** (`import es from './es.json'`) en [i18n.service.ts](src/app/core/i18n/i18n.service.ts). Por eso las traducciones van en el *bundle* y no requieren petición HTTP (ver [07](07-i18n.md)). Excluye los `*.spec.ts`.
- **[tsconfig.spec.json](tsconfig.spec.json)** — config de las pruebas ([19](19-pruebas-testing.md)).

---

## Configuración de Angular ([angular.json](angular.json))

- **Builder de build:** `@angular/build:application` ([angular.json:17](angular.json#L17)) — el builder moderno basé en esbuild.
  - `browser: src/main.ts`, `tsConfig: tsconfig.app.json`, estilos globales `src/styles.css`, *assets* desde `public/`.
  - **Presupuestos de producción:** aviso a 2 MB / error a 5 MB para el bundle inicial; 4 kB/8 kB por estilo de componente ([angular.json:33-44](angular.json#L33-L44)). `outputHashing: all`.
  - **Development:** sin optimización, con *source maps*.
- **Serve:** `@angular/build:dev-server` (por defecto, configuración `development`).
- **Test:** `@angular/build:unit-test` (Vitest, ver [19](19-pruebas-testing.md)).

---

## Dependencias ([package.json](package.json))

**Producción:**
| Paquete | Versión | Para qué |
|---|---|---|
| `@angular/*` (common, compiler, core, forms, platform-browser, router) | ^21.1.0 | Framework (RNF2). `forms` aporta `[(ngModel)]`. |
| `p5` | ^2.2.3 | Renderizado gráfico (RNF3). |
| `bootstrap` | ^5.3.8 | Estilos base y layout (RNF9). |
| `rxjs` | ~7.8.0 | Observables (`params$`/`action$`). |
| `tslib` | ^2.3.0 | Helpers de TypeScript. |

**Desarrollo:** `@angular/build` + `@angular/cli` (^21.1.x), `@angular/compiler-cli`, `typescript` ~5.9.2, `vitest` ^4.0.8 y `jsdom` ^27.1.0.

**Scripts:** `start` (`ng serve`), `build` (`ng build`), `watch` (build incremental dev), `test` (`ng test`). Gestor: `npm@11.10.0`.

**Formato:** configuración de **Prettier** embebida ([package.json:11-22](package.json#L11-L22)): `printWidth: 100`, `singleQuote: true`, parser `angular` para HTML.

---

## Estilos globales

- **[styles.css](src/styles.css)** — importa `bootstrap.min.css`, define el layout `.app-layout` (flex 70/30) y los estilos del selector de idioma (`.lang-switch`/`.lang-menu`). Ver [08 — Interfaz](08-interfaz-diseno.md).
- Cada componente tiene además su `.css` local (`canvas.css`, `controls.css`, `export-modal.css`, `tutorial.css`).

---

## Despliegue (RNF12)

- **[netlify.toml](netlify.toml):**
  ```toml
  [build]
    command = "npm run build"
    publish = "dist/epicycloid-generator/browser"
  ```
  Netlify ejecuta el build de Angular y publica la carpeta de salida estática (`dist/epicycloid-generator/browser`).
- **Por qué Netlify / hosting estático:** al ser una SPA **sin backend ni base de datos**, el despliegue se reduce a servir archivos estáticos. Esto elimina costes e infraestructura de servidor (ver [12 — Decisiones técnicas](12-decisiones-tecnicas.md)).
- **Estado:** configurado; **pendiente de confirmar la publicación pública** (ver [09 — Trazabilidad](09-trazabilidad-rf-rnf.md)).

---

## Resumen del pipeline

```
código TS/HTML/CSS + JSON i18n
   → ng build (@angular/build, esbuild)        # bundla, incluye los JSON (resolveJsonModule)
      → dist/epicycloid-generator/browser/      # estáticos
         → Netlify publica esa carpeta          # URL pública (RNF12)
```
