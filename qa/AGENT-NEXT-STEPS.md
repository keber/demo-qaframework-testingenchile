# Próximos pasos del agente

> La configuración inicial y las etapas 1-5 están completadas (ver `## Sprint History` en `qa/README.md`).
> Este archivo contiene solo la siguiente etapa activa.

## Etapa 5b - Estabilización (`/qa-test-stabilization`) - Sprint 1

Punto de partida (ejecución completa del 2026-11-21): 119 tests, 87 esperados (78 pasan + 9 `test.fail()`), 32 omitidos, 0 fallos inesperados, 0 inestables. No hay fallos que sanar todavía; la etapa confirma la estabilidad y cierra los traspasos.

- [ ] Repetir la ejecución completa al menos dos veces más (otro día y otra red) y registrar las inestables en `qa/README.md` (sección Flaky Tests); candidatos a vigilar: TC-EVT-TDY-009 (dominios externos, límite de 20 s), TC-LEG-GAL-002/003 (animación del visor) y TC-CAP-CUR-001 (15 páginas en una prueba)
- [ ] Clasificar cualquier fallo según `/qa-test-stabilization` (deriva de selector o datos, tiempo, entorno, defecto); nunca debilitar una aserción
- [ ] Reverificar DEF-TCH-003 desde otra red (el sitio del hotel no respondía) antes de cerrarlo o mantenerlo
- [ ] Aprobación humana del plan maestro (`qa/02-test-plans/Plan-Maestro-de-Pruebas-testingenchile.md`, sección 16) y respuesta a las 12 preguntas abiertas; al confirmarse una regla `PENDIENTE-CONFIRMACIÓN`, reactivar su caso (`test()` si pasa, `test.fail()` + DEF si falla)
- [ ] Ejecutar la pista manual (TC-CAP-BTC-008 con aprobación del responsable, TC-LEG-LGL-004 y casos PENDING-SPEC) y registrar en `qa/05-test-execution/`
- [ ] Observar en navegador real o móvil los casos PENDING-BROWSER (TC-HOME-NAV-004, TC-CAP-CAT-009, TC-CON-FCO-008, TC-LEG-GAL-008) y automatizarlos
- [ ] Decidir si se conserva `tests/home/home-smoke.spec.ts` (TC-HOME-SMOKE-001..003, previos a la etapa 5 y fuera del plan) o se retira por duplicar TC-HOME-NAV-001/002 y TC-LEG-LGL-001
- [ ] Revisar manualmente `qa/07-automation/e2e/.env.example` (pendiente desde la etapa 0)
- [ ] Verificar: `npm run lint`, `npm run typecheck`, `npm run check:constitution`, `npx playwright test` y los dos verificadores de codificación
