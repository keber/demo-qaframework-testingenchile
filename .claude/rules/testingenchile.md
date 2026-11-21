# testingenchile - project rules (project-owned)

Loaded next to the framework-owned `.claude/rules/qa-framework.md`. This file is owned by the
project: `npx qa-framework upgrade` never touches it. The full rulebook is `AGENTS.md`.

## Site under test

- https://www.testingenchile.cl - Webnode CMS, public, **no users, no login, no private area**.
- The only environment is **production**. Every automated test is read-only.
- Modules: HOME (inicio y navegación global), CAP (capacitaciones), EVT (eventos Testing Day),
  CON (contacto y formularios), LEG (contenido legal y blog).

## Rules

1. **Read-only automation.** Never submit a real form. CON tests check only field presence and
   client-side required-field validation, without a successful submission. A test that could
   send data is tagged `@destructive` and `test.skip()`ped by default, with the reason in the
   skip message. Workers are capped at 2; no load or stress runs against the site.
2. **No auth machinery.** No storageState, no setup project, no lanes: framework rule 12 (lane
   lock) does not apply while `parallelLanes.enabled` is `false`. `fixtures/auth.ts`,
   `fixtures/base.ts` and `scripts/lane-*.js` are kept on disk (init bootstrap) but are inert.
3. **Constitution.** Automation in `qa/07-automation/e2e/` follows section 6 of `AGENTS.md`.
   The PreToolUse hook `node scripts/enforce-constitution.mjs` (wired in `.claude/settings.json`)
   blocks Write/Edit/MultiEdit that add a violation; fix the content, never bypass the hook.
4. **Entry point.** Non-trivial tasks start with `.claude/skills/ai-native-workflow/SKILL.md`,
   which routes to the `/qa-*` stage commands and stops at a `## Proposal` before editing.
5. **Encoding (framework rule 11, both halves).** No em/en dash, ellipsis, curly quotes or
   arrows; Spanish text keeps every accent, ñ, ¿ and ¡. Run both checkers on what you create.
6. **Cookie banner.** The site shows a consent banner ("Aceptar solo lo necesario" /
   "Aceptar todo"). Tests that must interact behind it choose "Aceptar solo lo necesario"
   (privacy-preserving) through a page-object action, never "Aceptar todo".
7. **Content drift.** Marketing copy (hero headings, course names, event year) changes often.
   Assert structure and routes; put expected texts in `enums/messages.ts` or
   `test-data/static/` so a content change is a one-line data update, classified as
   selector/data drift by the healer, never as a defect unless a spec rule is violated.
