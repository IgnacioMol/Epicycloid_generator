# Epicycloid Generator

Aplicación web interactiva para generar patrones visuales paramétricos a partir de dos órbitas independientes. Desarrollada como Trabajo de Fin de Grado (TFG).

## Descripción

El generador crea composiciones artísticas mediante la interferencia entre dos puntos que orbitan independientemente alrededor del mismo centro. El patrón emerge de la línea trazada entre ambos planetas en cada fotograma, produciendo figuras similares al arte de cuerdas (_string art_) y a las curvas de Lissajous.

Dos modos de visualización:
- **Intersección de líneas** — ambas órbitas parten del centro; se dibuja la línea entre los dos planetas en cada fotograma.
- **Curva epicicloidal** — la órbita 2 gira alrededor del punto extremo de la órbita 1; se traza el camino del punto resultante.

## Tecnologías

| Capa | Tecnología |
|---|---|
| Framework | Angular 21 (standalone components) |
| Gráficos | p5.js 2.2.3 |
| UI | Bootstrap 5.3 |
| Estado | RxJS 7 (BehaviorSubject / Subject) |
| Tests | Vitest 4 |
| Despliegue | Vercel |

## Requisitos previos

- Node.js 20 o superior
- npm 9 o superior
- Angular CLI 21: `npm install -g @angular/cli`

## Instalación

```bash
git clone https://github.com/IgnacioMol/Epicycloid_generator.git
cd epicycloid-generator
npm install
```

## Desarrollo local

```bash
npm start
```

Abre `http://localhost:4200` en el navegador. El servidor se recarga automáticamente al modificar archivos fuente.

## Guía de uso

### Panel de controles (columna derecha)

Los controles se bloquean mientras hay una simulación en curso. Pulsa **Pausa** para editarlos.

---

**Modo de visualización**

Alterna entre los dos modos con el botón superior del panel. El lienzo se limpia automáticamente al cambiar de modo.

---

**Órbita 1 / Órbita 2** _(secciones colapsables)_

Cada órbita expone tres parámetros básicos:
- _Radio_ (10–500 px) — tamaño de la órbita.
- _Velocidad angular_ (0–100 RPM) — velocidad de rotación del planeta.
- _Fase inicial_ (0–360°, con slider) — ángulo de partida del planeta.

---

**Visual** _(sección colapsable)_

- _Color de trazo_ — selector de color para las líneas dibujadas.
- _Opacidad_ (0.05–1) — transparencia de cada línea; valores bajos crean efecto de acumulación.
- _Grosor de trazo_ (0.5–10 px) — anchura de las líneas.
- _Intervalo entre líneas_ (0–60 s, solo en modo _Intersección_) — tiempo entre líneas consecutivas; 0 = una línea por fotograma.

---

**Parámetros avanzados** _(sección colapsable)_

- _Factor elíptico X/Y_ (0.1–2) — distorsiona la órbita circular en una elipse. 1.0 = círculo perfecto.
- _Inclinación_ (0–360°, con slider) — rotación del plano de la órbita en el espacio 2D.

---

**Simular por órbitas**

Permite ejecutar la simulación durante un número exacto de vueltas de una órbita concreta:

1. Selecciona qué órbita usar como referencia (Órbita 1 o Órbita 2).
2. Indica el número de vueltas (p. ej. `2.5`).
3. Pulsa **Simular**. La animación se detiene automáticamente al completar las vueltas indicadas.

---

**Acciones**

| Botón | Función |
|---|---|
| ▶ Play | Inicia la animación en modo continuo |
| ⏸ Pausa | Detiene la animación (los parámetros se pueden editar) |
| ⬜ Limpiar lienzo | Borra el trazado acumulado y reinicia los ángulos |
| ↺ Reset | Restaura todos los parámetros a sus valores por defecto |

---

### Canvas (columna izquierda)

Muestra en tiempo real:
- Las elipses orbitales de guía (azul = órbita 1, rojo = órbita 2).
- Los planetas con sus brazos radiales.
- El patrón acumulado en una capa de trazado independiente (`p5.Graphics`).

El canvas se redimensiona automáticamente con la ventana.

## Build de producción

```bash
npm run build
```

Los artefactos se generan en `dist/epicycloid-generator/browser/`. La build incluye optimizaciones de minificación y tree-shaking de Angular.

Para compilar en modo watch (desarrollo):

```bash
npm run watch
```

## Despliegue en Vercel

### Opción A — CLI

```bash
npm install -g vercel
vercel
```

En el asistente:
- _Framework Preset_: Angular
- _Build Command_: `npm run build`
- _Output Directory_: `dist/epicycloid-generator/browser`

### Opción B — GitHub

1. Sube el repositorio a GitHub.
2. Importa el proyecto en [vercel.com](https://vercel.com).
3. Vercel detecta Angular automáticamente. Confirma el _Output Directory_: `dist/epicycloid-generator/browser`.
4. Cada push a `main` genera un despliegue automático.

### Opción C — Hosting estático

```bash
npm run build
# Sirve dist/epicycloid-generator/browser/ como sitio estático
```

> Si se despliega en una subruta, añade `--base-href /epicycloid-generator/` al comando de build.

## Tests

```bash
npm test
```

Ejecuta los tests unitarios con Vitest en entorno jsdom.

## Estructura del proyecto

```
src/
├── app/
│   ├── core/
│   │   └── pattern.service.ts       # estado global vía RxJS
│   ├── features/
│   │   ├── canvas/                  # renderizado p5.js
│   │   ├── controls/                # panel de parámetros
│   │   └── presets/                 # (pendiente)
│   ├── models/
│   │   └── pattern-params.model.ts  # tipos e interfaces
│   ├── app.ts                       # componente raíz
│   └── app.config.ts
└── styles.css
```

## Parámetros por defecto

| Parámetro | Valor |
|---|---|
| Radio órbita 1 | 150 px |
| Radio órbita 2 | 200 px |
| Velocidad órbita 1 | 6 RPM |
| Velocidad órbita 2 | 3 RPM |
| Fase inicial ambas | 0° |
| Factor elíptico X/Y | 1.0 (círculo) |
| Inclinación | 0° |
| Color de trazo | #ffffff |
| Opacidad | 0.6 |
| Grosor | 1 px |
| Intervalo entre líneas | 0 (continuo) |
| Modo | Intersección de líneas |
