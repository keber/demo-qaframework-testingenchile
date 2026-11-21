# Recomendación - REC-TCH-012: Formularios sin enlace a la política de privacidad ni consentimiento

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-012 |
| Título | Formularios sin enlace a la política de privacidad ni consentimiento |
| Severidad sugerida | Media |
| Estado | Abierta |
| Módulo | CAP, CON |
| Submódulo | Detalle de curso (CUR), Contacto empresa (EMP) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-16 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-CAP-CUR-009, TC-CON-EMP-009 |
| Regla relacionada | RN-CAP-015, RN-CON-013 |

---

## Motivo de la clasificación (regla 8 del framework)

PENDIENTE-CONFIRMACIÓN: no justifica un defecto hasta que el responsable la confirme. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}` (/aiugenaia/, /contacto-empresa/)
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: En `/aiugenaia/` la casilla de consentimiento no enlaza a la política de privacidad; el formulario de `/contacto-empresa/` recolecta datos personales sin consentimiento ni enlace.
- Esperado: Todo formulario que recolecta datos personales informa la política de privacidad.

---

## Recomendación

Agregar un enlace a la política (y una casilla de consentimiento en el formulario empresa). Depende de REC-TCH-002.

---

## Condición para convertirse en defecto

Se convierte en defecto si el responsable confirma RN-CAP-015 y RN-CON-013 (pregunta abierta 6). En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-CAP-CUR-009 | `test.skip()` PENDING-SPEC (REC-TCH-012) |
| TC-CON-EMP-009 | `test.skip()` PENDING-SPEC (REC-TCH-012) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-16 |
