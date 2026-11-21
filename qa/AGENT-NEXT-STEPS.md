# Próximos pasos del agente

> La configuración inicial y las etapas 1-4 están completadas (ver `## Sprint History` en `qa/README.md`).
> Este archivo contiene solo la siguiente etapa activa.

## Etapa 5 - Automatización (`/qa-automation`) - Sprint 1

Prerrequisitos: plan de pruebas en `qa/02-test-plans/` (plan maestro + 5 planes del Sprint 1) y ningún caso `PENDING-CODE`.

- [ ] Aprobación humana del plan maestro (`qa/02-test-plans/Plan-Maestro-de-Pruebas-testingenchile.md`, sección 16)
- [ ] Respuesta del responsable del sitio a las 12 preguntas abiertas (sección 13 del plan maestro); confirmar o descartar las reglas `PENDIENTE-CONFIRMACIÓN` y decidir si los criterios editoriales y SEO se elevan a regla
- [ ] Revisar manualmente `qa/07-automation/e2e/.env.example` (pendiente desde la etapa 0)
- [ ] Fixture base con bloqueo de `googlesyndication.com`, `googleadservices.com` y `googletagmanager.com` (`page.route`) y page object del banner de cookies ("Aceptar solo lo necesario")
- [ ] Automatizar los 13 casos P0 (`@smoke`) y verificar en verde
- [ ] Automatizar el resto de los 84 casos `Automatizar` por módulo; los 9 casos con DEF usan `expectOpenDefect` (DEF-TCH-001 a DEF-TCH-005)
- [ ] Registrar los 30 casos `Pendiente` como `test.skip()` con su motivo (`PENDING-SPEC` + REC, `PENDING-BROWSER` o `@destructive`)
- [ ] Ejecutar la pista manual (TC-CAP-BTC-008, TC-LEG-LGL-004 y casos `Pendiente` PENDING-SPEC) y registrar en `qa/05-test-execution/`
- [ ] Verificar: `npm run lint`, `npm run typecheck`, `npm run check:constitution`, `npx playwright test` y los dos verificadores de codificación
