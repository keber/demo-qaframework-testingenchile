# Recomendación - REC-TCH-002: Política de privacidad de plantilla sin completar y banner de cookies sin enlace

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-002 |
| Título | Política de privacidad de plantilla sin completar y banner de cookies sin enlace |
| Severidad sugerida | Alta |
| Estado | Abierta |
| Módulo | LEG |
| Submódulo | Páginas legales (LGL) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-02 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-LEG-LGL-003, TC-LEG-LGL-004, TC-LEG-LGL-006 |
| Regla relacionada | RN-LEG-003, RN-LEG-004, RN-LEG-005 |

---

## Motivo de la clasificación (regla 8 del framework)

PENDIENTE-CONFIRMACIÓN: no justifica un defecto hasta que el responsable la confirme. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}/politica-de-privacidad/`
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: La política es una plantilla de tienda online sin completar: "La Tienda [...] en la página web [...] con número de identificación [...]"; menciona envíos y RGPD y no describe los tratamientos reales. El banner de cookies no contiene enlaces a información de cookies.
- Esperado: Política que identifique al responsable, los tratamientos reales (formularios, analítica, WhatsApp) y un canal para ejercer derechos; banner con enlace a la información de cookies.

---

## Recomendación

Redactar la política conforme a la Ley 19.628 y a los tratamientos reales del sitio; enlazarla desde el banner de cookies y desde los formularios. Escalar a negocio y área legal. El análisis de QA no constituye una evaluación jurídica.

---

## Condición para convertirse en defecto

Se convierte en defecto si el responsable confirma RN-LEG-003 a RN-LEG-005 (pregunta abierta 5). En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-LEG-LGL-003 | `test.skip()` PENDING-SPEC (REC-TCH-002) |
| TC-LEG-LGL-004 | Fuera de la suite automatizada (ejecución manual) |
| TC-LEG-LGL-006 | `test.skip()` PENDING-SPEC (REC-TCH-002) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-02 |
