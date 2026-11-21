# Demo: qa-framework + Claude aplicado a testingenchile.cl

Este repositorio es una **demostración de las capacidades de
[`@keber/qa-framework`](https://www.npmjs.com/package/@keber/qa-framework)** (versión `next`,
1.14.0-rc.9) aplicado con **Claude** (Claude Code, modelo Opus) al sitio público
[testingenchile.cl](https://www.testingenchile.cl/).

Todo el contenido (configuración, especificaciones, plan de pruebas, automatización Playwright,
healing, defectos, recomendaciones e informes finales en LaTeX/PDF) se generó a partir de **un
único prompt**. No hubo intervención manual en los artefactos: bastó ese prompt para producir
el repositorio completo, incluidos los informes finales.

> Demostración con fines educativos. Las pruebas son de **solo lectura** sobre un sitio de
> producción de terceros: no se envían formularios, se bloquean los rastreadores de terceros y
> se limita el paralelismo a 2 workers. Los resultados reflejan una observación puntual del
> 21-11-2026 y pueden cambiar cuando el sitio se actualice.

---

## El prompt inicial

```text
Crea un nuevo directorio llamado demo_testingenchile, inicializa git, instala y configura el
paquete npm @keber/qa-framework@next en dicha carpeta, configurando como proyecto a testear
https://www.testingenchile.cl/ , sin usuario/contraseña ni sección privada conocidos. Incorpora
las principales características del agentic playwright framework de ivan davidov,
https://github.com/idavidov13/agentic-playwright.

Una vez configurado el framework, coordina sub-agentes modelo Opus 5.5 Medio para que ejecuten
las etapas del pipeline del qa-framework hasta las pruebas end to end con playwright y la etapa
de healing, sin incluir integración con Azure DevOps. Utiliza gitflow y merge --no-ff para ir
actualizando el repo. Una vez finalizada la aplicación del framework, genera los informes de
análisis de pruebas, plan de pruebas y ejecución de pruebas en latex y PDF y añádelos al repo.

Sube el repo a mi github en modo público con el nombre demo-qaframework-saucedemo . Actualiza el
readme para que explique que el propósito del repo es una demostración las capacidades del
qa-framework aplicado con Claude a la web "testingenchile.cl". Incluye el prompt inicial,
indicando que bastó ese prompt para generar el contenido del repo incluyendo los reportes
finales.

Incluye en el readme snapshots de los informes PDF.
```

---

## Resultados en cifras

| Indicador | Valor |
|---|---|
| Módulos / submódulos analizados | 5 / 12 |
| Casos de prueba especificados | 116 (P0: 13, P1: 45, P2: 35, P3: 23) |
| Decisión de automatización | 84 automatizar, 2 manual, 30 pendientes |
| Tests Playwright ejecutados | 119 (116 TCs + 3 smoke del harness) |
| Resultado de la ejecución final | 78 pasan, 9 fallos esperados (defectos), 32 omitidos, **0 fallan, 0 inestables** |
| Pruebas de estabilidad (healing) | `--repeat-each=3` (357 ejecuciones) y `--retries=0`: 0 fallos, 0 flaky |
| Defectos abiertos | 5 (`DEF-TCH-001` a `DEF-TCH-005`: enlaces rotos y textos alternativos faltantes) |
| Recomendaciones | 18 (`REC-TCH-001` a `REC-TCH-018`) |
| Veredicto QA | Aprobado con observaciones |

---

## Informes PDF

| Informe | PDF | Fuente LaTeX |
|---|---|---|
| Análisis de Pruebas (12 págs.) | [informe-analisis-de-pruebas.pdf](reports/analisis-de-pruebas/informe-analisis-de-pruebas.pdf) | [.tex](reports/analisis-de-pruebas/informe-analisis-de-pruebas.tex) |
| Plan de Pruebas (19 págs.) | [plan-de-pruebas.pdf](reports/plan-de-pruebas/plan-de-pruebas.pdf) | [.tex](reports/plan-de-pruebas/plan-de-pruebas.tex) |
| Ejecución de Pruebas (16 págs.) | [informe-ejecucion-de-pruebas.pdf](reports/ejecucion-de-pruebas/informe-ejecucion-de-pruebas.pdf) | [.tex](reports/ejecucion-de-pruebas/informe-ejecucion-de-pruebas.tex) |

### Informe de Análisis de Pruebas

<p>
  <img src="docs/snapshots/analisis-p1.png" alt="Portada del Informe de Análisis de Pruebas" width="45%">
  <img src="docs/snapshots/analisis-chart.png" alt="Universo de pruebas por módulo y prioridad" width="45%">
</p>

### Plan de Pruebas

<p>
  <img src="docs/snapshots/plan-p1.png" alt="Portada del Plan de Pruebas" width="45%">
  <img src="docs/snapshots/plan-chart.png" alt="Resumen cuantitativo del Plan de Pruebas" width="45%">
</p>

### Informe de Ejecución de Pruebas

<p>
  <img src="docs/snapshots/ejecucion-p1.png" alt="Portada del Informe de Ejecución de Pruebas" width="45%">
  <img src="docs/snapshots/ejecucion-chart.png" alt="Ambiente de ejecución y resultados globales" width="45%">
</p>

---

## Cómo se construyó

Un agente orquestador (Claude Code) instaló y configuró el framework y luego coordinó
sub-agentes Opus (esfuerzo medio), uno por etapa del pipeline. Cada etapa trabajó en su propia
rama `feature/*` y se integró en `develop` con `git merge --no-ff`; la versión final se
publicó en `main` mediante una rama `release/*` (gitflow).

```text
Instalación + configuración  ->  feature/agentic-playwright-harness
Etapas 1-2  Análisis + especificaciones  ->  feature/stage-1-2-specifications
Etapas 3-4  Plan de pruebas + casos       ->  feature/stage-3-4-test-plan
Etapa 5     Automatización Playwright     ->  feature/stage-5-automation
Etapa 5b    Healing / estabilización      ->  feature/stage-5b-healing
Informes LaTeX + PDF                      ->  feature/latex-reports
README                                    ->  feature/readme
```

Puedes ver la historia completa con `git log --graph --oneline --all`.

### Qué aporta cada pieza

**`@keber/qa-framework`** (metodología spec-driven):

- Estructura estándar `qa/` y pipeline por etapas con prerrequisitos.
- Set de 6 archivos de especificación por submódulo (inventario, reglas de negocio, flujos,
  roles, datos de prueba, escenarios).
- Reglas de polaridad de aserciones: un test afirma lo que exige la especificación; si el sitio
  no cumple, se usa `test.fail()` más un archivo de defecto, nunca una aserción debilitada.
- Estados válidos de cierre (pasa / fallo esperado con defecto / omitido con motivo
  `PENDING-*`), memoria del agente y verificadores de codificación de caracteres.

**Características incorporadas de
[agentic-playwright](https://github.com/idavidov13/agentic-playwright)** (Ivan Davidov, MIT):

- `AGENTS.md` como "Constitución" del repositorio (reglas MUST / SHOULD / WON'T con ID),
  importado desde `CLAUDE.md`.
- Skill `ai-native-workflow` como punto de entrada único, con propuesta y nivel de confianza
  antes de editar ("pregunta, no inventes").
- Hook `PreToolUse` que bloquea escrituras que violan la Constitución
  (`scripts/enforce-constitution.mjs`, reescrito en Node), también ejecutable en modo `--scan`
  en CI.
- Page objects inyectados como fixtures (`mergeTests`), locators como getters, componentes
  compuestos, enums para rutas y mensajes, datos estáticos `as const`, factories Faker
  validadas con Zod (`z.strictObject`).
- Un único tag de tipo por test (`@smoke`, `@regression`, ...), pasos GIVEN/WHEN/THEN.
- ESLint con `eslint-plugin-playwright` y `--max-warnings 0`, prompt de revisión de PR y
  `AI-WORKFLOWS.md`.

Los puntos donde ambos enfoques chocaban se resolvieron a favor del qa-framework y están
documentados en la sección 11 de [AGENTS.md](AGENTS.md).

---

## Estructura del repositorio

```text
.
├── AGENTS.md / CLAUDE.md / AI-WORKFLOWS.md   Constitución y flujos del agente
├── .claude/                                  Comandos qa-*, reglas, skill y hook
├── .github/                                  Skills del framework, prompt de PR, workflow CI
├── scripts/enforce-constitution.mjs          Enforcer de la Constitución (hook + scan)
├── qa/
│   ├── 01-specifications/                    Análisis y specs por módulo/submódulo
│   ├── 02-test-plans/                        Plan maestro + planes por módulo
│   ├── 05-test-execution/                    Informe de ejecución, healing log, resumen JSON
│   ├── 06-defects/                           Defectos abiertos y recomendaciones
│   ├── 07-automation/e2e/                    Proyecto Playwright (pages, fixtures, tests)
│   └── memory/                               Aprendizajes del agente
├── reports/                                  Informes LaTeX + PDF
└── docs/snapshots/                           Capturas de los informes
```

---

## Ejecutar las pruebas

Requisitos: Node 22 o superior.

```bash
npm install
cd qa/07-automation/e2e
npm install
npx playwright install chromium
npx playwright test          # suite completa (solo lectura, ~6 min)
npx playwright show-report
```

Desde la raíz también están `npm run lint`, `npm run typecheck`, `npm run check:constitution` y
`npm run test:e2e`. No se requieren credenciales: la URL base por defecto es
`https://www.testingenchile.cl` y se puede cambiar con la variable `QA_BASE_URL`.

El workflow de CI (`.github/workflows/qa.yml`) ejecuta lint, typecheck y el scan de la
Constitución en cada push; la suite E2E solo corre manualmente o una vez por semana, para no
generar tráfico innecesario sobre el sitio.

---

## Limitaciones

- Una sola observación (21-11-2026), desde una sola red y con Chromium de escritorio.
- El contenido del sitio (eventos, fechas, sponsors) cambia con frecuencia; algunos hallazgos
  pueden quedar obsoletos.
- 30 casos quedan pendientes (`PENDING-SPEC`, `PENDING-BROWSER`) y 2 son manuales; los envíos
  reales de formularios están fuera de alcance a propósito.
- El plan de pruebas queda pendiente de aprobación humana; los defectos y recomendaciones son
  propuestas para revisión del dueño del sitio, no un juicio definitivo.

## Créditos

- [`@keber/qa-framework`](https://www.npmjs.com/package/@keber/qa-framework).
- [agentic-playwright](https://github.com/idavidov13/agentic-playwright) de Ivan Davidov (MIT),
  cuyas ideas se adaptaron aquí.
- Sitio bajo prueba: [Testing en Chile](https://www.testingenchile.cl/). Este repositorio no
  está afiliado al sitio.
