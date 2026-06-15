# 01 — Visión general

## Qué es

*Epicycloid Generator* es una **aplicación web** que genera composiciones visuales de **arte generativo** a partir de **patrones orbitales** (epicicloides). El usuario controla en tiempo real los parámetros matemáticos y visuales de dos órbitas, y la aplicación dibuja el resultado de forma animada en un lienzo.

Es una herramienta **interactiva, de página única, que se ejecuta íntegramente en el navegador**: no hay registro, ni backend, ni base de datos, ni conexión a servicios externos. Todo el estado vive en memoria durante la sesión del usuario.

## Doble objetivo del TFG

1. **Formativo:** aprender el framework **Angular** (arquitectura por componentes, TypeScript, ciclo de vida, organización modular).
2. **Práctico:** construir una herramienta real de arte generativo y, en particular, **integrar la librería gráfica p5.js dentro de Angular**, resolviendo la sincronización entre la lógica de la aplicación y el renderizado gráfico.

## Stack tecnológico y por qué

| Tecnología | Para qué | Requisito |
|---|---|---|
| **Angular 21** (standalone) | Framework estructural; componentes, enlace de datos, inyección de dependencias | **RNF2** |
| **p5.js 2.2.3** | Renderizado gráfico en tiempo real sobre `<canvas>` | **RNF3** |
| **TypeScript** | Tipado estático, mantenibilidad | RNF6, RNF7 |
| **RxJS** | Comunicación reactiva entre componentes (observables) | RNF6 |
| **Bootstrap 5** | Estilos base y layout responsivo | RNF9 |
| **Vitest** | Pruebas unitarias | RNF7 |
| **Netlify** | Despliegue en la nube | RNF12 |

**Detalle importante: la aplicación es _zoneless_** (no incluye `zone.js`). Esto no es un accidente: al no tener Zone.js, el bucle de render de p5.js (que usa `requestAnimationFrame` a 60 fps) **no dispara la detección de cambios de Angular en cada fotograma**, lo que es clave para el rendimiento (**RNF5**, **RNF8**). Véase [04 — Flujo de ejecución](04-flujo-ejecucion-y-datos.md).

## Mapa rápido de requisitos

**Funcionales (RF1–RF14):** generación de patrones (RF1), edición de parámetros en tiempo real (RF2), redibujado dinámico sin recargar (RF3), play/pausa/reinicio (RF4), limpiar/deshacer (RF5), exportar imagen (RF6), presets (RF7 — *no implementado*), alternar modos (RF8), controles interactivos (RF9), mostrar valores actuales (RF10), lienzo responsivo (RF11), variaciones aleatorias (RF12), restablecer (RF13), multilingüe (RF14).

**No funcionales (RNF1–RNF12):** navegadores modernos (RNF1), Angular (RNF2), p5.js integrado (RNF3), UI intuitiva (RNF4), rendimiento fluido (RNF5), arquitectura modular (RNF6), código documentado (RNF7), bajo consumo de CPU (RNF8), responsive (RNF9), gestión de errores/validación (RNF10), compatibilidad de navegadores (RNF11), despliegue en Netlify (RNF12).

La trazabilidad detallada (qué archivo/función implementa cada requisito) está en [09 — Trazabilidad](09-trazabilidad-rf-rnf.md).

## Estado del proyecto

- **Completo:** prácticamente todo. RF1–RF6, RF8–RF14 implementados.
- **Pendiente real:** **RF7 (presets con nombre)** — el componente `Presets` es un placeholder vacío sin ruta. **RNF12 (Netlify)** — configurado (`netlify.toml`) pero pendiente de confirmar el despliegue público.
