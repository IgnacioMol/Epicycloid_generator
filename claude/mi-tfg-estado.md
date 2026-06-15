# Estado y estructura de MI memoria del TFG

> **Qué es esto.** Notas sobre el PDF `Generador de imágenes basadas en patrones orbitales y su integración a Aplicación Web.pdf` (carpeta `claude/`): es **la propia memoria del TFG del usuario** (proyecto *Epicycloid Generator*), subida para ver el progreso real y el estilo de redacción. Sirve para saber qué hay escrito, qué falta y cómo continuar con coherencia.
>
> Estructura/estilo se basan en el TFG de referencia *UrbanGuardian* (ver `tfg-referencia-estructura.md`). Para leer el PDF: `pdftotext -layout <pdf> out.txt` (la herramienta Read no abre PDF aquí); borrar el .txt después.

- **Título:** *Generador de imágenes basadas en patrones orbitales y su integración a Aplicación Web*.
- **Proyecto:** *Epicycloid Generator* — app **web** (Angular + p5.js + TypeScript), página única, sin login/BD.
- **Enfoque doble declarado:** (1) aprendizaje del framework Angular; (2) desarrollo práctico de la app de arte generativo. Recalca la integración p5.js ↔ Angular como reto.

## Progreso por capítulos (estado real en el PDF)

| Cap. | Sección | Estado |
|---|---|---|
| 1. Introducción | 1.1–1.4 (intro, motivación, objetivos, organización) | ✅ Redactado |
| 2. Estado del arte | 2.1 apps similares (Desmos, GeoGebra, Processing; diferenciación funcional y visual) · 2.2 tecnologías (entorno, lenguajes, librerías gráficas) | ✅ Redactado |
| 3. Requisitos… | 3.1 RF1–RF14 / RNF1–RNF12 · 3.2 especificación · 3.3 costes (Tablas 3.1–3.6 + económicos) · 3.4 riesgos · 3.5 viabilidad (técnica/económica/legal) | ✅ Redactado |
| 4. Análisis | 4.1 casos de uso + fichas CU1–CU13 ✅ · 4.2 (ver nota) · 4.3 trazabilidad ❌ vacía | 🟡 Parcial |
| 5. Diseño | 5.1 secuencia de operaciones · 5.2 diseño visual | ❌ Solo títulos (vacío) |
| 6. Implementación | 6.1 desarrollo | ❌ Solo título |
| 7. Pruebas y resultados | 7.1 funcionales · 7.2 rendimiento · 7.3 usabilidad | ❌ Solo títulos |
| 8. Conclusiones | 8.1 revisión objetivos · 8.2 trabajo futuro · 8.3 conclusiones | ❌ Solo títulos |
| Bibliografía | [1]… (Desmos, GeoGebra, Processing, salarios…) | 🟡 En curso |

**Lo escrito llega hasta el capítulo 4 (parcial). Del 5 al 8 están vacíos (solo títulos).** Aquí es donde más ayuda hace falta, y donde encajan los borradores de `claude/`.

## ⚠️ Discrepancias importantes entre el PDF y los borradores de `claude/`

1. **Sección 4.2 mal etiquetada en el PDF:** el título dice «Diagramas de secuencia general del sistema», pero el **cuerpo describe el diagrama de CLASES conceptual** (modelo de dominio). Es decir, en el PDF se mezclan/confunden las secciones: el texto del diagrama de clases está bajo un encabezado de «secuencia», y **los diagramas de secuencia del sistema y la tabla de trazabilidad (4.3) están vacíos**.
   - En cambio, nuestro borrador `memoria-cap4-analisis.md` está mejor estructurado: 4.1 casos de uso · 4.2 clases conceptual · 4.3 secuencia del sistema · 4.4 trazabilidad. **Conviene trasladar esa estructura/contenido al PDF y corregir el encabezado.**
2. **CU5 desactualizado en el PDF:** la lista de casos de uso del PDF aún dice **«Limpiar Lienzo»**, mientras que el código y nuestros borradores ya lo renombraron a **«Deshacer última sesión»** (deshacer incremental de sesiones). Hay que actualizar CU5 en la memoria.
3. **Orden de casos de uso en el PDF:** Configurar · Reproducir · Pausar · Alternar modo · Limpiar lienzo · Restablecer · Cambiar idioma · Ajustar zoom · Exportar imagen PNG · Exportar patrón JSON · Importar patrón JSON · Consultar tutorial · Generar variación aleatoria (13 CU). Las **fichas** CU1–CU13 sí coinciden con nuestro `memoria-cap4-analisis.md` (incluida CU13 «Cambiar idioma», RF14).
4. **Capítulo 5:** vacío en el PDF; ya tenemos borrador completo en `memoria-cap5-diseno.md` (secuencia de operaciones de diseño + diseño visual 5.2.1/5.2.2). Listo para integrar.

## Estilo y convenciones de redacción (las del usuario, a mantener)

- Español académico **impersonal** («se presenta», «se describe», «se analiza»). Cada capítulo y sección abre con un **párrafo introductorio**.
- **Requisitos** en prosa: `RFn La aplicación/El sistema deberá …` y `RNFn …`. (RF1–RF14, RNF1–RNF12 ya coinciden con `requirements.md`.)
- **Casos de uso:** fichas en tabla con campos: ID, Actor principal, Descripción, Requisitos cumplidos, Precondiciones, Flujo de eventos, Postcondiciones, Flujo alternativo. Relaciones `«include»` (Exportar imagen→opciones de exportación; Importar patrón→reconstruir dibujo).
- **Diagramas** elaborados en **Visual Paradigm**, a nivel **conceptual** (sin tecnologías ni código). Pies «Figura X.Y …», tablas «Tabla 3.x …».
- **Costes:** tablas por fases (estado del arte, requisitos, análisis, diseño, implementación, pruebas) + estimación económica.
- **Bibliografía:** estilo APA con `[n]` y fecha de recuperación («Recuperado 8 de abril de 2026, de <url>»). Fechas del trabajo: 2026 (abril–junio).

## Qué falta y dónde encajan nuestros borradores

- **Cap. 4:** corregir el encabezado de 4.2, añadir el diagrama de clases conceptual con su sección propia, **añadir los diagramas de secuencia del sistema** y **rellenar la trazabilidad** → todo está en `memoria-cap4-analisis.md`. Actualizar CU5 a «Deshacer última sesión».
- **Cap. 5:** integrar `memoria-cap5-diseno.md` (secuencia de operaciones de diseño + diseño visual). Recordar la distinción 4.x (secuencia del sistema, análisis) vs 5.1 (secuencia de operaciones, diseño).
- **Cap. 6 (Implementación), 7 (Pruebas), 8 (Conclusiones):** sin redactar; son los siguientes objetivos de escritura.
- Pendientes de la i18n para la memoria (abstract, capturas, conclusiones): ver `TODO-memoria-i18n.md`.
