# 09 — Trazabilidad RF/RNF → código

Dónde se implementa cada requisito y su estado real (verificado contra el código el 2026-06-14).

## Requisitos funcionales

| RF | Descripción | Dónde (archivo · función) | Estado |
|---|---|---|---|
| RF1 | Generación de composiciones epicicloidales | `canvas.ts` · `draw()` (modelo en [03](03-modelo-matematico.md)) | ✅ |
| RF2 | Editar parámetros en tiempo real | `controls.ts` · `onParamChange()` → `pattern.service.ts` · `updateParams()` | ✅ |
| RF3 | Redibujado dinámico sin recargar | `canvas.ts` (suscripción a `params$`) | ✅ |
| RF4 | Play / Pausa / Reiniciar | `controls.ts` · `play()`/`pause()`/`reset()` → `canvas.ts` · `onAction()` | ✅ |
| RF5 | Limpiar → deshacer por sesiones | `controls.ts` · `clear()` + `pattern.service.ts` · `removeLastSession()`/`replaySessionsToLines()` + `onAction('undo')` | ✅ |
| RF6 | Exportar imagen (PNG) | `export-modal.ts` · `buildExportCanvas()`/`save()` | ✅ |
| RF7 | Ejemplos predefinidos / presets | `presets.ts` · `PATTERN_PRESETS` + `controls.ts` · `applyPreset()`; E/S JSON con `exportJson()`/`onFileSelected()` | ✅ (catálogo de ejemplos + E/S JSON) |
| RF8 | Alternar modos (curva/líneas) | `controls.ts` · `toggleMode()`; cambio de modo en `canvas.ts` · `draw()` | ✅ |
| RF9 | Controles interactivos | `controls.html` (sliders, números, color) | ✅ |
| RF10 | Mostrar valores actuales | `controls.html` (inputs con `ngModel`) | ✅ |
| RF11 | Lienzo responsivo | `canvas.ts` · `windowResized`; zoom `zoomIn()`/`zoomOut()` | ✅ |
| RF12 | Variaciones aleatorias controladas | `controls.ts` · `randomize()`/`randInRange()`/`randColor()` | ✅ |
| RF13 | Restablecer a valores por defecto | `controls.ts` · `reset()`; `DEFAULT_PARAMS` en `pattern.service.ts` | ✅ |
| RF14 | Multilingüe (i18n) | `core/i18n/` (`I18nService`, `TranslatePipe`, JSON) | ✅ |

## Requisitos no funcionales

| RNF | Descripción | Cómo se cumple | Estado |
|---|---|---|---|
| RNF1 | Navegadores modernos (HTML5/CSS3/ES6+) | Stack Angular 21 / ES2022 / Canvas 2D | ✅ |
| RNF2 | Angular como base | Angular 21 standalone | ✅ |
| RNF3 | p5.js integrado en Angular | p5 *instance mode* en `canvas.ts` | ✅ |
| RNF4 | UI intuitiva | Vista única, agrupación plegable, tutorial, bloqueo durante animación | ✅ |
| RNF5 | Rendimiento fluido en tiempo real | Estela incremental O(1) + *zoneless* ([05](05-renderizado-rendimiento.md)) | ✅ |
| RNF6 | Arquitectura modular/escalable | Componentes por *feature* + servicios + modelos desacoplados | ✅ |
| RNF7 | Código documentado | Comentarios en español; estructura por *features* | ✅ |
| RNF8 | Mínimo consumo de CPU en animación | *Zoneless* (p5 no dispara CD) + pintado incremental | ✅ |
| RNF9 | Responsive escritorio/tableta | Layout flex/Bootstrap + lienzo adaptativo | ✅ |
| RNF10 | Gestión de errores / validación | `clampParams()`; descarte controlado de JSON inválido | ✅ |
| RNF11 | Compatible Chrome/Firefox/Edge/Opera | APIs estándar | 🟡 Por verificar manualmente |
| RNF12 | Despliegue en Netlify | `netlify.toml` (build + publish) | 🟡 Configurado; falta confirmar publicación |

## Pendientes reales del proyecto

1. **RNF12 — Despliegue:** completar y verificar el despliegue en Netlify.
2. **RNF11 — Verificación:** pruebas manuales cruzadas en los cuatro navegadores.

> Posible mejora futura (no requisito): permitir que el usuario **guarde sus propios presets** con nombre en `localStorage`, además del catálogo integrado de RF7.
