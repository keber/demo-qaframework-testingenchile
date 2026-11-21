# Recomendación - REC-TCH-014: Número de WhatsApp distinto en el botón "Hablemos" del catálogo

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-014 |
| Título | Número de WhatsApp distinto en el botón "Hablemos" del catálogo |
| Severidad sugerida | Baja |
| Estado | Abierta |
| Módulo | CAP |
| Submódulo | Catálogo (CAT) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-18 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-CAP-CAT-006 |
| Regla relacionada | Sin regla (pregunta abierta 7) |

---

## Motivo de la clasificación (regla 8 del framework)

Ninguna regla de negocio exige el comportamiento. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}/capacitaciones2/`
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: El botón "Hablemos" usa `wa.me/569XXXX7767`, distinto del número general `wa.me/569XXXX0587` (números enmascarados).
- Esperado: No definido: puede ser un canal Sence intencional.

---

## Recomendación

Confirmar si el número es intencional; si no, unificarlo.

---

## Condición para convertirse en defecto

Se convierte en defecto solo si el responsable define el número correcto como regla. En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-CAP-CAT-006 | `test()` (pasa) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-18 |
