# Recomendación - REC-TCH-018: "Ver detalles de la edición más reciente" apunta a la edición 2022

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-018 |
| Título | "Ver detalles de la edición más reciente" apunta a la edición 2022 |
| Severidad sugerida | Baja |
| Estado | Abierta |
| Módulo | EVT |
| Submódulo | Ediciones anteriores (EDI) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-22 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-EVT-EDI-007 |
| Regla relacionada | RN-EVT-018 |

---

## Motivo de la clasificación (regla 8 del framework)

PENDIENTE-CONFIRMACIÓN: no justifica un defecto hasta que el responsable la confirme. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}/testing-day-chile-ediciones-anteriores/`
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: El enlace apunta a la edición 2022, aunque están publicadas las ediciones 2023, 2024 y 2025.
- Esperado: El enlace apunta a la última edición publicada.

---

## Recomendación

Actualizar el enlace a la edición más reciente o cambiar su texto.

---

## Condición para convertirse en defecto

Se convierte en defecto si el responsable confirma RN-EVT-018. En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-EVT-EDI-007 | `test.skip()` PENDING-SPEC (REC-TCH-018) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-22 |
