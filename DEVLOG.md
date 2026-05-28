# Diario de desarrollo — Epicycloid Generator (TFG)

Registro cronológico de sesiones de trabajo y cambios relevantes del proyecto.

---

## 2026-05-28 (sesión 3) — Tutorial de bienvenida y botón de ayuda

### Cambios realizados

**Nuevo componente: `Tutorial` (`src/app/features/tutorial/`)**
- Popup modal que aparece automáticamente al cargar la página con cinco pasos de inicio rápido: modo de visualización, ajuste de órbitas, Play, parámetros avanzados y controles de lienzo.
- Opción "No volver a mostrar" con persistencia en `localStorage` (`epicycloid_tutorial_seen`).
- Se puede cerrar pulsando el botón "¡Empezar!" o haciendo clic fuera del card.
- Animaciones de entrada: fade-in en el overlay, slide-up en el card.

**Botón de ayuda `?`**
- Botón circular fijo en la esquina superior izquierda (`position: fixed`), siempre visible.
- Al pulsarlo vuelve a abrir el tutorial (resetea también el checkbox "No volver a mostrar").

**Integración en el app raíz**
- `app.ts`: importa `Tutorial` como standalone component.
- `app.html`: añade `<app-tutorial>` antes del layout principal.

### Estado al cierre de sesión
- Tutorial funcional con persistencia de preferencia de usuario.
- Pendiente: RF6 (guardar imagen), RF7 (presets), RF14 (variación aleatoria), re-implementación del bug de simulate con corrección de `ngZone`.

---

## 2026-05-28 — Refinamiento de UI, simulate N órbitas y documentación

### Cambios realizados

**Nueva funcionalidad: Simular por N órbitas**
- El usuario puede seleccionar una órbita de referencia (1 o 2) e indicar un número de vueltas (p. ej. `2.5`).
- La simulación corre exactamente esas vueltas y se detiene sola.
- Implementado en: `PatternService` (nuevos `SimulateConfig`, `startSimulate()`, `simulationFinished$`), `canvas.ts` (acumulador de ángulo por frame), `controls.ts` (nuevos campos y método `simulate()`), `controls.html` (bloque de UI).

**Refinamiento del panel de controles**
- Las secciones **Órbita 1**, **Órbita 2**, **Visual** y **Parámetros avanzados** son ahora colapsables (`<details>`).
- Los sliders se eliminaron de todos los parámetros salvo los ángulos (Fase inicial e Inclinación), donde sí aportan valor visual. El resto usa solo campos numéricos.

**Correcciones de bugs**
- Investigado y corregido el bug de interfaz bloqueada tras finalizar la simulación: la causa raíz era que p5.js corría dentro de la zona de Angular (Zone.js parcheaba su `requestAnimationFrame`), por lo que `ngZone.run()` era un no-op y Angular nunca detectaba el cambio de `isPlaying`. Solución: inicializar p5 con `ngZone.runOutsideAngular()`.
- La acción `pause` en el canvas ya no hace toggle de `isPaused` sino que lo pone a `true` de forma explícita. Reanudar siempre pasa por Play.

**Documentación actualizada**
- `README.md`: refleja la UI actual (colapsables, simulate, tabla de parámetros completa).
- `claude/overview.md`: estado real de implementación (hecho / pendiente).
- `claude/implementation-notes.md`: interfaz `PatternParams` real, convención RPM→rad/frame, patrón `runOutsideAngular`, contrato de estado Controls↔Canvas.
- `claude/feature-time-rewind.md` (**nuevo**): doc de diseño para la funcionalidad de retroceder en el tiempo (pendiente de implementar).

### Estado al cierre de sesión
- Funcionalidad base completa y funcional.
- Simulate N órbitas implementado; bug de desbloqueo de UI en investigación/corrección.
- Pendiente: RF6 (guardar imagen), RF7 (presets), RF14 (variación aleatoria).

---

## 2026-05-04 — Actualización del README

### Cambios realizados
- `README.md` actualizado con instrucciones de uso, guía de parámetros y sección de despliegue en Vercel.

---

## 2026-05-02 — Controles y canvas funcionales (`fc7cf0d`, `141613a`)

### Cambios realizados

**Canvas (`canvas.ts`)**
- Integración completa de p5.js en modo instancia dentro de `ngAfterViewInit`.
- Capa de trazado independiente (`p5.Graphics trail`) para acumular líneas sin borrar el fondo.
- Dos modos de visualización implementados:
  - **Intersección de líneas**: línea entre dos planetas independientes en cada frame.
  - **Curva epicicloidal**: planeta 2 orbita alrededor del extremo del planeta 1; se traza el punto final.
- Soporte de parámetros avanzados: factores elípticos X/Y, inclinación de órbita (rotación del plano).
- Canvas responsive (`p.windowResized`): redimensiona canvas y buffer trail al cambiar el tamaño de ventana.
- Acciones `play`, `pause`, `clear`, `reset` recibidas desde `PatternService`.

**Controles (`controls.ts` / `controls.html`)**
- Todos los parámetros de `PatternParams` enlazados con `[(ngModel)]`.
- Sección de parámetros avanzados colapsable (`<details>`).
- Botones Play / Pausa / Limpiar lienzo / Reset conectados al servicio.
- Bloqueo de controles durante la simulación (`params-locked`).

**Modelo de datos (`pattern-params.model.ts`)**
- Interfaz `PatternParams` completa: radios, velocidades RPM, ángulos iniciales, factores elípticos, inclinación, color, alpha, grosor, intervalo de líneas, modo de visualización.

**Servicio (`pattern.service.ts`)**
- `BehaviorSubject<PatternParams>` para el estado de parámetros.
- `Subject<CanvasAction>` para comandos puntuales (play, pause, clear, reset).

### Estado al cierre de sesión
- Generador funcional con ambos modos. Parámetros completamente enlazados.

---

## 2026-04-26 — Setup inicial del proyecto (`93007af`)

### Cambios realizados
- Proyecto Angular 21 creado con Angular CLI.
- Estructura de carpetas: `core/`, `features/canvas/`, `features/controls/`, `features/presets/`, `models/`.
- Componentes raíz con layout Bootstrap: canvas a la izquierda (col-8), controles a la derecha (col-4).
- Dependencias instaladas: p5.js 2.2.3, Bootstrap 5.3, Vitest.
- Configuración de Vitest para tests unitarios en entorno jsdom.
- Carpeta `claude/` con documentación de contexto inicial para el asistente IA.

### Estado al cierre de sesión
- Scaffolding completo. Canvas y controles como placeholders sin funcionalidad.

---

_Este archivo se actualiza al final de cada sesión de trabajo._
