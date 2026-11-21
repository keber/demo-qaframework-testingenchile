# Recomendación - REC-TCH-003: Evento 2026 finalizado mantiene CTAs de compra e inscripción

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-003 |
| Título | Evento 2026 finalizado mantiene CTAs de compra e inscripción |
| Severidad sugerida | Media |
| Estado | Abierta |
| Módulo | EVT |
| Submódulo | Testing Day Chile (TDY) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-04 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-EVT-TDY-010 |
| Regla relacionada | RN-EVT-010 |

---

## Motivo de la clasificación (regla 8 del framework)

PENDIENTE-CONFIRMACIÓN: no justifica un defecto hasta que el responsable la confirme. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}/testing-day-chile/`
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: El evento (27 y 28 de agosto de 2026) ya se realizó (el blog lo confirma el 04.09.2026), pero se mantienen "Asegura tu entrada", "Comprar Entrada" (pre-venta) e "Inscribirse", y el menú sigue anunciando "Testing Day Chile 2026".
- Esperado: Entre ediciones, la página comunica que el evento finalizó y no ofrece compra ni inscripción.

---

## Recomendación

Definir un estado "evento finalizado" (resumen, grabaciones, próxima fecha) y retirar los CTAs de compra.

---

## Condición para convertirse en defecto

Se convierte en defecto si el responsable confirma RN-EVT-010 (pregunta abierta 1). En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-EVT-TDY-010 | `test.skip()` PENDING-SPEC (REC-TCH-003) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-04 |
