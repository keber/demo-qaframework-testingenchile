# Recomendación - REC-TCH-017: El autodiagnóstico del Bootcamp registra una conversión "purchase" sin compra

| Campo | Valor |
|-------|-------|
| ID | REC-TCH-017 |
| Título | El autodiagnóstico del Bootcamp registra una conversión "purchase" sin compra |
| Severidad sugerida | Media |
| Estado | Abierta |
| Módulo | CAP |
| Submódulo | Bootcamp de Testing (BTC) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Fecha de observación | 2026-11-21 |
| Hallazgo origen | HC-21 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-CAP-BTC-008 |
| Regla relacionada | Sin regla (calidad de datos analíticos; pregunta abierta 8) |

---

## Motivo de la clasificación (regla 8 del framework)

Ninguna regla de negocio exige el comportamiento. Por eso se registra como recomendación y no como defecto: nunca justifica un `test.fail()`.

---

## Evidencia

- URL: `{QA_BASE_URL}/bootcamp-de-testing/`
- Fecha: 2026-11-21 (exploración de solo lectura, etapas 1-2)
- Observado: Al pulsar "Ver mi orientación" se envía un POST a `pagead2.googlesyndication.com/pagead/conversion/...` con `bttype=purchase`.
- Esperado: Las conversiones de compra se registran solo ante compras reales.

---

## Recomendación

Revisar la configuración de la etiqueta de Google Ads del autodiagnóstico. Mientras tanto, toda la automatización bloquea `googlesyndication.com`, `googleadservices.com` y `googletagmanager.com` para no contaminar las métricas.

---

## Condición para convertirse en defecto

Se convierte en defecto solo si el responsable declara que la conversión no es intencional y lo define como regla. En ese caso, el archivo se mueve a `qa/06-defects/open/` con un nuevo `DEF-TCH-NNN` que cite la regla confirmada, y este ID queda retirado con una nota.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 |
|-------|---------------------|
| TC-CAP-BTC-008 | Fuera de la suite automatizada (ejecución manual) |

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Recomendación registrada en la etapa 3 a partir de HC-21 |
