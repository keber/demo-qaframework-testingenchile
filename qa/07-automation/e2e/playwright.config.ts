import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// -------------------------------------------------------------------
// testingenchile.cl - public site, no users, no login, no private area
// -------------------------------------------------------------------
// The auth/lane machinery of the qa-framework scaffold is not wired here:
// there is nothing to log in to, so there is no storageState, no setup
// project and no parallel lanes. fixtures/auth.ts, fixtures/base.ts and
// scripts/lane-*.js are kept on disk (init-installed bootstrap files must not
// be deleted, see qa/QA-STRUCTURE-GUIDE.md) but are inert for this project.
//
// Least privilege: only non-secret keys are read from .env, with
// dotenv.parse() so the whole file is never injected into process.env.
const ENV_KEYS = ['QA_BASE_URL', 'QA_WORKERS'] as const;
const envFile = path.resolve(__dirname, '.env');
if (fs.existsSync(envFile)) {
  const parsed = dotenv.parse(fs.readFileSync(envFile));
  for (const key of ENV_KEYS) {
    if (process.env[key] === undefined && parsed[key] !== undefined) {
      process.env[key] = parsed[key];
    }
  }
}

// Kept for fixtures/base.ts (inert TTL session refresh of the scaffold).
export const SESSION_TTL_MS = Number(process.env.QA_SESSION_TTL_MS ?? 2 * 60 * 60 * 1000);

// QA_BASE_URL from env/.env wins; otherwise project.qaBaseUrl from
// qa/qa-framework.config.json (the versioned, secret-free source). With
// neither, loading fails: never run without a URL. No URL literal lives here.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const laneConfig = require('./scripts/lane-config.js') as {
  loadQaBaseUrl: (env: NodeJS.ProcessEnv, dir: string) => { url: string };
};
process.env.QA_BASE_URL = laneConfig.loadQaBaseUrl(process.env, __dirname).url;

const IS_CI = Boolean(process.env.CI);

// Production public site: keep the load negligible. Two workers at most.
const MAX_WORKERS = 2;
const WORKERS = Math.min(Number(process.env.QA_WORKERS ?? MAX_WORKERS) || MAX_WORKERS, MAX_WORKERS);

const TIMEOUTS = {
  test: 30_000,
  expect: 10_000,
  action: 10_000,
  navigation: 30_000,
} as const;

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  // Non-suite directories (diagnostics and seeds) never run.
  testIgnore: ['**/helpers/debug/**', '**/seeds/**'],

  fullyParallel: true,
  workers: WORKERS,
  forbidOnly: IS_CI,
  retries: 1,

  timeout: TIMEOUTS.test,
  expect: { timeout: TIMEOUTS.expect },

  // list for the console, html for humans, json for the execution-report stage.
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  globalSetup: './global-setup.ts',

  use: {
    baseURL: process.env.QA_BASE_URL,
    headless: true,
    locale: 'es-CL',
    timezoneId: 'America/Santiago',
    // No login exists, so failure artifacts cannot contain credentials.
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: TIMEOUTS.action,
    navigationTimeout: TIMEOUTS.navigation,
  },

  projects: [
    {
      name: 'chromium',
      // Desktop viewport of the test plans (section 6: 1366x900).
      use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 900 } },
    },
  ],

  outputDir: 'test-results/artifacts',
  snapshotPathTemplate: '{testDir}/__snapshots__/{testFilePath}/{arg}{ext}',
});
