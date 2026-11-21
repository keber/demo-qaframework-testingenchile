# Reporte de defecto - DEF-TCH-002: 3 de 4 enlaces únicos "Inscribirse" de la Agenda Online responden 404

| Campo | Valor |
|-------|-------|
| ID | DEF-TCH-002 |
| Título | 3 de 4 enlaces únicos "Inscribirse" de la Agenda Online responden 404 |
| Severidad | Media |
| Prioridad | P2 |
| Estado | Abierto |
| Asignado a | Sin asignar (responsable del sitio) |
| Módulo | EVT - Eventos Testing Day |
| Submódulo | Testing Day Chile (TDY) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Navegador | Chromium (Playwright 1.65.1) y solicitudes HTTP de solo lectura |
| Fecha de reporte | 2026-11-21 |
| ADO WI | No aplica (integración deshabilitada) |
| Hallazgo origen | HC-06 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-EVT-TDY-007 |

---

## Verificación de problemas conocidos

| Campo | Valor |
|-------|-------|
| Fuente consultada | `qa/06-defects/` (open, disputed, resolved, recommendations); no existe tracker externo |
| Términos buscados | Síntoma del hallazgo HC-06 (URL afectada y tipo de falla), no el ID del caso |
| Coincidencias | Ninguna |
| Clasificación | Defecto nuevo |
| Regla violada | RN-EVT-009 (ESTÁNDAR: los enlaces externos del evento están operativos) y RN-EVT-008 (OBSERVADO: cada sesión ofrece su inscripción) |

---

## Descripción

En la Agenda Online, tres de los cuatro enlaces únicos "Inscribirse" llevan a transmisiones de StreamYard inexistentes (HTTP 404).

---

## Pasos para reproducir

| Paso | Acción |
|------|--------|
| 1 | Navegar a `{QA_BASE_URL}/agenda-online/` como visitante anónimo |
| 2 | Recopilar los `href` únicos de los enlaces "Inscribirse" (4 únicos: uno repetido 4 veces y tres con una aparición) |
| 3 | Solicitar cada URL (GET) sin hacer clic |
| 4 | Observar el código de estado de cada una |

---

## Resultado esperado

Según RN-EVT-008 y RN-EVT-009, cada enlace "Inscribirse" lleva a una página de inscripción operativa (2xx o 3xx).

---

## Resultado actual

`streamyard.com/watch/d2Y5CqepHVu6`, `streamyard.com/watch/fxfpYcRcykN7` y `streamyard.com/watch/zcWQhitGTYXW` responden HTTP 404; solo el enlace repetido responde 200.

---

## Evidencia

- 2026-11-21 (exploración etapas 1-2): 3 de 4 únicos con 404
- 2026-11-21 12:41 -03:00 (reverificación con curl): mismos tres enlaces con 404; el cuarto con 200
- Captura: se generará en `qa/07-automation/e2e/diagnosis/` (no versionado) al automatizar el caso en la etapa 5

---

## Análisis de causa raíz

Probable (no confirmado por el responsable del sitio): Transmisiones eliminadas o expiradas en StreamYard tras el evento (27 y 28 de agosto de 2026).

---

## Sugerencia de corrección

Actualizar los enlaces a las grabaciones vigentes o retirar los CTAs "Inscribirse" de sesiones ya realizadas (ver REC-TCH-003 sobre la vigencia del evento).

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 | Impacto |
|-------|---------------------|---------|
| TC-EVT-TDY-007 | `test.fail()` vía `expectOpenDefect('DEF-TCH-002', ...)` | La aserción de la especificación se mantiene; la ejecución queda en verde mientras el defecto se reproduzca y pasa a rojo cuando se corrija |

**Marcador previsto en la etapa 5** (patrón de `fixtures/defects.ts`):

```typescript
await expectOpenDefect('DEF-TCH-002', '3 de 4 enlaces únicos "Inscribirse" de la Agenda Online responden 404', async () => {
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
| 1.0 | 2026-11-21 | Defecto reportado en la etapa 3 a partir de HC-06, con reverificación de solo lectura |
