# AGENTS.md - Rules for the testingenchile QA repository

> QA repository for **Testing en Chile** (https://www.testingenchile.cl), a public
> institutional site built on Webnode CMS. **No users, no login, no private area.**
> It holds specifications, test cases and Playwright automation. It does not hold product
> code: the site is a third-party CMS and is read-only for QA.
>
> Framework: `@keber/qa-framework` v1.14.0-rc.9 (pipeline, specs, defects, rules 1-14).
> Automation harness: adapted from [agentic-playwright](https://github.com/idavidov13/agentic-playwright)
> by Ivan Davidov (MIT) - the Constitution, workflow, enforcer and reviewer below.

Every rule has an ID. A review finding cites the rule it violates ("violates K3"); a finding
that cannot cite a rule is an opinion, not a finding. **When this file and the qa-framework
disagree, the qa-framework wins** (section 11 lists every reconciliation).

Read first, every session: `.claude/rules/qa-framework.md` (framework-owned),
`.claude/rules/testingenchile.md` (project-owned), `qa/QA-STRUCTURE-GUIDE.md`.

---

## 1. Security - blocking

| # | Rule | Why |
|---|---|---|
| S1 | **Zero credentials in versioned files** | A versioned secret stays in history |
| S2 | Any credential is referenced by env var name; in docs, `<PLACEHOLDER>` | `credentialPolicy: env-vars-only` |
| S3 | `.env`, `.auth/`, `test-results/`, `playwright-report/` stay in `.gitignore` | Local state and artifacts |
| S4 | No real personal data in versioned files (names, RUT, emails, phones) | Ley 19.628 (Chile) on personal data |
| S5 | Test data is synthetic and obviously fictitious (`QA ...` prefix, `example.com` emails) | A real identifier is versioned personal data |
| S6 | No offensive payloads, exploits or attack steps; pentesting goes through the formal security process | Organization policy |
| S7 | **Production public site: tests are READ-ONLY.** No real form submission, workers <= 2, no load generation | The only environment is production |

## 2. Character encoding - blocking (framework rule 11)

Forbidden: em dash U+2014, en dash U+2013, ellipsis U+2026, curly quotes U+201C/U+201D/U+2018/U+2019,
arrows U+2190-U+21FF. Use ` - `, `...`, `"`/`'`, `->`/`<-`.

**Required:** Spanish text is written correctly, with `á é í ó ú ñ ü ¿ ¡`. Stripping accents
**is the violation**, not the fix. When restating this rule anywhere, carry both halves.
BOM: `.ps1` with BOM; every other file without BOM.

Verify by running and reporting:
`node node_modules/@keber/qa-framework/scripts/check-forbidden-chars.js <paths>` and
`node node_modules/@keber/qa-framework/scripts/check-spanish-accents.js <paths>`.

## 3. Assertion integrity - blocking (framework rules 8 and 10)

| # | Rule |
|---|---|
| A1 | A test asserts what the **specification** requires, not what the site does |
| A2 | Spec violated -> `test.fail()` (via `expectOpenDefect`) **plus** `qa/06-defects/open/DEF-TCH-NNN_*.md`. Never invert or weaken an assertion |
| A3 | A red test exposing a real defect is worth more than a green one hiding it |
| A4 | Expected results are observable and measurable |

Valid TC states: passing `test()`; `test.fail()` + defect file; `test.skip()` with `PENDING-CODE`
(or `PENDING-BROWSER` / `PENDING-SPEC`) and a reason. A finding that violates no rule is a
recommendation (`qa/06-defects/recommendations/REC-TCH-NNN`), never a `test.fail()`.

## 4. Specification traceability

| # | Rule |
|---|---|
| T1 | Every business rule cites its evidence (URL + observation date, or the source document) |
| T2 | Without evidence it is a guess: leave it out or mark it unsupported |
| T5 | A TC is `UI-OBSERVED` only if it was actually observed on the live site |

## 5. Framework structure

| # | Rule |
|---|---|
| E1 | Six files per submodule: `00-inventory.md` ... `05-test-scenarios.md` |
| E2 | `qa/01-specifications/module-{name}/submodule-{name}/`, kebab-case |
| E4 | IDs: `RN-{MODULE}-{NNN}`, `FL-{MODULE}-{NNN}`, `TC-{MODULE}-{SUBMODULE}-{NNN}`, `DEF-TCH-{NNN}`, `REC-TCH-{NNN}`. Modules: HOME, CAP, EVT, CON, LEG |
| E7 | **Never edit framework-owned files**: `.claude/rules/qa-framework.md`, `.claude/commands/qa-*`, `.github/skills/qa-*`, `.github/instructions/qa-framework.instructions.md`, `qa/QA-STRUCTURE-GUIDE.md`. Project rules go in `.claude/rules/testingenchile.md` |

---

## 6. Constitution (automation in `qa/07-automation/e2e/`)

Paths below are relative to `qa/07-automation/e2e/`. Rules marked `[hook]` are enforced by
`scripts/enforce-constitution.mjs` (PreToolUse hook + `--scan`); `[lint]` by ESLint.

### MUST

- **K1 Dependency Injection**: page objects are fixtures from `fixtures/pom/page-object-fixture.ts`. `[hook: no-manual-instantiation]`
- **K2 Imports**: specs import `test` / `expect` only from `fixtures/pom/test-options.ts` (a `mergeTests` of the page-object fixture and helpers). `import type` from `@playwright/test` is fine. `[hook: no-playwright-test-import]`
- **K3 Selectors**: `getByRole()` > `getByLabel()` > `getByPlaceholder()` > `getByText()` > `getByTestId()` (default `data-testid`). `[lint: no-raw-locators]`
- **K4 Page objects**: files `*.page.ts` / `*.component.ts` under `pages/`; locators as `get x(): Locator` getters (no JSDoc); action methods with JSDoc; shared parts composed (`readonly nav: NavigationComponent`). `[hook: no-jsdoc-on-locators]`
- **K5 Sources of truth**: base URL from `QA_BASE_URL` (fallback `project.qaBaseUrl` in `qa/qa-framework.config.json`); paths in `enums/routes.ts`; expected texts in `enums/messages.ts`. `[hook: no-hardcoded-url, no-hardcoded-goto-url]`
- **K6 Data**: static curated data in `test-data/static/**/*.ts` with `as const`; happy-path data from Faker factories in `test-data/factories/` with `Partial<T>` overrides validated by Zod. `[hook: no-json-static-data, no-runtime-code-in-static-data]`
- **K7 Schemas**: `import { z } from 'zod/v4'` and `z.strictObject()` only, in `schemas/`. `[hook: no-loose-schema]`
- **K8 Assertions**: web-first (`await expect(locator).toBeVisible()`). `[lint: prefer-web-first-assertions]`
- **K9 Test structure**: one top-level `test.describe` per file; GIVEN / WHEN / THEN `test.step()`s, each also carrying the `// Arrange`, `// Act`, `// Assert` comment (rule P6). `[lint: require-top-level-describe]`
- **K10 Title and tags**: title `[TC-{MODULE}-{SUB}-{NNN}] {title} @P0..@P3` (qa-framework `testNamingPattern`); **exactly one type tag** in the options: `test('[TC-...] ... @P0', { tag: '@smoke' }, ...)`. Type tags: `@smoke @sanity @regression @e2e @api @destructive`. `[hook: no-invalid-test-title, no-missing-tag, no-multiple-tags, no-unknown-tag, no-tag-in-title]`
- **K11 Verification**: run `npx playwright test <file>` after every spec edit; red is never done.
- **K12 Explore before generate**: selectors come from observing the live site (accessibility snapshot), never invented.

### SHOULD

- Repeated strings come from `enums/`. Expected-defect tests use `expectOpenDefect()` from `fixtures/defects.ts` (re-exported by `test-options.ts`).

### WON'T

- **W1 No XPath**. `[hook: no-xpath]`
- **W2 No hard waits** (`waitForTimeout`, Promise/setTimeout sleeps). `[hook: no-hard-wait]` `[lint: no-wait-for-timeout]`
- **W3 No `any`**. `[lint: no-explicit-any]`
- **W4 No tags on describe**. `[hook: no-tags-on-describe]`
- **W5 No multiple tags**; never `@functional`.
- **W6 No manual instantiation** in specs.
- **W7 No loose schemas** (`z.object`, `z.looseObject`, `.catchall`).
- **W8 No JSON static data**.
- **W9 No real submissions**: a test that could send data is tagged `@destructive` and `test.skip()`ped by default (rule S7).
- **W10 No explore-only files** committed (page dumps, probe specs). Diagnostics go to `tests/helpers/debug/` (ignored by the runner) or `diagnosis/` (gitignored).
- **W11 No `test.only`**. `[lint: no-focused-test]`

## 7. Workflow: Proceed -> Verify -> Commit

- **Proceed**: load `.claude/skills/ai-native-workflow/SKILL.md` first on every non-trivial task. It classifies, routes to the qa-framework stage, explores and stops at a confidence-scored `## Proposal` before any edit. Trivial edits (typo, single import): direct mode - verify the premise, apply, report.
- **Verify**: `npm run lint`, `npm run typecheck`, `npm run check:constitution`, then `npx playwright test <affected files>` from `qa/07-automation/e2e`. Red means the healer (`/qa-test-stabilization`), never a loosened test.
- **Commit**: ask first; one verified task per commit (section 10).

## 8. Skills index

| Need | Load |
|---|---|
| Any non-trivial task | `.claude/skills/ai-native-workflow/SKILL.md` |
| Analyze a module (stage 1) | `/qa-module-analysis` |
| Specifications (stage 2) | `/qa-spec-generation` |
| Test plan (stage 3) | `/qa-test-plan` |
| Test cases (stage 4) | `/qa-test-cases` |
| Automation: page objects, fixtures, specs (stage 5) | `/qa-automation` + section 6 |
| Failing or flaky tests (stage 5b, healer) | `/qa-test-stabilization` |
| Site changed (stage 6) | `/qa-maintenance` |
| Review a branch | `.github/prompts/pr-reviewer.prompt.md` |

Task-to-skill sequences: `AI-WORKFLOWS.md`.

## 9. Verification tools

Run them and report the output; never claim compliance (H3, H4).

```bash
npm run lint                 # ESLint, --max-warnings 0
npm run typecheck            # tsc --noEmit
npm run check:constitution   # node scripts/enforce-constitution.mjs --scan
npm run test:smoke           # @smoke against the live site (read-only)
npm run check:encoding       # framework rule 11, half (a)
npx qa-framework validate --strict
```

| # | Rule |
|---|---|
| H1 | Never invent a timestamp: `npx qa-framework clock --tz America/Santiago` |
| H3 | Reported counts come from tool output |
| H4 | A green tool is not proof of everything: wording and citations need human reading |

### Before you report done

1. Lint, typecheck and constitution scan clean; affected tests green; no `test.only`.
2. A failing check is a rule you missed: fix the cause, never bypass the check (no `eslint-disable` of a Constitution rule, no hook edits to get green).
3. Encoding checkers run on every file you created or changed, output reported.
4. Report files changed and check results; ask before committing.

## 10. Commit messages

| # | Rule |
|---|---|
| C1 | Conventional commits: `type(scope): description` |
| C2 | **No AI attribution**: no `Co-Authored-By`, no tool references, no signature footers |
| C3 | The body explains why |
| C4 | Atomic commits: one purpose each |
| C5 | Commit messages in English |

## 11. Reconciliations with @keber/qa-framework

| Topic | agentic-playwright | Decision here (qa-framework wins) |
|---|---|---|
| Test title | free title, tag may sit in title | `[TC-MODULE-SUB-NNN] title @P0..@P3` (`testNamingPattern`); the type tag lives only in `{ tag }`; the title carries only the priority. The enforcer accepts `@P0..@P3` in titles |
| Steps | GIVEN/WHEN/THEN `test.step` | Both: GIVEN/WHEN/THEN steps, each with the `// Arrange` / `// Act` / `// Assert` comment of rule P6 |
| Failing behavior | `test.skip` + `FIXME` | Framework rules 8 and 10: `test.fail()` via `expectOpenDefect` + `DEF-TCH-NNN` file; `test.skip` only with `PENDING-*` |
| Debugging skill | `debugging` | `/qa-test-stabilization` (stage 5b) is the healer: classify, fix non-defect causes only |
| Pipeline | intent -> skill table | Intent routes to the qa-framework stage commands, respecting their prerequisites |
| Folder layout | `pages/{area}`, `fixtures/api/schemas` | Lives inside `qa/07-automation/e2e/`; schemas in `schemas/`; specs per module in `tests/{module}/` |
| Auth / storage state | auth bootstrap helpers | Not applicable: no login. Scaffold auth/lane files kept on disk (init files must not be deleted) but inert and exempt from lint/enforcer |
| Environment | `env/.env.example`, `APP_URL` | `qa/07-automation/e2e/.env.example`, `QA_BASE_URL` with manifest fallback |
| Enforcer | Python | Node (`scripts/enforce-constitution.mjs`): python3 is unreliable on Windows |
| Encoding | not covered | Framework rule 11 applies to every artifact, Spanish accents mandatory |
| Lint warnings | zero warnings | Zero warnings kept (`--max-warnings 0`) |

## 12. What NOT to report as a finding

| Situation | Why |
|---|---|
| `PENDING-BROWSER` / `PENDING-CODE` / `PENDING-SPEC` TCs | Honest marks of what is not observed or specified |
| `<PLACEHOLDER>` text in docs or `.env.example` | Required by S2 |
| `expectOpenDefect` on a test whose defect is still open | How an open defect stays in regression |
| `fixtures/auth.ts`, `fixtures/base.ts`, `scripts/lane-*.js` not following the Constitution | Framework bootstrap, inert for this no-auth project, exempt by design |
| A skipped `@destructive` test | Required by S7 / W9 on the production site |
| ASCII flow diagrams (`|`, `v`, `->`) | Consequence of the arrow ban |
