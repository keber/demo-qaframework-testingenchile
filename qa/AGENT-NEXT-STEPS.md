# ✅ @keber/qa-framework installed successfully

> This file was generated automatically by the postinstall script.
> Read it and follow the steps below, then delete this file.

## What was scaffolded

- `qa/` folder structure with spec templates and agent instructions
- `.github/instructions/qa-framework.instructions.md` with QA agent behavior rules (framework-owned, safe to upgrade)
- `.claude/rules/qa-framework.md` and `.claude/commands/qa-*.md` - equivalent Claude Code artifacts (framework-owned, safe to upgrade)

## Required next steps

### 1. Configure your project modules
Edit `qa/qa-framework.config.json` and add your project modules under the `"modules"` array.

### 2. Optional integrations

**Azure DevOps integration:**
```bash
npm install @keber/ado-qa
```

**Playwright E2E automation:**
```bash
npm install @playwright/test
cd qa/07-automation/e2e && npm install && npx playwright install chromium
```

**Playwright API/integration automation:**
```bash
cd qa/07-automation/integration && npm install
```

### 3. Credentials
- Copy `qa/07-automation/e2e/.env.example` -> `qa/07-automation/e2e/.env` and fill in credentials
- Copy `qa/07-automation/integration/.env.example` -> `qa/07-automation/integration/.env` and fill in credentials
- Add both `.env` files and both `.auth/` folders to `.gitignore`

### 4. Optional: review rulebook (AGENTS.md)
If the repository has no `AGENTS.md` at its root, copy `qa/00-standards/agents-md-template.md`
to `AGENTS.md` and fill in its placeholders with the user. It gives reviewers rule IDs to cite,
a register of tracked exceptions and a list of what NOT to report. If an `AGENTS.md` already
exists, do not replace it: offer to merge the sections it lacks. The framework never edits it.
