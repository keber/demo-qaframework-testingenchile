# Recomendación - REC-TCH-009: "Número de personas" acepta 0 y valores negativos

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-009 |
| Título | "Número de personas" acepta 0 y valores negativos |
| Severidad sugerida | Baja |
| Estado | Abierta |
| Módulo | CON |
| Submódulo | Contacto empresa (EMP) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-13 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-CON-EMP-006 |
| Regla relacionada | RN-CON-011 |

---

## Motivo de la clasificación (regla 8 del framework)

PENDIENTE-CONFIRMACIÓN: no justifica un defecto hasta que el responsable la confirme. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}/contacto-empresa/`
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: Los valores `-5` y `0` son válidos (`validity.valid` = true); el campo no declara `min` ni `max`.
- Esperado: Solo enteros mayores o iguales a 1.

---

## Recomendación

Declarar `min="1"` (y un `max` si aplica) en el campo.

---

## Condición para convertirse en defecto

Se convierte en defecto si el responsable confirma RN-CON-011 (pregunta abierta 4). En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-CON-EMP-006 | `test.skip()` PENDING-SPEC (REC-TCH-009) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-13 |
