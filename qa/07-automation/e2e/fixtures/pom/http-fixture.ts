import { test as base, type APIRequestContext } from '@playwright/test';

// Gentle, read-only HTTP checks of link targets (robots.txt declares Crawl-delay):
// sequential requests, HEAD first, GET only when HEAD is refused.
const DEFAULT_TIMEOUT_MS = 20_000;
const MAX_REDIRECTS = 10;
const HTTP_CLIENT_ERROR = 400;

export interface LinkStatus {
  url: string;
  // 0 when the request failed before any HTTP status (DNS, TLS, timeout).
  status: number;
  error: string | null;
}

export interface RedirectHop {
  status: number;
  // Raw Location header; empty when absent.
  location: string;
}

export class LinkChecker {
  constructor(private readonly request: APIRequestContext) {}

  /**
   * Final HTTP status of a URL after redirects; never throws.
   * @param url - absolute URL or path relative to baseURL
   * @param timeoutMs - per-request timeout
   * @returns the status (0 on a network error) and the error message, if any
   */
  async status(url: string, timeoutMs: number = DEFAULT_TIMEOUT_MS): Promise<LinkStatus> {
    const options = { timeout: timeoutMs, maxRedirects: MAX_REDIRECTS, failOnStatusCode: false };
    try {
      const head = await this.request.head(url, options);
      if (head.status() < HTTP_CLIENT_ERROR) {
        return { url, status: head.status(), error: null };
      }
      const get = await this.request.get(url, options);
      return { url, status: get.status(), error: null };
    } catch (error) {
      return { url, status: 0, error: (error as Error).message.split('\n')[0] };
    }
  }

  /**
   * Status of several URLs, one request at a time (never in parallel).
   * @param urls - URLs to check; duplicates are checked once
   * @param timeoutMs - per-request timeout
   * @returns one LinkStatus per unique URL, in input order
   */
  async statuses(urls: readonly string[], timeoutMs: number = DEFAULT_TIMEOUT_MS): Promise<LinkStatus[]> {
    const results: LinkStatus[] = [];
    for (const url of [...new Set(urls)]) {
      results.push(await this.status(url, timeoutMs));
    }
    return results;
  }

  /**
   * <title> of an HTML document fetched with GET (no browser needed).
   * @param url - absolute URL or path relative to baseURL
   * @returns the trimmed title with the basic HTML entities decoded; empty when absent
   */
  async documentTitle(url: string): Promise<string> {
    const response = await this.request.get(url, { timeout: DEFAULT_TIMEOUT_MS, failOnStatusCode: false });
    const html = await response.text();
    const raw = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '';
    return raw
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;|&apos;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * First hop of a URL without following redirects.
   * @param url - absolute URL or path relative to baseURL
   * @returns the status and the Location header
   */
  async firstHop(url: string): Promise<RedirectHop> {
    const response = await this.request.get(url, {
      maxRedirects: 0,
      failOnStatusCode: false,
      timeout: DEFAULT_TIMEOUT_MS,
    });
    return { status: response.status(), location: response.headers()['location'] ?? '' };
  }
}

export const test = base.extend<{ linkChecker: LinkChecker }>({
  linkChecker: async ({ request }, use) => {
    await use(new LinkChecker(request));
  },
});

const HTTP_OK_MIN = 200;
const HTTP_REDIRECT_MAX = 399;

/**
 * Links that did not resolve to a 2xx or 3xx status.
 * @param results - statuses from LinkChecker
 * @param ignored - statuses classified as "not verifiable" (anti-bot answers)
 * @returns url, status and error of each unreachable link
 */
export function unreachable(results: readonly LinkStatus[], ignored: readonly number[] = []): LinkStatus[] {
  return results.filter(
    (r) => !ignored.includes(r.status) && (r.status < HTTP_OK_MIN || r.status > HTTP_REDIRECT_MAX),
  );
}
