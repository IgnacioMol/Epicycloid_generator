# 📌 Recordatorio — Actualizar la memoria del TFG por la i18n

> Cambio realizado: se ha añadido **soporte multilingüe (Español / Inglés)** a la aplicación,
> con detección automática del idioma del navegador y un **selector desplegable** para cambiarlo
> manualmente. Implementado en la rama `feature/i18n` (fusionada a `main`).
>
> Este archivo lista lo que conviene tocar en la **memoria** (no en el código) para que el documento
> refleje la nueva funcionalidad. Bórralo cuando lo hayas incorporado.

---

## 1. Requisitos

- [ ] **Añadir un requisito nuevo** para la internacionalización. Encaja mejor como **RNF de
      usabilidad/accesibilidad** (la app debe estar disponible en español e inglés, detectando el
      idioma del navegador y permitiendo el cambio manual). Si prefieres tratarlo como funcionalidad
      explícita del usuario, puede ir como **RF** ("el usuario puede cambiar el idioma de la interfaz").
- [ ] **Renumerar / actualizar la tabla de requisitos** si añades uno nuevo (recuerda mantener la
      numeración canónica RF1–RF13 / RNF1–RNF12 coherente).
- [ ] Marcar el nuevo requisito como **completado** en el estado de implementación.

## 2. Diagramas (conceptuales, sin código ni tecnologías concretas)

- [ ] **Casos de uso**: añadir el caso de uso *"Cambiar idioma de la interfaz"* (actor: Usuario).
      Opcional: indicar que la selección inicial de idioma es automática (según el navegador).
- [ ] **Diagrama de clases / componentes**: reflejar el nuevo módulo de internacionalización
      (un servicio de idioma que mantiene el idioma activo y traduce los textos, más el origen de
      datos de traducciones). Mantenerlo a nivel conceptual: "Servicio de Idioma", "Diccionario de
      textos", sin nombrar Angular, pipes, JSON, signals, etc.
- [ ] **Diagrama de secuencia**: opcionalmente, uno que muestre el flujo *"el usuario selecciona un
      idioma → la interfaz se actualiza"* y/o *"al abrir la app se detecta el idioma del navegador"*.

## 3. Explicaciones / texto de la memoria

- [ ] **Justificación de la decisión de diseño** (apartado valioso para el TFG): comparar el enfoque
      de internacionalización **en tiempo de compilación** (un build por idioma, sin cambio en
      caliente) frente al enfoque **en tiempo de ejecución** (textos externos en diccionarios,
      cambio instantáneo), y argumentar por qué se eligió el segundo (cambio sin recargar, detección
      del idioma del navegador, despliegue simple).
- [ ] **Descripción funcional**: explicar la detección automática (español si el navegador está en
      español, inglés en cualquier otro caso), la persistencia de la preferencia del usuario y el
      selector desplegable.
- [ ] **Extensibilidad**: mencionar que la arquitectura permite **añadir más idiomas** fácilmente
      (la lista de idiomas del selector se genera de forma centralizada).
- [ ] **Accesibilidad**: el idioma activo se refleja en el documento (atributo de idioma de la
      página), lo cual es buena práctica de accesibilidad.

## 4. Otros apartados a revisar

- [ ] **Resumen / abstract** y **objetivos**: si mencionas las características principales de la
      aplicación, incluir el soporte multilingüe.
- [ ] **Manual de usuario / capturas**: si la memoria incluye capturas de la interfaz, actualizar
      alguna que muestre el selector de idioma (o añadir una con la app en inglés).
- [ ] **Conclusiones / trabajo futuro**: posible línea futura → añadir más idiomas, o traducir
      también los textos generados (nombres de archivo de exportación, etc.).

---

### Notas de implementación (por si las necesitas para redactar, NO para copiar tal cual)

- Idiomas actuales: **Español** e **Inglés**.
- Detección inicial: preferencia guardada del usuario → si no existe, idioma del navegador → si no
  coincide con ninguno disponible, **inglés** por defecto.
- El cambio de idioma es **inmediato**, sin recargar la página.
- Quedan SIN traducir a propósito: símbolos de unidades (RPM, °, s) y los nombres de archivo de
  exportación.
