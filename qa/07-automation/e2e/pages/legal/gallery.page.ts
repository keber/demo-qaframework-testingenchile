import { expect, type Locator } from '@playwright/test';
import { Route } from '../../enums/routes';
import { BasePage } from '../base.page';

// Test-only marker set on the first thumbnail: the thumbnails are unnamed
// image links (alt=""), so no role/label locator can single one out.
const FIRST_THUMBNAIL_TEST_ID = 'qa-first-thumbnail';
const IMAGE_HREF = /\.(jpe?g|png|webp|gif)(\?|$)/i;
const KEY_RETRY_MS = 1_000;
const VIEWER_READY_TIMEOUT_MS = 10_000;

// Photo gallery (/galeria/) with the PhotoSwipe viewer (role dialog).
export class GalleryPage extends BasePage {
  get albumHeadings(): Locator {
    return this.page.getByRole('heading', { level: 2 });
  }

  get firstThumbnail(): Locator {
    return this.page.getByTestId(FIRST_THUMBNAIL_TEST_ID);
  }

  get viewer(): Locator {
    return this.page.getByRole('dialog');
  }

  get viewerCounter(): Locator {
    return this.viewer.getByText(/^\d+ \/ \d+$/);
  }

  /**
   * Opens the gallery.
   * @returns the HTTP status of the document
   */
  async goto(): Promise<number> {
    return this.open(Route.Galeria);
  }

  /**
   * Marks the first thumbnail (first image link of the content) with a test id.
   * The page itself is not changed in any visible or functional way.
   * @returns the href of the marked thumbnail
   */
  async markFirstThumbnail(): Promise<string> {
    return this.page.getByRole('main').getByRole('link').evaluateAll(
      (links, [testId, pattern]) => {
        const re = new RegExp(pattern, 'i');
        const first = links.find((l) => re.test((l as HTMLAnchorElement).href));
        if (!first) return '';
        first.setAttribute('data-testid', testId);
        return (first as HTMLAnchorElement).href;
      },
      [FIRST_THUMBNAIL_TEST_ID, IMAGE_HREF.source] as const,
    );
  }

  /**
   * Opens the viewer on the first thumbnail.
   */
  async openFirstPhoto(): Promise<void> {
    await this.markFirstThumbnail();
    await this.firstThumbnail.click();
  }

  /**
   * Presses ArrowRight until the viewer reacts. PhotoSwipe ignores keys during its
   * opening animation (about 1 s, no DOM signal observed), so a press is repeated
   * only while the counter has not changed yet: never more than one advance.
   */
  async nextPhoto(): Promise<void> {
    const before = await this.viewerCounter.innerText();
    await expect(async () => {
      if ((await this.viewerCounter.innerText()) === before) {
        await this.page.keyboard.press('ArrowRight');
      }
      await expect(this.viewerCounter).not.toHaveText(before, { timeout: KEY_RETRY_MS });
    }).toPass({ timeout: VIEWER_READY_TIMEOUT_MS });
  }

  /**
   * Presses Escape until the viewer closes (same opening-animation constraint).
   */
  async closeViewer(): Promise<void> {
    await expect(async () => {
      if (await this.viewer.isVisible()) {
        await this.page.keyboard.press('Escape');
      }
      await expect(this.viewer).toBeHidden({ timeout: KEY_RETRY_MS });
    }).toPass({ timeout: VIEWER_READY_TIMEOUT_MS });
  }

  /**
   * Year found in each album heading, in display order.
   * @returns the first year of the latest album and the most recent year of all headings
   */
  async albumYears(): Promise<{ first: number; latest: number }> {
    const titles = await this.albumHeadings.allInnerTexts();
    const years = titles.map((t) => Number(/\b(20\d{2})\b/.exec(t)?.[1] ?? Number.NaN));
    const known = years.filter((y) => !Number.isNaN(y));
    return { first: years[0], latest: Math.max(...known) };
  }
}
