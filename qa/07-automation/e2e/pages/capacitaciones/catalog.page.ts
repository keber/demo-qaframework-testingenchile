import type { Locator } from '@playwright/test';
import { CourseText } from '../../enums/messages';
import { Route } from '../../enums/routes';
import { BasePage } from '../base.page';

export class CatalogPage extends BasePage {
  get saberMasLinks(): Locator {
    return this.page.getByRole('link', { name: CourseText.SaberMas, exact: true });
  }

  // Visible course cards (role group holding a "Saber más" link); hidden cards
  // are excluded from the accessibility tree by the filter.
  get cards(): Locator {
    return this.page.getByRole('group').filter({ has: this.saberMasLinks });
  }

  get certificationCards(): Locator {
    return this.cards.filter({ has: this.page.getByText(CourseText.CertificationBadge, { exact: true }) });
  }

  get hablemosLink(): Locator {
    return this.page.getByRole('link', { name: CourseText.Hablemos, exact: true });
  }

  /**
   * Category filter button.
   * @param label - e.g. 'Certificaciones'
   * @returns the button locator
   */
  filterButton(label: string): Locator {
    return this.page.getByRole('button', { name: label, exact: true });
  }

  /**
   * Opens the catalog.
   * @returns the HTTP status of the document
   */
  async goto(): Promise<number> {
    return this.open(Route.Capacitaciones);
  }

  /**
   * Titles (h2) of the currently visible cards, sorted.
   * @returns the sorted titles
   */
  async visibleTitles(): Promise<string[]> {
    const titles = await this.cards.getByRole('heading').allInnerTexts();
    return titles.map((t) => t.trim()).sort();
  }

  /**
   * Titles of the visible cards that carry the "Certificación" badge, sorted.
   * @returns the sorted titles
   */
  async certificationTitles(): Promise<string[]> {
    const titles = await this.certificationCards.getByRole('heading').allInnerTexts();
    return titles.map((t) => t.trim()).sort();
  }

  /**
   * Applies a category filter.
   * @param label - filter button label
   */
  async applyFilter(label: string): Promise<void> {
    await this.filterButton(label).click();
  }
}
