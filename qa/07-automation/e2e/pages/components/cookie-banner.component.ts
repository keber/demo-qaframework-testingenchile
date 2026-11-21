import { expect, type Locator, type Page } from '@playwright/test';

// Webnode consent banner. Project rule 6: tests only ever choose
// "Aceptar solo lo necesario" (privacy-preserving), never "Aceptar todo".
const CONSENT_COOKIE = 'cookieAccepted';
const RELOAD_TIMEOUT_MS = 10_000;

export class CookieBannerComponent {
  constructor(private readonly page: Page) {}

  get acceptNecessaryButton(): Locator {
    return this.page.getByRole('button', { name: 'Aceptar solo lo necesario', exact: true });
  }

  get acceptAllButton(): Locator {
    return this.page.getByRole('button', { name: 'Aceptar todo', exact: true });
  }

  /**
   * Whether the consent cookie is already stored in the browser context.
   * @returns true when a choice was saved
   */
  async hasConsentCookie(): Promise<boolean> {
    const cookies = await this.page.context().cookies();
    return cookies.some((c) => c.name === CONSENT_COOKIE);
  }

  /**
   * Chooses "Aceptar solo lo necesario" and waits for the banner to close.
   * Webnode RELOADS the page about 0.6 s after the choice (observed 2026-11-21):
   * the method waits for that reload so no later read hits a detached document.
   * No-op when a choice is already stored in this context.
   * @returns resolves when the reloaded page fired its load event
   */
  async acceptNecessaryOnly(): Promise<void> {
    if (await this.hasConsentCookie()) return;
    const reload = this.page
      .waitForEvent('framenavigated', {
        predicate: (frame) => frame === this.page.mainFrame(),
        timeout: RELOAD_TIMEOUT_MS,
      })
      .catch(() => null);
    await this.acceptNecessaryButton.click();
    await reload;
    await this.page.waitForLoadState('load');
    await expect(this.acceptNecessaryButton).toBeHidden();
  }
}
