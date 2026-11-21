# Recomendación - REC-TCH-001: Términos y Condiciones contiene solo el texto de ayuda de la plantilla Webnode

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-001 |
| Título | Términos y Condiciones contiene solo el texto de ayuda de la plantilla Webnode |
| Severidad sugerida | Alta |
| Estado | Abierta |
| Módulo | LEG |
| Submódulo | Páginas legales (LGL) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-01 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-LEG-LGL-002 |
| Regla relacionada | RN-LEG-002 |

---

## Motivo de la clasificación (regla 8 del framework)

PENDIENTE-CONFIRMACIÓN: no justifica un defecto hasta que el responsable la confirme. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}/terminos-y-condiciones/`
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: El cuerpo único de la página es el texto de ayuda de la plantilla: "Aviso legal: como propietario de una tienda online, debe publicar usted mismo los Términos y Condiciones...". No hay términos propios, aunque el sitio vende cursos y entradas.
- Esperado: Términos que describan la relación real con el usuario: servicios, pagos, devoluciones y responsable.

---

## Recomendación

Redactar y publicar Términos y Condiciones propios, validados por el área legal. Escalar a negocio y área legal.

---

## Condición para convertirse en defecto

Se convierte en defecto si el responsable confirma RN-LEG-002 (pregunta abierta 5). En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-LEG-LGL-002 | `test.skip()` PENDING-SPEC (REC-TCH-001) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-01 |
