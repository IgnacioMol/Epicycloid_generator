# 10 — Ciclo de vida de Angular (y cómo se usa en este proyecto)

Este documento explica **qué es el ciclo de vida de un componente Angular**, qué *hooks* (ganchos) existen, **cuáles usa este proyecto y por qué**. Es clave para entender el arranque del lienzo y la integración con p5.js (ver también [04 — Flujo de ejecución](04-flujo-ejecucion-y-datos.md)).

## Qué es el ciclo de vida

Un **componente** de Angular no es un objeto cualquiera: lo **crea y destruye el propio framework**. Desde que nace hasta que muere pasa por una serie de fases (creación → inicialización de propiedades → renderizado de la vista → actualizaciones → destrucción). Angular ofrece unos métodos especiales, los **hooks del ciclo de vida**, para "engancharse" a esas fases y ejecutar código en el momento exacto.

**Esos métodos llevan el prefijo `ng` y tienen nombres fijos** (`ngOnInit`, `ngAfterViewInit`, `ngOnDestroy`…). No los inventa el programador ni los llama a mano: **los invoca Angular automáticamente**. El prefijo `ng` (de «a**ng**ular») está **reservado** por el framework para evitar que choquen con métodos propios; por eso un método tuyo nunca debe empezar por `ng`. Para que Angular reconozca un hook, la clase **implementa la interfaz** correspondiente (`OnInit`, `AfterViewInit`, `OnDestroy`…), que obliga a que el método se llame exactamente así.

## Hooks principales (resumen)

| Hook | Interfaz | Cuándo lo llama Angular |
|---|---|---|
| `constructor` | — | al instanciar la clase; se usa para **inyección de dependencias**, no para lógica pesada |
| `ngOnChanges` | `OnChanges` | cuando cambia un `@Input()` |
| `ngOnInit` | `OnInit` | una vez, tras inicializar las propiedades del componente |
| `ngAfterViewInit` | `AfterViewInit` | una vez, **cuando la vista (el HTML) ya está creada** |
| `ngOnDestroy` | `OnDestroy` | justo antes de **destruir** el componente |

(Existen más —`ngDoCheck`, `ngAfterContentInit`, etc.— pero este proyecto no los necesita.)

## Qué hooks usa este proyecto y por qué

El proyecto usa **tres puntos** del ciclo de vida: el `constructor`, `ngAfterViewInit` y `ngOnDestroy`.

### 1. `constructor` — inyección de dependencias

Es donde Angular **inyecta los servicios** que el componente necesita. Hay dos estilos, ambos presentes:

- **Por constructor:** `Canvas` y `Controls` reciben el servicio como parámetro:
  ```ts
  constructor(private patternService: PatternService) {}
  ```
- **Con `inject()`:** `AppComponent` y `TranslatePipe` usan la función `inject()`:
  ```ts
  readonly i18n = inject(I18nService);
  ```

El `constructor` **no** arranca lógica del lienzo: en ese momento la vista (el `<canvas>` del DOM) **aún no existe**.

### 2. `ngAfterViewInit` — arrancar p5.js y las suscripciones

`Canvas` ([canvas.ts](src/app/features/canvas/canvas.ts)) `implements AfterViewInit`. Aquí ocurre lo esencial del lienzo:

```ts
ngAfterViewInit(): void {
  this.subs.add(this.patternService.params$.subscribe((p) => (this.params = p)));
  this.subs.add(this.patternService.action$.subscribe((a) => this.onAction(a)));
  this.initSketch();                 // crea la instancia de p5 sobre el contenedor del DOM
}
```

**Por qué `ngAfterViewInit` y no `ngOnInit`** (pregunta típica de tribunal): el componente accede al contenedor del lienzo mediante `@ViewChild('canvasContainer')`. Esa referencia al elemento del DOM **solo está disponible cuando la vista ya se ha renderizado**, es decir, en `ngAfterViewInit`. En `ngOnInit` el elemento todavía no existe y p5 no tendría dónde dibujar. Por eso este es el momento correcto para inicializar la librería gráfica.

`ExportModal` ([export-modal.ts](src/app/features/export-modal/export-modal.ts)) usa el mismo hook por la misma razón: genera la **previsualización** (`renderPreview()`) una vez que su `<canvas>` de vista previa existe en el DOM.

### 3. `ngOnDestroy` — limpieza (higiene de memoria)

`Canvas` `implements OnDestroy`:

```ts
ngOnDestroy(): void {
  this.subs.unsubscribe();   // libera las suscripciones a params$ y action$
  this.sketch?.remove();     // detiene el bucle de p5 y elimina su <canvas>
}
```

**Por qué importa:** sin esta limpieza, las suscripciones de RxJS y el bucle `requestAnimationFrame` de p5 **seguirían vivos** tras desaparecer el componente, provocando fugas de memoria y trabajo inútil. Esto contribuye a **RNF6** (mantenibilidad) y **RNF8** (mínimo consumo de recursos).

## Cómo encaja con la detección de cambios *zoneless*

Un matiz importante para la defensa: el ciclo de vida **no** es lo mismo que la **detección de cambios**. Una vez `ngAfterViewInit` arranca p5, **el bucle de dibujo de p5 corre por su cuenta** (su propio `requestAnimationFrame` a 60 fps) y **no pasa por Angular**. Como el proyecto es *zoneless* (no incluye Zone.js), ese bucle **no dispara ciclos de detección de cambios** —que es justo lo que da el rendimiento (**RNF5**, **RNF8**)—. Angular solo "trabaja" cuando hay un evento de plantilla (`(click)`, `(ngModelChange)`) o cambia una **señal** (la del idioma). Detalle completo en [04](04-flujo-ejecucion-y-datos.md) y [11 — Conceptos de Angular](11-conceptos-angular-rxjs.md).

> **Nota (importante para evitar confusiones):** el proyecto **NO usa `NgZone` ni `ngZone.runOutsideAngular()`**. Algunos documentos antiguos del repositorio (`implementation-notes.md`, `tfg-context.md`, `web-structure-analysis.md`) describen una solución previa con `runOutsideAngular`, pero **fue sustituida** por el enfoque *zoneless* (sin Zone.js), que consigue el mismo objetivo de forma más limpia. La fuente de verdad es el código actual de `canvas.ts`.

## Línea de tiempo del ciclo de vida en esta app

```
bootstrapApplication(AppComponent)        // main.ts arranca la app
  → se crea AppComponent (constructor: inject I18nService)
    → Angular renderiza su plantilla → crea los componentes hijos:
        Canvas, Controls, Tutorial   (cada uno: constructor → inyección)
      → vista de Canvas lista → ngAfterViewInit():
          - se suscribe a params$ y action$
          - initSketch() crea p5 sobre el <canvas>  → empieza el bucle draw() a 60 fps
      ── (la app funciona; p5 dibuja fuera de Angular) ──
  → si el componente se destruye → ngOnDestroy(): unsubscribe + sketch.remove()
```

## Para defenderlo en una frase

> «Uso tres puntos del ciclo de vida de Angular: el constructor para inyectar el servicio de estado; `ngAfterViewInit` para inicializar p5.js, que necesita que el `<canvas>` del DOM ya exista; y `ngOnDestroy` para liberar las suscripciones y el sketch de p5 y evitar fugas de memoria.»
