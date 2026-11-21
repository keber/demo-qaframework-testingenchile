# Recomendación - REC-TCH-016: El título anuncia "GRATUITO" aunque la entrada presencial es pagada

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-016 |
| Título | El título anuncia "GRATUITO" aunque la entrada presencial es pagada |
| Severidad sugerida | Baja |
| Estado | Abierta |
| Módulo | EVT |
| Submódulo | Testing Day Chile (TDY) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-20 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-EVT-TDY-012 |
| Regla relacionada | RN-EVT-012 (ESTÁNDAR editorial) |

---

## Motivo de la clasificación (regla 8 del framework)

ESTÁNDAR editorial o SEO: buena práctica no confirmada como regla de negocio. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}/testing-day-chile/`
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: El `<title>` incluye "GRATUITO" y la tarjeta "Entrada Presencial" ofrece "Comprar Entrada".
- Esperado: Título coherente con las modalidades del evento (por ejemplo, "online gratuito").

---

## Recomendación

Precisar en el título qué modalidad es gratuita.

---

## Condición para convertirse en defecto

Se convierte en defecto solo si el responsable eleva el criterio editorial a regla. En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-EVT-TDY-012 | `test.skip()` PENDING-SPEC (REC-TCH-005, REC-TCH-006, REC-TCH-007, REC-TCH-016) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-20 |
