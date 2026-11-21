import type { Locator, Page } from '@playwright/test';
import { Route } from '../../enums/routes';
import { NavigationComponent } from '../components/navigation.component';

export class HomePage {
  readonly nav: NavigationComponent;

  constructor(private readonly page: Page) {
    this.nav = new NavigationComponent(page);
  }

  get mainHeadings(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  /**
   * Opens the home page (relative to baseURL, resolved from QA_BASE_URL).
   * @returns resolves when the DOM is loaded
   */
  async goto(): Promise<void> {
    await this.page.goto(Route.Home, { waitUntil: 'domcontentloaded' });
  }
}
