# Recomendación - REC-TCH-010: Errores de ortografía en etiquetas del formulario empresa

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-010 |
| Título | Errores de ortografía en etiquetas del formulario empresa |
| Severidad sugerida | Baja |
| Estado | Abierta |
| Módulo | CON |
| Submódulo | Contacto empresa (EMP) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-14 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-CON-EMP-010 |
| Regla relacionada | RN-CON-014 |

---

## Motivo de la clasificación (regla 8 del framework)

ESTÁNDAR editorial o SEO: buena práctica no confirmada como regla de negocio. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}/contacto-empresa/`
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: Etiqueta "Indícanos que capacitación estas interesado" y opción "Si" (sin tilde).
- Esperado: "¿En qué capacitación estás interesado?" (o equivalente correcto) y "Sí".

---

## Recomendación

Corregir los textos en el editor del formulario.

---

## Condición para convertirse en defecto

Se convierte en defecto solo si el responsable eleva el criterio editorial a regla. En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-CON-EMP-010 | `test.skip()` PENDING-SPEC (REC-TCH-010) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-14 |
