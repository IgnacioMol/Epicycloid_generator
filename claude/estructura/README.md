# Documentación de la estructura — *Epicycloid Generator*

Esta carpeta documenta **a fondo** el proyecto: cómo está organizado, cómo funciona cada pieza, el flujo de ejecución y de datos, y el **porqué** de cada decisión, enlazando con los requisitos funcionales (RF) y no funcionales (RNF) cuando procede.

> Generada el 2026-06-14 a partir del código real. Si el código cambia, actualizar estos documentos.

## Índice

1. [01 — Visión general](01-vision-general.md) — qué es, objetivos, stack y decisiones tecnológicas.
2. [02 — Arquitectura](02-arquitectura.md) — estructura de carpetas, árbol de componentes, servicios y modelos.
3. [03 — Modelo matemático](03-modelo-matematico.md) — la matemática de los patrones orbitales y los dos modos.
4. [04 — Flujo de ejecución y de datos](04-flujo-ejecucion-y-datos.md) — arranque, integración p5↔Angular (zoneless), observables y estado.
5. [05 — Renderizado y rendimiento](05-renderizado-rendimiento.md) — la capa de estela, el bucle de dibujo y el zoom.
6. [06 — Funcionalidades](06-funcionalidades.md) — cada RF explicado: dónde, cómo y por qué.
7. [07 — Internacionalización (i18n)](07-i18n.md) — el sistema multilingüe (RF14).
8. [08 — Interfaz y diseño](08-interfaz-diseno.md) — UI/UX, estilos, validación (RNF4/RNF9/RNF10).
9. [09 — Trazabilidad RF/RNF → código](09-trazabilidad-rf-rnf.md) — tabla de qué implementa cada requisito.

## Resumen en una frase

Aplicación **web de página única** (Angular 21 *standalone*, **zoneless**) que genera **arte generativo** a partir de patrones orbitales (epicicloides), dibujados en tiempo real con **p5.js**; el usuario ajusta parámetros, reproduce/pausa la animación, deshace por sesiones, exporta imagen/JSON y cambia el idioma, todo sin recargar la página.
