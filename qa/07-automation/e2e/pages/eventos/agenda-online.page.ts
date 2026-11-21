import type { Locator } from '@playwright/test';
import { EventText } from '../../enums/messages';
import { Route } from '../../enums/routes';
import { BasePage } from '../base.page';

// Online agenda of the event: sessions with time, type, title and "Inscribirse".
export class AgendaOnlinePage extends BasePage {
  get agendaHeading(): Locator {
    return this.page.getByRole('heading', { level: 2, name: new RegExp(`^${EventText.AgendaOnlinePrefix}`) });
  }

  get registerLinks(): Locator {
    return this.page.getByRole('link', { name: EventText.Register, exact: true });
  }

  get sessionTimes(): Locator {
    return this.page.getByText(/\d{2}:\d{2} - \d{2}:\d{2}/).filter({ visible: true });
  }

  get sessionTypes(): Locator {
    return this.page.getByText(/^(taller|charla)$/i).filter({ visible: true });
  }

  get sessionTitles(): Locator {
    return this.page.getByRole('heading', { level: 3, name: /\S/ });
  }

  /**
   * Opens the online agenda.
   * @returns the HTTP status of the document
   */
  async goto(): Promise<number> {
    return this.open(Route.AgendaOnline);
  }
}
