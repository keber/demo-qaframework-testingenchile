#!/usr/bin/env node
/**
 * Deterministic enforcement of the AGENTS.md Constitution (Node port of the
 * agentic-playwright `enforce_constitution.py`, adapted to @keber/qa-framework).
 *
 * Modes
 *   1. PreToolUse hook (default): reads the Claude Code hook payload from stdin
 *      ({"tool_name": ..., "tool_input": {...}}). Only Write / Edit / MultiEdit
 *      on `.ts` files under qa/07-automation/e2e/ (plus `.json` under
 *      test-data/static/) are judged. Write is judged on the whole new file;
 *      Edit / MultiEdit are applied in memory and only violations they ADD are
 *      reported, so a pre-existing problem elsewhere does not block an edit.
 *        exit 0 -> allow, exit 2 -> block (stderr is fed back to the agent).
 *      Anything else (other tools, other paths, unparsable stdin, internal
 *      errors) exits 0: the hook never fails closed on unrelated input.
 *   2. Scan (`--scan [file|dir ...]`): same rules on files on disk. Without
 *      arguments it scans the whole e2e project. One line per violation:
 *        <rule-id>\t<path>:<line>:<match>
 *      exit 0 = clean, 1 = violations. Used by pre-commit, CI and pr-reviewer.
 *
 * Comments are blanked before matching (a `//` note about waitForTimeout is not
 * a hard wait); string literals and JSDoc blocks are kept.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT =
  process.env.CLAUDE_PROJECT_DIR && fs.existsSync(process.env.CLAUDE_PROJECT_DIR)
    ? process.env.CLAUDE_PROJECT_DIR
    : path.dirname(SCRIPT_DIR);
const E2E_ROOT = 'qa/07-automation/e2e';

// qa-framework init bootstrap kept on disk but inert (no-auth project); the
// framework owns its style, so the Constitution does not judge it.
const EXEMPT = [/^scripts\//i, /^fixtures\/auth\.ts$/i, /^fixtures\/base\.ts$/i];
const SKIP_DIRS = new Set(['node_modules', 'test-results', 'playwright-report', 'blob-report', 'diagnosis', '.auth']);

// ---------------------------------------------------------------- tags
const TYPE_TAGS = ['@smoke', '@sanity', '@regression', '@e2e', '@api', '@destructive'];
const PRIORITY_TAG = /^@P[0-3]$/;
// A tag token is preceded by start, space, quote or paren - never a word char
// or a dot, so `user@example.com` is not a tag.
const TAG_TOKEN = /(?<![\w.\-])@[A-Za-z][\w-]*/g;
// qa-framework testNamingPattern `[{ID}] {title} @{priority}`.
const TITLE_PATTERN = /^\[TC-[A-Z0-9]+-[A-Z0-9]+-\d{3}\] \S.*\S @P[0-3]$/;

// ---------------------------------------------------------------- path scopes (relative to e2e root)
const SPEC_FILE = /^tests\/.+\.spec\.ts$/i;
const TS_FILE = /\.ts$/i;
const SCHEMA_FILE = /^(schemas|fixtures\/api\/schemas)\/.+\.ts$/i;
const UI_OR_TEST_FILE = /^(pages|tests)\/.+\.ts$/i;
const STATIC_JSON = /^test-data\/static\/.+\.json$/i;
const STATIC_TS = /^test-data\/static\/.+\.ts$/i;
const PAGES_TS = /^pages\/.+\.ts$/i;
const URL_SCOPE = /^(tests|fixtures|pages|helpers|enums|config|test-data|schemas)\/.+\.ts$|^playwright\.config\.ts$|^global-setup\.ts$/i;

// ---------------------------------------------------------------- content patterns
const PLAYWRIGHT_VALUE_IMPORT = /^\s*import\s+(?!type\b)(?:\{[^;}]*\}|[^;{\n])*?from\s+['"]@playwright\/test['"]/m;
const HARD_WAIT =
  /\bwaitForTimeout\s*\(|\[\s*['"]waitForTimeout['"]\s*\]|\bnew\s+Promise\b[\s\S]{0,80}?\bsetTimeout\b|from\s*['"](?:node:)?timers\/promises['"]|\brequire\(\s*['"](?:node:)?timers\/promises['"]/;
const LOOSE_SCHEMA = /\b[\w$]+\s*\.\s*(?:object|looseObject)\s*\(|\.\s*catchall\s*\(/;
const SELECTOR_CALL =
  String.raw`(?:locator|frameLocator)\(|page\s*\.\s*(?:click|dblclick|fill|check|uncheck|hover|tap|type|selectOption|dispatchEvent|waitForSelector|setChecked|setInputFiles|press)\s*\(`;
const XPATH_SELECTOR = new RegExp(
  String.raw`['"\x60][^'"\x60\n]*xpath=|(?:${SELECTOR_CALL})\s*['"\x60](\s|\()*\/\/|(?:${SELECTOR_CALL})\s*['"\x60]\.\.(?:['"\x60]|\/)|['"\x60]\s*\(*(?:descendant|descendant-or-self|ancestor|ancestor-or-self|following|following-sibling|preceding|preceding-sibling|child|parent|self)::`,
);
const MANUAL_INSTANTIATION = /new\s+(?:[\w$]+\s*\.\s*)*[A-Z][A-Za-z0-9_]*(?:Page|Component)\s*\(/;
const HARDCODED_URL = /\b(url|baseUrl|baseURL|apiUrl)\s*:\s*['"`]https?:\/\//i;
const HARDCODED_GOTO_URL = /\.goto\(\s*['"`]https?:\/\//i;
const NON_TYPE_IMPORT = /^\s*import\s+(?!type\b)(?!\{(?:\s*type\s+[\w$]+(?:\s+as\s+[\w$]+)?\s*,?)+\s*\}\s*from)/m;
const JSDOC_ON_LOCATOR =
  /\/\*\*(?:(?!\*\/)[\s\S])*\*\/\s+(?:(?:public|protected|private|readonly)\s+)*get\s+[\w$]+\s*\(\s*\)\s*:\s*Locator\b/;
const DESCRIBE_CALL = /\b(?:test\s*\.\s*)?describe(?:\s*\.\s*(?:only|skip|fixme|serial|parallel|configure))?\s*\(\s*(['"`])((?:(?!\1)[^\n\\]|\\.)*)\1\s*,\s*/g;
const TEST_CALL = /\btest(?:\s*\.\s*(?:only|skip|fixme|fail|slow))?\s*\(\s*(['"`])((?:(?!\1)[^\n\\]|\\.)*)\1\s*,\s*/g;

/** Text of a balanced `{...}` starting at `start` (bounded, string-aware). */
function readObject(content, start) {
  if (content[start] !== '{') return null;
  let depth = 0;
  let quote = null;
  const limit = Math.min(content.length, start + 2000);
  for (let i = start; i < limit; i += 1) {
    const ch = content[i];
    if (quote) {
      if (ch === '\\') i += 1;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') quote = ch;
    else if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return content.slice(start, i + 1);
    }
  }
  return null;
}

/** Tags declared in a `{ tag: ... }` option: null when there is no tag key. */
function optionTags(optionText) {
  if (!optionText) return null;
  const m = /\btag\s*:\s*(\[[^\]]*\]|['"`][^'"`]*['"`])/.exec(optionText);
  if (!m) return /\btag\s*:/.test(optionText) ? ['<non-literal>'] : null;
  return [...m[1].matchAll(/['"`]([^'"`]*)['"`]/g)].map((x) => x[1].trim());
}

/** Tag-related findings for one spec file. */
function tagFindings(content) {
  const out = [];
  for (const m of content.matchAll(DESCRIBE_CALL)) {
    const title = m[2];
    const after = m.index + m[0].length;
    const opts = readObject(content, after);
    if ((title.match(TAG_TOKEN) || []).length > 0 || (opts && /\btag\s*:/.test(opts))) {
      out.push({ rule: 'no-tags-on-describe', index: m.index, text: m[0] });
    }
  }
  for (const m of content.matchAll(TEST_CALL)) {
    const title = m[2];
    const after = m.index + m[0].length;
    const opts = readObject(content, after);
    const tags = optionTags(opts);
    const titleTokens = title.match(TAG_TOKEN) || [];
    const hit = (rule) => out.push({ rule, index: m.index, text: m[0] });

    if (!TITLE_PATTERN.test(title)) hit('no-invalid-test-title');
    for (const tok of titleTokens) {
      if (TYPE_TAGS.includes(tok)) hit('no-tag-in-title');
      else if (!PRIORITY_TAG.test(tok)) hit('no-unknown-tag');
    }
    if (!tags || tags.length === 0) {
      hit('no-missing-tag');
      continue;
    }
    if (tags.length > 1 || (titleTokens.some((t) => TYPE_TAGS.includes(t)) && tags.length > 0)) {
      hit('no-multiple-tags');
    }
    for (const t of tags) {
      if (!TYPE_TAGS.includes(t)) hit('no-unknown-tag');
    }
  }
  return out;
}

/** Blank `//` and plain block comments; keep strings, JSDoc and newlines. */
function stripComments(content) {
  let out = '';
  let quote = null;
  let i = 0;
  let last = '';
  const n = content.length;
  while (i < n) {
    const ch = content[i];
    if (quote) {
      out += ch;
      if (ch === '\\' && i + 1 < n) {
        out += content[i + 1];
        i += 2;
        continue;
      }
      if (ch === quote || (ch === '\n' && quote !== '`')) quote = null;
      i += 1;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      quote = ch;
      out += ch;
      last = ch;
      i += 1;
      continue;
    }
    if (ch === '/' && content[i + 1] === '/') {
      const j = content.indexOf('\n', i) === -1 ? n : content.indexOf('\n', i);
      out += ' '.repeat(j - i);
      i = j;
      continue;
    }
    if (ch === '/' && content[i + 1] === '*' && content[i + 2] !== '*') {
      const end = content.indexOf('*/', i + 2);
      const j = end === -1 ? n : end + 2;
      out += content.slice(i, j).replace(/[^\n]/g, ' ');
      i = j;
      continue;
    }
    // Regex literal in expression position: copy verbatim up to the closing slash.
    if (ch === '/' && /[=(,:[!&|?{};]/.test(last || '=')) {
      let j = i + 1;
      let inClass = false;
      while (j < n && content[j] !== '\n') {
        if (content[j] === '\\') j += 1;
        else if (content[j] === '[') inClass = true;
        else if (content[j] === ']') inClass = false;
        else if (content[j] === '/' && !inClass) break;
        j += 1;
      }
      out += content.slice(i, j + 1);
      last = '/';
      i = j + 1;
      continue;
    }
    out += ch;
    if (!/\s/.test(ch)) last = ch;
    i += 1;
  }
  return out;
}

// (id, path predicate, content predicate | null, message)
const RULES = [
  ['no-playwright-test-import', (p) => SPEC_FILE.test(p), (c) => PLAYWRIGHT_VALUE_IMPORT.exec(c),
    'Spec files import `test`/`expect` from `fixtures/pom/test-options.ts`, never from `@playwright/test` (`import type` is fine).'],
  ['no-hard-wait', (p) => TS_FILE.test(p), (c) => HARD_WAIT.exec(c),
    '`waitForTimeout()` and Promise/setTimeout sleeps are forbidden. Use web-first assertions such as `await expect(locator).toBeVisible()`.'],
  ['no-loose-schema', (p) => SCHEMA_FILE.test(p), (c) => LOOSE_SCHEMA.exec(c),
    'Schemas use `z.strictObject()` from `zod/v4`; never `z.object()`, `z.looseObject()` or `.catchall()`.'],
  ['no-xpath', (p) => UI_OR_TEST_FILE.test(p), (c) => XPATH_SELECTOR.exec(c),
    'XPath is forbidden. Use getByRole > getByLabel > getByPlaceholder > getByText > getByTestId.'],
  ['no-json-static-data', (p) => STATIC_JSON.test(p), null,
    'Files under `test-data/static/` are TypeScript with `as const` exports; JSON is forbidden.'],
  ['no-runtime-code-in-static-data', (p) => STATIC_TS.test(p), (c) => /\bfaker\./.exec(c) || NON_TYPE_IMPORT.exec(c),
    'Static data exports literal values only (`as const`); no Faker, no runtime imports (`import type` is fine). Dynamic data goes in `test-data/factories/`.'],
  ['no-manual-instantiation', (p) => SPEC_FILE.test(p), (c) => MANUAL_INSTANTIATION.exec(c),
    'Never `new SomePage(page)` in a spec; use the fixtures from `fixtures/pom/test-options.ts`.'],
  ['no-hardcoded-url', (p) => URL_SCOPE.test(p), (c) => HARDCODED_URL.exec(c),
    'URL literals are forbidden; the base URL comes from QA_BASE_URL (or project.qaBaseUrl) and paths from `enums/routes.ts`.'],
  ['no-hardcoded-goto-url', (p) => URL_SCOPE.test(p), (c) => HARDCODED_GOTO_URL.exec(c),
    '`page.goto()` with an absolute URL is forbidden; navigate with a `Route` from `enums/routes.ts` relative to baseURL.'],
  ['no-jsdoc-on-locators', (p) => PAGES_TS.test(p), (c) => JSDOC_ON_LOCATOR.exec(c),
    'JSDoc belongs on action methods only; locator getters get at most a `//` comment.'],
];

const TAG_MESSAGES = {
  'no-missing-tag': 'Each test declares exactly ONE type tag in its options: `{ tag: \'@smoke\' }` (@smoke @sanity @regression @e2e @api @destructive).',
  'no-multiple-tags': 'Exactly ONE type tag per test, in `{ tag: ... }` only.',
  'no-unknown-tag': 'Unknown tag. `{ tag }` accepts @smoke @sanity @regression @e2e @api @destructive; the title accepts only the priority token @P0..@P3.',
  'no-tags-on-describe': 'Tags belong on individual tests, never on `test.describe()` titles or options.',
  'no-tag-in-title': 'Type tags go in `{ tag: ... }`, not in the title; the title carries only the @P0..@P3 priority.',
  'no-invalid-test-title': 'Test titles follow qa-framework testNamingPattern `[TC-MODULE-SUB-NNN] title @P0..@P3`.',
};

function lineOf(content, index) {
  return content.slice(0, index).split('\n').length;
}

/** All violations of one file: [{rule, line, text, message}]. */
export function checkContent(relPath, content) {
  const findings = [];
  const code = stripComments(content);
  for (const [id, pathPred, contentPred, message] of RULES) {
    if (!pathPred(relPath)) continue;
    if (contentPred === null) {
      findings.push({ rule: id, line: 1, text: relPath, message });
      continue;
    }
    const m = contentPred(code);
    if (m) findings.push({ rule: id, line: lineOf(code, m.index), text: m[0].trim().slice(0, 80), message });
  }
  if (SPEC_FILE.test(relPath)) {
    for (const f of tagFindings(code)) {
      findings.push({ rule: f.rule, line: lineOf(code, f.index), text: f.text.trim().slice(0, 80), message: TAG_MESSAGES[f.rule] });
    }
  }
  return findings;
}

/** Path relative to the e2e root, or null when the file is out of scope. */
export function e2eRelative(filePath) {
  if (typeof filePath !== 'string' || filePath.length === 0) return null;
  const full = path.resolve(PROJECT_ROOT, filePath);
  const rel = path.relative(PROJECT_ROOT, full).split(path.sep).join('/');
  if (rel.startsWith('..') || path.isAbsolute(rel)) return null;
  const prefix = `${E2E_ROOT}/`;
  if (!rel.toLowerCase().startsWith(prefix.toLowerCase())) return null;
  const inner = rel.slice(prefix.length);
  if (inner.split('/').some((seg) => SKIP_DIRS.has(seg))) return null;
  if (EXEMPT.some((re) => re.test(inner))) return null;
  if (!TS_FILE.test(inner) && !STATIC_JSON.test(inner)) return null;
  return inner;
}

function applyEdit(content, oldStr, newStr, replaceAll) {
  if (typeof oldStr !== 'string' || typeof newStr !== 'string') return null;
  if (oldStr === '') return newStr + content;
  if (!content.includes(oldStr)) return null;
  return replaceAll ? content.split(oldStr).join(newStr) : content.replace(oldStr, () => newStr);
}

function keyCounts(findings) {
  const counts = new Map();
  for (const f of findings) {
    const k = `${f.rule}\u0000${f.text}`;
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  return counts;
}

function runHook(raw) {
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return 0; // Not our payload: never fail closed.
  }
  const tool = payload && payload.tool_name;
  if (!['Write', 'Edit', 'MultiEdit'].includes(tool)) return 0;
  const input = payload.tool_input || {};
  const rel = e2eRelative(input.file_path);
  if (!rel) return 0;

  const abs = path.resolve(PROJECT_ROOT, input.file_path);
  const current = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : '';
  let next;
  if (tool === 'Write') {
    next = typeof input.content === 'string' ? input.content : null;
  } else if (tool === 'Edit') {
    next = applyEdit(current, input.old_string, input.new_string, input.replace_all === true);
  } else {
    next = current;
    for (const e of Array.isArray(input.edits) ? input.edits : []) {
      next = next === null ? null : applyEdit(next, e.old_string, e.new_string, e.replace_all === true);
    }
  }
  if (next === null) return 0; // The tool itself will reject a non-matching edit.

  const after = checkContent(rel, next);
  let added = after;
  if (tool !== 'Write') {
    const before = keyCounts(checkContent(rel, current));
    added = after.filter((f) => {
      const k = `${f.rule}\u0000${f.text}`;
      const left = before.get(k) || 0;
      if (left > 0) {
        before.set(k, left - 1);
        return false;
      }
      return true;
    });
  }
  if (added.length === 0) return 0;

  const lines = added.map((f) => `[${f.rule}] ${E2E_ROOT}/${rel}:${f.line}: ${f.text}\n    ${f.message}`);
  process.stderr.write(`Constitution violation (AGENTS.md) - fix the content, do not bypass the check:\n${lines.join('\n')}\n`);
  return 2;
}

function walk(dir, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function runScan(args) {
  const targets = args.length ? args : [path.join(PROJECT_ROOT, E2E_ROOT)];
  const files = [];
  for (const t of targets) {
    const abs = path.resolve(PROJECT_ROOT, t);
    if (!fs.existsSync(abs)) continue;
    if (fs.statSync(abs).isDirectory()) walk(abs, files);
    else files.push(abs);
  }
  let count = 0;
  let scanned = 0;
  for (const file of files) {
    const rel = e2eRelative(file);
    if (!rel) continue;
    scanned += 1;
    for (const f of checkContent(rel, fs.readFileSync(file, 'utf8'))) {
      count += 1;
      process.stdout.write(`${f.rule}\t${E2E_ROOT}/${rel}:${f.line}:${f.text}\n`);
    }
  }
  process.stderr.write(`[constitution] scanned ${scanned} file(s), ${count} violation(s)\n`);
  return count > 0 ? 1 : 0;
}

function main() {
  const argv = process.argv.slice(2);
  if (argv[0] === '--scan') {
    process.exit(runScan(argv.slice(1)));
  }
  let raw = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (d) => {
    raw += d;
  });
  process.stdin.on('end', () => {
    try {
      process.exit(runHook(raw));
    } catch (error) {
      process.stderr.write(`[constitution] internal error, allowing the call: ${error.message}\n`);
      process.exit(0);
    }
  });
  process.stdin.on('error', () => process.exit(0));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
