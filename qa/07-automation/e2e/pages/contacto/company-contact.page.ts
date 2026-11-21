import type { Locator, Page } from '@playwright/test';
import { ContactText } from '../../enums/messages';
import { Route } from '../../enums/routes';
import { BasePage } from '../base.page';
import { WebnodeFormComponent } from '../components/webnode-form.component';

// /contacto-empresa/: company training form. Rendered after the load event;
// filled with synthetic data and validated client-side only, NEVER submitted (S7).
export class CompanyContactPage extends BasePage {
  readonly form: WebnodeFormComponent;

  constructor(page: Page) {
    super(page);
    this.form = new WebnodeFormComponent(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { level: 1, name: ContactText.CompanyHeading });
  }

  get senceRadios(): Locator {
    return this.page.getByRole('radio');
  }

  get sendButton(): Locator {
    return this.page.getByRole('button', { name: ContactText.Send, exact: true });
  }

  /**
   * Opens the company form and waits until the form is rendered.
   * @param firstLabel - label of the first field to wait for
   * @returns the HTTP status of the document
   */
  async goto(firstLabel: string): Promise<number> {
    const status = await this.open(Route.ContactoEmpresa);
    await this.form.waitForField(firstLabel);
    return status;
  }

  /**
   * Types characters one by one (as a user would) into a control.
   * @param control - input locator
   * @param text - characters to type
   */
  async typeInto(control: Locator, text: string): Promise<void> {
    await control.pressSequentially(text);
  }
}
