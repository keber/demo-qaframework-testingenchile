# Memory Index - demo_testingenchile

> The agent reads this file first before loading any memory file.
> Add a row here whenever you create or update a file in this directory.

| File | Topic | When to load |
|---|---|---|
| `ci-pipeline-findings.md` | CI pipeline issues, root causes, applied fixes, failure triage categories | Diagnosing CI failures; reviewing pipeline changes |
| `e2e-stabilization-patterns.md` | Flakiness patterns, crash-recovery techniques, strict-mode conflicts, reference timeouts | Investigating intermittent failures; refactoring fragile specs |
| `data-volatility-strategies.md` | Strategies for handling volatile test data (filter values, row counts, search inputs) | Fixing hardcoded-data failures; choosing an assertion resilience approach |
| `testingenchile-site-exploration.md` | Aprendizajes de la exploración en vivo (etapas 1-2): etiquetas de Google, formularios Webnode, menú, cookies, enlaces externos, privacidad | Antes de automatizar cualquier módulo o reexplorar el sitio |
| `test-plan-classification.md` | Criterio DEF/REC (regla 8), decisiones de automatización, etiquetas y resultado de las etapas 3-4 | Antes de automatizar (etapa 5), al clasificar un hallazgo nuevo o al regenerar el plan |
| `automation-harness-patterns.md` | Arnés de la etapa 5: bloqueo de rastreadores, link checker, `skipPending`, recarga tras el banner de cookies, visor de la galería, reglas de lint que dan forma a las specs | Antes de escribir o estabilizar specs (etapas 5, 5b y 6) |
