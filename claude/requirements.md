# Requisitos

> Estado verificado contra el código el 2026-06-14. Numeración alineada con la memoria (cap. 3.1).

## 3.1.1 Requisitos funcionales

| ID | Descripción | Estado |
|---|---|---|
| RF1 | La aplicación web deberá permitir la generación de composiciones visuales basadas en curvas epicicloidales mediante algoritmos matemáticos parametrizables. | ✅ Hecho — ambos modos (curva e intersección) implementados en `canvas.ts` |
| RF2 | El usuario deberá poder modificar en tiempo real los parámetros que definen los patrones (radios, velocidades angulares, número de ciclos, fase, color, grosor de trazo, etc.). | ✅ Hecho — todos los parámetros enlazados con `[(ngModel)]`; emiten a `PatternService` en cada cambio. ⚠️ No existe un control explícito de "número de ciclos": la forma se controla con la relación de velocidades, radios y fases |
| RF3 | El sistema deberá actualizar dinámicamente la representación gráfica sin necesidad de recargar la página al modificarse los parámetros. | ✅ Hecho — suscripción reactiva al servicio |
| RF4 | La aplicación deberá permitir iniciar, pausar y reiniciar la animación de los patrones generados. | ✅ Hecho — botones Play / Pausa vía `PatternService.dispatch()` |
| RF5 | El sistema deberá permitir limpiar el lienzo y generar una nueva composición desde cero. | ✅ Hecho — botón Limpiar lienzo |
| RF6 | El usuario deberá poder guardar la composición generada como imagen en un formato estándar. | ✅ Hecho — `ExportModal`: fondo, zoom, resolución 1×/2×/4×, nombre de archivo, preview en tiempo real, exporta PNG |
| RF7 | La aplicación deberá permitir almacenar configuraciones de parámetros predefinidas y recuperarlas posteriormente. | ✅ Hecho — desplegable de **Ejemplos** en el panel: catálogo `PATTERN_PRESETS` (`features/presets/presets.ts`) con configuraciones predefinidas; `Controls.applyPreset()` ajusta los parámetros al elegir uno (opción vacía = lienzo en blanco). Complementado por export/import de patrones en JSON. |
| RF8 | El sistema deberá permitir alternar entre distintos modos de visualización (modo curva epicicloidal y modo intersección de líneas). | ✅ Hecho — botón de alternancia en el panel de control; ambos modos implementados |
| RF9 | La aplicación deberá ofrecer controles interactivos (sliders, selectores, campos numéricos) para facilitar la manipulación de parámetros. | ✅ Hecho — sliders en fases e inclinación; inputs numéricos en el resto; selector de color nativo |
| RF10 | El sistema deberá mostrar en pantalla los valores actuales de los parámetros utilizados en la generación del patrón. | ✅ Hecho — los inputs numéricos muestran y actualizan el valor actual en tiempo real |
| RF11 | La aplicación deberá permitir la visualización responsiva del lienzo de dibujo adaptándose al tamaño de la ventana del navegador. | ✅ Hecho — `windowResized` redimensiona lienzo y buffer de estela |
| RF12 | El sistema deberá permitir la generación de variaciones automáticas de patrones mediante la introducción de valores aleatorios controlados. | ✅ Hecho — `randomize()` en `controls.ts`; valores acotados al min/max/step de cada control |
| RF13 | La aplicación deberá permitir restablecer los parámetros a sus valores predeterminados en cualquier momento. | ✅ Hecho — botón Reset restaura `DEFAULT_PARAMS` y limpia el lienzo |
| RF14 | El sistema deberá ofrecer soporte multilingüe, permitiendo al usuario cambiar dinámicamente el idioma de la interfaz mediante el sistema de internacionalización i18n. | ✅ Hecho — i18n en tiempo de ejecución (ES/EN; + ID de prueba), detección automática del idioma del navegador, selector desplegable y cambio sin recargar |

## 3.1.2 Requisitos no funcionales

| ID | Descripción | Estado |
|---|---|---|
| RNF1 | La aplicación deberá ser accesible desde navegadores web modernos compatibles con estándares HTML5, CSS3 y ECMAScript 6 o superior. | ✅ Cumplido — stack Angular 21 / ES2022 |
| RNF2 | El sistema deberá desarrollarse utilizando el framework Angular como base estructural de la aplicación. | ✅ Cumplido — Angular 21 (standalone) |
| RNF3 | La generación gráfica deberá implementarse mediante la librería p5.js, garantizando su correcta integración en el entorno Angular. | ✅ Cumplido — p5 en *instance mode*, fuera de la zona de Angular (`runOutsideAngular`), limpieza en `OnDestroy` |
| RNF4 | La aplicación deberá presentar una interfaz de usuario intuitiva y coherente, adecuada para usuarios sin conocimientos técnicos avanzados. | ✅ Cumplido — panel agrupado, tutorial de inicio, controles etiquetados (criterio subjetivo) |
| RNF5 | El sistema deberá mantener un rendimiento fluido en tiempo real, evitando bloqueos o caídas en dispositivos de gama media. | ✅ Cumplido — renderizado de estela incremental O(1) por frame (capa offscreen) |
| RNF6 | La arquitectura del proyecto deberá seguir principios de modularidad, mantenibilidad y escalabilidad propios del desarrollo profesional con Angular. | ✅ Cumplido — componentes desacoplados (Canvas / Controls / servicios), módulo i18n aislado |
| RNF7 | El código fuente deberá estar correctamente documentado y estructurado para facilitar su comprensión, mantenimiento y ampliación futura. | ✅ Cumplido — código comentado en español; estructura por features |
| RNF8 | La aplicación deberá minimizar el consumo innecesario de recursos del navegador, especialmente en lo relativo al uso de CPU durante la animación continua. | ✅ Cumplido — p5 fuera de la zona (sin CD a 60 fps) + pintado incremental |
| RNF9 | La interfaz deberá adaptarse correctamente a diferentes resoluciones y tamaños de pantalla, manteniendo la usabilidad en dispositivos de escritorio y tabletas. | ✅ Cumplido — layout responsivo (Bootstrap 5) y lienzo adaptativo |
| RNF10 | El sistema deberá implementar mecanismos básicos de gestión de errores para evitar comportamientos inesperados ante valores inválidos de entrada. | ✅ Cumplido — `clampParams()` corrige valores fuera de rango/NaN al confirmar la edición |
| RNF11 | La aplicación deberá ser compatible con los principales navegadores web modernos (Google Chrome, Mozilla Firefox, Microsoft Edge y Opera), garantizando un comportamiento consistente en cada uno de ellos. | ✅ Cumplido por el stack (APIs estándar). ⚠️ Pendiente de verificación manual en cada navegador |
| RNF12 | La aplicación deberá desplegarse en una plataforma de hosting en la nube, concretamente en Netlify, garantizando su disponibilidad pública mediante acceso web. | 🟡 Configurado — `netlify.toml` con `build` y `publish` (`dist/epicycloid-generator/browser`). ⚠️ Pendiente confirmar que el sitio está publicado y accesible |

## Resumen de estado

- **Funcionales:** 14 de 14 completos.
- **No funcionales:** todos cumplidos salvo **RNF12**, que está *configurado* pero pendiente de confirmar el despliegue público; y **RNF11**, cumplido por stack pero sin verificación manual cruzada de navegadores.

### Lo que queda por hacer
1. **RNF12 — Despliegue**: completar y verificar el despliegue en Netlify (el `netlify.toml` ya está listo).
2. **RNF11 — Verificación**: probar manualmente en Chrome, Firefox, Edge y Opera.
