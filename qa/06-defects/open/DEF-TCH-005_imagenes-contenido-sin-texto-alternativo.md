# Reporte de defecto - DEF-TCH-005: Imágenes informativas sin texto alternativo en páginas de contenido

| Campo | Valor |
|-------|-------|
| ID | DEF-TCH-005 |
| Título | Imágenes informativas sin texto alternativo en páginas de contenido |
| Severidad | Media |
| Prioridad | P2 |
| Estado | Abierto |
| Asignado a | Sin asignar (responsable del sitio) |
| Módulo | Transversal (HOME, CAP, EVT, LEG) |
| Submódulo | Portada, catálogo, ediciones, blog y galería |
| Ambiente | Producción (`{QA_BASE_URL}` = https://www.testingenchile.cl) |
| Navegador | Chromium (Playwright 1.65.1) y solicitudes HTTP de solo lectura |
| Fecha de reporte | 2026-11-21 |
| ADO WI | No aplica (integración deshabilitada) |
| Hallazgo origen | HC-08 (`qa/01-specifications/ANALISIS-DE-PRUEBAS.md`, sección 7) |
| TCs relacionados | TC-HOME-POR-006, TC-CAP-CAT-008, TC-EVT-EDI-009, TC-LEG-BLG-009, TC-LEG-GAL-006 |

---

## Verificación de problemas conocidos

| Campo | Valor |
|-------|-------|
| Fuente consultada | `qa/06-defects/` (open, disputed, resolved, recommendations); no existe tracker externo |
| Términos buscados | Síntoma del hallazgo HC-08 (URL afectada y tipo de falla), no el ID del caso |
| Coincidencias | Ninguna |
| Clasificación | Defecto nuevo |
| Regla violada | RN-HOME-012 y RN-LEG-017 (ESTÁNDAR: WCAG 2.1 criterio 1.1.1, nivel A) |

---

## Descripción

Imágenes informativas (logos de partners, imagen SENCE, imágenes de artículos, fotos de ediciones y de la galería) no declaran texto alternativo.

---

## Pasos para reproducir

| Paso | Acción |
|------|--------|
| 1 | Navegar como visitante anónimo a `/galeria/`, `/blog/`, `/capacitaciones2/`, `/testing-day-chile-2025/` y `/` |
| 2 | Listar las imágenes informativas de cada página |
| 3 | Leer el atributo `alt` de cada imagen |
| 4 | Contar las imágenes con `alt` vacío o ausente |

---

## Resultado esperado

Según RN-HOME-012 y RN-LEG-017 (WCAG 1.1.1), toda imagen informativa declara un `alt` no vacío que describe su contenido o función.

---

## Resultado actual

`/galeria/`: 558 de 572 imágenes sin `alt`; `/blog/`: 11 de 11; `/testing-day-chile-2025/`: 13 de 13; `/testing-day-chile-ediciones-anteriores/`: 4 de 4; `/capacitaciones2/`: logo e imagen SENCE sin `alt`; portada: 2 logos de partners sin `alt`. También `/new-curso-istqb/` 11/11 y `/nuestros-sponsors-2026/` 12/12 (sin TC asociado en este plan).

---

## Evidencia

- 2026-11-21 (exploración etapas 1-2): conteos por página de la columna Resultado actual (sección 7 de `ANALISIS-DE-PRUEBAS.md`)
- Captura: se generará en `qa/07-automation/e2e/diagnosis/` (no versionado) al automatizar el caso en la etapa 5

---

## Análisis de causa raíz

Probable (no confirmado por el responsable del sitio): Las imágenes se cargan en Webnode sin completar el texto alternativo.

---

## Sugerencia de corrección

Completar el texto alternativo de cada imagen informativa en el editor; marcar como decorativas (`alt=""`) solo las que no aportan información.

---

## Impacto en la automatización

| TC ID | Estado en la etapa 5 | Impacto |
|-------|---------------------|---------|
| TC-HOME-POR-006 | `test.fail()` vía `expectOpenDefect('DEF-TCH-005', ...)` | La aserción de la especificación se mantiene; la ejecución queda en verde mientras el defecto se reproduzca y pasa a rojo cuando se corrija |
| TC-CAP-CAT-008 | `test.fail()` vía `expectOpenDefect('DEF-TCH-005', ...)` | La aserción de la especificación se mantiene; la ejecución queda en verde mientras el defecto se reproduzca y pasa a rojo cuando se corrija |
| TC-EVT-EDI-009 | `test.fail()` vía `expectOpenDefect('DEF-TCH-005', ...)` | La aserción de la especificación se mantiene; la ejecución queda en verde mientras el defecto se reproduzca y pasa a rojo cuando se corrija |
| TC-LEG-BLG-009 | `test.fail()` vía `expectOpenDefect('DEF-TCH-005', ...)` | La aserción de la especificación se mantiene; la ejecución queda en verde mientras el defecto se reproduzca y pasa a rojo cuando se corrija |
| TC-LEG-GAL-006 | `test.fail()` vía `expectOpenDefect('DEF-TCH-005', ...)` | La aserción de la especificación se mantiene; la ejecución queda en verde mientras el defecto se reproduzca y pasa a rojo cuando se corrija |

**Marcador previsto en la etapa 5** (patrón de `fixtures/defects.ts`):

```typescript
await expectOpenDefect('DEF-TCH-005', 'Imágenes informativas sin texto alternativo en páginas de contenido', async () => {
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
