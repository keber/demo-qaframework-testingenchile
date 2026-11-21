import type { Locator } from '@playwright/test';
import { BasePage } from '../base.page';

// Legal pages: "Términos y Condiciones" and "Política de privacidad".
export class LegalPage extends BasePage {
  get h1(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get sectionHeadings(): Locator {
    return this.page.getByRole('heading', { level: 2 });
  }

  /**
   * Texts of the h2 sections, trimmed, in document order.
   * @returns the section titles
   */
  async sectionTitles(): Promise<string[]> {
    const titles = await this.sectionHeadings.allInnerTexts();
    return titles.map((t) => t.trim());
  }
}
