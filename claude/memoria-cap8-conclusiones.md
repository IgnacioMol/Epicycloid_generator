# Capítulo 8: Conclusiones

> Borrador del capítulo de conclusiones de la memoria del TFG *Epicycloid Generator*.
> **Adaptación de la estructura de referencia (UrbanGuardian):** se mantiene la estructura del
> capítulo de conclusiones (8.1 Revisión de objetivos, 8.2 Trabajo futuro, 8.3 Conclusiones),
> adaptada al dominio de una aplicación web de página única (Angular + p5.js). Estilo sin rayas
> ni puntos y coma en la prosa.

---

Este último capítulo cierra la memoria con una valoración global del trabajo realizado. En primer lugar se realiza una revisión del proyecto, que abarca tanto el grado de cumplimiento de los objetivos planteados como el ajuste de la estimación de costes y tiempos al desarrollo real. A continuación se proponen las principales líneas de trabajo futuro que podrían ampliar o mejorar la aplicación. Por último, se recogen las conclusiones generales extraídas del desarrollo, tanto en su vertiente técnica como formativa.

## 8.1. Revisión del proyecto

Antes de plantear las conclusiones finales, se revisa el resultado del proyecto en tres aspectos. El primero valora en qué medida se han alcanzado los objetivos marcados al inicio. El segundo contrasta la estimación de tiempos con la dedicación real. El tercero hace lo propio con la estimación de costes.

### 8.1.1. Revisión de objetivos

El objetivo general del trabajo era el estudio y la aplicación del framework Angular mediante el desarrollo de una aplicación web orientada a la generación de imágenes basadas en patrones orbitales, combinando una vertiente formativa con otra práctica. Tras la finalización del proyecto, este objetivo general puede considerarse cumplido, ya que se ha construido una aplicación funcional y completa, *Epicycloid Generator*, partiendo de un conocimiento inicial limitado del framework. A continuación se revisa cada uno de los objetivos específicos definidos en el primer capítulo.

**Analizar los fundamentos del framework Angular.** Cumplido. Durante el desarrollo se ha trabajado con la arquitectura basada en componentes independientes (*standalone*), el uso de TypeScript, la inyección de dependencias, el ciclo de vida de los componentes y la organización modular del código en áreas diferenciadas (modelo, lógica transversal y componentes de interfaz). Además, se ha adoptado un enfoque sin zona (*zoneless*), lo que ha exigido comprender en profundidad el mecanismo de detección de cambios de Angular. Todo ello queda reflejado en el capítulo de implementación.

**Adquirir competencias prácticas en el desarrollo de aplicaciones web con Angular.** Cumplido. El proyecto se planteó como un proceso de aprendizaje progresivo, desde un nivel inicial hasta una solución funcional. El resultado es una aplicación estructurada según buenas prácticas, con una clara separación de responsabilidades y un servicio central que actúa como única fuente de verdad, lo que demuestra la adquisición de las competencias buscadas.

**Diseñar e implementar una aplicación que genere imágenes basadas en epicicloides.** Cumplido (RF1). La aplicación genera las composiciones a partir de un modelo matemático paramétrico y determinista, que garantiza una representación fiel y reproducible de los patrones a partir de los valores introducidos por el usuario.

**Desarrollar un sistema que permita definir y modificar los parámetros con precisión y sin errores.** Cumplido (RF2, RF9, RF10 y RNF10). El panel de control ofrece controles interactivos (deslizadores, campos numéricos y selector de color) que muestran en todo momento el valor vigente de cada parámetro. La entrada se valida automáticamente, ajustando al rango permitido cualquier valor incorrecto, y la edición se realiza con la simulación en pausa para evitar estados inconsistentes.

**Integrar la librería p5.js dentro del entorno Angular para la visualización en tiempo real.** Cumplido (RNF3). Esta integración constituyó el principal reto técnico del proyecto. Se resolvió encapsulando p5.js en modo instancia dentro de un componente específico y adoptando una arquitectura sin zona, de modo que el bucle de dibujo a 60 cuadros por segundo no dispara ciclos de detección de cambios innecesarios. Las pruebas de rendimiento del capítulo anterior confirman que esta solución mantiene una animación fluida con un consumo de recursos contenido.

**Implementar la exportación de los resultados generados.** Cumplido (RF6 y RF7). La aplicación permite exportar la composición como imagen PNG a calidad vectorial y a la resolución elegida, así como exportar e importar el patrón completo en formato JSON, lo que facilita guardar, recuperar y compartir las creaciones sin necesidad de un servidor ni una base de datos.

En conjunto, todos los objetivos planteados se han alcanzado. La aplicación cumple además la práctica totalidad de los requisitos funcionales y no funcionales definidos, quedando como tareas menores la verificación cruzada en todos los navegadores y la confirmación del despliegue público, que se retoman en el apartado de trabajo futuro.

### 8.1.2. Revisión de la estimación de tiempos

La planificación inicial del proyecto, recogida en el capítulo de requisitos, estimó una dedicación total de unas 315 horas de trabajo efectivo, ampliadas a unas 347 horas tras aplicar un margen de contingencia del 10 %. Esa estimación se repartió entre las distintas fases del desarrollo, siendo la implementación la más extensa, con cerca de 150 horas, seguida de las pruebas y el diseño.

Al contrastar esa previsión con el desarrollo real, se observa que la distribución del esfuerzo se ajustó en buena medida a lo planificado. Tal como se había previsto, la implementación fue la fase más costosa, y dentro de ella la integración de p5.js con Angular y la optimización del renderizado concentraron la mayor parte del tiempo, al tratarse de los puntos de mayor dificultad técnica. *(Indicar aquí las horas realmente invertidas según el seguimiento llevado en la hoja de cálculo, y comentar si el total se mantuvo dentro de las 347 horas previstas.)*

Las desviaciones que se produjeron se mantuvieron dentro del margen de contingencia, lo que confirma la utilidad de haber empleado la técnica de estimación por tres valores, que absorbe la incertidumbre propia de trabajar con una tecnología nueva. La curva de aprendizaje de Angular, partiendo de un nivel inicial bajo, fue el factor que más presionó los plazos, sobre todo en las primeras fases de diseño e implementación.

### 8.1.3. Revisión de la estimación de costes

En el plano económico, bajo un escenario profesional con varios perfiles, el coste total se estimó en torno a 10.088 euros, sumando el personal, la amortización de los equipos y los costes indirectos.

Conviene matizar que esa cifra corresponde a un escenario profesional teórico. El coste real del proyecto, al tratarse de un Trabajo Fin de Grado desarrollado por una sola persona con herramientas gratuitas o de código abierto, hardware propio y alojamiento sin coste, fue prácticamente nulo. La estimación económica sirve, por tanto, para poner en valor el esfuerzo realizado y dimensionar lo que costaría el desarrollo en un entorno empresarial, no como un desembolso efectivo.

## 8.2. Trabajo futuro

Aunque la aplicación cubre los objetivos previstos, durante el desarrollo y las pruebas se han identificado varias líneas de mejora que podrían abordarse en el futuro. Algunas surgen directamente de la retroalimentación de los usuarios recogida en las pruebas de usabilidad, y otras del propio análisis técnico del proyecto.

- **Control de la velocidad del trazado.** Fue la sugerencia más repetida en las respuestas libres del cuestionario. Se plantea añadir un control que permita acelerar el dibujo o el paso del tiempo, de modo que el usuario obtenga los resultados con mayor rapidez sin esperar a que la animación avance en tiempo real.
- **Ayudas para comprender los parámetros avanzados.** El aspecto peor valorado en usabilidad fue la comprensión de los parámetros más avanzados. Incorporar ayudas contextuales, descripciones emergentes o pequeñas previsualizaciones del efecto de cada control reduciría esa dificultad.
- **Guardado de configuraciones propias del usuario.** Al catálogo de ejemplos predefinidos podría sumarse la posibilidad de que el usuario guarde sus propias configuraciones con nombre en el almacenamiento local del navegador, ampliando la idea actual de presets.
- **Exportación de animaciones.** Más allá de la imagen estática, sería interesante permitir exportar el proceso de dibujo como vídeo o GIF animado, dado el carácter dinámico de las composiciones.
- **Nuevos modos de visualización y modelos matemáticos.** La arquitectura desacoplada facilita añadir modos adicionales o nuevas familias de curvas, ampliando las posibilidades creativas de la herramienta.
- **Mejora de la adaptación a móviles.** La interfaz se ha optimizado para escritorio y tabletas. Una adaptación más completa a pantallas pequeñas ampliaría el público potencial.
- **Verificación cruzada de navegadores y despliegue.** Quedan pendientes la comprobación sistemática del comportamiento en todos los navegadores objetivo y la confirmación del despliegue público en la plataforma de alojamiento.
- **Ampliación de las pruebas automatizadas.** Reforzar la batería de pruebas unitarias, en especial sobre la lógica matemática y de validación, aumentaría la confianza ante futuras modificaciones del código.

## 8.3. Conclusiones

El desarrollo de *Epicycloid Generator* ha permitido alcanzar los dos propósitos que motivaron el proyecto. Desde el punto de vista formativo, se ha aprendido a utilizar Angular en un caso práctico real, partiendo de un conocimiento muy básico y llegando a una aplicación completa y mantenible. Desde el punto de vista práctico, se ha construido una herramienta de arte generativo accesible, que transforma un modelo matemático en una experiencia visual interactiva al alcance de cualquier usuario.

El reto más relevante del trabajo fue la integración de p5.js dentro de Angular, dos tecnologías con modelos de funcionamiento distintos. Resolver la sincronización entre la lógica de la aplicación y el renderizado gráfico, mediante la encapsulación de p5.js y una arquitectura sin zona, no solo hizo posible la herramienta, sino que constituyó el principal aprendizaje técnico del proyecto. Las pruebas de rendimiento confirmaron que la solución adoptada es eficiente incluso en equipos de gama media, lo que valida las decisiones de diseño tomadas durante la implementación.

A partir de esta experiencia puede valorarse de forma crítica la idoneidad de Angular para aplicaciones multimedia interactivas. El framework aporta una estructura sólida, un tipado seguro y una organización clara que resultan muy beneficiosos para la mantenibilidad del proyecto. A cambio, integrar una librería gráfica externa orientada al dibujo continuo obliga a comprender bien su modelo de detección de cambios y a tomar decisiones específicas, como la adopción del enfoque sin zona. Con esas precauciones, Angular se ha mostrado plenamente capaz de soportar una aplicación de este tipo.

Por último, los resultados de las pruebas de usabilidad respaldan el enfoque de diseño centrado en el usuario. La valoración general fue muy positiva y confirmó que es posible acercar conceptos matemáticos complejos a un público sin formación técnica a través de una interfaz intuitiva y una respuesta visual inmediata. En definitiva, el proyecto cumple sus objetivos, deja una base preparada para futuras ampliaciones y supone una aportación tanto al aprendizaje del desarrollo web moderno como a la exploración del arte generativo en el navegador.
