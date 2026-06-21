Título: Generador de imágenes basadas en patrones orbitales y su integración a Aplicación Web 

## 1. Introducción 

## 1.1. Introducción 

En los años recientes, la metodología para el desarrollo de aplicaciones web ha experimentado significativas transformaciones. Actualmente, los usuarios demandan experiencias digitales que sean tanto interactivas como estéticamente atractivas. Para alcanzar este objetivo, se implementan tecnologías de vanguardia en el lado del cliente de la aplicación, como Angular. Estas herramientas facilitan la creación de entornos capaces de gestionar lógica compleja, gráficos en tiempo real y una interacción fluida con los usuarios. 

Simultáneamente, el arte generativo ha visto un aumento en su popularidad. Esto conlleva la fusión de matemáticas, informática y estética para generar contenido visual dinámico. Se emplean algoritmos para producir imágenes, lo que resulta en resultados únicos que dependen de condiciones iniciales y reglas establecidas. Un ejemplo notable son los patrones orbitales, que pueden formar composiciones elaboradas a partir de relaciones geométricas simples. 

Este proyecto se sitúa en la intersección entre el desarrollo web contemporáneo y el arte generativo. El objetivo fundamental es diseñar e implementar una aplicación web que tenga la capacidad de generar composiciones visuales basadas en patrones orbitales. Para ello, se utilizará el framework Angular para la estructuración de la aplicación y la librería p5.js para la representación gráfica en tiempo real. 

Este proyecto se aborda desde dos perspectivas. En primer lugar, se trata de un proceso de aprendizaje y análisis del marco Angular, investigando sus características principales como la arquitectura orientada a componentes y la gestión del ciclo de vida. En segundo lugar, se focaliza en la aplicación práctica de dichos conocimientos mediante el desarrollo de un sistema interactivo para la creación de contenido visual. 

Asimismo, se examina la integración de la biblioteca p5.js dentro del marco Angular, enfrentando retos como la sincronización entre la lógica de la aplicación y el renderizado gráfico. Esta integración es fundamental para valorar la idoneidad de Angular en la creación de aplicaciones multimedia interactivas. 

Durante la redacción de esta memoria se ha recurrido al uso de herramientas de inteligencia artificial como apoyo para mejorar la calidad del texto. Estas herramientas se han utilizado para revisar la redacción, corregir errores de expresión y ayudar a estructurar algunos apartados, actuando como un recurso de asistencia en la escritura. En cualquier caso, el contenido técnico, las decisiones de diseño, el desarrollo del proyecto y las conclusiones reflejadas en este documento han sido elaborados y supervisados íntegramente por el autor. 

En conclusión, este proyecto no solo aspira a construir una aplicación funcional, sino que también tiene como finalidad una evaluación crítica de las tecnologías utilizadas, analizando sus beneficios y restricciones. De esta manera, se busca contribuir al conocimiento técnico del marco Angular y explorar nuevas maneras de expresión visual fundamentadas en algoritmos. 

## 1.2. Motivación 

La motivación principal de este trabajo surge de la escasa disponibilidad de herramientas especializadas en la generación de imágenes basadas en epicicloides dentro del entorno web. A pesar del creciente interés por el arte generativo y la proliferación de aplicaciones orientadas a la creación visual, la mayoría de estas herramientas presentan un enfoque generalista, sin profundizar en modelos matemáticos concretos que permitan explorar de forma controlada y sistemática determinados tipos de patrones. En este sentido, los epicicloides, como construcciones geométricas derivadas del movimiento relativo entre circunferencias, ofrecen un alto potencial para la generación de composiciones visuales complejas y estéticamente ricas, pero carecen de aplicaciones específicas que faciliten su exploración interactiva. 

Esta ausencia de soluciones específicas pone de manifiesto una oportunidad tanto desde el punto de vista técnico como creativo. Por un lado, permite abordar el desarrollo de una herramienta que no solo genere resultados visuales, sino que también posibilite la comprensión y manipulación de los parámetros que intervienen en la formación de dichos patrones. Por otro lado, abre la puerta a la experimentación dentro del ámbito del arte generativo, fomentando la conexión entre fundamentos matemáticos y expresión visual. 

De forma complementaria, otra de las motivaciones fundamentales de este trabajo radica en la necesidad de adquirir competencias en el uso de tecnologías ampliamente demandadas en el ámbito profesional del desarrollo web. En particular, el framework Angular representa una de las soluciones más consolidadas para la construcción de aplicaciones frontend de gran escala, caracterizándose por su enfoque estructurado, su arquitectura basada en componentes y su integración con el lenguaje TypeScript. Partiendo de un conocimiento inicial limitado sobre esta tecnología, el desarrollo de la aplicación se plantea como una oportunidad para abordar un proceso de aprendizaje progresivo, aplicado a un caso práctico real. 

En este contexto, el trabajo no solo responde a una inquietud técnica relacionada con la generación de contenido visual, sino también a un objetivo formativo orientado a la adquisición de competencias en desarrollo web moderno. La combinación de ambos factores —la exploración de modelos matemáticos aplicados al arte generativo y el aprendizaje de un framework consolidado— configura una motivación sólida que justifica el desarrollo de la propuesta planteada. 

## 1.3. Objetivos 

El presente trabajo tiene como objetivo general el estudio y aplicación del framework Angular mediante el desarrollo de una aplicación web orientada a la generación de imágenes basadas en patrones orbitales. Este objetivo combina una vertiente formativa, centrada en la adquisición de competencias en tecnologías web modernas, con una vertiente práctica, materializada en la implementación de una herramienta funcional de carácter interactivo. 

A partir de este planteamiento general, se definen los siguientes objetivos específicos: 

- Analizar los fundamentos del framework Angular, incluyendo su arquitectura basada en componentes, el uso de TypeScript y los mecanismos de organización modular del código. 

- Adquirir competencias prácticas en el desarrollo de aplicaciones web utilizando Angular, partiendo desde un nivel inicial de conocimiento hasta la implementación de una solución funcional. 

- Diseñar e implementar una aplicación web que permita la generación de imágenes basadas en epicicloides, garantizando la correcta representación de estos patrones a partir de sus parámetros matemáticos. 

- Desarrollar un sistema que permita al usuario definir y modificar los parámetros necesarios para la generación de epicicloides, asegurando precisión en los resultados y ausencia de errores en la representación gráfica. 

- Integrar la librería p5.js dentro del entorno Angular para la generación y visualización de gráficos en tiempo real. 

Implementar funcionalidades que permitan la exportación de los resultados generados, incluyendo tanto la imagen resultante como los parámetros asociados al patrón, facilitando su almacenamiento y reutilización. 

## 1.4. Organización de la memoria 

La memoria ha sido organizada en los siguientes capítulos: 

1. **Introducción** . Este apartado presenta el contexto general del trabajo, incluyendo una visión global del proyecto, la motivación que lo origina y los objetivos que se pretenden alcanzar. Asimismo, se introduce la estructura general del documento. 

2. **Estado del arte** . En este capítulo se analizan aplicaciones y herramientas existentes relacionadas con el arte generativo y la generación de patrones visuales, así como las tecnologías actuales utilizadas en el desarrollo de aplicaciones web. Este análisis permite contextualizar la propuesta y justificar las decisiones tecnológicas adoptadas. 

3. **Requisitos, especificaciones, coste, riesgos y viabilidad** . En este apartado se definen los requisitos funcionales y no funcionales del sistema, así como las especificaciones técnicas de la aplicación. Además, se incluye un estudio de viabilidad, una estimación de costes y un análisis de los riesgos asociados al desarrollo del proyecto. 

4. **Análisis** . Este capítulo describe el comportamiento del sistema desde un punto de vista conceptual, definiendo la interacción del usuario mediante casos de uso, así como la estructura lógica del sistema a través de diagramas que permiten comprender su funcionamiento interno. 

5. **Diseño** . En este apartado se establece la solución propuesta a partir del análisis previo, definiendo la estructura de la aplicación, el flujo de interacción y los aspectos relacionados con el diseño visual, teniendo en cuenta criterios de usabilidad y coherencia estética. 

6. **Implementación** . Este capítulo detalla el proceso de desarrollo de la aplicación web, incluyendo la construcción de la interfaz de usuario, la implementación de la lógica del sistema y la integración de las tecnologías empleadas. 

7. **Pruebas y resultados** . En este apartado se recogen las pruebas realizadas para validar el correcto funcionamiento del sistema, evaluando tanto su comportamiento funcional como su rendimiento y la experiencia de usuario. 

8. **Conclusiones** . Finalmente, se realiza una valoración global del trabajo desarrollado, analizando el grado de cumplimiento de los objetivos planteados y proponiendo posibles líneas de mejora y trabajo futuro. 

## 2. Estado del Arte 

El presente apartado analiza el estado actual de las herramientas y tecnologías relacionadas con la generación y visualización de patrones geométricos y arte generativo en entornos digitales. A diferencia de otros ámbitos donde existen soluciones claramente definidas para un problema concreto, en este caso no se identifican aplicaciones específicamente diseñadas para la creación interactiva de patrones orbitales con un enfoque artístico en entorno web. 

Por este motivo, el análisis se aborda desde una perspectiva amplia, considerando aquellas herramientas que, aun no estando diseñadas específicamente para este propósito, incorporan funcionalidades relacionadas. En concreto, se distinguen dos dimensiones principales. Por un lado, se estudian aplicaciones y plataformas orientadas a la representación matemática de funciones y curvas. Por otro, se analizan entornos y librerías centrados en el desarrollo de arte generativo mediante programación. 

El objetivo de este análisis es establecer un marco comparativo que permita identificar las capacidades y limitaciones de las soluciones existentes, justificando así tanto las decisiones tecnológicas adoptadas como los elementos diferenciadores de la aplicación desarrollada en este trabajo. 

## 2.1. Análisis de aplicaciones similares 

En los últimos años, han surgido diversas herramientas digitales orientadas tanto a la visualización de funciones matemáticas como al desarrollo de contenido visual generativo. Estas aplicaciones permiten representar curvas complejas, animaciones y composiciones visuales mediante parámetros matemáticos o código, siendo ampliamente utilizadas en contextos educativos, científicos y artísticos. 

Sin embargo, la mayoría de estas soluciones no están específicamente diseñadas para la exploración interactiva de patrones orbitales con fines artísticos, sino que responden a objetivos más generales, como el aprendizaje matemático o la creación de gráficos dinámicos. 

El presente apartado analiza algunas de las principales herramientas disponibles actualmente, comparando sus características, ventajas y limitaciones. Este análisis permitirá identificar tanto las tendencias más relevantes como las carencias existentes, sirviendo como base para el planteamiento de la propuesta desarrollada en este trabajo. 

## 2.1.1. Análisis funcional de aplicaciones similares 

## **Desmos** 

La primera herramienta analizada es Desmos [1], una plataforma web ampliamente utilizada en el ámbito educativo para la representación gráfica de funciones matemáticas. 

Las funcionalidades principales de Desmos son: 

- Representación gráfica en tiempo real de funciones matemáticas. 

- Uso de parámetros dinámicos mediante deslizadores. 

- Soporte para funciones trigonométricas y ecuaciones paramétricas. 

- Interacción directa con las gráficas mediante zoom y desplazamiento. 

- Acceso multiplataforma sin necesidad de instalación. 

A pesar de su potencia en la visualización matemática, Desmos presenta limitaciones en el ámbito artístico, ya que no está orientado a la creación visual avanzada ni a la personalización estética de los resultados. 

## **GeoGebra** 

Otra herramienta relevante es GeoGebra [2], una aplicación enfocada al aprendizaje matemático que combina geometría, álgebra y cálculo en un mismo entorno. 

Sus principales funcionalidades incluyen: 

- Representación de funciones y construcciones geométricas. 

- Manipulación interactiva de parámetros. 

- Visualización de curvas paramétricas y trayectorias. 

- Integración de diferentes ramas de las matemáticas en un único entorno. 

Sin embargo, al igual que Desmos, GeoGebra está orientado principalmente a fines educativos, lo que limita su capacidad como herramienta de exploración artística y creativa. 

## **Processing** 

En el ámbito del arte generativo destaca Processing [3], un entorno de programación diseñado específicamente para la creación de contenido visual y artístico mediante código. 

Las principales características de Processing son: 

- Generación de gráficos y animaciones en tiempo real. 

- Alto grado de control sobre parámetros visuales y comportamiento de los elementos. 

- Posibilidad de desarrollar sistemas generativos complejos basados en algoritmos. 

- Entorno orientado a artistas, diseñadores y desarrolladores interesados en el creative coding. 

Processing ha sido ampliamente utilizado como herramienta de prototipado en proyectos de arte digital, permitiendo explorar de manera flexible la relación entre matemáticas, programación y expresión visual. 

No obstante, esta herramienta presenta una barrera de entrada significativa, ya que requiere conocimientos de programación, lo que limita su accesibilidad para usuarios no técnicos. Asimismo, al tratarse de un entorno de desarrollo, carece de una interfaz gráfica orientada a la interacción directa del usuario final, lo que dificulta su uso como aplicación accesible para la exploración visual sin mediación técnica. 

## 2.1.2. Diferenciación funcional de la propuesta 

Tras el análisis de las herramientas existentes, se identifican una serie de limitaciones que justifican el desarrollo de la propuesta presentada en este trabajo. 

## **Enfoque artístico específico en patrones orbitales** 

A diferencia de las herramientas analizadas, la aplicación desarrollada se centra específicamente en la generación de patrones orbitales con un objetivo artístico, combinando principios matemáticos con exploración visual. 

## **Accesibilidad sin conocimientos de programación** 

Mientras que entornos como Processing o Desmos requieren conocimientos técnicos, la propuesta ofrece una interfaz accesible que permite al usuario generar patrones complejos sin necesidad de programar o conocimientos excesivos sobre matemáticas. 

## **Interactividad en tiempo real orientada a la creatividad** 

La aplicación permite modificar parámetros de forma intuitiva, facilitando la exploración visual en tiempo real con un enfoque creativo más que analítico. 

## **Integración en entorno web** 

A diferencia de herramientas de escritorio o entornos educativos, la aplicación se desarrolla como una aplicación web, facilitando su acceso multiplataforma sin necesidad de instalación. 

## **Orientación a la experimentación visual** 

La propuesta prioriza la exploración estética y la generación de composiciones visuales únicas, frente al enfoque matemático o educativo predominante en otras herramientas. 

2.1.3. Análisis visual de aplicaciones similares 

La dimensión visual de las herramientas analizadas presenta diferencias significativas en función de su finalidad, lo que influye directamente en la experiencia del usuario. A partir del análisis de las interfaces de Processing, GeoGebra y Desmos, se identifican diversos enfoques de diseño con ventajas y limitaciones claras. 

Figura Estado del Arte.1 Desmos 

Figura Estado del Arte.2 GeoGebra 

En el caso de Desmos y GeoGebra, ambas herramientas presentan una interfaz centrada en la representación matemática. Tal y como se observa en las imágenes analizadas, el elemento predominante es una cuadrícula cartesiana que ocupa la mayor parte de la pantalla, acompañada de paneles laterales destinados a la introducción de expresiones algebraicas. Este diseño prioriza la claridad, la precisión y la legibilidad de los datos, facilitando la interpretación de funciones matemáticas. 

Sin embargo, este enfoque presenta limitaciones desde el punto de vista visual. La estética es funcional y minimalista, pero carece de elementos orientados a la exploración creativa. El uso de colores es limitado y responde principalmente a la diferenciación de funciones, sin un tratamiento visual enfocado a la generación artística. Además, la interacción está condicionada a la introducción de ecuaciones, lo que puede resultar poco intuitivo para usuarios sin formación matemática. 

Figura Estado del Arte.3 _Processing_ 

Por otro lado, Processing presenta un enfoque radicalmente distinto. Como se aprecia en la imagen correspondiente, su interfaz está compuesta principalmente por un entorno de desarrollo de código, acompañado de una ventana de ejecución donde se renderizan los resultados gráficos. En este caso, la interfaz no está diseñada para la interacción directa con elementos visuales, sino para la programación de estos. 

Este planteamiento ofrece una libertad creativa mucho mayor, permitiendo generar visualizaciones completamente personalizadas. No obstante, esta flexibilidad implica una mayor complejidad de uso, ya que el usuario debe implementar manualmente tanto la lógica como la representación visual. La ausencia de controles interactivos integrados limita la accesibilidad, especialmente para usuarios sin conocimientos de programación. 

En conjunto, el análisis visual evidencia una clara dicotomía entre herramientas orientadas a la precisión matemática, con interfaces estructuradas, pero poco expresivas, y entornos de programación creativa, altamente flexibles pero carentes de interfaces intuitivas. Esta situación pone de manifiesto la ausencia de soluciones que integren de forma equilibrada una interfaz accesible con capacidades avanzadas de generación visual, especialmente en el contexto de patrones matemáticos con finalidad artística. 

## 2.1.4. Diferenciación visual de la propuesta 

Con base en las carencias detectadas en las herramientas analizadas, la propuesta visual desarrollada en este trabajo se fundamenta en los principios de simplicidad, interactividad y accesibilidad, con el objetivo de ofrecer una experiencia intuitiva orientada a la exploración artística de patrones orbitales. 

A diferencia de aplicaciones centradas en la representación matemática o entornos de programación, el diseño propuesto busca reducir la complejidad visual y técnica, permitiendo que cualquier usuario pueda generar composiciones visuales sin necesidad de conocimientos previos en matemáticas o programación. Los principios de diseño adoptados se detallarán más adelante (sección X.X), siendo los más relevantes los siguientes: 

## **Minimalismo funcional:** 

La interfaz se compone únicamente de los elementos esenciales para la generación de patrones. Se eliminan paneles innecesarios, menús complejos y elementos técnicos, permitiendo que la atención del usuario se limite en la visualización del resultado. 

## **Control intuitivo de parámetros:** 

Los valores que definen los patrones (radios, velocidades, relaciones orbitales, etc.) se presentan mediante controles simples e interactivos, como deslizadores, facilitando la experimentación directa sin necesidad de introducir ecuaciones. 

## **Visualización en tiempo real orientada a la estética:** 

Cada modificación de los parámetros se refleja instantáneamente en pantalla, permitiendo al usuario explorar diferentes configuraciones de forma dinámica. A diferencia de otras herramientas, el objetivo no es únicamente representar una función, sino generar composiciones visualmente atractivas. 

## **Interfaz centrada en la exploración creativa:** 

El diseño prioriza la experimentación frente a la precisión matemática. Se fomenta un 

uso basado en la prueba y error, donde el usuario puede experimentar con los parámetros para descubrir patrones complejos de manera natural. 

## **Equilibrio entre precisión y expresividad visual:** 

La aplicación mantiene una base matemática rigurosa en la generación de las curvas, pero presenta los resultados desde una perspectiva artística, integrando color, trazo y composición como elementos clave de la experiencia. 

A diferencia de herramientas como Desmos o GeoGebra, que priorizan la representación analítica, o entornos como Processing, que requieren programación, la propuesta presentada combina accesibilidad e interactividad en un entorno visual orientado al usuario final. 

Este enfoque permite ampliar el público objetivo, incluyendo tanto usuarios sin formación técnica como perfiles creativos interesados en la generación de arte digital. Asimismo, se promueve una experiencia más cercana y lúdica, donde la creación de patrones deja de ser un proceso técnico para convertirse en una actividad exploratoria y expresiva. 

En este sentido, la aplicación no se plantea únicamente como una herramienta de visualización, sino como un entorno de creación artística accesible, capaz de transformar conceptos matemáticos complejos en experiencias visuales intuitivas y atractivas. 

## 2.2. Análisis de tecnologías 

## 2.2.1. Aplicación de desarrollo 

## **Angular** 

Angular es un framework de desarrollo web mantenido por Google, diseñado para la creación de aplicaciones de una sola página (SPA, Single Page Applications). Utiliza TypeScript como lenguaje principal y proporciona una arquitectura basada en componentes, facilitando la organización y escalabilidad del código. 

- Entre sus principales características destacan: 

- Arquitectura modular basada en componentes reutilizables. 

- Uso de TypeScript, que permite tipado estático y mejora la mantenibilidad del código. 

- Sistema de data binding bidireccional para la sincronización entre modelo y vista. 

- Integración de servicios, rutas y gestión de estado dentro del propio framework. 

- Amplio ecosistema y soporte oficial por parte de Google. 

Angular está especialmente orientado al desarrollo de aplicaciones complejas y escalables, proporcionando una estructura robusta desde el inicio del proyecto. 

## **React Native** 

React Native es un framework desarrollado por Meta que permite crear aplicaciones multiplataforma utilizando JavaScript y React. Aunque su enfoque principal está orientado a aplicaciones móviles, comparte conceptos relevantes con el desarrollo web moderno, como la arquitectura basada en componentes. 

Sus principales características son: 

- Desarrollo basado en componentes reutilizables. 

- Uso de JavaScript y JSX para la construcción de interfaces. 

- Gran comunidad y ecosistema de librerías. 

- Posibilidad de reutilizar lógica entre aplicaciones móviles y web (con React). 

Sin embargo, React Native está enfocado principalmente al desarrollo móvil, por lo que no resulta la opción más adecuada para una aplicación web pura. 

## **Laravel** 

Laravel es un framework de desarrollo backend basado en PHP, ampliamente utilizado para la creación de aplicaciones web estructuradas bajo el patrón MVC (Modelo-Vista-Controlador). 

- Sus principales características incluyen: 

- Gestión de rutas, controladores y modelos de forma estructurada. 

- Integración sencilla con bases de datos mediante ORM (Eloquent). 

- Sistema de autenticación y gestión de usuarios integrado. 

- 

- Herramientas para desarrollo de APIs REST. 

A pesar de su potencia en el desarrollo del lado del servidor, Laravel no está orientado al desarrollo de interfaces interactivas complejas en el cliente, por lo que suele combinarse con frameworks frontend. 

## **Vue.js** 

Vue.js es un framework progresivo de JavaScript para la construcción de interfaces de usuario. Se caracteriza por su facilidad de aprendizaje y su enfoque flexible. 

Entre sus principales características destacan: 

- Curva de aprendizaje baja en comparación con otros frameworks. 

- Sistema de componentes reutilizables. 

- Integración progresiva en proyectos existentes. 

- 

- Buen rendimiento en aplicaciones de tamaño medio. 

Sin embargo, en proyectos de mayor envergadura puede requerir configuraciones adicionales para mantener una estructura escalable. 

## **Comparativa** 

Las tecnologías analizadas comparten una serie de características comunes que las hacen adecuadas para el desarrollo de aplicaciones web modernas: 

- **Arquitectura basada en componentes** : Angular, React (y por extensión React Native) y Vue.js permiten dividir la aplicación en componentes reutilizables, facilitando el mantenimiento y escalabilidad. 

- **Separación entre frontend y backend** : Frameworks como Angular y Vue.js se centran en la capa de presentación, mientras que Laravel cubre la lógica del servidor. 

- **Soporte para desarrollo interactivo** : Todas las tecnologías permiten la creación de interfaces dinámicas y reactivas, mejorando la experiencia del usuario. 

- **Amplia comunidad y documentación** : Todas cuentan con soporte activo, abundante documentación y ecosistemas consolidados. 

- **Integración con APIs y servicios externos** : Permiten conectar la aplicación con servicios externos, bases de datos o sistemas adicionales. 

No obstante, presentan diferencias relevantes: 

- Angular ofrece una solución completa y estructurada, ideal para aplicaciones grandes. 

- Vue.js destaca por su simplicidad y flexibilidad. 

- React Native está orientado a entornos móviles. 

- 

- Laravel se centra en el desarrollo backend, no en la interfaz de usuario. 

## **Entorno de desarrollo elegido** 

Para el desarrollo de la aplicación web se ha optado por Angular como framework principal, debido a su robustez, escalabilidad y amplia adopción en el entorno profesional. 

Esta elección responde tanto a criterios técnicos como formativos. Desde el punto de vista técnico, Angular proporciona una arquitectura bien definida que facilita la organización del código, permitiendo estructurar la aplicación en módulos, componentes y servicios de manera clara y mantenible. Su integración con TypeScript mejora la calidad del desarrollo, reduciendo errores y facilitando la comprensión del código en proyectos de mayor tamaño. 

Además, Angular incorpora de forma nativa herramientas para la gestión de rutas, formularios, comunicación entre componentes y consumo de APIs, lo que simplifica el desarrollo de aplicaciones interactivas complejas sin necesidad de depender excesivamente de librerías externas. 

Desde una perspectiva formativa y profesional, Angular es una tecnología ampliamente utilizada en el ámbito laboral, especialmente en el desarrollo de aplicaciones empresariales. Su aprendizaje y aplicación en un proyecto real permite adquirir competencias relevantes y transferibles al mercado de trabajo. 

Por todo ello, Angular se presenta como una opción sólida y adecuada para el desarrollo de la infraestructura e interactividad de la aplicación web, garantizando un equilibrio entre rendimiento, mantenibilidad y escalabilidad. 

## 2.2.2. Lenguajes de programación 

## **HTML, CSS, JavaScript y TypeScript** 

En el desarrollo de aplicaciones web modernas intervienen diversos lenguajes que trabajan de forma conjunta para definir la estructura, el estilo y la lógica de la aplicación. En este proyecto se emplean principalmente HTML, CSS, JavaScript y TypeScript, cada uno con un rol específico dentro del sistema. 

HTML es el lenguaje estándar utilizado para definir la estructura de las páginas web. Permite organizar el contenido mediante elementos como contenedores, textos, imágenes o componentes interactivos, constituyendo la base sobre la que se construye la interfaz de usuario. 

Por su parte, CSS se encarga de la presentación visual de la aplicación. A través de CSS es posible definir aspectos como colores, tipografías, distribución de elementos y diseño responsivo, permitiendo adaptar la interfaz a distintos dispositivos y resoluciones. 

En cuanto a la lógica de la aplicación, esta se basa en JavaScript, el lenguaje de programación fundamental en el desarrollo web. JavaScript permite implementar 

funcionalidades dinámicas, gestionar eventos e interactuar con el contenido de la página en tiempo real. 

No obstante, en este proyecto se emplea principalmente TypeScript, un superset de JavaScript que añade tipado estático y características avanzadas orientadas a mejorar la calidad y mantenibilidad del código. TypeScript es el lenguaje utilizado por defecto en Angular, y su uso facilita la detección temprana de errores, así como el desarrollo de aplicaciones más robustas y escalables. 

## **Lenguajes elegidos** 

En este proyecto se ha optado por utilizar TypeScript como lenguaje principal para la implementación de la lógica de la aplicación, debido a su integración nativa con el framework Angular y a las ventajas que ofrece en términos de mantenibilidad, escalabilidad y detección de errores en tiempo de desarrollo. 

Como complemento, se emplea HTML para la definición de la estructura de la interfaz de usuario y CSS para su presentación visual, permitiendo construir una aplicación web completa siguiendo el modelo clásico de separación entre contenido, estilo y comportamiento. 

El uso combinado de estos lenguajes permite desarrollar una aplicación estructurada, modular y adaptable a distintos entornos, alineándose con las prácticas actuales del desarrollo web moderno. Asimismo, la elección de tecnologías ampliamente extendidas en el ámbito profesional contribuye a la adquisición de competencias relevantes y transferibles al entorno laboral. 

## 2.2.3. Librerías y herramientas gráficas 

## **p5.js, D3.js y Three.js** 

En el desarrollo de aplicaciones web con contenido visual interactivo, resulta fundamental el uso de librerías gráficas que faciliten la representación y manipulación de elementos en pantalla. En este contexto, existen diversas herramientas orientadas a distintos objetivos, desde la visualización de datos hasta la creación de gráficos tridimensionales o arte generativo. 

p5.js es una librería de JavaScript orientada al creative coding, derivada de Processing, que permite generar gráficos y animaciones de forma sencilla mediante una sintaxis accesible. Está diseñada para facilitar la creación visual interactiva, ofreciendo funciones específicas para el dibujo de formas, gestión del tiempo y manipulación de parámetros en tiempo real. 

Por otro lado, D3.js es una librería centrada en la visualización de datos. Permite crear gráficos complejos y dinámicos basados en datos estructurados, utilizando estándares web como SVG, HTML y CSS. Su principal fortaleza radica en la representación de información y en la manipulación del DOM en función de conjuntos de datos. 

Otra herramienta relevante es Three.js, una librería que facilita la creación de gráficos tridimensionales en el navegador mediante WebGL. Permite desarrollar escenas complejas en 3D, incluyendo iluminación, cámaras y animaciones avanzadas, siendo ampliamente utilizada en aplicaciones que requieren entornos inmersivos. 

## **Comparativa** 

Las librerías analizadas presentan características comunes, pero también diferencias significativas en cuanto a su enfoque y aplicabilidad: 

- **Renderizado gráfico en navegado** r: Todas permiten generar contenido visual dinámico directamente en el navegador web. 

- **Interactividad** : Ofrecen mecanismos para responder a eventos del usuario y modificar la visualización en tiempo real. 

- **Basadas en JavaScript** : Se integran fácilmente en aplicaciones web modernas. 

No obstante, presentan diferencias clave: 

- **p5.js** está orientada a la creación artística y experimental, facilitando la generación de gráficos mediante una sintaxis simple y accesible. 

- **D3.js** se centra en la visualización de datos, siendo más adecuada para representar información estructurada que para crear composiciones artísticas libres. 

- **Three.js** está diseñada para gráficos tridimensionales, lo que añade complejidad innecesaria en aplicaciones centradas en visualización bidimensional. 

## **Librería elegida** 

En este proyecto se ha optado por utilizar p5.js como librería principal para la generación de contenido visual. 

Esta elección se fundamenta en varios aspectos clave. En primer lugar, p5.js ofrece una sintaxis sencilla e intuitiva, lo que facilita el desarrollo de visualizaciones complejas sin necesidad de manejar directamente APIs de bajo nivel como WebGL. Además, al estar basada en Processing, permite trasladar de forma natural conceptos y estructuras previamente desarrollados en dicho entorno, favoreciendo la reutilización de conocimientos y prototipos. 

A diferencia de otras librerías como D3.js, cuyo enfoque está orientado al tratamiento de datos, p5.js permite una mayor libertad en la generación de formas y patrones sin restricciones estructurales. Asimismo, frente a soluciones como Three.js, evita la complejidad asociada al desarrollo en tres dimensiones, resultando más adecuada para aplicaciones centradas en representaciones bidimensionales. 

Por último, su integración con JavaScript y su compatibilidad con frameworks modernos como Angular permiten incorporarla de forma eficiente dentro de una aplicación web interactiva, facilitando el desarrollo de una experiencia visual dinámica y accesible. 

## 3. Requisitos, especificaciones, coste, riesgos y viabilidad 

## 3.1. Requisitos 

Se han establecido los siguientes requisitos funcionales y no funcionales que ha de cumplir la aplicación web a desarrollar. 

## 3.1.1. Requisitos funcionales 

- **RF1** La aplicación web deberá permitir la generación de composiciones visuales basadas en curvas epicicloidales mediante algoritmos matemáticos parametrizables. 

- **RF2** El usuario deberá poder modificar en tiempo real los parámetros que definen los patrones (radios, velocidades angulares, número de ciclos, fase, color, grosor de trazo, etc.). 

- **RF3** El sistema deberá actualizar dinámicamente la representación gráfica sin necesidad de recargar la página al modificarse los parámetros. 

- **RF4** La aplicación deberá permitir iniciar, pausar y reiniciar la animación de los patrones generados. 

- **RF5** El sistema deberá permitir limpiar el lienzo y generar una nueva composición desde cero. 

- **RF6** El usuario deberá poder guardar la composición generada como imagen en un formato estándar. 

- **RF7** La aplicación deberá permitir almacenar configuraciones de parámetros predefinidas y recuperarlas posteriormente. 

- **RF8** El sistema deberá permitir alternar entre distintos modos de visualización (modo curva epicicloidal y modo intersección de líneas). 

- **RF9** La aplicación deberá ofrecer controles interactivos (sliders, selectores, campos numéricos) para facilitar la manipulación de parámetros. 

- **RF10** El sistema deberá mostrar en pantalla los valores actuales de los parámetros utilizados en la generación del patrón. 

- **RF11** La aplicación deberá permitir la visualización responsiva del lienzo de dibujo adaptándose al tamaño de la ventana del navegador. 

- **RF12** El sistema deberá permitir la generación de variaciones automáticas de patrones mediante la introducción de valores aleatorios controlados. 

- **RF13** La aplicación deberá permitir restablecer los parámetros a sus valores predeterminados en cualquier momento. 

- **RF14** El sistema deberá ofrecer soporte multilingüe, permitiendo al usuario cambiar dinámicamente el idioma de la interfaz mediante el sistema de internacionalización i18n. 

## 3.1.2. Requisitos no funcionales 

- La aplicación deberá ser accesible desde navegadores web modernos compatibles con estándares HTML5, CSS3 y ECMAScript 6 o superior. 

- **RNF2** El sistema deberá desarrollarse utilizando el framework Angular como base estructural de la aplicación. 

- **RNF3** La generación gráfica deberá implementarse mediante la librería p5.js, garantizando su correcta integración en el entorno Angular. 

- **RNF4** La aplicación deberá presentar una interfaz de usuario intuitiva y coherente, adecuada para usuarios sin conocimientos técnicos avanzados. 

- **RNF5** El sistema deberá mantener un rendimiento fluido en tiempo real, evitando bloqueos o caídas en dispositivos de gama media. 

- **RNF6** La arquitectura del proyecto deberá seguir principios de modularidad, mantenibilidad y escalabilidad propios del desarrollo profesional con Angular. 

- **RNF7** El código fuente deberá estar correctamente documentado y estructurado para facilitar su comprensión, mantenimiento y ampliación futura. 

- **RNF8** La aplicación deberá minimizar el consumo innecesario de recursos del navegador, especialmente en lo relativo al uso de CPU durante la animación continua. 

- **RNF9** La interfaz deberá adaptarse correctamente a diferentes resoluciones y tamaños de pantalla, manteniendo la usabilidad en dispositivos de escritorio y tabletas. 

- **RNF10** El sistema deberá implementar mecanismos básicos de gestión de errores para evitar comportamientos inesperados ante valores inválidos de entrada. 

- **RNF11** La aplicación deberá ser compatible con los principales navegadores web modernos (Google Chrome, Mozilla Firefox, Microsoft Edge y Opera), garantizando un comportamiento consistente en cada uno de ellos. 

- **RNF12** La aplicación deberá desplegarse en una plataforma de hosting en la nube, concretamente en Netlify, garantizando su disponibilidad pública mediante acceso web. 

## 3.2. Especificación del sistema 

## 3.2.1. Especificación técnica 

Una vez definidos los requisitos funcionales y no funcionales del sistema, se ha establecido una propuesta técnica orientada al desarrollo de una aplicación web interactiva para la generación de patrones visuales basados en curvas epicicloidales. 

La aplicación será accesible a través de navegadores web modernos, garantizando compatibilidad con los estándares actuales de desarrollo web (HTML5, CSS3 y ECMAScript 6 o superior). Este enfoque permite ofrecer una solución multiplataforma sin necesidad de instalación, facilitando su acceso desde distintos dispositivos, especialmente entornos de escritorio y tabletas. 

El desarrollo del sistema se basa en el uso del framework Angular como tecnología principal para la estructuración de la aplicación. Angular proporciona un entorno robusto para la creación de aplicaciones web de tipo Single Page Application (SPA), permitiendo una organización modular del código mediante componentes reutilizables, servicios y directivas. Esta arquitectura facilita la mantenibilidad, escalabilidad y evolución futura del sistema, en línea con los requisitos no funcionales definidos. 

Para la generación y representación gráfica de los patrones visuales, se emplea la librería p5.js, una herramienta ampliamente utilizada en el ámbito de la programación creativa. Esta librería permite la implementación de algoritmos matemáticos para la generación de curvas epicicloidales, así como la actualización dinámica del lienzo en tiempo real. La integración de p5.js dentro del entorno Angular se realiza encapsulando la lógica gráfica en componentes específicos, asegurando una correcta separación de responsabilidades entre la capa de presentación y la lógica de control. 

En cuanto a la interacción con el usuario, la aplicación incorpora una interfaz basada en controles interactivos tales como sliders, campos numéricos y selectores, que permiten modificar en tiempo real los parámetros que definen los patrones generados (radios, velocidades angulares, fase, número de ciclos, entre otros). Estos cambios se reflejan de manera inmediata en la visualización, sin necesidad de recargar la página, garantizando una experiencia fluida e interactiva. 

El sistema incluye funcionalidades adicionales como el control del ciclo de animación (inicio, pausa y reinicio), la limpieza del lienzo, la generación de variaciones automáticas mediante valores aleatorios controlados y la posibilidad de restablecer configuraciones por defecto. Asimismo, se contempla la capacidad de almacenar configuraciones predefinidas y exportar las composiciones generadas en formato de imagen estándar, lo que amplía las posibilidades de uso de la aplicación. 

Desde el punto de vista del rendimiento, se han considerado estrategias de optimización para garantizar una ejecución eficiente de la animación en tiempo real, minimizando el consumo de recursos del navegador, especialmente en lo relativo al uso de CPU. Esto resulta especialmente relevante dado el carácter continuo de la generación gráfica. 

Finalmente, la aplicación será desplegada en una plataforma de hosting en la nube, concretamente en Netlify, lo que permitirá su disponibilidad pública y acceso mediante URL. Esta solución facilita la integración continua y el despliegue automatizado, además de ofrecer un entorno escalable y fiable para la distribución de la aplicación. 

## 3.2.2. Especificación de la aplicación 

Tras definir la propuesta técnica y analizar los requisitos del proyecto, se concreta como solución el desarrollo de una aplicación web interactiva orientada a la generación de composiciones visuales mediante patrones orbitales basados en curvas epicicloidales. Esta aplicación se enmarca dentro del ámbito de la creatividad computacional y la visualización matemática, ofreciendo al usuario una herramienta accesible para la exploración y experimentación con sistemas dinámicos paramétricos. 

Tal y como se estableció en los objetivos iniciales, las principales premisas del desarrollo serán: 

- Proporcionar una herramienta interactiva que permita la generación de patrones visuales complejos a partir de modelos matemáticos parametrizables. 

- Facilitar la experimentación en tiempo real mediante la modificación dinámica de parámetros, favoreciendo la comprensión visual de los comportamientos generados. 

- Ofrecer una experiencia de usuario intuitiva que permita el uso de la aplicación sin necesidad de conocimientos técnicos avanzados. 

- Garantizar un entorno fluido y reactivo que permita la visualización continua de animaciones sin interrupciones ni recargas. 

- Fomentar la creatividad del usuario mediante la generación de variaciones automáticas y la posibilidad de almacenar y reutilizar configuraciones. 

Para ello, la aplicación contará con una interfaz clara e intuitiva desde la cual se podrá acceder a las funcionalidades principales, que se enumeran a continuación sin entrar en detalle, ya que serán descritas en profundidad en apartados posteriores: 

- Generación de patrones visuales basados en curvas epicicloidales mediante parámetros configurables. 

- Modificación en tiempo real de variables como radios, velocidades angulares, fase, número de ciclos, color y grosor de trazo. 

- Visualización dinámica del patrón generado en un lienzo interactivo, sin necesidad de recarga de la página. 

- Control de la animación, permitiendo iniciar, pausar y reiniciar la ejecución del sistema. 

- Limpieza del lienzo y reinicio de la composición para la creación de nuevos patrones. 

- Generación de variaciones automáticas mediante valores aleatorios controlados. 

- Almacenamiento y recuperación de configuraciones predefinidas de parámetros. 

- Exportación de las composiciones generadas en formato de imagen. 

- Visualización de los valores actuales de los parámetros utilizados. 

- Adaptación de la interfaz y del lienzo a diferentes tamaños de pantalla, garantizando una experiencia responsiva. 

Esta especificación define los pilares funcionales de la aplicación, estableciendo una base sólida para su posterior desarrollo, diseño de interfaz y validación experimental. Asimismo, sienta las bases para futuras ampliaciones, como la incorporación de nuevos modelos matemáticos, modos de visualización adicionales o funcionalidades orientadas a la compartición de contenido generado. 

## 3.3. Estimación de costes 

## 3.3.1. Planificación 

## **Metodología de trabajo** 

Dado que el desarrollo de la aplicación web se realiza de forma individual, se ha optado por una adaptación de metodologías ágiles, concretamente basada en los principios de Scrum, con el objetivo de organizar y gestionar el proyecto de manera eficiente y flexible. 

El desarrollo se ha estructurado en fases iterativas, equivalentes a pequeños ciclos de trabajo, en los que se definen objetivos concretos y alcanzables. Al finalizar cada iteración, se realiza una revisión del progreso, evaluando el grado de cumplimiento de las tareas y ajustando la planificación en función de las necesidades detectadas. Este enfoque permite una evolución progresiva del sistema, facilitando la detección temprana de problemas y la incorporación de mejoras de forma continua. 

Para la gestión y seguimiento de las tareas, se ha utilizado una hoja de cálculo (Microsoft Excel), en la que se organiza el trabajo mediante una planificación temporal estructurada. En dicha herramienta se registran aspectos como: 

- La descripción de cada tarea a realizar. 

- La estimación temporal asociada a cada actividad. 

- Los plazos de ejecución definidos. 

- El porcentaje de finalización de cada tarea, permitiendo un seguimiento cuantitativo del progreso. 

Este sistema, aunque sencillo, resulta eficaz para un entorno de desarrollo individual, ya que proporciona una visión clara del estado del proyecto en todo momento, facilitando la organización del trabajo y la toma de decisiones. 

Esta metodología permite mantener un control continuo sobre la evolución del proyecto, garantizando el cumplimiento de los objetivos establecidos y permitiendo adaptarse de forma ágil ante posibles cambios en los requisitos o en la planificación inicial. 

## **Descomposición del proyecto** 

Para la estimación de los costes temporales y económicos, el desarrollo del proyecto se ha dividido en distintos bloques o fases, que corresponden a los principales apartados de la memoria y del proceso de desarrollo: 

## **Estado del arte** 

En esta fase se realiza un análisis de las tecnologías y herramientas relevantes para el desarrollo de la aplicación web. Se estudian frameworks como Angular y librerías de visualización gráfica como p5.js, así como otras alternativas existentes, con el objetivo de justificar las decisiones tecnológicas adoptadas. Asimismo, se analizan aplicaciones y proyectos similares en el ámbito de la visualización generativa y la creatividad computacional. 

## **Requisitos, especificaciones, coste, riesgos y viabilidad** 

Durante esta etapa se definen los requisitos funcionales y no funcionales del sistema, 

estableciendo las bases del comportamiento esperado de la aplicación. Además, se concreta la propuesta técnica, se realiza la planificación del desarrollo y se evalúan aspectos como la viabilidad del proyecto y los posibles riesgos asociados, tales como limitaciones de rendimiento en el navegador o dificultades en la integración entre Angular y p5.js. 

## **Análisis** 

En esta fase se identifican las principales funcionalidades del sistema y su interacción con el usuario. Se elaboran diagramas de casos de uso, diagramas de clases y diagramas de secuencia, con el objetivo de modelar el comportamiento del sistema y definir su estructura conceptual. 

## **Diseño** 

Se define la arquitectura de la aplicación, basada en el modelo de componentes de Angular, así como la organización de la lógica gráfica implementada con p5.js. Además, se realiza el diseño de la interfaz de usuario, teniendo en cuenta criterios de usabilidad, claridad visual y accesibilidad. 

## **Implementación de la aplicación web** 

En esta fase se desarrolla la aplicación utilizando Angular para la lógica de control y p5.js para la generación gráfica. Se implementan funcionalidades como la modificación de parámetros en tiempo real, el control de la animación, la generación de patrones y la exportación de imágenes. Asimismo, se lleva a cabo la integración entre ambas tecnologías, garantizando un funcionamiento coherente del sistema. 

## **Pruebas y resultados** 

Se realizan pruebas funcionales para verificar el correcto funcionamiento de las distintas características de la aplicación, así como pruebas de rendimiento para asegurar una ejecución fluida en tiempo real. Finalmente, se analizan los resultados obtenidos y se realizan los ajustes necesarios para mejorar la estabilidad y la experiencia de usuario. 

## 3.3.2. Costes de plazos de ejecución 

En esta sección se estima la inversión temporal necesaria para el desarrollo de la aplicación web, desglosando el tiempo requerido para cada una de las fases del proyecto. Una planificación adecuada permite garantizar la viabilidad del desarrollo dentro del periodo disponible, así como optimizar la organización del trabajo. 

Para la estimación de la duración de las tareas se ha empleado la técnica de estimación por tres valores, ampliamente utilizada en la gestión de proyectos software. Esta metodología permite obtener una estimación más realista al considerar distintos escenarios posibles durante el desarrollo. 

Se definen los siguientes valores: 

- **Optimista (to):** tiempo mínimo necesario en condiciones ideales. 

- **Más probable (tm):** estimación más realista en condiciones normales. 

- **Pesimista (tp):** tiempo máximo considerando posibles dificultades. 

El tiempo estimado final (te) se calcula mediante la siguiente expresión: 

**==> picture [89 x 15] intentionally omitted <==**

6 

A continuación, se detallan las estimaciones temporales para cada una de las fases del proyecto. 

_Tabla Requisitos, especificaciones, coste, riesgos y viabilidad.1_ Estimacion temporal en días del Estado del arte 

|**Actividad**|**_to_**|**_tm_**|**_tp_**|**_te_**|
|---|---|---|---|---|
|Analisis de aplicaciones y proyectos similares|6|8|12|8,33|
|Estudio de tecnologías (Angular, p5.js, alternativas)|8|12|16|12|
|Total|14|20|28|20,33|



_Tabla Requisitos, especificaciones, coste, riesgos y viabilidad.2_ Requisitos, especificación, costes y viabilidad 

|<br>viabilidad|||||
|---|---|---|---|---|
|**Actividad**|**_to_**|**_tm_**|**_tp_**|**_te_**|
|Definición de requisitos funcionales y no funcionales|4|6|8|6|
|Especificación técnica y de la aplicación|4|6|8|6|
|Planificación y estimación de costes|3|5|7|5|
|Análisis de riesgos y viabilidad|3|5|7|5|
|Total|14|22|30|22|



_Tabla Requisitos, especificaciones, coste, riesgos y viabilidad.3_ Análisis del sistema 

|**Actividad**|**_to_**|**_tm_**|**_tp_**|**_te_**|
|---|---|---|---|---|
|Definición de casos de uso|5|8|12|8,17|
|Elaboracción de diagramas|8|12|16|12|
|Modelado conceptual del sistema|6|10|14|10|
|Total|19|30|42|30,17|



_Tabla Requisitos, especificaciones, coste, riesgos y viabilidad.4_ Diseño de la aplicación 

|**Actividad**|**_to_**|**_tm_**|**_tp_**|**_te_**|
|---|---|---|---|---|
|Diseño de arquitectura Angular|8|12|16|12|
|Diseño de la interfaz de usuario (UI)|12|20|28|20|
|Integración con p5.js|6|10|14|10|
|Total|26|42|58|42|



_Tabla Requisitos, especificaciones, coste, riesgos y viabilidad.5_ Implementación de la aplicación 

|**Actividad**|**_to_**|**_tm_**|**_tp_**|**_te_**|
|---|---|---|---|---|
|Configuración del proyecto Angular|4|6|8|6|
|Integración de p5.js en Angular|8|12|18|12,33|
|Implementación del sistema de generación de patrones|30|45|60|45|
|Desarrollo de la UI|25|35|50|35,83|
|Implementación de animación y control de ejecución|15|25|35|25|
|Guardado de configuraciones y exportación de imágenes|10|15|20|15|
|Adaptación responsiva|8|12|18|12,33|
|Total|100|150|209|151,50|



_Tabla Requisitos, especificaciones, coste, riesgos y viabilidad.6_ Pruebas y resultados 

|**Actividad**|**_to_**|**_tm_**|**_tp_**|**_te_**|
|---|---|---|---|---|
|Pruebas funcionales|10|15|20|15|
|Pruebas de rendimiento y optimización|12|18|25|18,17|
|Ajustes y corrección de errores|12|15|25|16,17|
|Total|34|48|70|49,33|



## **Estimación total del proyecto** 

|**Estimación total del proyecto**||
|---|---|
|Fase|**_te_**|
|Estado del arte|20,33|
|Requisitos y especificación|22|
|Análisis|30,17|
|Diseño|42|
|Implementación|151,5|
|Pruebas|49,33|
|Total estimado|315,33 horas|



Como se puede observar, el esfuerzo total estimado para el desarrollo del proyecto asciende a 315,33 horas de trabajo efectivo. Considerando un margen de contingencia del 10% destinado a cubrir posibles retrasos derivados de exámenes, prácticas académicas, tutorías y otras incidencias, la planificación final contempla un total de **346,86 horas** de dedicación. 

## 3.3.3. Costes económicos 

A continuación se realiza una estimación económica del proyecto. Aunque la aplicación ha sido desarrollada de forma individual como Trabajo Fin de Grado, se plantea un escenario profesional en el que las tareas realizadas son llevadas a cabo por distintos perfiles especializados. 

Para estimar los salarios anuales se han tomado como referencia estudios salariales del sector tecnológico español publicados por consultoras de recursos humanos 

especializadas [4][5][6]. A partir de dichos salarios se calcula el coste horario considerando una jornada anual de 1.800 horas de trabajo efectivo. 

En este proyecto se consideran tres perfiles profesionales: 

- Jefe de Proyecto: responsable de la planificación, coordinación, definición de objetivos y supervisión del desarrollo. 

- Ingeniero Multimedia: responsable del análisis, diseño, implementación de la aplicación web, integración de Angular y p5.js, desarrollo de la interfaz de usuario y programación de los algoritmos de generación gráfica. 

- Tester: encargado de la realización de pruebas funcionales, pruebas de compatibilidad y validación de requisitos. 

Para el **Jefe de Proyecto** se considera un salario bruto anual de **45.000 €** , valor habitual para perfiles con experiencia en gestión de proyectos software. 

Para el **Ingeniero Multimedia** se considera un salario bruto anual de **37.000 €** , correspondiente a un desarrollador web junior o de nivel intermedio especializado en tecnologías frontend modernas. 

Finalmente, para el perfil de **Tester** se considera un salario bruto anual de **38.000 €** , valor representativo para perfiles de aseguramiento de calidad en proyectos software. 

Teniendo en cuenta las horas estimadas durante la planificación temporal del proyecto, se obtiene la estimación mostrada en la Tabla X. 

|**Rol**|**Horas**|**Salario**<br>**anual**|**Salario**<br>**mensual**|**Coste**<br>**por**<br>**hora**|**Coste**<br>**directo**|**Seguridad**<br>**Social (33%)**|**Total**|
|---|---|---|---|---|---|---|---|
|Jefe<br>de<br>Proyecto|50|35.000 €|3.181,82 €|17,80 €|890,00 €|293,70 €|1.183,70 €|
|Ingeniero<br>Multimedia|240|37.000 €|3.363,64 €|18,66 €|4.478,40 €|1.477,87 €|5.956,27 €|
|Tester|40|38.000 €|3.454,55 €|20,00 €|800,00 €|264,00 €|1.064,00 €|
|**Total**|**330**|**110.000 €**|**10.000,00 €**|**56,46 €**|**6.168,40 €**|**2.035,57 €**|**8.203,97 €**|



Para calcular los costes directos del proyecto se han utilizado los salarios medios anuales, mensuales y el coste medio por hora correspondientes a cada perfil profesional, obtenidos a partir de las fuentes especializadas sobre empleo y salarios en España. A partir de estos valores, el coste directo de cada perfil se calcula multiplicando el coste por hora por el número de horas estimadas de dedicación al proyecto. Posteriormente, se añade un 33 % correspondiente a los costes empresariales asociados a la Seguridad Social. 

El coste directo total del proyecto asciende a **8.203,97 €** . 

En cuanto a los recursos hardware y software utilizados durante el desarrollo, la mayoría de las herramientas empleadas disponen de licencias gratuitas o de código abierto. Tecnologías como Angular, p5.js, Visual Studio Code, GitHub y la plataforma de despliegue utilizada no generan costes de licencia, por lo que únicamente se 

considera la amortización de los equipos informáticos empleados durante el desarrollo del proyecto. Con todo esto en cuenta, la tabla de amortizaciones quedaría así: 

|**Elemento**|**Coste**|**Vida útil**<br>**(años)**|**Años**<br>**utilizados**|**Utilización**<br>**proyecto**|**Precio de**<br>**amortización**|**Amortización**|
|---|---|---|---|---|---|---|
|Ordenador<br>principal<br>de<br>desarrollo|1.500 €|4|0,5|100%|1,03 €|187,50 €|
|Monitor<br>externo|200 €|5|0,5|75%|0,11 €|15,00 €|
|Angular|0 €|-|-|-|-|0 €|
|p5.js|0 €|-|-|-|-|0 €|
|Visual<br>Studio<br>Code|0 €|-|-|-|-|0 €|
|**Total**|**1.700 €**|-|-|-|-|**202,50 €**|



La amortización de los equipos utilizados durante el desarrollo del proyecto se calcula distribuyendo su coste de adquisición a lo largo de la vida útil estimada de cada dispositivo. Para ello, en primer lugar se obtiene el precio de amortización diario mediante la siguiente expresión: 

Precio de amortización = Precio de adquisición / Vida útil (días) 

Una vez obtenido este valor, se calcula la amortización imputable al proyecto considerando el número de días de utilización y el porcentaje de uso de cada equipo: 

Amortización = Nº de días de uso * % de utilización * Precio de amortización 

Este procedimiento permite asignar únicamente la parte proporcional del coste de cada recurso hardware correspondiente al periodo efectivo de utilización durante el desarrollo del proyecto. 

Como resultado de estos cálculos, el coste total de amortización asciende a 202,50 €. 

Para calcular los costes indirectos se aplica un porcentaje de overhead del 20 % sobre la suma de los costes directos y los costes de amortización. Este porcentaje engloba gastos generales asociados al desarrollo del proyecto que no pueden imputarse directamente a una tarea concreta, tales como el consumo eléctrico, la conexión a internet o la utilización del espacio de trabajo. 

Costes indirectos = (8.203,97 + 202,50) × 0,20 = 1.681,29 € 

Finalmente, la estimación económica total del proyecto se resume en la Tabla X. 

||Costes<br>Directos|Costes<br>Amortización|Costes<br>Indirectos|Total|
|---|---|---|---|---|
|Total|8.203,97 €|202,50 €|1.681,29 €|10.087,76 €|



Por tanto, el coste total estimado para el desarrollo profesional de la aplicación asciende a **10.087,76 €** , incluyendo los costes de personal, la amortización de los equipos utilizados y los gastos indirectos asociados al desarrollo del proyecto. 

## 3.4. Riesgos 

En esta sección se identifican y analizan los posibles riesgos que podrían generar inconvenientes durante el desarrollo del proyecto. El objetivo es anticiparse a dichos riesgos, minimizando su impacto y estar preparados en caso de que lleguen a materializarse. Para ello, se clasificarán los riesgos y se propondrán medidas para su gestión adecuada. 

Los riesgos pueden ser clasificados de la siguiente forma: 

- **Inaceptable:** El proyecto no puede avanzar sin aplicar acciones correctivas inmediatas que reduzcan significativamente la probabilidad de ocurrencia y/o el impacto del riesgo. 

- **Alto:** Representa una amenaza considerable para los plazos y el presupuesto. Puede comprometer hiros clave y afectar a otros proyectos relacionados. 

- **Moderado:** Su impacto en tiempo y costes es limitado. No interfiere con los hios del proyecct no con iniciativas paralelas. 

- **Bajo:** Tiene una influencia mínima sobre el desarrollo del proyecto, aunque debe ser supervisado periódicamente para evitar que escale a niveles superiores. 

En la siguiente tabla (NUMERO TABLA)se exponen los riesgos identificados para el desarrollo de una aplicación web. Los riesgos se clasifican en función de su Nivel de Riesgo, el cual se obtiene multiplicando la probabilidad de ocurrencia del riesgo por el impacto potencial que tendría sobre el proyecto. Esta evaluación permite que prioricemos los riesgos y establezcamos planes de acción proporcionales a la gravedad de los riesgos. La clasificación del Nivel de Riesgo se basa en los siguientes rangos: 

- **Inaceptable** : N.Riesgo mayor a 2.5. 

- **Alto** : N.Riesgo entre 1.5 y 2.5. 

- **Moderado** : N.Riesgo entre 0.75 y 1.5. 

- **Bajo** : N.Riesgo entre 0.1 y 0.75. 

- **Nulo** : N.Riesgo menor o igual a 0.1. 

Esta clasificación permite establecer prioridades entre los distintos riesgos identificados y aplicar las medidas más adecuadas para su gestión. A continuación, se presentan los principales eventos de riesgo junto con su probabilidad de ocurrencia, el 

impacto estimado, el nivel de riesgo calculado y su correspondiente categoría según la escala definida: 

|**Evento**|**Probabilidad**|**Impacto**|**N. Riesgo**|**Clasificación**|
|---|---|---|---|---|
|Problemas de integración entre Angular y<br>p5.js|35%|8|2.80|Inaceptable|
|Bajo rendimiento durante la generación de<br>patrones complejos|30%|6|1.80|Alto|
|Fallos críticos en la implementación de los<br>algoritmos matemáticos|20%|7|1.40|Moderado|
|Cambios en los requisitos o funcionalidades<br>previstas|35%|4|1.40|Moderado|
|Incompatibilidades entre navegadores web|25%|5|1.25|Moderado|
|Problemas de usabilidad en la interfaz de<br>control|25%|4|1.00|Moderado|
|Pérdida accidental de código o<br>configuraciones del proyecto|10%|8|0.80|Moderado|
|Dificultades en el despliegue y publicación de<br>la aplicación|15%|4|0.60|Bajo|
|Errores en la exportación de imágenes<br>generadas|15%|3|0.45|Bajo|
|Dependencia de librerías externas (Angular o<br>p5.js)|5%|4|0.20|Bajo|



Si se identifica algún riesgo de nivel inaceptable la prioridad es solucionarlo; para ello, es imprescindible implementar medidas de mitigación para reducirlo. 

## **Riesgo 1: Problemas de integración entre Angular y p5.js** 

## **Descripción** 

Existe el riesgo de que surjan incompatibilidades o dificultades durante la integración entre Angular y la librería gráfica p5.js. Estas dificultades pueden afectar al ciclo de vida de los componentes, la sincronización de parámetros en tiempo real o la gestión del lienzo de dibujo. 

## **Contingencia** 

- Desarrollar prototipos tempranos de integración. 

- Utilizar componentes independientes para encapsular el sketch de p5.js. 

- Mantener una separación clara entre la lógica de Angular y la lógica gráfica. 

- Realizar pruebas continuas tras cada modificación importante. 

## **Evaluación del riesgo inicial** 

- Probabilidad inicial: 35% 

- Impacto inicial: 8 semanas de retraso 

- Nivel de riesgo: Inaceptable (2.80) 

## **Evaluación del riesgo mitigado** 

- Probabilidad mitigada: 15% 

- Impacto mitigado: 3 semanas de retraso 

- Nivel de riesgo mitigado: Bajo (0.45) 

## **Riesgo 2: Bajo rendimiento durante la generación de patrones complejos** 

## **Descripción** 

La generación y renderizado continuo de miles de líneas puede provocar una disminución del rendimiento, especialmente en equipos con recursos limitados. Esto puede traducirse en animaciones poco fluidas o un uso excesivo de CPU. 

## **Contingencia** 

- Optimizar los algoritmos de dibujo. 

- Reducir operaciones innecesarias en cada fotograma. 

- Limitar la frecuencia de actualización cuando sea necesario. 

- Realizar pruebas de rendimiento periódicas. 

## **Evaluación del riesgo inicial** 

- Probabilidad inicial: 30% 

- Impacto inicial: 6 semanas de retraso 

- Nivel de riesgo: Alto (1.80) 

## **Evaluación del riesgo mitigado** 

- Probabilidad mitigada: 15% 

- Impacto mitigado: 2 semanas de retraso 

- Nivel de riesgo mitigado: Bajo (0.30) 

## **Riesgo 3: Fallos críticos en la implementación de los algoritmos matemáticos** 

## **Descripción** 

La aplicación se basa en cálculos matemáticos para generar los patrones orbitales. Errores en las fórmulas, transformaciones geométricas o cálculos de posiciones pueden producir resultados visuales incorrectos y requerir una revisión importante del código. 

## **Contingencia** 

- Validar los algoritmos mediante ejemplos conocidos. 

- Implementar pruebas unitarias para los cálculos matemáticos. 

- Documentar adecuadamente las fórmulas empleadas. 

- Comparar los resultados con el prototipo original desarrollado en Processing. 

## **Evaluación del riesgo inicial** 

- Probabilidad inicial: 20% 

- Impacto inicial: 7 semanas de retraso 

- Nivel de riesgo: Moderado (1.40) 

## **Evaluación del riesgo mitigado** 

- Probabilidad mitigada: 5% 

- Impacto mitigado: 2 semanas de retraso 

- Nivel de riesgo mitigado: Bajo (0.10) 

## 3.5. Viabilidad 

Antes de proceder con el desarrollo de la aplicación, resulta necesario realizar un análisis de viabilidad que permita evaluar la factibilidad del proyecto desde diferentes perspectivas. Para ello, se estudian los aspectos técnicos, económicos y legales relacionados con el desarrollo de la aplicación web propuesta. 

## 3.5.1. Viabilidad técnica 

La viabilidad técnica tiene como objetivo determinar si el proyecto puede desarrollarse utilizando los recursos tecnológicos disponibles y si las tecnologías seleccionadas son adecuadas para cumplir los requisitos establecidos. 

La aplicación desarrollada se basa en tecnologías web ampliamente utilizadas en el ámbito profesional. El framework Angular se emplea como base para la construcción de la interfaz y la gestión de la lógica de la aplicación, mientras que la librería p5.js se utiliza para la generación y visualización de patrones gráficos en tiempo real mediante el elemento Canvas de HTML5. 

Angular proporciona una arquitectura modular basada en componentes reutilizables, facilitando la mantenibilidad, escalabilidad y organización del código. Por su parte, p5.js ofrece un entorno especialmente orientado a la programación creativa y a la visualización interactiva, permitiendo implementar de forma eficiente los algoritmos matemáticos responsables de la generación de patrones orbitales. 

Asimismo, el desarrollo se apoya en tecnologías estandarizadas como HTML5, CSS3, TypeScript y JavaScript, todas ellas ampliamente documentadas y respaldadas por comunidades de desarrollo activas. Esto facilita la resolución de incidencias técnicas y garantiza la disponibilidad de recursos de aprendizaje y soporte. 

La aplicación se desplegará en una plataforma de alojamiento en la nube, concretamente Netlify, permitiendo su acceso público a través de un navegador web sin necesidad de instalación local. Además, al tratarse de una aplicación cliente sin dependencia de servidores propios ni bases de datos complejas, la infraestructura requerida es mínima. 

Por todo ello, puede concluirse que el proyecto es técnicamente viable, ya que las tecnologías seleccionadas son maduras, estables y adecuadas para la implementación de los requisitos funcionales y no funcionales definidos. 

## 3.5.2. Viabilidad económica 

La viabilidad económica evalúa si los costes asociados al desarrollo del proyecto son asumibles y compatibles con los recursos disponibles. 

Al tratarse de un Trabajo Fin de Grado desarrollado por un único estudiante, no se requiere la contratación de personal externo ni la adquisición de equipamiento adicional. El desarrollo se realiza utilizando un ordenador personal ya disponible y herramientas de software gratuitas o de código abierto. 

Las principales tecnologías empleadas, como Angular, p5.js, Visual Studio Code, Node.js y GitHub, son completamente gratuitas. Del mismo modo, la plataforma Netlify dispone de un plan gratuito que permite desplegar aplicaciones web estáticas sin coste económico para proyectos académicos o de pequeña escala. 

Por tanto, el coste económico real del proyecto es prácticamente nulo, limitándose al consumo eléctrico del equipo utilizado durante el desarrollo y a la conexión a Internet necesaria para el acceso a repositorios y servicios de despliegue. 

Desde una perspectiva profesional, la viabilidad económica también resulta favorable, ya que la arquitectura propuesta minimiza costes de infraestructura al no requerir servidores dedicados ni servicios externos de pago para su funcionamiento básico. 

En consecuencia, se considera que el proyecto es económicamente viable. 

## 3.5.3. Análisis legal 

El análisis legal tiene como finalidad identificar posibles restricciones normativas que puedan afectar al desarrollo, distribución o utilización de la aplicación. 

Dado que la aplicación no almacena información personal de los usuarios ni requiere procesos de autenticación o registro, el impacto de la normativa relacionada con la protección de datos personales es reducido. No obstante, cualquier tratamiento futuro de datos deberá adaptarse a lo establecido por el Reglamento General de Protección de Datos (RGPD) y la legislación aplicable en materia de privacidad. 

En relación con la propiedad intelectual, se utilizarán exclusivamente librerías, herramientas y recursos cuyos términos de licencia permitan su uso en proyectos académicos. Angular, p5.js, Node.js y otras dependencias utilizadas se distribuyen bajo licencias de software libre o de código abierto que permiten su utilización y modificación. 

Respecto al contenido generado por la aplicación, los patrones visuales son producidos algorítmicamente a partir de parámetros definidos por el usuario, por lo que no existe reutilización de contenido protegido por derechos de autor. 

Asimismo, el despliegue mediante Netlify se realizará respetando los términos y condiciones establecidos por la plataforma. 

Tras analizar estos aspectos, no se identifican impedimentos legales significativos para el desarrollo, publicación y utilización de la aplicación dentro del contexto 

académico en el que se desarrolla este proyecto, por lo que puede considerarse legalmente viable. 

## 4. Análisis 

En este capítulo se analiza la aplicación desarrollada desde una perspectiva funcional, identificando las principales interacciones entre el usuario y el sistema, así como los elementos que intervienen en la generación de los patrones visuales. 

Para llevar a cabo este análisis se han utilizado distintos diagramas UML elaborados con Visual Paradigm. Estos diagramas permiten representar de forma gráfica tanto las funcionalidades disponibles para el usuario como la estructura conceptual de la aplicación y el flujo de interacción que se produce durante su utilización. 

En primer lugar, se presenta el diagrama de casos de uso, donde se identifican las distintas acciones que el usuario puede realizar dentro de la aplicación. Posteriormente, se describe el diagrama de clases conceptual, cuyo objetivo es representar las entidades principales del dominio del problema y las relaciones existentes entre ellas. Finalmente, se incluye un diagrama de secuencia para cada uno de los casos de uso identificados, que permiten visualizar el intercambio de acciones entre el usuario y el sistema durante la ejecución de cada funcionalidad. 

A diferencia de otras aplicaciones web, Epicycloid Generator se ejecuta íntegramente en el navegador y no requiere registro de usuarios ni conexión con servicios externos para su funcionamiento. Por este motivo, existe un único actor que interactúa directamente con todas las funcionalidades ofrecidas por la aplicación. 

## 4.1. Diagrama de casos de uso 

Esta herramienta se emplea principalmente durante las etapas de análisis y diseño de un sistema, ya que ayuda a organizar y comprender mejor su funcionamiento. El diagrama de casos de uso es una representación gráfica que muestra cómo los usuarios interactúan con el sistema, identificando las distintas funcionalidades que pueden ejecutar. 

En el caso de Epicycloid Generator existe un único actor, denominado **Usuario** , que interactúa con la aplicación web para generar composiciones visuales basadas en patrones orbitales paramétricos. 

Las principales acciones que puede realizar el usuario son las siguientes: 

- Configurar parámetros. 

- Reproducir la animación. 

- Pausar animación. 

- Alternar modo de visualización. 

- Limpiar Lienzo. 

- Restablecer los parámetros. 

- Cambiar Idioma. 

- Ajustar zoom. 

- Exportar imagen PNG. 

- Exportar patrón JSON. 

- Importar patrón JSON. 

- Consultar tutorial 

- Generar variación aleatoria 

- Aplicar ejemplo predefinido 

Asimismo, existen relaciones de inclusión entre determinados casos de uso. La exportación de imágenes requiere previamente la configuración de las opciones de exportación, mientras que la importación de patrones implica necesariamente la reconstrucción de la composición a partir de los datos almacenados en el archivo importado. 

La Figura 4.1 muestra el diagrama de casos de uso correspondiente a la aplicación desarrollada. 

## 4.1.1. Flujo de eventos de casos de uso 

Los flujos de eventos permiten describir el comportamiento de cada caso de uso, indicando la secuencia de acciones que realiza el usuario y la respuesta que proporciona el sistema. 

Se distinguen dos tipos de flujo: 

- **Flujo principal** , que representa el comportamiento habitual esperado durante la ejecución del caso de uso. 

- **Flujos alternativos** , que describen situaciones excepcionales o comportamientos diferentes al flujo principal. 

A continuación, se presentan las tablas correspondientes a cada uno de los casos de uso identificados. 

## **CU1: Configurar parámetros** 

|**Campo**|**Contenido**|
|---|---|
|**ID del caso de uso**|CU1 — Configurar parámetros|
|**Actor principal**|Usuario|
|**Descripción**|El usuario ajusta los parámetros matemáticos y visuales de la<br>composición (radios, velocidades, fases, factores elípticos,<br>inclinación, color, opacidad, grosor e intervalo).|
|**Requisitos cumplidos**|RF2, RF9, RF10|
|**Precondiciones**|La animación está pausada.|
|**Flujo de eventos**|1. El usuario abre uno de los grupos de parámetros (Órbita 1, Órbita<br>2, Visual, Avanzados). 2. El usuario modifica el valor de un control.<br>3. El sistema registra el nuevo valor y lo refleja inmediatamente en<br>la vista.|
|**Postcondiciones**|Los parámetros activos quedan actualizados y reflejados en el<br>lienzo.|
|**Flujo alternativo**|2a. Si la animación está en curso, los controles no están disponibles;<br>el usuario debe pausar antes de poder modificar parámetros. 2b. Si<br>el usuario introduce un valor fuera del rango permitido, el sistema<br>lo ajusta automáticamente al límite más cercano (mínimo o<br>máximo).|



## **CU2: Reproducir animación** 

|**Campo**|**Contenido**|
|---|---|
|**ID del caso de uso**|CU2 — Reproducir animación|
|**Actor principal**|Usuario|
|**Descripción**|El usuario inicia la animación; el sistema comienza a acumular<br>trazas según los parámetros activos.|
|**Requisitos cumplidos**|RF1, RF3, RF4|
|**Precondiciones**|Existen parámetros válidos (siempre los hay, por defecto).|
|**Flujo de eventos**|1. El usuario pulsa “Play”. 2. El sistema anima la geometría y va<br>añadiendo las trazas resultantes al lienzo. 3. Los controles se<br>bloquean mientras la animación está activa.|
|**Postcondiciones**|La animación está en marcha y la composición crece<br>progresivamente.|



## **CU3: Pausar animación** 

|**Campo**|**Contenido**|
|---|---|
|**ID del caso de uso**|CU3 — Pausar animación|
|**Actor principal**|Usuario|
|**Descripción**|El usuario detiene la animación en curso.|
|**Requisitos cumplidos**|RF4|
|**Precondiciones**|La animación está en marcha.|
|**Flujo de eventos**|1. El usuario pulsa “Pausa”. 2. El sistema detiene la animación y<br>conserva el dibujo acumulado. 3. Los controles vuelven a estar<br>disponibles.|
|**Postcondiciones**|La composición queda detenida y editable.|



## **CU4: Alternar modo de visualización** 

|**Campo**|**Contenido**|
|---|---|
|**ID del caso de uso**|CU4 — Alternar modo de visualización|
|**Actor principal**|Usuario|
|**Descripción**|El usuario cambia entre el modo “intersección de líneas” y el modo|



||“curva epicicloidal”.|
|---|---|
|**Requisitos cumplidos**|RF8|
|**Precondiciones**|La animación está pausada.|
|**Flujo de eventos**|1. El usuario selecciona el otro modo de visualización. 2. El sistema<br>limpia el dibujo actual, ya que ambos modos producen<br>composiciones no comparables. 3. La vista pasa a representar el<br>nuevo modo.|
|**Postcondiciones**|El modo activo queda actualizado y el lienzo, limpio.|



## **CU5: Deshacer última sesión** 

|**Campo**|**Contenido**|
|---|---|
|**ID del caso de uso**|CU5 — Deshacer última sesión|
|**Actor principal**|Usuario|
|**Descripción**|El usuario elimina la última sesión (bloque de animación) dibujada.<br>Cada pulsación sucesiva retira un bloque más, sin afectar al resto de<br>la composición.|
|**Requisitos cumplidos**|RF5|
|**Precondiciones**|Existe al menos una sesión dibujada o una en curso.|
|**Flujo de eventos**|1. El usuario solicita deshacer la última sesión. 2. Si hay una<br>animación en curso, el sistema la detiene y la toma como la sesión a<br>eliminar. 3. El sistema elimina la última sesión y reconstruye el<br>dibujo con las sesiones restantes. 4. El sistema restaura los<br>parámetros al estado previo a esa sesión (los de la sesión anterior<br>que permanece en el lienzo).|
|**Postcondiciones**|La última sesión desaparece del lienzo; las anteriores se conservan<br>y los parámetros reflejan el estado previo a la sesión eliminada.|



**CU6: Restablecer parámetros** 

|**Campo**|**Contenido**|
|---|---|
|**ID del caso de uso**|CU6 — Restablecer parámetros|
|**Actor principal**|Usuario|
|**Descripción**|El usuario restaura todos los parámetros a sus valores por defecto.|
|**Requisitos cumplidos**|RF4, RF13|



|**Precondiciones**|Ninguna.|
|---|---|
|**Flujo de eventos**|1. El usuario pulsa “Reset”. 2. El sistema restaura los valores por<br>defecto y borra el dibujo.|
|**Postcondiciones**|Los parámetros vuelven a sus valores iniciales y el lienzo queda<br>limpio.|



## **CU7: Ajustar zoom** 

|**Campo**|**Contenido**|
|---|---|
|**ID del caso de uso**|CU7 — Ajustar zoom|
|**Actor principal**|Usuario|
|**Descripción**|El usuario acerca o aleja la vista del lienzo.|
|**Requisitos cumplidos**|RF11|
|**Precondiciones**|Ninguna.|
|**Flujo de eventos**|1. El usuario usa la rueda del ratón sobre el lienzo o los botones<br>＋/−. 2. El sistema acerca o aleja la vista dentro del rango<br>permitido.|
|**Postcondiciones**|La vista se reescala; la composición no se altera.|



## **CU8: Exportar imagen** 

|**Campo**|**Contenido**|
|---|---|
|**ID del caso de uso**|CU8 — Exportar imagen|
|**Actor principal**|Usuario|
|**Descripción**|El usuario guarda la composición actual como una<br>imagen.**Incluye**”Configurar opciones de exportación”.|
|**Requisitos cumplidos**|RF6|
|**Precondiciones**|Existe un dibujo en el lienzo.|
|**Flujo de eventos**|1. El usuario solicita exportar la imagen. 2. El sistema muestra una<br>previsualización. 3. El usuario configura fondo, zoom, resolución y<br>visibilidad de guías (caso de uso incluido). 4. El usuario confirma la<br>descarga. 5. El sistema genera y entrega la imagen.|
|**Postcondiciones**|El usuario obtiene una imagen de la composición.|



## **CU9: Exportar patrón** 

|**Campo**|**Contenido**|
|---|---|
|**ID del caso de uso**|CU9 — Exportar patrón|
|**Actor principal**|Usuario|
|**Descripción**|El usuario guarda el estado completo del dibujo en un archivo, para<br>poder recuperarlo más adelante.|
|**Requisitos cumplidos**|RF7|
|**Precondiciones**|Existe una composición (en curso o ya realizada).|
|**Flujo de eventos**|1. El usuario solicita exportar el patrón. 2. El sistema reúne la<br>información necesaria para reproducir la composición y la entrega<br>como archivo descargable.|
|**Postcondiciones**|El usuario obtiene un archivo reutilizable.|



## **CU10: Importar patrón** 

|**Campo**|**Contenido**|
|---|---|
|**ID del caso de uso**|CU10 — Importar patrón|
|**Actor principal**|Usuario|
|**Descripción**|El usuario carga un archivo de patrón previamente exportado y<br>recupera el dibujo.**Incluye**”Reconstruir el dibujo”.|
|**Requisitos cumplidos**|RF7|
|**Precondiciones**|El usuario dispone de un archivo de patrón válido.|
|**Flujo de eventos**|1. El usuario selecciona un archivo de patrón. 2. El sistema<br>reconstruye la composición a partir de la información del archivo<br>(caso de uso incluido). 3. El sistema actualiza los parámetros<br>mostrados al estado del patrón cargado.|
|**Postcondiciones**|La composición importada se muestra y el usuario puede<br>continuarla.|
|**Flujo alternativo**|1a. Si el archivo no es válido, el sistema descarta la importación e<br>informa de ello.|



## **CU11: Consultar tutorial** 

|**Campo**|**Contenido**|
|---|---|
|**ID del caso de uso**|CU11—Consultar tutorial|



|||
|---|---|
|**Actor principal**|Usuario|
|**Descripción**|El usuario consulta la guía de bienvenida que explica los modos y<br>los controles básicos.|
|**Requisitos cumplidos**|RNF4|
|**Precondiciones**|Ninguna.|
|**Flujo de eventos**|1. En la primera visita, el sistema muestra el tutorial<br>automáticamente. 2. El usuario lee la guía y la cierra<br>(opcionalmente indicando que no desea volver a verla). 3.<br>Posteriormente, el usuario puede reabrirlo cuando quiera.|
|**Postcondiciones**|El usuario conoce el funcionamiento básico de la aplicación.|



## **CU12: Generar variación aleatoria** 

|**Campo**|**Contenido**|
|---|---|
|**ID del caso de uso**|CU12 — Generar variación aleatoria|
|**Actor principal**|Usuario|
|**Descripción**|El usuario solicita generar una composición “única” asignando de<br>forma automática valores aleatorios al conjunto de parámetros que<br>definen el patrón, conservando el modo de visualización elegido.|
|**Requisitos cumplidos**|RF12|
|**Precondiciones**|La animación está pausada.|
|**Flujo de eventos**|1. El usuario solicita aleatorizar los parámetros. 2. El sistema asigna<br>a cada parámetro un valor aleatorio comprendido dentro de su rango<br>permitido (variación_controlada_). 3. El sistema refleja<br>inmediatamente la nueva configuración en la vista.|
|**Postcondiciones**|Los parámetros quedan actualizados con valores aleatorios válidos,<br>listos para reproducirse.|
|**Flujo alternativo**|1a. Si la animación está en curso, la acción no está disponible; el<br>usuario debe pausar antes de generar una variación.|



## **CU13: Cambiar idioma** 

|**Campo**|**Contenido**|
|---|---|
|**ID del caso de uso**|CU13 — Cambiar idioma|



|**Actor principal**|Usuario|
|---|---|
|**Descripción**|El usuario cambia el idioma de la interfaz seleccionándolo entre los<br>idiomas disponibles. El cambio afecta a todos los textos de la<br>aplicación.|
|**Requisitos cumplidos**|RF14|
|**Precondiciones**|Ninguna.|
|**Flujo de eventos**|1. El usuario abre el selector de idioma. 2. El usuario elige uno de<br>los idiomas disponibles. 3. El sistema actualiza inmediatamente<br>todos los textos de la interfaz al idioma seleccionado y conserva la<br>preferencia para futuras visitas.|
|**Postcondiciones**|La interfaz se muestra en el idioma elegido, que queda recordado.|
|**Flujo alternativo**|1a.**Detección automática:**en el primer acceso, antes de cualquier<br>elección manual, el sistema determina el idioma a partir de la<br>configuración del navegador del usuario y muestra la interfaz en ese<br>idioma; si el idioma del navegador no está disponible, utiliza el<br>idioma predeterminado (inglés).|



## **CU14: Aplicar ejemplo predefinido** 

|**Campo**|**Contenido**|
|---|---|
|**ID del caso de uso**|CU14 — Aplicar ejemplo predefinido|
|**Actor principal**|Usuario|
|**Descripción**|El usuario selecciona uno de los ejemplos de patrones predefinidos<br>que ofrece la aplicación y el sistema ajusta automáticamente todos<br>los parámetros a esa configuración, dejando la composición lista<br>para reproducirse.|
|**Requisitos cumplidos**|RF7|
|**Precondiciones**|Ninguna. La animación no debe estar en curso.|
|**Flujo de eventos**|1. El usuario abre el desplegable de ejemplos. 2. El usuario elige<br>uno de los ejemplos disponibles. 3. El sistema ajusta todos los<br>parámetros del panel a la configuración guardada del ejemplo. 4. El<br>usuario pulsa “Play” y el sistema dibuja el patrón correspondiente.|
|**Postcondiciones**|Los parámetros del panel reflejan el ejemplo elegido y la<br>composición se genera al reproducir.|
|**Flujo alternativo**|2a.**Lienzo en blanco:**el desplegable parte de una opción vacía; si<br>el usuario la mantiene o la vuelve a elegir, el sistema restablece los<br>parámetros por defecto. 3a. Si la animación está en curso, la acción<br>no está disponible; el usuario debe pausar antes de aplicar un<br>ejemplo. 4a. Si tras aplicar el ejemplo el usuario modifica|



manualmente un parámetro, el desplegable vuelve a la opción vacía, pues la configuración ya no corresponde a un ejemplo con nombre. 

## 4.2. Diagramas de clases conceptual 

En esta sección se presenta el diagrama de clases conceptual de la aplicación web, elaborado como parte del análisis previo al diseño e implementación del sistema. Su objetivo es ofrecer una visión general de los elementos que intervienen en la generación de patrones y de las relaciones existentes entre ellos. 

La aplicación se basa en un modelo de generación paramétrica en el que el usuario define una serie de valores que controlan el comportamiento de dos órbitas independientes. A partir de dichos parámetros, el sistema genera composiciones geométricas que pueden visualizarse, modificarse y exportarse posteriormente. 

Entre las entidades principales del dominio destacan el usuario, los parámetros que definen la simulación, las sesiones de dibujo generadas, los modos de visualización disponibles y las configuraciones de exportación. Todas estas entidades colaboran para permitir la creación y gestión de patrones geométricos de forma interactiva. 

El diagrama conceptual mostrado a continuación representa dichas relaciones desde un punto de vista funcional, sin entrar todavía en detalles específicos de implementación. 

## 4.3. Diagramas de secuencia del sistema 

En esta sección se presentan los diagramas de secuencia del sistema, que representan de forma ordenada cómo se desarrolla la interacción entre el usuario y la aplicación a lo largo del tiempo. Se incluye un diagrama por cada uno de los casos de uso descritos anteriormente (CU1–CU14), de modo que toda funcionalidad analizada queda reflejada también desde el punto de vista de su flujo de ejecución. 

## 4.4. Trazabilidad entre requisitos funcionales y casos de uso 

La siguiente tabla establece la relación de trazabilidad entre los requisitos funcionales definidos en el apartado de requisitos y los casos de uso analizados. Este vínculo permite verificar que cada funcionalidad prevista tiene su correspondiente representación en el análisis de comportamiento del sistema. 

|**Requisito**|**Descripción**|**Casos de uso relacionados**|
|---|---|---|
|RF1|Generación de<br>composiciones epicicloidales|CU2|



||mediante algoritmos<br>parametrizables||
|---|---|---|
|RF2|Modificar en tiempo real los<br>parámetros que definen los<br>patrones|CU1|
|RF3|Actualizar dinámicamente la<br>representación gráfica sin<br>recargar la página|CU1, CU2|
|RF4|Iniciar, pausar y reiniciar la<br>animación|CU2, CU3, CU6|
|RF5|Limpiar el lienzo y generar<br>una nueva composición<br>desde cero (mediante el<br>deshacer incremental de<br>sesiones)|CU5|
|RF6|Guardar la composición<br>como imagen|CU8|
|RF7|Almacenar configuraciones<br>de parámetros predefinidas y<br>recuperarlas posteriormente|CU14, CU9, CU10|
|RF8|Alternar entre modos de<br>visualización (curva e<br>intersección de líneas)|CU4|
|RF9|Controles interactivos<br>(sliders, selectores, campos<br>numéricos)|CU1|
|RF10|Mostrar en pantalla los<br>valores actuales de los<br>parámetros|CU1|
|RF11|Visualización responsiva del<br>lienzo, adaptándose a la<br>ventana del navegador|CU7|
|RF12|Generación de variaciones<br>automáticas mediante valores<br>aleatorios controlados|CU12|
|RF13|Restablecer los parámetros a<br>sus valores predeterminados|CU6|
|RF14|Soporte multilingüe: cambiar<br>dinámicamente el idioma de<br>la interfaz|CU13|



Como se observa en la tabla, todos los requisitos funcionales tienen al menos un caso de uso asociado, lo que garantiza que la totalidad de las funcionalidades previstas han sido contempladas durante el análisis. Conviene matizar que RF3 y RF11 describen además comportamientos automáticos del sistema (la actualización inmediata de la vista al modificar un parámetro y el reajuste del lienzo cuando cambia el tamaño de la ventana), que no constituyen acciones explícitas del usuario, pero quedan reflejados en el caso de uso más próximo. De forma análoga, RF14 incorpora un comportamiento automático, la detección del idioma del navegador en el primer acceso, que complementa la acción manual de cambio de idioma recogida en CU13. 

## 5. Diseño 

Tras definir los requisitos del sistema y analizar las funcionalidades que debe ofrecer la aplicación, es necesario establecer cómo se organizará su implementación. Este capítulo describe el diseño adoptado para _Epicycloid Generator_ , mostrando tanto el comportamiento dinámico de la aplicación durante las operaciones principales como las decisiones tomadas para construir su interfaz de usuario. 

En primer lugar, se presentan los diagramas de secuencia que detallan la interacción entre las distintas clases que componen el sistema cuando el usuario ejecuta las funcionalidades más relevantes. A diferencia de los diagramas del capítulo anterior, centrados en la visión conceptual de los casos de uso, los que se muestran aquí representan la implementación real del software mediante las clases y métodos utilizados durante el desarrollo. 

Posteriormente se describen los criterios seguidos para el diseño de la interfaz gráfica, justificando la distribución de los elementos, la organización de los controles y las decisiones adoptadas para mejorar la experiencia de uso, la accesibilidad y la consistencia visual. 

Dado que _Epicycloid Generator_ es una aplicación web de página única (Single Page Application), todas las operaciones se realizan sobre una única interfaz, sin cambios de pantalla ni procesos de navegación internos. En consecuencia, los diagramas de secuencia representan las distintas interacciones que el usuario puede realizar sobre el lienzo de dibujo y el panel de control. 

## 5.1. Diagrama de secuencia de operaciones del sistema 

## **Diagrama de secuencia de la operación “Generar y reproducir el patrón”** 

Este diagrama representa la operación central de la aplicación. El usuario ajusta los parámetros en el panel de control y el sistema actualiza al instante la representación en el lienzo. Al reproducir, el sistema inicia una sesión de animación y, mediante un bucle (loop), dibuja la composición fotograma a fotograma acumulando las trazas resultantes. Cuando el usuario pausa, el sistema cierra la sesión y la registra como un bloque, conservando el dibujo acumulado. 

_(Aquí va la Figura 5.1: Diagrama de secuencia “Generar y reproducir el patrón” — ver anexo.)_ 

## **Diagrama de secuencia de la operación “Deshacer última sesión”** 

Este diagrama ilustra el deshacer incremental de la composición. Al solicitar deshacer, un primer bloque condicional (alt) contempla que, si hay una animación en curso, el sistema la pausa primero para tomarla como la sesión a eliminar. A continuación, un segundo bloque alternativo distingue dos casos: si quedan sesiones anteriores, el sistema retira la última, reconstruye el dibujo con las restantes y restaura los parámetros previos; si no queda ninguna, el lienzo se vacía. En ambos casos, la estela se actualiza para reflejar el resultado. 

_(Aquí va la Figura 5.2: Diagrama de secuencia “Deshacer última sesión” — ver anexo.)_ 

## **Diagrama de secuencia de la operación “Exportar imagen”** 

Este diagrama describe el guardado de la composición como imagen. El usuario abre el diálogo de exportación y el sistema genera una previsualización a partir de la composición actual. Un bloque opcional (opt) recoge el ajuste de las opciones de exportación —fondo, zoom, resolución y elementos visibles—, que actualizan la previsualización. Al confirmar, el sistema genera la imagen final y la descarga. 

_(Aquí va la Figura 5.3: Diagrama de secuencia “Exportar imagen” — ver anexo.)_ 

## **Diagrama de secuencia de la operación “Importar patrón”** 

Este diagrama representa la recuperación de una composición guardada. El usuario selecciona un archivo, que el sistema lee y valida. Un bloque condicional (alt) distingue dos rutas: si el archivo es válido, el sistema reconstruye el dibujo y actualiza los parámetros mostrados al estado del patrón cargado; si no lo es, la importación se descarta. 

_(Aquí va la Figura 5.4: Diagrama de secuencia “Importar patrón” — ver anexo.)_ 

## **Diagrama de secuencia de la operación “Cambiar idioma”** 

Este diagrama refleja la detección automática y el cambio manual de idioma. Un bloque condicional (alt) contempla que, en el primer acceso, el sistema detecta el idioma del navegador. Para el cambio manual, el usuario abre el selector y elige un idioma; el sistema actualiza de inmediato todos los textos de la interfaz y recuerda la preferencia para futuras visitas, sin recargar la página. 

_(Aquí va la Figura 5.5: Diagrama de secuencia “Cambiar idioma” — ver anexo.)_ 

## 5.2. Diseño visual 

## 5.2.1. Principios de diseño 

El diseño de la interfaz se ha planteado con un objetivo claro: que el usuario pueda interactuar con la aplicación de forma sencilla y comprender rápidamente cómo afectan los distintos parámetros al patrón generado. 

## **Consistencia visual** 

Se ha mantenido una coherencia visual en toda la aplicación, utilizando los mismos estilos para botones, márgenes, colores y tipografías, lo que favorece una curva de aprendizaje mínima por parte del usuario. Todos los parámetros siguen el mismo patrón de control (etiqueta, deslizador y campo numérico), y las acciones se agrupan con un estilo de botón uniforme. Además, existe una correspondencia visual directa entre el panel de control y el lienzo, de modo que los elementos relacionados comparten el mismo tratamiento cromático. 

## **Paleta de colores** 

Se ha optado por una paleta equilibrada, en la que predominan los tonos oscuros y neutros para el fondo, combinados con colores vivos para los elementos interactivos. El fondo oscuro realza los trazos luminosos del patrón, favorece la legibilidad en entornos con poca luz y reduce la fatiga visual en sesiones prolongadas. Se ha incorporado además una **codificación cromática semántica** : el azul identifica a la primera órbita y el rojo a la segunda, de forma coherente entre los controles, las guías del lienzo y los planetas, lo que permite al usuario asociar de un vistazo cada control con su elemento. Los botones de acción siguen también un código de color coherente (por ejemplo, verde para reproducir o rojo para restablecer). 

## **Tipografía** 

En lo relativo a la tipografía, se ha optado por una fuente sans-serif estándar del sistema, lo que garantiza una buena legibilidad y una apariencia coherente en diferentes dispositivos y navegadores sin necesidad de cargar recursos externos adicionales. Esta decisión contribuye también a mantener un rendimiento óptimo y una mayor simplicidad en el desarrollo. 

Distribución de la interfaz 

La organización de la interfaz responde a una estructura jerárquica clara, dividida en dos áreas principales dentro de una única vista. El lienzo de visualización ocupa aproximadamente dos tercios del espacio disponible, situándose en la zona izquierda, mientras que el panel de control se dispone a la derecha. 

Esta distribución permite que el usuario pueda modificar parámetros y observar sus efectos de forma simultánea, sin necesidad de cambiar de pantalla ni interrumpir el flujo de interacción. Dentro del panel, los controles se organizan siguiendo un criterio de progresión lógica, desde opciones más generales hasta ajustes más específicos. Las acciones principales se mantienen siempre visibles en la parte inferior, mientras que elementos secundarios como el zoom, la ayuda o el selector de idioma se ubican en zonas menos intrusivas de la interfaz, pero siguen siendo fácilmente accesibles. 

Esta estructura contribuye a reducir la carga cognitiva del usuario y a mejorar la eficiencia en la interacción, ya que minimiza el número de pasos necesarios para acceder a las funciones más relevantes. 

## **Accesibilidad y adaptabilidad** 

La aplicación ha sido diseñada teniendo en cuenta diferentes tamaños de pantalla y contextos de uso. El lienzo se adapta de forma dinámica al tamaño de la ventana del navegador, mientras que el panel de control mantiene una disposición flexible que funciona correctamente tanto en entornos de escritorio como en dispositivos tipo tableta. 

Desde el punto de vista de la accesibilidad, se ha prestado especial atención al contraste entre texto y fondo, así como a la claridad de las etiquetas en los distintos controles. Además, el sistema refleja de forma coherente el idioma activo en toda la interfaz, lo que facilita su uso en contextos multilingües. 

También se han incorporado mecanismos de validación de entradas para evitar estados inconsistentes, así como el bloqueo de determinados controles durante la ejecución de la animación cuando es necesario. Por último, se incluye un tutorial introductorio accesible en el primer uso y reutilizable posteriormente, lo que facilita la curva de aprendizaje a usuarios sin experiencia previa en este tipo de herramientas. 

## 5.2.2. Mockups 

Se presentan las principales vistas de la aplicación, con el objetivo de mostrar cómo se ha plasmado gráficamente la experiencia de usuario planteada durante las fases de diseño. Los mockups se han elaborado con la herramienta de diseño en línea Figma. Entre las vistas representadas destacan: la vista principal con el lienzo y el panel de control; el panel con sus secciones de parámetros (incluida la de parámetros avanzados desplegada); el desplegable de ejemplos predefinidos; el diálogo de exportación de imagen con su previsualización y opciones; el tutorial de bienvenida; y el selector de idioma desplegado. 

_(Aquí van las Figuras 5.5 y siguientes: capturas/mockups de las vistas de la aplicación.)_ 

## 6. Implementación 

En el presente capítulo se describe el proceso de implementación de la aplicación, centrándose en el desarrollo de sus principales componentes y en la materialización del diseño planteado en el capítulo anterior. Se presentan las tecnologías empleadas durante el desarrollo, la organización del proyecto y las decisiones técnicas adoptadas para construir una aplicación modular, mantenible e interactiva. 

La aplicación se ha desarrollado como una _Single Page Application_ (SPA) utilizando Angular como framework principal, mientras que la generación y representación de los patrones gráficos se ha implementado mediante la biblioteca p5.js. La lógica de la aplicación se ha desarrollado en TypeScript, complementándose con HTML y CSS para la construcción de la interfaz de usuario y Bootstrap para facilitar el diseño responsivo y la maquetación de los distintos componentes. 

## 6.1. Estructura y organización del proyecto 

El proyecto se ha construido sobre **Angular** utilizando **componentes independientes** ( _standalone_ ), un modelo que evita los módulos clásicos y permite que cada componente declare directamente sus dependencias. La aplicación es, además, **”zoneless”** : prescinde de la biblioteca de detección automática de cambios habitual en Angular, lo que resulta clave para que el bucle de animación de p5.js, el cual se repite 60 veces por segundo, no dispare ciclos de actualización innecesarios y se mantenga el rendimiento. 

El código fuente se reparte en tres áreas claramente diferenciadas dentro de src/app: 

- **models** : las **interfaces** que definen el modelo de datos. La principal es PatternParams, que reúne todos los parámetros configurables del patrón (radios, velocidades en RPM, fases iniciales, factores de elipse, inclinaciones, color, opacidad, grosor de trazo, intervalo entre líneas y modo de visualización). Junto a ella se definen ExportOptions (opciones de exportación), LineRecord (un segmento dibujado, con sus coordenadas y color) y SimulationSession (un bloque de animación grabado, base del deshacer y de la exportación a JSON). 

- **core** : la lógica transversal. Contiene el servicio central PatternService, que coordina los parámetros, el historial de trazas y las sesiones de animación, y el subsistema de internacionalización (I18nService y TranslatePipe). 

- **features** : los **componentes** que materializan cada parte de la interfaz: el lienzo (Canvas), el panel de control (Controls), el diálogo de exportación (ExportModal) y el tutorial de bienvenida (Tutorial). El catálogo de ejemplos predefinidos (presets) se ha modelado como un módulo de datos, no como un componente. 

Por encima de todos ellos, el componente raíz AppComponent compone la vista: distribuye el lienzo y el panel de control en una disposición a dos columnas y aloja los elementos flotantes (tutorial y selector de idioma). 

## **Flujo de datos entre componentes** 

La comunicación entre las partes de la aplicación no se realiza pasando datos directamente de un componente a otro, sino a través del servicio PatternService, que actúa como única fuente de verdad. Este diseño desacopla por completo el panel de control del lienzo: ninguno conoce al otro, ambos solo conocen al servicio. 

El flujo es unidireccional y se articula en torno a dos canales que el servicio expone como flujos observables: 

- **params$** : transporta la configuración del patrón. Cuando el usuario modifica un control, el panel publica los nuevos parámetros en el servicio y este los emite por params$. El lienzo, suscrito a ese flujo, recibe los valores actualizados y redibuja en el siguiente fotograma. Es lo que hace posible la edición en tiempo real. 

- **action$** : transporta las órdenes del usuario (reproducir, pausar, deshacer, restablecer, importar). El panel las publica con dispatch() y el lienzo las interpreta en onAction(), cambiando su estado de animación. 

Junto a esos dos canales, el servicio conserva el estado del dibujo como datos: el historial de segmentos (lineHistory) y la lista de sesiones grabadas (sessions). El lienzo escribe en ese historial a medida que dibuja, y otros componentes lo leen cuando lo necesitan. 

El flujo de la aplicación sigue una estructura clara y unidireccional: el usuario interactúa con los controles de la interfaz, estos delegan los cambios en el PatternService, que se encarga de gestionar y emitir el estado correspondiente, y finalmente el lienzo (Canvas) reacciona a dichas actualizaciones para representar el resultado visual. Este modelo de comunicación facilita la comprensión del sistema, simplifica su depuración y permite incorporar nuevos componentes sin necesidad de modificar los ya existentes. 

## 6.2. Desarrollo de la aplicación 

## 6.2.1. Interfaces 

## **Vista principal** 

Es la estructura general de la aplicación y lo primero que percibe el usuario al acceder a ella, organizada en dos zonas principales: a la izquierda se encuentra el lienzo, que ocupa aproximadamente el 70 % del ancho y constituye el espacio donde se generan y visualizan las composiciones, mientras que a la derecha se sitúa el panel de control, con alrededor del 30 % del ancho, desde el cual se gestionan todos los parámetros y acciones del sistema. Complementariamente, se incluyen dos elementos flotantes persistentes: el botón de ayuda, que permite reabrir el tutorial en cualquier momento, y el selector de idioma, ubicado de forma discreta en una esquina para no interferir con la visualización del contenido. Esta disposición lateral entre controles y resultado no es arbitraria, sino que responde a una decisión de diseño orientada a reforzar la relación directa entre manipulación y visualización, favoreciendo así una experiencia de edición en tiempo real más clara e intuitiva. 

## **Lienzo** 

Es la zona donde se representa la composición. Contiene el contenedor sobre el que p5.js crea el <canvas> y un grupo de botones de **zoom** (acercar y alejar); además, el usuario puede ampliar o reducir con la rueda del ratón sobre el propio lienzo. En él se dibujan las trazas acumuladas del patrón, las **guías orbitales** (las elipses y radios de cada órbita) y los **planetas** (los dos puntos que se desplazan), que ayudan a comprender de dónde surge cada trazo. Estos elementos de apoyo se distinguen por color: azul para la primera órbita y rojo para la segunda, en coherencia con el panel de control. 

## **Panel de control** 

Es el centro de interacción de la aplicación. Reúne, ordenados de lo general a lo específico, todos los parámetros del patrón: un **desplegable de ejemplos** predefinidos como punto de partida opcional, el **modo de visualización** , las secciones de **órbita 1** y **órbita 2** (radio, velocidad y fase inicial), los **ajustes visuales** (color, opacidad, grosor e intervalo entre líneas) y, plegada por defecto, una sección de **parámetros avanzados** (factores de elipse e inclinación de cada órbita). En la parte inferior, siempre accesibles, se sitúan las **acciones** : aleatorizar, reproducir, pausar, deshacer la última sesión, restablecer, exportar imagen, exportar patrón e importar patrón. Mientras la animación está en marcha, los parámetros se bloquean visualmente y un aviso informa de ello, evitando estados inconsistentes. 

## **Diálogo de exportación de imagen** 

Es una ventana modal que se superpone a la vista principal cuando el usuario decide guardar la composición como. Muestra una **previsualización** de la imagen resultante y un conjunto de opciones: color de fondo (con la posibilidad de fondo transparente), zoom de la exportación, factor de resolución (1×, 2× o 4×) y casillas para incluir o no las guías orbitales y el punto central. La previsualización se actualiza al instante con cada cambio, de modo que el usuario sabe exactamente qué obtendrá antes de descargar el archivo PNG. 

## **Tutorial de bienvenida** 

Es una ventana modal que se muestra automáticamente la primera vez que se abre la aplicación y que puede reabrirse en cualquier momento mediante el botón de ayuda. Presenta, en una lista de pasos numerados con iconos, las acciones principales de la 

aplicación. Incluye una casilla “No volver a mostrar” que, al marcarse, recuerda la preferencia para futuras visitas. 

## **Selector de idioma** 

Es un botón desplegable, fijo en una esquina, que permite cambiar el idioma de toda la interfaz sin recargar la página. Al pulsarlo se despliega la lista de idiomas disponibles (español, catalán, inglés, indonesio y checo); al seleccionar uno, todos los textos se traducen de inmediato. La lista se genera automáticamente a partir de la configuración de idiomas, de modo que añadir uno nuevo no obliga a modificar la interfaz. 

## 6.2.2. Componentes de la interfaz 

El diseño visual de la aplicación se ha estructurado mediante plantillas HTML, siguiendo el modelo de desarrollo de interfaces de Angular y apoyándose en la biblioteca de estilos Bootstrap. A lo largo de la aplicación se han empleado distintos 

elementos de interfaz gráfica para ofrecer una experiencia de usuario clara e intuitiva. Entre los componentes más utilizados se encuentran las etiquetas, empleadas para mostrar información estática como el nombre de cada parámetro o su unidad; los campos numéricos y los deslizadores, que permiten al usuario introducir y ajustar los valores que definen el patrón; y los botones, que sirven para ejecutar acciones como reproducir la animación, restablecer los parámetros o exportar la composición. Además, se han utilizado contenedores y secciones plegables para organizar estos elementos de forma jerárquica y ordenada dentro del panel. También se han incorporado componentes más dinámicos, como los desplegables, que muestran listas de opciones como los ejemplos predefinidos, y las ventanas modales, que superponen diálogos sobre la vista principal. 

## **Deslizadores y campos numéricos** 

Constituyen el componente predominante del panel de control. Cada parámetro numérico se presenta siguiendo un patrón uniforme, compuesto por una etiqueta (label), un campo numérico (input type="number") que permite introducir un valor exacto y un deslizador (input type="range") que permite ajustarlo de forma continua. Ambos controles están enlazados a la misma variable mediante [(ngModel)], de manera que mover el deslizador actualiza el número y viceversa, y cualquiera de los dos dispara el método onParamChange() para redibujar el patrón al instante. Los 

atributos min, max y step definen el rango válido y la granularidad de cada control. Además, al editar el campo numérico, el evento (change) invoca clampParams() para corregir los valores que queden fuera de rango. 

_Figura 6.14: estructura HTML de un control de parámetro_ 

## **Selectores desplegables** 

Se emplean para que el usuario elija entre un conjunto de opciones predefinidas. El más destacado es el desplegable de ejemplos, cuyas opciones se generan dinámicamente mediante el bloque @for a partir del catálogo de ejemplos, y cuyo nombre visible se traduce con una clave dinámica. Al cambiar la selección, el componente invoca el método applyPreset(), que carga la configuración elegida. 

_Figura 6.15: desplegable de ejemplos generado dinámicamente con @for (controls.html)._ 

## **Botones** 

Se encargan de ejecutar las acciones de la aplicación. Para ello se ha utilizado el sistema de estilos de Bootstrap (btn), con variantes de color coherentes con el significado de cada acción: verde para reproducir, ámbar para pausar o rojo para restablecer. Cabe destacar que algunos botones se deshabilitan de forma condicional mediante [disabled]; por ejemplo, los parámetros y el botón de reproducir quedan inhabilitados mientras la animación está en marcha, lo que impide interacciones que dejarían el sistema en un estado inconsistente. Por último, el propio botón de modo de visualización cambia de estilo y de texto según el modo activo, ofreciendo retroalimentación visual inmediata 

_Figura 6.16: botones de acción, con bloqueo condicional mediante [disabled] (controls.html)._ 

## **Secciones colapsables** 

Con el fin de no saturar el panel, los parámetros menos habituales se han agrupado en una sección plegable construida con el elemento nativo details/summary, que el usuario puede desplegar bajo demanda. De este modo se mantiene la interfaz limpia, respetando la jerarquía de lo general a lo específico. 

_Figura 6.17: sección de parámetros avanzados, plegable con el elemento nativo details/summary (controls.html)._ 

## **Ventanas modales y superposiciones** 

Tanto el diálogo de exportación como el tutorial se implementan como superposiciones, mostradas de forma condicional mediante el bloque @if. Una capa semitransparente cubre la vista y centra una tarjeta con el contenido; al pulsar fuera de ella o en el botón de cierre, la superposición se oculta. Este mismo mecanismo se emplea también para cerrar el menú del selector de idioma. 

## **Lienzo** 

A diferencia del resto de elementos, no se rellena con marcado declarativo, sino que es p5.js quien crea y gobierna sobre él el dibujo en tiempo real. Se trata, por tanto, del elemento central pero único de la interfaz, directamente ligado a la representación gráfica de la composición. 

## 6.2.3. Implementación de la lógica 

## 6.2.3.1. Servicio central: PatternService 

PatternService es el núcleo de la aplicación. Actúa como única fuente de verdad y centraliza tanto los parámetros del patrón como el historial de trazas y las sesiones de animación. Al ser un servicio compartido, desacopla por completo el panel de control del lienzo, de modo que ninguno de los dos componentes necesita conocer al otro: ambos se comunican exclusivamente a través de él. 

## **updateParams y dispatch** 

Este fragmento de código implementa los dos puntos de entrada del servicio. Por un lado, el método updateParams() recibe una nueva configuración de parámetros y la emite a través del flujo params$, lo que provoca que el lienzo se redibuje al instante. Por otro lado, el método dispatch() emite a través del flujo action$ una acción solicitada por el usuario, que el lienzo interpretará posteriormente. Esta separación permite mantener un flujo de datos claro y unidireccional entre el panel de control y el lienzo. 

## **Gestión de sesiones: beginSession, endSession, snapshotActiveSession** 

Este conjunto de métodos se encarga de gestionar el ciclo de vida de una sesión de animación, entendida como un bloque que graba los parámetros empleados y el número de fotogramas dibujados. Primero, cada vez que el usuario 

reproduce, beginSession() inicia la grabación. A continuación, mientras la animación avanza, incrementSessionFrame() actualiza el contador de fotogramas. Finalmente, al pausar, endSession() cierra el bloque y lo añade a la lista de sesiones, registrando además su estado final para poder retomar el dibujo más adelante. Asimismo, el método snapshotActiveSession() devuelve una copia de la sesión en curso, lo que permite exportar la composición aunque la animación no se haya detenido. 

## **Deshacer y reconstruir: removeLastSession,  replaySessionsToLines** 

Estas dos funciones implementan el borrado de las sesiones de forma individual de la composición. Primero, el método removeLastSession() cierra la sesión activa si la hubiera, retira la última de la lista y reconstruye el historial reproduciendo las restantes. Esa reconstrucción la realiza replaySessionsToLines(), que recorre cada sesión fotograma a fotograma aplicando la misma fórmula que el lienzo y regenera así la lista completa de segmentos. Cabe destacar que esta segunda función se reutiliza también al importar un patrón, de modo que una única rutina garantiza que tanto deshacer como importar produzcan exactamente el mismo resultado que el dibujo original. 

## 6.2.3.2. Lienzo: Canvas 

## **initSketch y el bucle de dibujo (draw)** 

El método initSketch() crea una instancia de p5.js en modo instancia, con su propio bucle de dibujo a 60 fotogramas por segundo. Dentro de ese bucle, la función draw() constituye el corazón de la aplicación, pues en ella se materializa la generación de la composición epicicloidal a partir de los parámetros. En cada fotograma, primero calcula la posición de los dos planetas mediante las ecuaciones 

paramétricas. A continuación, traza la nueva línea entre ellos. Seguidamente dibuja las guías orbitales y los planetas; y, por último, avanza los ángulos para el siguiente fotograma. Si la animación está activa, además registra cada nuevo segmento en el historial del servicio. 

## **Renderizado optimizado de la estela (capa trailLayer)** 

Este fragmento de código implementa la lógica que acumula las trazas sobre una capa gráfica fuera de pantalla, con el fin de mantener el rendimiento. En lugar de repintar todo el historial en cada fotograma, el sistema pinta únicamente los segmentos nuevos, y solo reconstruye la capa completa cuando resulta imprescindible: al hacer zoom, redimensionar la ventana, limpiar, restablecer, cambiar de modo o importar. El lienzo principal se limita entonces a pintar el fondo, volcar esa capa y superponer sobre ella las guías y los planetas. Esta estrategia es la que permite mantener la fluidez de la 

animación incluso con miles de líneas acumuladas, cumpliendo así los requisitos de rendimiento del proyecto. 

## **onAction y Zoom** 

El método onAction() se encarga de traducir cada acción recibida del servicio en un cambio de estado del lienzo: iniciar o pausar la animación, marcar como pendiente una limpieza o un restablecimiento, o restaurar el estado de dibujo tras un deshacer o una importación. Por su parte, los métodos zoomIn() y zoomOut() ajustan el factor de zoom dentro de unos límites establecidos y marcan la estela para que se vuelva a rasterizar a la nueva escala, conservando así la nitidez del trazo vectorial al ampliar. 

## 6.2.3.3. Panel de control: Controls 

## **onParamChange, applyPreset y toggleMode** 

Este conjunto de métodos gestiona la interacción del usuario con los parámetros. El método onParamChange() se ejecuta cada vez que se modifica un parámetro y envía la nueva configuración al servicio, lo que redibuja el patrón al instante. Por su parte, applyPreset() carga un ejemplo predefinido, fusionando sus valores sobre los valores por defecto para dejar el panel en un estado completo y reproducible. Finalmente, toggleMode() permite alternar entre los dos modos de visualización. 

## **Acciones de animación: play, pause, clear, reset** 

Estas funciones gobiernan la animación delegando en el servicio. Los métodos play() y pause() inician y detienen el dibujo. El método clear() implementa el deshacer incremental, retirando la última sesión y restaurando los parámetros previos. Por último, reset() reinicia la animación, vacía el lienzo para empezar de cero y restablece toda la configuración a sus valores por defecto. Asimismo, la marca interna isPlaying controla el bloqueo de los parámetros mientras la animación está en curso, evitando estados inconsistentes. 

## **Randomize y clampParams** 

El método randomize() genera una variación aleatoria del patrón. Para ello, asigna a cada parámetro un valor al azar dentro de su rango válido y respetando su paso, además de un color aleatorio, de modo que el resultado sea siempre reproducible de forma manual por el usuario. Por su parte, clampParams() se encarga de la validación de la entrada: tras editar un campo, comprueba cada valor y, si se ha salido del rango permitido o no es numérico, lo ajusta al mínimo o al máximo correspondiente, evitando así configuraciones inválidas. 

## **Exportación e importación de patrones: exportJson, triggerImport, onFileSelected** 

Estas funciones permiten guardar y recuperar composiciones sin necesidad de una base de datos. El método exportJson() serializa las sesiones grabadas en un archivo JSON descargable. Para la importación, triggerImport() abre el selector de archivos del navegador y, una vez elegido uno, onFileSelected() lo lee y valida su estructura. Si el archivo es correcto, reconstruye el dibujo mediante replaySessionsToLines() y restaura los parámetros del patrón; en caso contrario, la importación se descarta de forma silenciosa para no interrumpir la experiencia del usuario. 

**==> picture [392 x 670] intentionally omitted <==**

**----- Start of picture text -----**<br>
exportison(): void {<br>const completed = [...this.patternService.sessions];<br>const active = this.patternService. snapshotActiveSession( );<br>const allSessions = active ? [...completed, active] : completed;<br>if (allSessions.length === @) return;<br>const data = {<br>metadata: {<br>exportedAt: new Date().tolSOString(),<br>totalSessions: allSessions-length,<br>visualizationMode: this.params.visualizationMode,<br>ane<br>sessions: allSessions,<br>is<br>const blob = new Blob([JSON.stringify(data, null, 2)], { type: ‘application/json' });<br>const url = URL.createObjectURL (blob);<br>const link = document.createElement(‘a');<br>const date = new Date().toISOString().slice(@, 10);<br>link.download = ~“epicycloidpatron ${date}.json ;<br>link href = url;<br>link.click();<br>URL .revokeObjectURL(ur1);<br>+<br>private onFileSelected(event: Event): void {<br>const file = (event.target as HTMLInputElement).files?.[@];<br>if (!file) return;<br>const reader = new FileReader();<br>reader.onload = (e) => {<br>try {<br>const data = JSON.parse(e.target?.result as string);<br>if (!data?.sessions || !Array.isArray(data.sessions) || data.sessions.length === @) return;<br>const sessions: SimulationSession[] = data.sessions;<br>for (const s of sessions) {<br>if (!s.params || typeof s.frameCount !== 'number') return;<br>const computedLines = this.patternService.replaySessionsToLines(sessions);<br>const lastSession = sessions[sessions.length - 1];<br>const lastParams: PatternParams = lastSession.params;<br>this.isPlaying = false;<br>this.selectedPresetId = "';<br>this.patternService.endSession();<br>this.params = { ...lastParams };<br>this. patternService.updateParams(lastParams);<br>this.patternService.importState = {<br>anglel: lastSession.endAnglel,<br>angle?: lastSession.endAngle?,<br>tipxX: lastSession.endTipxX,<br>tipY: lastSession.endTipyY,<br>firstPoint: lastSession.endFirstPoint,<br>33<br>this.patternService.dispatch("import-json");<br>this.patternService.lineHistory = computedLines;<br>this.patternS$ervice.sessions = sessions;<br>} catch {<br>}<br>hs<br>reader. readAsText(file);<br>t<br>**----- End of picture text -----**<br>


## 6.2.3.4. Diálogo de exportación: ExportModal 

## **buildExportCanvas, renderPreview, save** 

Este conjunto de métodos se encarga de generar la imagen final de la composición. El método buildExportCanvas() construye, sobre un lienzo auxiliar en memoria, la imagen de exportación: primero pinta el fondo, a continuación dibuja todas las líneas del historial a calidad vectorial y, opcionalmente, añade las guías orbitales y el punto central, aplicando el zoom y el factor de resolución elegidos. Por su parte, renderPreview() reutiliza ese mismo lienzo para mostrar una previsualización escalada, y se vuelve a invocar cada vez que el usuario cambia una opción, de modo que la vista previa refleje siempre el resultado real. Finalmente, el método save() genera la imagen a partir del lienzo de exportación y la descarga como archivo PNG. 

## 6.2.3.5. Internacionalización: I18nService y TranslatePipe 

El soporte multilingüe se ha resuelto mediante un sistema de internacionalización propio que funciona en tiempo de ejecución. El servicio I18nService mantiene el idioma activo en una señal reactiva y ofrece los métodos setLang(), que cambia y persiste el idioma, y translate(), que resuelve una clave de texto al idioma actual. Asimismo, el método detectInitialLang() se encarga de elegir el idioma al arrancar la aplicación, tomando primero la preferencia guardada del usuario y, en su defecto, el idioma del navegador. Los textos se almacenan en diccionarios JSON anidados, uno por idioma. Por último, cabe destacar que el TranslatePipe (empleado en las plantillas como | t) es un pipe impuro a propósito: al reevaluarse en cada ciclo de detección de cambios, consigue que al cambiar de idioma toda la interfaz se traduzca de forma instantánea, sin necesidad de recargar la página. 

## 6.2.4. Persistencia e integración 

A diferencia de una aplicación que se apoya en servicios externos como una base de datos en la nube, _Epicycloid Generator_ funciona por completo en el lado del cliente. No obstante, sí integra varios mecanismos de **persistencia ligera** y de **entrada/salida de datos** que cumplen el papel que en otras arquitecturas desempeñaría el servidor. 

- **Persistencia local con localStorage.** En el localStorage únicamente se almacenan dos parámetros. El primero es el idioma de preferencia del usuario, que se consulta al iniciar la aplicación para mostrar automáticamente la interfaz en el idioma seleccionado. El segundo indica si el usuario ha marcado la opción “No volver a mostrar” del tutorial. Si este valor está almacenado, la ventana de bienvenida no volverá a aparecer al recargar o volver a abrir la aplicación. Al tratarse de una aplicación sin autenticación ni servidor, el uso de localStorage es suficiente para conservar estas preferencias entre sesiones. 

- **Entrada y salida de composiciones.** En lugar de guardar los patrones en una base de datos externa, la aplicación permite al usuario exportar e importar patrones ya generados como archivos JSON. Cuando se exporta, las diferentes sesiones de dibujado se guardan en un único archivo JSON y es descargado automáticamente por el navegador. Al importar, el archivo es validado y se reconstruye el patrón descrito en el archivo. Este punto de vista permite al usuario un control total de sus creaciones sin la necesidad de estar registrado. 

   - **Exportación de imágenes en PNG.** Al igual que se puede exportar el patron como JSON para ser reconstruido más adelante, el programa también permite al usuario exportar el patrón como imagen PNG. El usuario puede configurar si desea el fondo transparente o no, la resolución, el tamaño y el nombre. También puede añadir las circunferencias de referencia y el punto central. 

   - - **Despliegue.** Al ser un SPA sin componente de servidor, su despliegue se reduce a un servicio de alojamiento estático gratuito (Netlify), el cual es accesible desde cualquier navegador moderno. Esto simplifica la puesta en producción y elimina los costes y la complejidad de mantener una infraestructura de backend. Pruebas y resultados 

- 6.3. Pruebas funcionales 

- 6.4. Pruebas de rendimiento 

- 6.5. Pruebas de usabilidad 

## 7. Conclusiones 

- 7.1. Revisión de objetivos 

- 7.2. Trabajo futuro 

- 7.3. Conclusiones 

A. Apéndice 

## Bibliografía 

[1] _Desmos | Preciosas matemáticas gratuitas._ (s. f.). Recuperado 8 de abril de 2026, de https://www.desmos.com/?lang=es 

[2] _GeoGebra—The world’s favorite, free math tools used by over 100 million students and teachers_ . (s. f.). GeoGebra. Recuperado 8 de abril de 2026, de https://www.geogebra.org 

[3] Welcome to Processing! (s. f.). Processing. Recuperado 8 de abril de 2026, de https://processing.org// 

[4] _Salario de Angular developer en España_ . (s. f.). Recuperado 11 de junio de 2026, de - https://es.indeed.com/career/angular developer/salaries 

[5] _Salarios de Jefe de proyecto en Michael Page en España | Indeed.com_ . (s. f.). Recuperado 11 de junio de 2026, de https://es.indeed.com/career/jefe-de-proyecto/salaries 

[6] _¿Cuanto se gana de QA tester en España?_ (s. f.). Trabajo.org. Recuperado 11 de junio de 2026, de https://es.trabajo.org/salaries/position?term=QA+tester 

