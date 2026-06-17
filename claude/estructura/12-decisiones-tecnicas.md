# 12 — Decisiones técnicas y alternativas descartadas

Cada decisión relevante del proyecto, **qué se eligió, qué se descartó y por qué**. Es el material para responder las preguntas de tipo «¿por qué X y no Y?».

## 1. Framework: Angular (vs React / Vue / vanilla JS)

- **Elegido:** Angular 21 (standalone, zoneless).
- **Por qué:** es un **requisito no funcional** del proyecto (**RNF2**). Además aporta una estructura clara (componentes + servicios + DI), tipado fuerte con TypeScript y un modelo de reactividad maduro (señales + RxJS), adecuado para una app de parámetros en tiempo real.
- **Descartado:** React/Vue (no cumplen RNF2); vanilla JS (perdería estructura, tipado y mantenibilidad — RNF6/RNF7).

## 2. Motor gráfico: p5.js (vs Canvas API directa / SVG / WebGL)

- **Elegido:** p5.js 2.2.3 en **modo *instance*** (**RNF3**).
- **Por qué:** p5 ofrece una API sencilla y expresiva sobre `<canvas>` 2D, con su propio bucle de render (`draw()` a 60 fps), ideal para arte generativo. El **modo instance** (en vez del global) evita contaminar el espacio global y permite integrarlo limpiamente dentro de un componente Angular.
- **Descartado:**
  - **SVG:** se degrada con miles de elementos (cada línea sería un nodo del DOM) → mal rendimiento.
  - **WebGL:** potencia excesiva para gráficos 2D de líneas; mayor complejidad sin necesidad.
  - **Canvas API "a pelo":** viable, pero p5 ya resuelve el bucle, el redimensionado y utilidades; reescribirlo no aporta valor.

## 3. Detección de cambios: *zoneless* (vs Zone.js, vs `runOutsideAngular`)

- **Elegido:** app **sin Zone.js** (zoneless). La detección de cambios se dispara por eventos de plantilla y por señales.
- **Por qué:** el bucle de p5 usa `requestAnimationFrame` 60 veces por segundo. Con Zone.js, cada fotograma dispararía un ciclo de detección de cambios **inútil** (el lienzo lo gestiona p5, no Angular), degradando el rendimiento. Sin Zone.js, el dibujo corre por su cuenta y Angular solo trabaja ante acciones reales → **RNF5** y **RNF8**.
- **Evolución (honestidad técnica):** una versión inicial mantenía Zone.js y aislaba p5 con `ngZone.runOutsideAngular()`. Se **sustituyó** por el modelo zoneless, que logra lo mismo de forma más limpia y elimina toda la complejidad de `NgZone`. *(Por eso algunos docs antiguos del repo mencionan `runOutsideAngular`: están obsoletos.)* Ver [10](10-ciclo-de-vida-angular.md).

## 4. Internacionalización: sistema propio con señales (vs @angular/localize / ngx-translate / Transloco)

- **Elegido:** un i18n **propio en tiempo de ejecución**, con diccionarios JSON y una **señal** para el idioma activo (ver [07](07-i18n.md)).
- **Por qué:**
  - **@angular/localize** compila **un build por idioma** y **no permite cambiar de idioma en caliente** (habría que recargar) → no encaja con la UX deseada.
  - **Librerías de terceros** (ngx-translate, Transloco): el entorno de `npm` tenía un problema de **certificado SSL** que hacía poco fiable instalar paquetes, y Angular 21 era muy reciente.
  - La solución propia es **ligera, sin dependencias**, permite **cambio instantáneo** (RF14) y es trivialmente **extensible** (añadir un idioma = crear un JSON y registrarlo).

## 5. Renderizado de la estela: capa *offscreen* incremental (vs repintar todo el historial)

- **Elegido:** una **capa `p5.Graphics` fuera de pantalla** que acumula las líneas; cada fotograma pinta **solo los segmentos nuevos** (coste **O(1)** por fotograma). Ver [05](05-renderizado-rendimiento.md).
- **Por qué:** repintar las **N** líneas del historial en cada fotograma es **O(N)** y congela la animación cuando hay miles. La capa incremental mantiene la fluidez sin importar cuántas líneas se acumulen → **RNF5/RNF8**.
- **Detalle:** las líneas se guardan como **vectores** (`LineRecord`) y se **rerasterizan** al nivel de zoom actual, de modo que el zoom no pierde nitidez.

## 6. Modelo de estado: `lineHistory` + `sessions` (vectores) (vs un único bitmap)

- **Elegido:** el estado del dibujo se guarda como datos: `lineHistory: LineRecord[]` (segmentos) y `sessions: SimulationSession[]` (bloques de animación). Ver [04](04-flujo-ejecucion-y-datos.md).
- **Por qué:** tener los datos (no solo píxeles) permite **deshacer por sesiones** (RF5), **exportar/importar** el patrón como secuencia reproducible (RF6/RF7) y **rerasterizar** al hacer zoom. Un único bitmap impediría todo eso.
- **Invariante:** estando en pausa, `lineHistory` equivale al *replay* de `sessions[]` con `replaySessionsToLines()`.

## 7. Estilos: Bootstrap 5 (vs Angular Material / CSS propio)

- **Elegido:** Bootstrap 5 + CSS propio puntual.
- **Por qué:** sistema de rejilla responsivo y componentes listos (**RNF9**) con poco esfuerzo, coherente y sin imponer un *look* tan marcado como Material. El tema oscuro y la codificación cromática (azul/rojo por órbita) se ajustan con CSS propio (ver [08](08-interfaz-diseno.md)).

## 8. Pruebas: Vitest (vs Karma/Jasmine)

- **Elegido:** Vitest 4 (con jsdom).
- **Por qué:** ejecutor de pruebas moderno y rápido, integrado con el nuevo sistema de build de Angular (`@angular/build:unit-test`). Karma está en desuso.

## 9. Despliegue: Netlify (RNF12)

- **Elegido:** Netlify (`netlify.toml` con `build` y `publish` apuntando a `dist/epicycloid-generator/browser`).
- **Por qué:** hosting estático sencillo para una SPA, con build automático desde el repositorio. (Estado: configurado; pendiente confirmar publicación.)

## Resumen para la defensa

> Cada decisión responde a un requisito o a una restricción real: **Angular** por RNF2; **p5.js** por RNF3 y por ser idóneo para arte generativo 2D; **zoneless** y la **capa incremental** por rendimiento (RNF5/RNF8); el **i18n propio** por permitir cambio en caliente sin dependencias problemáticas; y el **modelo de datos vectorial** por habilitar deshacer, exportar e importar.
