import type { Locator } from '@playwright/test';
import { ContactText } from '../../enums/messages';
import { Route } from '../../enums/routes';
import { BasePage } from '../base.page';

// /formulario-contacto/: heading, WhatsApp CTA and social links (no form today, REC-TCH-008).
export class ContactPage extends BasePage {
  get main(): Locator {
    return this.page.getByRole('main');
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: ContactText.Heading, exact: true });
  }

  get whatsappCta(): Locator {
    return this.main.getByRole('link').filter({ hasText: ContactText.WhatsAppCta });
  }

  /**
   * Social link inside the page content (not the header).
   * @param network - accessible name, e.g. 'LinkedIn'
   * @returns the link locator
   */
  socialLink(network: string): Locator {
    return this.main.getByRole('link', { name: network, exact: true });
  }

  /**
   * Opens the contact page.
   * @returns the HTTP status of the document
   */
  async goto(): Promise<number> {
    return this.open(Route.Contacto);
  }
}
