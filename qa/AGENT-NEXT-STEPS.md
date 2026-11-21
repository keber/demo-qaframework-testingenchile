# Próximos pasos del agente

> La configuración inicial y las etapas 1-5 y 5b están completadas (ver `## Sprint History` en `qa/README.md`).
> Este archivo contiene solo la siguiente etapa activa.

## Sprint 2 - Pista manual, casos PENDING y aprobación humana

Punto de partida (informe `qa/05-test-execution/automated/2026-11-21-EXEC-E2E-20261121-001.md`): 119 tests, 87 esperados (78 pasan + 9 `test.fail()`), 32 omitidos con PENDING-*, 0 fallos inesperados y 0 inestables en 435 ejecuciones de estrés. La suite automatizada está estable; lo pendiente depende de personas o de otra red.

- [ ] Aprobación humana del plan maestro (`qa/02-test-plans/Plan-Maestro-de-Pruebas-testingenchile.md`, sección 16) y respuesta a las 12 preguntas abiertas; al confirmarse una regla `PENDIENTE-CONFIRMACIÓN`, reactivar su caso (`test()` si pasa, `test.fail()` + DEF si falla). Afecta hasta 25 casos PENDING-SPEC
- [ ] Ejecutar la pista manual (TC-CAP-BTC-008 con aprobación del responsable, TC-LEG-LGL-004 y casos PENDING-SPEC que el responsable quiera revisar) y registrar la evidencia en `qa/05-test-execution/manual/`
- [ ] Observar en navegador real o móvil los casos PENDING-BROWSER (TC-HOME-NAV-004, TC-CAP-CAT-009, TC-CON-FCO-008, TC-LEG-GAL-008) y automatizarlos
- [ ] Repetir la ejecución completa desde otra red y otro día (las ejecuciones de estrés del 2026-11-21 salieron de una sola red) y registrar cualquier inestable en `qa/README.md` (sección Flaky Tests); clasificar todo fallo con `/qa-test-stabilization`
- [ ] Reverificar DEF-TCH-003 desde otra red (el hotel pasó de no responder a responder con certificado TLS vencido) antes de cerrarlo o mantenerlo
- [ ] Decidir si se conserva `tests/home/home-smoke.spec.ts` (TC-HOME-SMOKE-001..003, previos a la etapa 5 y fuera del plan) o se retira por duplicar TC-HOME-NAV-001/002 y TC-LEG-LGL-001
- [ ] Revisar manualmente `qa/07-automation/e2e/.env.example` (pendiente desde la etapa 0)
- [ ] Verificar: `npm run lint`, `npm run typecheck`, `npm run check:constitution`, `npx playwright test` y los dos verificadores de codificación
