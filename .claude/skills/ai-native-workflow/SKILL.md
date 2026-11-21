---
name: ai-native-workflow
description: Single entry point for any non-trivial QA or automation task in this repository (testingenchile.cl). Classifies the request, routes it to the right @keber/qa-framework stage command, explores the live site, writes a confidence-scored Proposal and stops at a human gate before editing. Use first for new specs, test plans, test cases, page objects, specs, failing or flaky tests, site changes and reviews.
---

# AI-native workflow (entry point)

Adapted from agentic-playwright (Ivan Davidov, MIT) for `@keber/qa-framework`.
Rules live in `AGENTS.md` (Constitution in section 6) and `.claude/rules/*.md`.
This skill decides **what to load and when to stop**; it never overrides those rules.

**Ask, don't invent.** A selector, route, expected text, business rule or acceptance
criterion you have not observed or been given is an unknown, not a default.

## 1. Classify

| Class | Signal | Mode |
|---|---|---|
| Trivial | typo, one import, one-line config value | Direct: verify the premise, apply, verify, report |
| Standard | one page object, one spec, one stage artifact | Full workflow |
| Broad | several modules, refactor, new harness feature | Full workflow, split into one proposal per unit |

## 2. Route (intent -> stage)

Respect each stage prerequisite (`.claude/rules/qa-framework.md`, QA Pipeline). Never skip one.

| Intent | Command | Prerequisite |
|---|---|---|
| Understand a module or section of the site | `/qa-module-analysis` | None |
| Write business rules, workflows, scenarios | `/qa-spec-generation` | `00-inventory.md` exists |
| Plan testing for a module | `/qa-test-plan` | `05-test-scenarios.md` exists |
| Write test cases | `/qa-test-cases` | Test plan exists |
| Page objects, fixtures, data, specs | `/qa-automation` + AGENTS.md section 6 | Specs approved, no PENDING-CODE |
| A test is failing, flaky or slow | `/qa-test-stabilization` (healer, section 8) | Failing tests exist |
| The site changed | `/qa-maintenance` | Change delivered |
| Review a branch | `.github/prompts/pr-reviewer.prompt.md` | Branch named |

Multi-step tasks: follow the sequences in `AI-WORKFLOWS.md`.

## 3. Explore

- Read the stage skill (`.github/skills/qa-{name}/SKILL.md`) and the memory files it needs
  (`qa/memory/INDEX.md` first).
- Read existing code under `qa/07-automation/e2e/` (`tests/`, `pages/`, `enums/`,
  `test-data/`) to reuse page objects, routes and data.
- UI work: observe the live page before writing any selector (accessibility snapshot of
  the page or region, via a throwaway script in the scratchpad or `tests/helpers/debug/`,
  never committed). Read-only: no form submission, no "Aceptar todo".

## 4. Plan

Write a proposal before any edit:

```markdown
## Proposal
**Scope**: files to create or change, TC IDs, stage.
**Trade-offs**: options considered and why this one.
**Confidence**: N/10
**Rationale**: evidence (observed selectors, spec rules, file:line).
**Unknowns**: what is not observed or specified (empty if none).
```

## 5. Human gate

| Confidence | Interactive session | Headless / sub-agent run |
|---|---|---|
| < 5 | Stop and ask | Stop and report |
| 5 - 7 | Proceed only after the human accepts the listed unknowns | Stop and report |
| >= 8, no unknowns | Proceed | Proceed |
| >= 8, unknowns listed | Ask about the unknowns | Stop and report |

## 6. Apply

- Smallest change that satisfies the proposal. Follow AGENTS.md section 6 (K1-K12, W1-W11).
- The PreToolUse hook blocks Constitution violations: fix the content, never the hook.
- Spanish text keeps accents, ñ, ¿, ¡; no em/en dash, ellipsis, curly quotes or arrows.

## 7. Verify

From the repository root:

```bash
npm run lint && npm run typecheck && npm run check:constitution
cd qa/07-automation/e2e && npx playwright test <affected spec files>
```

Then the encoding checkers on every created or changed file (framework rule 11):
`node node_modules/@keber/qa-framework/scripts/check-forbidden-chars.js <paths>` and
`node node_modules/@keber/qa-framework/scripts/check-spanish-accents.js <paths>`.

Red is never done: go to section 8.

## 8. Healer (failing tests)

Follow `.github/skills/qa-test-stabilization/SKILL.md` and its
`references/classification-protocol.md`. Reproduce first (run the failing spec, read the
trace / screenshot in `test-results/`), then classify each failure:

| Class | Stabilization category | Action |
|---|---|---|
| Selector drift | A | Re-observe the page; update the page-object getter (role > label > placeholder > text > testId) |
| Timing | B | Replace with a web-first assertion or auto-waiting locator; never `waitForTimeout` |
| Data / content drift | C, E | Update `enums/` or `test-data/static/`; if the spec changed, update the spec first |
| Environment / network | F, G, H | Fix config or base URL; site down is an infrastructure error, not a defect |
| Real defect | I with spec violated | **Do not fix the test.** Keep the spec assertion, wrap it in `expectOpenDefect('DEF-TCH-NNN', ...)` and file `qa/06-defects/open/DEF-TCH-NNN_*.md` (framework rules 8 and 10) |

Fix only non-defect causes. Never invert or weaken an assertion; never add retries or
skips to hide a failure. Quarantine (`test.skip`) needs a `PENDING-*` reason and human approval.

## 9. Report

Files changed; lint, typecheck, constitution scan and test results (counts from the tool
output); encoding checker output; open unknowns. Ask before committing.
