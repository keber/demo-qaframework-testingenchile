import type { Locator, Page } from '@playwright/test';

// Webnode contact form (course consultation and company form). Tests only read
// field state and native client-side validity; the submit button is NEVER
// clicked (rule S7, reCAPTCHA protected).
export class WebnodeFormComponent {
  constructor(private readonly page: Page) {}

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: /Enviar/ });
  }

  /**
   * Form control by its exact label.
   * @param label - visible label, e.g. 'E-mail'
   * @returns the control locator
   */
  field(label: string | RegExp): Locator {
    return typeof label === 'string'
      ? this.page.getByLabel(label, { exact: true })
      : this.page.getByLabel(label);
  }

  /**
   * Radio option of a radio group by its label.
   * @param label - option label, e.g. 'Aún no sabemos'
   * @returns the radio locator
   */
  radio(label: string): Locator {
    return this.page.getByRole('radio', { name: label, exact: true });
  }

  /**
   * Native validity of a control (HTML constraint validation API).
   * @param control - input, select or textarea locator
   * @returns validity.valid
   */
  async isValid(control: Locator): Promise<boolean> {
    return control.evaluate((el) => (el as HTMLInputElement).validity.valid);
  }

  /**
   * Native validation flags of a control.
   * @param control - input locator
   * @returns valid and patternMismatch / typeMismatch flags
   */
  async validity(control: Locator): Promise<{ valid: boolean; patternMismatch: boolean; typeMismatch: boolean }> {
    return control.evaluate((el) => {
      const v = (el as HTMLInputElement).validity;
      return { valid: v.valid, patternMismatch: v.patternMismatch, typeMismatch: v.typeMismatch };
    });
  }

  /**
   * Native validation message of a control (browser-language dependent: never assert its text).
   * @param control - input, select or textarea locator
   * @returns validationMessage
   */
  async validationMessage(control: Locator): Promise<string> {
    return control.evaluate((el) => (el as HTMLInputElement).validationMessage);
  }

  /**
   * checkValidity() of the form that owns a control, without submitting it.
   * @param control - any control of the form
   * @returns the form validity; false when the control has no form
   */
  async formIsValid(control: Locator): Promise<boolean> {
    return control.evaluate((el) => (el as HTMLInputElement).form?.checkValidity() ?? false);
  }

  /**
   * Current value of a control.
   * @param control - input locator
   * @returns the value property
   */
  async value(control: Locator): Promise<string> {
    return control.evaluate((el) => (el as HTMLInputElement).value);
  }

  /**
   * Waits until the form is rendered (Webnode renders it after the load event).
   * @param firstLabel - label of a field that must be visible
   */
  async waitForField(firstLabel: string): Promise<void> {
    await this.field(firstLabel).waitFor({ state: 'visible' });
  }
}
