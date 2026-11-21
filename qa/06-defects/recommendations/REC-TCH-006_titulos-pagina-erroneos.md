# Recomendación - REC-TCH-006: Títulos de página con errores o poco descriptivos

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-006 |
| Título | Títulos de página con errores o poco descriptivos |
| Severidad sugerida | Baja |
| Estado | Abierta |
| Módulo | Transversal |
| Submódulo | Varias páginas |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-10 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-LEG-GAL-005, TC-EVT-EDI-004, TC-EVT-TDY-012, TC-CAP-CAT-007 |
| Regla relacionada | RN-LEG-016, RN-EVT-012, RN-CAP-006 (ESTÁNDAR editorial) y RN-EVT-016 (PENDIENTE-CONFIRMACIÓN) |

---

## Motivo de la clasificación (regla 8 del framework)

ESTÁNDAR editorial o SEO: buena práctica no confirmada como regla de negocio. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}` (/galeria/ y otras)
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: `/galeria/`: "CapTI de Tesitng en Chile"; `/entrevistas-sponsors-2021/` dice "Testing Day Chile 2022"; `/nuestros-sponsors-2026/`: "Nuestros sponsor"; títulos genéricos ("Capacitaciones", "Bootcamp", "Agenda", "New ISTQB®") y sufijos inconsistentes.
- Esperado: Títulos sin errores tipográficos, con el año correcto y que identifiquen la página y el sitio.

---

## Recomendación

Corregir los títulos en la configuración SEO de cada página.

---

## Condición para convertirse en defecto

El año incorrecto se convierte en defecto si se confirma RN-EVT-016; el resto, si el responsable eleva el criterio editorial a regla. En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-LEG-GAL-005 | `test.skip()` PENDING-SPEC (REC-TCH-006) |
| TC-EVT-EDI-004 | `test.skip()` PENDING-SPEC (REC-TCH-006) |
| TC-EVT-TDY-012 | `test.skip()` PENDING-SPEC (REC-TCH-005, REC-TCH-006, REC-TCH-007, REC-TCH-016) |
| TC-CAP-CAT-007 | `test.skip()` PENDING-SPEC (REC-TCH-005, REC-TCH-006) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-10 |
