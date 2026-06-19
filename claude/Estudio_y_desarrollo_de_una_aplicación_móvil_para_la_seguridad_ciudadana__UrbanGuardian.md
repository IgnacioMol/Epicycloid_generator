Grado en Ingeniería Multimedia 

Trabajo Fin de Grado 

Estudio y desarrollo de una aplicación móvil para la seguridad ciudadana, UrbanGuardian 

**Autora: Ana Teixidó Masiello** 

**Tutor: Manuel Herrero Mas Julio 2025** 

Trabajo Fin de Grado 

Estudio y desarrollo de una aplicación móvil para la seguridad ciudadana, UrbanGuardian 

**Autora: Ana Teixidó Masiello Tutor: Manuel Herrero Mas** 

## **Declaración de autoría:** 

Yo, Ana Teixidó Masiello, declaro la autoría del Trabajo Fin de Grado titulado “Estudio y desarrollo de una aplicación móvil para la seguridad ciudadana, UrbanGuardian” y que el citado trabajo no infringe las leyes en vigor sobre propiedad intelectual. El material no original que figura en este trabajo ha sido atribuido a sus legítimos autores. 

Valencia, 26 de junio de 2025 

Fdo: Ana Teixidó Masiello 

## **Resumen:** 

El presente Trabajo de Fin de Grado aborda el diseño y desarrollo de _UrbanGuardian_ , una aplicación móvil orientada a la mejora de la seguridad ciudadana en entornos urbanos. La app permite a los usuarios reportar incidentes, generar rutas seguras, recibir alertas en tiempo real y consultar zonas de riesgo mediante un mapa interactivo. Se ha priorizado la prevención de situaciones de peligro mediante herramientas accesibles y una usabilidad centrada en el usuario, con especial atención a la protección de mujeres y colectivos vulnerables. 

El desarrollo se ha llevado a cabo en Android Studio, empleando Java y XML, y se apoya en tecnologías como Firebase Firestore para la sincronización de datos en tiempo real, así como OpenStreetMap y GraphHopper para la gestión de mapas y rutas. Asimismo, se ha cuidado especialmente el diseño visual, priorizando la simplicidad, la claridad y la eficacia en contextos de estrés. 

El resultado es una aplicación funcional, escalable y comprometida con una visión social de la tecnología, que busca contribuir activamente a la construcción de ciudades más seguras, inclusivas y conectadas. 

## **Abstract:** 

This Final Degree Project addresses the design and development of _UrbanGuardian_ , a mobile application aimed at improving citizen safety in urban environments. The app allows users to report incidents, generate safe routes, receive real-time alerts, and consult risk zones through an interactive map. The focus has been placed on the prevention of dangerous situations through accessible tools and user-centered usability, with special attention to the protection of women and vulnerable groups. 

The development was carried out in Android Studio, using Java and XML, and relies on technologies such as Firebase Firestore for real-time data synchronization, as well as OpenStreetMap and GraphHopper for map and route management. Additionally, the visual design has been carefully considered, prioritizing simplicity, clarity, and effectiveness in high-stress situations. 

The result is a functional and scalable application, committed to a social vision of technology, aiming to contribute to the creation of safer, more inclusive, and connected cities. 

## **Resum:** 

Aquest Treball de Fi de Grau aborda el disseny i desenvolupament de _UrbanGuardian_ , una aplicació mòbil orientada a la millora de la seguretat ciutadana en entorns urbans. L’app permet als usuaris reportar incidents, generar rutes segures, rebre alertes en temps real i consultar zones de risc mitjançant un mapa interactiu. S’ha prioritzat la prevenció de situacions de perill mitjançant eines accessibles i una usabilitat centrada en l’usuari, amb especial atenció a la protecció de les dones i dels col·lectius vulnerables. 

El desenvolupament s’ha dut a terme en Android Studio, utilitzant Java i XML, i es recolza en tecnologies com Firebase Firestore per a la sincronització de dades en temps real, així com OpenStreetMap i GraphHopper per a la gestió de mapes i rutes. Així mateix, s’ha cuidat especialment el disseny visual, prioritzant la simplicitat, la claredat i l’eficàcia en contextos d’estrés. 

El resultat és una aplicació funcional, escalable i compromesa amb una visió social de la tecnologia, que busca contribuir activament a la construcció de ciutats més segures, inclusives i connectades. 

## **Agradecimientos:** 

Quiero expresar mi más sincero agradecimiento a mis profesores y a la organización del grado en Ingeniería Multimedia por enseñarme durante todos estos años, especialmente a mi tutor de TFG, Manuel Herrero, por su apoyo y orientación a lo largo de este proceso. A mi familia: a mi madre y a mi hermana, por su amor y apoyo incondicional; a mi padre, por transmitirme desde pequeña el interés y la pasión por la informática, que han sido una guía fundamental en mi formación; y a mi tío, quien siempre ha estado dispuesto a ayudarme y resolver mis dudas, acompañándome en este camino. A todos ellos, les dedico este trabajo como muestra de reconocimiento y gratitud. 

## **Índice general** 

|**1. **|**Introducción**||||**19**|
|---|---|---|---|---|---|
||1.1. Introducción . . . . . . . . . .|.|.|. . . . . . . . . . . . . . . . . . . . . . .|19|
||1.2. Motivación. . . . . . . . . . .|.|.|. . . . . . . . . . . . . . . . . . . . . . .|20|
||1.3. Objetivos<br>. . . . . . . . . . .|.|.|. . . . . . . . . . . . . . . . . . . . . . .|20|
||1.4. Organización de la memoria .|.|.|. . . . . . . . . . . . . . . . . . . . . . .|21|
|**2. **|**Estado del arte**||||**23**|
||2.1. Análisis de aplicaciones similares|||. . . . . . . . . . . . . . . . . . . . . . .|23|
||2.1.1.<br>Análisis funcional de aplicaciones similares . . . . . . . . . . . . . .||||23|
||2.1.2.<br>Diferenciación funcional|de||la propuesta<br>. . . . . . . . . . . . . . .|25|
||2.1.3.<br>Análisis visual de aplicaciones similares . . . . . . . . . . . . . . . .||||26|
||2.1.4.<br>Diferenciación visual de|la propuesta . . . . . . . . . . . . . . . . .|||27|
||2.2. Análisis de tecnologías . . . .|.|.|. . . . . . . . . . . . . . . . . . . . . . .|28|
||2.2.1.<br>Aplicación de desarrollo||.|. . . . . . . . . . . . . . . . . . . . . . .|28|
||2.2.2.<br>Lenguajes de programación|||. . . . . . . . . . . . . . . . . . . . . .|29|
||2.2.3.<br>Base de datos . . . . .|.|.|. . . . . . . . . . . . . . . . . . . . . . .|30|
||2.2.4.<br>Elección de servicio de mapa . . . . . . . . . . . . . . . . . . . . . .||||32|
||2.2.5.<br>Opciones para el trazado||de rutas . . . . . . . . . . . . . . . . . . .||32|
||2.2.6.<br>Comparativa fnal . . .|.|.|. . . . . . . . . . . . . . . . . . . . . . .|33|
|**3. **|**Requisitos, especifcaciones, coste, **|||**riesgos y viabilidad**|**35**|
||3.1. Requisitos . . . . . . . . . . .|.|.|. . . . . . . . . . . . . . . . . . . . . . .|35|
||3.1.1.<br>Requisitos funcionales|.|.|. . . . . . . . . . . . . . . . . . . . . . .|35|
||3.1.2.<br>Requisitos no funcionales||.|. . . . . . . . . . . . . . . . . . . . . . .|36|
||3.2. Especifcación del sistema<br>. .|.|.|. . . . . . . . . . . . . . . . . . . . . . .|37|
||3.2.1.<br>Especifcación técnica .|.|.|. . . . . . . . . . . . . . . . . . . . . . .|37|
||3.2.2.<br>Especifcación de la aplicación . . . . . . . . . . . . . . . . . . . . .||||37|
||3.3. Estimación de costes . . . . .|.|.|. . . . . . . . . . . . . . . . . . . . . . .|38|
||3.3.1.<br>Planifcación. . . . . .|.|.|. . . . . . . . . . . . . . . . . . . . . . .|38|



|||3.3.2.<br>Costes de plazos de ejecución|. . . . . . . . . . . .|. . . . . . . . .|40|
|---|---|---|---|---|---|
|||3.3.3.<br>Costes económicos<br>. . . . .|. . . . . . . . . . . . .|. . . . . . . . .|43|
||3.4.|Riesgos. . . . . . . . . . . . . . . .|. . . . . . . . . . . . .|. . . . . . . . .|47|
||3.5.|Viabilidad . . . . . . . . . . . . . .|. . . . . . . . . . . . .|. . . . . . . . .|51|
|||3.5.1.<br>Viabilidad técnica . . . . . .|. . . . . . . . . . . . .|. . . . . . . . .|51|
|||3.5.2.<br>Viabilidad económica . . . .|. . . . . . . . . . . . .|. . . . . . . . .|52|
|||3.5.3.<br>Análisis legal<br>. . . . . . . .|. . . . . . . . . . . . .|. . . . . . . . .|52|
|**4. **|**Análisis**||||**55**|
||4.1.|Diagrama de casos de uso<br>. . . . .|. . . . . . . . . . . . .|. . . . . . . . .|55|
|||4.1.1.<br>Flujos de eventos de casos de|uso . . . . . . . . . .|. . . . . . . . .|56|
||4.2.|Diagrama de clases conceptual . . .|. . . . . . . . . . . . .|. . . . . . . . .|64|
||4.3.|Diagramas de secuencia general del|sistema . . . . . . . .|. . . . . . . . .|67|
||4.4.|Trazabilidad entre requisitos funcionales y casos de uso . .||. . . . . . . . .|73|
|**5. **|**Diseño**||||**75**|
||5.1.|Diagramas de secuencia de operaciones del sistema<br>. . . .||. . . . . . . . .|75|
||5.2.|Diseño visual<br>. . . . . . . . . . . .|. . . . . . . . . . . . .|. . . . . . . . .|80|
|||5.2.1.<br>Principios de diseño. . . . .|. . . . . . . . . . . . .|. . . . . . . . .|80|
|||5.2.2.<br>Mockups . . . . . . . . . . .|. . . . . . . . . . . . .|. . . . . . . . .|80|
|**6. **|**Implementación**||||**85**|
||6.1.|Desarrollo de la aplicación: Interfaces . . . . . . . . . . . .||. . . . . . . . .|85|
|||6.1.1.<br>Desarrollo de la aplicación: Implementación de XML||. . . . . . . .|96|
|||6.1.2.<br>Desarrollo de la aplicación: Implementación de código . . . . . . . .|||100|
|||6.1.3.<br>Desarrollo de la aplicación: Firebase. . . . . . . . .||. . . . . . . . .|129|
|**7. **|**Pruebas y resultados**||||**135**|
||7.1.|Pruebas funcionales . . . . . . . . .|. . . . . . . . . . . . .|. . . . . . . . .|135|
|||7.1.1.<br>Trazabilidad entre requisitos y pruebas funcionales||. . . . . . . . .|140|
||7.2.|Pruebas de rendimiento. . . . . . .|. . . . . . . . . . . . .|. . . . . . . . .|141|
|||7.2.1.<br>Análisis de características principales . . . . . . . .||. . . . . . . . .|141|
|||7.2.2.<br>Análisis de resultados . . . .|. . . . . . . . . . . . .|. . . . . . . . .|142|
||7.3.|Pruebas de usabilidad<br>. . . . . . .|. . . . . . . . . . . . .|. . . . . . . . .|144|
|||7.3.1.<br>Evaluación de la usabilidad|. . . . . . . . . . . . .|. . . . . . . . .|145|
|||7.3.2.<br>Análisis de resultados . . . .|. . . . . . . . . . . . .|. . . . . . . . .|146|
|**8. **|**Conclusiones**||||**147**|
||8.1.|Revisión de objetivos . . . . . . . .|. . . . . . . . . . . . .|. . . . . . . . .|147|



Capítulo 0 

Página 17 

||8.2. Trabajo futuro<br>. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 148|
|---|---|
||8.3. Conclusiones. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 149|
|**A. **|**Apéndice**<br>**151**|
||A.1. Código fuente del proyecto . . . . . . . . . . . . . . . . . . . . . . . . . . . 151|
||A.1.1. Enlace al repositorio: . . . . . . . . . . . . . . . . . . . . . . . . . . 151|
||A.2. Archivos XML. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 151|



**Bibliografía** 

**158** 

Capítulo 0 

Página 18 

## **Capítulo 1** 

## **Introducción** 

## **1.1. Introducción** 

La seguridad ciudadana constituye una de las bases fundamentales para garantizar el bienestar de las personas en su vida cotidiana. Vivimos en una sociedad caracterizada por una creciente digitalización, donde la tecnología desempeña un papel clave en nuestras actividades diarias. En un contexto en el que las ciudades crecen, los desplazamientos son constantes y las situaciones de riesgo pueden surgir en cualquier momento, resulta esencial contar con herramientas eficaces que faciliten la comunicación entre la ciudadanía y los servicios de emergencia. 

La tecnología emerge como un recurso estratégico para el desarrollo de soluciones innovadoras que contribuyan a la prevención, denuncia y gestión de incidentes. En particular, la tecnología móvil ofrece una ventaja significativa por su inmediatez, portabilidad y accesibilidad. 

Este trabajo surge precisamente de una inquietud concreta: ¿cómo puede la tecnología contribuir de forma real, cercana y accesible a mejorar la seguridad en el entorno urbano? La propuesta que he desarrollado es el diseño y la implementación de una aplicación móvil enfocada en prevenir situaciones de riesgo y facilitar la interacción entre los usuarios y las autoridades competentes ante situaciones potencialmente peligrosas. Entre sus principales funcionalidades se incluye el reporte ágil de incidentes, la emisión de alertas geolocalizadas, la notificación de emergencias en tiempo real y el acceso a información sobre áreas de riesgo y zonas seguras a través de un mapa interactivo. 

El proyecto ha sido concebido desde una perspectiva doble; técnica y social. Por un lado, se han aplicado conocimientos en desarrollo de software, diseño de interfaces y gestión de bases de datos. Por otro, se ha puesto un especial énfasis en la experiencia de usuario, considerando diferentes contextos de emergencia, desde incidentes médicos o accidentes urbanos hasta situaciones de violencia, en los que una aplicación de este tipo puede marcar la diferencia. 

A lo largo del desarrollo, se ha buscado un equilibrio entre funcionalidad, simplicidad y utilidad práctica. El resultado es una propuesta que evidencia cómo la innovación puede generar herramientas útiles y adaptadas a las necesidades reales de la ciudadanía. Ofreciendo un recurso que acompañe a las personas en momentos de vulnerabilidad, fortaleciendo la confianza y la colaboración entre ciudadanos y servicios de emergencia. 

Más allá de ser una solución tecnológica, este trabajo aspira a contribuir a la cali- 

Capítulo 1 

Página 20 

dad de vida urbana a través de la innovación, fomentando una sociedad más conectada, colaborativa y segura. La aplicación ha sido diseñada con un enfoque centrado en el usuario, priorizando la usabilidad, la claridad en la comunicación y la protección de los datos personales. Asimismo, se han considerado aspectos de escalabilidad y compatibilidad con infraestructuras existentes, lo que permitiría su futura integración en redes municipales y sistemas de gestión de seguridad ciudadana. 

## **1.2. Motivación** 

La motivación principal surge de la necesidad de contribuir a la construcción de comunidades más seguras, donde las personas puedan sentirse protegidas y acompañadas en su día a día. Actualmente, la inseguridad sigue siendo una preocupación persistente en muchas ciudades, resulta prioritario desarrollar soluciones accesibles que empoderen a la ciudadanía y promuevan la cooperación. El uso de dispositivos móviles ha transformado la forma en la que nos comunicamos y accedemos a la información. Aprovechar estas capacidades para crear una solución tecnológica orientada a la seguridad personal se presenta como una oportunidad para generar un impacto social positivo. 

La creciente visibilidad de casos de acoso en espacios públicos y la sensación de inseguridad expresada por muchas mujeres de mi entorno reforzaron mi convicción de que era necesario actuar desde el ámbito tecnológico. Esta inquietud personal me impulsó a enfocar mis conocimientos hacia una causa que valoro, defiendo y considero necesaria. Si bien la herramienta está pensada para ser útil y accesible para cualquier persona, pone un enfoque especial en la protección de las mujeres, dado que son uno de los grupos que con mayor frecuencia enfrenta situaciones de inseguridad en entornos públicos. No obstante, la propuesta se adapta a usuarios de distintas edades y géneros, buscando ser una solución inclusiva y versátil. 

Este proyecto representa, además de un reto técnico, un compromiso personal con la mejora de la calidad de vida y protección de personas vulnerables. El propósito no es únicamente ofrecer una aplicación funcional, sino también contribuir a fomentar una cultura de prevención, apoyo mutuo y participación activa en la seguridad colectiva. 

## **1.3. Objetivos** 

El objetivo principal es desarrollar una aplicación para la seguridad ciudadana que proporcione seguridad y ayuda a los ciudadanos en su día a día, y resuelva incidentes con la mayor brevedad posible. 

Para conseguir el objetivo principal se plantean los siguientes objetivos: 

1. Desarrollar una base de datos que contenga toda la información necesaria de los usuarios y sus reportes. 

2. Incorporación de un mapa en tiempo real de las zonas seguras y radios peligrosos de la ciudad para facilitar la ruta más adecuada dependiendo de las preferencias del usuario. 

3. Desarrollar un formulario para que los usuarios puedan reportar incidentes incluyendo información del mismo así como el perfil de los involucrados. 

Capítulo 1 

Página 21 

4. Desarrollo de una función que permita iniciar una ruta segura desde la ubicación que elijas hasta un punto de destino seleccionado, con la funcionalidad de evitar lugares de riesgo. 

5. Incorporar la posibilidad de compartir la ruta seleccionada con los contactos de tu elección para que puedan monitorizar al usuario. 

6. Incorporar un apartado donde los usuarios puedan consultar los diferentes reportes de otros usuarios detalladamente. 

## **1.4. Organización de la memoria** 

La memoria ha sido organizada en los siguientes capítulos: 

1. **Contextualización y presentación del proyecto.** Este apartado sirve como introducción general, donde se exponen la motivación, los objetivos principales del desarrollo y el planteamiento general del problema que se busca resolver con la aplicación móvil. 

2. **Revisión del estado del arte.** Se analizarán otras aplicaciones móviles existentes con funcionalidades similares, así como herramientas, lenguajes de programación, plataformas y entornos de desarrollo disponibles actualmente, valorando sus ventajas y limitaciones. 

3. **Especificación del proyecto.** Se detallarán los requisitos funcionales y no funcionales, incluyendo una definición precisa de las funcionalidades que deberá incorporar la aplicación. Además, se incorporará un estudio de viabilidad técnica, económica y legal, junto con una estimación de los costes implicados y un análisis de los riesgos asociados. 

4. **Análisis del sistema.** Esta sección se centra en la definición de los casos de uso para describir la interacción del usuario con la aplicación. Se presentarán los diagramas de clases conceptuales que establecen las entidades y sus relaciones, y los diagramas de secuencia que muestran el flujo de mensajes durante la ejecución, facilitando la comprensión del comportamiento interno y la lógica de navegación del sistema. 

5. **Diseño de la solución.** En este apartado se define la estructura y el flujo de la aplicación a partir del análisis previo. Se presentarán los diagramas de secuencia que ilustran las operaciones principales, junto con las decisiones de diseño visual enfocadas en la usabilidad, accesibilidad y coherencia estética. 

6. **Implementación.** Este capítulo describe el proceso de desarrollo de la aplicación, abarcando la creación de las interfaces de usuario, la implementación de la estructura XML para el diseño, la codificación de la lógica y funcionalidades, y la integración con Firebase para la gestión de datos y servicios en la nube. 

7. **Pruebas y resultados.** En este apartado se recogen los resultados obtenidos tras realizar distintas pruebas. Se incluyen pruebas funcionales y su trazabilidad para verificar el correcto cumplimiento de los requisitos, pruebas de rendimiento que evalúan la eficiencia y tiempos de respuesta bajo distintas condiciones, y pruebas 

Capítulo 1 

Página 22 

de usabilidad centradas en la experiencia del usuario y la facilidad de uso de la aplicación. 

8. **Conclusiones y perspectivas futuras.** Se evaluará el cumplimiento de los objetivos iniciales, los resultados obtenidos y las principales dificultades encontradas. Asimismo, se realizará una valoración final del proyecto y se propondrán posibles líneas de mejora o ampliación de la aplicación. 

## **Capítulo 2** 

## **Estado del arte** 

Este apartado analiza el estado actual de las soluciones existentes para afrontar la inseguridad urbana, abordando dos dimensiones clave. Por un lado, se realiza una revisión de las principales aplicaciones móviles orientadas a la seguridad personal; por otro, se examinan las tecnologías que hacen posible su desarrollo, desde entornos de programación y frameworks hasta bases de datos y servicios de geolocalización. 

El objetivo de este análisis, pretende establecer un marco comparativo que justifique tanto las decisiones tecnológicas adoptadas como los elementos diferenciadores de la aplicación desarrollada. 

## **2.1. Análisis de aplicaciones similares** 

La seguridad ciudadana, y en particular la protección de las mujeres ante situaciones de acoso o violencia, se ha convertido en una prioridad social en todo el mundo. En los últimos años, han surgido numerosas herramientas enfocadas en la seguridad personal. Estas aplicaciones suelen incluir funciones como alertas de emergencia, geolocalización y seguimiento en tiempo real, con el objetivo de ofrecer apoyo inmediato y reforzar la sensación de seguridad. 

El presente apartado analiza algunas de las principales soluciones disponibles actualmente, comparando sus características, ventajas y limitaciones. Este análisis permitirá identificar tanto las tendencias más relevantes como las oportunidades de mejora, sirviendo como base para el planteamiento de la propuesta desarrollada en este trabajo. 

## **2.1.1. Análisis funcional de aplicaciones similares** 

## **AlertCops** 

La primera aplicación para analizar es AlertCops [1], “ Una aplicación móvil gratuita, creada desde la Subdirección General de Sistemas de Información y Comunicaciones para la Seguridad (SGSICS), dependiente de la Secretaría de Estado de Seguridad del Ministerio del Interior de España, cuya finalidad principal es mejorar y facilitar el acceso a determinados servicios públicos de seguridad ciudadana. ” 

Las funcionalidades principales de la aplicación AlertCops son: 

Capítulo 2 

Página 24 

- Envío de alertas de emergencia a las fuerzas de seguridad. 

- Geolocalización en tiempo real para indicar la ubicación del usuario. 

- Envío de fotos y vídeos del incidente. 

- Botón de emergencia silencioso para alertar sin ser detectado. 

- Acceso a información de seguridad y prevención de riesgos. 

- Recepción de notificaciones sobre situaciones de seguridad en la zona. 

- Disponibilidad en varios idiomas para mayor accesibilidad. 

## **M7 Citizen Security** 

La aplicación M7 Citizen Security [2] está diseñada para mejorar la seguridad personal de los usuarios, especialmente en situaciones de emergencia. Ofrece varias funcionalidades enfocadas en permitir una respuesta rápida y eficiente ante incidentes, conectando a los ciudadanos con las autoridades de seguridad. A continuación, se describen las principales funcionalidades de la aplicación: 

- Envío de alertas de emergencia a las autoridades. 

- Geolocalización en tiempo real del usuario. 

- Botón de pánico para alertar rápidamente. 

- Notificación a contactos de confianza en caso de emergencia. 

- Grabación de audio y video durante la emergencia. 

- Seguimiento en tiempo real por parte de autoridades o contactos. 

- Información sobre seguridad y consejos en situaciones de riesgo. 

- Disponibilidad en varios idiomas y accesibilidad fácil. 

## **Life 360** 

Life 360 [3] es una aplicación que está orientada a localización GPS y a compartir rutas en coche. Con la creación de grupos, permite chatear entre los miembros del círculo y que los miembros pidan auxilio enviando una alerta. Las funcionalidades principales de la aplicación Life360 son: 

   - Seguimiento en tiempo real de la ubicación de los miembros del círculo. 

   - Alertas de ubicación cuando un miembro llega o sale de lugares específicos. 

   - Botón de emergencia para enviar alertas con la ubicación precisa. 

   - Historial de ubicación de los movimientos pasados de los miembros del círculo. 

- Monitoreo de conducción con alertas sobre frenadas bruscas, aceleraciones rápidas y 

- uso del teléfono móvil. 

   - Chats privados para comunicación segura entre los miembros del círculo. 

   - Notificaciones de batería baja de los miembros del círculo. 

- Geo-cercas para recibir notificaciones cuando un miembro entra o sale de áreas específicas. 

Capítulo 2 

Página 25 

## **2.1.2. Diferenciación funcional de la propuesta** 

Tras el análisis de las principales aplicaciones orientadas a la seguridad ciudadana, se identifican una serie de aspectos diferenciadores que posicionan esta propuesta como una alternativa innovadora y complementaria a las soluciones ya disponibles. A continuación, se detallan los elementos que distinguen a esta aplicación: 

## **Enfoque preventivo mediante rutas seguras** 

A diferencia de la mayoría de aplicaciones, que actúan principalmente en respuesta a una situación de emergencia, la propuesta presentada se centra en la prevención. Para ello, ofrece un sistema de generación de rutas que evita zonas consideradas de riesgo, permitiendo a los usuarios planificar desplazamientos más seguros. Esta funcionalidad transforma la experiencia del usuario, pasando de una postura reactiva a una actitud proactiva frente a la inseguridad urbana. 

## **Notificaciones en tiempo real al aproximarse a zonas peligrosas** 

La aplicación incorpora un sistema de alertas que notifica al usuario cuando se aproxima a áreas previamente identificadas como peligrosas. Esta característica, basada en datos geoespaciales y patrones de riesgo, no está presente en otras herramientas analizadas, y contribuye a una mayor conciencia situacional en tiempo real. 

## **Enfoque específico en la movilidad peatonal** 

Mientras que soluciones como Life360 están principalmente orientadas a usuarios en vehículos, esta aplicación se centra en la seguridad de personas que se desplazan a pie, un grupo especialmente vulnerable ante situaciones de acoso o inseguridad en el espacio público. Este enfoque permite diseñar funcionalidades más ajustadas a las necesidades de los usuarios. 

## **Accesibilidad sin intermediación institucional** 

La aplicación está concebida para ser utilizada de forma libre y directa por cualquier persona, sin necesidad de validación institucional o registro ante organismos oficiales. Esto facilita su adopción por parte de un público amplio, especialmente entre quienes no se sienten cómodos contactando directamente con fuerzas de seguridad o prefieren herramientas autónomas. 

## **Posibilidad de personalización del perfil de riesgo (implementación futura)** 

Se contempla la futura implementación de una función que permita a cada usuario personalizar su perfil de riesgo, ajustando la sensibilidad de la aplicación a determinados factores como zonas con poca iluminación, alta densidad de ocio nocturno u otros indicadores relevantes. Esta capacidad de adaptación individualizada mejora la utilidad y pertinencia de la herramienta frente a soluciones generalistas. 

## **Orientación específica a la seguridad de las mujeres** 

Finalmente, uno de los elementos distintivos más importantes es el enfoque de género de la aplicación. Aunque muchas herramientas disponibles están dirigidas a la población general, esta propuesta nace con el objetivo de atender específicamente las necesidades de las mujeres en contextos de riesgo, tanto en el diseño de funcionalidades como en la experiencia de usuario. 

Capítulo 2 

Página 26 

## **Creación de una comunidad conectada y concienciada** 

Otro de los aspectos innovadores de esta propuesta es su vocación de fomentar una comunidad activa y comprometida con la seguridad colectiva. La aplicación proyecta integrar un sistema de reportes ciudadanos que permitirá a los usuarios informar sobre incidentes o zonas inseguras, así como consultar los reportes realizados por otras personas. Esta funcionalidad no solo incrementa la utilidad de la aplicación como herramienta de alerta, sino que también promueve una cultura de apoyo mutuo, empoderamiento colectivo y responsabilidad compartida. Al facilitar la comunicación entre usuarios y visibilizar los riesgos del entorno, se contribuye a construir un entorno social más consciente, solidario y resiliente frente a la violencia y el acoso. 

## **2.1.3. Análisis visual de aplicaciones similares** 

La dimensión visual de una aplicación móvil desempeña un papel fundamental en la experiencia del usuario, especialmente en contextos de seguridad ciudadana, donde la claridad, la rapidez de uso y la intuición son esenciales. En este apartado se analiza la estética y diseño de interfaces de aplicaciones similares ya existentes, y se justifica la propuesta visual adoptada en el desarrollo de _UrbanGuardian_ . 

Figura 2.1: Alertcops Figura 2.2: M7Citizen Figura 2.3: Life360 

Durante la fase exploratoria se han revisado diversas aplicaciones orientadas a la seguridad personal y ciudadana, como AlertCops, M7 Citizen Security y Life360. Si bien todas ellas ofrecen funcionalidades relevantes, comparten una serie de características visuales que presentan limitaciones desde el punto de vista de la usabilidad: 

**Sobrecarga de información visual:** en muchas de estas aplicaciones, las pantallas 

Capítulo 2 

Página 27 

están saturadas de iconos, botones y textos, dificultando la localización rápida de las funciones principales. 

- **Estilos gráficos poco consistentes:** se observan diferencias de estilo entre secciones, como menús poco jerarquizados, iconografía genérica o uso indiscriminado de colores llamativos que compiten entre sí. 

- **Prioridad en funcionalidades reactivas:** el diseño suele estar orientado a emergencias puntuales, lo que reduce la integración natural de la app en la rutina diaria del usuario. 

Este exceso de estímulos visuales y la complejidad estructural pueden generar frustración, ralentizar la toma de decisiones y aumentar la carga cognitiva, factores contraproducentes en situaciones de estrés o peligro. 

## **2.1.4. Diferenciación visual de la propuesta** 

Con base en las carencias detectadas, la propuesta visual de _UrbanGuardian_ se fundamenta en los principios de simplicidad, jerarquía clara y accesibilidad visual, con el objetivo de ofrecer una experiencia limpia, ágil y comprensible incluso en contextos adversos. 

Los principios de diseño adoptados se detallarán más adelante (sección 5.2.1), los que considero más relevantes son los siguientes: 

- **Minimalismo funcional:** Solo se incluyen elementos visuales esenciales, cada icono, texto y botón tiene una función clara y una ubicación intencional. 

- **Colores suaves y contrastes definidos:** Paleta neutra con acentos suaves que guían la atención, asociando colores a funciones específicas. 

- **Componentes grandes y táctiles:** Botones diseñados para uso cómodo con una mano y en situaciones de ansiedad, evitando errores táctiles. 

- **Pantallas específicas por tarea:** Cada pantalla se enfoca en una sola tarea, reportar, consultar, generar ruta o revisar comunidad. Esta separación mejora el enfoque y evita la sobrecarga de decisiones simultáneas. 

A diferencia de otras soluciones en el mercado, que tienden a imitar estéticas policiales o sobrecargadas de datos, _UrbanGuardian_ propone un enfoque visual cercano, accesible y cotidiano. Se busca que el usuario perciba la app como una herramienta de acompañamiento cotidiano, no como un sistema de vigilancia. 

Esto permite mejorar la adopción entre públicos más diversos, incluyendo personas mayores o usuarios poco familiarizados con la tecnología. Al mismo tiempo, se transmite una sensación de calma, control y confianza, imprescindible en momentos en que el usuario puede sentirse vulnerable. 

Capítulo 2 

Página 28 

## **2.2. Análisis de tecnologías** 

## **2.2.1. Aplicación de desarrollo** 

## **Android Studio** 

Android Studio [4] es el entorno de desarrollo integrado oficial para crear aplicaciones móviles en Android. Proporciona herramientas para escribir código en Java o Kotlin, diseñar interfaces gráficas con el _Layout Editor_ , y probar aplicaciones en un emulador o en dispositivos físicos. Incluye funciones avanzadas de depuración, análisis de rendimiento, y optimización, así como integración con servicios de Google como Firebase y Google Maps. 

## **Xcode** 

Xcode [5] es el entorno de desarrollo integrado oficial de Apple, utilizado para crear aplicaciones para dispositivos iOS, macOS, watchOS y tvOS. Permite a los desarrolladores escribir código en Swift y Objective-C, diseñar interfaces gráficas con su interfaz visual, y probar aplicaciones en simuladores o dispositivos reales. Xcode incluye herramientas de depuración, optimización y análisis de rendimiento, facilitando el desarrollo y la distribución de aplicaciones en la App Store. 

## **Flutter** 

Flutter [6] es un framework de desarrollo de aplicaciones móviles creado por Google, que permite construir aplicaciones nativas para Android e iOS utilizando un solo código base. Usando el lenguaje Dart, Flutter ofrece un entorno eficiente para crear interfaces de usuario atractivas y altamente personalizables, con un alto rendimiento gracias a su motor de renderizado propio. Además, incluye herramientas para la depuración, pruebas, y compilación rápida, lo que facilita el desarrollo de aplicaciones multiplataforma de manera ágil y con una sola base de código. 

## **React Native** 

React Native [7] es un framework de desarrollo de aplicaciones móviles creado por Facebook que permite construir aplicaciones para iOS y Android usando JavaScript y React. Con React Native, los desarrolladores pueden escribir código en JavaScript que se compila en componentes nativos, lo que proporciona una experiencia de usuario fluida y un rendimiento cercano al de las aplicaciones nativas. Además, ofrece una amplia gama de bibliotecas y componentes preconstruidos, lo que acelera el proceso de desarrollo de aplicaciones móviles multiplataforma. 

## **Comparativa** 

Las cuatro herramientas mencionadas tienen algunas similitudes clave, que las hacen útiles para el desarrollo de aplicaciones móviles: 

- Desarrollo de aplicaciones móviles: Todas están orientadas a la creación de aplicaciones móviles aunque difieren del sistema operativo al que están destinadas, con Android Studio y Xcode enfocándose en plataformas específicas, mientras que Flutter y React Native permiten desarrollar para ambas plataformas desde una base de código única. 

- Compatibilidad con interfaces gráficas: Todas ofrecen herramientas visuales o interfaces de usuario que permiten diseñar las interfaces de las aplicaciones de manera sencilla, 

Capítulo 2 

Página 29 

ya sea a través de un editor visual aunque también permiten hacerlo por código o mediante un enfoque con código. 

- Emuladores y simuladores: Las cuatro herramientas cuentan con emuladores o simuladores para probar las aplicaciones en entornos virtuales, lo que facilita la prueba de la app sin necesidad de dispositivos físicos. 

- Soporte para depuración: Ofrecen herramientas avanzadas de depuración y análisis de rendimiento para garantizar que las aplicaciones sean funcionales y eficientes. 

- Comunidad y soporte: Las cuatro herramientas tienen comunidades activas y documentación extensa que facilita el aprendizaje y la resolución de problemas, así como actualizaciones periódicas con nuevas características y mejoras. 

- Integración con servicios adicionales: Las cuatro plataformas permiten la integración con servicios y APIs, como bases de datos en la nube (Firebase, por ejemplo, punto clave ya que lo voy a usar para la aplicación) y servicios de geolocalización, lo que ayuda a crear aplicaciones más completas y funcionales. 

## **Entorno de desarrollo elegido** 

Para el desarrollo de _UrbanGuardian_ se ha optado por Android Studio como entorno de desarrollo integrado, dado que constituye la herramienta oficial de Google para la creación de aplicaciones Android y proporciona una integración completa con su ecosistema. Esta elección responde tanto a criterios técnicos como estratégicos. Android Studio permite trabajar de forma nativa con Java y XML, lenguajes empleados en este proyecto, y facilita la conexión con servicios clave como Firebase y Google Play Services, esenciales para implementar funcionalidades como la sincronización en tiempo real o la autenticación de usuarios. Además, incorpora potentes herramientas de desarrollo y depuración, como el emulador de Android, Android Profiler y un sistema avanzado de gestión de errores, lo que permite optimizar el rendimiento y la estabilidad de la aplicación en distintas versiones del sistema operativo. Al estar específicamente diseñado para el entorno Android, permite una mayor compatibilidad con las APIs del sistema y una integración eficiente con herramientas como Gradle, simplificando el control de dependencias y la automatización de tareas. Finalmente, su soporte continuo, actualizaciones regulares y amplia comunidad de desarrolladores garantizan un entorno robusto, actualizado y sostenible, alineado con los principios de escalabilidad y mantenimiento del proyecto. 

## **2.2.2. Lenguajes de programación** 

## **Java, C++, Kotlin y XML** 

Java [8] y Kotlin son los lenguajes principales para trabajar con aplicaciones móviles. No obstante, también se puede programar en C++ mediante el uso del NDK (Native Development Kit) [9], lo cual es útil para partes del código que requieren un alto rendimiento, como algoritmos complejos o procesamiento de gráficos. Java, siendo uno de los lenguajes más antiguos y ampliamente utilizados, ofrece una sintaxis clara y una gran cantidad de bibliotecas, lo que lo convierte en una opción estable. Sin embargo, su sintaxis puede ser más extensa y propensa a errores. Por otro lado, Kotlin [10], presenta una sintaxis más concisa, moderna y segura, permitiendo escribir menos código para lograr lo mismo que en Java. Para el diseño de interfaces se utiliza XML [11], que aunque no es un lenguaje de programación como tal, es fundamental en el desarrollo Android para definir la estructura 

Capítulo 2 

Página 30 

visual de las aplicaciones. 

## **Lenguajes elegidos** 

En este proyecto se ha optado por Java como lenguaje principal para la lógica de la aplicación, debido a la experiencia previa con el lenguaje, así como en la disponibilidad de una extensa documentación y comunidad de soporte. Java proporciona una sintaxis estructurada que, aunque algo más extensa que alternativas modernas como Kotlin, permite mantener una alta legibilidad del código. En cuanto al diseño de la interfaz de usuario se ha elegido XML, ya que ofrece una integración sólida con Android Studio y un control claro sobre el comportamiento y diseño de la app. 

## **2.2.3. Base de datos** 

En el desarrollo de aplicaciones móviles, la elección de la base de datos es un factor clave, ya que influye directamente en el rendimiento, la escalabilidad y la experiencia del usuario. En este apartado, se compararán tres opciones ampliamente utilizadas: Firebase Firestore, SQLite y Room, analizando sus características y los casos de uso más adecuados para cada una. 

## **Firebase Firestore** 

Firebase Firestore [12] es una base de datos NoSQL basada en la nube, diseñada para facilitar la sincronización en tiempo real entre múltiples dispositivos. Su estructura de datos se organiza en colecciones y documentos JSON, lo que la hace muy flexible y adecuada para aplicaciones dinámicas. 

Uno de sus puntos más fuertes es su capacidad de sincronización automática, lo que permite que los datos se actualicen en tiempo real sin necesidad de una infraestructura compleja. Esto la convierte en una excelente opción para aplicaciones que requieren colaboración en vivo, como en este caso. 

Sin embargo, su dependencia de una conexión a internet puede ser una limitación en escenarios donde la aplicación necesita funcionar sin conexión. A pesar de contar con un mecanismo de caché offline, su rendimiento en este modo no es tan eficiente como el de una base de datos local. 

## **SQLite** 

SQLite [13] es una base de datos relacional y local, ampliamente utilizada en dispositivos móviles debido a su ligereza y eficiencia. A diferencia de Firebase, SQLite almacena los datos directamente en el dispositivo, lo que permite un acceso rápido y sin necesidad de conexión a internet. 

Su estructura sigue el modelo relacional tradicional, basado en tablas y filas, y permite realizar consultas SQL estándar. Esto la hace ideal para aplicaciones que manejan datos estructurados y requieren un acceso rápido y confiable, como gestores de notas, aplicaciones de finanzas o herramientas de productividad. 

Sin embargo, SQLite requiere que el desarrollador gestione manualmente las consultas y el acceso a la base de datos, lo que puede hacer que el desarrollo sea más complejo y propenso a errores. 

Capítulo 2 

Página 31 

## **Room** 

Room [14] es una capa de abstracción sobre SQLite, desarrollada por Google para facilitar su uso en aplicaciones Android. Su principal ventaja es que simplifica la gestión de bases de datos al proporcionar una interfaz más intuitiva basada en objetos, reduciendo la necesidad de escribir consultas SQL manualmente. 

Al igual que SQLite, Room almacena los datos de manera local y es ideal para aplicaciones que necesitan funcionar sin conexión. Su uso es particularmente recomendado en aplicaciones Android que requieren una base de datos estructurada, ya que mejora la seguridad, la eficiencia y la mantenibilidad del código. 

Una de sus principales fortalezas es el uso de Data Access Objects (DAOs), que permiten realizar operaciones sobre la base de datos de manera sencilla y segura, minimizando errores y mejorando la escalabilidad del proyecto. 

## **Comparativa y selección de la base de datos** 

En el desarrollo de una aplicación móvil enfocada en seguridad ciudadana, es fundamental contar con una base de datos que permita la sincronización en tiempo real, escalabilidad y accesibilidad desde múltiples dispositivos. En este contexto, Firebase Firestore se posiciona como la opción más adecuada por diversas razones: 

En primer lugar, su capacidad de sincronización instantánea permite que los reportes de incidentes, alertas y mensajes de emergencia sean compartidos de manera inmediata entre los usuarios y las autoridades. Esto es crucial en situaciones donde cada segundo cuenta para una respuesta efectiva. 

Además, Firebase proporciona seguridad y control de acceso mediante reglas en la nube, lo que garantiza que solo usuarios autorizados puedan visualizar y modificar la información sensible. También ofrece autenticación integrada, facilitando el registro y acceso seguro a la aplicación a través de métodos como Google y correo electrónico. 

Otro aspecto clave es su escalabilidad, ya que puede manejar un gran volumen de datos sin comprometer el rendimiento. Esto es esencial para una aplicación que puede ser utilizada en diferentes ciudades o por miles de usuarios simultáneamente. 

Hay aspectos como el Firebase Storage que son útiles para almacenar recursos como fotos relacionadas a un usuario o perfil, el espacio disponible está limitado por coste económico. Alternativamente, se ha pensado en guardar simplemente la url de la foto, pero tiene la limitación de que solo puede ser usada en una misma sesión y dispositivo. 

Permite la integración con notificaciones push, lo que permite enviar alertas en tiempo real a los usuarios sobre emergencias o eventos críticos en su área. Esto mejora la capacidad de respuesta y la coordinación entre ciudadanos y autoridades. En la aplicación móvil se va a implementar el envío de notificaciones en función de las zonas peligrosas y los cambios de ruta, por tanto, la elección de esta base de datos facilita su implementación. 

Por todo esto, la elección ideal para una aplicación móvil de seguridad ciudadana debido a su velocidad, seguridad, sincronización en tiempo real y facilidad de implementación es Firebase Firestore. 

Capítulo 2 

Página 32 

## **2.2.4. Elección de servicio de mapa** 

Me he decantado por utilizar OpenStreetMap (OSM) [15] frente a Google Maps [16] principalmente por su carácter gratuito, libre y de código abierto, lo que lo convierte en una opción muy adecuada para proyectos académicos. Aunque Google Maps ofrece una integración más directa y sencilla mediante sus contenedores específicos y una API ampliamente documentada, su uso está condicionado a disponer de una cuenta con facturación activa, lo cual puede ser una barrera en entornos sin fines comerciales. En el caso de OSM, existen múltiples librerías y herramientas como `OSMDroid` [17], que permiten integrarlo en Android Studio y extender su funcionalidad para marcar localizaciones [18], trazar rutas o mostrar zonas personalizadas. Si bien puede presentar ciertas limitaciones en cuanto a precisión o actualización en zonas menos activas, su respeto por la privacidad de los usuarios, la ausencia de restricciones comerciales y la posibilidad de modificar y adaptar los datos le otorgan una gran ventaja para el desarrollo ético y sostenible de aplicaciones. 

Figura 2.4: OpenstreetMap 

## **2.2.5. Opciones para el trazado de rutas** 

La aplicación está pensada para trazar rutas desde una dirección origen y otra final, introducidas por el usuario para evitar las zonas peligrosas. Google Maps cuenta con su propia api para direcciones pero al usar OpenStreetMap tuve que buscar otras opciones para este trazado de ruta. Existen varias alternativas destacadas como GraphHopper [19], OSRM (Open Source Routing Machine) [20] y Valhalla [21]. Todas ellas comparten el beneficio de ser soluciones de código abierto que se apoyan en los datos libres de OpenStreetMap, lo que permite su uso sin costes de licencia y con un mayor control sobre los datos y el comportamiento del enrutamiento. En este proyecto se optó por GraphHopper por su buena integración con Android, su capacidad de funcionar sin conexión y su flexibilidad para soportar diferentes perfiles de transporte como puede ser el de peatón, que además es nuestro caso principal. Otras opciones como OSRM, están más orientada a entornos de servidor por su complejidad en el despliegue local. 

Capítulo 2 

Página 33 

Figura 2.5: Graphopper 

## **2.2.6. Comparativa final** 

La combinación de estas tecnologías responde a una estrategia de desarrollo orientada a la eficiencia, la sostenibilidad y la escalabilidad, aspectos fundamentales para una aplicación destinada a mejorar la seguridad ciudadana. Android Studio, junto con Java y XML, proporciona un entorno robusto y fiable para el desarrollo de interfaces e interacciones. Firebase y OpenStreetMap, por su parte, permiten implementar funcionalidades críticas como la sincronización en tiempo real y la generación de rutas seguras sin comprometer la privacidad del usuario ni incurrir en costes elevados. Esta arquitectura tecnológica ha sido seleccionada con el objetivo de garantizar una solución funcional, accesible y adaptable, en línea con la metodología ágil adoptada y con la vocación social del proyecto. 

Para el desarrollo de este trabajo se ha consultado bibliografía especializada que ha servido de base teórica en distintas áreas. En el ámbito de las bases de datos, se han utilizado los capítulos introductorios de Fundamentos de Sistemas de Bases de Datos de Elmasri y Navathe [22], y Database Management Systems de Ramakrishnan y Gehrke [23], con el objetivo de comprender los principios fundamentales del modelado y gestión de datos. En cuanto a la ingeniería del software, se han tomado como referencia ObjectOriented Software Engineering Using UML, Patterns, and Java de Bernd Bruegge y Allen H. Dutoit [24], así como The Unified Modeling Language User Guide de Booch, Rumbaugh y Jacobson [25], para orientar el diseño estructurado del sistema utilizando UML. Por último, en el área de gestión de proyectos, se ha recurrido a Dirección y Gestión de Proyectos de Alberto Domingo Ajenjo [26] y a El proyecto fin de carrera en Ingeniería Informática: una guía para el estudiante de Dawson y Martín [27], los cuales han proporcionado directrices útiles para la planificación, ejecución y documentación del proyecto. 

Capítulo 2 

Página 34 

## **Capítulo 3** 

## **Requisitos, especificaciones, coste, viabilidad riesgos y** 

## **3.1. Requisitos** 

Se han establecido los siguientes requisitos funcionales y no funcionales que ha de cumplir la aplicación móvil a desarrollar. 

## **3.1.1. Requisitos funcionales** 

- RF1 La aplicación móvil deberá garantizar un estilo visualmente cohesivo entre las diferentes pantallas. 

- RF2 El usuario deberá poder acceder a su perfil mediante un sistema de registro y autenticación con credenciales seguras. 

- RF3 La aplicación deberá permitir activar una alerta de emergencia para contactar con las autoridades mediante un botón dedicado. 

- RF4 La aplicación deberá incluir un botón de emergencia violeta para reportar casos de violencia de género directamente a las autoridades. 

- RF5 El sistema deberá permitir a los usuarios reportar incidentes indicando su ubicación en tiempo real mediante geolocalización. 

- RF6 El sistema deberá almacenar y clasificar los reportes ciudadanos en una base de datos accesible para los usuarios. 

- RF7 El sistema deberá permitir a los usuarios consultar sus reportes anteriores y los reportes públicos de otros usuarios. 

- RF8 El sistema deberá ofrecer funciones de filtrado dentro del apartado de reportes comunitarios, permitiendo localizar incidentes por tipo. 

- RF9 El sistema deberá ofrecer la opción de enviar reportes de forma anónima para proteger la identidad del denunciante. 

Capítulo 3 

Página 36 

- RF10 La aplicación deberá canalizar las alertas generadas hacia los servicios de emergencia correspondientes (policía, bomberos, etc.). 

- RF11 El sistema deberá cargar automáticamente en el mapa las zonas de riesgo previamente reportadas por la comunidad desde la base de datos. 

- RF12 El sistema deberá notificar al usuario en tiempo real cuando se aproxime a zonas identificadas como peligrosas en el mapa. 

- RF13 El usuario deberá poder agregar y eliminar zonas seguras o peligrosas en el mapa interactivo, así como visualizar las zonas reportadas por la comunidad. 

- RF14 La aplicación deberá permitir generar rutas seguras desde un punto de origen a un destino, evitando zonas peligrosas en función de los reportes existentes. 

- RF15 La aplicación deberá permitir al usuario gestionar una lista de contactos de confianza, a quienes podrá compartir su ruta segura y notificar automáticamente en caso de salida de la ruta. 

- RF16 El usuario deberá poder modificar sus datos personales y actualizar su foto de perfil desde el apartado de configuración. 

- RF17 Las preferencias del usuario, como visibilidad de botones y configuración de notificaciones, se deberán guardar localmente para persistir entre sesiones. 

## **3.1.2. Requisitos no funcionales** 

- RNF1 La aplicación debe ser funcional en dispositivos Android con versión Android 7.0 (Nougat) o superior. 

- RNF2 La aplicación deberá ser desarrollada utilizando Android Studio. 

- RNF3 La aplicación deberá tener una interfaz intuitiva, adaptada a usuarios sin conocimientos técnicos. 

- RNF4 El sistema debe ser mantenible y escalable, permitiendo la implementación futura de nuevas funcionalidades con facilidad. 

- RNF5 El sistema debe ser estable y evitar cierres inesperados durante su uso normal. 

- RNF6 Los datos personales introducidos por los usuarios deben estar protegidos mediante cifrado local y/o uso seguro de almacenamiento (SharedPreferences, SQLite, etc.). 

- RNF7 El código debe estar bien documentado y organizado para facilitar su revisión, actualización y corrección de errores. 

- RNF8 La app debe optimizar el uso de batería, datos móviles y memoria RAM, especialmente al hacer uso del mapa o localización en segundo plano. 

- RNF9 El sistema debe respetar la privacidad del usuario, especialmente en el uso de datos de ubicación y la opción de enviar reportes anónimos. 

- RNF10 La interfaz se adaptará correctamente a dispositivos con diferentes tamaños de pantalla y resoluciones. 

Capítulo 3 

Página 37 

- RNF11 El sistema debe implementar mecanismos para la gestión de errores y excepciones, mostrando mensajes informativos al usuario en caso de fallo. 

- RNF12 La app debe poder integrarse con servicios externos (por ejemplo, APIs de mapas, servicios de emergencia, sistemas de notificación push) sin comprometer la estabilidad general del sistema. 

## **3.2. Especificación del sistema** 

## **3.2.1. Especificación técnica** 

Una vez analizadas las distintas opciones de desarrollo y las necesidades funcionales del proyecto, se ha definido la siguiente propuesta técnica para la implementación de la aplicación _UrbanGuardian_ . 

La aplicación estará disponible exclusivamente para dispositivos con sistema operativo **Android** , y será desarrollada utilizando el entorno de desarrollo **Android Studio** . Se emplearán los lenguajes **Java** , para la lógica de la aplicación, y **XML** , para la construcción de la interfaz gráfica. Esta elección responde tanto a la compatibilidad con el entorno Android como al conocimiento previo en dichos lenguajes. 

El sistema utilizará como base de datos principal **Firebase Firestore** , una solución en la nube que permite sincronización en tiempo real entre múltiples usuarios, facilitando la consulta y envío de reportes, alertas y rutas. Además, se hará uso de Firebase Authentication para el inicio de sesión y control de acceso seguro, Firebase Storage para el almacenaje de imágenes y SharedPreferences para almacenar preferencias de usuario de forma local. 

En cuanto al sistema de mapas, se ha optado por **OpenStreetMap** , integrado mediante la librería `OSMDroid` , con el objetivo de garantizar el uso de tecnologías libres y sostenibles. Para el cálculo de rutas seguras se empleará **GraphHopper** , una solución eficiente y personalizable, capaz de generar rutas evitando zonas peligrosas. 

La aplicación se estructura modularmente mediante actividades ( _Activities_ ) y fragmentos ( _Fragments_ ). Asimismo, se han tenido en cuenta criterios de optimización para garantizar un rendimiento adecuado en diferentes dispositivos, así como medidas de seguridad para proteger la privacidad del usuario. 

## **3.2.2. Especificación de la aplicación** 

Tras definir la propuesta técnica y analizar los requisitos del proyecto, se concreta como solución una aplicación móvil centrada en la seguridad ciudadana, con especial atención a la prevención y a la protección de colectivos vulnerables, especialmente mujeres. Tal y como se estableció en los objetivos iniciales, las principales premisas del desarrollo serán: 

- Ofrecer una herramienta accesible y funcional para prevenir y reportar incidentes en tiempo real. 

- Promover la participación ciudadana mediante el reporte colaborativo de situaciones peligrosas. 

Capítulo 3 

Página 38 

- Facilitar la movilidad segura mediante rutas personalizadas que eviten zonas de riesgo. 

- Proteger la privacidad del usuario y permitir el anonimato en las denuncias si así se desea. 

Para ello, la aplicación contará con una interfaz clara e intuitiva desde la cual se podrá acceder a las funcionalidades principales, que se enumeran a continuación sin entrar en detalle, ya que serán descritas en profundidad en apartados posteriores: 

Registro e inicio de sesión de usuarios. 

- Reporte de incidentes mediante formulario con geolocalización, prioridad y descripción. 

- Generación de rutas seguras desde una ubicación de origen hasta un destino, evitando zonas peligrosas. 

- Visualización interactiva de zonas seguras y de riesgo en un mapa dinámico. 

- Consulta de reportes realizados por otros usuarios desde el apartado Comunidad. 

- Activación de alertas específicas como el botón violeta para casos de violencia de género. 

- Personalización de perfil, configuración de notificaciones y cierre de sesión. 

Esta especificación define los pilares funcionales y tecnológicos de _UrbanGuardian_ , sentando las bases para su posterior desarrollo, diseño de interfaz y validación del sistema. 

## **3.3. Estimación de costes** 

## **3.3.1. Planificación** 

## **Metodología de Trabajo** 

Dado que el desarrollo de esta aplicación móvil se realiza de forma individual, se ha optado por una adaptación de los principios de metodologías ágiles, en particular de Scrum, para organizar y gestionar el proyecto de forma eficiente. 

El trabajo se ha dividido en fases cortas e iterativas, similares a los sprints en Scrum, en las que se definen objetivos concretos y alcanzables. Al final de cada iteración se realiza una autoevaluación del progreso y se ajustan las tareas pendientes según las prioridades y los posibles cambios detectados. 

Asimismo, se ha utilizado una herramienta de gestión de tareas, como Notion, que facilita el control del flujo de trabajo mediante listas como “Por hacer”, “En proceso” y “Finalizado”. 

Esta metodología flexible permite mantener una buena organización personal, realizar un seguimiento del avance del proyecto, y responder de manera ágil ante problemas o cambios en los requisitos durante el desarrollo. 

Capítulo 3 

Página 39 

Para definir los costes temporales y económicos, se ha decidido seguir un desarrollo de proyecto que descompone en módulos los distintos apartados que se llevarán a cabo. 

## **Estado del Arte** 

Como parte del proceso de análisis previo, se llevará a cabo un estudio funcional y visual de aplicaciones móviles orientadas a la seguridad ciudadana. Resaltando la denuncia de incidentes urbanos y la participación ciudadana, con el fin de identificar buenas prácticas y funcionalidades clave. Asimismo, se investigará el uso de tecnologías de localización y trazado de rutas, comparando distintos servicios como Google Maps, OpenStreetMap y las bibliotecas asociadas a cada uno. Además, se analizarán las herramientas más relevantes para el desarrollo en Android, incluyendo entornos como Android Studio, lenguajes de programación como Java, Kotlin y XML, así como APIs como Firebase, `OSMDroid` y GraphHopper, evaluando su competencia para la implementación de la aplicación propuesta. 

## **Requisitos, especificaciones, coste, riesgos y viabilidad** 

Durante la fase de planificación del proyecto, se han definido los requisitos funcionales como el envío de reportes, la geolocalización y la opción de anonimato. Y los no funcionales, que incluyen aspectos como el rendimiento, la usabilidad y la seguridad de la aplicación. Asimismo, se ha establecido una planificación detallada del desarrollo, abarcando desde la concepción inicial y el diseño de pantallas e interacciones, hasta su implementación técnica. También se ha valorado el coste del desarrollo, priorizando el uso de herramientas gratuitas como OpenStreetMap y Firebase en sus versiones sin coste. Finalmente, se ha llevado a cabo un análisis de viabilidad del proyecto, identificando posibles riesgos como la precisión del GPS, la dependencia de la conexión a internet o los desafíos relacionados con la escalabilidad futura del sistema. 

## **Análisis** 

Se trata de identificar los casos de uso principales de la aplicación, incluyendo el inicio de sesión, el reporte de incidentes, la visualización de localizaciones en el mapa, las opciones de privacidad y el registro de usuarios. A partir de estos casos, se van a elaborar diagramas de casos de uso, de secuencia del sistema y de clases con el objetivo de representar de forma clara la interacción entre los usuarios y las funcionalidades clave de la aplicación. 

## **Diseño** 

Se elaborarán diagramas de secuencia para representar la arquitectura lógica de la aplicación, describiendo en detalle la gestión de datos y el control del flujo de operaciones entre los distintos componentes del sistema. Estos diagramas permiten comprender el comportamiento dinámico de la aplicación en situaciones clave, como el inicio de sesión, la creación de reportes o la edición de zonas en el mapa. Además, se incluirá una explicación detallada de las decisiones tomadas en el diseño visual. Esta justificación abarca aspectos como la elección de colores, tipografía, disposición de elementos y criterios de accesibilidad. 

## **Implementación de la aplicación móvil** 

Se programará la lógica de la aplicación utilizando Java, integrando servicios como Firebase para la autenticación de usuarios y almacenamiento de datos, y GraphHopper para el trazado eficiente de rutas. Asimismo, se conectarán mapas de OpenStreetMap mediante la biblioteca `OSMDroid` , lo que permitirá a los usuarios marcar ubicaciones y 

Capítulo 3 

Página 40 

visualizar rutas directamente sobre el mapa. Se implementarán formularios interactivos para el envío de reportes detallados, incluyendo campos para texto, tipo de incidente, nivel de prioridad y ubicación geográfica. Además, se añadirán funciones de privacidad, como la opción de enviar reportes de forma anónima o desactivar el rastreo de ubicación, reforzando la privacidad del usuario. Paralelamente, se diseñará la interfaz de usuario utilizando XML y las herramientas visuales de Android Studio, abarcando pantallas como la de inicio, el formulario de reportes, los ajustes y la navegación general. El diseño se estructurará empleando componentes como _RecyclerView_ , _Switch_ , _EditText_ y distintos elementos de navegación para garantizar una experiencia intuitiva y funcional. 

## **Pruebas y resultados** 

Se llevarán a cabo pruebas funcionales de cada componente de la aplicación, incluyendo la localización, el sistema de reportes y la interfaz de usuario. Además, se realizarán pruebas de compatibilidad y rendimiento para asegurar un funcionamiento fluido en diferentes dispositivos y condiciones. Tras la evaluación de los resultados obtenidos, se efectuarán los ajustes necesarios, teniendo en cuenta criterios como el tiempo de carga, la precisión geográfica y la calidad de la experiencia del usuario. 

## **3.3.2. Costes de plazos de ejecución** 

En esta sección se estima la inversión de tiempo del proyecto, es decir, el periodo requerido para completar cada una de las actividades y fases involucradas en el desarrollo de la aplicación móvil. Una adecuada planificación temporal resulta fundamental para asegurar que el proyecto pueda finalizarse de manera realista y eficiente. 

Para estimar la duración de las tareas se ha aplicado la metodología de estimación por tres valores, expresando todos los tiempos en días laborables. Las estimaciones han sido realizadas por el desarrollador en base a su conocimiento y experiencia en desarrollo Android. 

**Estimación por tres valores:** Esta técnica emplea tres estimaciones de tiempo, las que se combinan estadísticamente, para obtener el tiempo estimado (te): 

- **Optimista (to):** El tiempo mínimo necesario si todo va según lo previsto. 

- **Más probable (tm):** El tiempo que se considera más realista según las condiciones normales del desarrollo. 

- **Pesimista (tp):** El mayor tiempo que podría llevar la tarea, contemplando posibles dificultades. 

La fórmula utilizada para calcular el tiempo estimado ( _te_ ) es: 

**==> picture [106 x 25] intentionally omitted <==**

Estas estimaciones temporales se reflejan en las siguientes tablas: 

Estado del arte 3.1. 

- Requisitos, especificaciones, coste, riesgos y viabilidad 3.2. 

Capítulo 3 

Página 41 

- Análisis de la aplicación móvil 3.3. 

- Diseño de la aplicación móvil 3.4. 

- Implementación de la aplicación móvil 3.5. 

- Pruebas y resultados 3.6. 

- Estimación total del proyecto 3.7. 

Cuadro 3.1: Estimación temporal en días del Estado del Arte 

|**Actividad**|_to_|_tm_|_tp_|_te_|
|---|---|---|---|---|
|Investigar aplicaciones moviles análogas disponibles.|1|2|3|2|
|Analizar las herramientas para desarrollar la aplicación.|2|3|5|3.17|
|**Total de tiempo estimado en días**|**3**|**5**|**8**|**5.17**|



Cuadro 3.2: Estimación temporal en días del análisis de requisitos, especificaciones, coste, riesgos y viabilidad. 

|**Actividad**|**_to_**|**_tm_**|**_tp_**|**_te_**|
|---|---|---|---|---|
|Defnir requisitos funcionales y no funcionales|0.5|1|2|1.08|
|Especifcación de funcionalidades del proyecto|1|2|3|2|
|Estimación de costes|1|2|3|2|
|Análisis de viabilidad y riesgos|1|1.5|2|1.5|
|**Total de tiempo estimado en días**|**3.5**|**6.5**|**10**|**6.58**|



Cuadro 3.3: Estimación temporal en días del análisis de la aplicación móvil 

|**Actividad**|**_to_**|**_tm_**|**_tp_**|**_te_**|
|---|---|---|---|---|
|Determinar los casos de uso de la aplicación móvil|1|2|3|2|
|Crear diagramas de casos de uso, actividad y estados|2|3|5|3.17|
|Obtener los datos proporcionados|2|3|5|3.17|
|**Total de tiempo estimado en días**|**5**|**8**|**13**|**8.33**|



Cuadro 3.4: Estimación temporal en días del diseño de la aplicación móvil 

|**Actividad**|**_to_**|**_tm_**|**_tp_**|**_te_**|
|---|---|---|---|---|
|Crear diagramas de clase|3|5|7|5|
|Diseñar las interfaces de usuario|15|20|30|20.83|
|**Total de tiempo estimado en días**|**18**|**25**|**35**|**25.5**|



Capítulo 3 

Página 42 

Cuadro 3.5: Estimación temporal en días de la implementación de la aplicación móvil. 

|**Actividad**|**_to_**|**_tm_**|**_tp_**|**_te_**|
|---|---|---|---|---|
|Crea las pantalla de inicio|2|4|8|4.33|
|Crea las pantallas de registro|2|4|8|4.33|
|Crea las pantalla de reportes|4|6|8|6|
|Crea las pantalla de mapa|2|4|8|4.33|
|Crea las pantalla de comunidad|2|4|8|4.33|
|Crea las pantalla de viaje seguro|4|6|8|6|
|Crea las pantalla de confguración|2|4|8|4.33|
|Implementar la funcionalidad del mapa|10|20|35|20.8|
|Implementar la funcionalidad de viaje seguro|10|20|35|20.8|
|Implementar la funcionalidad de reporte|5|15|30|15.83|
|**Total de tiempo estimado en días**|**43**|**91**|**156**|**93.8**|



Cuadro 3.6: Estimación temporal en días de pruebas y resultados. 

|**Actividad**|**_to_**|**_tm_**|**_tp_**|**_te_**|
|---|---|---|---|---|
|Realizar pruebas de funcionalidad|8|12|20|12.6|
|Analizar los resultados y hacer ajustes|5|10|15|10|
|**Total de tiempo estimado en días**|**12**|**22**|**35**|**22.5**|



Cuadro 3.7: Estimación temporal en días de todo el proyecto. 

|**Actividad**|**_to_**|**_tm_**|**_tp_**|**_te_**|
|---|---|---|---|---|
|Estado del arte|4|6|8|6|
|Requisitos, especifcaciones, coste, riesgos, viabilidad|4|6|10|6.33|
|Análisis de la aplicación móvil|4|6|10|6.33|
|Diseño de la aplicación móvil|15|20|30|20.83|
|Implementación de la aplicación móvil|20|30|40|30|
|Pruebas y resultados|5|10|20|10.8|
|**Total de tiempo estimado en días**|**52**|**78**|**108**|**78.67**|



Como se muestra en el Diagrama de Gantt (ver Figura 3.1), la planificación temporal abarca un total de 134 días de trabajo. 

Capítulo 3 

Página 43 

**==> picture [455 x 317] intentionally omitted <==**

**----- Start of picture text -----**<br>
Id Modo  Nombre de tarea Duración Comienzo Fin Predecesoras iembre 2024 | diciembre 2024 | enero 2025 febrero 2025 | marzo 2025 abril 2025 mayo 2025<br>de  06 09 12 15 18 21 24 27 30 03 06 09 12 15 18 21 24 27 30 02 05 08 11 14 17 20 23 26 29 01 04 07 10 13 16 19 22 25 28 03 06 09 12 15 18 21 24 27 30 02 05 08 11 14 17 20 23 26 29 02 05 08 11 14 17 20 23 26<br>0 = Proyecto 134 días vie 15/11/24 mié 21/05/25<br>1 = Estado del arte 5,17 días vie 15/11/24 vie 22/11/24 m—<br>2 = Investigar aplicaciones moviles  2 días vie 15/11/24 lun 18/11/24<br>análogas disponibles<br>3 in; Analizar las herramientas para  3,17 días mar 19/11/24 vie 22/11/24 2 ¥<br>desarrollar la aplicación<br>4 A Análisis de requisitos 6,58 días jue 28/11/24 vie 06/12/24 =<br>5 = Definir requisitos funcionales y  1,08 días jue 28/11/24 vie 29/11/24 3 x<br>no funcionales<br>6 = Especificación de funcionalidades 2 días vie 29/11/24 mar 03/12/24 5 Ba<br>del proyecto<br>7 = Estimación de costes 2 días mar 03/12/24 jue 05/12/24 6 R a<br>8 = Análisis de viabilidad y riesgos 1,5 días jue 05/12/24 vie 06/12/24 7 y<br>9 J Análisis de la aplicación móvil 10 días dom 15/12/24 jue 26/12/24<br>10 om; Determinar los casos de uso de la 2 días lun 16/12/24 mar 17/12/24 8 — x<br>aplicación móvil<br>11 = Crear diagramas de casos de  3,17 días mié 18/12/24 lun 23/12/24 10 y<br>usos, actividad y estados<br>12 = Obtener los datos proporcionados3,17 días lun 23/12/24 jue 26/12/24 11 x<br>13 X Diseño de la aplicación móvil 25 días vie 03/01/25 jue 06/02/25 SSS<br>14 = Crear diagramas de clase 5 días vie 03/01/25 jue 09/01/25 12<br>15 = Diseñar las interfaces de usuario 20 días vie 10/01/25 jue 06/02/25 14 Ba<br>16 Z Implementación de la aplicación  40,96 días vie 10/01/25 vie 07/03/25 SS<br>móvil<br>17 = Crea las pantalla de inicio 4,33 días vie 10/01/25 jue 16/01/25<br>18 ld Crea las pantallas de registro  4,33 días vie 10/01/25 jue 16/01/25<br>19 = Crea las pantallas de reportes 6 días vie 10/01/25 vie 17/01/25<br>20 = Crea las pantallas de mapa 4,33 días vie 10/01/25 jue 16/01/25<br>21 = Crea las pantallas de comunidad 4,33 días vie 10/01/25 jue 16/01/25<br>22 ld Crea las pantallas de viaje seguro  6 días vie 10/01/25 vie 17/01/25<br>23 = Crea las pantallas de configuración4,33 días vie 10/01/25 jue 16/01/25<br>24 = Implementar la funcionalidad del  20,8 días jue 16/01/25 vie 14/02/25 17<br>mapa<br>25 = Implementar la funcionalidad de  20,8 días jue 16/01/25 vie 14/02/25 17 pa<br>viaje seguro<br>26 = Implementar la funcionalidad de  15,83 días vie 14/02/25 vie 07/03/25 24;25<br>reporte<br>27 J Pruebas y resultados 24 días dom 20/04/25 mié 21/05/25 —————<br>28 = Realizar pruebas de funcionalidad 12,6 días lun 21/04/25 mié 07/05/25<br>29 on; Analizar los resultados y hacer  10 días mié 07/05/25 mié 21/05/25 28 Pa<br>ajustes<br>30 A Documentación y memoria 109 días vie 20/12/24 mié 21/05/25 es<br>31 = Recopilación de información 56 días vie 20/12/24 vie 07/03/25<br>32 = Creación de la memoria 95 días jue 09/01/25 mié 21/05/25<br>Tarea Resumen del proyecto t 1 Tarea manual ' i] solo el comienzo c Fecha límite +<br>División Tarea inactiva solo duración solo fin Progreso<br>Hito o Hito inactivo Informe de resumen manual —————= Tareas externas Progreso manual ——<br>Resumen me Resumen inactivo Resumen manual [| Hito externo °<br>1<br>**----- End of picture text -----**<br>


Figura 3.1: Diagrama de Gantt 

## **3.3.3. Costes económicos** 

En este apartado se detallan los costes económicos asociados al desarrollo del proyecto, organizados en cuatro bloques principales: costes personales, materiales, amortización de equipos y costes indirectos. 

Los costes personales hacen referencia a los perfiles profesionales que, en un contexto real de producción, participarían en el desarrollo de la aplicación móvil. Estos roles incluyen un jefe de proyecto, un analista programador, programador de aplicaciones móviles, programador en OpenStreetService, desarrollador de interfaz y entornos de usuario. 

En cuanto a los costes materiales, se consideran los gastos derivados del uso de software específico, así como los consumos básicos necesarios para el desarrollo, como la conexión a internet y el suministro eléctrico. 

Por otro lado, los costes de amortización se calculan teniendo en cuenta el uso de equipos informáticos de alto rendimiento, distribuyendo su valor a lo largo del tiempo de vida útil estimado. 

Finalmente, los costes indirectos se estiman aplicando un porcentaje fijo sobre el total de los costes directos, con el objetivo de contemplar gastos generales no asignables directamente a una sola actividad. 

Capítulo 3 

Página 44 

## **Costes personales** 

Los costes personales representan el gasto asociado a la participación de profesionales en el desarrollo del proyecto. Para calcularlos, es necesario distribuir las tareas del proyecto entre los distintos perfiles técnicos involucrados (por ejemplo, desarrolladores Android, diseñadores de interfaces, analistas, etc.) y estimar el número de horas que cada uno dedicará a sus respectivas responsabilidades. 

1. **Jefe de proyecto:** 

   - _a_ ) Investigar el estado del arte del proyecto (recopilación de información sobre tecnologías y tendencias). 

   - _b_ ) Coordinar el proyecto y controlar que se cumplen los plazos. 

2. **Analista programador:** 

   - _a_ ) Definir los requisitos funcionales y no funcionales del proyecto. 

   - _b_ ) Realizar el análisis detallado de la aplicación móvil (características y funcionalidades necesarias). 

## 3. **Programador aplicaciones móviles:** 

   - _a_ ) Diseñar las interfaces de la aplicación móvil. 

4. **Programador en OpenStreetService:** 

   - _a_ ) Implementar las funcionalidades del mapa y ruta. 

   - _b_ ) Realizar pruebas y analizar los resultados (verificación y ajuste de errores). 

## 5. **Desarrollador de interfaz y entornos de usuario:** 

- _a_ ) Diseñar e implementar la interfaz. 

- _b_ ) Integrar los principios de entornos de usuario. 

- _c_ ) Realizar pruebas funcionales. 

Para estimar los sueldos brutos anuales de los distintos perfiles profesionales involucrados en el proyecto, se han utilizado fuentes especializadas en análisis de empleo y salarios como InfoJobs [28], PayScale [29] y Glassdoor [30]. Estas plataformas recopilan datos a partir de ofertas publicadas y de encuestas a trabajadores del sector tecnológico, lo que permite obtener una visión actualizada y contrastada del mercado laboral. A partir de estas cifras, se han calculado los costes totales incluyendo los gastos empresariales correspondientes a cotizaciones sociales, aplicando estimaciones derivadas de simuladores empresariales y referencias contables estándar. La Tabla 3.8 recoge los sueldos brutos anuales estimados y su coste total asociado para la empresa según el perfil profesional. 

Capítulo 3 

Página 45 

Cuadro 3.8: Sueldos brutos anuales estimados de los profesionales del proyecto. 

|**Profesión**|**Sueldo bruto anual**|**Sueldo bruto + SS**|
|---|---|---|
|Jefe de proyecto|50.000€|65.000€|
|Analista programador|36.000€|42.000€|
|Programador aplicaciones móviles|45.000€|53.000€|
|Programador en OpenStreetService|40.000€|47.000€|
|Desarrollador de interfaz y entornos de usuario|35.000€|42.000€|



Para calcular el coste asociado al personal técnico involucrado en el proyecto, se ha estimado el número total de horas de dedicación por profesional con la ayuda de Factorial [31]. A partir de esta estimación, se procede a calcular el coste bruto por hora de cada perfil, tomando como base su salario bruto anual. Este valor se divide entre 1800 horas, cifra que representa el máximo de horas laborales anuales establecidas en el convenio colectivo del sector de las tecnologías de la información. El resultado permite obtener una estimación realista del coste laboral, incluyendo los gastos derivados de la Seguridad Social a cargo de la empresa. El desglose de estos cálculos puede consultarse en la Tabla 3.9. 

Cuadro 3.9: Estimación del coste asociado al personal técnico participante en el proyecto. 

|**Perfl profesional**|**Coste por hora**|**Horas dedicadas**|**Coste total estimado**|
|---|---|---|---|
|Jefe de proyecto|40.00€|80|3200.00€|
|Analista programador|25.00€|70|1750.00€|
|Desarrollador apps móviles|19.00€|100|1900.00€|
|Especialista OpenStreetMap|15.00€|40|600.00€|
|Desarrollador de interfaz|12.00€|90|1080.00€|
|**Resumen general**||**380 h**|**8530.00€**|



## **Costes materiales** 

Los costes materiales engloban todos aquellos recursos tangibles o servicios necesarios para el desarrollo de la aplicación, que no se amortizan a lo largo del tiempo. En este apartado se contemplan licencias de software, bibliotecas o APIs de terceros, así como consumos indirectos como electricidad y servicios de conexión a internet. 

Dado que el análisis parte de una perspectiva profesional, se han considerado tarifas orientadas a entornos empresariales, incluyendo suscripciones mensuales de herramientas de desarrollo o almacenamiento en la nube utilizadas durante el ciclo del proyecto. 

La estimación también incluye una valoración razonada del gasto energético y de conectividad, calculado en función del número de horas de trabajo estimadas. Todos estos elementos se detallan en la tabla 3.10. 

Capítulo 3 

Página 46 

Cuadro 3.10: Costes de Software y Otros Gastos 

|**Concepto**|**Días de Uso**|**Coste Mensual**|**Coste Total**|
|---|---|---|---|
|AndroidStudio|100|0€|0€|
|FireBase|80|10€|30€|
|OpenStreetMap|40|0€|0€|
|Graphhopper|40|69€|138€|
|Visual Paradigm|12|30€|30€|
|Electricidad|110|22€|90€|
|Conexión a Internet|110|28€|112€|
|**Total**|-|-|**400.00€**|



## **Costes de amortización** 

Los costes de amortización permiten contabilizar el importe progresivo de los equipos utilizados durante el desarrollo del proyecto. Este procedimiento consiste en distribuir el valor de adquisición de dichos recursos (como ordenadores, smartphones de prueba o periféricos) a lo largo de sus dias de uso estimados. 

De este modo, en lugar de imputar el coste completo de un dispositivo al proyecto, se considera únicamente la fracción correspondiente al período en el que ha sido empleado. Esta aproximación proporciona una visión más ajustada del gasto real asociado al uso del hardware durante el desarrollo de la aplicación. 

En la tabla 3.11 se recogen los dispositivos utilizados, su coste de alquiler, los dias de uso y la proporción correspondiente al tiempo efectivo de uso dentro del proyecto. 

Cuadro 3.11: Costes de Amortización de Equipos 

|**Equipo**|**Coste Alquiler**|**Días de Uso**|**Amortización**|
|---|---|---|---|
|Ordenador 1|40€/día|10|400€|
|Ordenador 2|40€/día|8|160€|
|Ordenador 3|40€/día|6|240€|
|Ordenador 4|60€/día|15|900€|
|Ordenador 5|60€/día|12|720€|
|Smartphone 1|8€/día|3|24€|
|Smartphone 2|80€/día|3|240€|
|**Total**|**46.86€/día**|**57**|**2684€**|



## **Costes indirectos** 

Los costes indirectos corresponden a aquellos recursos y gastos generales que, aunque no se vinculan de forma directa con tareas concretas del desarrollo, resultan imprescindibles para llevar a cabo el proyecto. Estos incluyen aspectos como el uso de energía eléctrica, conexión a internet, alquiler del equipo, licencias de software generalistas, o incluso el espacio de trabajo utilizado durante el proceso. 

Dado que no es posible asociar estos costes a una actividad específica dentro del desarrollo de la aplicación, se opta por una estrategia habitual en gestión de proyectos: aplicar un coeficiente de coste general, conocido como “overhead”, sobre el total de los 

Capítulo 3 

Página 47 

costes directos estimados. Este coeficiente permite tener una visión más realista del gasto total, integrando necesidades logísticas y operativas. 

En este caso, como podemos visualizar en la tabla 3.12 se ha considerado razonable aplicar un 20 % como porcentaje de costes indirectos, cifra comúnmente utilizada en proyectos tecnológicos y académicos. Este valor ha sido añadido al total de los costes directos para obtener la estimación completa del proyecto, reflejada en la tabla 3.13. 

Cuadro 3.12: Total de costes indirectos del proyecto 

|**Concepto**|**Coste**|**Coste indirecto**|
|---|---|---|
|Costes personales|8.530€|1.706€|
|Costes materiales|400€|80€|
|Costes de amortización|2.684€|537€|
|**Total**||**2.323€**|



Cuadro 3.13: Total de costes económicos del proyecto 

|**Concepto**|**Coste**|
|---|---|
|Costes personales|8.530€|
|Costes materiales|400€|
|Costes de amortización|2.684€|
|Costes indirectos|2.323€|
|**Total**|**13.937€**|



## **3.4. Riesgos** 

En esta sección se identifican y analizan los posibles riesgos que podrían generar inconvenientes durante el desarrollo del proyecto. El objetivo es anticiparse a estos riesgos para minimizar su impacto y estar preparados en caso de que lleguen a materializarse. Para ello, se clasificarán los riesgos y se propondrán medidas para su gestionarlos adecuadamente. 

Los riesgos se pueden clasificar en las siguientes tipos: 

- **Inaceptable** : El proyecto no puede avanzar sin aplicar acciones correctivas inmediatas que reduzcan significativamente la probabilidad de ocurrencia y/o el impacto del riesgo. 

- **Alto** : Representa una amenaza considerable para los plazos y el presupuesto. Puede comprometer hitos clave y afectar a otros proyectos relacionados. 

- **Moderado** : Su impacto en tiempo y costes es limitado. No interfiere con los hitos del proyecto ni con iniciativas paralelas. 

- **Bajo** : Tiene una influencia mínima sobre el desarrollo del proyecto, aunque debe ser supervisado periódicamente para evitar que escale a niveles superiores de riesgo. 

En la tabla 3.14 se exponen los riesgos identificados para el desarrollo de una aplicación móvil. Los riesgos se clasifican en función de su Nivel de Riesgo, el cual se obtiene 

Capítulo 3 

Página 48 

multiplicando la probabilidad de ocurrencia del riesgo por el impacto potencial que tendría sobre el proyecto. Esta evaluación permite priorizar los riesgos y establecer planes de acción proporcionales a su gravedad. La clasificación del Nivel de Riesgo se basa en los siguientes rangos: 

La clasificación del Nivel de Riesgo se ha realizado en base a los siguientes rangos: 

- **Inaceptable** : N.Riesgo mayor a 2.5. 

- **Alto** : N.Riesgo entre 1.5 y 2.5. 

- **Moderado** : N.Riesgo entre 0.75 y 1.5. 

- **Bajo** : N.Riesgo entre 0.1 y 0.75. 

- **Nulo** : N.Riesgo menor o igual a 0.1. 

Esta clasificación permite establecer prioridades entre los distintos riesgos identificados y aplicar las medidas más adecuadas para su gestión. A continuación, se presentan los principales eventos de riesgo junto con su probabilidad de ocurrencia, el impacto estimado, el nivel de riesgo calculado y su correspondiente categoría según la escala definida: 

|**Evento**|**Probabilidad**|**Impacto**|**N.Riesgo**|**Clasifcación**|
|---|---|---|---|---|
|Violación de privacidad y<br>datos personales|40 %|10|4.00|Inaceptable|
|Incumplimiento del crono-<br>grama previsto|35 %|6|2.10|Alto|
|Mala experiencia de usuario<br>(UX/UI defciente, crashes<br>frecuentes)|35 %|6|2.10|Alto|
|Incompatibilidad con múlti-<br>ples dispositivos o sistemas<br>operativos|35 %|6|2.10|Alto|
|Sobrecarga de servidores o<br>infraestructura inefciente|35 %|6|2.10|Alto|
|Inestabilidad en la interfaz<br>visual del sistema|30 %|6|1.80|Alto|
|Fallos críticos en el desarro-<br>llo del código|15 %|10|1.50|Alto|
|Ajustes de requisitos|35 %|4|1.40|Moderado|
|Desacuerdo en el equipo de<br>diseño|30 %|4|1.20|Moderado|
|Limitación de fnanciación|5 %|20|1.00|Moderado|
|Incidencias legales relacio-<br>nadas con licencias|5 %|15|0.75|Bajo|



Cuadro 3.14: Riesgos en el desarrollo de la aplicación móvil 

Si se identifica algún riesgo de nivel inaceptable la prioridad es ser solucionado; por ello, es imprescindible implementar medidas de mitigación para reducirlo. 

**Riesgo** 

Capítulo 3 

Página 49 

Violación de privacidad y datos personales 

## **Descripción** 

Existe el riesgo de que datos personales de los usuarios de la app móvil sean expuestos, accedidos o utilizados de manera indebida debido a fallos de seguridad, accesos no autorizados, o manejo inadecuado de la información. Esto podría ocasionar pérdida de confianza por parte de los usuarios, sanciones legales y daños reputacionales. 

## **Mitigación** 

Para minimizar este riesgo, se pueden implementar las siguientes acciones: 

- **Implementación de medidas de seguridad avanzadas:** Uso de cifrado para el almacenamiento y transmisión de datos, autenticación fuerte y actualización constante de parches de seguridad. 

- **Capacitación en protección de datos:** Formación al equipo sobre la importancia de cumplir con normativas de privacidad y buenas prácticas en el manejo de datos personales. 

- **Políticas estrictas de acceso y gestión:** Definir y controlar el acceso a los datos personales solo a personal autorizado, con auditorías periódicas para detectar posibles brechas. 

## **Evaluación del riesgo inicial:** 

Probabilidad inicial: 40 % 

- Impacto inicial: 10 semanas de retraso 

- Nivel de riesgo: Inaceptable (4.00) 

## **Evaluación del riesgo mitigado:** 

- Probabilidad mitigada: 20 % 

- Impacto mitigado: 3 semanas de retraso 

- Nivel de riesgo mitigado: Bajo (0.60) 

En el caso de los riesgos clasificados como altos, es fundamental contar con planes de contingencia que puedan aplicarse en caso de que se produzca este evento. 

## **Riesgo** 

Mala experiencia de usuario (UX/UI deficiente, crashes frecuentes). 

## **Descripción** 

Existe el riesgo de que la aplicación móvil presente una interfaz poco intuitiva o problemas técnicos recurrentes que provoquen cierres inesperados (crashes). Esto puede afectar 

Capítulo 3 

Página 50 

negativamente la satisfacción de los usuarios, reducir la retención y dañar la reputación de la app. 

## **Contingencia** 

Para minimizar este riesgo, se pueden implementar las siguientes acciones: 

- **Diseño centrado en el usuario:** Realizar estudios y pruebas de usabilidad desde las fases iniciales para garantizar una interfaz intuitiva y atractiva. 

- **Pruebas exhaustivas y continuas:** Implementar pruebas automatizadas y manuales para detectar y corregir errores o fallos que puedan causar cierres inesperados. 

- **Monitoreo post-lanzamiento:** Usar herramientas de análisis para recoger feedback y detectar problemas de rendimiento o usabilidad en tiempo real. 

## **Evaluación del riesgo inicial:** 

Probabilidad inicial: 35 % 

- Impacto inicial: 6 semanas de retraso 

- Nivel de riesgo: Alto (2.10) 

## **Evaluación del riesgo con contingencia:** 

Probabilidad mitigada: 25 % 

- Impacto mitigado: 2 semanas de retraso 

- Nivel de riesgo mitigado: Bajo (0.5) 

## **Riesgo** 

Fallos críticos en el desarrollo del código. 

## **Descripción** 

Existe el riesgo de que se produzcan errores graves durante el desarrollo del código, tales como bugs en funciones fundamentales, problemas de compatibilidad, o una arquitectura mal planteada. Estos fallos pueden provocar cuelgues, pérdida de datos, retrasos significativos en el proyecto o incluso la necesidad de rehacer módulos completos. 

## **Contingencia** 

Para mitigar este riesgo, se proponen las siguientes medidas: 

- **Revisión de código regular:** Establecer revisiones de código periódicas entre pares para detectar errores tempranamente y asegurar buenas prácticas de programación. 

Capítulo 3 

Página 51 

- **Integración continua:** Utilizar herramientas de integración continua que permitan ejecutar pruebas automáticas y análisis de calidad cada vez que se realicen cambios en el código. 

- **Arquitectura modular:** Diseñar el sistema en módulos bien definidos y desacoplados para facilitar pruebas unitarias, mantenimiento y posibles cambios. 

- **Documentación técnica clara:** Mantener documentación actualizada para que cualquier miembro del equipo pueda entender e intervenir fácilmente en cualquier parte del código. 

## **Evaluación del riesgo inicial:** 

- Probabilidad inicial: 15 % 

- Impacto inicial: 10 semanas de retraso 

- Nivel de riesgo: Alto (1.50) 

## **Evaluación del riesgo con contingencia:** 

- Probabilidad mitigada: 5 % 

- Impacto mitigado: 3 semanas de retraso 

- Nivel de riesgo mitigado: Bajo (0.15) 

## **3.5. Viabilidad** 

Antes de avanzar con el desarrollo del proyecto, es fundamental realizar un análisis de viabilidad que permita valorar su factibilidad en términos técnicos, económicos y legales. Para ello, se presenta a continuación un estudio estructurado en tres apartados: análisis técnico, análisis económico y análisis legal. 

## **3.5.1. Viabilidad técnica** 

La viabilidad técnica analiza si el proyecto puede ser desarrollado y funcionar correctamente utilizando los recursos tecnológicos disponibles. En este caso, el proyecto consiste en una aplicación móvil que utiliza mapas interactivos para identificar y visualizar zonas peligrosas dentro de una determinada área geográfica. 

El desarrollo se realizará utilizando tecnologías ampliamente adoptadas en el sector móvil: Android Studio como entorno de desarrollo, Firebase para la gestión de datos en la nube y GraphHoper para el cálculo de rutas que eviten las zonas marcadas como peligrosas. La integración de mapas se logrará mediante OpenStreetMap, lo cual permitirá una visualización clara y precisa de las ubicaciones. 

Todas estas herramientas están bien documentadas, son estables, y cuentan con una comunidad activa, lo cual facilita tanto el desarrollo como el mantenimiento de la aplicación. Incluso si el desarrollo fuera trasladado a un equipo profesional, los recursos tecnológicos 

Capítulo 3 

Página 52 

seleccionados seguirían siendo apropiados, ya que se alinean con prácticas comunes en el desarrollo de aplicaciones móviles con funcionalidad geoespacial. 

Por todo lo anterior, se concluye que la solución propuesta es técnicamente viable, y no se prevén obstáculos significativos para su implementación desde el punto de vista tecnológico, sin embargo, existen herramientas de pago que podrían hacer el proceso más eficiente. 

## **3.5.2. Viabilidad económica** 

La viabilidad económica se refiere a la posibilidad de ejecutar el proyecto sin que los costes supongan un impedimento importante. En este caso, dado que se trata de una aplicación móvil desarrollada en el ámbito académico y por un único estudiante, no se requiere una inversión inicial significativa. Las herramientas utilizadas, como Android Studio, Firebase y APIs de código abierto como GraphHoper son gratuitas o cuentan con planes de uso sin coste para proyectos pequeños o en fase de prototipo. 

No será necesario adquirir hardware adicional ni contratar personal externo, ya que el desarrollo y las pruebas se realizarán con dispositivos propios y recursos disponibles. Por tanto, el coste económico real del proyecto es mínimo. 

Sin embargo, con el fin de evaluar su viabilidad en un contexto profesional, se ha simulado un escenario en el que el desarrollo y mantenimiento de la aplicación es asumido por un equipo técnico profesional. 

## **3.5.3. Análisis legal** 

El análisis legal del proyecto se enfoca en identificar y cumplir con las leyes y regulaciones que inciden en el desarrollo y uso de la aplicación móvil, garantizando un marco jurídico seguro y transparente. 

Primero, se ha revisado la normativa de protección de datos personales, en particular el RGPD [32]. Aunque la app gestiona información de localización, se ha diseñado para evitar el almacenamiento directo de datos identificativos. Los datos geográficos se manejan de forma agregada y se emplean únicamente para funcionalidades internas, minimizando riesgos de privacidad. Además, se establecerán mecanismos para que los usuarios den su consentimiento explícito para cualquier uso de su información. Incluso, se podría proporcionar un aviso claro sobre el tratamiento de datos en una política de privacidad accesible. 

En cuanto a la seguridad informática, el proyecto incorporará medidas para proteger los datos procesados y prevenir accesos no autorizados o vulnerabilidades, alineándose con las mejores prácticas recomendadas para aplicaciones móviles que manejan datos sensibles. 

Respecto a las posibles transacciones o monetización, como la publicidad integrada o posibles suscripciones, se garantizará que toda comunicación sea transparente y se respeten los derechos del consumidor, evitando prácticas engañosas y facilitando el acceso a la información contractual. 

La aplicación también cumplirá con criterios de accesibilidad digital, procurando que sea usable para personas con diferentes capacidades, siguiendo recomendaciones internacionales que favorecen la inclusión tecnológica. 

Por último, se analizarán los contratos y términos de uso de los servicios externos 

Capítulo 3 

Página 53 

(APIs, mapas, etc.) para asegurar que su utilización sea legal y respetuosa de las licencias establecidas, evitando riesgos legales por incumplimientos. 

Tras evaluar todos estos aspectos, se confirma que la aplicación puede desarrollarse y distribuirse dentro del marco legal vigente sin restricciones significativas 

Capítulo 3 

Página 54 

## **Capítulo 4** 

## **Análisis** 

El presente apartado tiene como objetivo analizar de manera estructurada la aplicación móvil desarrollada, utilizando herramientas de modelado que permitan comprender tanto los requisitos del sistema como su comportamiento interno. Para ello, se ha empleado Visual Paradigm como entorno de modelado UML, facilitando la elaboración de diferentes diagramas que sustentan la fase de análisis. 

En primer lugar, se presenta el diagrama de casos de uso, acompañado de sus correspondientes flujos de eventos, que permiten identificar y describir las interacciones entre los usuarios y el sistema, detallando el comportamiento esperado ante distintos escenarios. A continuación, se expone el diagrama de clases conceptual, donde se definen las entidades principales del dominio y sus relaciones, sirviendo como base para el diseño orientado a objetos. Por último, se incluyen los diagramas de secuencia general del sistema, que ilustran el flujo de mensajes entre objetos durante la ejecución de los distintos casos de uso, permitiendo visualizar la lógica de interacción del sistema. 

## **4.1. de casos de uso Diagrama** 

Esta herramienta se emplea principalmente durante las etapas de análisis y diseño de un sistema, ya que nos ayuda a organizar y comprender mejor su desarrollo. El diagrama de casos de uso es una representación gráfica que muestra de forma clara cómo los usuarios (también llamados actores) se relacionan con el sistema, identificando las distintas acciones o funcionalidades que pueden llevar a cabo. 

Con respecto a este caso concreto, hay un actor (usuario) que interactúa con el sistema (aplicación). El usuario tiene la posibilidad de elegir entre diferentes acciones llamadas casos de uso. Las acciones a destacar son las siguientes: “Iniciar sesión”, “Llamar a emergencias”, “Hacer reporte”, “Añadir involucrado”, “Cargar zonas”, “Guardar zonas”, “Compartir ruta”, “Activar viaje seguro”, “Activar GPS”, “Modificar datos” y “Cerrar sesión”. 

Capítulo 4 

Página 56 

Figura 4.1: Diagrama de Casos de Uso. 

## **4.1.1. Flujos de eventos de casos de uso** 

Los flujos de eventos permiten describir cómo se comporta un caso de uso, y se clasifican en dos tipos principales: 

- Flujo principal: representa la secuencia de pasos más común que sigue el usuario, junto con la respuesta esperada del sistema. 

- Flujos alternativos: describen rutas diferentes que pueden surgir cuando ocurre alguna situación no prevista dentro del desarrollo normal del caso de uso. 

A continuación, se detallan tanto el flujo principal como los posibles flujos alternativos para cada uno de los casos de uso. 

## **Flujos de eventos del caso de uso “ Iniciar sesión ”** 

Como podemos observar en el primer diagrama, el caso de uso “Iniciar sesión” tiene seis extension points: “Inicio”, “Reportes”, “Mapa”, “Comunidad”, “Viaje Seguro” y “Confi- 

Capítulo 4 

Página 57 

guración”. Todas estas opciones se muestran en un menú desplegable a la izquierda de la pantalla. 

Figura 4.2: Casos de Uso - Iniciar sesión. 

Figura 4.3: Casos de Uso - Iniciar sesión. 

Capítulo 4 

Página 58 

Figura 4.4: Casos de Uso - Iniciar sesión. 

## **Flujos de eventos del caso de las opciones del menu desplegable** 

Seguidamente, detallaremos los casos de uso de las opciones del menu desplegable. 

## **CU: Inicio** 

Figura 4.5: Casos de Uso - Inicio. 

## **CU: Reportes** 

Figura 4.6: Casos de Uso - Reportes. 

## **CU: Mapa** 

Capítulo 4 

Página 59 

Figura 4.7: Casos de Uso - Mapa. 

## **CU: Comunidad** 

Figura 4.8: Casos de Uso - Comunidad. 

## **CU: Viaje seguro** 

Figura 4.9: Casos de Uso - Viaje seguro. 

## **CU: Configuración** 

Capítulo 4 

Página 60 

Figura 4.10: Casos de Uso - Configuración. 

## **Flujos de eventos del caso de uso de las acciones a realizar** 

A continuación, detallaremos los casos de uso de las acciones que se pueden realizar en las diferentes pantallas. 

## **CU: Contacto con emergencias** 

Figura 4.11: Casos de Uso - Llamar a emergencias. 

## **CU: Reportar incidente** 

Figura 4.12: Casos de Uso - Hacer reporte. 

## **CU: Añadir incolucrado** 

Capítulo 4 

Página 61 

Figura 4.13: Casos de Uso - Añadir involucrado. 

Figura 4.14: Casos de Uso - Añadir involucrado. 

## **CU: Consultar zonas** 

Capítulo 4 

Página 62 

Figura 4.15: Casos de Uso - Cargar zonas. 

## **Modificar zonas seguras o peligrosas** 

Figura 4.16: Casos de Uso - Guardar zonas. 

## **CU: Generar ruta segura** 

Figura 4.17: Casos de Uso - Activar viaje seguro. 

## **CU: Compartir ruta con contactos** 

Capítulo 4 

Página 63 

Figura 4.18: Casos de Uso - Compartir ruta. 

## **CU: Recibir notificaciones geolocalizadas** 

Figura 4.19: Casos de Uso - Activar GPS. 

## **CU: Editar perfil** 

Capítulo 4 

Página 64 

Figura 4.20: Casos de Uso - Modificar datos. 

## **CU: Cerrar sesión** 

Figura 4.21: Casos de Uso - Cerrar sesión. 

## **4.2. Diagrama de clases conceptual** 

En esta sección se presenta el diagrama de clases conceptual de la aplicación móvil, elaborado como parte del análisis previo al diseño e implementación del sistema. Su objetivo es ofrecer una visión general que ayude a comprender la estructura lógica del sistema desde una perspectiva orientada a objetos. 

La aplicación permite a los usuarios registrarse e iniciar sesión para acceder a funcionalidades como la consulta de mapas con zonas seguras y peligrosas, generación de reportes, participación en una comunidad que comparte alertas y detalles, así como el uso de un sistema de viaje seguro con notificación de ruta. Cada usuario puede realizar 

Capítulo 4 

Página 65 

múltiples acciones como llamar a emergencias, compartir ubicación, modificar datos y configurar opciones como notificaciones, GPS y el uso de un botón violeta para emergencias. La aplicación integra módulos clave como “Iniciar sesión”, “Inicio”, “Reportes”, “Mapa”, “Comunidad”, “Viaje Seguro” y “Configuración”, todos interconectados para ofrecer una experiencia integral de seguridad y colaboración ciudadana. 

Capítulo 4 

Página 66 

Figura 4.22: Diagrama de clases conceptual. 

Capítulo 4 

Página 67 

## **4.3. Diagramas de secuencia general del sistema** 

Los diagramas de secuencia general del sistema son una herramienta esencial para representar de forma visual y ordenada cómo se desarrollan las interacciones entre los diferentes elementos del sistema a lo largo del tiempo. Estos diagramas se basan en los casos de uso previamente definidos y permiten detallar el flujo de mensajes entre los actores (el usuario) y los objetos del sistema (como la interfaz o la base de datos). Cada diagrama muestra cómo se desencadenan las acciones, qué componentes intervienen y en qué orden ocurren los eventos, lo que facilita la comprensión del comportamiento interno de la aplicación. Los principales elementos que lo conforman son: las líneas de vida, que representan a los participantes y el paso del tiempo; los focos de control, que indican cuándo un objeto realiza una acción; y los mensajes, que señalan la comunicación entre componentes. Esta representación no solo ayuda a organizar el desarrollo del sistema, sino que también permite detectar posibles errores, optimizar procesos y definir con claridad las responsabilidades de cada parte del software. 

A continuación, se muestran los diagramas de secuencia del sistema de los casos de uso más significativos. 

## **Diagrama de secuencia del sistema del caso de uso “ Iniciar sesión ”** 

Este diagrama de secuencia general del sistema muestra de manera resumida cómo interactúa un usuario con los distintos módulos principales. En el diagrama, el usuario realiza una serie de acciones que desencadenan distintos flujos de interacción con el sistema. Cada uno de estos flujos está representado por fragmentos de diagrama referenciados ( _ref_ ) que hacen alusión a casos de uso específicos: Inicio, Reportes, Viaje seguro, Comunidad, Mapas y Configuración. Estas referencias indican que cada uno de estos módulos tiene su propio diagrama de secuencia, que se encuentra definido por separado. El propósito de este diagrama general es proporcionar una visión global del sistema y mostrar cómo el usuario puede navegar entre las diferentes funcionalidades de la aplicación, resaltando la estructura modular del diseño. 

Capítulo 4 

Página 68 

Figura 4.23: Diagrama de secuencia del sistema del caso de uso “Iniciar Sesión”. 

Figura 4.24: Diagrama de secuencia del sistema del caso de uso “Iniciar Sesión”. 

Capítulo 4 

Página 69 

## **Diagrama de secuencia del sistema del caso de uso “Llamar a emergencias”** 

Este diagrama de secuencia representa el flujo de interacción entre el usuario y el sistema al activar el botón de emergencia. El proceso inicia cuando el usuario pulsa el botón de emergencia (PulsarBoton). A continuación, el sistema verifica si se tienen los permisos necesarios para realizar llamadas; en caso contrario, despliega una pantalla solicitando los permisos correspondientes (AbrirPantallaPermisos). Si el usuario acepta, el sistema registra la concesión de dicho permiso (ConcederPermiso). Una vez cumplido este paso, el sistema procede a realizar la llamada de emergencia (LlamarEmergencias). Este diagrama utiliza una estructura alternativa ( _alt_ ) para indicar que el comportamiento puede variar en función de si los permisos han sido concedidos previamente. 

Figura 4.25: Diagrama de secuencia del sistema del caso de uso “Llamar a emergencias”. 

Capítulo 4 

Página 70 

**Diagramas de secuencia del sistema del caso de uso con la acción de acceder a la pantalla seleccionada.** 

Estos diagramas representan la interacción entre los botones del menu desplegable, los cuales permiten acceder al usuario a las diferentes pantallas. 

Figura 4.26: Diagrama de secuencia del sistema del caso de uso “Acceder a la pantalla Iniciar sesión”. 

Figura 4.27: Diagrama de secuencia del sistema del caso de uso “Acceder a la pantalla Reportes”. 

Capítulo 4 

Página 71 

Figura 4.28: Diagrama de secuencia del sistema del caso de uso “Acceder a la pantalla Mapa”. 

Figura 4.29: Diagrama de secuencia del sistema del caso de uso “Acceder a la pantalla Comunidad”. 

Figura 4.30: Diagrama de secuencia del sistema del caso de uso “Acceder a la pantalla Viaje seguro”. 

Capítulo 4 

Página 72 

Figura 4.31: Diagrama de secuencia del sistema del caso de uso “Acceder a la pantalla Configuración”. 

Capítulo 4 

Página 73 

## **4.4. Trazabilidad entre requisitos funcionales y casos de uso** 

La siguiente tabla establece la relación de trazabilidad entre los requisitos funcionales definidos en el apartado de requisitos (sección 3.1.1) y los casos de uso analizados (sección 4.1). Este vínculo permite verificar que cada funcionalidad prevista tiene su correspondiente representación en el análisis de comportamiento del sistema. 

Cuadro 4.1: Matriz de trazabilidad entre requisitos funcionales y casos de uso 

|**Requisito**<br>**funcional**|**Descripción**|**Casos de Uso Relacionados**|
|---|---|---|
|RF1|Estilo visual cohesivo|CU: Iniciar sesión|
|RF2|Registro e inicio de sesión con credenciales<br>seguras|CU: Iniciar sesión|
|RF3|Alerta de emergencia|CU: Contacto con emergencias|
|RF4|Botón violeta para violencia de género|CU: Contacto con emergencias|
|RF5|Reportar incidentes con geolocalización|CU: Reportar incidente, CU:<br>Recibir notifcaciones geoloca-<br>lizadas|
|RF6|Almacenamiento y clasifcación de repor-<br>tes|CU: Reportar incidente|
|RF7|Consulta de reportes propios y comunita-<br>rios|CU: Consultar Comunidad|
|RF8|Filtro por tipo de incidente|CU: Consultar Comunidad|
|RF9|Envío anónimo de reportes|CU: Reportar incidente|
|RF10|Canalización de alertas a servicios de<br>emergencia|CU: Contacto con emergencias|
|RF11|Cargar zonas de riesgo en el mapa|CU: Consultar zonas|
|RF12|Notifcaciones al acercarse a zonas peligro-<br>sas|CU: Recibir notifcaciones geo-<br>localizadas|
|RF13|Gestión de zonas seguras/peligrosas|CU: Modifcar zonas seguras o<br>peligrosas|
|RF14|Generación de rutas seguras|CU: Generar ruta segura|
|RF15|Compartir ruta con contactos de confanza|CU: Compartir ruta con con-<br>tactos|
|RF16|Modifcación de datos personales y foto de<br>perfl|CU: Editar perfl|
|RF17|Guardado de preferencias del usuario|CU: Recibir notifcaciones geo-<br>localizadas, CU: Cerrar sesión|



Como se observa en la matriz de trazabilidad, todos los requisitos funcionales tienen al menos un caso de uso asociado, lo que garantiza que las funcionalidades esperadas por el sistema han sido correctamente contempladas durante el análisis. Asimismo, los requisitos no funcionales están respaldados por decisiones técnicas documentadas en la especificación e implementación del sistema. 

Capítulo 4 

Página 74 

## **Capítulo 5** 

## **Diseño** 

Tras el análisis de los requisitos del proyecto y la posterior elaboración de los respectivos casos de uso, se ha diseñado la estructura que deberá seguir la aplicación durante el desarrollo. 

En este apartado, se presentan los diagramas de secuencia que describen el flujo de operaciones clave. Además, se explican las decisiones visuales tomadas para cada pantalla de la aplicación, priorizando la claridad, la accesibilidad y la coherencia estética. 

## **5.1. Diagramas de secuencia de operaciones del sistema** 

## **Diagrama de secuencia de la operación “Iniciar Sesión”** 

El diagrama de secuencia mostrado representa la operación “Iniciar Sesión”. En este flujo, el usuario interactúa con un formulario para introducir sus credenciales, las cuales son validadas por el sistema. Si los datos ingresados son correctos, el usuario puede confirmar su inicio de sesión. Alternativamente, si el usuario no dispone de una cuenta, tiene la opción de acceder al proceso de registro pulsando el botón correspondiente, lo que redirige al formulario de creación de cuenta. 

Capítulo 5 

Página 76 

Figura 5.1: Diagrama de secuencia de la operación “Iniciar Sesión”. 

Capítulo 5 

Página 77 

## **Diagrama de secuencia de la operación “seleccionarPantallaReportes”** 

Este flujo ilustra la lógica interactiva de una funcionalidad clave de la aplicación, centrada en la participación ciudadana y la gestión de reportes dentro de una comunidad. El diagrama de secuencia presentado describe la operación de selección de la pantalla de reportes. En este proceso, el usuario accede a dicha pantalla e introduce los datos correspondientes al reporte que desea registrar. Opcionalmente, puede incluir información sobre una persona involucrada, lo cual se refleja mediante un bloque condicional ( _opt_ ) que indica que esta acción es opcional. Posteriormente, el formulario valida los datos ingresados y, si son correctos, el usuario puede confirmar el envío del reporte. Finalmente, el sistema redirige al usuario hacia la pantalla de comunidad. 

Figura 5.2: Diagrama de secuencia de la operación “seleccionarPantallaMapa”. 

## **Diagrama de secuencia de la operación “seleccionarPantallaMapa”** 

Este diagrama de secuencia representa el comportamiento del sistema cuando el usuario accede a la pantalla de mapa mediante la operación seleccionarPantallaMapa. Una vez iniciada esta acción, el sistema permite al usuario interactuar tanto con zonas seguras como peligrosas. En primer lugar, puede seleccionar una zona segura, con la opción de borrarla o cargarla desde registros anteriores. De forma alternativa, también puede seleccionar una zona peligrosa y, de igual modo, realizar operaciones como cargarla, guardarla, borrarla o incluso ampliarla. Tras completar la edición de zonas, el usuario puede guardar 

Capítulo 5 

Página 78 

los cambios realizados y, de forma opcional, centrar el mapa en su ubicación actual. Finalmente, el sistema envía los datos actualizados a la base de datos. El diagrama incluye fragmentos _alt_ y _opt_ para representar condiciones alternativas y acciones opcionales respectivamente, reflejando así la flexibilidad del módulo de mapa en la gestión dinámica de información geográfica. 

Figura 5.3: Diagrama de secuencia de la operación “seleccionarPantallaMapa”. 

Capítulo 5 

Página 79 

Figura 5.4: Diagrama de secuencia de la operación “seleccionarPantallaMapa”. 

Capítulo 5 

Página 80 

## **5.2. Diseño visual** 

## **5.2.1. Principios de diseño** 

El diseño visual de la aplicación influye directamente en su usabilidad y accesibilidad. Esta sección describe cómo se ha aplicado un enfoque coherente y centrado en el usuario, abordando aspectos clave como colores, tipografía, distribución de elementos y accesibilidad, para ofrecer una interfaz clara y funcional. 

## **Consistencia visual** 

Se ha mantenido una coherencia visual en todos los apartados, utilizando los mismos estilos para botones, márgenes, colores y tipografías, lo que favorece una curva de aprendizaje mínima por parte del usuario. Asimismo, los formularios y pantallas de reporte utilizan componentes estándar como EditText, Switch, RecyclerView o MapView, integrados con un diseño limpio y libre de distracciones. 

## **Paleta de colores** 

Se ha optado por una paleta de colores equilibrada, en la que predominan los tonos neutros para el fondo, combinados con colores vivos para elementos interactivos. Esta selección favorece la legibilidad en entornos con poca luz y permite resaltar de forma inmediata la información crítica. Asimismo, se ha incorporado un tono violeta específico para las alertas relacionadas con violencia de género, reforzando el enfoque con perspectiva de género que caracteriza a la aplicación. 

## **Tipografía** 

La fuente utilizada sans-serif, es sencilla y de tamaño medio, lo que facilita la lectura rápida y evita la fatiga visual. Es legible con distintos pesos para diferenciar títulos, subtítulos y textos secundarios, facilitando la comprensión rápida. Se ha priorizado el uso de negrita en títulos y botones importantes para guiar la atención del usuario. 

## **Distribución de las pantallas** 

La disposición de los elementos sigue una estructura jerárquica y lógica: los botones de emergencia se sitúan en zonas centrales o de acceso rápido (parte inferior o central de la pantalla), mientras que las opciones secundarias (ajustes, comunidad, historial) se encuentran en menús desplegables. Este diseño minimiza el número de pasos para acceder a funciones relevantes. 

## **Accesibilidad y adaptabilidad** 

El diseño está optimizado para pantallas de diferentes tamaños y resoluciones, y respetando principios de accesibilidad como contraste de colores y etiquetas descriptivas para lectores de pantalla. Esto permite que la app pueda ser utilizada por personas mayores, con discapacidad visual o en condiciones ambientales desfavorables. 

## **5.2.2. Mockups** 

Se presentan las principales vistas de la aplicación, con el objetivo de mostrar cómo se ha plasmado gráficamente la experiencia de usuario planteada durante las fases de diseño. 

Capítulo 5 

Página 81 

Figura 5.5: UrbanGuardian 

Figura 5.6: UrbanGuardian 

Figura 5.7: UrbanGuardian 

Capítulo 5 

Página 82 

Figura 5.8: UrbanGuardian 

Figura 5.9: UrbanGuardian 

Capítulo 5 

Página 83 

Figura 5.10: UrbanGuardian 

Figura 5.12: UrbanGuardian 

Figura 5.11: UrbanGuardian 

Figura 5.13: UrbanGuardian 

Capítulo 5 

Página 84 

## **Capítulo 6** 

## **Implementación** 

El presente capítulo describe el proceso de desarrollo de la aplicación móvil, centrándose en la construcción de sus componentes fundamentales y la materialización del diseño previamente definido. Se han detallado las decisiones técnicas y las herramientas utilizadas para implementar las interfaces, la estructura interna del código y la integración con servicios externos. Además, se presenta la organización del proyecto mediante la implementación de XML para la interfaz gráfica y la programación orientada a objetos para la lógica funcional, así como la configuración de Firebase, asegurando la correcta comunicación y almacenamiento de datos. 

Para la construcción de las interfaces se ha utilizado XML junto con Java. Asimismo, Android Studio incorpora un editor visual que permite arrastrar componentes a la vista y que agiliza el proceso de construcción del front-end. 

Por otra parte, se ha utilizado Java en la construcción de elementos de la interfaz como el mapa, puesto que permite cargar y modificar elementos de la vista de forma dinámica. Es especialmente útil a la hora de cargar zonas seguras y peligrosas por parte del usuario, y obtener su ubicación en tiempo real. 

## **6.1. Desarrollo de la aplicación: Interfaces** 

Este apartado describe detalladamente cada una de las pantallas que conforman la aplicación, así como sus funcionalidades específicas, con el objetivo de ofrecer una visión completa de su estructura y lógica de navegación. 

A través de un enfoque centrado en la experiencia del usuario, se han implementado interfaces intuitivas, accesibles y coherentes que permiten una interacción fluida con el sistema. Las pantallas han sido diseñadas para cubrir distintos escenarios de uso, desde el registro inicial hasta el acceso a funcionalidades avanzadas como la generación de rutas seguras, la gestión de reportes o la personalización de la configuración. 

A continuación, se presenta una descripción individualizada de cada pantalla, acompañada de su correspondiente representación gráfica, explicando su funcionalidad principal, los elementos que la componen y su papel dentro del flujo general de la aplicación. 

**Interfaz Inicio - ActivityInicio** 

Capítulo 6 

Página 86 

Figura 6.1: ActivityInicio 

Figura 6.2: ActivityInicio 

Es la pantalla de inicio de la aplicación, la primera en mostrarse cuando se abra la aplicación siendo un usuario ya registrado. En la pantalla se encuentran dos botones redondos, su funcionalidad es llamar a emergencias o a un contacto predefinido. El primer botón es de color rojo y de mayor tamaño debido a que es el botón principal. El segundo botón es de color violeta y existe la opción de poder ocultarlo, ya que este botón se debe utilizar en casos concretos de violencia de género, si el usuario ya había iniciado anteriormente la aplicación, se cargará la configuración que el usuario había guardado previamente utilizando _SharedPreferences_ . En la zona inferior se encuentra el botón predeterminado para acceder a la pantalla de reportes. También podemos encontrar en la cabecera un _TextView_ con el título de la pantalla en la cual nos encontramos, de forma que el usuario pueda guiarse más fácilmente, este componente se encuentra en todas las pantallas que permiten el acceso a través del menú desplegable. Por último, cabe comentar un botón que se encuentra en casi todas las pantallas de la aplicación situado en la parte superior izquierda, se trata de un menú desplegable con diferentes opciones de acceso a distintas pantallas. 

## **Interfaz Registro - ActivityMain** 

Capítulo 6 

Página 87 

Figura 6.3: ActivityMain 

Figura 6.4: ActivityMain 

Es la pantalla que se muestra al abrir la aplicación por primera vez, en ella se muestra un formulario de registro con sus respectivos campos donde complementar la información del usuario. Una vez rellenada la información, al pulsar el botón “Registrarse”, los datos se envían a la base de datos. También existe la opción de iniciar sesión, pulsando este botón se cargará la pantalla para iniciar sesión si ya eres un usuario registrado, solo tendrás que rellenar tus credenciales para acceder desde tu perfil. 

## **Interfaz Inicio de sesion - ActivityInicioSesion** 

Capítulo 6 

Página 88 

Figura 6.5: ActivityInicioSesion 

Figura 6.6: ActivityInicioSesion 

Esta pantalla muestra un formulario para iniciar sesión, al rellenar los datos y pulsar el botón, estos se verifican mediante una petición a una base de datos que compara lo enviado con lo recopilado anteriormente. Si los datos son correctos se cargará la anterior descrita página de inicio, si los datos son erróneos se mostrará un mensaje de error y se mantendrá al usuario en la página. 

## **Interfaz Menu - MenuPopUp** 

Capítulo 6 

Página 89 

Figura 6.7: MenuPopUp 

Figura 6.8: MenuPopUp 

Este menú desplegable se encuentra en la mayoria de pantallas de la aplicación una vez se inicia sesión, esta pantalla da un acceso rápido e intuitivo a todas las pantallas de la aplicación. Desplegando varios botones para acceder a cada una de las mismas. Esta pantalla está creada a partir de solamente un _Layout_ , es decir, no tiene un archivo Java asociado, ya que es un elemento que complementa al resto de pantallas. 

## **Interfaz Reportes - ActivityReportes** 

Capítulo 6 

Página 90 

Figura 6.9: ActivityReportes 

Figura 6.10: ActivityReportes 

Esta pantalla permite al usuario reportar cualquier incidencia, para ello el usuario cuenta con un formulario a rellenar. Primeramente, encontramos un _EditText_ donde introducir el título del reporte; seguidamente, dos _Spinners_ nos dejan seleccionar el tipo de emergencia y su prioridad. Cabe destacar que dependiendo del tipo de emergencia (protección civil y Seguridad), se incluye una nueva zona peligrosa en el mapa de todos los usuarios durante un determinado tiempo. Para que el usuario describa a los involucrados en el incidente, hemos creado una pantalla con un formulario que explicaremos en la siguiente pantalla. Para acceder encontramos un _ImageButton_ , al enviar el formulario del involucrado se mostrará en el _RecycledView_ . Asimismo, el _RecycledView_ está formado por _ItemInvolucrado_ , que muestra el tipo de involucrado y un botón que permite visualizar los detalles completos en un _AlertDialog_ . En la parte inferior, encontramos dos _Switches_ , el primero para mandar el reporte de forma anónima y el segundo para compartir la ubicación. 

## **Interfaz Involucrado - ActivityInvolucrados** 

Capítulo 6 

Página 91 

Figura 6.11: ActivityInvolucrados 

Figura 6.12: ActivityInvolucrados 

La interfaz destinada a añadir involucrados permite al usuario registrar información detallada sobre las personas implicadas en un incidente que se va a reportar. Esta pantalla está compuesta por un formulario que recoge diversas características físicas y de identidad a través de menús desplegables, en este caso _Spinners_ , facilitando la descripción estructurada de cada individuo. Entre los atributos disponibles se incluyen el tipo de involucrado, género, color y tipo de cabello, complexión, color de piel y una descripción de la vestimenta. Esta vestimenta se puede elegir mediante un _Button_ y contiene opciones como gorra, pantalón, etc. Por último, un _TextView_ para poder añadir datos extra que el usuario crea necesarios sobre el altercado. Una vez completada la información, el usuario puede pulsar el botón “Añadir involucrado” para almacenar los datos introducidos. Esta acción agrega el registro a la lista de involucrados vinculados al incidente actual. Además, se ha habilitado un botón adicional que permite regresar directamente a la pantalla de reportes, manteniendo así la coherencia en el flujo de navegación. 

## **Interfaz Mapa - ActivityMapa** 

Capítulo 6 

Página 92 

Figura 6.13: ActivityMapa 

Figura 6.14: ActivityMapa 

Esta pantalla muestra un mapa y ofrece diferentes opciones para insertar información que pueda ser de ayuda para el usuario. Los botones estan situados en la parte inferior y clasificados a partir del tipo de zona, en la zona segura se puede crear, eliminar o cargar las zonas seguras; las zonas peligrosas también incluyen la funcionalidad de ampliar el radio de la superficie a través de dos botones. Para que las nuevas zonas seleccionadas se guarden en la base de datos se debe pulsar al botón que lo indica. El usuario también tiene la posibilidad de acceder a su ubicación en tiempo real y si pulsa un marcador de zona segura se muestra la posibilidad de acceder a esa ubicación con Google Maps. 

## **Interfaz Comunidad - ActivityComunidad** 

Capítulo 6 

Página 93 

Figura 6.15: ActivityComunidad 

Figura 6.16: ActivityComunidad 

En esta pantalla se muestra un listado de los reportes realizados por los usuarios. Si el usuario no hace el reporte anónimo y tiene una foto de perfil esta se mostrará al lado del nombre. Los reportes se encuentran dentro de un _RecycledView_ formado por _ItemReporte_ formado por cuatro _TextView_ y un _LinearLayout_ que incluye el componente _ItemInvolucrado_ las veces que sean necesarias. El usuario puede filtrar por tipo de reporte, en la pantalla se muestra el total de cada tipo. 

## **Interfaz Viaje Seguro - ActivityViaje** 

Capítulo 6 

Página 94 

Figura 6.17: ActivityViaje 

Figura 6.18: ActivityViaje 

A través de esta pantalla el usuario tiene la posibilidad de crear una ruta segura a partir de la información sobre las zonas seguras y peligrosas almacenadas en la base de datos. El usuario introduce la dirección origen y destino y se calcula la ruta óptima. Asimismo, el usuario puede compartir esta ruta con sus contactos de confianza, los cuales se pueden seleccionar en la parte superior de la pantalla. Si el usuario activa la opción de notificación de salida de la ruta, será notificado si esto sucede. 

## **Interfaz Configuración - ActivityConfiguration** 

Capítulo 6 

Página 95 

Figura 6.19: ActivityConfiguration 

Figura 6.20: ActivityConfiguration 

Esta pantalla se centra en los ajustes de configuración del perfil, donde el usuario puede personalizar su cuenta añadiendo una foto de perfil o modificando sus datos. El usuario también tiene la opción de elegir entre las diferentes opciones de gestión del perfil como la activación de notificaciones, GPS o el uso del botón violeta. El usuario puede cerrar sesión desde esta pantalla. 

## **Interfaz Modificar Datos - ActivityModificarDatos** 

Capítulo 6 

Página 96 

Figura 6.21: ActivityModificarDatos 

Figura 6.22: ActivityModificarDatos 

Al seleccionar la opción “Modificar datos” dentro de la interfaz de configuración, el usuario accede a una pantalla específicamente diseñada para actualizar la información personal introducida durante el registro. Esta interfaz permite editar campos clave como nombre, apellidos, nombre de usuario, correo electrónico, número de teléfono y contraseña. Todos los datos se presentan en un formulario estructurado y limpio, implementado mediante un _LinearLayout_ que organiza verticalmente los distintos elementos del formulario. Cada campo está envuelto en un componente _TextInputLayout_ , que mejora la usabilidad del formulario al ofrecer etiquetas flotantes y validación visual, contribuyendo así a una experiencia de usuario clara y ordenada. En la parte inferior de la pantalla se encuentran dos botones. El primero, identificado como “Modificar datos”, permite validar los campos y enviar los nuevos valores a la base de datos. Este proceso asegura que los datos modificados sustituyan correctamente a los anteriores, manteniendo la consistencia del perfil de usuario. El segundo botón, “Volver”, proporciona una vía directa para regresar a la interfaz de configuración sin realizar cambios, ofreciendo flexibilidad y evitando modificaciones accidentales. 

## **6.1.1. Desarrollo de la aplicación: Implementación de XML** 

El diseño visual de la aplicación se ha estructurado mediante archivos XML, siguiendo el modelo de desarrollo de interfaces en Android. A lo largo de la app, se han empleado distintos elementos de interfaz gráfica para ofrecer una experiencia de usuario clara e intuitiva. Entre los componentes más utilizados se encuentran los _TextView_ , empleados para mostrar información estática como títulos, descripciones, etiquetas o mensajes de estado; los _EditText_ , que permiten a los usuarios introducir datos como nombres, correos electrónicos o contraseñas en formularios de registro o inicio de sesión; y los _Button_ , 

Capítulo 6 

Página 97 

que sirven para ejecutar acciones como enviar un formulario, acceder a otra pantalla o confirmar una selección. Además, se han utilizado contenedores como _LinearLayout_ o _ConstraintLayout_ para organizar estos elementos de forma jerárquica y adaptable a distintos tamaños de pantalla. También se han incorporado componentes más dinámicos como _RecyclerView_ , que permite mostrar listas de elementos como los reportes realizados por usuarios de forma eficiente y escalable. 

## **TextView** 

## **En ActivityComunidad** 

Cumplen funciones esenciales en la organización y presentación de la información. En concreto, se destacan dos componentes principales. El primero, actúa como título de la sección y muestra el texto “Comunidad” con un tamaño grande, estilo en negrita y centrado horizontalmente, además de contar con un fondo distintivo que lo resalta visualmente del resto del contenido. Este elemento tiene como objetivo proporcionar un encabezado claro y jerárquico que sitúe al usuario dentro de la interfaz. El segundo, funciona como subtítulo y presenta el texto “Historial de reportes” justo antes del contenido dinámico (la lista de reportes). También utiliza negrita y un tamaño de texto intermedio, manteniendo la coherencia visual con el título principal. 

## **En ActivityConfiguracion** 

En la interfaz de configuración del perfil del usuario, se ha utilizado un elemento _TextView_ con el identificador _userName_ , para mostrar información personal del usuario: su nombre y apellido. Se ha definido un hint que actúa como texto guía para indicar el tipo de información que se presenta. El elemento está posicionado de forma vertical bajo la imagen de perfil, centrado horizontalmente en pantalla mediante restricciones _ConstraintLayout_ . 

## **EditText** 

## **En ActivityViaje** 

Se emplean componentes _EditText_ para permitir la introducción manual de información por parte del usuario. Estos campos están diseñados para recibir las direcciones de origen y destino del viaje. Ambos tienen una anchura adaptable y una longitud mínima, lo cual asegura que el campo tenga un tamaño inicial adecuado para la escritura. A través del atributo _inputType=textPostalAddress_ , se especifica que el tipo de entrada está optimizado para direcciones, facilitando una mejor experiencia de usuario mediante sugerencias del teclado. 

## **En ActivityInvolucrados** 

En la actividad destinada a gestionar los involucrados, se incluye un campo de texto cuyo propósito es permitir al usuario introducir información adicional relacionada con el involucrado. El tipo de entrada especificado es texto simple, permitiendo así la introducción libre de caracteres alfabéticos o alfanuméricos. Su ubicación dentro de la interfaz se alinea directamente con el _TextView_ correspondiente. 

## **Button** 

**En ActivityMain** 

Capítulo 6 

Página 98 

En la pantalla de registro de la aplicación se han incorporado dos botones principales que permiten al usuario interactuar con las funciones clave de autenticación: el acceso y el registro. El primero contiene el texto “Iniciar sesión” y está diseñado para ejecutar el método iniciarSesion al ser pulsado. Por su parte, el segundo muestra el texto “Registrarse” y está vinculado a la función registrar, que permite al usuario crear una nueva cuenta. Ambos botones comparten un estilo visual consistente: tienen un ancho adaptable ( _wrap content_ ), un fondo azul oscuro definido con _backgroundTint_ , texto en mayúsculas para destacar la acción y un color de texto coherente con la paleta de la aplicación. Además, se coloca en la parte inferior de la pantalla para garantizar una experiencia intuitiva, facilitando el acceso a las dos principales acciones relacionadas con el ingreso a la plataforma. 

## **En ActivityMapa** 

En esta sección de la interfaz de la aplicación, se han implementado varios botones con distintas funcionalidades que mejoran la interacción del usuario con el mapa y la gestión de ubicaciones. El botón posicionado en la parte superior izquierda de la pantalla sirve como acceso rápido al menú de opciones, presenta un ícono personalizado y está presente en todas las actividades para desplegar el menú de selección de pantalla. El botón _buttonIrMiUbicacion_ permite al usuario centrar el mapa en su ubicación actual, lo que facilita la navegación dentro de la interfaz geográfica. Por su parte, el botón etiquetado como “Guardar cambios”, está pensado para confirmar y almacenar cualquier modificación que el usuario haya realizado en el mapa. Finalmente, el botón _buttonEliminarMarcador_ permite eliminar marcadores previamente añadidos en el mapa, facilitando la gestión dinámica de puntos de interés o zonas relevantes. Todos estos botones comparten una estética coherente basada en el color azul oscuro y están organizados dentro del _ConstraintLayout_ para mantener una disposición correcta. 

## **Switch** 

Es un elemento de la interfaz de usuario que permite representar una elección binaria, es decir, con dos posibles estados: activado o desactivado. Su uso es común en configuraciones o formularios donde se requiere que el usuario habilite una opción u otra, de forma clara y directa. 

## **En ActivityViaje** 

En este caso concreto, el _Switch_ está configurado para ofrecer la opción de “Notificar salida de la ruta”. Al estar activado, el sistema podrá generar una alerta cuando se detecte que el usuario ha salido de una ruta establecida. 

## **En ActivityReportes** 

En esta interfaz se utilizan dos componentes _Switch_ que permiten al usuario activar o desactivar funcionalidades relacionadas con la privacidad y el uso compartido de información. El primer interruptor ofrece la opción de “Enviar como anónimo”, lo cual permite al usuario enviar un reporte u otra información sin revelar su identidad. El segundo habilita o deshabilita la función de “Compartir ubicación”, permitiendo que la aplicación acceda y comparta la localización del usuario en tiempo real, para así marcar ese reporte con la ubicación aproximada. 

## **Spinner** 

**En ActivityReportes** 

Capítulo 6 

Página 99 

En la interfaz de reportes, se utiliza un componente _Spinner_ que permite al usuario seleccionar el tipo de emergencia entre varias opciones predefinidas (como médica, protección civil, etc.). Este componente está definido con restricciones de diseño que lo posicionan justo debajo de un _TextView_ , alineado horizontalmente con él. El identificador permite acceder al componente desde el código para gestionar su funcionalidad, como cargar las opciones desde un array de recursos y obtener la selección del usuario al enviar el reporte. 

## **LinearLayout** 

En la interfaz de la aplicación, el componente _LinearLayout_ se utiliza como contenedor para organizar de forma vertical los contactos seleccionados por el usuario. A diferencia de componentes individuales como _Button_ o _TextView_ , el _LinearLayout_ actúa como un organizador de vistas, permitiendo estructurar de manera ordenada y flexible el contenido que se genera en tiempo de ejecución. 

## **En ActivityViaje** 

Este contenedor, identificado como _selectedContactsContainer_ , aparece específicamente en la pantalla relacionada con la gestión del viaje. Su función es almacenar dinámicamente elementos visuales, en este caso los nombres de los contactos, que se van añadiendo conforme el usuario interactúa con la aplicación. 

## **En ItemReporte** 

En este caso el componente _LinearLayout_ se utiliza como contenedor principal del _RecyclerView_ para organizar de forma vertical los distintos elementos que componen cada ítem de reporte. Al estar orientado verticalmente, permite apilar secuencialmente una serie de elementos informativos: una línea divisoria que separa visualmente los reportes, el título del reporte ( _tituloTextView_ ), el usuario asociado ( _usuarioTextView_ ), el tipo de reporte ( _tipoReporteTextView_ ), su prioridad ( _prioridadTextView_ ) y, finalmente, un _subLinearLayout_ llamado _involucradosContainer_ , destinado a contener de forma dinámica los participantes o personas implicadas en dicho reporte. Cada uno de estos elementos se presenta de forma ordenada y jerárquica gracias a su estructura. 

## **RecyclerView** 

_RecyclerView_ es un componente diseñado para mostrar grandes cantidades de datos de manera optimizada y con alta flexibilidad. A diferencia de componentes más simples como _ListView_ , _RecyclerView_ permite una mayor personalización y rendimiento gracias a su arquitectura basada en la reutilización de vistas, donde las celdas de la lista se vuelven a utilizar y se rellenan con nuevos datos a medida que se desplazan por la pantalla. Este comportamiento reduce significativamente el consumo de memoria y mejora el rendimiento, especialmente en listas largas. Además, _RecyclerView_ se apoya en elementos complementarios como el _LayoutManager_ (que define cómo se disponen los elementos), el _Adapter_ (que gestiona los datos y crea las vistas) y los _ViewHolder_ (que encapsulan las vistas de cada ítem), ofreciendo una estructura modular y escalable para construir listas complejas, dinámicas y con múltiples tipos de elementos. 

## **En ActivityReportes** 

En esta interfaz, _recyclerViewInvolucrados_ está destinado a mostrar una lista de personas involucradas en un determinado reporte. Aunque en el XML se especifica una orien- 

Capítulo 6 

Página 100 

tación vertical, esta propiedad realmente se controla desde el código mediante _LinearLayoutManager_ , que define la dirección del desplazamiento. Este componente está integrado dentro de un _ConstraintLayout_ , lo que permite posicionarlo de forma flexible mediante restricciones con respecto a otras vistas del diseño. 

## **En ActivityComunidad** 

Se emplea para mostrar una lista de reportes dentro de la interfaz de la aplicación. Su configuración está pensada para ocupar el ancho de la pantalla, adaptándose al diseño mediante restricciones _ConstraintLayout_ , que permiten anclar el componente tanto a los bordes laterales como a elementos específicos de la vista. Además, la propiedad _tools:listitem=@layout/itemreporte_ indica que cada elemento de la lista se representa mediante el diseño definido en “itemreporte.xml”, explicado anteriormente. 

## **MapView** 

Es un elemento específico cuyo uso está limitado a un contexto concreto. Este es el caso del componente _MapView_ , el cual solo aparece en la sección dedicada al mapa. A diferencia de otros elementos reutilizables, _MapView_ representa un caso especial, ya que se emplea exclusivamente para mostrar información geográfica e interactuar con el mapa en tiempo real. Su uso está directamente ligado a funcionalidades como la localización del usuario, la colocación de marcadores o la visualización de zonas seguras, lo que lo convierte en un elemento central pero único dentro del diseño general de la interfaz. 

## **En ActivityMapa** 

En la interfaz se incorpora un componente _MapView_ de la librería `OSMDroid` , que permite mostrar mapas interactivos dentro de la aplicación. Este elemento tiene un tamaño definido, y se sitúa justo debajo del _TextView_ que tiene el texto “Mapa”, centrado horizontalmente en el diseño mediante restricciones al inicio y al final del contenedor principal. 

## **6.1.2. Desarrollo de la aplicación: Implementación de código** 

Una vez descritas las interfaces gráficas de la aplicación en el apartado anterior, este apartado se centra en detallar las funcionalidades implementadas detrás de cada pantalla. Se trata de explicar el comportamiento lógico que permite que la interacción del usuario con los distintos elementos de la interfaz genere una respuesta concreta por parte del sistema. 

Cada funcionalidad ha sido desarrollada con el propósito de ofrecer una experiencia óptima. Para ello, se han utilizado estructuras de control, almacenamiento local mediante _SharedPreferences_ , conexión con bases de datos remotas, y otras herramientas propias del entorno Android que permiten una gestión dinámica de los datos y una respuesta inmediata a las acciones del usuario. 

A lo largo de este apartado se exponen, pantalla por pantalla, las funciones clave que hacen posible el funcionamiento interno de la aplicación, abordando aspectos como la lógica de envío de reportes, la actualización del mapa en tiempo real, la generación de rutas seguras o la verificación de credenciales de usuario. 

## **Funciones compartidas** 

**showPopupWindow** 

Capítulo 6 

Página 101 

El método implementa la lógica para desplegar un menú emergente en la aplicación, permitiendo al usuario seleccionar entre varias opciones de navegación. La función despliega un _Layout_ XML que contiene las opciones del menú y lo muestra como una ventana emergente anclada a un elemento visual. Cada opción está vinculada a un _OnClickListener_ que actualiza una variable con el nombre de la opción elegida, ejecuta una función común _seleccionarMenu()_ y cierra el menú. Esta estructura permite centralizar la gestión de las opciones del menú, se ha utilizado esta función para mostrar el menú desplegable en todas las pantallas tras iniciar sesión. De esta forma, desde cualquier actividad puedes acceder a cualquier otra de forma intuitiva y eficaz. 

Figura 6.23: showPopupWindow 

## **seleccionarMenu** 

Este código define el método _seleccionarMenu()_ , que se encarga de redirigir al usuario a diferentes pantallas (actividades), dependiendo del valor de la variable _selec_ , que se establece previamente al pulsar una opción del menú emergente. Utiliza una estructura _Switch_ para comprobar el valor de _selec_ y, según el caso (“inicio”, “reportes”, “mapa”, “comunidad”, “viaje”, “config”), crea un objeto _Intent_ que especifica el contexto y la clase de destino. 

Capítulo 6 

Página 102 

Luego, llama a _startActivity(intent)_ para lanzar la nueva actividad correspondiente. 

Figura 6.24: seleccionarMenu 

## **Interfaz Inicio** 

## **Shared Preferences** 

Este fragmento de código implementa la lógica para controlar la visibilidad de un botón en función del estado previamente guardado de un _Switch_ utilizando _SharedPreferences_ , una clase de Android que permite almacenar datos sin mantener la sesión abierta. En este caso se refiere al botón violeta que se muestra al iniciar la aplicación. Al comienzo de la actividad, se accede a las preferencias compartidas y se recupera el valor booleano asociado a la clave, que indica si el interruptor estaba activado o no la última vez que se usó el perfil. En función de ese valor, el botón se muestra si el interruptor estaba activado, o se oculta si no lo estaba. Esta lógica permite que la interfaz de usuario se adapte según las preferencias del usuario, incluso después de cerrar y volver a abrir la aplicación. 

Capítulo 6 

Página 103 

Figura 6.25: Shared Preferences 

## **Llamar** 

Este código implementa la lógica para realizar una llamada telefónica, asegurándose de que el usuario haya otorgado previamente el permiso necesario. Primero, define el número al que se desea llamar que en este caso es mi número personal, para adaptarlo a la aplicación real se debería añadir aquí el número de emergencias. Luego, verifica si la aplicación tiene el permiso de realizar llamadas. Si el permiso ya fue concedido, inicia la actividad que realiza la llamada. Si no, solicita el permiso al usuario. Esta lógica cumple con las políticas de seguridad de Android, que requieren solicitar permisos para acciones como realizar llamadas. 

Figura 6.26: llamar 

## **Interfaz Registro** 

## **registrar** 

Este fragmento de código implementa la función registrar, utilizada en el proceso de registro de nuevos usuarios dentro de la aplicación. Primero, recoge y depura los valores ingresados en los campos del formulario, como el nombre, apellidos, nombre de usuario, teléfono, correo electrónico y contraseña. A continuación, valida que el correo electrónico tenga un formato correcto mediante una expresión regular. Si algún campo está vacío o el correo no es válido, se notifica al usuario mediante un _Toast_ . Si todos los datos son válidos, se llama al método _registerUser()_ que veremos a continuación. 

Capítulo 6 

Página 104 

Figura 6.27: registrar 

## **registerUser** 

Completa el proceso de registro de un nuevo usuario en la aplicación utilizando Firebase Authentication y Firestore. Primero, se llama al método _createUserWithEmailAndPassword()_ de Firebase Authentication, que crea un nuevo usuario autenticado con el correo electrónico y la contraseña proporcionados. Si la autenticación es exitosa, se obtiene el identificador único del usuario (UID) generado por Firebase y se crea un mapa con los datos personales del usuario ya mencionados en la anterior función. Este mapa se guarda en la colección _user_ de Firestore, vinculando los datos con el UID como identificador del documento. Si la operación en Firestore es exitosa, se muestra un mensaje de confirmación y se redirige al usuario a la actividad principal. En caso de error, ya sea en la autenticación o en la escritura de datos, se muestra un mensaje de error mediante un _Toast_ . Este enfoque asegura que los datos del usuario estén tanto autenticados como almacenados correctamente en la base de datos para su posterior uso en la aplicación. 

Capítulo 6 

Página 105 

Figura 6.28: registerUser 

## **Interfaz Iniciar sesion** 

## **loginUser** 

La función _loginUser()_ gestiona el proceso de inicio de sesión en la aplicación utilizando Firebase Authentication. Recibe el correo electrónico y la contraseña proporcionados por el usuario y realiza la autenticación mediante _signInWithEmailAndPassword()_ . Si las credenciales son correctas y el inicio es exitoso, finaliza la actividad actual y redirige al usuario a la pantalla principal (Inicio), mostrando un mensaje de bienvenida. En caso de error, ya sea por credenciales incorrectas o por fallos de conexión, se informa al usuario mediante mensajes breves con _Toast_ , asegurando una retroalimentación clara y directa. Esta lógica garantiza un acceso controlado y seguro al sistema, reforzando la gestión de usuarios autenticados dentro de la aplicación. 

Capítulo 6 

Página 106 

Figura 6.29: loginUser 

## **Interfaz Reportes** 

## **mandar** 

En la aplicación se implementa una función para el envío de reportes mediante la interacción del usuario con la interfaz. Al activar el botón reportar, se ejecuta el método _mandar()_ , el cual recopila información introducida por el usuario en los diferentes campos, como el título del reporte, el tipo de incidente seleccionado a través de un menú desplegable ( _Spinner_ ) y el nivel de prioridad. Además, se incluye una lista de personas involucradas, gestionada por una clase centralizada ( _InvolucradoManager_ ). En caso de que el usuario active una opción para compartir su ubicación (representada mediante un _Switch_ ), el sistema valida y extrae las coordenadas geográficas. Si el tipo de reporte está relacionado con “Protección civil” o “Seguridad”, se registra automáticamente una zona peligrosa en la base de datos de Firestore, almacenando la latitud, longitud y un radio predefinido que equivale 80 metros en el mapa. Finalmente, se llama al método _postReporteConInvolucrado()_ , el cual explicaremos a continuación, se encarga de enviar todos los datos recopilados al servidor. Tras el envío, la lista de involucrados se limpia y la interfaz gráfica se actualiza para reflejar que el reporte ha sido enviado y dar la posibilidad al usuario de realizar uno nuevo. 

Capítulo 6 

Página 107 

Figura 6.30: mandar 

Figura 6.31: mandar 

Capítulo 6 

Página 108 

## **postReporteConInvolucrado** 

La funcionalidad de guardar en Firebase los datos de reportes se gestiona a través del método _postReporteConInvolucrado()_ , el cual se encarga de compilar y almacenar toda la información asociada a un incidente reportado por el usuario. Este método recibe como parámetros el título del reporte, su tipo, el nivel de prioridad, una estructura con los involucrados y, en caso de existir, la ubicación geográfica del evento (como hemos explicado anteriormente en la función _mandar()_ ). El sistema permite al usuario mantener el anonimato mediante un _Switch_ que, al activarse, reemplaza el identificador del usuario por la cadena “anónimo”; de lo contrario, se vincula el reporte con el UID del usuario autenticado en Firebase. Además, si se han añadido personas involucradas, estas se agregan como un mapa anidado dentro del reporte. Asimismo, si se han capturado coordenadas geográficas (latitud y longitud), estas se almacenan para posteriormente añadirlas al mapa cuando se cargue. Finalmente, todos los datos son enviados y almacenados en la colección “reportes” de Firebase Firestore. Si la operación es exitosa, la interfaz se limpia automáticamente y se redirige al usuario hacia la sección “Comunidad” para así ver todos los reportes incluido el actual. 

Figura 6.32: postReporteConInvolucrado 

Capítulo 6 

Página 109 

## **Interfaz Involucrados** 

## **Opciones** 

Este fragmento de código define dos métodos que permiten al usuario seleccionar múltiples opciones de vestimenta a través de un cuadro de diálogo con casillas de verificación ( _checkboxes_ ), y posteriormente obtener una cadena con las selecciones hechas. El método _mostrarDialogoMultiopcion()_ utiliza un _AlertDialog.Builder_ para mostrar una lista de opciones junto con un vector de booleanos que indica cuáles están marcadas. Cuando el usuario interactúa con el diálogo, el estado de cada opción se actualiza dinámicamente. Al pulsar “Aceptar”, se llama al método _obtenerSeleccionVestimenta()_ , el cual recorre el array de opciones seleccionadas, construye una cadena separada por comas con las opciones elegidas y elimina la última coma sobrante. Finalmente, muestra un _Toast_ con el resumen de la selección. 

Figura 6.33: Opciones 

## **Interfaz Mapa** 

## **obtenerCoordenadas** 

Esta función permite obtener las coordenadas geográficas (latitud y longitud) a partir de una dirección ingresada por el usuario en la actividad de Viaje Seguro. Para ello, realiza una consulta a la API de OpenStreetMap en un hilo secundario, construyendo una URL con la dirección codificada. La respuesta, en formato JSON, es procesada para extraer las coordenadas del primer resultado encontrado. Finalmente, se utiliza un _callback_ para devolver un objeto _GeoPoint_ con la ubicación obtenida al hilo principal de la aplicación. Esta lógica permite convertir direcciones físicas en coordenadas, que serán utilizadas posteriormente para trazar rutas dinámicas en un mapa. 

Capítulo 6 

Página 110 

Figura 6.34: obtenerCoordenadas 

## **cargarZonas** 

La aplicación distingue visualmente entre zonas seguras y zonas peligrosas, y para ello utiliza dos funciones complementarias que permiten cargar y representar estos datos en el mapa a partir de información almacenada en Firebase Firestore. La función _cargarZonasSeguras()_ obtiene las coordenadas de puntos considerados seguros desde la colección zonasSeguras, generando marcadores individuales con etiquetas informativas para cada uno, los cuales se añaden dinámicamente al mapa y a una lista para su gestión posterior. Por su parte, _cargarZonasPeligrosas()_ accede a la colección zonasPeligrosas y, por cada registro, genera un círculo geográfico (utilizando _Polygon_ ) centrado en las coordenadas especificadas, con un radio definido por el usuario y un color rojo semitransparente que indica el área de riesgo. Ambas funciones actualizan el mapa en tiempo real y muestran mensajes informativos al usuario en caso de éxito o error. En conjunto, estas lógicas proporcionan una visualización clara y diferenciada del entorno, clave para la toma de decisiones y la generación de rutas más seguras dentro de la app. 

Capítulo 6 

Página 111 

## Figura 6.35: cargarZonaSegura 

Figura 6.36: cargarZonaPeligrosa 

Capítulo 6 

Página 112 

## **reportarZonasPeligrosasYSeguras** 

Esta función permite registrar en la base de datos las zonas peligrosas y seguras que el usuario ha marcado manualmente en el mapa. Primero verifica si existen zonas peligrosas temporales pendientes de enviar y, si las hay, recorre cada una extrayendo sus coordenadas y radio para almacenarlas en la colección zonasPeligrosas de Firebase Firestore. Tras subir cada zona, muestra mensajes al usuario indicando el éxito o posible error en el proceso. De forma similar, si hay zonas seguras marcadas, también se recorren y se guardan en la colección zonasSeguras, incluyendo solo la latitud y longitud. Al finalizar ambos procesos, las listas locales de zonas se vacían para evitar duplicados en futuras sesiones. Esta lógica garantiza que los datos generados por los propios usuarios se integren dinámicamente al sistema. 

Figura 6.37: reportarZonasPeligrosasYSeguras 

## **iniciarMonitoreoDeRuta** 

Esta funcionalidad implementa un sistema de monitoreo en tiempo real que verifica constantemente si el usuario sigue el recorrido previamente generado. Cada cinco segundos, se obtiene la ubicación actual del usuario y se compara con la ruta trazada. Si se detecta que la ubicación del usuario se ha desviado más allá de una distancia permitida con respecto a cualquiera de los puntos de la ruta, se muestra un mensaje de alerta en pantalla. Este sistema se puede iniciar manualmente activando un _Switch_ al establecer la ruta en la actividad Viaje Seguro. Para calcular la distancia en metros entre dos puntos geográficos se utiliza una función auxiliar teniendo en cuenta la latitud y longitud de las localizaciones. De este modo, se garantiza un control continuo del trayecto con el fin de ofrecer mayor seguridad y seguimiento durante el viaje. 

Capítulo 6 

Página 113 

Figura 6.38: iniciarMonitoreoDeRuta 

## **obtenerRutaConZonasEvitadas** 

Esta función tiene como objetivo generar una ruta entre dos puntos geográficos (origen y destino), obtenidos desde la actividad Viaje Seguro, evitando zonas peligrosas predefinidas por los usuarios. Para ello, se ejecuta en un hilo secundario y construye una URL de consulta para la API de GraphHopper, incluyendo las coordenadas de inicio y fin, así como un listado de zonas peligrosas codificadas (basadas en su latitud,longitud y radio de influencia). A partir de la respuesta en formato JSON, se extrae una polilínea codificada que representa la ruta óptima. Esta polilínea se decodifica en una lista de puntos geográficos ( _GeoPoint_ ) que conforman el trayecto, y se entrega al hilo principal mediante un _callback_ para que pueda ser utilizada en la interfaz de usuario. Esta lógica permite generar rutas más seguras en tiempo real, adaptadas al entorno definido por el usuario. De esta forma, se logra crear una ruta que evite zonas peligrosas reportadas previamente por los usuarios. 

Capítulo 6 

Página 114 

Figura 6.39: obtenerRutaConZonasEvitadas 

Figura 6.40: obtenerRutaConZonasEvitadas 

Capítulo 6 

Página 115 

## **alternarZonas** 

Esta función controla la alternancia entre el estado activo e inactivo para la selección de zonas dentro del mapa, facilitando la gestión visual y funcional de zonas peligrosas y seguras. Al cambiar el valor del indicador zonaPeligrosaActivada, se actualiza la interfaz: se modifica el texto del botón principal según el estado actual y se habilita o deshabilita el botón destinado a marcar zonas seguras, cambiando también su color para dar retroalimentación visual al usuario. Finalmente, se muestra un mensaje informativo indicando si el usuario puede o no colocar marcadores de zona segura. Esta lógica es esencial para evitar ambigüedades en la interacción con el mapa y garantizar una experiencia clara y guiada durante el marcado de zonas. 

Figura 6.41: alternarZonas 

## **PolylineDecoder** 

La clase _PolylineDecoder_ cumple un papel esencial en el procesamiento de las rutas generadas por la API de GraphHopper, ya que permite convertir la polilínea codificada, que es el formato estándar en servicios de enrutamiento, en una lista de puntos geográficos ( _GeoPoint_ ) que pueden ser representados en el mapa. Esta codificación utiliza una técnica de compresión que reduce significativamente el tamaño de la ruta al almacenarla como una cadena de caracteres. Se usa el método _decodePolyline()_ para recorrer esta cadena decodificando sucesivamente los pares de coordenadas (latitud y longitud) mediante desplazamientos de bits y operaciones aritméticas, aplicando luego una división por uno elevado a cinco para convertir los valores a grados decimales. El resultado es una lista de puntos GPS que define el trazado exacto de la ruta y que puede ser utilizada tanto para su visualización en el mapa como para su análisis durante el monitoreo en tiempo real del viaje. 

Capítulo 6 

Página 116 

Figura 6.42: PolylineDecoder 

## **Interfaz Comunidad** 

## **onCreate** 

Se implementa un sistema de visualización de reportes generados por los usuarios mediante un _RecyclerView_ , el cual se rellena dinámicamente desde la base de datos en Firestore. Al iniciar la actividad, se inicializa el adaptador de datos ( _ReporteAdapter_ ) y se consulta la colección “Reportes” para recuperar todos los documentos almacenados. Por cada reporte recuperado, se accede al identificador del usuario que lo generó, y mediante una segunda consulta a la colección “user”, se busca asociar ese reporte con el nombre del usuario correspondiente, lo cual permite mostrar información más personalizada en la interfaz. En caso de que no se encuentre un usuario asociado o surja un error en la consulta, se asigna el nombre “Anónimo” por defecto. 

Capítulo 6 

Página 117 

Figura 6.43: onCreate 

Figura 6.44: onCreate 

Capítulo 6 

Página 118 

## **ReporteAdapter** 

Tiene como finalidad gestionar la visualización dinámica de una lista de objetos Reporte en una interfaz de tipo _RecyclerView_ que será la utilizada en Comunidad. Cada elemento del listado muestra el título, el tipo de reporte, su prioridad, y el nombre del usuario que lo ha generado. Además, si el reporte contiene información sobre personas involucradas, esta se presenta mediante una estructura adicional dentro del ítem, donde se detalla el rol de cada individuo y se ofrece un botón para visualizar más información a través de un _AlertDialog_ . Para ello, el adaptador recorre el mapa de involucrados y genera dinámicamente vistas para cada uno, mostrando su rol y ofreciendo la posibilidad de consultar sus datos específicos. 

Figura 6.45: ReporteAdapter 

Capítulo 6 

Página 119 

Figura 6.46: ReporteAdapter 

## **InvolucradosAdapter** 

Se encarga de mostrar una lista de personas involucradas en un reporte tanto en la ventana comunidad como en la de reportes (para ver cuando añades un involucrado). Cada elemento de la lista contiene un _TextView_ para visualizar el rol del involucrado y un botón que permite acceder a un cuadro de diálogo con información detallada sobre la persona, construida a partir del contenido del mapa que representa sus atributos. 

Capítulo 6 

Página 120 

Figura 6.47: InvolucradosAdapter 

## **Interfaz Viaje seguro** 

## **obtenerRutaConZonasEvitadas** 

Dentro del proceso de cálculo de ruta en la actividad Viaje Seguro, se implementa una lógica adicional que permite determinar si la ruta generada evitando zonas peligrosas ha sido modificada en comparación con una ruta directa sin restricciones. Para ello, se obtienen las distancias de ambas rutas desde la respuesta de la API de GraphHopper y se comparan. Si la diferencia entre ambas supera un umbral de tolerancia (en este caso, 5 metros), se considera que la ruta ha sido alterada para esquivar zonas peligrosas. Esto se usa para decidir si se debe activar el monitoreo en tiempo real del recorrido. En caso afirmativo, se envía esa información como parámetro a la actividad Mapa, donde se realiza el seguimiento mediante la ubicación actual del dispositivo. 

Capítulo 6 

Página 121 

Figura 6.48: obtenerRutaConZonasEvitadas 

Figura 6.49: obtenerRutaConZonasEvitadas 

Capítulo 6 

Página 122 

## **ActivaViaje** 

Este método se activa cuando el usuario pulsa el botón para iniciar el trayecto seguro. Su objetivo es lanzar la actividad encargada de mostrar el mapa y calcular la ruta. Para ello, recoge las direcciones de origen y destino ingresadas por el usuario, y las pasa a la siguiente actividad mediante un _Intent_ . Además, si el usuario ha activado la opción de notificación ( _notificarSwitch_ ), se incluye un indicador adicional en el _Intent_ para que la actividad Mapa sepa que debe monitorear la ruta y alertar al usuario en caso de desviación. 

Figura 6.50: ActivaViaje 

## **compartirPorWhatsapp** 

En la aplicación, también se ha implementado una funcionalidad que permite compartir la ruta generada por _WhatsApp_ . Este proceso comienza obteniendo las coordenadas geográficas de las direcciones de origen y destino introducidas por el usuario con la función _obtenerCoordenadas()_ . Posteriormente, se genera una ruta segura utilizando el método que evita zonas peligrosas previamente reportadas ( _obtenerRutaConZonasEvitadas()_ ). Una vez calculada, se extraen únicamente el primer y último punto del recorrido para construir un enlace directo a OpenStreetMap que represente visualmente el trayecto. A este enlace se le añade un mensaje personalizado que informa al receptor si la ruta pasa o no por zonas peligrosas, gracias a la evaluación previa que compara la ruta directa con la ruta modificada. Este mensaje puede compartirse de forma automatizada con los contactos seleccionados del usuario a través de _WhatsApp_ . De este modo, la aplicación no solo vela por la seguridad del usuario, sino que también facilita la comunicación con terceros, para colaborar en situaciones de riesgo. 

Capítulo 6 

Página 123 

Figura 6.51: compartirPorWhatsapp 

## **enviarMensajeWhatsapp** 

Una vez generado el mensaje de advertencia con la información de la ruta, la aplicación procede a enviarlo automáticamente a los contactos seleccionados. Para ello, el método _enviarMensajeWhatsapp()_ itera sobre la lista de contactos proporcionada por el usuario, extrayendo el número de teléfono de cada uno y asegurándose de que esté en formato internacional (agregando el prefijo nacional si es necesario). Posteriormente, se construye un enlace personalizado utilizando la API de _WhatsApp_ con el número de destino y el mensaje previamente generado, que incluye tanto las direcciones como un enlace a OpenStreetMap y la advertencia sobre zonas peligrosas si aplica. El mensaje se abre mediante un _Intent_ , permitiendo al usuario validar su envío desde _WhatsApp_ ; debemos pulsar el botón de enviar antes de que se abra la selección del siguiente contacto. Este proceso se repite hasta que todos los contactos seleccionados han recibido el mensaje. 

Capítulo 6 

Página 124 

Figura 6.52: enviarMensajeWhatsapp 

## **Interfaz Configuración** 

## **cargarDatosUsuario** 

Permite recuperar y mostrar los datos del usuario autenticado utilizando Firebase Authentication y Firestore Database. Esta función obtiene el identificador único del usuario y realiza una consulta en la base de datos para extraer información como el nombre y la imagen de la fotografía de perfil del Storage. Los datos recuperados se presentan dinámicamente en la interfaz, proporcionando una experiencia más personalizada. En caso de contar con una fotografía, esta se carga eficientemente mediante Firebase, incluyendo imágenes predeterminadas como alternativa si no se dispone de una imagen válida. Además, la función contempla el manejo de errores y escenarios en los que los datos no estén disponibles. 

Capítulo 6 

Página 125 

Figura 6.53: cargarDatosUsuario 

## **notificaciones** 

La aplicación permite al usuario gestionar dinámicamente la recepción de notificaciones a través de las funciones _activarNotificaciones()_ y _desactivarNotificaciones()_ . Estas funciones controlan el ciclo de vida de un servicio en segundo plano ( _NotificationService_ ) que se encarga de emitir alertas periódicas, como explicaremos a continuación. Posteriormente se deberían hacer que fueran alertas relacionadas con el estado del viaje o eventos relevantes durante el monitoreo. Al activarse, se lanza el servicio mediante _startService()_ , iniciando la lógica asociada a las notificaciones. Por el contrario, al desactivarse, se detiene explícitamente con _stopService()_ , lo que garantiza que el usuario no reciba notificaciones no deseadas y contribuye a un mejor manejo de los recursos del sistema. 

Figura 6.54: notificaciones 

**NotificationService** 

Capítulo 6 

Página 126 

La aplicación integra un servicio en segundo plano denominado _NotificationService_ , diseñado para emitir notificaciones periódicas mientras está activo. Este servicio es controlado por las funciones _activarNotificaciones()_ y _desactivarNotificaciones()_ , como se ha explicado anteriormente. Al activarse, _NotificationService_ crea un canal de notificaciones y comienza a enviar alertas cada 10 segundos utilizando un _Handler_ y un _Runnable_ , lo que posteriormente permitirá mantener informado al usuario sobre el estado de la aplicación o su viaje, incluso con la app en segundo plano. Actualmente, las notificaciones incluyen títulos y mensajes configurables y se muestran a través del _NotificationManager_ . 

Figura 6.55: NotificationService 

Capítulo 6 

Página 127 

Figura 6.56: NotificationService 

## **Interfaz Modificar Datos** 

## **cargarDatosUsuario** 

Tiene como objetivo recuperar y mostrar los datos del usuario autenticado desde Firebase Firestore. Primero, se obtiene el ID del usuario mediante Firebase Authentication, lo que permite identificar de manera única al usuario en la base de datos, como se suele hacer en las actividades donde necesitamos saber el usuario de la sesión. Luego, se realiza una consulta a Firestore para recuperar los datos asociados a ese ID, tales como nombre, apellidos, nombre de usuario, correo electrónico y número de teléfono. Estos datos se extraen del documento correspondiente y se asignan a los campos de la interfaz de usuario. Si la consulta es exitosa, los datos se muestran en los elementos correspondientes; si no, se muestra un mensaje de error mediante un _Toast_ . Este proceso asegura que la información mostrada corresponda al usuario autenticado y se pueda actualizar siempre que el usuario lo necesite. 

Capítulo 6 

Página 128 

Figura 6.57: cargarDatosUsuario 

## **modificarDatos** 

La función se encarga de permitir al usuario modificar su información personal en la base de datos. En primer lugar, obtiene los valores ingresados en los campos de la interfaz de usuario (como nombre, apellido, usuario, correo electrónico, teléfono y contraseña). Estos valores se extraen y se verifican para asegurarse de que ninguno de los campos esté vacío, mostrando un mensaje de advertencia si es necesario. Con estos datos, se crea una clase mapa con las claves y valores correspondientes a los campos de usuario que se desean actualizar. Luego, mediante el método _update()_ de Firestore, se realiza la actualización de la información en la base de datos. Si la operación es exitosa, se muestra un mensaje confirmando que los datos fueron actualizados correctamente; si ocurre un error, se muestra un mensaje con la causa del fallo. Esto permite que el usuario mantenga su perfil actualizado dentro de la aplicación. 

Capítulo 6 

Página 129 

Figura 6.58: modificarDatos 

## **6.1.3. Desarrollo de la aplicación: Firebase** 

Se ha utilizado Firebase como base de datos debido a las múltiples ventajas que ofrece en el desarrollo ágil y eficiente de aplicaciones. En concreto, se ha empleado Firebase Authentication para gestionar el registro y la autenticación de usuarios, y Firebase Firestore Database como sistema de base de datos en la nube para almacenar y sincronizar datos de manera escalable y en tiempo real. Además, Firebase ofrece una integración directa con Android, reduce significativamente el tiempo de implementación de funcionalidades de backend, y permite escalar sin necesidad de administrar servidores propios. Inicialmente, también se contempló el uso de Firebase Storage para almacenar recursos multimedia, como fotografías de perfil o imágenes adjuntas a los reportes. Sin embargo, esta funcionalidad no se implementó hasta la versión final del proyecto, ya que es necesario un coste económico. Aun así, Firebase ha resultado ser una solución eficaz y completa para cubrir las necesidades fundamentales de la aplicación. Para vincular correctamente la aplicación con esta base de datos y habilitar todos sus servicios, fue necesario descargar e incluir el archivo google-services.json en el proyecto Android. Este archivo contiene la configuración del proyecto de Firebase, incluyendo identificadores y claves de API, y es esencial para que los servicios funcionen correctamente dentro del entorno de desarrollo. 

## **Authentication** 

Para la autenticación de usuarios en la aplicación se ha utilizado Firebase Authentication, una herramienta que permite integrar distintos métodos de inicio de sesión de forma segura y eficiente. En concreto, se implementaron dos métodos: autenticación mediante correo electrónico y contraseña, y autenticación con cuenta de Google (Gmail). La autenticación por correo fue más sencilla de implementar, ya que Firebase proporciona 

Capítulo 6 

Página 130 

directamente las funciones necesarias para el registro y el inicio de sesión. Sin embargo, la autenticación con Gmail requirió una configuración adicional más compleja. Fue necesario generar e integrar una clave SHA-1 del certificado de depuración en la consola de Firebase, para poder validar la identidad del usuario mediante OAuth. Esto implicó más tiempo de desarrollo y configuración, pero permitió ofrecer una opción de inicio de sesión más cómoda y rápida para los usuarios que ya disponen de cuenta Google. 

Figura 6.59: Authtentication 

## **Dependencias** 

Para desarrollar las diferentes funcionalidades de la aplicación debemos añadir diferentes dependencias para el correcto uso de los distintos servicios. 

- Dependencia de bibliotecas de mapas basada en OpenStreetMap, para obtener el mapa y sus rutas. 

- Glide para cargar y mostrar imágenes de perfil en configuración, es la alternativa a storage de Firebase. 

- Dependencia de manejo de objetos JSON en java, para poder manipular los datos de la ruta devueltos por la API. 

- Dependencia para el manejo de la ubicación actual del dispositivo, implementando además la posibilidad de detectar desvios en la ruta. 

- Dependencia de Firebase y Google para autentificación de inicio de sesión. 

- Dependencia de Firebase para el análisis de las estadísticas de la aplicación. 

- Dependencia de Firebase para almacenar archivos en la nube, mejora esta funcionalidad si se llevara a cabo la aplicación en un futuro. 

Capítulo 6 

Página 131 

Figura 6.60: Dependencias 

## **Colecciones Firestore Database** 

Como se ha mencionado anteriormente, en _UrbanGuardian_ se ha utilizado Firebase Firestore Database como sistema de almacenamiento para gestionar toda la información generada por la aplicación. Esta base de datos permite estructurar los datos en colecciones y documentos, lo que facilita una mejor organización. Desde la aplicación móvil, se envían directamente los datos recopilados por los usuarios, como información de registro, reportes, ubicaciones u otros elementos, que son almacenados automáticamente en Firestore. Esta comunicación entre la app y la base de datos se realiza a través del SDK de Firebase para Android, que permite insertar, actualizar y consultar datos de manera eficiente y en tiempo real. 

## **involucrados** 

Dentro de la estructura utilizada, una de las colecciones clave es involucrados. Esta colección almacena información sobre personas implicadas en los distintos reportes generados por los usuarios. Cada documento dentro de involucrados representa un elemento individual relacionado con un suceso reportado, y contiene campos como el color de cabello, color de piel, vestimenta, etc. o una posible relación con el incidente. Estos datos se envían desde la aplicación móvil al realizar un nuevo reporte, permitiendo vincular varios involucrados a un mismo evento. Esta estructura permite consultar o actualizar de manera independiente los elementos relacionados con cada caso. 

Capítulo 6 

Página 132 

Figura 6.61: involucrados 

## **reportes** 

La colección de reportes constituye el núcleo del sistema de almacenamiento de información en _UrbanGuardian_ , ya que en ella se registran todos los incidentes comunicados por los usuarios a través de la aplicación y el objetivo de la aplicación es que la gente sepa de los posibles peligros que hay en su entorno para así poder evitarlos. Cada documento en esta colección representa un reporte único e incluye campos esenciales como la fecha, hora, ubicación, tipo de incidente, descripción y el usuario que lo generó. Además, los reportes pueden estar vinculados a otros elementos, como personas involucradas o zonas peligrosas, mediante referencias o identificadores, ya que a veces hay más de un involucrado o el reporte cumple los requisitos, explicados en la parte de código, para ser necesario añadir una zona peligrosa al mapa. Esta información se transmite desde la aplicación en tiempo real cuando el usuario completa y envía el formulario de reporte. 

Figura 6.62: reportes 

## **user** 

La colección user almacena la información de cada persona registrada en la aplicación Urban Guardian. Cada documento en esta colección representa un usuario único y contiene campos como nombre, apellidos, nombre de usuario, correo electrónico, teléfono, e ID de 

Capítulo 6 

Página 133 

autenticación generado por Firebase Authentication. Esta información se envía desde la aplicación durante el proceso de registro, justo después de que el usuario complete sus datos personales y se cree una cuenta mediante correo electrónico o Gmail. La colección user permite identificar al usuario que crea un reporte o que participa como involucrado, lo que facilita la trazabilidad de las acciones dentro del sistema. 

Figura 6.63: user 

## **zonaPeligrosa** 

La colección zonaPeligrosa está diseñada para almacenar información sobre ubicaciones identificadas como de alto riesgo o con antecedentes de incidentes dentro del entorno urbano. Cada documento representa una zona concreta y contiene datos como coordenadas geográficas y radio para dibujar correctamente el círculo en el mapa. Esta colección sirve como una base de datos geográfica que puede ser consultada por los usuarios para tomar precauciones al desplazarse. 

Figura 6.64: zonaPeligrosa 

## **zonaSegura** 

La colección zonaSegura cumple la función de almacenar ubicaciones consideradas como puntos de resguardo o baja peligrosidad dentro del entorno urbano. Cada documento dentro de esta colección representa una zona específica que ha sido previamente evaluada como segura, ya sea por su vigilancia, buena iluminación, presencia policial o por ser 

Capítulo 6 

Página 134 

frecuentada por ciudadanos. Los campos de cada documento, incluyen como en las zonas peligrosas, las coordenadas geográficas que permiten su localización en un mapa (no hay radio ya que se dibuja un marcador no un círculo en este caso). Esta información puede ser útil en situaciones de emergencia o en rutas recomendadas para el desplazamiento seguro de los usuarios. 

Figura 6.65: zonaSegura 

## **Reglas** 

Para proteger el acceso a los datos almacenados en Firestore, se han implementado reglas de seguridad básicas que aseguran que únicamente los usuarios autenticados puedan interactuar con la base de datos. En concreto, se ha utilizado la directiva: _allow read, write: if request.auth != null;_ , que permite tanto la lectura como la escritura sobre cualquier documento de cualquier colección, siempre y cuando el usuario haya iniciado sesión correctamente mediante Firebase Authentication. Esto implica que ningún usuario anónimo puede acceder al contenido de la base de datos, lo cual es esencial para preservar la privacidad de la información gestionada por la aplicación, como los reportes, los datos personales de los usuarios o los registros de personas involucradas. Aunque se trata de una regla general y simple, resulta efectiva para un entorno de desarrollo académico como este, donde el principal objetivo es garantizar una capa básica de seguridad sin necesidad de establecer restricciones complejas a nivel de colecciones o campos específicos. Si esta aplicación llegara a salir para su descarga al público habría que poner más reglas de acceso a cada colección. 

## **Capítulo 7** 

## **Pruebas resultados y** 

## **7.1. Pruebas funcionales** 

Con el desarrollo de una aplicación móvil orientada a la seguridad ciudadana, es fundamental garantizar que cada una de sus funcionalidades opere correctamente y cumpla con los requisitos definidos en las fases previas del proyecto. Las pruebas funcionales tienen como objetivo verificar que el sistema responde adecuadamente a las acciones del usuario, validando que todos las pantallas y flujos de interacción funcionen tal y como se espera. 

Este tipo de pruebas se centra en comprobar el comportamiento del sistema desde el punto de vista del usuario, asegurando que la aplicación permite, entre otras cosas, enviar alertas, recibir notificaciones, visualizar incidentes en un mapa, acceder a contactos de emergencia o reportar situaciones de riesgo. 

En este apartado se describen las distintas pruebas funcionales realizadas, detallando para cada funcionalidad el escenario de prueba, el requisito funcional cumplido, los pasos seguidos y los resultados obtenidos. Estas pruebas se han llevado a cabo tanto en dispositivos Android como en entornos de simulación, con el objetivo de asegurar un funcionamiento coherente y eficiente en diferentes condiciones de uso real. 

Cuadro 7.1: Prueba funcional 1: Registro de usuario 

|**Prueba funcional**|PF1: El usuario creará un perfl a través del formulario.|
|---|---|
|**Requisito cumplido**|RF2|
|**Prueba realizada**|Se rellenó el formulario y se enviaron los datos.|
|**Resultado esperado**|La información del usuario se guarda en la base de datos.|
|**Resultado obtenido**|El usuario tiene creado el perfl y puede acceder rellenando<br>con sus credenciales|



Cuadro 7.2: Prueba funcional 2: Iniciar sesión con google 

|**Prueba funcional**|PF2: El usuario accederá a su perfl a través de google.|
|---|---|
|**Requisito cumplido**|RF2|
|**Prueba realizada**|Se rellenó el formulario y se validaron los datos.|
|**Resultado esperado**|El sistema carga la pantalla de inicio con el perfl elegido.|
|**Resultado obtenido**|El usuario ha accedido a superfl a través del correo degoogle.|



Capítulo 7 

Página 136 

Cuadro 7.3: Prueba funcional 3: Navegación por la interfaz 

|**Prueba funcional**|PF3: El usuario podrá desplazarse entre las diferentes panta-<br>llas de la aplicación a través del menú lateral y botones de<br>navegación.|
|---|---|
|**Requisito cumplido**|RF1|
|**Prueba realizada**|Se accedió al menú lateral, seleccionando distintas opciones<br>(Reportes, Confguración, Comunidad, etc.), comprobando la<br>transición entre pantallas.|
|**Resultado esperado**|El sistema cambia correctamente de pantalla según la opción<br>elegida, sin cierres inesperados ni errores visuales.|
|**Resultado obtenido**|La navegación se realizó correctamente entre todas las seccio-<br>nes de la app, con tiempos de respuesta adecuados y sin fallos<br>gráfcos.|



Cuadro 7.4: Prueba funcional 4: Llamar a emergencias 

|Cuadro|7.4: Prueba funcional 4: Llamar a emergencias|
|---|---|
|**Prueba funcional**|PF4: El usuario llamará a emergencias.|
|**Requisito cumplido**|RF3, RF4, RF10|
|**Prueba realizada**|Se pulsa el botón de emergencias y se permiten las llamadas.|
|**Resultado esperado**|Se llama a un número de teléfono.|
|**Resultado obtenido**|El usuario realiza la llamada con éxito y establece la comuni-<br>cación.|



Cuadro 7.5: Prueba funcional 5: Crear reporte 

|**Prueba funcional**|PF5: El usuario creará un reporte que será mostrado en el<br>apartado comunidad.|
|---|---|
|**Requisito cumplido**|RF5, RF6, RF7|
|**Prueba realizada**|Se rellenó el formulario y se enviaron los datos.|
|**Resultado esperado**|La información del reporte se guarda en la base de datos.|
|**Resultado obtenido**|El reporte se muestra en la pantalla comunidad y se encuentra<br>almacenado en la base de datos.|



Cuadro 7.6: Prueba funcional 6: Envío anónimo de reportes 

|**Prueba funcional**|PF6: El usuario podrá enviar un reporte de incidente de forma<br>anónima, sin que su identidad sea visible para otros usuarios.|
|---|---|
|**Requisito cumplido**|RF5, RF6, RF7, RF9|
|**Prueba realizada**|Se activó la opción “enviar de forma anónima” en el formulario<br>de reporte y se completaron los campos necesarios antes de<br>enviarlo.|
|**Resultado esperado**|El reporte aparece en la pantalla Comunidad sin mostrar nom-<br>bre de usuario ni foto de perfl, y se almacena correctamente<br>en la base de datos.|
|**Resultado obtenido**|El reporte se muestra públicamente como usuario anónimo,<br>sin datos personales visibles, cumpliendo con el requisito de<br>privacidad.|



Capítulo 7 

Página 137 

Cuadro 7.7: Prueba funcional 7: Cargar zonas en el mapa 

|**Prueba funcional**|PF7: El usuario quiere ver las zonas guardadas en el mapa.|
|---|---|
|**Requisito cumplido**|RF11, RF13|
|**Prueba realizada**|Se pulsó en el botón cargar zonas.|
|**Resultado esperado**|Se muestran en el mapa las zonas almacenadas en la base de<br>datos.|
|**Resultado obtenido**|Las zonas son cargadas en el mapa con un marcador o un<br>círculo con un radio determinado.|



Cuadro 7.8: Prueba funcional 8: Añadir zonas en el mapa 

|**Prueba funcional**|PF8: El usuarioquiereguardar una zonapeligrosa en el mapa.|
|---|---|
|**Requisito cumplido**|RF13|
|**Prueba realizada**|El usuario selecciona la zona y se ajusta el radio con los bo-<br>tones de aumento o disminución.|
|**Resultado esperado**|Se envía la información de la zonapeligrosa a la base de datos.|
|**Resultado obtenido**|La información ha sido registrada en la base de datos, y se<br>puede recurrir a ella mediante el botón cargar zonas.|



Cuadro 7.9: Prueba funcional 9: Crear viaje seguro 

|**Prueba funcional**|PF9: El sistema creará una ruta teniendo en cuenta la direc-<br>ción origen y destino, así como las zonas peligrosas.|
|---|---|
|**Requisito cumplido**|RF11, RF12, RF14|
|**Prueba realizada**|Se rellenó el apartado de origen y destino.|
|**Resultado esperado**|Se muestra la ruta deseada en la pantalla mapa.|
|**Resultado obtenido**|El recorrido evitando zonas peligrosas se muestra en el mapa<br>con una línea de color azul.|



Cuadro 7.10: Prueba funcional 10: Compartir ruta con contactos de confianza 

|**Prueba funcional**|PF10: El usuario podrá compartir su ruta segura con un con-<br>tacto de confanza para que este pueda seguir su trayecto en<br>tiempo real.|
|---|---|
|**Requisito cumplido**|RF11, RF12, RF14, RF15|
|**Prueba realizada**|Se generó una ruta desde la pantalla correspondiente y se<br>utilizó la opción “Compartir con contacto”, seleccionando un<br>destinatario desde la agenda.|
|**Resultado esperado**|El contacto recibe un enlace o notifcación que le permite vi-<br>sualizar la ubicación y progreso del usuario en tiempo real.|
|**Resultado obtenido**|La ruta fue compartida correctamente a través del canal ele-<br>gido (WhatsApp/SMS) y el contacto pudo acceder al segui-<br>miento en tiempo real sin problemas.|



Capítulo 7 

Página 138 

Cuadro 7.11: Prueba funcional 11: Filtrado por tipo en pantalla Comunidad 

|**Prueba funcional**|PF11: El usuario podrá fltrar los reportes de la Comunidad<br>según el tipo de incidente (robo, acoso, vandalismo, etc.).|
|---|---|
|**Requisito cumplido**|RF8|
|**Prueba realizada**|Se accedió a la pantalla Comunidad y se seleccionaron distin-<br>tos tipos de incidentes en el menú de fltros para visualizar<br>únicamente los reportes correspondientes.|
|**Resultado esperado**|El sistema muestra en pantalla únicamente los reportes del<br>tipo seleccionado, actualizando la lista de manera inmediata.|
|**Resultado obtenido**|El fltrado funciona correctamente: al seleccionar un tipo de<br>incidente, se muestran solo los reportes correspondientes, sin<br>errores ni retrasos.|



Cuadro 7.12: Prueba funcional 12: Notificación por proximidad a zona peligrosa 

|**Prueba funcional**|PF12: El sistema notifcará al usuario cuando se acerque a<br>una zona clasifcada como peligrosa.|
|---|---|
|**Requisito cumplido**|RF12|
|**Prueba realizada**|Se simuló el desplazamiento del usuario hacia una zona pre-<br>viamente marcada como peligrosa en la base de datos, con<br>permisos de geolocalización activos.|
|**Resultado esperado**|Se lanza una notifcación de advertencia en tiempo real indi-<br>cando la cercanía a una zona de riesgo.|
|**Resultado obtenido**|La notifcación fue recibida correctamente antes de entrar en<br>la zona.|



Cuadro 7.13: Prueba funcional 13: Cambiar configuración 

|**Prueba funcional**|PF13: El usuario cambiará las opciones de confguración.|
|---|---|
|**Requisito cumplido**|RF17|
|**Prueba realizada**|Se seleccionan las opciones deseadas.|
|**Resultado esperado**|Se actualizan las pantallas o confguraciones pertinentes.|
|**Resultado obtenido**|Se muestran activadas o desactivadas las opciones elegidas y<br>se cumple la nueva confguración.|



Cuadro 7.14: Prueba funcional 14: Actualizar foto de perfil 

|**Prueba funcional**|PF14: El usuario actualizará su foto de perfl a través de la<br>pantalla confguración.|
|---|---|
|**Requisito cumplido**|RF16|
|**Prueba realizada**|Se cambió la foto de perfl, seleccionándola de la galería del<br>dispositivo.|
|**Resultado esperado**|La nueva imagen es mostrada y guardada en la base de datos<br>para su posterior uso.|
|**Resultado obtenido**|Se actualiza la foto de perfl y se muestra en la pantalla con-<br>fguración, también se muestra al hacer un reporte en la pan-<br>talla comunidad.|



Capítulo 7 

Página 139 

Cuadro 7.15: Prueba funcional 15: Editar perfil de usuario 

|**Prueba funcional**|PF15: El usuario podrá editar sus datos personales desde la<br>pantalla de perfl, incluyendo nombre, correo o contraseña.|
|---|---|
|**Requisito cumplido**|RF16|
|**Prueba realizada**|Se accedió a la sección de perfl y se modifcaron los campos<br>nombre y correo, guardando los cambios.|
|**Resultado esperado**|Los nuevos datos se actualizan correctamente en la base de<br>datos y se refejan en la interfaz del usuario.|
|**Resultado obtenido**|Los datos personales se actualizaron correctamente, y al cerrar<br>y volver a abrir la app, se mantenían los cambios.|



Cuadro 7.16: Prueba funcional 16: Cerrar sesión 

|**Prueba funcional**|PF16: El usuario podrá cerrar su sesión de forma manual des-<br>de la pantalla de confguración o perfl.|
|---|---|
|**Requisito cumplido**|RF2|
|**Prueba realizada**|El usuario accedió a la opción “Cerrar sesión” desde el menú<br>confguración y confrmó la acción.|
|**Resultado esperado**|La sesión activa se cierra, y el sistema redirige a la pantalla<br>de inicio de sesión.|
|**Resultado obtenido**|El cierre de sesión fue exitoso, se borraron los datos tempora-<br>les de sesión y el usuario fue redirigido a la pantalla de login.|



Capítulo 7 

Página 140 

## **7.1.1. Trazabilidad entre requisitos y pruebas funcionales** 

A continuación, se presenta la trazabilidad de requisitos funcionales, donde se comparan los requisitos definidos en las etapas iniciales del proyecto con las pruebas funcionales realizadas. El objetivo es verificar que cada requisito ha sido correctamente implementado y validado a través de una prueba correspondiente. 

Cuadro 7.17: Resumen de trazabilidad entre requisitos funcionales y pruebas funcionales 

|**Requisito**<br>**funcional**|**Descripción**|**Pruebas**<br>**funciona-**<br>**les asociadas**|
|---|---|---|
|RF1|Estilo visual cohesivo|PF3|
|RF2|Registro e inicio de sesión con credenciales seguras|PF1, PF2, PF16|
|RF3|Alerta de emergencia|PF4|
|RF4|Botón violeta para violencia de género|PF4|
|RF5|Reportar incidentes con geolocalización|PF5, PF6|
|RF6|Almacenamiento y clasifcación de reportes|PF5, PF6|
|RF7|Consulta de reportes propios y comunitarios|PF5, PF6|
|RF8|Filtro por tipo de incidente|PF11|
|RF9|Envío anónimo de reportes|PF6|
|RF10|Canalización de alertas a servicios de emergencia|PF4|
|RF11|Cargar zonas de riesgo en el mapa|PF7, PF8, PF9, PF10|
|RF12|Notifcaciones al acercarse a zonas peligrosas|PF9, PF10, PF12|
|RF13|Gestión de zonas seguras/peligrosas|PF7, PF8|
|RF14|Generación de rutas seguras|PF9, PF10|
|RF15|Compartir ruta con contactos de confanza|PF10|
|RF16|Modifcación de datos personales y foto de perfl|PF14, PF15|
|RF17|Guardado de preferencias del usuario|PF13|



Tras la ejecución de las pruebas funcionales definidas, se puede concluir que la aplicación móvil cumple satisfactoriamente con los requisitos funcionales establecidos en las fases iniciales del proyecto. Todas las funcionalidades críticas, como el envío y visualización de reportes, la gestión de zonas peligrosas en el mapa, la creación de rutas seguras o la notificación por proximidad a zonas de riesgo han sido verificadas y validadas con resultados positivos. 

Las pruebas han demostrado que la interacción del usuario con la aplicación es fluida e intuitiva, permitiendo una navegación eficiente entre las distintas pantallas y un acceso fiable a las principales herramientas de seguridad. Además, la ejecución de pruebas en distintos entornos ha permitido asegurar un comportamiento consistente bajo diversas condiciones de uso. 

La tabla de trazabilidad confirma una cobertura completa de los requisitos funcionales mediante las correspondientes pruebas funcionales. Cada requisito ha sido validado al menos una vez, lo que respalda la calidad del desarrollo y la alineación entre lo diseñado y lo implementado. En resumen, el resultado de las pruebas funcionales avala que la aplicación está preparada para su uso por parte de los usuarios finales, cumpliendo los objetivos de fiabilidad, usabilidad y funcionalidad definidos en el proyecto. 

Capítulo 7 

Página 141 

## **7.2. Pruebas de rendimiento** 

Para evaluar el comportamiento de la aplicación móvil en términos de consumo de recursos, se realizarán pruebas de rendimiento centradas en el uso de la CPU, GPU y memoria RAM durante situaciones de uso representativas, como la interacción con el mapa y la realización de un viaje seguro. Estas pruebas permiten identificar posibles cuellos de botella, garantizar una experiencia de usuario fluida y optimizar el rendimiento general de la aplicación. Para la monitorización de los recursos del dispositivo durante la ejecución, se ha utilizado la herramienta CPU-Z, que proporciona información en tiempo real sobre el uso del procesador, la carga gráfica, la memoria utilizada y el aumento de temperatura de la batería. Las pruebas se llevaron a cabo en dos dispositivos con diferentes características de hardware: un Samsung Galaxy S24 Ultra y un Samsung Galaxy Note 10+, con el objetivo de comparar el rendimiento en terminales de distintas generaciones. 

## **7.2.1. Análisis de características principales** 

A continuación, se presentan las principales características de la CPU, GPU y RAM para así tenerlas en cuenta a la hora de comparar. 

## **CPU** 

El Galaxy S24 Ultra incorpora el Snapdragon 8 Gen 3 for Galaxy, fabricado en un proceso de 4 nm, que ofrece una arquitectura de núcleos más eficiente y potente en comparación con el Exynos 9825 de 7 nm del Note 10+. Esto debería traducirse en un rendimiento superior y una mejor gestión energética en tareas exigentes; en el caso de _UrbanGuardian_ , aunque no es muy exigente a nivel de recursos, se puede ver sobre todo a la hora de generar una ruta. 

## **GPU** 

La Adreno 750 del S24 Ultra proporciona capacidades gráficas significativamente mejoradas respecto a la Mali-G76 MP12 del Note 10+. 

## **RAM** 

Aunque ambos dispositivos cuentan con 12 GB de RAM, la tecnología LPDDR5X del S24 Ultra ofrece mayores velocidades de transferencia y eficiencia energética en comparación con la LPDDR4X del Note 10+. 

## **Batería** 

Ambos dispositivos utilizados para las pruebas cuentan con baterías de polímero de litio (Li-Po). El Samsung Galaxy S24 Ultra incorpora una batería de 5.000 mAh, mientras que el Galaxy Note 10+ dispone de una batería de 4.300 mAh. En condiciones de carga similar, el Note 10+ podría calentarse más fácilmente debido a su menor capacidad de batería y a la menor eficiencia energética de su procesador (fabricado en 7 nm frente a los 4 nm del S24 Ultra), lo que obliga a un mayor esfuerzo energético de la batería durante tareas exigentes. Además, la diferencia generacional en la gestión térmica del sistema puede influir directamente en la temperatura alcanzada durante el uso intensivo de la aplicación. 

Capítulo 7 

Página 142 

## **7.2.2. Análisis de resultados** 

## **CPU** 

Como se observa en las imágenes, se produce un aumento en la frecuencia de los núcleos de la CPU al pasar del estado de reposo a uno de actividad. En reposo, las frecuencias se mantenían entre 499 MHz y 672 MHz, reflejando un uso mínimo de procesamiento. Sin embargo, al iniciar una de las funciones más exigentes de la aplicación, la creación de una ruta en el mapa, las frecuencias se incrementan, alcanzando valores de entre 902 MHz y 2.515 MHz. Este comportamiento indica que la aplicación requiere un procesamiento intensivo en ese momento, probablemente debido a la carga de datos geográficos, el cálculo de rutas y la actualización visual del mapa. 

Figura 7.1: CPUConAplicaciónCerrada 

Figura 7.2: CPUConAplicaciónAbierta 

## **GPU** 

Las pruebas realizadas muestran que la aplicación no hace un uso significativo de la GPU en ninguno de los dos dispositivos, al no realizar tareas gráficas complejas (como renderizado 3D o visualización avanzada en el mapa). En todas las pruebas rondaba el 0 %. 

## **RAM** 

Capítulo 7 

Página 143 

En cuanto al uso de memoria RAM, también se registró un ligero incremento asociado al funcionamiento de la aplicación. En estado de reposo, el sistema ocupaba aproximadamente 36 % de la RAM disponible, mientras que durante la ejecución de una de las funciones más exigentes, el trazado de una ruta en el mapa, el consumo ascendió a un 39 %. Este aumento moderado sugiere que la aplicación realiza una gestión eficiente de los recursos de memoria, limitando el uso a lo estrictamente necesario incluso en tareas complejas. 

Figura 7.3: RAMConAplicaciónCerrada 

Figura 7.4: RAMConAplicaciónAbierta 

## **Batería** 

En relación con la temperatura de la batería, se observó un aumento muy leve durante el uso intensivo de la aplicación. En estado de reposo, la batería del dispositivo se mantenía en torno a los 36,1°C, mientras que al ejecutar una ruta en el mapa, la temperatura alcanzó los 37°C. Esta variación mínima refleja un buen comportamiento térmico de la aplicación, que no genera una carga significativa sobre la batería ni contribuye a un sobrecalentamiento del dispositivo. 

Figura 7.5: BateríaConAplicaciónCerrada 

Figura 7.6: BateríaConAplicaciónAbierta 

Capítulo 7 

Página 144 

## **Conclusiones** 

A pesar de que inicialmente se contempló incluir también las capturas de rendimiento en un segundo dispositivo, los resultados obtenidos durante las pruebas demostraron un comportamiento similar entre ambos, por lo que se optó por centrar el análisis en uno de ellos y el segundo se describe brevemente a continuación. En cuanto al rendimiento observado en el dispositivo con características inferiores, la CPU alcanzó un pico máximo de 2.700 MHz durante los momentos de mayor carga, el uso de RAM se incrementó hasta un 40 %, y la temperatura de la batería se elevó ligeramente hasta los 37,4°C. Estos valores, tomados durante tareas exigentes como la generación de rutas en el mapa, permiten concluir que la aplicación está correctamente optimizada tanto a nivel energético como térmico. El crecimiento controlado del uso de recursos, especialmente de la memoria RAM, refleja una buena gestión interna que garantiza un rendimiento fluido incluso en dispositivos con diferentes capacidades de hardware, sin comprometer la estabilidad del sistema durante su uso habitual. 

## **7.3. Pruebas de usabilidad** 

La usabilidad es un aspecto fundamental en el desarrollo de cualquier aplicación móvil, especialmente en contextos críticos como la seguridad ciudadana. En este proyecto, se ha priorizado que la aplicación sea intuitiva, accesible y eficiente para todos los usuarios, independientemente de su nivel de experiencia tecnológica. 

Para garantizar una experiencia de usuario satisfactoria, se han tenido en cuenta los siguientes principios de usabilidad durante el diseño y desarrollo de la aplicación: 

1. **Facilidad de uso:** La interfaz ha sido diseñada de forma minimalista, priorizando la simplicidad visual y la comprensión inmediata de las funcionalidades. Los botones y menús se encuentran distribuidos de manera lógica, con iconografía reconocible y textos breves pero informativos. 

2. **Accesibilidad:** Se ha considerado el uso de colores contrastantes, tipografías legibles y elementos táctiles con un tamaño adecuado para facilitar la interacción, incluso en situaciones de estrés. Además, se ha procurado que las funciones principales, como el reporte de incidentes o la activación de rutas seguras, puedan realizarse en pocos pasos. 

3. **Rapidez de interacción:** Dado que muchos de los escenarios de uso implican emergencias, las acciones críticas como llamar a emergencias o hacer un reporte están accesibles desde la pantalla principal, reduciendo el tiempo de reacción del usuario. 

4. **Feedback constante:** La aplicación ofrece retroalimentación inmediata al usuario mediante mensajes visuales (confirmaciones, advertencias) para informar sobre el estado de cada acción realizada. 

5. **Consistencia y familiaridad:** La estructura y el flujo de navegación se basan en patrones de diseño ampliamente conocidos por los usuarios de dispositivos móviles, lo que reduce la curva de aprendizaje y aumenta la eficiencia de uso desde el primer acceso. 

Capítulo 7 

Página 145 

Además, se ha realizado una validación preliminar de la usabilidad mediante pruebas informales con un grupo reducido de usuarios. A través de estas pruebas, se han identificado y corregido elementos que generaban confusión o requerían demasiados pasos, optimizando así la experiencia global. 

En conclusión, la aplicación busca ser una herramienta eficaz y de fácil manejo, diseñada para responder rápidamente en contextos críticos sin sacrificar la comodidad del uso diario. 

## **7.3.1. Evaluación de la usabilidad** 

Para valorar la usabilidad y la experiencia general ofrecida por la aplicación desarrollada, se diseñó un cuestionario que abarca distintos aspectos clave relacionados con la interacción del usuario. Este cuestionario fue entregado a un grupo de seis participantes tras una sesión de prueba con la aplicación. 

El cuestionario evalúa dimensiones como la utilidad percibida, la facilidad de uso, la experiencia subjetiva, el rendimiento, la accesibilidad de las funciones, la confianza generada por la aplicación, su atractivo visual y la probabilidad de uso futuro. Cada ítem ofrece tres opciones de respuesta que permiten obtener una visión general sobre la percepción del usuario. A continuación, se presenta el cuestionario aplicado: 

## **Utilidad de la aplicación** 

- Utilizaría esta aplicación diariamente. 

- Me resultaría útil para determinados momentos. 

- No le veo gran utilidad. 

## **Usabilidad** 

- Tiene una interfaz intuitiva. 

□ No resulta excesivamente intuitiva, tampoco presenta grandes dificultades de manejo. 

- Tiene una interfaz compleja. 

## **Experiencia de uso** 

- Me sentí cómodo/a usando la aplicación. 

- La experiencia fue aceptable pero podría mejorar. 

- La aplicación me resultó incómoda o poco amigable. 

## **Rendimiento** 

□ La aplicación funcionó con fluidez y sin errores. 

- Tuvo algún pequeño fallo, pero fue utilizable. 

- Tuvo problemas graves de funcionamiento o lentitud. 

## **Accesibilidad de funciones** 

□ Encontré rápidamente las funciones que necesitaba. 

Capítulo 7 

Página 146 

□ Algunas funciones fueron fáciles de encontrar, otras no tanto. 

□ Tuve dificultades para encontrar las funciones principales. 

## **Confianza en la aplicación** 

- Me inspira confianza y la usaría con datos personales. 

- No tengo una opinión clara sobre su fiabilidad. 

- No confiaría en esta aplicación para un uso real. 

## **Atractivo visual** 

- El diseño me resulta atractivo y moderno. 

- El diseño es aceptable, pero mejorable. 

- El diseño me parece poco cuidado o desactualizado. 

## **Probabilidad de uso futuro** 

- Volvería a utilizar la aplicación en el futuro. 

- Solo la usaría si no tengo otra opción. 

- No la volvería a utilizar. 

## **7.3.2. Análisis de resultados** 

Los resultados obtenidos muestran una percepción mayoritariamente positiva por parte de los usuarios. La mayoría de los participantes calificaron la interfaz como intuitiva y manifestaron sentirse cómodos durante el uso. En cuanto al rendimiento, la aplicación fue valorada como fluida y sin errores críticos. 

Cabe destacar que más del 83 % de los usuarios afirmaron que volverían a utilizar la aplicación en el futuro, y un 67 % señalaron que confiarían en ella incluso para introducir datos personales. 

Estos datos respaldan la validez del enfoque de diseño centrado en el usuario y confirman que la aplicación cumple con los principios básicos de usabilidad, accesibilidad y eficiencia. 

No obstante, algunas observaciones sugieren oportunidades de mejora, especialmente en lo relativo a la localización rápida de ciertas funciones y al diseño visual en ciertos dispositivos o resoluciones. 

## **Capítulo 8** 

## **Conclusiones** 

## **8.1. Revisión de objetivos** 

A lo largo de este trabajo se ha llevado a cabo el estudio, diseño e implementación de _UrbanGuardian_ , una aplicación móvil centrada en mejorar la seguridad ciudadana mediante el uso de tecnología accesible, inmediata y funcional. El proyecto ha abordado un problema social real y de creciente preocupación en el ámbito urbano: la necesidad de contar con herramientas digitales que permitan a las personas sentirse acompañadas, protegidas y empoderadas ante situaciones de riesgo. 

Para alcanzar los objetivos del proyecto, he aplicado conocimientos adquiridos a lo largo de la carrera. No obstante, gran parte de los conocimientos necesarios para su desarrollo los he tenido que aprender de manera autodidacta. Precisamente por ello, uno de los aspectos que más valoro de esta experiencia ha sido comprobar mi capacidad para trabajar y continuar formándome de forma autónoma, siempre a partir de la base sólida que me ha proporcionado la formación en Ingeniería Multimedia. 

Desde una perspectiva técnica, se ha logrado integrar múltiples tecnologías como Android Studio, Firebase, OpenStreetMap y GraphHopper, consiguiendo una solución que permite la geolocalización, la emisión de reportes de emergencia, la consulta de zonas peligrosas y seguras en el mapa interactivo y la planificación de rutas seguras en tiempo real. Todo ello ha sido implementado bajo una arquitectura modular, con una interfaz clara, accesible y orientada a la experiencia del usuario, priorizando en todo momento la usabilidad y la protección de los datos personales. Debido a mi poca experiencia en el desarrollo de aplicaciones móviles, ha sido todo un reto su implementación. Sin embargo, lo más adecuado era implementar la aplicación a través de la tecnología móvil por sus múltiples ventajas. En cuanto al desarrollo, el diseño de interfaces fue la parte más amena, por el contrario, implementar algunas funcionalidades como el mapa interactivo o la creación de rutas y reportes fueron desafios que constataron mucho esfuerzo y una buena planificación para ir afrontando incompatibilidades o errores que iban surgiendo. 

A nivel funcional, la aplicación cumple con los objetivos propuestos, ofreciendo a los usuarios herramientas útiles como el botón de emergencia, el envío de reportes anónimos, la visualización comunitaria de incidentes y la posibilidad de compartir rutas seguras con contactos de confianza. Las pruebas realizadas han permitido validar la robustez del sistema y detectar oportunidades de mejora que podrían desarrollarse en el futuro. 

En términos de impacto, _UrbanGuardian_ demuestra cómo la innovación tecnológica 

Capítulo 8 

Página 148 

puede tener una aplicación directa y significativa en la vida cotidiana de las personas, especialmente en contextos donde la percepción de inseguridad limita la movilidad, la libertad o el bienestar de ciertos colectivos. Este proyecto no solo refleja un logro académico y técnico, sino también un compromiso ético y social con la creación de entornos más seguros, conectados y colaborativos. 

Asimismo, cabe destacar que el desarrollo de esta aplicación representa un primer paso hacia soluciones más amplias e integradas dentro de los sistemas de gestión urbana y emergencias. Con una evolución futura adecuada, _UrbanGuardian_ podría convertirse en una herramienta real y escalable, al servicio de municipios, autoridades y comunidades que apuesten por una seguridad ciudadana participativa, inclusiva y basada en el uso responsable de la tecnología. 

## **8.2. Trabajo futuro** 

Aunque la aplicación _UrbanGuardian_ ha alcanzado un grado de funcionalidad que permite cumplir con los objetivos propuestos inicialmente, existen múltiples líneas de desarrollo que podrían ser exploradas en el futuro para enriquecer y ampliar su utilidad. 

En primer lugar, sería conveniente abordar la adaptación de la aplicación a otras plataformas, especialmente iOS, con el fin de aumentar su alcance y disponibilidad; utilizando frameworks como Flutter o React Native. Asimismo, se podría implementar la compatibilidad con dispositivos como relojes inteligentes, pudiendo enviar una alerta de emergencia o compartir la ubicación desde el mismo. 

Asimismo, se plantea la posibilidad de incorporar inteligencia artificial para mejorar la detección de patrones de riesgo en función del historial de reportes, localización y horarios. Esta funcionalidad permitiría anticipar zonas potencialmente peligrosas mediante el análisis predictivo y ofrecer recomendaciones personalizadas al usuario. 

Otro aspecto a considerar es la integración directa con servicios públicos municipales y cuerpos de seguridad locales. Una colaboración institucional permitiría canalizar los reportes generados desde la aplicación hacia las plataformas oficiales de emergencias, agilizando la respuesta ante incidentes. 

En términos de funcionalidad, podrían implementarse nuevas características que refuercen la seguridad del usuario y mejoren la experiencia general. Entre ellas se encuentra el envío automático y periódico de la ubicación durante un trayecto, la activación de alertas mediante comandos de voz, o la posibilidad de adjuntar fotografías y grabaciones de audio en los reportes de incidentes. Asimismo, sería interesante incluir un sistema de alertas comunitarias que permita a los usuarios recibir notificaciones inmediatas sobre situaciones críticas reportadas por otras personas cercanas. Este sistema reforzaría el carácter colaborativo de la aplicación y potenciaría su impacto como red ciudadana de apoyo mutuo. 

En el ámbito cartográfico, gracias a la utilización de la librería `OSMDroid` , se ofrece una alternativa de código abierto a otras soluciones con coste económico, como Google Maps. Esto permite mantener la independencia frente a servicios propietarios, además de brindar mayor flexibilidad a la hora de personalizar el mapa dentro de la aplicación. En el futuro, podría explorarse una personalización más profunda del mapa. 

Por otro lado, se podría trabajar en la accesibilidad de la interfaz para garantizar una 

Apéndices 

Página 149 

experiencia de uso adecuada a personas con diversidad funcional, mejorando elementos como la navegación por voz, los contrastes visuales y la compatibilidad con lectores de pantalla. 

Finalmente, para asegurar la sostenibilidad del proyecto a largo plazo, se recomienda desarrollar una estrategia de mantenimiento continuo, actualización periódica y eventual escalabilidad a nivel nacional o internacional, contemplando distintos contextos urbanos y normativas legales. 

## **8.3. Conclusiones** 

Finalizar el desarrollo de _UrbanGuardian_ ha supuesto para mí mucho más que cumplir con los requisitos de un Trabajo de Fin de Grado. Ha sido una experiencia que me ha permitido comprobar de forma práctica cómo los conocimientos adquiridos durante la carrera pueden transformarse en soluciones reales con impacto social. 

A lo largo de este proceso, he aplicado conceptos técnicos aprendidos en el grado, pero también me he enfrentado a numerosos retos que me han obligado a aprender de forma autónoma. Esta combinación entre formación académica y autoaprendizaje ha supuesto un proceso de aprendizaje personal y profesional, uno de los aspectos que más valoro de todo el proyecto. 

Desde sus primeras fases de diseño hasta su implementación funcional, el proyecto ha buscado ofrecer una solución realista, accesible y centrada en las necesidades de los usuarios. La elección de tecnologías, el planteamiento de las funcionalidades y el enfoque en la experiencia de usuario, responden al objetivo principal de facilitar la comunicación en situaciones de emergencia y contribuir a la construcción de entornos urbanos más seguros y colaborativos. Saber que este objetivo puede materializarse en una herramienta funcional me deja una gran satisfacción personal. Aunque también soy consciente de que quedan aspectos por mejorar y funcionalidades por incorporar, el proyecto sienta una base sólida para futuras ampliaciones y posibles integraciones con sistemas institucionales. 

Este trabajo me ha reafirmado en la idea de que la tecnología, bien aplicada, puede y debe estar al servicio de las personas. Me llevo no solo una aplicación desarrollada, sino también una mayor convicción sobre el papel que quiero desempeñar como profesional, utilizar mis conocimientos para generar un impacto positivo en la sociedad. 

En resumen, _UrbanGuardian_ ha sido un proyecto desafiante, enriquecedor y profundamente significativo. Cierra una etapa académica, pero abre nuevas posibilidades donde seguir evolucionando y adaptándose a nuevos contextos y desafíos. La experiencia adquirida durante el proceso ha sido enriquecedora a nivel técnico y humano, y confirma el potencial de la tecnología como herramienta de transformación social. 

Apéndices 

Página 150 

## **Apéndice A** 

## **Apéndice** 

## **A.1. Código fuente del proyecto** 

Con el objetivo de facilitar la revisión, prueba y posible reutilización del proyecto _UrbanGuardian_ , se ha habilitado un repositorio público en GitHub [33] donde se encuentra disponible todo el contenido del proyecto. 

## **A.1.1. Enlace al repositorio:** 

Dirección del repositiorio: https://github.com/anateixido/UrbanGuardian.git 

## **A.2. Archivos XML** 

En el presente apéndice se incluyen capturas de los archivos XML más relevantes generados durante el desarrollo del proyecto. La inclusión de estas imágenes tiene como objetivo proporcionar una visión clara y visual del contenido de los archivos explicados con anterioridad en el apartado de implementación XML (sección 6.1.1). 

Apéndices 

Página 152 

Figura A.1: TextViewActivityComunidad 

## Figura A.2: TextViewActivityConfiguración 

Apéndices 

Página 153 

Figura A.3: EditTextActivityViaje 

Figura A.4: EditTextActivityInvolucrados 

Apéndices 

Página 154 

Figura A.5: ButtonActivityMain 

Apéndices 

Página 155 

Figura A.6: ButtonActivityMapa 

Apéndices 

Página 156 

Figura A.7: SwitchActivityViaje 

Figura A.8: LinearLayoutActivityViaje 

Apéndices 

Página 157 

Figura A.9: LinearLayoutActivityItemReporte 

Figura A.10: LinearLayoutActivityItemReporte 

Apéndices 

Página 158 

Figura A.11: RecyclerViewActivityReportes 

Figura A.12: RecyclerViewActivityComunidad 

## **Bibliografía** 

- [1] Secretaría de Estado de Seguridad, “Alertcops,” 2014. Disponible en: https://alertcops.ses. mir.es/publico/alertcops/alertcops/comoFunciona.html. 

- [2] M7 Seguridad Ciudadana, “m7citizensecurity,” 2012. Disponible en: https://w2. m7citizensecurity.com/index.php/en/funcionalidades_en/. 

- [3] Life360 Inc., “Life360,” 2008. Disponible en: https://www.life360.com/intl/. 

- [4] Google, “Android studio,” 2025. Disponible en: https://developer.android.com/studio. 

- [5] Apple Inc., “Xcode,” 2025. Disponible en: https://developer.apple.com/xcode/. 

- [6] Google LLC, “Flutter: Ui toolkit for building natively compiled applications,” 2025. Disponible en: https://flutter.dev/. 

- [7] Meta Platforms, Inc., “React native,” 2025. Disponible en: https://reactnative.dev/. 

- [8] J. Gosling, B. Joy, and G. Steele, “The java language specification,” 2023. Publicado por Addison-Wesley. 

- [9] Google Inc., “Android ndk documentation,” 2025. Disponible en: https://developer.android. com/ndk. 

- [10] JetBrains, “Kotlin programming language,” 2025. Disponible en: https://kotlinlang.org/. 

- [11] W3C, “Extensible markup language (xml) 1.0,” 2025. Disponible en: https://www.w3.org/ XML/. 

- [12] Firebase, “Firebase documentation,” 2025. Disponible en: https://firebase.google.com/docs. 

- [13] SQLite Consortium, “Sqlite documentation,” 2025. Disponible en: https://www.sqlite.org/ docs.html. 

- [14] Google, “Room persistence library documentation,” 2025. Disponible en: https: //developer.android.com/jetpack/androidx/releases/room. 

- [15] OpenStreetMap contributors, “Openstreetmap,” 2025. Disponible en: https://www. openstreetmap.org/. 

- [16] Google LLC, “Google maps platform,” 2025. Disponible en: https://developers.google.com/ maps. 

- [17] OSMDroid, “Osmdroid wiki,” 2025. Disponible en: https://github.com/osmdroid/osmdroid/wiki. 

Apéndices 

Página 160 

- [18] Google, “Geocoder | android developers,” 2025. Disponible en: https://developer.android. com/reference/android/location/Geocoder. 

- [19] GraphHopper, “Graphhopper directions api,” 2025. Disponible en: https://www. graphhopper.com/. 

- [20] Project OSRM contributors, _Open Source Routing Machine (OSRM)_ , 2025. Disponible en: http://project-osrm.org/. 

- [21] Valhalla contributors, “Valhalla: Open source routing engine,” 2025. Disponible en: https://valhalla.readthedocs.io/. 

- [22] R. Elmasri and S. B. Navathe, _Fundamentos de Sistemas de Bases de Datos_ . AddisonWesley, 7 ed., 2020. Capítulo 1. 

- [23] R. Ramakrishnan and J. Gehrke, _Database Management Systems_ . McGraw-Hill, 3 ed., 2014. Capítulo 1. 

- [24] B. Bruegge and A. H. Dutoit, _Object-Oriented Software Engineering: Using UML, Patterns, and Java_ . Prentice Hall, 3 ed., 2010. 

- [25] G. Booch, J. Rumbaugh, and I. Jacobson, _The Unified Modeling Language User Guide_ . Addison-Wesley, 2 ed., 2005. 2nd Revised Edition. 

- [26] A. D. Ajenjo, _Dirección y Gestión de Proyectos_ . RA-MA, 2 ed., 2005. 

- [27] C. W. Dawson and G. Martín, _El proyecto fin de carrera en Ingeniería Informática: una guía para el estudiante_ . Prentice Hall, 2002. 

- [28] InfoJobs, “Análisis de sueldos del sector tecnológico en españa,” 2025. Disponible en: https://www.infojobs.net/. 

- [29] PayScale, “Tech salaries and market trends,” 2025. Disponible en: https://www.payscale. com/. 

- [30] Glassdoor, “Salarios y empleo en tecnología,” 2025. Disponible en: https://www.glassdoor. es/. 

- [31] Factorial, “Calculadora de coste de trabajador,” 2025. Disponible en: https://factorial.es/ calculadora-coste-trabajador. 

- [32] U. Europea, “Reglamento general de protección de datos (rgpd),” 2016. Reglamento (UE) 2016/679. Disponible en: https://eur-lex.europa.eu/. 

- [33] Android Open Source Project, “Android en github,” 2025. Repositorio oficial. Disponible en: https://github.com/android. 

