# 📌 Recordatorio — Actualizar la memoria del TFG por la i18n

> Cambio realizado: se ha añadido **soporte multilingüe** a la aplicación (español, inglés,
> indonesio y checo), con detección automática del idioma del navegador y un **selector
> desplegable** para cambiarlo manualmente. Implementado en la rama `feature/i18n` (fusionada a `main`).
>
> **Estado:** los apartados 1, 2 y 3 ya están incorporados a la memoria. Queda pendiente solo el
> apartado 4 ("Otros apartados a revisar"), porque esa parte de la memoria aún no se ha redactado.

---

## 1. Requisitos ✅ HECHO

- [x] **Añadir un requisito nuevo** para la internacionalización → **RF14** (soporte multilingüe).
      (Documentado en `requirements.md` y en la trazabilidad de `memoria-cap4-analisis.md`.)
- [x] **Renumerar / actualizar la tabla de requisitos** (RF1–RF14 / RNF1–RNF12 coherentes).
- [x] Marcar el nuevo requisito como **completado** en el estado de implementación.

## 2. Diagramas (conceptuales, sin código ni tecnologías concretas) ✅ HECHO

- [x] **Casos de uso**: añadido el caso de uso *"Cambiar idioma"* (CU13, actor: Usuario), con la
      detección automática del idioma del navegador recogida en su flujo alternativo.
- [x] **Diagrama de clases / componentes**: añadida la *Preferencia de idioma* como ajuste a nivel
      de aplicación (concepto "Preferencia de idioma" asociado a "Aplicación").
- [x] **Diagrama de secuencia**: añadida la *Figura 4.7 — Cambiar idioma* (selección → actualización
      inmediata de los textos).

## 3. Explicaciones / texto de la memoria ✅ HECHO

- [x] **Justificación de la decisión de diseño**: enfoque en tiempo de compilación vs. tiempo de
      ejecución, y por qué se eligió el segundo.
- [x] **Descripción funcional**: detección automática (español si el navegador está en español,
      inglés en otro caso), persistencia de la preferencia y selector desplegable.
- [x] **Extensibilidad**: la arquitectura permite añadir más idiomas fácilmente (lista de idiomas
      centralizada). Comprobado en la práctica añadiendo indonesio y checo.
- [x] **Accesibilidad**: el idioma activo se refleja en el atributo de idioma de la página.

## 4. Otros apartados a revisar ⏳ PENDIENTE (aún no se ha llegado a esa parte de la memoria)

- [ ] **Resumen / abstract** y **objetivos**: incluir el soporte multilingüe si se enumeran las
      características principales.
- [ ] **Manual de usuario / capturas**: actualizar/añadir capturas que muestren el selector de
      idioma (o la app en otro idioma).
- [ ] **Conclusiones / trabajo futuro**: posible línea futura → añadir más idiomas o traducir
      también los textos generados (nombres de archivo de exportación, etc.).

---

### Notas de implementación (por si las necesitas para redactar, NO para copiar tal cual)

- Idiomas actuales: **Español**, **Inglés**, **Indonesio** y **Checo**.
- Detección inicial: preferencia guardada del usuario → si no existe, idioma del navegador → si no
  coincide con ninguno disponible, **inglés** por defecto.
- El cambio de idioma es **inmediato**, sin recargar la página.
- Quedan SIN traducir a propósito: símbolos de unidades (RPM, °, s) y los nombres de archivo de
  exportación.
