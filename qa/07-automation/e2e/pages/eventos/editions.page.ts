import type { Locator } from '@playwright/test';
import { EventText } from '../../enums/messages';
import { BasePage } from '../base.page';

// Past editions of the event (summary page, each edition page) and the yearly sponsors pages.
export class EditionsPage extends BasePage {
  get highlightsLink(): Locator {
    return this.page.getByRole('link', { name: EventText.Highlights });
  }

  get meetSponsorsLink(): Locator {
    return this.page.getByRole('link', { name: EventText.MeetSponsors, exact: true });
  }

  get sponsorWebsiteLinks(): Locator {
    return this.page.getByRole('link', { name: EventText.SponsorWebsite });
  }

  /**
   * Edition heading matching a pattern.
   * @param pattern - e.g. /Testing Day Chile 2019/
   * @returns the heading locator
   */
  editionHeading(pattern: RegExp): Locator {
    return this.page.getByRole('heading', { name: pattern });
  }

  /**
   * src of every iframe of the page (lazy src included).
   * @returns iframe sources
   */
  async iframeSources(): Promise<string[]> {
    return this.page.evaluate(() =>
      [...document.querySelectorAll('iframe')].map((f) => f.getAttribute('src') ?? f.getAttribute('data-src') ?? ''),
    );
  }
}
