# Reporte de defecto - DEF-TCH-001: Enlace interno "Saber más de esta edición" (2018) responde 404

| Campo | Valor |
|-------|-------|
| ID | DEF-TCH-001 |
| Título | Enlace interno "Saber más de esta edición" (2018) responde 404 |
| Severidad | Media |
| Prioridad | P2 |
| Estado | Abierto |
| Asignado a | Sin asignar (responsable del sitio) |
| Módulo | EVT - Eventos Testing Day |
| Submódulo | Ediciones anteriores (EDI) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Navegador | Chromium (Playwright 1.65.1) y solicitudes HTTP de solo lectura |
| Fecha de reporte | 2026-11-21 |
| ADO WI | No aplica (integración deshabilitada) |
| Hallazgo origen | HC-03 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-EVT-EDI-003 |

---

## Verificación de problemas conocidos

| Campo | Valor |
|-------|-------|
| Fuente consultada | `qa/06-defects/` (open, disputed, resolved, recommendations); no existe tracker externo |
| Términos buscados | Síntoma del hallazgo HC-03 (URL afectada y tipo de falla), no el ID del caso |
| Coincidencias | Ninguna |
| Clasificación | Defecto nuevo |
| Regla violada | RN-EVT-015 (ESTÁNDAR: los enlaces internos de las páginas de edición no están rotos; HTTP 404 = recurso inexistente) |

---

## Descripción

En la página de ediciones anteriores, el enlace "Saber más de esta edición" del bloque 2018 apunta a una página interna que no existe y responde HTTP 404.

---

## Pasos para reproducir

| Paso | Acción |
|------|--------|
| 1 | Navegar a `{QA_BASE_URL}/testing-day-chile-ediciones-anteriores/` como visitante anónimo |
| 2 | Localizar el bloque de la edición 2018 |
| 3 | Leer el `href` de "Saber más de esta edición": `https://www.testingenchile.cl/testing-day-en-latam-2018/` (`target=_blank`) |
| 4 | Solicitar la URL (GET) y observar el código de estado |

---

## Resultado esperado

Según RN-EVT-015, todo enlace interno de una página de edición lleva a una página publicada (HTTP 200).

---

## Resultado actual

`/testing-day-en-latam-2018/` responde HTTP 404 ("404 - Página no encontrada").

---

## Evidencia

- 2026-11-21 (exploración etapas 1-2): enlace presente y destino con HTTP 404
- 2026-11-21 12:41 -03:00 (reverificación de solo lectura con curl): el `href` sigue presente en la página y el destino responde 404
- Captura: se generará en `qa/07-automation/e2e/diagnosis/` (no versionado) al automatizar el caso en la etapa 5

---

## Análisis de causa raíz

Probable (no confirmado por el responsable del sitio): Página de la edición 2018 eliminada o renombrada en el CMS sin actualizar el enlace.

---

## Sugerencia de corrección

Publicar la página de la edición 2018 o actualizar/retirar el enlace del bloque 2018.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 | Impacto |
|-------|---------------------|---------|
| TC-EVT-EDI-003 | `test.fail()` vía `expectOpenDefect('DEF-TCH-001', ...)` | La aserción de la especificación se mantiene; la ejecución queda en verde mientras el defecto se reproduzca y pasa a rojo cuando se corrija |

**Marcador previsto en la etapa 5** (patrón de `fixtures/defects.ts`):

```typescript
await expectOpenDefect('DEF-TCH-001', 'Enlace interno "Saber más de esta edición" (2018) responde 404', async () => {
  // aserción de la especificación sobre los valores ya observados (nunca invertida)
});
```

---

## Instrucciones de reactivación

Cuando el sitio se corrija:
1. Retirar `expectOpenDefect` del caso y dejar la aserción como `test()` normal
2. Ejecutar el caso al menos 2 veces con distintos `EXEC_IDX` para confirmar estabilidad
3. Mover este archivo a `qa/06-defects/resolved/`

---

## Historial de cambios

| Versión | Fecha | Descripción |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Defecto reportado en la etapa 3 a partir de HC-03, con reverificación de solo lectura |
