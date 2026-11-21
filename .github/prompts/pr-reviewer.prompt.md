---
mode: agent
description: Review a branch diff against AGENTS.md (Constitution + qa-framework rules) and run lint, typecheck, constitution scan and affected tests.
---

# PR reviewer - testingenchile QA repository

Review branch `${input:branch}` against base `${input:base:develop}`. Read-only review: do not
edit, commit or push. Every finding cites an `AGENTS.md` rule ID (S*, A*, T*, E*, K*, W*, H*, C*);
a finding without a rule ID is an opinion and goes under "Notes". Skip everything listed in
`AGENTS.md` section 12.

## 1. Collect the diff

```bash
git fetch --all --quiet
git diff --name-status ${input:base:develop}...${input:branch}
git log --oneline ${input:base:develop}..${input:branch}
```

Read every changed file in full, plus `AGENTS.md`, `.claude/rules/qa-framework.md` and
`.claude/rules/testingenchile.md`.

## 2. Deterministic checks (run, report the output)

From the repository root, on the branch checked out:

```bash
npm run lint                  # ESLint, zero warnings
npm run typecheck             # tsc --noEmit
npm run check:constitution    # scripts/enforce-constitution.mjs --scan
node node_modules/@keber/qa-framework/scripts/check-forbidden-chars.js <changed files>
node node_modules/@keber/qa-framework/scripts/check-spanish-accents.js <changed .md files>
cd qa/07-automation/e2e && npx playwright test <changed spec files>
```

Specs run against the production public site: run only the changed specs, never
`@destructive`, never with more than 2 workers.

## 3. Human-judgment checklist

- **A1-A3**: assertions follow the spec; no inverted or weakened assertion; every `test.fail()` /
  `expectOpenDefect` has a `qa/06-defects/open/DEF-TCH-NNN_*.md`.
- **S4, S5, S7, W9**: no real personal data; no real form submission; risky tests `@destructive` + skipped.
- **K3**: selector priority role > label > placeholder > text > testId; no CSS/XPath where a role exists.
- **K4**: getters without JSDoc, actions with JSDoc, components composed.
- **K9, K10**: GIVEN/WHEN/THEN steps with Arrange/Act/Assert comments; title `[TC-...] ... @P0..@P3`; one type tag.
- **E7**: no framework-owned file edited.
- **Rule 11**: Spanish text has accents, ñ, ¿, ¡ (checker output plus reading).
- **C1-C4**: conventional, atomic commits; no AI attribution.

## 4. Report

```markdown
## Review: ${input:branch} -> ${input:base:develop}
**Verdict**: approve | request changes
### Checks
| Check | Result |
|---|---|
| lint | ... |
| typecheck | ... |
| constitution scan | ... |
| encoding (forbidden / accents) | ... |
| tests | N passed, N failed, N skipped |
### Findings
| Severity | Rule | Location | Finding |
|---|---|---|---|
### Notes
```

Severity: BLOCKER (security, assertion integrity, failing check), WARNING (Constitution SHOULD,
maintainability), SUGGESTION. Counts come from tool output, never estimates.
