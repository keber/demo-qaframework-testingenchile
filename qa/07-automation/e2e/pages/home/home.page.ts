import type { Locator } from '@playwright/test';
import { Route } from '../../enums/routes';
import { BasePage } from '../base.page';

export class HomePage extends BasePage {
  get main(): Locator {
    return this.page.getByRole('main');
  }

  get mainHeadings(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get heroCatalogCta(): Locator {
    return this.main.getByRole('link', { name: 'Ver Capacitaciones', exact: true });
  }

  get heroBootcampCta(): Locator {
    return this.main.getByRole('link', { name: 'Bootcamp de Testing', exact: true });
  }

  get featuredSyllabusLinks(): Locator {
    return this.main.getByRole('link', { name: 'Ver Temario', exact: true });
  }

  get allCoursesLink(): Locator {
    return this.main.getByRole('link', { name: 'Ir a todas las Capacitaciones' });
  }

  /**
   * Service card CTA by its visible label (the label is followed by an icon glyph).
   * @param label - e.g. 'Ver cursos'
   * @returns the link locator
   */
  serviceCta(label: string): Locator {
    return this.main.getByRole('link', { name: label });
  }

  /**
   * Section heading of the home page.
   * @param name - exact heading text
   * @returns the heading locator
   */
  sectionHeading(name: string): Locator {
    return this.main.getByRole('heading', { name, exact: true });
  }

  /**
   * Opens the home page (relative to baseURL, resolved from QA_BASE_URL).
   * @param consent - resolve the cookie banner with "Aceptar solo lo necesario"
   * @returns the HTTP status of the document
   */
  async goto(consent: boolean = true): Promise<number> {
    return this.open(Route.Home, { consent });
  }

  /**
   * Final values of the animated counters (elements `.contador`, observed on the
   * live site; they start at 0 and count up once scrolled into view).
   * @returns the current integer value of each counter, in DOM order
   */
  async counterValues(): Promise<number[]> {
    return this.page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('.contador')].map((c) =>
        Number.parseInt(c.innerText.replace(/\D/g, '') || '0', 10),
      ),
    );
  }

  /**
   * Scrolls to the counters section (the animation starts when it is visible).
   * @param label - text of one counter caption, e.g. 'Profesionales Capacitados'
   */
  async scrollToCounters(label: string): Promise<void> {
    await this.main.getByText(label, { exact: true }).scrollIntoViewIfNeeded();
  }
}
