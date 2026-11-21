# Recomendación - REC-TCH-004: Fecha de próximo inicio del Bootcamp vencida con CTAs activos

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-004 |
| Título | Fecha de próximo inicio del Bootcamp vencida con CTAs activos |
| Severidad sugerida | Media |
| Estado | Abierta |
| Módulo | CAP |
| Submódulo | Bootcamp de Testing (BTC) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-05 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-CAP-BTC-005 |
| Regla relacionada | RN-CAP-016 |

---

## Motivo de la clasificación (regla 8 del framework)

PENDIENTE-CONFIRMACIÓN: no justifica un defecto hasta que el responsable la confirme. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}/bootcamp-de-testing/`
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: El hero y el cierre muestran "Inicio: 2 de noviembre de 2026. Admisión por postulación." con fecha de observación 2026-11-21; los CTAs de postulación siguen activos.
- Esperado: La fecha de próximo inicio publicada es igual o posterior a la fecha actual, o se oculta al vencer.

---

## Recomendación

Actualizar la fecha del próximo inicio o reemplazarla por "próximamente" al vencer.

---

## Condición para convertirse en defecto

Se convierte en defecto si el responsable confirma RN-CAP-016 (pregunta abierta 2). En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-CAP-BTC-005 | `test.skip()` PENDING-SPEC (REC-TCH-004) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-05 |
