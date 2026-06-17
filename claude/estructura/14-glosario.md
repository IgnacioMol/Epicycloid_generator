# 14 — Glosario de términos

Definiciones **breves** de los términos del proyecto, para tener la respuesta exacta a mano. Los conceptos de framework se amplían en [11](11-conceptos-angular-rxjs.md); la matemática en [03](03-modelo-matematico.md).

## Dominio (la matemática y el arte)

- **Epicicloide:** curva que traza un punto de una circunferencia que rueda sobre otra. Base conceptual de los patrones.
- **Arte generativo:** imágenes creadas por un sistema a partir de reglas y parámetros, no dibujadas a mano.
- **Órbita:** cada uno de los dos círculos/elipses que giran. La app tiene **dos**, independientes.
- **Planeta:** el punto que se mueve sobre una órbita; el dibujo surge de la relación entre los dos planetas.
- **RPM (revoluciones por minuto):** unidad de la **velocidad angular** de cada órbita; su proporción define la forma del patrón.
- **Fase inicial:** ángulo de partida de una órbita; desfasa el punto de inicio.
- **Factor elíptico (X/Y):** escala que deforma una órbita circular en elipse (1.0 = círculo).
- **Inclinación:** rotación del plano de una órbita.
- **Modo curva / modo intersección de líneas:** los dos modos de visualización (RF8); ver [03](03-modelo-matematico.md).

## Estado y datos

- **`LineRecord`:** un **segmento** dibujado (coordenadas, color, alfa, grosor). El dibujo es una lista de estos.
- **`lineHistory`:** la lista de todas las líneas dibujadas.
- **Sesión (`SimulationSession`):** un bloque de animación entre Play y Pausa, con sus parámetros, nº de fotogramas y estado final. Habilita deshacer, exportar e importar.
- **`replaySessionsToLines()`:** función que **reconstruye** el `lineHistory` reproduciendo las sesiones (base del deshacer y del import).
- **Preset / ejemplo predefinido (`PatternPreset`):** configuración de parámetros con nombre, recuperable desde el desplegable (RF7).

## Framework y reactividad

- **Componente:** pieza de interfaz con su plantilla y lógica (`Canvas`, `Controls`, `Tutorial`, `ExportModal`, `AppComponent`).
- **Standalone:** componente sin `NgModule`, que declara sus dependencias en `imports`.
- **Servicio:** clase con lógica/estado compartido, inyectable (`PatternService`, `I18nService`).
- **Inyección de dependencias (DI):** mecanismo por el que Angular provee las instancias que un componente pide (en el constructor o con `inject()`).
- **Singleton:** una única instancia compartida (`providedIn: 'root'`).
- **Hook del ciclo de vida:** método `ng*` que Angular llama automáticamente en una fase del componente (`ngAfterViewInit`, `ngOnDestroy`). Ver [10](10-ciclo-de-vida-angular.md).
- **Detección de cambios (*change detection*):** proceso por el que Angular reevalúa la vista cuando algo cambia.
- **Zone.js:** librería que parchea las APIs asíncronas para disparar la detección de cambios automáticamente. **Este proyecto no la usa.**
- **Zoneless:** sin Zone.js; la detección de cambios se programa por eventos de plantilla y por señales. Clave del rendimiento (RNF5/RNF8).
- **Señal (*signal*):** contenedor reactivo de un valor (`lang()`); al cambiar, notifica a quien lo usa. Sin suscripción manual.
- **Observable (RxJS):** flujo de valores en el tiempo al que uno se **suscribe**.
- **`Subject`:** observable sin estado, para emitir eventos puntuales (`action$`).
- **`BehaviorSubject`:** observable con **último valor recordado**, que entrega al suscribirse (`params$`).
- **Suscripción:** conexión a un observable; debe **liberarse** (`unsubscribe`) al destruir el componente.
- **Pipe:** transforma un valor en la plantilla (`{{ x | t }}`).
- **Pipe impuro (`pure: false`):** se reevalúa en cada detección de cambios; aquí permite refrescar las traducciones al cambiar de idioma.
- **Data binding:** enlace entre componente y vista (interpolación, propiedad `[x]`, evento `(x)`, bidireccional `[(ngModel)]`).

## Gráficos y herramientas

- **p5.js:** librería de gráficos creativos sobre `<canvas>`; aporta el bucle de render `draw()`.
- **Modo *instance* (de p5):** crear p5 como objeto aislado dentro del componente, sin variables globales.
- **`draw()`:** función de p5 que se ejecuta ~60 veces por segundo (un fotograma).
- **`requestAnimationFrame`:** API del navegador que sincroniza el bucle de dibujo con el refresco de pantalla.
- **Capa offscreen (`p5.Graphics`):** lienzo fuera de pantalla donde se acumula la estela para pintar solo lo nuevo (O(1)).
- **Rasterizar:** convertir las líneas vectoriales en píxeles; aquí se rehace al zoom actual para mantener nitidez.
- **Bootstrap:** framework CSS para el layout responsivo y los componentes de la interfaz.
- **Vitest:** ejecutor de pruebas unitarias.
- **Netlify:** plataforma de hosting estático donde se despliega la app (RNF12).

## Siglas

- **RF / RNF:** requisito funcional / requisito no funcional. Ver [09](09-trazabilidad-rf-rnf.md).
- **SPA (Single Page Application):** aplicación de una sola página, sin recargas ni navegación entre pantallas.
- **DI:** inyección de dependencias.
- **CD:** detección de cambios (*change detection*).
- **i18n:** internacionalización. Ver [07](07-i18n.md).
- **DOM:** representación en memoria de la página (los elementos HTML).
