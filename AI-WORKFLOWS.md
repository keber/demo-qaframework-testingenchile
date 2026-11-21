# AI workflows - task to skill sequences

Every non-trivial task starts with `.claude/skills/ai-native-workflow/SKILL.md`. The table maps
common requests to the sequence it routes to. Stage commands live in `.claude/commands/` and
load `.github/skills/qa-{name}/SKILL.md`; rules are in `AGENTS.md`.

| Task | Sequence | Done when |
|---|---|---|
| Cover a new module from scratch (e.g. CAP) | ai-native-workflow -> `/qa-module-analysis` -> `/qa-spec-generation` -> `/qa-test-plan` -> `/qa-test-cases` -> `/qa-automation` | Specs, plan, TCs exist; specs green or `test.fail()` + DEF file |
| Add automation for existing TCs | ai-native-workflow -> `/qa-automation` (explore live page, page object, fixture, static data, spec) | `npm run lint`, `typecheck`, `check:constitution` clean; spec green |
| Add a page object or component | ai-native-workflow -> `/qa-automation` (AGENTS.md K1, K3, K4) -> register in `fixtures/pom/page-object-fixture.ts` | Used by a spec through the fixture; lint clean |
| Add test data | ai-native-workflow -> `/qa-automation` (K6, K7): static `as const` or a Faker factory + `zod/v4` strict schema | Factory output parses; no JSON in `test-data/static/` |
| A test fails or is flaky | ai-native-workflow -> `/qa-test-stabilization` (healer: selector / timing / data / real defect) | Fixed non-defect cause, or `expectOpenDefect` + DEF file |
| The site changed (new menu, new page) | ai-native-workflow -> `/qa-maintenance` -> `/qa-spec-generation` (delta) -> `/qa-automation` | Specs updated first, then tests |
| Contact form checks (CON) | ai-native-workflow -> `/qa-automation` with the read-only rule: presence and client-side validation only; any submit test `@destructive` + `test.skip` | No request leaves the browser with form data |
| Review a branch before merge | `.github/prompts/pr-reviewer.prompt.md` | Report with findings citing AGENTS.md rule IDs |
| Run a tagged subset | `cd qa/07-automation/e2e && npm run test:smoke` (or `test:sanity`, `test:regression`, `test:e2e`, `test:p0`) | Report from `test-results/results.json` |

## Tags and scripts

| Tag | Meaning | Script |
|---|---|---|
| `@smoke` | Critical path, minutes | `npm run test:smoke` |
| `@sanity` | Narrow check after a change | `npm run test:sanity` |
| `@regression` | Full functional coverage | `npm run test:regression` |
| `@e2e` | Multi-page journey | `npm run test:e2e` |
| `@api` | HTTP-level check | (none yet) |
| `@destructive` | Could send data or change state; skipped by default on production | `npm run test:destructive` (never against production without approval) |

`npm test` runs everything except `@destructive`. Priority filters: `npm run test:p0`, `test:p1`.
