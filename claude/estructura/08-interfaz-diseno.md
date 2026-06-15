# 08 — Interfaz y diseño (RNF4, RNF9, RNF10)

## Disposición general

Una **sola vista** dividida en dos zonas (layout flex en [styles.css](src/styles.css), `.app-layout`):

- **Lienzo** (`.app-canvas-panel`, ~70 %) a la izquierda — fondo muy oscuro (`#0a0a14`).
- **Panel de control** (`.app-controls-panel`, ~30 %) a la derecha — fondo oscuro, *scroll* vertical.

Plantilla raíz en [app.html](src/app/app.html): el `Tutorial` (overlay), el **selector de idioma** (fijo arriba a la izquierda, junto al botón de ayuda) y el `.app-layout` con `Canvas` y `Controls`.

**Por qué una sola vista (RNF4):** parámetros y resultado conviven sin cambiar de pantalla, lo que refuerza la **edición en tiempo real** y minimiza pasos. No hay enrutado (`routes = []`).

## Tema oscuro y paleta

- Fondo oscuro/neutro que **realza los trazos luminosos** del patrón y reduce la fatiga visual.
- **Codificación cromática semántica**: azul (`#6090cc`) = órbita 1, rojo (`#cc6060`) = órbita 2, coherente entre los controles del panel, las guías del lienzo y los planetas. Así el usuario asocia cada control con su elemento de un vistazo.
- Botones de acción con color semántico (verde = Play, ámbar = Pausa, rojo = Reset, etc.) vía clases de Bootstrap.

## Tipografía y estilos

- Fuente **sans-serif del sistema** (vía Bootstrap; no hay fuente personalizada). Iconos de Font Awesome (cargado en [index.html](src/index.html)) para el zoom.
- **Bootstrap 5** ([styles.css](src/styles.css) importa `bootstrap.min.css`) aporta la base de botones, *grid* y utilidades, garantizando consistencia visual con poco CSS propio.
- Cada componente tiene su `.css` (p. ej. [tutorial.css](src/app/features/tutorial/tutorial.css), `controls.css`, `export-modal.css`) para estilos locales.

## Controles (RF9, RF10)

- Patrón uniforme por parámetro: **etiqueta + (slider y/o campo numérico)**. Sliders en fases e inclinación; campos numéricos en el resto; selector de color nativo.
- Agrupación en secciones plegables (`<details>`): **Órbita 1**, **Órbita 2**, **Visual** y **Parámetros avanzados** (recogidos por defecto), ordenadas de lo general a lo avanzado.
- Acciones siempre accesibles abajo: Aleatorizar, Play/Pausa, Deshacer última sesión, Reset, Exportar imagen, Exportar/Importar patrón.

## Bloqueo durante la animación

Mientras se reproduce, los controles de parámetros se **deshabilitan** (clase `params-locked`) y se muestra un aviso ("Simulación en curso — pausa para editar"). **Por qué:** evita estados inconsistentes (editar parámetros a mitad de una sesión); para editar hay que pausar. Refuerza RNF4 y la coherencia del modelo de sesiones.

## Validación de entradas (RNF10)

`clampParams()` ([controls.ts](src/app/features/controls/controls.ts)) corrige al confirmar la edición (`(change)`) cualquier valor fuera de rango o `NaN`, ajustándolo al `min`/`max` de `PARAM_RANGES`. Se hace en `(change)` y no en cada pulsación para no impedir la escritura. La importación de JSON inválido también se descarta de forma controlada.

## Accesibilidad y responsividad (RNF9)

- Layout responsivo (Bootstrap + flex); el lienzo se redimensiona con la ventana (`windowResized`).
- Contraste alto texto/fondo; etiquetas claras; `document.documentElement.lang` refleja el idioma activo.
- Tutorial de bienvenida para usuarios noveles; selector de idioma siempre visible.
- Controles de zoom sobre el lienzo, en una esquina, accesibles sin tapar la composición.

## Compatibilidad (RNF1, RNF11)

El stack usa APIs web estándar (Canvas 2D, ES2022), compatibles con Chrome, Firefox, Edge y Opera modernos. *(Pendiente de verificación manual cruzada en cada navegador.)*
