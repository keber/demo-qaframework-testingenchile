# Registro de sanación - Etapa 5b (estabilización) - Sprint 1

| Campo | Valor |
|---|---|
| Fecha | 2026-11-21 (hora local America/Santiago, `npx qa-framework clock`) |
| Etapa | 5b - Estabilización (`/qa-test-stabilization`) |
| Rama | `feature/stage-5b-healing` |
| Ambiente | Producción `https://www.testingenchile.cl` (único ambiente, solo lectura, rastreadores bloqueados por `fixtures/pom/network-fixture.ts`) |
| Navegador | Chromium 159.0.8154.6 headless (Playwright 1.65.1), viewport 1366x900 |
| Sistema | Windows 11 Pro 10.0.26200, Node v22.16.0 |
| Suite | 119 tests en `qa/07-automation/e2e/tests/` (116 TCs + 3 smoke previos) |
| Informe de ejecución | `qa/05-test-execution/automated/2026-11-21-EXEC-E2E-20261121-001.md` |

Este registro cumple también el papel del informe de estabilización (`STABILIZATION-REPORT`) que pide la skill: fecha y ambiente, tabla por caso, resumen y recomendaciones.

---

## 1. Ejecuciones de estrés

Todas con `workers=2` (tope del proyecto, regla S7) y la configuración real del proyecto. Las cifras salen del reporter JSON de Playwright; los resúmenes compactos están en `qa/05-test-execution/automated/evidence/2026-11-21/`.

| # | Hora inicio (-03:00) | Comando | Ejecuciones | Pasan | Fallo esperado | Fallan | Inestables | Omitidas | Duración | Evidencia |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 14:06 | `npx playwright test --repeat-each=3 --workers=2` (retries=1 del config) | 357 | 234 | 27 | 0 | 0 | 96 | 23,8 min | `stress-repeat-each-3-summary.json` |
| 2 | 14:30 | `npx playwright test --retries=0` | 119 | 78 | 9 | 0 | 0 | 32 | 6,0 min | `retries-0-summary.json` |
| 3 | 14:36 | `DEFECTS_DIAG=1 npx playwright test --retries=0 --grep <9 TCs con DEF>` | 9 | 0 | 0 | 9 (esperado en modo diagnóstico) | 0 | 0 | 1,1 min | `defects-diag-summary.json` |

Resultado: en 357 + 119 ejecuciones no hubo ningún fallo inesperado ni ningún test inestable (ninguno necesitó el reintento: `attempts = 1` en todos). Los 87 tests ejecutables quedaron en el mismo estado en las 4 repeticiones (3 del estrés + 1 sin reintentos).

### Candidatos vigilados (de `qa/AGENT-NEXT-STEPS.md`)

| TC | Riesgo previsto | Resultado en 4 ejecuciones | Duración mín. / máx. (estrés) |
|---|---|---|---|
| TC-EVT-TDY-009 | Dominios externos, límite de 20 s | Siempre fallo esperado por DEF-TCH-003, nunca `InfraError` | 26,7 s / 32,1 s (presupuesto 90 s con `test.slow()`) |
| TC-LEG-GAL-002 | Animación del visor PhotoSwipe | Siempre pasa | 9,4 s / 11,1 s |
| TC-LEG-GAL-003 | Animación del visor PhotoSwipe | Siempre pasa | 7,4 s / 10,3 s |
| TC-CAP-CUR-001 | 15 páginas en una prueba | Siempre pasa | 56,0 s / 59,9 s (presupuesto 240 s) |

---

## 2. Clasificación de hallazgos

No hubo fallos ni inestabilidad que clasificar con el protocolo (`references/classification-protocol.md`). El único hallazgo es un **riesgo latente de tiempo** (categoría D, "Fragile timing", del protocolo; B "Timing/flaky" en el resumen de la skill): dos pruebas consumían la mayor parte de su presupuesto de 30 s.

| TC | Línea base | Final | Categoría | Causa raíz | Corrección | Confianza |
|---|---|---|---|---|---|---|
| TC-EVT-EDI-002 | Pasa, máx. 27,7 s de 30 s (92 %) | Pasa, 19,1 s de 90 s | D - tiempo frágil (preventivo) | `linkChecker.statuses()` solicita en secuencia cada página de "Ediciones anteriores"; la latencia de producción por sí sola podía superar el límite | `test.slow()` (presupuesto x3), mismo patrón que TC-EVT-TDY-009 y TC-HOME-NAV-002 | Alta (95/100: pasa x3 en estrés + x2 tras el cambio, causa entendida, sin `waitForTimeout`, aserción sin cambios) |
| TC-CAP-CAT-002 | Pasa, máx. 23,1 s de 30 s (77 %) | Pasa, 17,8 s de 90 s | D - tiempo frágil (preventivo) | Igual: solicita en secuencia cada destino "Saber más" del catálogo | `test.slow()` | Alta (95/100, mismos criterios) |

Criterio aplicado: endurecer toda prueba cuyo máximo en el estrés supere el 75 % de su presupuesto. La siguiente más cercana, TC-LEG-BLG-005, llegó a 19,6 s (65 %) y no se modificó.

### Antes y después

```typescript
// Antes (tests/eventos/ediciones.spec.ts, igual en tests/capacitaciones/catalogo.spec.ts)
async ({ homePage, linkChecker }) => {
  let hrefs: string[] = [];

// Después
async ({ homePage, linkChecker }) => {
  // Sequential checks of every edition page: up to 27.7 s of the 30 s budget in the
  // 2026-11-21 stress run (repeat-each=3), so the budget is tripled as in TDY-009.
  test.slow();
  let hrefs: string[] = [];
```

Las aserciones no cambiaron (regla 10 de polaridad): siguen exigiendo `hrefs.length > 0` y que todas las respuestas sean HTTP 200. Verificación: `npx playwright test --grep "TC-EVT-EDI-002|TC-CAP-CAT-002" --repeat-each=2 --retries=0` -> 4 pasan (17,8 s a 20,0 s); `npm run lint`, `npm run typecheck` y `npm run check:constitution` en verde. Commit: `fix(e2e): widen time budget of sequential link-check tests`.

---

## 3. Verificación de los `test.fail()` (DEFECTS_DIAG=1)

Con `DEFECTS_DIAG=1` el marcador de `expectOpenDefect` se desactiva y cada prueba informa su resultado real. Las 9 fallaron en la aserción de la especificación, ninguna por `InfraError`, selector o tiempo:

| TC | Defecto | Aserción que falla (resultado observado) |
|---|---|---|
| TC-EVT-EDI-003 | DEF-TCH-001 | `/testing-day-en-latam-2018/` responde 404 |
| TC-EVT-TDY-007 | DEF-TCH-002 | 3 enlaces "Inscribirse" (StreamYard) responden 404 |
| TC-EVT-TDY-009 | DEF-TCH-003 | `mendezdistribucion.com`: `getaddrinfo ENOTFOUND`; `www.hotelvegassantiago.com`: `certificate has expired` |
| TC-HOME-NAV-012 | DEF-TCH-004 | `alt` del logo vacío (`""`) en `/` |
| TC-HOME-POR-006 | DEF-TCH-005 | 4 logos de partners sin `alt` |
| TC-CAP-CAT-008 | DEF-TCH-005 | 4 imágenes del catálogo sin `alt` |
| TC-EVT-EDI-009 | DEF-TCH-005 | Imágenes sin `alt` en `/testing-day-chile-2025/` |
| TC-LEG-BLG-009 | DEF-TCH-005 | Imágenes del listado del blog sin `alt` |
| TC-LEG-GAL-006 | DEF-TCH-005 | 558 fotos de la galería sin `alt` |

**Cambio observado en DEF-TCH-003:** el sitio del hotel ya no agota el tiempo de espera; ahora responde con un certificado TLS vencido. Sigue sin estar operativo para un visitante (el navegador muestra una advertencia de seguridad), por lo que el defecto se mantiene abierto y se agregó la evidencia a `qa/06-defects/open/DEF-TCH-003_enlaces-externos-evento-no-operativos.md` (versión 1.1). La reverificación desde otra red sigue pendiente.

No hay defectos nuevos (no se crea ningún DEF-TCH ni REC-TCH en esta etapa).

---

## 4. Resumen

| Métrica | Valor |
|---|---|
| Tests evaluados | 119 (87 ejecutables, 32 `test.skip()` con PENDING-*) |
| Estabilizados con confianza alta | 87 (78 pasan + 9 fallos esperados verificados con `DEFECTS_DIAG=1`) |
| Fallos de aplicación (categoría F) nuevos | 0 |
| Omitidos intencionales (categoría I) | 32, motivos vigentes (sin cambios) |
| Endurecimientos preventivos | 2 (TC-EVT-EDI-002, TC-CAP-CAT-002) |
| Restantes con confianza baja | 0 |
| Ejecución final (`npx playwright test`) | 87 esperados (78 + 9), 32 omitidos, 0 fallos, 0 inestables, 5,8 min |

## 5. Recomendaciones

1. Repetir el estrés desde otra red y otro día antes de declarar la suite libre de inestabilidad: las cuatro ejecuciones de hoy salieron de la misma red y en una ventana de 40 minutos.
2. Si TC-EVT-TDY-009 supera 60 s en una ejecución futura, revisar el límite de 20 s por dominio en lugar de ampliar el presupuesto de la prueba.
3. Cuando cambie la cantidad de cursos o ediciones, volver a medir TC-CAP-CAT-002, TC-EVT-EDI-002 y TC-CAP-CUR-001: su duración crece con la cantidad de enlaces.

## 6. Registro de decisiones

- 2026-11-21 14:38: TC-EVT-EDI-002 y TC-CAP-CAT-002 clasificados como riesgo de tiempo (categoría D, preventivo); `test.slow()` aplicado sin tocar aserciones.
- 2026-11-21 14:37: DEF-TCH-003 se mantiene abierto; cambia el síntoma del hotel (de sin respuesta a certificado vencido).
