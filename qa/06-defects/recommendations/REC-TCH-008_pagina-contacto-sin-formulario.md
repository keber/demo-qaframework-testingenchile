# Recomendación - REC-TCH-008: La página "Contacto" no tiene formulario y los correos no son enlaces

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-008 |
| Título | La página "Contacto" no tiene formulario y los correos no son enlaces |
| Severidad sugerida | Media |
| Estado | Abierta |
| Módulo | CON |
| Submódulo | Página de contacto (FCO) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-12 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-CON-FCO-005, TC-CON-FCO-007 |
| Regla relacionada | RN-CON-005 (PENDIENTE-CONFIRMACIÓN); el enlace `mailto:` no tiene regla |

---

## Motivo de la clasificación (regla 8 del framework)

PENDIENTE-CONFIRMACIÓN: no justifica un defecto hasta que el responsable la confirme. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}/formulario-contacto/`
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: La página enlazada desde "Contacto" (`/formulario-contacto/`) tiene 0 elementos `form`; los correos del footer son texto plano, no enlaces `mailto:`.
- Esperado: Un medio para escribir al sitio desde la página de contacto (formulario o `mailto:`).

---

## Recomendación

Agregar un formulario de contacto (con información de privacidad) o convertir los correos en enlaces `mailto:`.

---

## Condición para convertirse en defecto

Se convierte en defecto si el responsable confirma RN-CON-005 (pregunta abierta 3). En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-CON-FCO-005 | `test.skip()` PENDING-SPEC (REC-TCH-008) |
| TC-CON-FCO-007 | `test.skip()` PENDING-SPEC (REC-TCH-008) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-12 |
