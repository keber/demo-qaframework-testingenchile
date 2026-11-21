# Recomendación - REC-TCH-007: Meta description vacía o no representativa

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-007 |
| Título | Meta description vacía o no representativa |
| Severidad sugerida | Baja |
| Estado | Abierta |
| Módulo | Transversal |
| Submódulo | Agenda Online, blog, páginas legales |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-11 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-EVT-TDY-012, TC-LEG-BLG-008, TC-LEG-LGL-007 |
| Regla relacionada | RN-EVT-012, RN-LEG-012, RN-LEG-006 |

---

## Motivo de la clasificación (regla 8 del framework)

ESTÁNDAR editorial o SEO: buena práctica no confirmada como regla de negocio. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}` (/agenda-online/, /blog/, páginas legales)
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: Description vacía en `/agenda-online/` y `/blog/`; en las páginas legales repite el texto de contacto del footer.
- Esperado: Description no vacía que resuma el contenido de cada página.

---

## Recomendación

Completar la meta description en la configuración SEO de cada página.

---

## Condición para convertirse en defecto

Se convierte en defecto solo si el responsable eleva el criterio SEO a regla. En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-EVT-TDY-012 | `test.skip()` PENDING-SPEC (REC-TCH-005, REC-TCH-006, REC-TCH-007, REC-TCH-016) |
| TC-LEG-BLG-008 | `test.skip()` PENDING-SPEC (REC-TCH-005, REC-TCH-007) |
| TC-LEG-LGL-007 | `test.skip()` PENDING-SPEC (REC-TCH-007) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-11 |
