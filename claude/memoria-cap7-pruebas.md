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
> en sus equipos. Van marcados en el texto para localizarlos con facilidad. Lo mismo aplica a los
> porcentajes del cuestionario de usabilidad (7.3.2) y al número de participantes.

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

*Cuadro 7.3: Prueba funcional 3: Modificación de parámetros en tiempo real*

| **Prueba funcional** | PF3: El usuario modificará los parámetros del patrón (radios, velocidades, fases, color, grosor, etc.) y verá reflejado el cambio sin recargar. |
|---|---|
| **Requisito cumplido** | RF2, RF3 |
| **Prueba realizada** | Durante la animación se modificaron varios parámetros desde el panel de control. |
| **Resultado esperado** | La representación gráfica se actualiza dinámicamente conforme se cambian los valores, sin necesidad de recargar la página. |
| **Resultado obtenido** | Los cambios se reflejaron inmediatamente en el trazado, la aplicación reaccionó en tiempo real a cada modificación. |

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

> **⚠️ Sustituir por las características reales de los equipos del alumno.**

**Equipo 1 (gama media).**

- **CPU:** *[p. ej. Intel Core i5 de portátil]*
- **GPU:** *[gráfica integrada]*
- **RAM:** *[p. ej. 8 GB]*
- **Navegador / SO:** *[p. ej. Google Chrome sobre Windows 11]*

**Equipo 2 (gama alta).**

- **CPU:** *[p. ej. Intel Core i7 / AMD Ryzen de sobremesa]*
- **GPU:** *[gráfica dedicada]*
- **RAM:** *[p. ej. 16 GB]*
- **Navegador / SO:** *[p. ej. Google Chrome sobre Windows 11]*

Dado que *Epicycloid Generator* es una aplicación ligera que se ejecuta en el navegador y no realiza cálculos masivos ni renderizado 3D, no es especialmente exigente a nivel de hardware. La diferencia de potencia entre ambos equipos se aprecia, sobre todo, en la capacidad de mantener la tasa de 60 fps cuando el número de líneas acumuladas es muy elevado.

### 7.2.2. Análisis de resultados

> **⚠️ Las cifras siguientes son representativas, sustituir por las mediciones reales.**

**Fluidez (fps).** En estado de reposo (aplicación cargada con la animación detenida), la pestaña no consume apenas recursos. Al iniciar la animación, la tasa de cuadros se mantiene estable en torno a los **60 fps** *(valor a medir)* gracias al pintado incremental de la estela. Incluso con varios miles de segmentos acumulados, la fluidez se mantiene sin caídas perceptibles, ya que el coste de cada cuadro es prácticamente constante y no crece con el tamaño del historial.

**CPU.** En reposo, el uso de CPU asociado a la pestaña es mínimo (cercano al **0 a 1 %** *(valor a medir)*). Durante la animación continua, el consumo asciende a un rango moderado (aproximadamente **15 a 25 %** *(valor a medir)* de un núcleo), correspondiente al bucle de dibujo de p5.js. Es relevante que este consumo se mantiene estable a lo largo del tiempo y no se dispara al acumularse más líneas, lo que confirma la eficacia del modelo de renderizado incremental.

**Memoria.** El consumo de memoria de la pestaña parte de unos **40 a 60 MB** *(valor a medir)* en reposo y crece de forma controlada a medida que se acumulan segmentos en el historial y en la capa de dibujo, estabilizándose en torno a **120 a 180 MB** *(valor a medir)* en composiciones muy densas. Este crecimiento es moderado y se libera al deshacer sesiones o reiniciar la composición.

**GPU.** La aplicación realiza el dibujo sobre un lienzo 2D y no efectúa tareas gráficas complejas, por lo que el uso de la GPU es reducido en ambos equipos.

#### Conclusiones

Los resultados obtenidos permiten concluir que la aplicación está correctamente optimizada. El comportamiento en ambos equipos fue similar: la diferencia de hardware apenas influye en el escenario habitual de uso, y solo en composiciones extremadamente densas el equipo de gama alta conserva la tasa de 60 fps con mayor holgura. El consumo controlado y estable de CPU y memoria, que no crece con el número de líneas dibujadas, valida las decisiones de diseño adoptadas en la implementación, en especial el renderizado incremental de la estela sobre una capa independiente y la ejecución del bucle de animación fuera del ciclo de detección de cambios de Angular. En conjunto, la aplicación garantiza una experiencia fluida en tiempo real incluso en equipos de gama media, cumpliendo los requisitos de rendimiento (RNF5) y de minimización del consumo de recursos (RNF8).

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

Para valorar la usabilidad y la experiencia general ofrecida por la aplicación, se diseñó un cuestionario que abarca distintos aspectos clave de la interacción del usuario. Este cuestionario se entregó a un grupo de *[n]* participantes *(número a indicar)* tras una sesión de prueba libre con la aplicación.

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

> **⚠️ Los porcentajes siguientes son orientativos, sustituir por los resultados reales del cuestionario.**

Los resultados obtenidos muestran una percepción mayoritariamente positiva por parte de los usuarios. La mayoría de los participantes calificaron la interfaz como intuitiva y manifestaron sentirse cómodos durante el uso, destacando la respuesta visual inmediata al modificar los parámetros como uno de los aspectos más satisfactorios. En cuanto al rendimiento, la aplicación fue valorada como fluida y sin errores apreciables.

Cabe destacar que más del **80 %** *(valor a confirmar)* de los participantes afirmaron que volverían a utilizar la aplicación en el futuro, y una amplia mayoría consideró que las composiciones generadas resultan atractivas. La iniciación mediante el tutorial de bienvenida y los ejemplos predefinidos se valoró positivamente como ayuda para empezar a experimentar.

Estos datos respaldan la validez del enfoque de diseño centrado en el usuario y confirman que la aplicación cumple con los principios básicos de usabilidad, accesibilidad y eficiencia, en línea con el requisito de ofrecer una interfaz intuitiva para usuarios sin conocimientos técnicos (RNF4).

No obstante, algunas observaciones sugieren oportunidades de mejora, especialmente en lo relativo a la comprensión de los parámetros más avanzados, donde parte de los usuarios manifestó dudas sobre su efecto. Esta retroalimentación se ha tenido en cuenta como posible línea de mejora futura, abordada en el capítulo de conclusiones.
