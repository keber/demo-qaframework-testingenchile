# Reporte de defecto - DEF-TCH-004: El logo del header no tiene texto alternativo en todo el sitio

| Campo | Valor |
|-------|-------|
| ID | DEF-TCH-004 |
| Título | El logo del header no tiene texto alternativo en todo el sitio |
| Severidad | Media |
| Prioridad | P2 |
| Estado | Abierto |
| Asignado a | Sin asignar (responsable del sitio) |
| Módulo | HOME - Inicio y navegación global |
| Submódulo | Navegación global (NAV) |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Navegador | Chromium (Playwright 1.65.1) y solicitudes HTTP de solo lectura |
| Fecha de reporte | 2026-11-21 |
| ADO WI | No aplica (integración deshabilitada) |
| Hallazgo origen | HC-08 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-HOME-NAV-012 |

---

## Verificación de problemas conocidos

| Campo | Valor |
|-------|-------|
| Fuente consultada | `qa/06-defects/` (open, disputed, resolved, recommendations); no existe tracker externo |
| Términos buscados | Síntoma del hallazgo HC-08 (URL afectada y tipo de falla), no el ID del caso |
| Coincidencias | Ninguna |
| Clasificación | Defecto nuevo |
| Regla violada | RN-HOME-012 (ESTÁNDAR: WCAG 2.1 criterio 1.1.1, nivel A - contenido no textual) |

---

## Descripción

La imagen del logo del header, que además es el enlace al inicio, declara `alt=""` en todas las páginas, por lo que el enlace queda sin nombre accesible.

---

## Pasos para reproducir

| Paso | Acción |
|------|--------|
| 1 | Navegar a `{QA_BASE_URL}/` como visitante anónimo |
| 2 | Inspeccionar la imagen del logo del header (`img.wnd-logo-img`) |
| 3 | Leer su atributo `alt` |
| 4 | Repetir en `{QA_BASE_URL}/capacitaciones2/` (enlace `a.logo-link` con `href="/"`) |

---

## Resultado esperado

Según RN-HOME-012 (WCAG 1.1.1), el logo informativo declara un `alt` descriptivo (por ejemplo "Testing en Chile") y el enlace al inicio tiene nombre accesible.

---

## Resultado actual

El logo declara `alt=""` en todas las páginas inspeccionadas (17); el enlace al inicio no tiene nombre accesible.

---

## Evidencia

- 2026-11-21 (exploración etapas 1-2): `alt=""` en las 17 páginas inspeccionadas
- 2026-11-21 12:41 -03:00 (reverificación con curl en `/`): `<img ... alt="" ... class="wnd-logo-img">`
- Captura: se generará en `qa/07-automation/e2e/diagnosis/` (no versionado) al automatizar el caso en la etapa 5

---

## Análisis de causa raíz

Probable (no confirmado por el responsable del sitio): Campo de texto alternativo del logo vacío en la configuración del header de Webnode.

---

## Sugerencia de corrección

Completar el texto alternativo del logo en el editor de Webnode con el nombre del sitio.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 | Impacto |
|-------|---------------------|---------|
| TC-HOME-NAV-012 | `test.fail()` vía `expectOpenDefect('DEF-TCH-004', ...)` | La aserción de la especificación se mantiene; la ejecución queda en verde mientras el defecto se reproduzca y pasa a rojo cuando se corrija |

**Marcador previsto en la etapa 5** (patrón de `fixtures/defects.ts`):

```typescript
await expectOpenDefect('DEF-TCH-004', 'El logo del header no tiene texto alternativo en todo el sitio', async () => {
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
| 1.0 | 2026-11-21 | Defecto reportado en la etapa 3 a partir de HC-08, con reverificación de solo lectura |
