import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { WebnodeFormComponent } from '../components/webnode-form.component';

// Course detail page (template shared by every course of the catalog).
export class CoursePage extends BasePage {
  readonly form: WebnodeFormComponent;

  constructor(page: Page) {
    super(page);
    this.form = new WebnodeFormComponent(page);
  }

  get h1(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  /**
   * Opens a course page.
   * @param path - course route
   * @returns the HTTP status of the document
   */
  async goto(path: string): Promise<number> {
    return this.open(path);
  }

}
