# 11 — Conceptos de Angular, RxJS y señales (para defender las decisiones)

Glosario **razonado** de los conceptos de framework que aparecen en el proyecto, con el **dónde** y el **por qué** de cada uno. Pensado para responder con propiedad a preguntas técnicas del tribunal. Términos breves en [14 — Glosario](14-glosario.md).

## Componentes *standalone* (sin NgModules)

Todos los componentes son **standalone** (`standalone: true`): no hay `NgModule`. Cada componente declara directamente lo que usa en su array `imports`. Ejemplo, `Canvas`:

```ts
@Component({ selector: 'app-canvas', standalone: true, imports: [TranslatePipe], ... })
```

**Por qué:** es el enfoque moderno de Angular (recomendado desde Angular 17+), elimina la capa de módulos, reduce el *boilerplate* y deja explícitas las dependencias de cada componente. La app arranca con `bootstrapApplication(AppComponent, appConfig)` en [main.ts](src/main.ts), sin módulo raíz.

## Inyección de dependencias (DI) y servicios *singleton*

Angular trae un **inyector de dependencias**. Los **servicios** (`PatternService`, `I18nService`) se declaran con `@Injectable({ providedIn: 'root' })`, lo que crea **una única instancia compartida** (patrón *singleton*) para toda la app.

- `PatternService` es el **hub de estado** compartido por `Controls`, `Canvas` y `ExportModal` (ver [04](04-flujo-ejecucion-y-datos.md)).
- `I18nService` mantiene el idioma activo para toda la interfaz (ver [07](07-i18n.md)).

**Por qué importa:** los componentes **no se conocen entre sí**; se comunican a través del servicio. Esto da **bajo acoplamiento** (RNF6): puedo cambiar un componente sin tocar los demás.

## Comunicación reactiva con RxJS: `Subject` vs `BehaviorSubject`

`PatternService` expone dos **observables** de RxJS como canales:

| Canal | Tipo | Para qué |
|---|---|---|
| `params$` | `BehaviorSubject<PatternParams>` | los **parámetros activos**; tiene **valor inicial** y reemite el **último valor** a quien se suscriba |
| `action$` | `Subject<CanvasAction>` | **órdenes puntuales** (`play`, `pause`, `undo`…); no guarda valor, solo emite eventos en el momento |

**Diferencia clave (pregunta típica):** un `BehaviorSubject` **recuerda el último valor** y se lo entrega de inmediato a un nuevo suscriptor (por eso encaja con "el estado actual de los parámetros"); un `Subject` **no tiene estado**, sirve para notificar **acciones** que pasan una sola vez (por eso encaja con "el usuario ha pulsado play").

Un **observable** es un flujo de valores en el tiempo al que uno se **suscribe**; cuando el productor emite (`.next(...)`), todos los suscriptores reaccionan. Es el mecanismo *publicador/suscriptor* que desacopla `Controls` (emite) de `Canvas` (reacciona).

## Señales (*signals*)

Una **señal** es un contenedor reactivo de un valor: se lee llamándola como función (`lang()`) y, al cambiar (`lang.set(...)`), **notifica automáticamente** a quien la usa. En este proyecto, `I18nService` guarda el idioma activo en una señal:

```ts
readonly lang = signal<Lang>(this.detectInitialLang());
```

**Por qué señales aquí:** cuando el usuario cambia el idioma, la señal cambia → Angular **programa una detección de cambios** → la interfaz se repinta y las traducciones se actualizan **al instante, sin recargar** (RF14). Las señales son el mecanismo reactivo "oficial" de Angular moderno y, a diferencia de los observables, **no requieren suscripción manual ni limpieza**.

**Señal vs observable (otra pregunta típica):** la señal es un valor síncrono siempre disponible (ideal para estado que la plantilla lee directamente); el observable es un flujo asíncrono de eventos (ideal para comunicación entre piezas). El proyecto usa **ambos**, cada uno donde encaja mejor.

## Detección de cambios en modo *zoneless*

Angular necesita saber **cuándo** volver a evaluar la vista. Lo clásico es **Zone.js**, que parchea las APIs asíncronas del navegador (eventos, `setTimeout`, `requestAnimationFrame`) para disparar la detección de cambios automáticamente.

**Este proyecto es *zoneless*:** no incluye `zone.js` (no está en `package.json` ni como *polyfill* en `angular.json`). En consecuencia, la detección de cambios se programa por:

1. **Eventos de plantilla** — `(click)`, `(ngModelChange)`, etc. Por eso pulsar Play o mover un deslizador actualiza la interfaz.
2. **Señales** — como la del idioma.

**La gran ventaja:** el bucle de p5 (60 fps con `requestAnimationFrame`) **no está parcheado por Zone.js**, así que **no provoca detección de cambios en cada fotograma**. El dibujo va por su cuenta y Angular solo trabaja ante acciones reales del usuario → **RNF5** (fluidez) y **RNF8** (CPU mínima). Detalle en [04](04-flujo-ejecucion-y-datos.md).

## *Pipes* y el *pipe* impuro de traducción

Un **pipe** transforma un valor en la plantilla (`{{ valor | pipe }}`). El proyecto define `TranslatePipe` para traducir: `{{ 'controls.title' | t }}`.

Es un **pipe impuro** (`pure: false`) **a propósito** ([translate.pipe.ts](src/app/core/i18n/translate.pipe.ts)):

```ts
@Pipe({ name: 't', standalone: true, pure: false })
```

**Por qué impuro:** un pipe *puro* solo se reevalúa si cambia su argumento de entrada; como la **clave** de traducción (`'controls.title'`) no cambia al cambiar de idioma, un pipe puro **no se actualizaría**. Marcándolo impuro, se reevalúa en **cada ciclo de detección de cambios**, de modo que al cambiar el idioma todos los textos se refrescan al momento. El coste es asumible porque la app es zoneless (no hay CD a 60 fps).

## *Data binding* (enlace de datos)

La interfaz usa los enlaces estándar de Angular:

- **Interpolación:** `{{ 'controls.play' | t }}` — muestra valores.
- **Enlace de propiedad:** `[disabled]="isPlaying"` — del componente a la vista.
- **Enlace de evento:** `(click)="play()"`, `(ngModelChange)="onParamChange()"` — de la vista al componente.
- **Enlace bidireccional:** `[(ngModel)]="params.orbit1Radius"` — sincroniza el control del formulario con la propiedad (módulo `FormsModule`).

## Arranque de la aplicación

- [main.ts](src/main.ts): `bootstrapApplication(AppComponent, appConfig)` — arranca la app con el componente raíz.
- [app.config.ts](src/app/app.config.ts): proveedores globales (`provideBrowserGlobalErrorListeners`, `provideRouter`). **No registra Zone.js ni detección basada en zona** → zoneless.

## Tabla rápida: concepto → dónde → por qué

| Concepto | Dónde | Por qué |
|---|---|---|
| Componente standalone | todos | enfoque moderno, sin módulos, dependencias explícitas |
| DI / servicio singleton | `PatternService`, `I18nService` | estado compartido, bajo acoplamiento (RNF6) |
| `BehaviorSubject` | `params$` | estado actual con último valor recordado |
| `Subject` | `action$` | órdenes puntuales sin estado |
| Señal | `I18nService.lang` | reactividad del idioma sin suscripción (RF14) |
| Zoneless | toda la app | p5 no dispara CD → rendimiento (RNF5/RNF8) |
| Pipe impuro | `TranslatePipe` | refresco inmediato de textos al cambiar idioma |
