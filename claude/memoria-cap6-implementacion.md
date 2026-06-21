# Capítulo 6 — Implementación

> Borrador del apartado de implementación de la memoria del TFG *Epicycloid Generator*.
> **Adaptación de la estructura de referencia (UrbanGuardian):** aquella memoria describe una app
> Android (interfaces XML, lógica Java, Firebase) pantalla a pantalla. Aquí se mantiene el *espíritu*
> de la estructura —un único bloque «Desarrollo de la aplicación» que recorre interfaces, componentes,
> lógica e integración— pero adaptado a una **aplicación web de página única** (Angular + p5.js),
> **sin login, sin base de datos y sin navegación entre pantallas**. Los nombres de clase y función
> son los **reales del código**. Las figuras son capturas de código y de interfaz, referenciadas en el
> texto. Los diagramas de colaboración entre componentes no se repiten aquí (ya están en los diagramas de
> secuencia de los capítulos 4 y 5), y la justificación de las tecnologías elegidas tampoco, pues se
> abordó en el capítulo de análisis de tecnologías (estado del arte).

---

El presente capítulo describe el proceso de desarrollo de la aplicación, centrándose en la construcción de sus componentes fundamentales y en la materialización del diseño definido en el capítulo anterior. Se detallan las decisiones de implementación y las herramientas empleadas para construir la interfaz, la estructura interna del código y la integración de los distintos elementos que componen el sistema.

A diferencia de una aplicación móvil con múltiples actividades, *Epicycloid Generator* es una **aplicación web de página única (SPA)** que se ejecuta íntegramente en el navegador. Por ello, no existe navegación entre pantallas ni una capa de persistencia remota: toda la interfaz convive en una única vista y el estado se gestiona en memoria, apoyándose puntualmente en el almacenamiento local del navegador. La interfaz se ha construido con **componentes de Angular** (plantillas HTML con la sintaxis declarativa del framework, estilizadas con Bootstrap y CSS propio), mientras que la generación gráfica en tiempo real se delega en la biblioteca **p5.js**, que dibuja sobre un lienzo (`<canvas>`). La lógica se ha programado en **TypeScript** siguiendo un enfoque orientado a componentes y servicios.

Para organizar la exposición, el capítulo se estructura en dos bloques. El primero (6.1) presenta la **estructura y organización del proyecto**, incluido el flujo de datos que lo vertebra. El segundo (6.2), **desarrollo de la aplicación**, constituye el núcleo del capítulo y recorre sucesivamente las interfaces, los componentes visuales, la implementación de la lógica y la persistencia e integración del sistema.

## 6.1. Estructura y organización del proyecto

Antes de describir las funciones concretas, conviene presentar cómo se organiza internamente el código, ya que esta estructura condiciona el resto del capítulo. El proyecto se ha construido sobre **Angular** utilizando **componentes independientes** (*standalone*), un modelo que evita los módulos clásicos y permite que cada componente declare directamente sus dependencias. La aplicación es, además, **«zoneless»**: prescinde de la biblioteca de detección automática de cambios habitual en Angular, lo que resulta clave para que el bucle de animación de p5.js (que se repite 60 veces por segundo) no dispare ciclos de actualización innecesarios y se mantenga el rendimiento (esta decisión, junto con el resto de tecnologías elegidas, se justifica en el capítulo de análisis de tecnologías).

El código fuente se reparte en tres áreas claramente diferenciadas dentro de `src/app`:

- **`models`**: las **interfaces** que definen el modelo de datos. La principal es `PatternParams`, que reúne todos los parámetros configurables del patrón (radios, velocidades en RPM, fases iniciales, factores de elipse, inclinaciones, color, opacidad, grosor de trazo, intervalo entre líneas y modo de visualización). Junto a ella se definen `ExportOptions` (opciones de exportación), `LineRecord` (un segmento dibujado, con sus coordenadas y color) y `SimulationSession` (un bloque de animación grabado, base del deshacer y de la exportación a JSON).
- **`core`**: la lógica transversal. Contiene el servicio central `PatternService`, que coordina los parámetros, el historial de trazas y las sesiones de animación, y el subsistema de internacionalización (`I18nService` y `TranslatePipe`).
- **`features`**: los **componentes** que materializan cada parte de la interfaz: el lienzo (`Canvas`), el panel de control (`Controls`), el diálogo de exportación (`ExportModal`) y el tutorial de bienvenida (`Tutorial`). El catálogo de ejemplos predefinidos (`presets`) se ha modelado como un módulo de datos, no como un componente.

Por encima de todos ellos, el componente raíz `AppComponent` compone la vista: distribuye el lienzo y el panel de control en una disposición a dos columnas y aloja los elementos flotantes (tutorial y selector de idioma).

```
src/app/
├── app.ts                       # AppComponent: compone la vista
├── app.html
├── models/
│   └── pattern-params.model.ts  # PatternParams, ExportOptions, LineRecord, SimulationSession
├── core/
│   ├── pattern.service.ts       # PatternService (única fuente de verdad)
│   └── i18n/
│       ├── i18n.service.ts      # I18nService
│       ├── translate.pipe.ts    # TranslatePipe (| t)
│       └── es.json · en.json · ca.json · id.json · cs.json
└── features/
    ├── canvas/                  # Canvas (lienzo p5.js)
    ├── controls/                # Controls (panel de control)
    ├── export-modal/            # ExportModal (diálogo de exportación)
    ├── tutorial/                # Tutorial (bienvenida)
    └── presets/                 # presets.ts (módulo de datos, RF7)
```

*Figura 6.1: organización del código fuente en `src/app`, repartido en `models`, `core` y `features`.*

### Flujo de datos entre componentes

Comprender cómo circulan los datos es la clave para entender el resto del capítulo. La comunicación entre las partes de la aplicación **no** se realiza pasando datos directamente de un componente a otro, sino a través del servicio `PatternService`, que actúa como **única fuente de verdad**. Este diseño desacopla por completo el panel de control (la entrada) del lienzo (el motor de dibujo): ninguno conoce al otro, ambos solo conocen al servicio.

El flujo es **unidireccional** y se articula en torno a dos canales que el servicio expone como **flujos observables**:

- **`params$`** — transporta la **configuración** del patrón. Cuando el usuario modifica un control, el panel publica los nuevos parámetros en el servicio y este los emite por `params$`. El lienzo, suscrito a ese flujo, recibe los valores actualizados y redibuja en el siguiente fotograma. Es lo que hace posible la **edición en tiempo real**.
- **`action$`** — transporta las **órdenes** del usuario (reproducir, pausar, deshacer, restablecer, importar). El panel las publica con `dispatch()` y el lienzo las interpreta en `onAction()`, cambiando su estado de animación.

Junto a esos dos canales, el servicio conserva el **estado del dibujo** como datos —no como píxeles—: el historial de segmentos (`lineHistory`) y la lista de sesiones grabadas (`sessions`). El lienzo escribe en ese historial a medida que dibuja, y otros componentes (como el diálogo de exportación) lo leen cuando lo necesitan.

El recorrido completo, por tanto, es siempre el mismo: **el usuario actúa sobre `Controls` → `Controls` traslada la acción o el cambio a `PatternService` → el servicio lo emite o lo almacena → `Canvas` reacciona y dibuja → el resultado vuelve al usuario en el lienzo**. Esta circulación cerrada y de sentido único facilita razonar sobre el sistema y depurarlo, y permite que componentes nuevos se sumen sin tocar a los existentes. Este flujo es, precisamente, el que reflejan los diagramas de secuencia presentados en los capítulos 4 y 5, donde se observa cómo el usuario, `Controls`, `PatternService` y `Canvas` colaboran en cada operación.

## 6.2. Desarrollo de la aplicación

Este apartado constituye el núcleo del capítulo y recorre el desarrollo de la aplicación en cuatro planos sucesivos, de lo que el usuario percibe a lo que ocurre por debajo: las **interfaces** que ve el usuario (6.2.1), los **componentes** visuales con que se construyen (6.2.2), la **lógica** que las anima (6.2.3) y la **integración** que da persistencia a los datos (6.2.4).

### 6.2.1. Interfaces

Dado que la aplicación es de página única, no se describen «pantallas» que se suceden, sino las **regiones** de la única vista y los **diálogos** que se superponen a ella cuando el usuario lo solicita. Se ha seguido un enfoque centrado en la experiencia de usuario, con una interfaz intuitiva, coherente y accesible que permite percibir de inmediato el efecto de cada ajuste sobre la composición.

**Vista principal (`AppComponent`)**

*(Aquí van las Figuras 6.2 y 6.3: vista principal con lienzo y panel.)*

Es la disposición general de la aplicación, lo primero que ve el usuario al abrirla. La pantalla se divide en dos zonas: a la izquierda, el **lienzo**, que ocupa aproximadamente el 70 % del ancho y donde se genera la composición; a la derecha, el **panel de control** (en torno al 30 %), desde el que se ajustan todos los parámetros y se gobiernan las acciones. Sobre esta disposición conviven dos elementos flotantes fijos: el botón de ayuda que reabre el tutorial y el **selector de idioma**, situado en una esquina para no entorpecer la visualización. Esta correspondencia lado a lado entre controles y resultado es deliberada y refuerza la edición en tiempo real.

**Lienzo (`Canvas`)**

*(Aquí van las Figuras 6.4 y 6.5: el lienzo con un patrón en curso y los controles de zoom.)*

Es la zona donde se representa la composición. Contiene el contenedor sobre el que p5.js crea el `<canvas>` y un grupo de botones de **zoom** (acercar y alejar); además, el usuario puede ampliar o reducir con la rueda del ratón sobre el propio lienzo. En él se dibujan las trazas acumuladas del patrón, las **guías orbitales** (las elipses y radios de cada órbita) y los **planetas** (los dos puntos que se desplazan), que ayudan a comprender de dónde surge cada trazo. Estos elementos de apoyo se distinguen por color: azul para la primera órbita y rojo para la segunda, en coherencia con el panel de control.

**Panel de control (`Controls`)**

*(Aquí van las Figuras 6.6 y 6.7: panel de control con las secciones plegables.)*

Es el centro de interacción de la aplicación. Reúne, ordenados de lo general a lo específico, todos los parámetros del patrón: un **desplegable de ejemplos** predefinidos como punto de partida opcional, el **modo de visualización**, las secciones de **órbita 1** y **órbita 2** (radio, velocidad y fase inicial), los **ajustes visuales** (color, opacidad, grosor e intervalo entre líneas) y, plegada por defecto, una sección de **parámetros avanzados** (factores de elipse e inclinación de cada órbita). En la parte inferior, siempre accesibles, se sitúan las **acciones**: aleatorizar, reproducir, pausar, deshacer la última sesión, restablecer, exportar imagen, exportar patrón e importar patrón. Mientras la animación está en marcha, los parámetros se bloquean visualmente y un aviso informa de ello, evitando estados inconsistentes.

**Diálogo de exportación de imagen (`ExportModal`)**

*(Aquí van las Figuras 6.8 y 6.9: diálogo de exportación con la previsualización y las opciones.)*

Es una ventana modal que se superpone a la vista principal cuando el usuario decide guardar la composición como imagen (RF6). Muestra una **previsualización** de la imagen resultante y un conjunto de opciones: color de fondo (con la posibilidad de fondo transparente), zoom de la exportación, factor de resolución (1×, 2× o 4×) y casillas para incluir o no las guías orbitales y el punto central. La previsualización se actualiza al instante con cada cambio, de modo que el usuario sabe exactamente qué obtendrá antes de descargar el archivo PNG.

**Tutorial de bienvenida (`Tutorial`)**

*(Aquí van las Figuras 6.10 y 6.11: tutorial de bienvenida.)*

Es una ventana modal que se muestra automáticamente la primera vez que se abre la aplicación y que puede reabrirse en cualquier momento mediante el botón de ayuda. Presenta, en una lista de pasos numerados con iconos, las acciones principales de la aplicación. Incluye una casilla «No volver a mostrar» que, al marcarse, recuerda la preferencia para futuras visitas.

**Selector de idioma**

*(Aquí van las Figuras 6.12 y 6.13: selector de idioma desplegado.)*

Es un botón desplegable, fijo en una esquina, que permite cambiar el idioma de toda la interfaz sin recargar la página. Al pulsarlo se despliega la lista de idiomas disponibles (español, catalán, inglés, indonesio y checo); al seleccionar uno, todos los textos se traducen de inmediato. La lista se genera automáticamente a partir de la configuración de idiomas, de modo que añadir uno nuevo no obliga a modificar la interfaz.

### 6.2.2. Componentes de la interfaz

El diseño visual de la aplicación se ha estructurado mediante plantillas HTML, siguiendo el modelo de desarrollo de interfaces de Angular y apoyándose en la biblioteca de estilos Bootstrap. A lo largo de la aplicación se han empleado distintos elementos de interfaz gráfica para ofrecer una experiencia de usuario clara e intuitiva. Entre los componentes más utilizados se encuentran las etiquetas (`label`), empleadas para mostrar información estática como el nombre de cada parámetro o su unidad; los campos numéricos (`input type="number"`) y los deslizadores (`input type="range"`), que permiten al usuario introducir y ajustar los valores que definen el patrón; y los botones, que sirven para ejecutar acciones como reproducir la animación, restablecer los parámetros o exportar la composición. Además, se han utilizado contenedores y secciones plegables (`details`) para organizar estos elementos de forma jerárquica y ordenada dentro del panel. También se han incorporado componentes más dinámicos, como los desplegables (`select`), que muestran listas de opciones como los ejemplos predefinidos, y las ventanas modales, que superponen diálogos —el de exportación o el tutorial— sobre la vista principal. Por último, cabe señalar que todos estos elementos se enlazan con la lógica de la aplicación mediante la sintaxis declarativa de Angular —el enlace bidireccional `[(ngModel)]`, los manejadores de eventos como `(click)`, los bloques de control de flujo `@if` y `@for`, y el pipe de traducción `| t`—, según se irá detallando en los componentes descritos a continuación.

**Deslizadores y campos numéricos.** Constituyen el componente predominante del panel de control. Cada parámetro numérico se presenta siguiendo un patrón uniforme, compuesto por una etiqueta (`label`), un campo numérico (`input type="number"`) que permite introducir un valor exacto y un deslizador (`input type="range"`) que permite ajustarlo de forma continua. Ambos controles están enlazados a la misma variable mediante `[(ngModel)]`, de manera que mover el deslizador actualiza el número y viceversa, y cualquiera de los dos dispara el método `onParamChange()` para redibujar el patrón al instante (RF2, RF9). Los atributos `min`, `max` y `step` definen el rango válido y la granularidad de cada control. Además, al editar el campo numérico, el evento `(change)` invoca `clampParams()` para corregir los valores que queden fuera de rango.

```html
<div class="mb-3">
  <div class="d-flex justify-content-between align-items-center mb-1">
    <label class="form-label small mb-0">{{ 'controls.radius' | t }}</label>
    <input type="number" class="param-number-input"
           min="50" max="350" step="5"
           [(ngModel)]="params.orbit1Radius"
           (ngModelChange)="onParamChange()"
           (change)="clampParams()">
  </div>
  <input type="range" class="form-range"
         min="50" max="350" step="5"
         [(ngModel)]="params.orbit1Radius"
         (ngModelChange)="onParamChange()">
</div>
```

*Figura 6.14: estructura HTML de un control de parámetro — etiqueta, campo numérico y deslizador (`controls.html`).*

**Selectores desplegables (`select`).** Se emplean para que el usuario elija entre un conjunto de opciones predefinidas. El más destacado es el desplegable de ejemplos, cuyas opciones se generan dinámicamente mediante el bloque `@for` a partir del catálogo de ejemplos, y cuyo nombre visible se traduce con una clave dinámica. Al cambiar la selección, el componente invoca el método `applyPreset()`, que carga la configuración elegida.

```html
<label class="form-label small d-block mb-1" for="presetSelect">{{ 'controls.examples' | t }}</label>
<select id="presetSelect" class="form-select form-select-sm preset-select"
        [(ngModel)]="selectedPresetId"
        (ngModelChange)="applyPreset()">
  <option value="">{{ 'controls.examplesNone' | t }}</option>
  @for (preset of presets; track preset.id) {
    <option [value]="preset.id">{{ ('controls.presets.' + preset.id) | t }}</option>
  }
</select>
```

*Figura 6.15: desplegable de ejemplos generado dinámicamente con `@for` (`controls.html`).*

**Botones.** Se encargan de ejecutar las acciones de la aplicación. Para ello se ha utilizado el sistema de estilos de Bootstrap (`btn`), con variantes de color coherentes con el significado de cada acción: verde para reproducir, ámbar para pausar o rojo para restablecer. Cabe destacar que algunos botones se deshabilitan de forma condicional mediante `[disabled]`; por ejemplo, los parámetros y el botón de reproducir quedan inhabilitados mientras la animación está en marcha, lo que impide interacciones que dejarían el sistema en un estado inconsistente. Por último, el propio botón de modo de visualización cambia de estilo y de texto según el modo activo, ofreciendo retroalimentación visual inmediata.

```html
<button class="btn btn-info btn-sm fw-semibold"
        [disabled]="isPlaying"
        (click)="randomize()">
  {{ 'controls.randomize' | t }}
</button>
<div class="row g-2">
  <div class="col-6">
    <button class="btn btn-success btn-sm w-100"
            [disabled]="isPlaying"
            (click)="play()">
      {{ 'controls.play' | t }}
    </button>
  </div>
  <div class="col-6">
    <button class="btn btn-warning btn-sm w-100"
            [disabled]="!isPlaying"
            (click)="pause()">
      {{ 'controls.pause' | t }}
    </button>
  </div>
</div>
```

*Figura 6.16: botones de acción, con bloqueo condicional mediante `[disabled]` (`controls.html`).*

**Selector de color.** En la sección visual se incorpora un componente `input type="color"`, que abre el selector de color nativo del navegador. Está enlazado al parámetro `lineColor`, de modo que el color elegido se aplica de inmediato a los nuevos trazos del patrón.

**Secciones colapsables (`details`).** Con el fin de no saturar el panel, los parámetros menos habituales se han agrupado en una sección plegable construida con el elemento nativo `details`/`summary`, que el usuario puede desplegar bajo demanda. De este modo se mantiene la interfaz limpia, respetando la jerarquía de lo general a lo específico.

```html
<details class="mb-4">
  <summary class="text-uppercase small fw-semibold mb-3"
           style="cursor:pointer; color:#5a62a0; letter-spacing:.08em; list-style:none;">
    ▸ {{ 'controls.advanced' | t }}
  </summary>

  <div class="mt-3 ps-1">
    <p class="small mb-3" style="color:#5a62a0;">{{ 'controls.advancedHint' | t }}</p>
    <!-- factores de elipse e inclinación de cada órbita -->
  </div>
</details>
```

*Figura 6.17: sección de parámetros avanzados, plegable con el elemento nativo `details`/`summary` (`controls.html`).*

**Ventanas modales y superposiciones.** Tanto el diálogo de exportación como el tutorial se implementan como superposiciones, mostradas de forma condicional mediante el bloque `@if`. Una capa semitransparente cubre la vista y centra una tarjeta con el contenido; al pulsar fuera de ella o en el botón de cierre, la superposición se oculta. Este mismo mecanismo se emplea también para cerrar el menú del selector de idioma.

**Lienzo (`canvas`).** Por último, cabe comentar el lienzo, un componente singular dentro de la interfaz. A diferencia del resto de elementos, no se rellena con marcado declarativo, sino que es p5.js quien crea y gobierna sobre él el dibujo en tiempo real. Se trata, por tanto, del elemento central pero único de la interfaz, directamente ligado a la representación gráfica de la composición.

### 6.2.3. Implementación de la lógica

Una vez descrita la interfaz, este apartado detalla el comportamiento lógico que hay detrás de cada componente. Se expone componente por componente, comenzando por el servicio que coordina a todos los demás.

#### Servicio central — `PatternService`

`PatternService` es el núcleo de la aplicación: actúa como única fuente de verdad y centraliza tanto los parámetros del patrón como el historial de trazas y las sesiones de animación. Al ser un servicio compartido, desacopla por completo el panel de control del lienzo, de modo que ninguno de los dos componentes necesita conocer al otro: ambos se comunican exclusivamente a través de él. De esta forma, cualquier cambio en los parámetros o cualquier acción del usuario fluye por un único punto, lo que mantiene el estado coherente y facilita la mantenibilidad y la ampliación del sistema.

**`updateParams` y `dispatch`.** Este fragmento de código implementa los dos puntos de entrada del servicio. Por un lado, el método `updateParams()` recibe una nueva configuración de parámetros y la emite a través del flujo `params$`, lo que provoca que el lienzo se redibuje al instante. Por otro lado, el método `dispatch()` emite a través del flujo `action$` una acción solicitada por el usuario, que el lienzo interpretará posteriormente. Esta separación permite mantener un flujo de datos claro y unidireccional entre el panel de control y el lienzo.

```ts
updateParams(params: PatternParams): void {
  this.paramsSubject.next(params);
}

getCurrentParams(): PatternParams {
  return this.paramsSubject.value;
}

dispatch(action: CanvasAction): void {
  this.actionSubject.next(action);
}
```

*Figura 6.18: puntos de entrada del servicio — `updateParams` (canal `params$`) y `dispatch` (canal `action$`) (`pattern.service.ts`).*

**Gestión de sesiones — `beginSession`, `endSession`, `snapshotActiveSession`.** Este conjunto de métodos se encarga de gestionar el ciclo de vida de una sesión de animación, entendida como un bloque que graba los parámetros empleados y el número de fotogramas dibujados. Primero, cada vez que el usuario reproduce, `beginSession()` inicia la grabación. A continuación, mientras la animación avanza, `incrementSessionFrame()` actualiza el contador de fotogramas. Finalmente, al pausar, `endSession()` cierra el bloque y lo añade a la lista de sesiones, registrando además su estado final —los ángulos y el último punto dibujado— para poder retomar el dibujo más adelante. Asimismo, el método `snapshotActiveSession()` devuelve una copia de la sesión en curso, lo que permite exportar la composición aunque la animación no se haya detenido.

```ts
beginSession(params: PatternParams): void {
  this._sessionParams = { ...params };
  this._sessionFrameCount = 0;
  this._sessionActive = true;
}

incrementSessionFrame(): void {
  if (this._sessionActive) this._sessionFrameCount++;
}

endSession(): void {
  if (!this._sessionActive || !this._sessionParams) return;
  this._sessionActive = false;
  if (this._sessionFrameCount > 0) {
    this.sessions.push({
      sessionIndex: this.sessions.length + 1,
      params: this._sessionParams,
      frameCount: this._sessionFrameCount,
      durationSeconds: parseFloat((this._sessionFrameCount / 60).toFixed(3)),
      endAngle1: this._stateAngle1, endAngle2: this._stateAngle2,
      endTipX: this._stateTipX, endTipY: this._stateTipY,
      endFirstPoint: this._stateFirstPoint,
    });
  }
  this._sessionParams = null;
  this._sessionFrameCount = 0;
}
```

*Figura 6.19: ciclo de vida de una sesión de animación — `beginSession`, `incrementSessionFrame` y `endSession` (`pattern.service.ts`).*

**Deshacer y reconstrucción — `removeLastSession`, `replaySessionsToLines`.** Estas dos funciones implementan el deshacer incremental de la composición. Primero, el método `removeLastSession()` cierra la sesión activa si la hubiera, retira la última de la lista y reconstruye el historial reproduciendo las restantes. Esa reconstrucción la realiza `replaySessionsToLines()`, que recorre cada sesión fotograma a fotograma aplicando la misma fórmula que el lienzo y regenera así la lista completa de segmentos. Cabe destacar que esta segunda función se reutiliza también al importar un patrón, de modo que una única rutina garantiza que tanto deshacer como importar produzcan exactamente el mismo resultado que el dibujo original.

```ts
removeLastSession(): SimulationSession | null {
  if (this._sessionActive) this.endSession();
  if (this.sessions.length === 0) {
    this.lineHistory = [];
    return null;
  }
  const removed = this.sessions.pop()!;
  this.lineHistory = this.replaySessionsToLines(this.sessions);
  return removed;
}

replaySessionsToLines(sessions: SimulationSession[]): LineRecord[] {
  const lines: LineRecord[] = [];
  let angle1 = 0, angle2 = 0;
  let prevTipX = 0, prevTipY = 0, firstPoint = true;

  for (const session of sessions) {
    const p = session.params;
    // ... calcula las posiciones de planeta1 y planeta2 (misma fórmula que el lienzo) ...
    for (let frame = 0; frame < session.frameCount; frame++) {
      // ... añade un LineRecord a 'lines' y avanza angle1, angle2 ...
    }
    session.endAngle1 = angle1;
    session.endAngle2 = angle2;
  }
  return lines;
}
```

*Figura 6.20: deshacer y reconstrucción del dibujo — `removeLastSession` y `replaySessionsToLines` (`pattern.service.ts`). El cálculo trigonométrico interno se ha omitido por brevedad.*

#### Lienzo — `Canvas`

**`initSketch` y el bucle de dibujo (`draw`).** El método `initSketch()` crea una instancia de p5.js en modo instancia, con su propio bucle de dibujo a 60 fotogramas por segundo. Dentro de ese bucle, la función `draw()` constituye el corazón de la aplicación, pues en ella se materializa la generación de la composición epicicloidal a partir de los parámetros (RF1). En cada fotograma, primero calcula la posición de los dos planetas mediante los algoritmos paramétricos; a continuación, traza la nueva línea entre ellos —o, en modo curva, el segmento que une el punto anterior con el actual—; seguidamente dibuja las guías orbitales y los planetas; y, por último, avanza los ángulos para el siguiente fotograma. Si la animación está activa, además registra cada nuevo segmento en el historial del servicio.

```ts
let x1: number, y1: number, x2: number, y2: number;

const lx1 = R1 * eX1 * Math.cos(this.angle1 + init1);
const ly1 = R1 * eY1 * Math.sin(this.angle1 + init1);
x1 = lx1 * Math.cos(a1) - ly1 * Math.sin(a1);
y1 = lx1 * Math.sin(a1) + ly1 * Math.cos(a1);

const lx2 = R2 * eX2 * Math.cos(this.angle2 + init2);
const ly2 = R2 * eY2 * Math.sin(this.angle2 + init2);
const rx2 = lx2 * Math.cos(a2) - ly2 * Math.sin(a2);
const ry2 = lx2 * Math.sin(a2) + ly2 * Math.cos(a2);

if (mode === 'curve') {     // modo curva: planeta2 parte de planeta1
  x2 = x1 + rx2;  y2 = y1 + ry2;
} else {                    // modo líneas: ambos planetas desde el centro
  x2 = rx2;       y2 = ry2;
}
```

*Figura 6.21: cálculo de la posición de los dos planetas a partir de los parámetros (radios, elipses, fases e inclinaciones) (`canvas.ts`).*

```ts
p.draw = () => {
  if (!this.params) return;

  // 1) lee los parámetros actuales (radios, velocidades, fases, modo...)
  // 2) atiende acciones pendientes (clear / reset / cambio de modo)
  // 3) calcula las posiciones de los dos planetas (ver Figura 6.21)
  // 4) pinta la estela acumulada + guías + planetas (ver Figura 6.23)

  // 5) actualización: si la animación está activa, registra la línea y avanza
  if (!this.isPaused) {
    if (this.isDrawing) {
      if (mode === 'curve') {
        if (!this.firstPoint) {
          this.patternService.lineHistory.push(record(this.prevTipX, this.prevTipY, x2, y2));
        }
        this.prevTipX = x2; this.prevTipY = y2; this.firstPoint = false;
      } else {
        const framesNeeded = lineInterval > 0 ? Math.max(1, Math.round(lineInterval * 60)) : 1;
        if (this.framesSinceLastLine % framesNeeded === 0) {
          this.patternService.lineHistory.push(record(x1, y1, x2, y2));
        }
        this.framesSinceLastLine++;
      }
    }
    this.patternService.incrementSessionFrame();
    this.angle1 += s1;
    this.angle2 += s2;
    this.patternService.setCurrentState(this.angle1, this.angle2, this.prevTipX, this.prevTipY, this.firstPoint);
  }
};
```

*Figura 6.22: esqueleto del bucle `draw()` y bloque de actualización por fotograma (`canvas.ts`).*

**Renderizado optimizado de la estela (capa `trailLayer`).** Este fragmento de código implementa la lógica que acumula las trazas sobre una capa gráfica fuera de pantalla, con el fin de mantener el rendimiento. En lugar de repintar todo el historial en cada fotograma, el sistema pinta únicamente los segmentos nuevos, y solo reconstruye la capa completa cuando resulta imprescindible: al hacer zoom, redimensionar la ventana, limpiar, restablecer, cambiar de modo o importar. El lienzo principal se limita entonces a pintar el fondo, volcar esa capa y superponer sobre ella las guías y los planetas. Esta estrategia es la que permite mantener la fluidez de la animación incluso con miles de líneas acumuladas, cumpliendo así los requisitos de rendimiento del proyecto.

```ts
const paintLines = (from: number, to: number) => {
  const ctx = (g as any).drawingContext as CanvasRenderingContext2D;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(this.zoom, this.zoom);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (let i = from; i < to; i++) {
    const ln = history[i];
    ctx.strokeStyle = `rgba(${ln.r},${ln.g},${ln.b},${ln.a / 255})`;
    ctx.lineWidth = ln.sw;
    ctx.beginPath();
    ctx.moveTo(ln.x1, ln.y1);
    ctx.lineTo(ln.x2, ln.y2);
    ctx.stroke();
  }
  ctx.restore();
};

if (this.trailDirty || history.length < this.renderedLineCount) {
  g.clear();
  paintLines(0, history.length);                       // reconstrucción completa
  this.renderedLineCount = history.length;
  this.trailDirty = false;
} else if (history.length > this.renderedLineCount) {
  paintLines(this.renderedLineCount, history.length);  // solo lo nuevo (coste O(1))
  this.renderedLineCount = history.length;
}
```

*Figura 6.23: pintado incremental sobre la capa fuera de pantalla `trailLayer` — solo se repintan los segmentos nuevos salvo que `trailDirty` fuerce la reconstrucción (`canvas.ts`).*

**`onAction` y zoom.** El método `onAction()` se encarga de traducir cada acción recibida del servicio en un cambio de estado del lienzo: iniciar o pausar la animación, marcar como pendiente una limpieza o un restablecimiento, o restaurar el estado de dibujo tras un deshacer o una importación. Por su parte, los métodos `zoomIn()` y `zoomOut()` ajustan el factor de zoom dentro de unos límites establecidos y marcan la estela para que se vuelva a rasterizar a la nueva escala, conservando así la nitidez del trazo vectorial al ampliar.

```ts
private onAction(action: CanvasAction): void {
  switch (action) {
    case 'play':
      this.patternService.beginSession(this.params);
      this.isPaused = false;
      this.isDrawing = true;
      break;
    case 'pause':
      if (!this.isPaused) this.patternService.endSession();
      this.isPaused = !this.isPaused;
      break;
    case 'clear':
      this.clearPending = true;
      break;
    case 'undo': {
      const last = this.patternService.sessions.at(-1);
      this.angle1 = last?.endAngle1 ?? 0;
      this.angle2 = last?.endAngle2 ?? 0;
      this.prevTipX = last?.endTipX ?? 0;
      this.prevTipY = last?.endTipY ?? 0;
      this.firstPoint = last?.endFirstPoint ?? true;
      this.isPaused = true; this.isDrawing = false;
      this.trailDirty = true;
      break;
    }
    // ... casos 'reset' e 'import-json' ...
  }
}
```

*Figura 6.24: `onAction` traduce cada acción recibida del servicio en un cambio de estado del lienzo (`canvas.ts`).*

#### Panel de control — `Controls`

**`onParamChange`, `applyPreset` y `toggleMode`.** Este conjunto de métodos gestiona la interacción del usuario con los parámetros. El método `onParamChange()` se ejecuta cada vez que se modifica un parámetro y envía la nueva configuración al servicio, lo que redibuja el patrón al instante. Por su parte, `applyPreset()` carga un ejemplo predefinido (RF7), fusionando sus valores sobre los valores por defecto para dejar el panel en un estado completo y reproducible. Finalmente, `toggleMode()` permite alternar entre los dos modos de visualización —curva e intersección de líneas— (RF8).

```ts
onParamChange(): void {
  // Una edición manual deja de corresponder a un ejemplo: el desplegable vuelve a vacío.
  this.selectedPresetId = '';
  this.patternService.updateParams({ ...this.params });
}

applyPreset(): void {
  const preset = this.presets.find((p) => p.id === this.selectedPresetId);
  this.params = preset
    ? { ...DEFAULT_PARAMS, ...preset.params }   // fusiona el ejemplo sobre los valores por defecto
    : { ...DEFAULT_PARAMS };
  this.patternService.updateParams({ ...this.params });
}
```

*Figura 6.25: `onParamChange` (edición manual) y `applyPreset` (carga de un ejemplo) (`controls.ts`).*

**Acciones de animación — `play`, `pause`, `clear`, `reset`.** Estas funciones gobiernan la animación delegando en el servicio. Los métodos `play()` y `pause()` inician y detienen el dibujo (RF4). El método `clear()` implementa el deshacer incremental, retirando la última sesión y restaurando los parámetros previos. Por último, `reset()` reinicia la animación, vacía el lienzo para empezar de cero (RF5) y restablece toda la configuración a sus valores por defecto (RF13). Asimismo, la marca interna `isPlaying` controla el bloqueo de los parámetros mientras la animación está en curso, evitando estados inconsistentes.

```ts
play(): void {
  this.isPlaying = true;
  this.patternService.dispatch('play');
}

pause(): void {
  this.isPlaying = false;
  this.patternService.dispatch('pause');
}

clear(): void {                       // deshacer la última sesión
  if (this.isPlaying) this.pause();
  const removed = this.patternService.removeLastSession();
  if (removed) {
    const last = this.patternService.sessions.at(-1);
    this.params = { ...(last ? last.params : removed.params) };
    this.patternService.updateParams(this.params);
  }
  this.patternService.dispatch('undo');
}

reset(): void {
  this.params = { ...DEFAULT_PARAMS };
  this.selectedPresetId = '';
  this.isPlaying = false;
  this.patternService.updateParams(this.params);
  this.patternService.dispatch('reset');
}
```

*Figura 6.26: acciones de animación — `play`, `pause`, `clear` (deshacer) y `reset` (`controls.ts`).*

**`randomize` y `clampParams`.** El método `randomize()` genera una variación aleatoria del patrón (RF12). Para ello, asigna a cada parámetro un valor al azar dentro de su rango válido y respetando su paso, además de un color aleatorio, de modo que el resultado sea siempre reproducible de forma manual por el usuario. Por su parte, `clampParams()` se encarga de la validación de la entrada: tras editar un campo, comprueba cada valor y, si se ha salido del rango permitido o no es numérico, lo ajusta al mínimo o al máximo correspondiente, evitando así configuraciones inválidas (RNF10).

```ts
randomize(): void {
  const next = { ...this.params };
  for (const key of Object.keys(PARAM_RANGES) as NumericParam[]) {
    if (key === 'lineInterval') continue;          // el intervalo solo lo cambia el usuario
    next[key] = this.randInRange(PARAM_RANGES[key]);
  }
  next.lineColor = this.randColor();
  this.params = next;
  this.selectedPresetId = '';
  this.patternService.updateParams({ ...this.params });
}

clampParams(): void {
  for (const key of Object.keys(PARAM_RANGES) as NumericParam[]) {
    const { min, max } = PARAM_RANGES[key];
    const value = this.params[key];
    if (typeof value !== 'number' || Number.isNaN(value)) {
      this.params[key] = min;
    } else if (value < min) {
      this.params[key] = min;
    } else if (value > max) {
      this.params[key] = max;
    }
  }
  this.patternService.updateParams({ ...this.params });
}
```

*Figura 6.27: `randomize` (variación aleatoria dentro de rango, RF12) y `clampParams` (validación de entrada, RNF10) (`controls.ts`).*

**Exportación e importación de patrones — `exportJson`, `triggerImport`, `onFileSelected`.** Estas funciones permiten guardar y recuperar composiciones sin necesidad de una base de datos (RF7). El método `exportJson()` serializa las sesiones grabadas —incluida la activa, si la hubiera— en un archivo JSON descargable. Para la importación, `triggerImport()` abre el selector de archivos del navegador y, una vez elegido uno, `onFileSelected()` lo lee y valida su estructura. Si el archivo es correcto, reconstruye el dibujo mediante `replaySessionsToLines()` y restaura los parámetros del patrón; en caso contrario, la importación se descarta de forma silenciosa para no interrumpir la experiencia del usuario.

```ts
exportJson(): void {
  const completed = [...this.patternService.sessions];
  const active = this.patternService.snapshotActiveSession();
  const allSessions = active ? [...completed, active] : completed;
  if (allSessions.length === 0) return;

  const data = {
    metadata: { exportedAt: new Date().toISOString(), totalSessions: allSessions.length,
                visualizationMode: this.params.visualizationMode },
    sessions: allSessions,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  // ... crea un enlace temporal y descarga el archivo .json ...
}
```

```ts
private onFileSelected(event: Event): void {
  // ... lee el archivo con FileReader ...
  const data = JSON.parse(e.target?.result as string);
  if (!data?.sessions || !Array.isArray(data.sessions) || data.sessions.length === 0) return;  // validación
  for (const s of data.sessions) {
    if (!s.params || typeof s.frameCount !== 'number') return;
  }
  const computedLines = this.patternService.replaySessionsToLines(data.sessions);   // reconstrucción
  // ... restaura params e importState y lanza dispatch('import-json') ...
}
```

*Figura 6.28: exportación (`exportJson`) e importación con validación (`onFileSelected`) de composiciones en formato JSON (`controls.ts`).*

#### Diálogo de exportación — `ExportModal`

**`buildExportCanvas`, `renderPreview`, `save`.** Este conjunto de métodos se encarga de generar la imagen final de la composición (RF6). El método `buildExportCanvas()` construye, sobre un lienzo auxiliar en memoria, la imagen de exportación: primero pinta el fondo —o lo deja transparente—, a continuación dibuja todas las líneas del historial a calidad vectorial y, opcionalmente, añade las guías orbitales y el punto central, aplicando el zoom y el factor de resolución elegidos. Por su parte, `renderPreview()` reutiliza ese mismo lienzo para mostrar una previsualización escalada, y se vuelve a invocar cada vez que el usuario cambia una opción, de modo que la vista previa refleje siempre el resultado real. Finalmente, el método `save()` genera la imagen a partir del lienzo de exportación y la descarga como archivo PNG.

```ts
private buildExportCanvas(): HTMLCanvasElement {
  const { w: canvasW, h: canvasH } = this.patternService.canvasDimensions;
  const result = document.createElement('canvas');
  const outputW = Math.round(canvasW * this.exportScale);
  const outputH = Math.round(canvasH * this.exportScale);
  result.width = outputW; result.height = outputH;
  const ctx = result.getContext('2d')!;

  if (this.options.bgColor !== 'transparent') {
    ctx.fillStyle = this.options.bgColor;
    ctx.fillRect(0, 0, outputW, outputH);
  }

  const history = this.patternService.lineHistory;
  const drawScale = this.exportZoom * this.exportScale;
  ctx.save();
  ctx.translate(outputW / 2, outputH / 2);
  ctx.scale(drawScale, drawScale);
  for (const ln of history) {                       // dibuja las líneas a calidad vectorial
    ctx.strokeStyle = `rgba(${ln.r},${ln.g},${ln.b},${ln.a / 255})`;
    ctx.lineWidth = ln.sw;
    ctx.beginPath();
    ctx.moveTo(ln.x1, ln.y1);
    ctx.lineTo(ln.x2, ln.y2);
    ctx.stroke();
  }
  // ... guías orbitales y punto central opcionales ...
  ctx.restore();
  return result;
}
```

*Figura 6.29: `buildExportCanvas` redibuja la composición desde los vectores de `lineHistory`, a la resolución elegida (`export-modal.ts`).*

```ts
save(): void {
  const exportCanvas = this.buildExportCanvas();
  const link = document.createElement('a');
  link.download = this.resolvedFileName;
  link.href = exportCanvas.toDataURL('image/png');
  link.click();
}
```

*Figura 6.30: `save` genera la imagen final y la descarga como archivo PNG (`export-modal.ts`).*

#### Internacionalización — `I18nService` y `TranslatePipe`

El soporte multilingüe (RF14) se ha resuelto mediante un sistema de internacionalización propio que funciona en tiempo de ejecución. El servicio `I18nService` mantiene el idioma activo en una señal reactiva y ofrece los métodos `setLang()`, que cambia y persiste el idioma, y `translate()`, que resuelve una clave de texto al idioma actual. Asimismo, el método `detectInitialLang()` se encarga de elegir el idioma al arrancar la aplicación, tomando primero la preferencia guardada del usuario y, en su defecto, el idioma del navegador. Los textos se almacenan en diccionarios JSON anidados, uno por idioma. Por último, cabe destacar que el `TranslatePipe` (empleado en las plantillas como `| t`) es un pipe impuro a propósito: al reevaluarse en cada ciclo de detección de cambios, consigue que al cambiar de idioma toda la interfaz se traduzca de forma instantánea, sin necesidad de recargar la página.

```ts
setLang(lang: Lang): void {
  this.lang.set(lang);
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
}

translate(key: string): string {
  const value = key
    .split('.')
    .reduce<string | Dict | undefined>(
      (node, part) => (node && typeof node === 'object' ? node[part] : undefined),
      DICTS[this.lang()],
    );
  return typeof value === 'string' ? value : key;
}

private detectInitialLang(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (LANGUAGES.some((l) => l.code === saved)) return saved as Lang;
  const browser = (navigator.language || '').toLowerCase();
  const match = LANGUAGES.find((l) => browser.startsWith(l.code));
  return match ? match.code : DEFAULT_LANG;
}
```

*Figura 6.31: `I18nService` — cambio de idioma (`setLang`), resolución de claves (`translate`) y detección inicial (`detectInitialLang`) (`i18n.service.ts`).*

```ts
@Pipe({ name: 't', standalone: true, pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  transform(key: string): string {
    return this.i18n.translate(key);
  }
}
```

*Figura 6.32: `TranslatePipe`, pipe impuro (`pure: false`) que se reevalúa en cada ciclo de detección de cambios para traducir al instante (`translate.pipe.ts`).*

### 6.2.4. Persistencia e integración

A diferencia de una aplicación que se apoya en servicios externos como una base de datos en la nube, *Epicycloid Generator* funciona por completo en el lado del cliente. No obstante, sí integra varios mecanismos de **persistencia ligera** y de **entrada/salida de datos** que cumplen el papel que en otras arquitecturas desempeñaría el servidor.

**Persistencia local con `localStorage`.** Las preferencias que deben sobrevivir entre visitas se guardan en el **almacenamiento local del navegador**: el idioma elegido, que `I18nService` recupera al arrancar, y la marca «No volver a mostrar» del tutorial, que evita que la ventana de bienvenida reaparezca. Es un almacenamiento sencillo, sin sesión ni servidor, suficiente para el alcance de la aplicación.

**Entrada y salida de composiciones (JSON).** En lugar de almacenar las composiciones en una base de datos remota, la aplicación permite **exportarlas e importarlas como archivos JSON**. Al exportar, las sesiones se serializan en un archivo que el usuario descarga; al importar, ese archivo se valida y se reconstruye fielmente el dibujo. Este enfoque otorga al usuario el control total de sus creaciones —puede guardarlas, archivarlas o compartirlas— sin necesidad de registro ni de infraestructura de servidor.

**Exportación de imágenes (PNG).** La composición puede guardarse también como imagen PNG mediante el diálogo de exportación. La imagen se genera en el navegador, a resolución configurable y con calidad vectorial, y se descarga directamente.

**Despliegue.** Al ser una SPA sin componente de servidor, su despliegue se reduce a publicar los archivos estáticos resultantes de la compilación en un servicio de **alojamiento estático** (Netlify), accesible desde cualquier navegador moderno (RNF12). Esto simplifica la puesta en producción y elimina los costes y la complejidad de mantener una infraestructura de *backend*.

