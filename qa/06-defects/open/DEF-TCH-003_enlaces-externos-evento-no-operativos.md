# Reporte de defecto - DEF-TCH-003: Logo de sponsor enlaza a un dominio inexistente y sitio de hotel sin respuesta

| Campo | Valor |
|-------|-------|
| ID | DEF-TCH-003 |
| Título | Logo de sponsor enlaza a un dominio inexistente y sitio de hotel sin respuesta |
| Severidad | Baja |
| Prioridad | P3 |
| Estado | Abierto |
| Asignado a | Sin asignar (responsable del sitio) |
| Módulo | EVT - Eventos Testing Day |
| Submódulo | Testing Day Chile (TDY) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Navegador | Chromium (Playwright 1.65.1) y solicitudes HTTP de solo lectura |
| Fecha de reporte | 2026-11-21 |
| ADO WI | No aplica (integración deshabilitada) |
| Hallazgo origen | HC-07 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-EVT-TDY-009 |

---

## Verificación de problemas conocidos

| Campo | Valor |
|-------|-------|
| Fuente consultada | `qa/06-defects/` (open, disputed, resolved, recommendations); no existe tracker externo |
| Términos buscados | Síntoma del hallazgo HC-07 (URL afectada y tipo de falla), no el ID del caso |
| Coincidencias | Ninguna |
| Clasificación | Defecto nuevo |
| Regla violada | RN-EVT-009 (ESTÁNDAR: los enlaces externos del evento están operativos) |

---

## Descripción

En la página del evento, el logo de un sponsor enlaza a un dominio que no resuelve en DNS y el enlace de un hotel no responde.

---

## Pasos para reproducir

| Paso | Acción |
|------|--------|
| 1 | Navegar a `{QA_BASE_URL}/testing-day-chile/` como visitante anónimo |
| 2 | Recopilar los `href` externos de logos de sponsors, comunidades y hoteles |
| 3 | Solicitar `https://mendezdistribucion.com/` y `https://www.hotelvegassantiago.com/` (GET, tiempo límite 20 s) |
| 4 | Observar el resultado de cada solicitud |

---

## Resultado esperado

Según RN-EVT-009, cada enlace externo del evento resuelve y responde 2xx o 3xx (salvo bloqueos anti-bot documentados).

---

## Resultado actual

`mendezdistribucion.com`: el host no resuelve (NXDOMAIN con DNS 8.8.8.8; curl error 6). `www.hotelvegassantiago.com`: sin respuesta en 20 s (curl error 28).

---

## Evidencia

- 2026-11-21 (exploración etapas 1-2): NXDOMAIN y timeout
- 2026-11-21 12:41 -03:00 (reverificación con curl): mismo resultado; ambos `href` siguen presentes en la página
- 2026-11-21 14:36 -03:00 (etapa 5b, `DEFECTS_DIAG=1 npx playwright test`, misma red): `mendezdistribucion.com` sigue sin resolver (`getaddrinfo ENOTFOUND`); `www.hotelvegassantiago.com` ahora responde, pero con un certificado TLS vencido (`certificate has expired`), por lo que el enlace sigue sin estar operativo. Evidencia: `qa/05-test-execution/automated/evidence/2026-11-21/defects-diag-summary.json`. La reverificación desde otra red sigue pendiente
- Captura: se generará en `qa/07-automation/e2e/diagnosis/` (no versionado) al automatizar el caso en la etapa 5

---

## Análisis de causa raíz

Probable (no confirmado por el responsable del sitio): Dominio del sponsor dado de baja; sitio del hotel caído o fuera de servicio (pendiente reverificar desde otra red antes de cerrar).

---

## Sugerencia de corrección

Actualizar o retirar los enlaces afectados. Reverificar el hotel desde una red distinta para descartar una falla transitoria.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 | Impacto |
|-------|---------------------|---------|
| TC-EVT-TDY-009 | `test.fail()` vía `expectOpenDefect('DEF-TCH-003', ...)` | La aserción de la especificación se mantiene; la ejecución queda en verde mientras el defecto se reproduzca y pasa a rojo cuando se corrija |

**Marcador previsto en la etapa 5** (patrón de `fixtures/defects.ts`):

```typescript
await expectOpenDefect('DEF-TCH-003', 'Logo de sponsor enlaza a un dominio inexistente y sitio de hotel sin respuesta', async () => {
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
| 1.0 | 2026-11-21 | Defecto reportado en la etapa 3 a partir de HC-07, con reverificación de solo lectura |
| 1.1 | 2026-11-21 | Etapa 5b: el sitio del hotel pasa de no responder a responder con certificado TLS vencido; el defecto se mantiene abierto |
