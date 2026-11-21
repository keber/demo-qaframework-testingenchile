# Recomendación - REC-TCH-005: Jerarquía de H1 inválida: múltiples H1, H1 vacíos o ausentes

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-005 |
| Título | Jerarquía de H1 inválida: múltiples H1, H1 vacíos o ausentes |
| Severidad sugerida | Baja |
| Estado | Abierta |
| Módulo | Transversal |
| Submódulo | Varias páginas |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-09 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-HOME-POR-008, TC-CAP-CAT-007, TC-EVT-EDI-008, TC-EVT-TDY-012, TC-CON-FCO-006, TC-LEG-BLG-008, TC-LEG-GAL-007 |
| Regla relacionada | RN-HOME-020, RN-CAP-006, RN-CON-006, RN-EVT-012, RN-LEG-012 |

---

## Motivo de la clasificación (regla 8 del framework)

ESTÁNDAR editorial o SEO: buena práctica no confirmada como regla de negocio. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}` (/ y otras)
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: `/` tiene 5 H1; `/certificacion-automatizacion-pruebas-software-selenium/` 14; `/charlas-talleres-testing-day-chile-2022/` 18; `/galeria/` 9; `/formulario-contacto/` 2; sin H1 en `/capacitaciones2/`, `/blog/` y `/agenda2025/`; H1 vacío en `/nuestros-sponsors-2026/` y `/testing-day-chile-2025/`.
- Esperado: Un único H1 descriptivo por página.

---

## Recomendación

Ajustar los encabezados en Webnode: un H1 por página y H2 para secciones y álbumes.

---

## Condición para convertirse en defecto

Se convierte en defecto solo si el responsable eleva la buena práctica SEO a regla de negocio. En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-HOME-POR-008 | `test.skip()` PENDING-SPEC (REC-TCH-005) |
| TC-CAP-CAT-007 | `test.skip()` PENDING-SPEC (REC-TCH-005, REC-TCH-006) |
| TC-EVT-EDI-008 | `test.skip()` PENDING-SPEC (REC-TCH-005) |
| TC-EVT-TDY-012 | `test.skip()` PENDING-SPEC (REC-TCH-005, REC-TCH-006, REC-TCH-007, REC-TCH-016) |
| TC-CON-FCO-006 | `test.skip()` PENDING-SPEC (REC-TCH-005) |
| TC-LEG-BLG-008 | `test.skip()` PENDING-SPEC (REC-TCH-005, REC-TCH-007) |
| TC-LEG-GAL-007 | `test.skip()` PENDING-SPEC (REC-TCH-005) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-09 |
