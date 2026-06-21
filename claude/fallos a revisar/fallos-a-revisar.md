# Fallos a revisar — Memoria TFG

> Documento de seguimiento de errores e incoherencias detectados en el documento maestro
> [`Generador de imágenes basadas en patrones orbitales y su integración a Aplicación Web.md`](../Generador%20de%20imágenes%20basadas%20en%20patrones%20orbitales%20y%20su%20integración%20a%20Aplicación%20Web.md).
> Revisión realizada el 2026-06-21.

---

## 1. Incoherencias estructurales (importantes)

### 1.1. Capítulo 5 desactualizado: diagramas por operación en vez de por función
- **Dónde:** documento maestro, §5.1 (líneas ~1285–1315).
- **Problema:** el capítulo 5 del documento maestro sigue con los diagramas de secuencia **por operación** (Generar/reproducir, Deshacer, Exportar, Importar y Cambiar idioma — 5 figuras). El rediseño acordado **por función** (`draw()`, `removeLastSession()`, `buildExportCanvas()`, `onFileSelected()`) solo está en el borrador `memoria-cap5-diseno.md`, no se ha portado al maestro.
- **Acción:** portar el enfoque por funciones al documento maestro. Decidir qué hacer con el diagrama "Cambiar idioma" (convertirlo en función `setLang()`/`detectInitialLang()` o eliminarlo).

### 1.2. Divergencia de numeración: Pruebas y Conclusiones
- **Dónde:** documento maestro, §6.3–6.5 (líneas ~1545–1557).
- **Problema:** en el maestro las **pruebas** van como §6.3–6.5 y **Conclusiones** es el capítulo 7. En los borradores, las pruebas son el capítulo 7 independiente (`memoria-cap7-pruebas.md`).
- **Acción:** unificar el criterio de numeración entre maestro y borradores.

---

## 2. Erratas y datos incoherentes

### 2.1. Tabla de costes de personal — salario del Jefe de Proyecto
- **Dónde:** líneas ~695 y ~703–708.
- **Problema:** el texto indica salario bruto anual del Jefe de Proyecto de **45.000 €**, pero la tabla pone **35.000 €**.
- **Acción:** corregir para que texto y tabla coincidan.

### 2.2. Tabla de costes de personal — fila "Total" sin sentido
- **Dónde:** líneas ~703–708.
- **Problema:** la fila "Total" suma columnas que no deben sumarse: salario anual = 110.000 €, salario mensual = 10.000 €, coste por hora = 56,46 €. Estas no son agregaciones válidas.
- **Acción:** eliminar o recalcular esos totales (mantener solo los totales con sentido: horas y coste total).

### 2.3. Horas estimadas incoherentes
- **Dónde:** estimación temporal (~677) vs. tabla de costes (~705–708).
- **Problema:** el texto de planificación habla de **346,86 h** (315,33 h + 10 % de contingencia), pero la tabla de costes usa **330 h**.
- **Acción:** aclarar cuál es la cifra oficial y unificarla.

### 2.4. RNF1 sin etiqueta
- **Dónde:** línea ~431.
- **Problema:** el primer requisito no funcional empieza con "La aplicación deberá ser accesible…" sin el identificador **RNF1**, a diferencia del resto (RNF2–RNF12).
- **Acción:** añadir la etiqueta **RNF1**.

### 2.5. Objetivo sin viñeta
- **Dónde:** línea ~47.
- **Problema:** el objetivo "Implementar funcionalidades que permitan la exportación…" se quedó sin el guion de lista que tienen los demás objetivos específicos.
- **Acción:** añadir la viñeta para mantener el formato de lista.

### 2.6. Frase truncada en el diálogo de exportación
- **Dónde:** línea ~1409.
- **Problema:** "…cuando el usuario decide guardar la composición como." — falta la palabra "imagen".
- **Acción:** completar la frase ("…guardar la composición como imagen.").

### 2.7. Encabezado 2.1.3 sin formato de título
- **Dónde:** línea ~163.
- **Problema:** "2.1.3 Análisis visual de aplicaciones similares" no lleva los `##` de Markdown como el resto de encabezados de nivel similar.
- **Acción:** añadir el formato de encabezado `##`.

---

## 3. Otros puntos menores a vigilar

- Viñetas vacías sueltas en las listas de tecnologías (p. ej. líneas ~267, ~285, ~313): hay guiones de lista sin contenido.
- Referencia "(sección X.X)" sin resolver en §2.1.4 (línea ~187): pendiente de sustituir por la sección real.
- Varias menciones a "Tabla X" / "(NUMERO TABLA)" sin numerar (p. ej. líneas ~701, ~747, ~771).
- Fórmula PERT omitida como imagen (línea ~585): confirmar que se renderiza en la versión final.

---

## Checklist de corrección

- [x] 1.1 Portar diagramas por función al capítulo 5 del maestro
- [x] 1.2 Unificar numeración de Pruebas/Conclusiones
- [ ] 2.1 Corregir salario Jefe de Proyecto (texto vs. tabla)
- [ ] 2.2 Arreglar fila "Total" de la tabla de costes
- [ ] 2.3 Unificar horas estimadas (346,86 vs. 330)
- [ ] 2.4 Añadir etiqueta RNF1
- [ ] 2.5 Añadir viñeta al objetivo de exportación
- [ ] 2.6 Completar frase truncada ("…como imagen")
- [ ] 2.7 Formato de encabezado 2.1.3
- [ ] 3. Revisar viñetas vacías, referencias y numeración de tablas
