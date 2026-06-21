# 19 — Pruebas (testing)

Estado real de las pruebas automatizadas del proyecto (RNF7). Documentado con honestidad: el grueso de los *specs* es **andamiaje por defecto** del CLI y parte está **desactualizado**.

---

## Infraestructura de pruebas

- **Runner:** **Vitest 4** (`vitest` en `devDependencies` de [package.json](package.json#L43)), con **jsdom** ([package.json](package.json#L41)) como entorno DOM.
- **Builder de test:** `@angular/build:unit-test` ([angular.json:67-69](angular.json#L67-L69)).
- **Comando:** `npm test` → `ng test` ([package.json:9](package.json#L9)).
- **Config TS de specs:** [tsconfig.spec.json](tsconfig.spec.json).

---

## Specs existentes y su estado

| Archivo | Qué prueba | Estado |
|---|---|---|
| [app.spec.ts](src/app/app.spec.ts) | Crear la app y renderizar un `<h1>` con "Hello, epicycloid-generator" | ⚠️ **Roto/desactualizado** |
| [canvas.spec.ts](src/app/features/canvas/canvas.spec.ts) | `should create` el componente `Canvas` | Andamiaje por defecto |
| [controls.spec.ts](src/app/features/controls/controls.spec.ts) | `should create` el componente `Controls` | Andamiaje por defecto |
| [pattern.spec.ts](src/app/core/pattern.spec.ts) | `should be created` el scaffold `Pattern` | Andamiaje sobre clase vacía |

### Por qué `app.spec.ts` está roto
[app.spec.ts](src/app/app.spec.ts) importa `App` desde `'./app'`, pero el archivo [app.ts](src/app/app.ts) exporta la clase como **`AppComponent`**, no `App`. Además comprueba un `<h1>` con el texto "Hello, epicycloid-generator" que **ya no existe** en [app.html](src/app/app.html) (la plantilla real es el layout 70/30 con el selector de idioma). Ambas cosas hacen que ese spec **falle**. Es un resto del andamiaje inicial de `ng new` que no se actualizó al renombrar el componente y reescribir la plantilla.

### `pattern.spec.ts` prueba una clase vacía
Apunta al scaffold [pattern.ts](src/app/core/pattern.ts) (`class Pattern {}`), no al servicio real `PatternService` ([pattern.service.ts](src/app/core/pattern.service.ts)). No aporta valor real.

---

## Lectura crítica (para la memoria/tribunal)

La cobertura de pruebas **automáticas** es mínima y parte está obsoleta: los *specs* son los que genera el CLI por defecto ("should create") más uno roto. La verificación del proyecto se ha apoyado sobre todo en **pruebas funcionales y manuales** (capítulo de Pruebas de la memoria) y en la naturaleza **determinista** del modelo (un patrón se reconstruye idéntico, lo que valida indirectamente la matemática y la E/S JSON).

### Pendientes / mejoras recomendadas
1. **Arreglar `app.spec.ts`**: importar `AppComponent` y comprobar elementos que sí existen (p. ej. que se renderiza `app-canvas` y `app-controls`, o el botón del selector de idioma).
2. **Eliminar o reorientar `pattern.spec.ts`** hacia `PatternService` (probar `replaySessionsToLines`, `removeLastSession`, el ciclo de sesiones).
3. **Pruebas unitarias de la matemática** (alto valor, fácil): comparar la salida de `replaySessionsToLines()` con valores conocidos; verificar la invariante `lineHistory == replay(sessions)`.
4. **Pruebas de validación**: `clampParams()` y `randInRange()` (que siempre devuelven valores dentro de rango y alineados al `step`).
5. **Pruebas del i18n**: `translate()` resuelve claves anidadas y devuelve la clave si falta; `detectInitialLang()` con distintas preferencias.

> Estas pruebas serían además buenos candidatos para ilustrar el capítulo de Pruebas de la memoria, ya que ejercen la lógica pura (sin DOM ni p5).
