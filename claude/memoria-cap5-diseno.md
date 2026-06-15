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

En este apartado se presentan los diagramas de secuencia que describen el flujo de las operaciones clave del sistema, detallando cómo colaboran sus distintos elementos para llevarlas a cabo. Además, se explican las decisiones visuales tomadas para la interfaz de la aplicación, priorizando la claridad, la accesibilidad y la coherencia estética.

A diferencia de la aplicación en que se inspira esta estructura, *Epicycloid Generator* es una aplicación web de página única, sin inicio de sesión ni navegación entre múltiples pantallas. Por ello, las operaciones representadas no corresponden a transiciones entre pantallas, sino a las interacciones significativas del usuario con la única vista de la aplicación (el lienzo y el panel de control).

## 5.1. Diagramas de secuencia de operaciones del sistema

Los diagramas de secuencia de esta sección describen el comportamiento dinámico del sistema durante las operaciones más relevantes, con mayor profundidad que los del capítulo 4. Los mensajes se expresan mediante las **funciones reales** que se ejecutan y las líneas de vida son las **clases del código** que colaboran en cada operación:

- **Usuario:** actor que interactúa con la aplicación.
- **`Controls`:** el panel de control; recoge la edición de parámetros y las acciones del usuario.
- **`Canvas`:** el lienzo; dibuja y anima la composición (integra el bucle de render de p5).
- **`PatternService`:** el servicio que coordina los parámetros, las sesiones de animación y el historial de trazas.
- **`ExportModal`:** el diálogo que reúne las opciones de exportación de imagen.
- **`AppComponent`, `I18nService` y `TranslatePipe`:** intervienen en el cambio de idioma (selector, gestión del idioma activo y traducción de los textos).

Se emplean fragmentos combinados —`loop` (repetición), `alt` (alternativa) y `opt` (opcional)— para reflejar la lógica condicional de cada operación.

### Diagrama de secuencia de la operación «Generar y reproducir el patrón»

Este diagrama representa la operación central de la aplicación. El usuario ajusta los parámetros (`onParamChange()`), que `Controls` traslada a `PatternService` mediante `updateParams()`; el cambio se propaga a `Canvas` a través del observable `params$` y se refleja en `draw()`. Al reproducir (`play()` → `dispatch('play')` → `onAction('play')`), `PatternService` abre una sesión (`beginSession()`) y `Canvas` entra en un bucle (`loop`) dentro de `draw()` que, fotograma a fotograma, calcula las posiciones, acumula las trazas (`lineHistory.push()`) y avanza la sesión (`incrementSessionFrame()`, `setCurrentState()`). Al pausar (`pause()`), `PatternService` cierra la sesión (`endSession()`), registrándola como un bloque.

*(Aquí va la Figura 5.1: Diagrama de secuencia «Generar y reproducir el patrón» — ver anexo.)*

### Diagrama de secuencia de la operación «Deshacer última sesión»

Este diagrama ilustra el deshacer incremental. Al solicitar deshacer (`clear()`), un primer fragmento `alt` contempla que, si hay una animación en curso, se pausa primero (`pause()`, que cierra la sesión activa). Después se invoca `removeLastSession()`; un segundo `alt` distingue dos casos: si queda alguna sesión, `PatternService` retira la última (`sessions.pop()`), reconstruye el historial con las restantes (`replaySessionsToLines()`) y `Controls` restaura los parámetros previos (`updateParams()`); si no queda ninguna, el historial se vacía. En ambos casos se notifica a `Canvas` con `dispatch('undo')` → `onAction('undo')` para reconstruir o vaciar la estela.

*(Aquí va la Figura 5.2: Diagrama de secuencia «Deshacer última sesión» — ver anexo.)*

### Diagrama de secuencia de la operación «Exportar imagen»

Este diagrama describe el guardado de la composición como imagen. El usuario abre el diálogo (`showExportModal = true`); `ExportModal` genera la previsualización (`ngAfterViewInit()` → `renderPreview()` → `buildExportCanvas()`), leyendo de `PatternService` los datos de la composición (`getCurrentParams()`, `lineHistory`). Un fragmento `opt` recoge el ajuste opcional de opciones (`onTransparentToggle()`, `onOptionChange()` → `renderPreview()`). Al confirmar (`save()`), `ExportModal` genera la imagen (`buildExportCanvas()` → `toDataURL()`) y la descarga.

*(Aquí va la Figura 5.3: Diagrama de secuencia «Exportar imagen» — ver anexo.)*

### Diagrama de secuencia de la operación «Importar patrón»

Este diagrama representa la recuperación de una composición guardada. El usuario selecciona un archivo (`triggerImport()` → `onFileSelected()`), que `Controls` lee y valida (`JSON.parse()`). Un fragmento `alt` distingue dos rutas: si el archivo es válido, se reconstruyen las líneas (`replaySessionsToLines()`), se actualizan los parámetros (`updateParams()`) y se avisa a `Canvas` (`dispatch('import-json')` → `onAction('import-json')`); si no lo es, la importación se descarta en el bloque `catch`.

*(Aquí va la Figura 5.4: Diagrama de secuencia «Importar patrón» — ver anexo.)*

### Diagrama de secuencia de la operación «Cambiar idioma»

Este diagrama refleja la detección automática y el cambio manual de idioma. Un fragmento `alt` contempla, en el primer acceso, que `I18nService` detecta el idioma del navegador (`detectInitialLang()`). Para el cambio manual, el usuario abre el selector y elige un idioma en `AppComponent` (`selectLang()`), que invoca `setLang()` en `I18nService` (actualiza la señal `lang`, persiste la preferencia en `localStorage` y fija el atributo de idioma del documento); a continuación, el `TranslatePipe` reevalúa (`translate()`) y actualiza todos los textos, sin recargar la página.

*(Aquí va la Figura 5.5: Diagrama de secuencia «Cambiar idioma» — ver anexo.)*

## 5.2. Diseño visual

### 5.2.1. Principios de diseño

El diseño visual de la aplicación influye directamente en su usabilidad y accesibilidad. Esta sección describe cómo se ha aplicado un enfoque coherente y centrado en el usuario, abordando aspectos clave como los colores, la tipografía, la distribución de los elementos y la accesibilidad, para ofrecer una interfaz clara y funcional que permita percibir de inmediato el efecto de cada ajuste sobre la composición.

**Consistencia visual**

Se ha mantenido una coherencia visual en toda la aplicación, utilizando los mismos estilos para botones, márgenes, colores y tipografías, lo que favorece una curva de aprendizaje mínima por parte del usuario. Todos los parámetros siguen el mismo patrón de control (etiqueta, deslizador y campo numérico), y las acciones se agrupan con un estilo de botón uniforme. Además, existe una correspondencia visual directa entre el panel de control y el lienzo, de modo que los elementos relacionados comparten el mismo tratamiento cromático.

**Paleta de colores**

Se ha optado por una paleta equilibrada, en la que predominan los tonos oscuros y neutros para el fondo, combinados con colores vivos para los elementos interactivos. El fondo oscuro realza los trazos luminosos del patrón, favorece la legibilidad en entornos con poca luz y reduce la fatiga visual en sesiones prolongadas. Se ha incorporado además una **codificación cromática semántica**: el azul identifica a la primera órbita y el rojo a la segunda, de forma coherente entre los controles, las guías del lienzo y los planetas, lo que permite al usuario asociar de un vistazo cada control con su elemento. Los botones de acción siguen también un código de color coherente (por ejemplo, verde para reproducir o rojo para restablecer).

**Tipografía**

La fuente utilizada es de tipo *sans-serif*, sencilla y de tamaño medio, lo que facilita la lectura rápida y evita la fatiga visual. Se emplean distintos pesos para diferenciar títulos, subtítulos y textos secundarios: la negrita se reserva para títulos y botones importantes, con el fin de guiar la atención del usuario, mientras que los textos de ayuda y las descripciones auxiliares utilizan un tamaño menor y un tono más tenue.

**Distribución de la interfaz**

La disposición de los elementos sigue una estructura jerárquica y lógica dentro de una única vista, dividida en dos zonas: el **lienzo** ocupa la mayor parte de la pantalla (aproximadamente el 70 %) a la izquierda, y el **panel de control** (aproximadamente el 30 %) a la derecha. Así, parámetros y resultado conviven sin necesidad de cambiar de pantalla, reforzando la edición en tiempo real. Dentro del panel, los controles se ordenan de lo general a lo específico (modo de visualización, órbita 1, órbita 2, ajustes visuales y, plegados por defecto, los parámetros avanzados), y las acciones principales quedan siempre accesibles en la parte inferior. Los elementos secundarios —controles de zoom, ayuda y selector de idioma— se sitúan en esquinas, accesibles pero sin entorpecer la visualización de la composición. Este diseño minimiza el número de pasos para acceder a las funciones relevantes.

**Accesibilidad y adaptabilidad**

El diseño está optimizado para pantallas de diferentes tamaños y resoluciones: el lienzo se redimensiona con la ventana del navegador y el panel se adapta a resoluciones de escritorio y tableta. Se respetan principios de accesibilidad como el contraste adecuado entre el texto y el fondo, las etiquetas descriptivas en los controles y el reflejo del idioma activo en el documento. Asimismo, la validación automática de los valores introducidos y el bloqueo de los controles durante la animación evitan estados inconsistentes, y un tutorial de bienvenida —mostrado en el primer acceso y reabrible en cualquier momento— facilita el uso a personas sin conocimientos previos. El soporte multilingüe contribuye también a que la aplicación sea accesible a un público más amplio.

### 5.2.2. Mockups

Se presentan las principales vistas de la aplicación, con el objetivo de mostrar cómo se ha plasmado gráficamente la experiencia de usuario planteada durante las fases de diseño. Entre ellas destacan: la vista principal con el lienzo y el panel de control; el panel con sus secciones de parámetros (incluida la de parámetros avanzados desplegada); el diálogo de exportación de imagen con su previsualización y opciones; el tutorial de bienvenida; y el selector de idioma desplegado.

*(Aquí van las Figuras 5.6 y siguientes: capturas/mockups de las vistas de la aplicación.)*

---

# Anexo — Construcción de los diagramas de secuencia (Capítulo 5) en Visual Paradigm

> Especificación de cada diagrama de secuencia de diseño. Las líneas de vida son las **clases reales**
> del código y los mensajes son **funciones reales** (pseudocódigo). Para las respuestas se usa
> **mensaje de retorno** (flecha discontinua); para la lógica condicional, **Combined Fragment** de
> tipo `loop`, `alt` u `opt` según se indique.
>
> **Pasos generales en Visual Paradigm:** `File → New → Sequence Diagram`. Coloca las líneas de vida
> (un **Actor** `Usuario` y las **clases** indicadas en cada figura) y traza los **Message** etiquetados
> con el nombre de la función. Para los fragmentos, selecciona los mensajes implicados y `right-click →
> Enclose with → Combined Fragment`, eligiendo el tipo (`loop` / `alt` / `opt`) y escribiendo la condición.

## A.1. Figura 5.1 — «Generar y reproducir el patrón»

**Líneas de vida:** `Usuario`, `Controls`, `PatternService`, `Canvas`.

```plantuml
@startuml SecGenerarReproducir
actor Usuario
participant "Controls" as C
participant "PatternService" as PS
participant "Canvas" as CV

Usuario -> C : onParamChange()
C -> PS : updateParams(params)
PS --> CV : params$ (suscripción)
CV -> CV : draw()

Usuario -> C : play()
C -> PS : dispatch('play')
PS --> CV : onAction('play')
CV -> PS : beginSession(params)

loop cada fotograma mientras isDrawing
  CV -> CV : draw() (computa posiciones, paintLines)
  CV -> PS : lineHistory.push(record)
  CV -> PS : incrementSessionFrame()
  CV -> PS : setCurrentState(...)
end

Usuario -> C : pause()
C -> PS : dispatch('pause')
PS --> CV : onAction('pause')
CV -> PS : endSession()
@enduml
```

## A.2. Figura 5.2 — «Deshacer última sesión»

**Líneas de vida:** `Usuario`, `Controls`, `PatternService`, `Canvas`.

```plantuml
@startuml SecDeshacerSesion
actor Usuario
participant "Controls" as C
participant "PatternService" as PS
participant "Canvas" as CV

Usuario -> C : clear()

alt isPlaying
  C -> C : pause()
  C -> PS : dispatch('pause')
  PS --> CV : onAction('pause') / endSession()
end

C -> PS : removeLastSession()

alt quedan sesiones
  PS -> PS : sessions.pop()
  PS -> PS : replaySessionsToLines(sessions)
  PS --> C : sesión eliminada
  C -> PS : updateParams(prevParams)
else no quedan sesiones
  PS -> PS : lineHistory = []
end

C -> PS : dispatch('undo')
PS --> CV : onAction('undo') (reconstruye o vacía la estela)
CV --> Usuario : mostrar el resultado
@enduml
```

## A.3. Figura 5.3 — «Exportar imagen»

**Líneas de vida:** `Usuario`, `Controls`, `ExportModal`, `PatternService`.

```plantuml
@startuml SecExportarImagenDiseno
actor Usuario
participant "Controls" as C
participant "ExportModal" as EM
participant "PatternService" as PS

Usuario -> C : showExportModal = true
C -> EM : crear <app-export-modal>
EM -> EM : ngAfterViewInit()
EM -> EM : renderPreview()
EM -> PS : getCurrentParams() / lineHistory / canvasDimensions
EM -> EM : buildExportCanvas()
EM --> Usuario : previsualización

opt ajustar opciones de exportación
  Usuario -> EM : onTransparentToggle() / onOptionChange()
  EM -> EM : renderPreview()
end

Usuario -> EM : save()
EM -> EM : buildExportCanvas()
EM -> EM : toDataURL() + descarga
EM --> Usuario : archivo PNG
@enduml
```

## A.4. Figura 5.4 — «Importar patrón»

**Líneas de vida:** `Usuario`, `Controls`, `PatternService`, `Canvas`.

```plantuml
@startuml SecImportarPatronDiseno
actor Usuario
participant "Controls" as C
participant "PatternService" as PS
participant "Canvas" as CV

Usuario -> C : triggerImport()
Usuario -> C : onFileSelected(event)
C -> C : JSON.parse() + validar

alt archivo válido
  C -> PS : replaySessionsToLines(sessions)
  C -> PS : updateParams(lastParams)
  C -> PS : dispatch('import-json')
  PS --> CV : onAction('import-json') (restaura estado)
  CV --> Usuario : mostrar la composición importada
else archivo no válido
  C -> C : catch (descarta la importación)
end
@enduml
```

## A.5. Figura 5.5 — «Cambiar idioma»

**Líneas de vida:** `Usuario`, `AppComponent`, `I18nService`, `TranslatePipe`.

```plantuml
@startuml SecCambiarIdiomaDiseno
actor Usuario
participant "AppComponent" as APP
participant "I18nService" as I18N
participant "TranslatePipe" as TP

alt primer acceso (sin preferencia guardada)
  I18N -> I18N : detectInitialLang()
end

Usuario -> APP : abrir selector (langMenuOpen = true)
Usuario -> APP : selectLang(code)
APP -> I18N : setLang(code)
I18N -> I18N : lang.set(code) + localStorage + document.documentElement.lang
I18N --> TP : (la señal lang cambia)
TP -> I18N : translate(key)
TP --> Usuario : textos actualizados
@enduml
```
