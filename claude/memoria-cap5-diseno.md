# Capítulo 5 — Diseño

> Borrador del apartado de diseño de la memoria del TFG *Epicycloid Generator*.
> **Nivel de diseño**: los diagramas de secuencia detallan, con más profundidad que los del
> capítulo 4, la **colaboración entre las clases reales** del sistema durante las operaciones clave.
> Los mensajes se expresan mediante **funciones reales** (pseudocódigo) y las líneas de vida son las
> **clases del código** (`Controls`, `Canvas`, `PatternService`, `ExportModal`, `AppComponent`,
> `I18nService`, `TranslatePipe`), de modo que sirvan de base directa para la implementación. Los
> diagramas se han elaborado en Visual Paradigm; las especificaciones están en el anexo final.

---

Tras el análisis de los requisitos del proyecto y la posterior elaboración de los respectivos casos de uso, se ha diseñado la estructura que deberá seguir la aplicación durante el desarrollo.

En este apartado se presentan los diagramas de secuencia de las operaciones más representativas del sistema, detallando, con la perspectiva del diseño, cómo colaboran internamente sus componentes para llevarlas a cabo (con mayor detalle que el análisis del capítulo 4). Además, se explican las decisiones visuales tomadas para la interfaz de la aplicación, priorizando la claridad, la accesibilidad y la coherencia estética.

A diferencia de la aplicación en que se inspira esta estructura, *Epicycloid Generator* es una aplicación web de página única, sin inicio de sesión ni navegación entre múltiples pantallas. Por ello, las operaciones representadas no corresponden a transiciones entre pantallas, sino a las interacciones más significativas del usuario con la única vista de la aplicación (el lienzo y el panel de control).

## 5.1. Diagramas de secuencia de operaciones del sistema

Esta sección recoge los diagramas de secuencia de las **operaciones más representativas** del sistema. No se repiten todos los casos de uso (ya analizados en el capítulo 4), sino que se selecciona un conjunto reducido de las operaciones de mayor peso y se describen aquí desde la **perspectiva del diseño**: con mayor detalle sobre cómo colaboran internamente las clases reales (`Controls`, `PatternService`, `Canvas`, `ExportModal`) y los mecanismos que las hacen posibles —como la capa de estela fuera de pantalla o la reconstrucción del dibujo a partir de las sesiones—. Se emplean fragmentos combinados (`loop`, `alt` y `opt`) para reflejar la repetición y la lógica condicional de cada flujo.

### Diagrama de secuencia de la operación «Generar y reproducir el patrón»

Es la operación central de la aplicación. El usuario ajusta los parámetros en el panel de control y el sistema actualiza al instante la representación en el lienzo. Al reproducir, el sistema inicia una sesión de animación y, mediante un bucle (`loop`), dibuja la composición fotograma a fotograma acumulando las trazas. Cuando el usuario pausa, el sistema cierra la sesión y la registra como un bloque, conservando el dibujo. En clave de diseño se aprecia la base de su rendimiento: cada fotograma pinta **solo los segmentos nuevos** sobre una **capa de estela fuera de pantalla** (coste O(1)), y el bucle de p5 corre al margen de la detección de cambios de Angular (modelo *zoneless*).

*(Aquí va la Figura 5.1: Diagrama de secuencia «Generar y reproducir el patrón» — ver anexo.)*

### Diagrama de secuencia de la operación «Deshacer última sesión»

Ilustra el deshacer incremental de la composición. Al solicitar deshacer, un primer bloque condicional (`alt`) contempla que, si hay una animación en curso, el sistema la pausa primero para tomarla como la sesión a eliminar. Un segundo bloque distingue dos casos: si quedan sesiones anteriores, el sistema retira la última y reconstruye el dibujo con las restantes, restaurando los parámetros previos; si no queda ninguna, el lienzo se vacía. El detalle de diseño está en la **reconstrucción**: el servicio reproduce las sesiones restantes para recomputar el historial de trazas y el lienzo lo rerasteriza por completo, apoyándose en el invariante de que, en pausa, el dibujo equivale al *replay* de las sesiones.

*(Aquí va la Figura 5.2: Diagrama de secuencia «Deshacer última sesión» — ver anexo.)*

### Diagrama de secuencia de la operación «Exportar imagen»

Describe el guardado de la composición como imagen. El usuario abre el diálogo de exportación y el sistema genera una previsualización a partir de la composición actual. Un bloque opcional (`opt`) recoge el ajuste de las opciones —fondo, zoom, resolución y elementos visibles—, que actualizan la vista previa. Al confirmar, el sistema genera la imagen final y la descarga. El detalle de diseño es que la imagen **no se captura del lienzo visible**, sino que se **recompone** en un lienzo aparte a partir del historial de trazas y las dimensiones guardadas, aplicando la resolución elegida (1×, 2× o 4×).

*(Aquí va la Figura 5.3: Diagrama de secuencia «Exportar imagen» — ver anexo.)*

## 5.2. Diseño visual

### 5.2.1. Principios de diseño

El diseño visual de la aplicación influye directamente en su usabilidad y accesibilidad. Esta sección describe cómo se ha aplicado un enfoque coherente y centrado en el usuario, abordando aspectos clave como los colores, la tipografía, la distribución de los elementos y la accesibilidad, para ofrecer una interfaz clara y funcional que permita percibir de inmediato el efecto de cada ajuste sobre la composición.

**Consistencia visual**

Se ha mantenido una coherencia visual en toda la aplicación, utilizando los mismos estilos para botones, márgenes, colores y tipografías, lo que favorece una curva de aprendizaje mínima por parte del usuario. Todos los parámetros siguen el mismo patrón de control (etiqueta, deslizador y campo numérico), y las acciones se agrupan con un estilo de botón uniforme. Además, existe una correspondencia visual directa entre el panel de control y el lienzo, de modo que los elementos relacionados comparten el mismo tratamiento cromático.

**Paleta de colores**

Se ha optado por una paleta equilibrada, en la que predominan los tonos oscuros y neutros para el fondo, combinados con colores vivos para los elementos interactivos. El fondo oscuro realza los trazos luminosos del patrón, favorece la legibilidad en entornos con poca luz y reduce la fatiga visual en sesiones prolongadas. Se ha incorporado además una **codificación cromática semántica**: el azul identifica a la primera órbita y el rojo a la segunda, de forma coherente entre los controles, las guías del lienzo y los planetas, lo que permite al usuario asociar de un vistazo cada control con su elemento. Los botones de acción siguen también un código de color coherente (por ejemplo, verde para reproducir o rojo para restablecer).

**Tipografía**

La aplicación emplea la fuente *sans-serif* del sistema (la pila tipográfica por defecto del framework de estilos), sencilla y de tamaño medio, lo que facilita la lectura y ofrece un aspecto nativo en cada plataforma sin cargar fuentes externas. Se usan distintos pesos para diferenciar títulos, subtítulos y textos secundarios —la negrita se reserva para títulos y botones importantes—, y los valores numéricos de los parámetros emplean una fuente monoespaciada que mantiene las cifras alineadas.

**Distribución de la interfaz**

La disposición de los elementos sigue una estructura jerárquica y lógica dentro de una única vista, dividida en dos zonas: el **lienzo** ocupa la mayor parte de la pantalla (aproximadamente el 70 %) a la izquierda, y el **panel de control** (aproximadamente el 30 %) a la derecha. Así, parámetros y resultado conviven sin necesidad de cambiar de pantalla, reforzando la edición en tiempo real. Dentro del panel, los controles se ordenan de lo general a lo específico (un desplegable de ejemplos predefinidos como punto de partida opcional, el modo de visualización, órbita 1, órbita 2, ajustes visuales y, plegados por defecto, los parámetros avanzados), y las acciones principales quedan siempre accesibles en la parte inferior. Los elementos secundarios —controles de zoom, ayuda y selector de idioma— se sitúan en esquinas, accesibles pero sin entorpecer la visualización de la composición. Este diseño minimiza el número de pasos para acceder a las funciones relevantes.

**Accesibilidad y adaptabilidad**

El diseño está optimizado para pantallas de diferentes tamaños y resoluciones: el lienzo se redimensiona con la ventana del navegador y el panel se adapta a resoluciones de escritorio y tableta. Se respetan principios de accesibilidad como el contraste adecuado entre el texto y el fondo, las etiquetas descriptivas en los controles y el reflejo del idioma activo en el documento. Asimismo, la validación automática de los valores introducidos y el bloqueo de los controles durante la animación evitan estados inconsistentes, y un tutorial de bienvenida —mostrado en el primer acceso y reabrible en cualquier momento— facilita el uso a personas sin conocimientos previos. El soporte multilingüe contribuye también a que la aplicación sea accesible a un público más amplio.

### 5.2.2. Mockups

Se presentan las principales vistas de la aplicación, con el objetivo de mostrar cómo se ha plasmado gráficamente la experiencia de usuario planteada durante las fases de diseño. Los mockups se han elaborado con la herramienta de diseño en línea Figma. Entre las vistas representadas destacan: la vista principal con el lienzo y el panel de control; el panel con sus secciones de parámetros (incluida la de parámetros avanzados desplegada); el desplegable de ejemplos predefinidos; el diálogo de exportación de imagen con su previsualización y opciones; el tutorial de bienvenida; y el selector de idioma desplegado.

*(Aquí van las Figuras 5.4 y siguientes: capturas/mockups de las vistas de la aplicación.)*

---

# Anexo — Construcción de los diagramas de secuencia (Capítulo 5) en Visual Paradigm

> Especificación de cada diagrama de secuencia de diseño. Las líneas de vida son las **clases reales**
> del código y los mensajes son **funciones reales** (pseudocódigo). Para las respuestas se usa
> **mensaje de retorno** (flecha discontinua); para la lógica condicional, **Combined Fragment** de
> tipo `loop`, `alt` u `opt` según se indique.
>
> **Pasos generales en Visual Paradigm:** `File → New → Sequence Diagram`. Coloca las líneas de vida
> indicadas en cada figura (las **clases reales** y, solo cuando interviene, el **Actor** `Usuario`) y traza
> los **Message** etiquetados con el nombre de la función. Para los fragmentos, selecciona los mensajes
> implicados y `right-click → Enclose with → Combined Fragment`, eligiendo el tipo (`loop` / `alt` / `opt`)
> y escribiendo la condición.

## A.1. Figura 5.1 — «Generar y reproducir el patrón»

**Líneas de vida:** `Usuario`, `Controls`, `PatternService`, `Canvas`, `trailLayer`.

```plantuml
@startuml SecGenerarReproducir
actor Usuario
participant "Controls" as C
participant "PatternService" as PS
participant "Canvas" as CV
participant "trailLayer\n(offscreen)" as TL

Usuario -> C : onParamChange()
C -> PS : updateParams(params)
PS --> CV : params$ (BehaviorSubject)
CV -> CV : this.params = params

Usuario -> C : play()
C -> PS : dispatch('play')
PS --> CV : action$ -> onAction('play')
CV -> PS : beginSession(params)

loop cada fotograma mientras isDrawing
  CV -> CV : computa la posición de los dos planetas (modelo matemático)
  CV -> TL : pinta SOLO los segmentos nuevos (incremental, O(1))
  CV -> CV : background() + image(trailLayer) + guías y planetas vivos
  CV -> PS : lineHistory.push(record)
  CV -> PS : incrementSessionFrame() / setCurrentState(...)
end

Usuario -> C : pause()
C -> PS : dispatch('pause')
PS --> CV : action$ -> onAction('pause')
CV -> PS : endSession() (registra la sesión como bloque)
@enduml
```

## A.2. Figura 5.2 — «Deshacer última sesión»

**Líneas de vida:** `Usuario`, `Controls`, `PatternService`, `Canvas`, `trailLayer`.

```plantuml
@startuml SecDeshacerSesion
actor Usuario
participant "Controls" as C
participant "PatternService" as PS
participant "Canvas" as CV
participant "trailLayer\n(offscreen)" as TL

Usuario -> C : clear()

alt animación en curso (isPlaying)
  C -> C : pause()
  C -> PS : dispatch('pause') -> endSession()
end

C -> PS : removeLastSession()

alt quedan sesiones
  PS -> PS : sessions.pop()
  loop por cada sesión restante
    PS -> PS : replaySessionsToLines(): reproduce sus fotogramas y reconstruye lineHistory
  end
  PS --> C : devuelve la sesión eliminada
  C -> PS : updateParams(parámetros de la sesión que permanece)
else no quedan sesiones
  PS -> PS : lineHistory = []
end

C -> PS : dispatch('undo')
PS --> CV : action$ -> onAction('undo') (trailDirty = true)
CV -> TL : reconstruye la estela completa desde lineHistory (o la vacía)
CV --> Usuario : muestra el resultado
@enduml
```

## A.3. Figura 5.3 — «Exportar imagen»

**Líneas de vida:** `Usuario`, `Controls`, `ExportModal`, `PatternService`.

```plantuml
@startuml SecExportarImagen
actor Usuario
participant "Controls" as C
participant "ExportModal" as EM
participant "PatternService" as PS

Usuario -> C : showExportModal = true
C -> EM : crear <app-export-modal>
EM -> EM : ngAfterViewInit() -> renderPreview()
EM -> PS : getCurrentParams() / lineHistory / canvasDimensions
EM -> EM : buildExportCanvas(): lienzo nuevo a la escala elegida (1x/2x/4x)
EM -> EM : pinta fondo + rerasteriza lineHistory + (opt) guías y punto central
EM --> Usuario : previsualización

opt ajustar opciones (fondo, zoom, resolución, elementos visibles)
  Usuario -> EM : onTransparentToggle() / onOptionChange()
  EM -> EM : renderPreview() (recompone la vista previa)
end

Usuario -> EM : save()
EM -> EM : buildExportCanvas() -> toDataURL()
EM -> EM : crea el enlace de descarga
EM --> Usuario : archivo PNG
@enduml
```
