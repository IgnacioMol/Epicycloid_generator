# Guía de referencia — Estructura y estilo del TFG de base

> **Qué es esto.** Notas extraídas del PDF `Estudio_y_desarrollo_de_una_aplicación_móvil_para_la_seguridad_ciudadana__UrbanGuardian.pdf` (carpeta `claude/`), el TFG que el usuario usa como **plantilla de estructura y estilo** para redactar su propia memoria.
>
> **AVISO CLAVE.** Ese PDF es de **otro proyecto** (UrbanGuardian: app **móvil Android** de seguridad ciudadana, con login, base de datos Firebase, mapas y rutas). Se toma como referencia **solo para la ESTRUCTURA y el ESTILO de redacción**, NO para el contenido ni las tecnologías. El proyecto real es *Epicycloid Generator*: app **web de página única** (Angular + p5.js), sin login, sin base de datos, sin navegación entre pantallas. Hay que **adaptar**, nunca copiar funcionalidades/tecnologías ajenas.

---

## Metadatos del PDF de referencia

- Título: *Estudio y desarrollo de una aplicación móvil para la seguridad ciudadana, UrbanGuardian*.
- Autora: Ana Teixidó Masiello. Tutor: Manuel Herrero Mas. Grado en Ingeniería Multimedia. Julio 2025.
- Stack del proyecto de referencia: Android Studio, Java/XML, Firebase Firestore, OpenStreetMap/OSMDroid, GraphHopper.

## Cómo leer el PDF en el futuro

La herramienta **Read no abre este PDF** (falla `pdftoppm`/poppler no disponible). Para leerlo, extraer el texto con:
```
pdftotext -layout "claude/Estudio_y_desarrollo_...UrbanGuardian.pdf" salida.txt
```
(`pdftotext` SÍ está disponible en el entorno, en `/mingw64/bin`). Luego leer/`grep` el `.txt`. Conviene **no** dejar el `.txt` en el repo (es un derivado del PDF).

## Estructura completa de la memoria (índice del TFG de referencia)

1. **Introducción** — 1.1 Introducción · 1.2 Motivación · 1.3 Objetivos · 1.4 Organización de la memoria.
2. **Estado del arte** — 2.1 Análisis de aplicaciones similares (funcional y visual + diferenciación de la propuesta) · 2.2 Análisis de tecnologías (entorno, lenguajes, BD, etc. + comparativa final).
3. **Requisitos, especificaciones, coste, riesgos y viabilidad** — 3.1 Requisitos (3.1.1 funcionales / 3.1.2 no funcionales) · 3.2 Especificación del sistema · 3.3 Estimación de costes (planificación, plazos, económicos) · 3.4 Riesgos · 3.5 Viabilidad (técnica, económica, legal).
4. **Análisis** — 4.1 Diagrama de casos de uso (+ 4.1.1 flujos de eventos) · 4.2 Diagrama de clases conceptual · 4.3 Diagramas de secuencia **general del sistema** · 4.4 Trazabilidad requisitos↔casos de uso.
5. **Diseño** — 5.1 Diagramas de secuencia **de operaciones del sistema** · 5.2 Diseño visual (5.2.1 Principios de diseño / 5.2.2 Mockups).
6. **Implementación** — desarrollo de interfaces, XML, código, integración de servicios (en su caso, Firebase).
7. **Pruebas y resultados** — 7.1 Pruebas funcionales (+ trazabilidad requisitos↔pruebas) · 7.2 Pruebas de rendimiento · 7.3 Pruebas de usabilidad.
8. **Conclusiones** — 8.1 Revisión de objetivos · 8.2 Trabajo futuro · 8.3 Conclusiones.
- **Apéndice** (código fuente / enlace al repo, archivos) y **Bibliografía**.

## Convenciones de redacción y formato (a replicar)

- **Idioma:** español, registro formal y académico. Resumen/abstract en español, inglés y valenciano. Cada capítulo y sección **abre con un párrafo introductorio** antes de entrar en detalle.
- **Requisitos:** numerados en prosa con verbo en futuro de obligación.
  - Funcionales: `RFn La aplicación/El sistema deberá …`
  - No funcionales: `RNFn La aplicación/El sistema deberá/debe …`
- **Casos de uso:** cada uno con una **ficha en tabla** (ID, Actor principal, Descripción, Requisitos cumplidos, Precondiciones, Flujo de eventos, Postcondiciones, Flujo alternativo) y relaciones `«include»` cuando aplica. (Así está ya en `memoria-cap4-analisis.md`.)
- **Diagramas:** elaborados en **Visual Paradigm**. Tipos usados: casos de uso, clases conceptual (modelo de dominio), y **dos clases de diagramas de secuencia** (ver abajo). Usan **fragmentos combinados** `alt` (alternativa), `opt` (opcional) y `loop` (repetición).
- **Pies de figura:** `Figura X.Y: <descripción>`.
- **Citas:** referencias entre corchetes `[1]`, `[2]`… enlazadas a la **Bibliografía** final.
- **Trazabilidad:** tablas que cruzan requisitos↔casos de uso (cap. 4) y requisitos↔pruebas (cap. 7).

## Distinción clave: los DOS tipos de diagramas de secuencia

- **Cap. 4.3 — «Diagramas de secuencia general del sistema» (análisis):** se basan en los casos de uso; muestran el flujo de mensajes entre el actor (usuario) y los **objetos del sistema** (p. ej. la interfaz, la base de datos) de los casos de uso **más significativos**. Nivel general.
- **Cap. 5.1 — «Diagramas de secuencia de operaciones del sistema» (diseño):** uno por **operación concreta** (en la referencia se nombran tipo `seleccionarPantallaReportes`); detallan la lógica interactiva con `alt`/`opt`/`loop` y la navegación/flujo entre pantallas y formularios.
- **Matiz para nuestro proyecto:** en `memoria-cap4-analisis.md` el cap. 4 se tituló «del sistema» y se trató como caja negra (Usuario↔Sistema); en `memoria-cap5-diseno.md` los de diseño abren la caja con participantes internos conceptuales (Panel de control, Lienzo, Gestor de composición, etc.) y fragmentos `alt`/`opt`/`loop`. Si se quiere alinear al 100 % con la referencia, el cap. 4 podría renombrarse a «general del sistema» e incluir algún objeto interno; queda como decisión abierta.

## Diseño visual (cap. 5.2) — subapartados a cubrir

5.2.1 Principios de diseño: **Consistencia visual**, **Paleta de colores**, **Tipografía**, **Distribución** (de pantallas/interfaz) y **Accesibilidad y adaptabilidad**. 5.2.2 **Mockups** (capturas de las vistas principales). Ya redactado y adaptado en `memoria-cap5-diseno.md`.

## Estado de la memoria de *Epicycloid Generator* (borradores en `claude/`)

- `requirements.md` — RF1–RF14 / RNF1–RNF12 con estado real verificado contra el código.
- `memoria-cap4-analisis.md` — cap. 4 completo (casos de uso, clases conceptual, secuencia del sistema, trazabilidad) + anexo Visual Paradigm/PlantUML.
- `memoria-cap5-diseno.md` — cap. 5 (secuencia de operaciones de diseño + diseño visual) + anexo.
- `memoria-cap6-implementacion.md` — cap. 6 (estructura del proyecto, desarrollo de la interfaz + componentes, implementación de la lógica por componente, persistencia/integración sin servidor). Adapta la estructura de la referencia (interfaces XML / lógica Java / Firebase) a la SPA Angular + p5.js.
- `TODO-memoria-i18n.md` — pendientes de redacción relacionados con la i18n (abstract, capturas, conclusiones).
- **Aún por redactar** para igualar la estructura: cap. 1 (Introducción), cap. 2 (Estado del arte), cap. 3 (Requisitos/costes/riesgos/viabilidad — solo existe la tabla de requisitos), cap. 7 (Pruebas), cap. 8 (Conclusiones).

## Pautas del usuario a respetar

- Los **diagramas** de la memoria deben ser **conceptuales**, sin código ni tecnologías de implementación (aunque el TFG de referencia a veces sí nombra tecnologías; aquí se prioriza la pauta del usuario).
- Adaptar todo al dominio de *Epicycloid Generator* (web, página única, sin login/BD/mapas). No arrastrar funcionalidades ajenas de UrbanGuardian.
