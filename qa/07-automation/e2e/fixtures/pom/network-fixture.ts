import { test as base } from '@playwright/test';
import {
  BLOCKED_GOOGLE_PATH_PREFIXES,
  BLOCKED_TRACKER_HOSTS,
} from '../../test-data/static/network/third-party';

const GOOGLE_HOST = /(^|\.)google\.[a-z.]+$/i;

/**
 * True for a request to a third-party tracker that must never leave the browser.
 * @param url - request URL
 * @returns whether the request is aborted
 */
export function isTrackerUrl(url: URL): boolean {
  const host = url.hostname.toLowerCase();
  const trackerHost = BLOCKED_TRACKER_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
  const googleConversion =
    GOOGLE_HOST.test(host) && BLOCKED_GOOGLE_PATH_PREFIXES.some((p) => url.pathname.startsWith(p));
  return trackerHost || googleConversion;
}

export interface LoggedRequest {
  method: string;
  url: string;
}

/** Every request the browser context issued during the test (trackers included, aborted). */
export class RequestLog {
  private readonly entries: LoggedRequest[] = [];
  private blocked = 0;

  /**
   * Records one request.
   * @param entry - method and URL
   */
  record(entry: LoggedRequest): void {
    this.entries.push(entry);
  }

  /** Counts one aborted tracker request. */
  recordBlocked(): void {
    this.blocked += 1;
  }

  /**
   * Requests sent to a host (exact hostname), optionally filtered by method.
   * @param host - hostname, e.g. 'www.testingenchile.cl'
   * @param method - HTTP method, e.g. 'POST'
   * @returns the matching requests
   */
  toHost(host: string, method?: string): LoggedRequest[] {
    return this.entries.filter((e) => {
      const sameHost = new URL(e.url).hostname === host;
      return sameHost && (method === undefined || e.method === method);
    });
  }

  /**
   * Requests whose URL is a tracker that reached the network layer unblocked.
   * Always empty while the route is active; kept as evidence for the report.
   * @returns the tracker requests seen
   */
  trackerRequests(): LoggedRequest[] {
    return this.entries.filter((e) => isTrackerUrl(new URL(e.url)));
  }

  get blockedCount(): number {
    return this.blocked;
  }
}

type NetworkFixtures = {
  requestLog: RequestLog;
  blockTrackers: void;
};

// Auto fixture: aborts every tracker request in every test (HC-21), before any
// page of the context is created, and records the context traffic.
export const test = base.extend<NetworkFixtures>({
  requestLog: async ({}, use) => {
    await use(new RequestLog());
  },
  blockTrackers: [
    async ({ context, requestLog }, use, testInfo) => {
      await context.route(isTrackerUrl, async (route) => {
        requestLog.recordBlocked();
        await route.abort('blockedbyclient');
      });
      context.on('request', (request) => {
        requestLog.record({ method: request.method(), url: request.url() });
      });
      await use();
      testInfo.annotations.push({
        type: 'blocked-trackers',
        description: `${requestLog.blockedCount} third-party tracker request(s) aborted`,
      });
    },
    { auto: true },
  ],
});
