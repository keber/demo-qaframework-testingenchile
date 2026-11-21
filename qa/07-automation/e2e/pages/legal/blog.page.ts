import { expect, type Locator } from '@playwright/test';
import { LegalText } from '../../enums/messages';
import { Route } from '../../enums/routes';
import { BasePage } from '../base.page';

export interface ArticleSummary {
  title: string;
  href: string;
  // Publication date as shown (dd.mm.yyyy); empty when absent.
  date: string;
  excerpt: string;
}

const DATE_PATTERN = /\b(\d{2})\.(\d{2})\.(\d{4})\b/;

/**
 * Sortable number (yyyymmdd) of a dd.mm.yyyy date.
 * @param date - date as shown in the blog
 * @returns the number, or NaN when the text is not a date
 */
export function dateKey(date: string): number {
  const m = DATE_PATTERN.exec(date);
  return m ? Number(`${m[3]}${m[2]}${m[1]}`) : Number.NaN;
}

// Blog listing (/blog/ and its paginated pages) and the article pages.
export class BlogPage extends BasePage {
  get articles(): Locator {
    return this.page.getByRole('article');
  }

  get olderArticlesLink(): Locator {
    return this.page.getByRole('link', { name: LegalText.OlderArticles });
  }

  get newerArticlesLink(): Locator {
    return this.page.getByRole('link', { name: LegalText.NewerArticles });
  }

  get h1(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  /**
   * Title link of an article in the listing.
   * @param title - exact article title
   * @returns the link inside the article heading
   */
  articleTitleLink(title: string): Locator {
    return this.page.getByRole('heading', { level: 2 }).getByRole('link', { name: title, exact: true });
  }

  /**
   * Visible text of the page (e.g. a publication date).
   * @param text - exact text
   * @returns the locator
   */
  text(text: string): Locator {
    return this.page.getByText(text, { exact: true });
  }

  /**
   * Opens the blog listing.
   * @returns the HTTP status of the document
   */
  async goto(): Promise<number> {
    return this.open(Route.Blog);
  }

  /**
   * Title, link, date and excerpt of every article card of the current listing page.
   * @returns one summary per article element, in display order
   */
  async summaries(): Promise<ArticleSummary[]> {
    await expect(this.articles).not.toHaveCount(0);
    return this.page.evaluate((datePattern) => {
      const re = new RegExp(datePattern);
      return [...document.querySelectorAll('article')].map((article) => {
        const link = article.querySelector<HTMLAnchorElement>('h2 a, h3 a');
        const text = (article as HTMLElement).innerText;
        const date = re.exec(text)?.[0] ?? '';
        const title = (link?.innerText ?? '').trim();
        // Excerpt: the card text without its title and date lines.
        const excerpt = text
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line !== '' && line !== title && line !== date)
          .join(' ');
        return { title, href: link?.getAttribute('href') ?? '', date, excerpt };
      });
    }, DATE_PATTERN.source);
  }

  /**
   * Sortable keys (yyyymmdd) of the article dates of the current listing page.
   * @returns the keys in display order
   */
  async dateKeys(): Promise<number[]> {
    return (await this.summaries()).map((s) => dateKey(s.date));
  }
}
