# Recomendación - REC-TCH-013: Perfiles sociales inconsistentes entre páginas

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-013 |
| Título | Perfiles sociales inconsistentes entre páginas |
| Severidad sugerida | Baja |
| Estado | Abierta |
| Módulo | HOME, CON |
| Submódulo | Navegación global (NAV), Página de contacto (FCO) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-17 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-HOME-NAV-013, TC-CON-FCO-004 |
| Regla relacionada | RN-HOME-013 |

---

## Motivo de la clasificación (regla 8 del framework)

PENDIENTE-CONFIRMACIÓN: no justifica un defecto hasta que el responsable la confirme. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}` (/ y /formulario-contacto/)
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: El footer enlaza `linkedin.com/company/testingenchile`; `/formulario-contacto/` enlaza un perfil personal de LinkedIn; se mezclan Twitter y X.
- Esperado: Cada red social apunta al mismo perfil oficial en todo el sitio.

---

## Recomendación

Unificar los enlaces de redes en todas las páginas con los perfiles oficiales.

---

## Condición para convertirse en defecto

Se convierte en defecto si el responsable confirma RN-HOME-013. En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-HOME-NAV-013 | `test.skip()` PENDING-SPEC (REC-TCH-013) |
| TC-CON-FCO-004 | `test()` (pasa) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-17 |
