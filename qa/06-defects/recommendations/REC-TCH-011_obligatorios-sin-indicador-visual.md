# Recomendación - REC-TCH-011: Campos obligatorios sin indicador visual

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-011 |
| Título | Campos obligatorios sin indicador visual |
| Severidad sugerida | Baja |
| Estado | Abierta |
| Módulo | CAP, CON |
| Submódulo | Detalle de curso (CUR), Contacto empresa (EMP) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-15 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-CON-EMP-011 |
| Regla relacionada | RN-CON-015 (buena práctica asociada a WCAG 3.3.2) |

---

## Motivo de la clasificación (regla 8 del framework)

ESTÁNDAR editorial o SEO: buena práctica no confirmada como regla de negocio. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}` (/contacto-empresa/ y formularios de curso)
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: Los campos con `required` no muestran asterisco ni texto que indique obligatoriedad.
- Esperado: Cada etiqueta obligatoria muestra un indicador visible.

---

## Recomendación

Agregar un asterisco con leyenda "Campos obligatorios" o el texto "(obligatorio)".

---

## Condición para convertirse en defecto

Se convierte en defecto solo si el responsable eleva la buena práctica a regla. En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-CON-EMP-011 | `test.skip()` PENDING-SPEC (REC-TCH-011) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-15 |
