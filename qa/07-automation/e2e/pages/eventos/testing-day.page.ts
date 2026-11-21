import type { Locator } from '@playwright/test';
import { EventText } from '../../enums/messages';
import { Route } from '../../enums/routes';
import { BasePage } from '../base.page';

// Testing Day Chile landing. Ticket links go to ecopass and are NEVER clicked (S7).
export class TestingDayPage extends BasePage {
  get h1(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  // The visible label is preceded by an icon glyph: substring match.
  get ticketCta(): Locator {
    return this.page.getByRole('link', { name: EventText.TicketCta });
  }

  get buyTicketLinks(): Locator {
    return this.page.getByRole('link', { name: EventText.BuyTicket });
  }

  get sponsorCta(): Locator {
    return this.page.getByRole('link', { name: EventText.SponsorCta, exact: true });
  }

  get sponsorSectionHeading(): Locator {
    return this.page.getByRole('heading', { name: EventText.SponsorSection });
  }

  get agendaHeading(): Locator {
    return this.page.getByRole('heading', { name: EventText.AgendaSection, exact: true });
  }

  get agendaTimeRanges(): Locator {
    return this.page.getByText(/^\d{2}:\d{2} - \d{2}:\d{2}/);
  }

  get agendaTitles(): Locator {
    return this.page.getByRole('heading', { level: 4, name: /\S/ });
  }

  get fullAgendaCta(): Locator {
    return this.page.getByRole('link', { name: EventText.FullAgendaCta });
  }

  get officialSponsorsHeading(): Locator {
    return this.page.getByRole('heading', { name: EventText.OfficialSponsors, exact: true });
  }

  get moreSponsorsLink(): Locator {
    return this.page.getByRole('link', { name: EventText.MoreSponsors });
  }

  get brochureLink(): Locator {
    return this.page.getByRole('link', { name: EventText.Brochure });
  }

  /**
   * Sponsor tier heading (Platinum, Oro, Plata, Bronce), case-insensitive.
   * @param tier - tier name
   * @returns the heading locator
   */
  tierHeading(tier: string): Locator {
    return this.page.getByRole('heading', { level: 3, name: new RegExp(`^${tier}$`, 'i') });
  }

  /**
   * Visible text fragments matching a pattern (dates, venue).
   * @param pattern - RegExp of the fragment
   * @returns visible elements containing it
   */
  visibleText(pattern: RegExp): Locator {
    return this.page.getByText(pattern).filter({ visible: true });
  }

  /**
   * Opens the event landing.
   * @returns the HTTP status of the document
   */
  async goto(): Promise<number> {
    return this.open(Route.TestingDay);
  }

  /**
   * External links that wrap a logo image (sponsors, communities, hotels).
   * @returns absolute hrefs, unique, in DOM order
   */
  async externalLogoHrefs(): Promise<string[]> {
    return this.page.evaluate(() => [
      ...new Set(
        [...document.querySelectorAll<HTMLAnchorElement>('main a[href]')]
          .filter((a) => a.querySelector('img') !== null)
          .filter((a) => a.protocol.startsWith('http') && a.hostname !== location.hostname)
          .map((a) => a.href),
      ),
    ]);
  }
}
