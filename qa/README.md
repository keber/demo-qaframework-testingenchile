# QA - demo_testingenchile

> Framework: `@keber/qa-framework` v1.14.0-rc.9
> Language: es | Base URL: `{{QA_BASE_URL}}`
> ADO Project: `{ADO_ORG} / {ADO_PROJECT}` _(optional - remove line if not using Azure DevOps)_

---

## Module Status

| Module | Submodule | TCs Total | TCs Automated | Plan | ADO Suite | Status | Last Run |
|---|---|---|---|---|---|---|---|
| HOME | navegacion (NAV) | 14 | 12 | ✅ | - | ✅ Automatizado y estabilizado (5b): 12 automatizados (1 DEF), 2 PENDING | 2026-11-21 |
| HOME | portada (POR) | 9 | 8 | ✅ | - | ✅ Automatizado y estabilizado (5b): 8 automatizados (1 DEF), 1 PENDING | 2026-11-21 |
| CAP | catalogo (CAT) | 9 | 7 | ✅ | - | ✅ Automatizado y estabilizado (5b): 7 automatizados (1 DEF), 2 PENDING | 2026-11-21 |
| CAP | detalle-curso (CUR) | 10 | 8 | ✅ | - | ✅ Automatizado y estabilizado (5b): 8 automatizados, 2 PENDING | 2026-11-21 |
| CAP | bootcamp (BTC) | 8 | 6 | ✅ | - | ✅ Automatizado y estabilizado (5b): 6 automatizados, 2 PENDING | 2026-11-21 |
| EVT | testing-day (TDY) | 12 | 10 | ✅ | - | ✅ Automatizado y estabilizado (5b): 10 automatizados (2 DEF), 2 PENDING | 2026-11-21 |
| EVT | ediciones (EDI) | 9 | 6 | ✅ | - | ✅ Automatizado y estabilizado (5b): 6 automatizados (2 DEF), 3 PENDING | 2026-11-21 |
| CON | formulario-contacto (FCO) | 8 | 4 | ✅ | - | ✅ Automatizado y estabilizado (5b): 4 automatizados, 4 PENDING | 2026-11-21 |
| CON | contacto-empresa (EMP) | 12 | 7 | ✅ | - | ✅ Automatizado y estabilizado (5b): 7 automatizados, 5 PENDING | 2026-11-21 |
| LEG | legales (LGL) | 8 | 3 | ✅ | - | ✅ Automatizado y estabilizado (5b): 3 automatizados, 5 PENDING | 2026-11-21 |
| LEG | blog (BLG) | 9 | 8 | ✅ | - | ✅ Automatizado y estabilizado (5b): 8 automatizados (1 DEF), 1 PENDING | 2026-11-21 |
| LEG | galeria (GAL) | 8 | 5 | ✅ | - | ✅ Automatizado y estabilizado (5b): 5 automatizados (1 DEF), 3 PENDING | 2026-11-21 |

**Legend**: ✅ Done · ⚠️ Partial · 🔲 Not started · ⛔ Blocked

> Etapas 1-5 completadas el 2026-11-21: 116 TCs en 12 submódulos; 84 automatizados (75 pasan, 9 en `test.fail()` con DEF-TCH-001 a 005) y 32 en `test.skip()` con motivo PENDING-* (30 Pendiente y 2 de la pista manual). Ejecución completa: 87 esperados (78 pasan + 9 fallos esperados), 32 omitidos, 0 fallos inesperados, 0 inestables.
>
> Etapa 5b (estabilización) completada el 2026-11-21: 435 ejecuciones de estrés (`--repeat-each=3` y `--retries=0`) sin fallos ni inestables; 2 pruebas endurecidas de forma preventiva (TC-EVT-EDI-002, TC-CAP-CAT-002); los 9 `test.fail()` verificados con `DEFECTS_DIAG=1`. Informe: `qa/05-test-execution/automated/2026-11-21-EXEC-E2E-20261121-001.md`. Siguiente: pista manual, casos PENDING y aprobación humana (`qa/AGENT-NEXT-STEPS.md`).

---

## Quick-Start Commands

```bash
# Run all automated tests
cd qa/07-automation/e2e
npx playwright test

# Run a specific module
npx playwright test tests/{module-folder}/

# Run with UI (debug mode)
npx playwright test --ui

# Generate HTML report
npx playwright show-report

# Re-run only failed tests
npx playwright test --last-failed
```

> Set credentials in `qa/07-automation/.env` (copy from `.env.example`).

---

## Active Blockers

| ID | Description | Affects | Opened | Status |
|---|---|---|---|---|
| - | No active blockers | - | - | - |

---

## Last Run

| Suite | Date | Pass | Fail | Skip | CI Link |
|---|---|---|---|---|---|
| E2E | 2026-11-21 | 87 (78 + 9 `test.fail()`) | 0 | 32 | `qa/05-test-execution/automated/2026-11-21-EXEC-E2E-20261121-001.md` |
| API | - | - | - | - | - |

> Update this table after each significant run. The CI Link can be an ADO TestRun URL, a
> GitHub Actions run URL, or a path to a local report file.

## Last Execution

| Date | Suite | Pass | Skip | Fail | Duration | Report |
|---|---|---|---|---|---|---|
| 2026-11-21 14:39 | E2E completo, cierre de la etapa 5b (119 tests: 116 TCs + 3 smoke previos) | 87 | 32 | 0 | 5,8 min | `qa/05-test-execution/automated/2026-11-21-EXEC-E2E-20261121-001.md` |
| 2026-11-21 | E2E completo, etapa 5 | 87 | 32 | 0 | 7,0 min | `qa/07-automation/e2e/test-results/results.json` (local) |

## Flaky Tests

> Mark known flaky tests with this inline annotation directly in the table or spec file.
> Format: `[flaky] <test-id-or-name> - <root cause> - last seen <YYYY-MM-DD>`
>
> Example:
> `[flaky] TC-MOD-012 - timing issue on slow CI agents - last seen 2026-01-15`
>
> Remove the annotation once the test has been stable for 2+ consecutive CI runs.

Ninguna inestable conocida: 0 de 435 ejecuciones de estrés del 2026-11-21 (etapa 5b) necesitaron reintento. Pendiente repetir desde otra red.

---

## Sprint History

<!-- Completed sprint checklists are moved here from AGENT-NEXT-STEPS.md -->
<!-- Format per sprint: -->
<!--
### Sprint N - {SPRINT_NAME} ({YYYY-MM-DD})

**Submodules**: {list}
**TCs automated**: {N} P0 + {M} P1
**Execution report**: `qa/05-test-execution/automated/{date-slug}.md`

Checklist (completed):
- [x] {Task 1}
- [x] {Task 2}
-->

### Etapa 5b - Estabilización Sprint 1 (2026-11-21)

**Submódulos**: los 12 (HOME, CAP, EVT, CON, LEG)
**Estrés**: `--repeat-each=3 --workers=2` (357 ejecuciones) y `--retries=0` (119): 0 fallos, 0 inestables
**Sanación**: 2 endurecimientos preventivos de tiempo (TC-EVT-EDI-002, TC-CAP-CAT-002, `test.slow()`); 0 defectos nuevos
**Execution report**: `qa/05-test-execution/automated/2026-11-21-EXEC-E2E-20261121-001.md` (registro de sanación: `qa/05-test-execution/healing-log-2026-11-21.md`)

Checklist (completado):
- [x] Repetir la ejecución completa (estrés con `--repeat-each=3` y una ejecución con `--retries=0`) y registrar las inestables: ninguna; TC-EVT-TDY-009, TC-LEG-GAL-002/003 y TC-CAP-CUR-001 estables
- [x] Clasificar cualquier fallo según `/qa-test-stabilization`: sin fallos; riesgo de tiempo (categoría D) corregido en 2 pruebas sin tocar aserciones
- [x] Verificar los 9 `test.fail()` con `DEFECTS_DIAG=1`: todos fallan en la aserción de la especificación
- [x] Reverificar DEF-TCH-003 desde la misma red: sigue abierto (el hotel ahora responde con certificado TLS vencido); la reverificación desde otra red pasa al sprint 2
- [x] Ejecución final limpia, informe de ejecución y `qa/05-test-execution/execution-summary.json`
- [x] Verificar: `npm run lint`, `npm run typecheck`, `npm run check:constitution`, `npx playwright test` y los dos verificadores de codificación

Movidos al sprint 2 (`qa/AGENT-NEXT-STEPS.md`): aprobación humana del plan maestro, pista manual, casos PENDING-BROWSER, repetición desde otra red, decisión sobre `home-smoke.spec.ts` y revisión de `.env.example`.

### Etapa 5 - Automatización Sprint 1 (2026-11-21)

**Submódulos**: los 12 (HOME, CAP, EVT, CON, LEG)
**TCs automatizados**: 84 de 116 (13 P0 en `@smoke`); 9 en `test.fail()` con `expectOpenDefect`; 32 en `test.skip()` con `skipPending`
**Specs**: `qa/07-automation/e2e/tests/{home,capacitaciones,eventos,contacto,legal}/{submódulo}.spec.ts`
**Ejecución**: 87 esperados, 32 omitidos, 0 inesperados, 0 inestables (`test-results/results.json`, local)

Checklist (completado):
- [x] Fixture base con bloqueo de rastreadores (Google, Facebook, LinkedIn y otros) en toda prueba y page object del banner de cookies ("Aceptar solo lo necesario")
- [x] Automatizar los 13 casos P0 (`@smoke`) y verificar en verde
- [x] Automatizar el resto de los 84 casos `Automatizar`; los 9 casos con DEF usan `expectOpenDefect` y fallan en la aserción de la especificación con `DEFECTS_DIAG=1`
- [x] Registrar los 30 casos `Pendiente` y los 2 de la pista manual como `test.skip()` con motivo PENDING-*
- [x] Verificar: `npm run lint`, `npm run typecheck`, `npm run check:constitution`, `npx playwright test` y los dos verificadores de codificación
- [ ] Aprobación humana del plan maestro y respuesta a las 12 preguntas abiertas: traspasado a la etapa 5b
- [ ] Ejecutar la pista manual (TC-CAP-BTC-008, TC-LEG-LGL-004 y casos PENDING-SPEC) y registrar en `qa/05-test-execution/`: traspasado a la etapa 5b
- [ ] Revisar manualmente `qa/07-automation/e2e/.env.example`: traspasado a la etapa 5b

### Etapa 3-4 - Plan de pruebas y expansión de pasos (2026-11-21)

**Submódulos**: los 12 (HOME, CAP, EVT, CON, LEG)
**TCs planificados**: 116 (84 Automatizar, 2 Manual, 30 Pendiente); 0 automatizados
**Plan**: `qa/02-test-plans/Plan-Maestro-de-Pruebas-testingenchile.md` y `qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-testingenchile-Sprint-1-{HOME,CAP,EVT,CON,LEG}.md`
**Hallazgos**: 5 defectos (`qa/06-defects/open/DEF-TCH-001` a `005`) y 18 recomendaciones (`qa/06-defects/recommendations/REC-TCH-001` a `018`)

Checklist (completado):
- [x] Generar el plan de pruebas por módulo en `qa/02-test-plans/` (plan maestro + 5 planes del Sprint 1)
- [x] Expandir los pasos de los 116 casos (etapa 4) en la tabla de cada plan
- [x] Clasificar HC-01 a HC-22 según la regla 8 (DEF para reglas confirmadas; REC para reglas pendientes, editoriales o inexistentes)
- [ ] Revisión humana de `ANALISIS-DE-PRUEBAS.md` y respuesta a las preguntas abiertas: traspasada a la etapa 5 (sección 13 del plan maestro)
- [ ] Confirmar o descartar las reglas `PENDIENTE-CONFIRMACIÓN`: traspasado a la etapa 5
- [ ] Revisar manualmente `qa/07-automation/e2e/.env.example`: traspasado a la etapa 5

### Etapa 0-2 - Configuración, análisis y especificaciones (2026-11-21)

**Submódulos**: HOME (navegacion, portada), CAP (catalogo, detalle-curso, bootcamp), EVT (testing-day, ediciones), CON (formulario-contacto, contacto-empresa), LEG (legales, blog, galeria)
**TCs especificados**: 116 (13 P0, 45 P1, 35 P2, 23 P3); 0 automatizados
**Análisis**: `qa/01-specifications/ANALISIS-DE-PRUEBAS.md`

Checklist (completado):
- [x] Configurar módulos en `qa/qa-framework.config.json`
- [x] Instalar Playwright y Chromium en `qa/07-automation/e2e`
- [x] Revisar `AGENTS.md` (ya existente, no se reemplaza)
- [x] Etapa 1: análisis de los 5 módulos en el sitio en vivo (solo lectura)
- [x] Etapa 2: set de 6 archivos por submódulo (12 submódulos) y submódulos registrados en la configuración
- [ ] Nota: `qa/07-automation/e2e/.env.example` no se pudo editar por permisos; queda pendiente revisarlo manualmente

---

## Resources

| Resource | Link |
|---|---|
| QA Structure Guide | `qa/QA-STRUCTURE-GUIDE.md` |
| Naming Conventions | `qa/00-standards/naming-conventions.md` |
| Memory Index | `qa/memory/INDEX.md` |
| Agent Next Steps | `qa/AGENT-NEXT-STEPS.md` |
| Automation Config | `qa/07-automation/e2e/playwright.config.ts` |
