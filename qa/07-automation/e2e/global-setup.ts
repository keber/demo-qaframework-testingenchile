/**
 * global-setup.ts
 *
 * testingenchile.cl is a public site with no users and no login, so this setup
 * performs NO authentication and writes NO storageState. It only resolves the
 * base URL (QA_BASE_URL, else project.qaBaseUrl in qa/qa-framework.config.json)
 * and makes ONE read-only GET to confirm the site is reachable, so an outage
 * fails fast as an infrastructure problem instead of N red tests.
 *
 * Environment variables:
 *   QA_BASE_URL  - Optional. Defaults to project.qaBaseUrl in the manifest.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const laneConfig = require('./scripts/lane-config.js') as {
  loadQaBaseUrl: (env: NodeJS.ProcessEnv, dir: string) => { url: string };
};

const REACHABILITY_TIMEOUT_MS = 30_000;
const HTTP_ERROR_THRESHOLD = 400;

export default async function globalSetup(): Promise<void> {
  const baseURL = laneConfig.loadQaBaseUrl(process.env, __dirname).url;

  let status: number;
  try {
    const response = await fetch(baseURL, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(REACHABILITY_TIMEOUT_MS),
    });
    status = response.status;
  } catch (error) {
    throw new Error(
      `[global-setup] ${baseURL} is not reachable (infra:app-unavailable): ${(error as Error).message}`,
    );
  }

  if (status >= HTTP_ERROR_THRESHOLD) {
    throw new Error(`[global-setup] ${baseURL} answered HTTP ${status} (infra:app-unavailable)`);
  }
  console.log(`[global-setup] ${baseURL} reachable (HTTP ${status}); no login required`);
}
