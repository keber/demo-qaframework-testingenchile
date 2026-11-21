import { expect, type Locator, type Page } from '@playwright/test';
import { InfraError } from '../fixtures/defects';
import { CookieBannerComponent } from './components/cookie-banner.component';
import { DocumentAuditComponent } from './components/document-audit.component';
import { NavigationComponent } from './components/navigation.component';

export interface OpenOptions {
  // Resolve the cookie banner with "Aceptar solo lo necesario" (default true).
  consent?: boolean;
}

// Shared parts of every page of the Webnode template.
export abstract class BasePage {
  readonly nav: NavigationComponent;
  readonly cookieBanner: CookieBannerComponent;
  readonly audit: DocumentAuditComponent;

  constructor(protected readonly page: Page) {
    this.nav = new NavigationComponent(page);
    this.cookieBanner = new CookieBannerComponent(page);
    this.audit = new DocumentAuditComponent(page);
  }

  /**
   * Opens a path relative to baseURL and, by default, resolves the cookie banner
   * with "Aceptar solo lo necesario" (project rule 6).
   * @param path - a Route value (or a Route prefix plus a suffix)
   * @param options - consent handling
   * @returns the HTTP status of the main document
   */
  async open(path: string, options: OpenOptions = {}): Promise<number> {
    // 'load': Webnode injects the logo, floating buttons and forms after DOMContentLoaded.
    const response = await this.page.goto(path, { waitUntil: 'load' });
    if (response === null) {
      throw new InfraError('app-unavailable', `no response for ${path}`);
    }
    if (options.consent ?? true) {
      await this.cookieBanner.acceptNecessaryOnly();
    }
    return response.status();
  }

  /**
   * Clicks a same-tab link and waits for the main-frame document it opens.
   * @param link - link locator
   * @param expectedPath - pathname the navigation must reach (after redirects)
   * @returns the HTTP status of the new document
   */
  async followLink(link: Locator, expectedPath: string): Promise<number> {
    const navigation = this.page.waitForResponse(
      (r) =>
        r.request().isNavigationRequest() &&
        r.request().frame() === this.page.mainFrame() &&
        new URL(r.url()).pathname === expectedPath,
    );
    await link.click();
    const response = await navigation.catch((cause: unknown) => {
      throw new InfraError('timeout', `no navigation to ${expectedPath} after the click`, { cause });
    });
    await this.page.waitForLoadState('load');
    return response.status();
  }

  /**
   * Absolute hrefs of every element matched by a link locator, in DOM order.
   * @param links - locator matching one or more links
   * Waits until the locator matches at least one element.
   * @returns resolved hrefs (empty strings for links without href)
   */
  async hrefsOf(links: Locator): Promise<string[]> {
    await expect(links).not.toHaveCount(0);
    return links.evaluateAll((els) => els.map((el) => (el as HTMLAnchorElement).href ?? ''));
  }

  /**
   * target attribute of every element matched by a link locator.
   * @param links - locator matching one or more links
   * @returns the target values ('' when absent)
   */
  async targetsOf(links: Locator): Promise<string[]> {
    await expect(links).not.toHaveCount(0);
    return links.evaluateAll((els) => els.map((el) => el.getAttribute('target') ?? ''));
  }

  /**
   * Reloads the current page.
   * @returns resolves when the load event fired
   */
  async reload(): Promise<void> {
    await this.page.reload({ waitUntil: 'load' });
  }

  /**
   * Current pathname of the page.
   * @returns e.g. '/capacitaciones2/'
   */
  pathname(): string {
    return new URL(this.page.url()).pathname;
  }

  /**
   * Current URL fragment without '#'.
   * @returns e.g. 'btc-ruta'; empty when none
   */
  fragment(): string {
    return new URL(this.page.url()).hash.replace(/^#/, '');
  }
}
