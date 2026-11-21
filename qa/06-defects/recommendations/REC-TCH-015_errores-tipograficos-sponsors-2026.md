# Recomendación - REC-TCH-015: Errores tipográficos en la página Sponsors 2026

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-015 |
| Título | Errores tipográficos en la página Sponsors 2026 |
| Severidad sugerida | Baja |
| Estado | Abierta |
| Módulo | EVT |
| Submódulo | Testing Day Chile (TDY) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-19 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | Ninguno |
| Regla relacionada | Sin regla |

---

## Motivo de la clasificación (regla 8 del framework)

Ninguna regla de negocio exige el comportamiento. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}/nuestros-sponsors-2026/`
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: "QAlifield" (el sponsor es "QAlified"), "nuestramisión", "acompañándolosen".
- Esperado: Textos sin errores tipográficos y nombres de sponsors correctos.

---

## Recomendación

Corregir los textos en el editor.

---

## Condición para convertirse en defecto

Sin TC asociado; se registra para corrección editorial. En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

Sin caso asociado: se corrige por revisión editorial.

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-19 |
