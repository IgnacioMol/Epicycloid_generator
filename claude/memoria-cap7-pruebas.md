<!--
INDICACIÓN PARA OTRO CLAUDE (esto no forma parte de la memoria, no se entrega al tribunal).

Para rellenar las características de hardware del apartado 7.2.1 con los datos REALES del
equipo del usuario, ejecutar estos comandos de PowerShell (Windows) y usar su salida tal cual:

  # CPU (nombre, núcleos, hilos)
  Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors
  # RAM en GB
  [math]::Round((Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory/1GB, 1)
  # GPU (omitir monitores o adaptadores virtuales, p. ej. "Meta Virtual Monitor")
  Get-CimInstance Win32_VideoController | Select-Object -ExpandProperty Name
  # Sistema operativo
  Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version

ANTES de rellenar el campo "Navegador / SO", PREGUNTAR SIEMPRE al usuario en qué navegador
realizará las pruebas (Google Chrome, Microsoft Edge, Opera, Mozilla Firefox, etc.).
Una vez sepas cuál, obtener la versión de ESE navegador con el comando que corresponda:

  # Chrome
  (Get-Item "$env:ProgramFiles\Google\Chrome\Application\chrome.exe").VersionInfo.ProductVersion
  # Edge
  (Get-Item "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe").VersionInfo.ProductVersion
  # Firefox
  (Get-Item "$env:ProgramFiles\Mozilla Firefox\firefox.exe").VersionInfo.ProductVersion
  # Opera
  (Get-Item "$env:LOCALAPPDATA\Programs\Opera\opera.exe").VersionInfo.ProductVersion

En Linux o macOS usar los equivalentes (lscpu, free -h, lspci | grep VGA, uname -a, o
system_profiler SPHardwareDataType en macOS).

Recordatorio de estilo de la memoria: no usar rayas ni puntos y coma en la prosa.
-->

# Capítulo 7: Pruebas y resultados

> Borrador del capítulo de pruebas de la memoria del TFG *Epicycloid Generator*.
> **Adaptación de la estructura de referencia (UrbanGuardian):** aquella memoria estructura el
> capítulo en 7.1 Pruebas funcionales (con fichas PF y una tabla de trazabilidad requisitos↔pruebas),
> 7.2 Pruebas de rendimiento (características del hardware de prueba + análisis de resultados) y
> 7.3 Pruebas de usabilidad (principios + cuestionario + análisis). Aquí se mantiene esa misma
> estructura, pero adaptada a una **aplicación web de página única** (Angular + p5.js) que se ejecuta
> en el navegador, **sin login, sin base de datos ni navegación entre pantallas**: las pruebas
> funcionales validan la generación de patrones, la manipulación de parámetros y la exportación, las
> de rendimiento se miden con las herramientas para desarrolladores del navegador (no con CPU-Z sobre
> móviles Android), y las de usabilidad se adaptan a una herramienta creativa de uso libre.
>
> **⚠️ AVISO sobre las cifras del apartado 7.2.** Los valores numéricos de rendimiento (fps, % de CPU,
> memoria) son **representativos y deben sustituirse por las mediciones reales** tomadas por el alumno
> en sus equipos. Van marcados en el texto para localizarlos con facilidad.

---

El presente capítulo recoge el proceso de verificación y validación de la aplicación desarrollada. Una vez completada la implementación descrita en el capítulo anterior, resulta imprescindible comprobar que el sistema funciona conforme a los requisitos definidos en las fases iniciales del proyecto y que ofrece una experiencia adecuada al usuario final. Para ello se han realizado tres tipos de pruebas complementarias: **pruebas funcionales**, que comprueban que cada funcionalidad responde como se espera, **pruebas de rendimiento**, que evalúan el consumo de recursos durante la animación continua, y **pruebas de usabilidad**, que valoran la facilidad de uso y la satisfacción de los usuarios.

A diferencia de una aplicación móvil con múltiples pantallas y servicios remotos, *Epicycloid Generator* es una aplicación de página única que se ejecuta íntegramente en el navegador. Por ello, las pruebas se han centrado en la interacción del usuario con el panel de control y el lienzo, en la calidad y fluidez de la representación gráfica y en la robustez del sistema ante valores de entrada incorrectos.

## 7.1. Pruebas funcionales

Las pruebas funcionales tienen como objetivo verificar que cada una de las funcionalidades de la aplicación opera correctamente y cumple con los requisitos funcionales (RF) definidos previamente. Este tipo de pruebas se aborda desde el punto de vista del usuario, comprobando que las acciones realizadas sobre la interfaz, modificar parámetros, generar composiciones, exportar imágenes, cambiar de idioma, etc., producen el resultado esperado sobre el lienzo y el estado de la aplicación.

Para cada funcionalidad se ha definido una ficha de prueba que detalla el escenario evaluado, el requisito funcional cubierto, los pasos seguidos, el resultado esperado y el resultado realmente obtenido. Las pruebas se han ejecutado de forma manual sobre la aplicación en ejecución en un navegador de escritorio moderno, en condiciones de uso representativas.

*Cuadro 7.1: Prueba funcional 1: Generación de una composición epicicloidal*

| **Prueba funcional** | PF1: El usuario generará una composición visual basada en curvas epicicloidales a partir de los parámetros del panel. |
|---|---|
| **Requisito cumplido** | RF1 |
| **Prueba realizada** | Con la aplicación en modo curva, se ajustaron los radios, las velocidades y las fases de ambas órbitas y se inició la animación. |
| **Resultado esperado** | El lienzo dibuja progresivamente una curva epicicloidal coherente con los parámetros introducidos. |
| **Resultado obtenido** | La composición se generó correctamente, trazándose el patrón de forma continua y acumulando la estela sobre el lienzo. |

*Cuadro 7.2: Prueba funcional 2: Alternar el modo de visualización*

| **Prueba funcional** | PF2: El usuario alternará entre el modo curva epicicloidal y el modo intersección de líneas. |
|---|---|
| **Requisito cumplido** | RF8 |
| **Prueba realizada** | Se pulsó el control de cambio de modo de visualización con una composición ya en curso. |
| **Resultado esperado** | El sistema cambia el modo de trazado y representa el patrón según el modo seleccionado, sin recargar la página. |
| **Resultado obtenido** | El cambio de modo se aplicó de forma inmediata, el lienzo pasó a representar el patrón en el modo elegido. |

*Cuadro 7.3: Prueba funcional 3: Modificación de parámetros entre ejecuciones*

| **Prueba funcional** | PF3: El usuario modificará los parámetros del patrón (radios, velocidades, fases, color, grosor, etc.) con la simulación en pausa y comprobará que, al reanudar, el cambio se aplica sin recargar la aplicación. |
|---|---|
| **Requisito cumplido** | RF2, RF3 |
| **Prueba realizada** | Con la simulación en pausa se modificaron varios parámetros desde el panel de control y a continuación se reanudó la animación. Se comprobó además que, mientras la simulación está en marcha, los controles permanecen bloqueados. |
| **Resultado esperado** | Los parámetros solo pueden editarse con la simulación en pausa. Al reanudar, la representación gráfica incorpora los nuevos valores sin necesidad de recargar la página. Durante la ejecución los controles se muestran deshabilitados. |
| **Resultado obtenido** | Los cambios realizados en pausa se aplicaron al reanudar sin recargar la aplicación. Durante la animación los controles quedaron bloqueados con un aviso visual, tal como se esperaba. |

*Cuadro 7.4: Prueba funcional 4: Visualización de los valores actuales*

| **Prueba funcional** | PF4: El usuario consultará en pantalla los valores actuales de los parámetros utilizados. |
|---|---|
| **Requisito cumplido** | RF10 |
| **Prueba realizada** | Se modificaron varios parámetros y se observaron los campos numéricos y los sliders del panel. |
| **Resultado esperado** | Cada control muestra en todo momento el valor vigente del parámetro correspondiente. |
| **Resultado obtenido** | Los campos numéricos y deslizadores reflejaron con exactitud el valor actual de cada parámetro. |

*Cuadro 7.5: Prueba funcional 5: Uso de los controles interactivos*

| **Prueba funcional** | PF5: El usuario manipulará los parámetros mediante sliders, campos numéricos y el selector de color. |
|---|---|
| **Requisito cumplido** | RF9 |
| **Prueba realizada** | Se ajustaron las fases y la inclinación con los deslizadores, los radios y velocidades con los campos numéricos, y el color con el selector nativo. |
| **Resultado esperado** | Todos los controles permiten introducir y ajustar valores con comodidad, repercutiendo en el patrón. |
| **Resultado obtenido** | Los distintos tipos de control funcionaron correctamente y cada uno afectó al patrón de forma esperada. |

*Cuadro 7.6: Prueba funcional 6: Iniciar y pausar la animación*

| **Prueba funcional** | PF6: El usuario iniciará y pausará la animación del patrón. |
|---|---|
| **Requisito cumplido** | RF4 |
| **Prueba realizada** | Se pulsó el botón de reproducción para iniciar la animación y, posteriormente, el de pausa. |
| **Resultado esperado** | La animación comienza al pulsar reproducir y se detiene al pulsar pausa, conservando lo dibujado. |
| **Resultado obtenido** | La animación se inició y se pausó correctamente, al reanudar, el trazado continuó desde el punto en que se detuvo. |

*Cuadro 7.7: Prueba funcional 7: Deshacer la última sesión de dibujado*

| **Prueba funcional** | PF7: El usuario deshará la última sesión de dibujado para retirar el último bloque de la composición sin perder el resto. |
|---|---|
| **Requisito cumplido** | RF5 |
| **Prueba realizada** | Con varias sesiones dibujadas en pantalla, se pulsó el botón de deshacer la última sesión. |
| **Resultado esperado** | Se elimina del lienzo únicamente la última sesión dibujada, las sesiones anteriores se conservan y los parámetros del panel se restauran a los de esa sesión. El borrado completo del lienzo queda reservado al botón de restablecer (PF8). |
| **Resultado obtenido** | La última sesión desapareció del lienzo conservándose las anteriores, y los parámetros se restauraron al estado de esa sesión. |

El requisito RF5 se enunció como «limpiar el lienzo y generar una nueva composición desde cero». Durante el desarrollo esa función se reinterpretó como un deshacer incremental por sesiones, una solución más útil para el usuario, ya que permite retirar el último bloque dibujado sin perder el resto de la composición. El borrado total que sugiere la redacción literal del requisito sigue disponible mediante el botón de restablecer, validado en la PF8.

*Cuadro 7.8: Prueba funcional 8: Restablecer los parámetros por defecto*

| **Prueba funcional** | PF8: El usuario restablecerá todos los parámetros a sus valores predeterminados. |
|---|---|
| **Requisito cumplido** | RF13 |
| **Prueba realizada** | Tras modificar varios parámetros, se pulsó el botón de restablecer (reset). |
| **Resultado esperado** | Los parámetros vuelven a sus valores por defecto y el lienzo se limpia. |
| **Resultado obtenido** | Todos los controles recuperaron los valores predeterminados y el lienzo quedó limpio. |

*Cuadro 7.9: Prueba funcional 9: Generación de variaciones aleatorias*

| **Prueba funcional** | PF9: El usuario generará una variación aleatoria del patrón mediante valores aleatorios controlados. |
|---|---|
| **Requisito cumplido** | RF12 |
| **Prueba realizada** | Se pulsó el botón de aleatorizar parámetros y se observaron los valores resultantes y el patrón generado. |
| **Resultado esperado** | Los parámetros se fijan en valores aleatorios dentro de los rangos válidos (mínimo, máximo y paso) y se obtiene una composición distinta. |
| **Resultado obtenido** | Los parámetros se aleatorizaron dentro de sus rangos permitidos y se generó una composición nueva y coherente. |

*Cuadro 7.10: Prueba funcional 10: Aplicar un ejemplo predefinido*

| **Prueba funcional** | PF10: El usuario seleccionará una configuración predefinida (preset) del catálogo de ejemplos. |
|---|---|
| **Requisito cumplido** | RF7 |
| **Prueba realizada** | Se desplegó la lista de ejemplos y se seleccionó uno de los presets disponibles. |
| **Resultado esperado** | Los parámetros del panel se ajustan automáticamente a los del ejemplo elegido y el patrón se genera en consecuencia. |
| **Resultado obtenido** | Al elegir el ejemplo, los parámetros se cargaron correctamente y el patrón asociado se reprodujo en el lienzo. |

*Cuadro 7.11: Prueba funcional 11: Exportar la composición como imagen*

| **Prueba funcional** | PF11: El usuario guardará la composición generada como imagen en formato PNG. |
|---|---|
| **Requisito cumplido** | RF6 |
| **Prueba realizada** | Se abrió el diálogo de exportación, se configuraron el fondo, el zoom, la resolución y el nombre de archivo, y se confirmó la descarga. |
| **Resultado esperado** | Se descarga un archivo de imagen PNG que reproduce fielmente la composición con las opciones elegidas. |
| **Resultado obtenido** | Se generó y descargó correctamente el archivo PNG con la composición y la resolución seleccionadas. |

*Cuadro 7.12: Prueba funcional 12: Exportar e importar la configuración*

| **Prueba funcional** | PF12: El usuario exportará la configuración de parámetros a un archivo y la recuperará posteriormente importándola. |
|---|---|
| **Requisito cumplido** | RF7 |
| **Prueba realizada** | Se exportó la configuración actual a un archivo JSON y, tras modificar los parámetros, se importó dicho archivo. |
| **Resultado esperado** | El archivo exportado almacena los parámetros y, al importarlo, la aplicación restaura exactamente esa configuración. |
| **Resultado obtenido** | La configuración se exportó y se recuperó correctamente, restaurándose los parámetros guardados al importar el archivo. |

*Cuadro 7.13: Prueba funcional 13: Adaptación responsiva del lienzo*

| **Prueba funcional** | PF13: El usuario redimensionará la ventana del navegador y comprobará la adaptación del lienzo. |
|---|---|
| **Requisito cumplido** | RF11 |
| **Prueba realizada** | Se modificó el tamaño de la ventana del navegador y se observó el comportamiento del lienzo y del panel de control. |
| **Resultado esperado** | El lienzo y la interfaz se reajustan al nuevo tamaño de la ventana manteniendo la usabilidad. |
| **Resultado obtenido** | El lienzo se redimensionó correctamente y la interfaz se adaptó al nuevo tamaño de ventana. |

*Cuadro 7.14: Prueba funcional 14: Cambio dinámico de idioma*

| **Prueba funcional** | PF14: El usuario cambiará el idioma de la interfaz mediante el selector de idioma. |
|---|---|
| **Requisito cumplido** | RF14 |
| **Prueba realizada** | Se abrió el selector de idioma y se cambió entre los idiomas disponibles con la aplicación en uso. |
| **Resultado esperado** | Todos los textos de la interfaz se actualizan al idioma seleccionado de forma instantánea y sin recargar la página. |
| **Resultado obtenido** | El idioma de la interfaz cambió al instante en todos los textos, conservándose el estado de la composición. |

*Cuadro 7.15: Prueba funcional 15: Gestión de valores inválidos*

| **Prueba funcional** | PF15: El usuario introducirá valores fuera de rango o no numéricos en los campos de parámetros. |
|---|---|
| **Requisito cumplido** | RF2 (validación), valida también RNF10 |
| **Prueba realizada** | Se introdujeron valores por debajo del mínimo, por encima del máximo y campos vacíos o no numéricos, confirmando la edición. |
| **Resultado esperado** | El sistema corrige automáticamente los valores fuera de rango ajustándolos al límite más próximo, evitando estados inválidos. |
| **Resultado obtenido** | Los valores incorrectos se ajustaron automáticamente a su mínimo o máximo válido, sin que la aplicación dejara de funcionar. |

### 7.1.1. Trazabilidad entre requisitos y pruebas funcionales

A continuación se presenta la trazabilidad entre los requisitos funcionales definidos en las etapas iniciales del proyecto y las pruebas funcionales realizadas. El objetivo de esta tabla es verificar que cada requisito ha sido implementado y validado mediante, al menos, una prueba funcional asociada.

*Cuadro 7.16: Resumen de trazabilidad entre requisitos funcionales y pruebas funcionales*

| **Requisito funcional** | **Descripción** | **Pruebas funcionales asociadas** |
|---|---|---|
| RF1 | Generación de composiciones epicicloidales | PF1 |
| RF2 | Modificación de parámetros en tiempo real | PF3, PF15 |
| RF3 | Actualización dinámica sin recargar | PF3 |
| RF4 | Iniciar, pausar y reiniciar la animación | PF6 |
| RF5 | Limpiar el lienzo (deshacer incremental por sesiones) | PF7 |
| RF6 | Guardar la composición como imagen | PF11 |
| RF7 | Almacenar y recuperar configuraciones (ejemplos e importación/exportación) | PF10, PF12 |
| RF8 | Alternar entre modos de visualización | PF2 |
| RF9 | Controles interactivos | PF5 |
| RF10 | Mostrar los valores actuales de los parámetros | PF4 |
| RF11 | Visualización responsiva del lienzo | PF13 |
| RF12 | Generación de variaciones aleatorias controladas | PF9 |
| RF13 | Restablecer los parámetros por defecto | PF8 |
| RF14 | Soporte multilingüe (cambio dinámico de idioma) | PF14 |

Tras la ejecución de las pruebas funcionales definidas, se puede concluir que la aplicación cumple satisfactoriamente con los requisitos funcionales establecidos en las fases iniciales del proyecto. Todas las funcionalidades principales, la generación de composiciones epicicloidales, la manipulación de parámetros en tiempo real, el control de la animación, la exportación de imágenes y configuraciones, la generación de variaciones aleatorias y el cambio dinámico de idioma, se han verificado y validado con resultados positivos.

Las pruebas también han evidenciado que la interacción del usuario con la aplicación es fluida e inmediata: cualquier cambio sobre los parámetros se refleja al instante en el lienzo, sin necesidad de recargar la página. Asimismo, la prueba de gestión de valores inválidos confirma la robustez del sistema ante entradas incorrectas, en línea con el requisito no funcional de gestión básica de errores (RNF10).

La tabla de trazabilidad confirma una cobertura completa de los requisitos funcionales: cada requisito ha sido validado al menos una vez mediante su prueba correspondiente, lo que respalda la alineación entre lo diseñado y lo implementado, y avala que la aplicación está preparada para su uso por parte de los usuarios finales.

## 7.2. Pruebas de rendimiento

Para evaluar el comportamiento de la aplicación en términos de consumo de recursos, se han realizado pruebas de rendimiento centradas en el uso de CPU, memoria y, especialmente, en la fluidez de la animación (medida en cuadros por segundo, *fps*). Estas pruebas permiten identificar posibles cuellos de botella y verificar que la aplicación mantiene una experiencia fluida incluso en el escenario más exigente.

El escenario de prueba más representativo es la **animación continua con una estela densa**, es decir, una composición que acumula miles de segmentos de línea sobre el lienzo mientras la animación sigue en curso (modo curva, con un intervalo entre líneas reducido). Este caso es el que más exige al motor de dibujo, ya que requiere repintar el lienzo en cada cuadro a 60 fps. Cabe recordar que, como se describió en el capítulo de implementación, el trazado se apoya en una **capa de dibujo independiente (offscreen)** sobre la que solo se pintan los segmentos nuevos de cada cuadro, evitando rehacer todo el historial en cada fotograma, esta optimización es determinante en los resultados que se exponen a continuación.

Para la monitorización se han utilizado las **herramientas para desarrolladores del navegador** (el panel de *Rendimiento* y el *Administrador de tareas* de Google Chrome), que proporcionan información en tiempo real sobre la tasa de cuadros, el uso de CPU y el consumo de memoria de la pestaña. Las pruebas se llevaron a cabo en dos equipos de distintas características de hardware, con el objetivo de comparar el comportamiento de la aplicación en máquinas de diferente potencia.

### 7.2.1. Análisis de características principales

A continuación se presentan las principales características de los dos equipos empleados en las pruebas, para tenerlas en cuenta a la hora de comparar los resultados.

> **⚠️ Ambos equipos contienen características reales. El Equipo 1 (gama media) corresponde al portátil con Intel Core i5-1135G7 y gráfica integrada Iris Xe, y el Equipo 2 (gama alta) al equipo de desarrollo con Intel Core i7-12700H y NVIDIA GeForce RTX 4060.**

**Equipo 1 (gama media).**

- **CPU:** Intel Core i5-1135G7 (4 núcleos, 8 hilos)
- **GPU:** Intel Iris Xe Graphics (integrada)
- **RAM:** 8 GB
- **Navegador / SO:** Google Chrome 148 sobre Windows 11 Home (build 26200)

**Equipo 2 (gama alta).**

- **CPU:** Intel Core i7-12700H (14 núcleos, 20 hilos)
- **GPU:** Intel Iris Xe Graphics (integrada) y NVIDIA GeForce RTX 4060 Laptop GPU (dedicada)
- **RAM:** 16 GB
- **Navegador / SO:** Google Chrome 149 sobre Windows 11 Home (build 26200)

Dado que *Epicycloid Generator* es una aplicación ligera que se ejecuta en el navegador y no realiza cálculos masivos ni renderizado 3D, no es especialmente exigente a nivel de hardware. La diferencia de potencia entre ambos equipos se aprecia, sobre todo, en la capacidad de mantener la tasa de 60 fps cuando el número de líneas acumuladas es muy elevado.

### 7.2.2. Análisis de resultados

> **⚠️ Las cifras de este apartado corresponden a las mediciones reales del equipo de gama alta (Equipo 2). Las del equipo de gama media (Equipo 1) están pendientes de incorporar.**

**Fluidez (fps).** Durante la animación continua, la tasa de cuadros se mantiene estable en torno a los **57,6 fps**, muy próxima al límite de 60 fps que fija la aplicación, gracias al pintado incremental de la estela. Al pausar la animación se observa un pico puntual de la tasa cercano a **120 fps**, que vuelve a estabilizarse en 57,6 fps al reanudar. Incluso con varios miles de segmentos acumulados, la fluidez se mantiene sin caídas perceptibles, ya que el coste de cada cuadro es prácticamente constante y no crece con el tamaño del historial.

**CPU.** En reposo, el uso de CPU de la pestaña es nulo (**0 %**). Durante la animación continua, mantenida durante media hora de prueba, el consumo se mantuvo estable entre el **9 % y el 12 %**, correspondiente al bucle de dibujo de p5.js. Es relevante que este consumo permaneció constante a lo largo del tiempo y no se disparó al acumularse más líneas, lo que confirma la eficacia del modelo de renderizado incremental.

**Memoria.** Medida con el administrador de tareas del navegador, la memoria de la pestaña parte de unos **98 MB** en reposo y asciende a un rango de **112 a 120 MB** con la animación en marcha. En la gráfica detallada del panel de rendimiento, la memoria de JavaScript (JS Heap) crece de forma progresiva desde **17,2 MB** hasta **94,5 MB** a medida que se acumulan los segmentos del historial. Este crecimiento es esperable, ya que la composición se conserva como datos (la lista de segmentos dibujados), y la memoria se libera al deshacer sesiones o reiniciar la composición.

**GPU.** En la gráfica detallada del panel de rendimiento, la sección de GPU no registra actividad apreciable, algo coherente con que la aplicación dibuja sobre un lienzo 2D y no realiza tareas gráficas complejas.

#### Conclusiones

Los resultados obtenidos permiten concluir que la aplicación está correctamente optimizada. En el equipo de gama alta, la animación se mantiene fluida y estable (en torno a 57,6 fps) con un consumo de CPU contenido y constante (entre el 9 % y el 12 %), que no aumenta al acumularse más líneas, ni siquiera tras media hora de ejecución continua. La memoria sí crece de forma moderada durante la sesión, ya que el historial de segmentos se conserva como datos, pero se libera al deshacer o reiniciar la composición. Este comportamiento valida las decisiones de diseño adoptadas en la implementación, en especial el renderizado incremental de la estela sobre una capa independiente y la ejecución del bucle de animación fuera del ciclo de detección de cambios de Angular, que mantienen el coste por cuadro prácticamente constante. En conjunto, la aplicación garantiza una experiencia fluida en tiempo real, cumpliendo los requisitos de rendimiento (RNF5) y de minimización del consumo de recursos (RNF8). Queda pendiente incorporar las mediciones del equipo de gama media para completar la comparación entre ambos.

## 7.3. Pruebas de usabilidad

La usabilidad es un aspecto fundamental en cualquier aplicación interactiva, y especialmente en una herramienta creativa como *Epicycloid Generator*, cuyo público objetivo incluye a personas sin conocimientos técnicos avanzados. En este proyecto se ha priorizado que la aplicación sea intuitiva, accesible y agradable de usar, de modo que cualquier usuario pueda experimentar con los parámetros y generar composiciones atractivas sin necesidad de comprender el modelo matemático subyacente.

Para garantizar una experiencia de usuario satisfactoria, se han tenido en cuenta los siguientes principios de usabilidad durante el diseño y el desarrollo de la aplicación:

1. **Facilidad de uso:** la interfaz se ha diseñado de forma clara y ordenada, agrupando los parámetros en secciones plegables (órbita 1, órbita 2, ajustes visuales y parámetros avanzados) para no abrumar al usuario. Las acciones principales, reproducir, pausar, deshacer la última sesión y restablecer, están siempre visibles y accesibles.

2. **Accesibilidad e iniciación guiada:** la aplicación incluye un breve tutorial de bienvenida que orienta al usuario en su primer acceso, así como un catálogo de ejemplos predefinidos que permiten obtener resultados llamativos de inmediato y servir como punto de partida para la experimentación.

3. **Retroalimentación inmediata:** cualquier cambio sobre un parámetro se refleja al instante en el lienzo, lo que ofrece al usuario una respuesta visual continua y refuerza la comprensión de cómo cada control afecta al patrón generado.

4. **Consistencia visual:** la interfaz mantiene una estética coherente en cuanto a colores, tipografía y disposición de los controles, basándose en patrones de diseño conocidos (sliders, campos numéricos, selectores) que reducen la curva de aprendizaje.

5. **Adaptabilidad e internacionalización:** la interfaz se adapta a distintos tamaños de pantalla (escritorio y tabletas) y ofrece soporte multilingüe, de modo que el usuario puede utilizar la aplicación en su idioma y en el dispositivo que prefiera.

Además, se ha realizado una validación preliminar de la usabilidad mediante pruebas informales con un grupo reducido de usuarios, a partir de las cuales se identificaron y corrigieron elementos que generaban confusión, optimizando así la experiencia global.

### 7.3.1. Evaluación de la usabilidad

Para valorar la usabilidad y la experiencia general ofrecida por la aplicación, se diseñó un cuestionario que abarca distintos aspectos clave de la interacción del usuario. Este cuestionario se entregó a un grupo de 38 participantes tras una sesión de prueba libre con la aplicación.

El cuestionario evalúa dimensiones como la utilidad percibida, la facilidad de uso, la experiencia subjetiva, el rendimiento, la accesibilidad de las funciones, el atractivo visual de los resultados y la probabilidad de uso futuro. Cada ítem ofrece tres opciones de respuesta que permiten obtener una visión general de la percepción del usuario. A continuación se presenta el cuestionario aplicado:

**Utilidad de la aplicación**

- La utilizaría para crear composiciones de forma habitual.
- Me resultaría útil de forma puntual.
- No le veo gran utilidad.

**Usabilidad**

- Tiene una interfaz intuitiva.
- No resulta excesivamente intuitiva, pero tampoco presenta grandes dificultades de manejo.
- Tiene una interfaz compleja.

**Experiencia de uso**

- Me sentí cómodo/a usando la aplicación.
- La experiencia fue aceptable, pero podría mejorar.
- La aplicación me resultó incómoda o poco amigable.

**Rendimiento**

- La aplicación funcionó con fluidez y sin errores.
- Tuvo algún pequeño fallo, pero fue utilizable.
- Tuvo problemas graves de funcionamiento o lentitud.

**Accesibilidad de las funciones**

- Encontré rápidamente las funciones que necesitaba.
- Algunas funciones fueron fáciles de encontrar, otras no tanto.
- Tuve dificultades para encontrar las funciones principales.

**Comprensión de los parámetros**

- Entendí con facilidad cómo afectaba cada parámetro al resultado.
- Comprendí el efecto de algunos parámetros, pero no de todos.
- Me costó entender el efecto de los parámetros.

**Atractivo visual de los resultados**

- Las composiciones generadas me resultan atractivas y vistosas.
- Los resultados son aceptables, pero mejorables.
- Los resultados me parecen poco atractivos.

**Probabilidad de uso futuro**

- Volvería a utilizar la aplicación en el futuro.
- Solo la usaría si no tengo otra opción.
- No la volvería a utilizar.

### 7.3.2. Análisis de resultados

El cuestionario fue respondido por 38 participantes tras una sesión de prueba libre con la aplicación. A continuación se presentan los porcentajes de respuesta obtenidos en cada una de las dimensiones evaluadas.

**Utilidad de la aplicación**

- La utilizaría para crear composiciones de forma habitual: 37 %
- Me resultaría útil de forma puntual: 58 %
- No le veo gran utilidad: 5 %

**Usabilidad**

- Tiene una interfaz intuitiva: 66 %
- No resulta excesivamente intuitiva, pero tampoco presenta grandes dificultades de manejo: 34 %
- Tiene una interfaz compleja: 0 %

**Experiencia de uso**

- Me sentí cómodo/a usando la aplicación: 92 %
- La experiencia fue aceptable, pero podría mejorar: 8 %
- La aplicación me resultó incómoda o poco amigable: 0 %

**Rendimiento**

- La aplicación funcionó con fluidez y sin errores: 89 %
- Tuvo algún pequeño fallo, pero fue utilizable: 11 %
- Tuvo problemas graves de funcionamiento o lentitud: 0 %

**Accesibilidad de las funciones**

- Encontré rápidamente las funciones que necesitaba: 82 %
- Algunas funciones fueron fáciles de encontrar, otras no tanto: 18 %
- Tuve dificultades para encontrar las funciones principales: 0 %

**Comprensión de los parámetros**

- Entendí con facilidad cómo afectaba cada parámetro al resultado: 61 %
- Comprendí el efecto de algunos parámetros, pero no de todos: 39 %
- Me costó entender el efecto de los parámetros: 0 %

**Atractivo visual de los resultados**

- Las composiciones generadas me resultan atractivas y vistosas: 84 %
- Los resultados son aceptables, pero mejorables: 16 %
- Los resultados me parecen poco atractivos: 0 %

**Probabilidad de uso futuro**

- Volvería a utilizar la aplicación en el futuro: 92 %
- Solo la usaría si no tengo otra opción: 8 %
- No la volvería a utilizar: 0 %

#### Conclusiones

Los resultados reflejan una valoración muy positiva de la aplicación. La experiencia de uso fue cómoda para el 92 % de los participantes, el rendimiento se percibió fluido y sin errores en el 89 % (ningún participante reportó problemas graves) y el 92 % afirmó que volvería a utilizarla. El atractivo visual de las composiciones obtuvo también una valoración alta (84 %). Estos datos confirman que la aplicación cumple su objetivo de ofrecer una herramienta agradable y fluida, en línea con los requisitos de interfaz intuitiva (RNF4) y rendimiento (RNF5).

En cuanto a la usabilidad, el 66 % consideró la interfaz directamente intuitiva y el 34 % restante la situó en un nivel intermedio, sin que ningún participante la calificara como compleja. La accesibilidad de las funciones también fue buena, ya que el 82 % encontró con rapidez lo que necesitaba. Esto respalda el diseño centrado en el usuario y una curva de aprendizaje contenida, apoyada en el tutorial de bienvenida y en los ejemplos predefinidos.

El aspecto con mayor margen de mejora es la comprensión de los parámetros. Aunque el 61 % entendió con facilidad el efecto de cada control, un 39 % comprendió solo algunos, sobre todo los más avanzados. En la misma línea, las respuestas libres recogieron una sugerencia recurrente, la posibilidad de acelerar el dibujo o el paso del tiempo para obtener los resultados con mayor rapidez, mientras que otro participante señaló que no echaba en falta ninguna función.

Respecto a la utilidad percibida, la mayoría (58 %) la considera una herramienta de uso puntual y un 37 % la usaría de forma habitual, una distribución coherente con su carácter de herramienta creativa de nicho. Solo un 5 % no le encontró utilidad.

En conjunto, los resultados validan el enfoque de diseño y sitúan las líneas de mejora futura en dos puntos, reforzar la comprensión de los parámetros avanzados (por ejemplo mediante ayudas contextuales) y ofrecer un control para acelerar el trazado. Ambos aspectos se retoman en el capítulo de conclusiones.

## Anexo: Cómo obtener los parámetros de rendimiento en distintos navegadores

Las cifras del apartado 7.2 (tasa de cuadros, uso de CPU y consumo de memoria) se obtienen con las herramientas de desarrollo que incorpora el propio navegador, sin instalar nada adicional. Este anexo describe el procedimiento en los navegadores de escritorio más habituales. La escena de medición recomendada es siempre la misma, la animación en modo continuo con una estela densa, para que los valores sean comparables entre navegadores y equipos.

### Navegadores basados en Chromium (Google Chrome, Microsoft Edge, Opera, Brave, Vivaldi)

Todos estos navegadores comparten el mismo motor (Chromium) y, por tanto, las mismas herramientas de desarrollo, de modo que el procedimiento es prácticamente idéntico en todos ellos.

**Tasa de cuadros (fps).**

1. Abrir la aplicación y pulsar **F12** para abrir las herramientas de desarrollo.
2. Pulsar **Ctrl+Shift+P** (Cmd+Shift+P en Mac) para abrir el menú de comandos.
3. Escribir «Rendering» y elegir **«Show Rendering»**. En el panel que aparece, marcar la casilla **«Frame Rendering Stats»** (en español, «Estadísticas de renderizado de fotogramas»).
4. En la esquina del lienzo aparece un recuadro superpuesto con los fps en tiempo real. Al iniciar la animación se puede leer el valor sostenido.

**Uso de CPU y memoria.**

- **Administrador de tareas del navegador.** En Google Chrome y Microsoft Edge se abre con **Shift+Esc**. En Opera se abre desde el menú principal, en la sección de herramientas para desarrolladores. Muestra, para cada pestaña, el uso de CPU, la memoria y la memoria de GPU. Basta con localizar la fila de la pestaña de la aplicación y leer sus valores en reposo y durante la animación.
- **Monitor de rendimiento.** Con **Ctrl+Shift+P** se escribe «Performance monitor» y se obtiene una vista en vivo de CPU, memoria de JavaScript y otros indicadores.

**Gráfica detallada de fps en el tiempo.** En la pestaña **«Rendimiento» (Performance)** se pulsa grabar (**Ctrl+E**), se deja correr la animación unos segundos y se detiene. El informe incluye una gráfica de fps a lo largo del tiempo, muy útil como figura para la memoria.

### Mozilla Firefox

Firefox utiliza su propio motor (Gecko) y sus herramientas difieren ligeramente de las de Chromium.

**Tasa de cuadros (fps).** Firefox no ofrece un recuadro de fps tan directo como Chromium. Se usa la pestaña **«Rendimiento» (Performance)** de las herramientas de desarrollo (**F12**), donde se pulsa grabar, se ejecuta la animación unos segundos y se detiene. El informe muestra la tasa de cuadros durante la grabación. Como alternativa válida en cualquier navegador, se puede dibujar en el lienzo el valor que devuelve la función `frameRate()` de p5.js, tal como se indica en el apartado 7.2.

**Uso de CPU y memoria.** Firefox dispone de su propio administrador de tareas, accesible escribiendo **`about:performance`** en la barra de direcciones, que muestra el consumo de energía y de memoria por pestaña. Para un análisis de memoria más detallado, la pestaña **«Memoria» (Memory)** de las herramientas de desarrollo permite tomar instantáneas del uso de la memoria dinámica.

### Resumen por navegador

| Navegador | Abrir herramientas | Tasa de cuadros (fps) | CPU y memoria |
|---|---|---|---|
| Google Chrome | F12 | Menú de comandos, «Frame Rendering Stats» | Shift+Esc (administrador de tareas) |
| Microsoft Edge | F12 | Igual que Chrome | Shift+Esc |
| Opera | F12 o Ctrl+Shift+I | Igual que Chrome | Administrador de tareas (menú) |
| Mozilla Firefox | F12 | Pestaña «Rendimiento», grabar | `about:performance` |

### Nota sobre la comparabilidad de las medidas

Para que las cifras sean comparables conviene tomar todas las medidas en las mismas condiciones, la misma escena (animación en modo continuo con estela densa), el mismo tamaño de lienzo, el mismo nivel de zoom y sin otras pestañas o aplicaciones que consuman recursos de forma significativa. Es recomendable repetir cada medición varias veces y anotar el valor típico. Dado que los valores dependen del equipo y del navegador empleados, la tabla del apartado 7.2 debe reflejar la configuración concreta con la que se han obtenido.
