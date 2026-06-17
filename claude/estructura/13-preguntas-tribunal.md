# 13 — Preguntas probables del tribunal (con respuestas modelo)

Banco de **preguntas frecuentes** en una defensa de TFG y respuestas **breves y defendibles**, ancladas al proyecto. Amplía cada tema en los documentos enlazados.

---

## Sobre el problema y la matemática

**¿Qué es una epicicloide / qué genera la aplicación?**
> Una epicicloide es la curva que traza un punto de una circunferencia que rueda sobre otra. La app generaliza la idea: hay **dos órbitas independientes** (con radio, velocidad, fase, factor elíptico e inclinación propios) que giran alrededor de un centro común, y se dibuja la relación entre los dos "planetas". Es **arte generativo paramétrico**. Ver [03](03-modelo-matematico.md).

**¿Qué diferencia hay entre los dos modos de visualización (RF8)?**
> En **modo curva** la órbita 2 se desplaza respecto a la órbita 1 y se traza el camino del punto extremo (una epicicloide clásica). En **modo intersección de líneas**, ambas órbitas parten del centro y en cada fotograma se dibuja la **línea** que une los dos planetas; la acumulación de líneas crea el patrón. Ver [03](03-modelo-matematico.md).

**¿Por qué la relación entre velocidades determina la forma?**
> Porque el patrón se cierra cuando las dos fases vuelven a alinearse; esa periodicidad depende de la **proporción** entre las dos velocidades angulares. Proporciones simples dan figuras cerradas (rosas, estrellas); proporciones casi iguales o irracionales dan espirales densas.

---

## Sobre Angular y la arquitectura

**¿Por qué Angular y no React o Vue?**
> Es un requisito del proyecto (**RNF2**). Además aporta estructura (componentes + servicios + inyección de dependencias), TypeScript con tipado fuerte y reactividad madura (señales + RxJS). Ver [12](12-decisiones-tecnicas.md).

**¿Cómo se comunican los componentes?**
> No se conocen entre sí: se comunican a través de un **servicio singleton**, `PatternService`, mediante dos observables de RxJS (`params$` para los parámetros, `action$` para las órdenes). Es un patrón publicador/suscriptor que da bajo acoplamiento (RNF6). Ver [04](04-flujo-ejecucion-y-datos.md) y [11](11-conceptos-angular-rxjs.md).

**¿Qué es un componente *standalone*?**
> Un componente que declara sus propias dependencias en `imports`, sin necesidad de `NgModule`. Es el enfoque moderno de Angular; la app arranca con `bootstrapApplication`. Ver [11](11-conceptos-angular-rxjs.md).

**¿Qué es el ciclo de vida y qué hooks usas?**
> Son los momentos por los que pasa un componente; Angular llama métodos `ng*` automáticamente. Uso el **constructor** (inyección), **`ngAfterViewInit`** (inicializar p5 cuando el `<canvas>` ya existe en el DOM) y **`ngOnDestroy`** (liberar suscripciones y el sketch de p5). Ver [10](10-ciclo-de-vida-angular.md).

**¿Por qué `ngAfterViewInit` y no `ngOnInit` para arrancar p5?**
> Porque p5 necesita el elemento `<canvas>` del DOM, al que accedo con `@ViewChild`. Esa referencia **solo existe una vez renderizada la vista**, es decir, en `ngAfterViewInit`; en `ngOnInit` aún no está disponible. Ver [10](10-ciclo-de-vida-angular.md).

---

## Sobre el rendimiento (lo más técnico)

**¿Qué es "zoneless" y por qué lo usas?**
> Significa que la app **no incluye Zone.js**. Zone.js dispararía la detección de cambios de Angular en cada `requestAnimationFrame` de p5 (60 veces/segundo), un trabajo inútil que degradaría el rendimiento. Sin él, p5 dibuja por su cuenta y Angular solo reacciona a eventos reales del usuario y a señales → **RNF5** y **RNF8**. Ver [11](11-conceptos-angular-rxjs.md).

**¿Cómo consigues dibujar miles de líneas sin que se ralentice?**
> Con una **capa fuera de pantalla** que acumula el dibujo: cada fotograma pinta **solo los segmentos nuevos** (coste O(1)), en lugar de repintar todo el historial (O(N)). Las líneas se guardan como vectores y se rerasterizan al zoom actual para no perder nitidez. Ver [05](05-renderizado-rendimiento.md).

**¿Por qué señales y observables a la vez? ¿No es redundante?**
> No: cada uno encaja en un sitio. Los **observables** comunican componentes de forma asíncrona y desacoplada (Controls → Canvas). Las **señales** modelan estado síncrono y reactivo que la plantilla lee directamente (el idioma), con refresco automático sin suscripción. Ver [11](11-conceptos-angular-rxjs.md).

---

## Sobre funcionalidades concretas

**¿Cómo funciona "deshacer" (RF5)?**
> El dibujo se organiza en **sesiones** (cada bloque Play→Pausa). Deshacer quita la última sesión y **reconstruye** el lienzo reproduciendo las restantes (`replaySessionsToLines()`). El invariante es que, en pausa, el historial de líneas equivale al replay de las sesiones. Ver [04](04-flujo-ejecucion-y-datos.md).

**¿Cómo exportas e importas un patrón (RF6/RF7)?**
> Imagen: se compone un `<canvas>` con fondo, zoom, resolución y guías elegidos y se descarga como PNG. Patrón (JSON): se guardan las **sesiones** con sus parámetros y duración; al importar se **reconstruye** el dibujo exactamente, replicando la simulación. Ver [06](06-funcionalidades.md).

**¿Qué son los "ejemplos predefinidos" (presets, RF7)?**
> Un desplegable con configuraciones de parámetros ya preparadas; al elegir una, el panel ajusta sus valores y, al pulsar Play, se dibuja ese patrón. Es la recuperación de configuraciones predefinidas que pide RF7. La opción vacía deja el lienzo en blanco.

**¿Por qué un sistema de i18n propio (RF14)?**
> Porque `@angular/localize` no permite cambiar de idioma sin recargar y las librerías de terceros no eran fiables de instalar en ese entorno. La solución propia (diccionarios JSON + señal) permite **cambio instantáneo** y añadir idiomas con solo crear un JSON. Ver [07](07-i18n.md) y [12](12-decisiones-tecnicas.md).

**¿Cómo gestionas valores inválidos (RNF10)?**
> Cada control tiene rango (min/max/step) y, al confirmar la edición, `clampParams()` ajusta cualquier valor fuera de rango o no numérico al límite más cercano. Además, los controles se **bloquean** durante la animación para evitar estados inconsistentes. Ver [08](08-interfaz-diseno.md).

---

## Sobre calidad y cierre

**¿Es responsive y accesible?**
> Sí: layout flexible con Bootstrap, el lienzo se redimensiona con la ventana (RF11/RNF9), contraste adecuado, etiquetas en los controles, tutorial de bienvenida y soporte multilingüe. Ver [08](08-interfaz-diseno.md).

**¿Cómo has probado la aplicación?**
> Con Vitest (pruebas unitarias) y verificación manual de los flujos. *(Si procede, menciona qué casos cubres.)*

**¿Qué limitaciones tiene y cómo la mejorarías?**
> Posibles líneas futuras: persistir presets propios del usuario, reproducción inversa (borrado animado), más modos de visualización o exportar animación (vídeo/GIF). Una limitación conocida: al redimensionar la ventana se pierde la estela (decisión consciente, porque cambian las dimensiones del lienzo).

**¿Qué es lo que más valor técnico tiene del proyecto?**
> La integración **Angular zoneless + p5.js** con renderizado **incremental O(1)**: consigue una animación fluida de miles de líneas manteniendo una arquitectura limpia y desacoplada, y un modelo de datos que habilita deshacer, exportar e importar.

---

## Consejo de defensa

Para cada respuesta: **nombra el qué, ánclalo a un requisito (RF/RNF) y remata con el porqué**. Si no sabes un detalle, reconoce el límite y reconduce a la decisión de diseño. Apóyate en la [trazabilidad RF/RNF](09-trazabilidad-rf-rnf.md) para no dejarte ningún requisito.
