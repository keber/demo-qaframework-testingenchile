import type { Locator, Page } from '@playwright/test';
import { InfraError } from '../../fixtures/defects';

export interface LogoInfo {
  altPresent: boolean;
  // Trimmed alt text; empty when absent or empty.
  alt: string;
  linkHref: string | null;
  // Accessible name of the logo link (aria-label, title, text or image alt).
  linkName: string;
}

// Global header (banner), main menu and footer (contentinfo) shared by every
// page of testingenchile.cl (Webnode template).
export class NavigationComponent {
  constructor(private readonly page: Page) {}

  get header(): Locator {
    return this.page.getByRole('banner');
  }

  get footer(): Locator {
    return this.page.getByRole('contentinfo');
  }

  get mainNavigation(): Locator {
    return this.page.getByRole('navigation');
  }

  get mainMenu(): Locator {
    return this.mainNavigation.getByRole('menubar');
  }

  get mainMenuItems(): Locator {
    return this.mainMenu.getByRole('menuitem');
  }

  // Mobile header button that opens the navigation panel.
  get mobileMenuButton(): Locator {
    return this.header.getByRole('link', { name: 'Menú', exact: true });
  }

  // Close control of the mobile panel (title "Close Menu" observed on the live site).
  get mobileMenuCloseButton(): Locator {
    return this.mainNavigation.getByRole('link', { name: 'Close Menu', exact: true });
  }

  get topBarEmailLink(): Locator {
    return this.header.getByRole('link', { name: /@/ });
  }

  get topBarPhoneLink(): Locator {
    return this.header.getByRole('link', { name: /^\+?\d[\d\s]+$/ });
  }

  // Floating WhatsApp button (accessible name from its aria-label).
  get whatsappFloatingLink(): Locator {
    return this.page.getByRole('link', { name: 'Consultar por WhatsApp', exact: true });
  }

  get cookiesLink(): Locator {
    return this.footer.getByRole('link', { name: 'Cookies', exact: true });
  }

  /**
   * Main menu entry by its accessible name.
   * @param label - exact visible label, e.g. 'Contacto'; a RegExp for volatile labels
   * @returns the menu item locator
   */
  menuItem(label: string | RegExp): Locator {
    return typeof label === 'string'
      ? this.mainMenu.getByRole('menuitem', { name: label, exact: true })
      : this.mainMenu.getByRole('menuitem', { name: label });
  }

  /**
   * Submenu (menu role) opened under a main menu entry.
   * @param parentLabel - label of the parent entry, a RegExp for volatile labels
   * @returns the submenu locator
   */
  submenu(parentLabel: string | RegExp): Locator {
    return this.mainMenu.getByRole('menu', { name: parentLabel });
  }

  // "Abrir submenú" toggle of the main menu (the only one at the first level).
  get submenuToggle(): Locator {
    return this.mainMenu.getByRole('menuitem', { name: 'Abrir submenú', exact: true });
  }

  /**
   * Social network link in the header.
   * @param network - accessible name, e.g. 'Facebook'
   * @returns the link locator
   */
  headerSocialLink(network: string): Locator {
    return this.header.getByRole('link', { name: network, exact: true });
  }

  /**
   * Link in the footer by its accessible name.
   * @param label - exact link text, e.g. 'Políticas de privacidad.'
   * @returns the link locator
   */
  footerLink(label: string): Locator {
    return this.footer.getByRole('link', { name: label, exact: true });
  }

  /**
   * Text of the footer that contains a fragment (e.g. an e-mail address).
   * @param text - substring or RegExp
   * @returns the locator of the smallest element containing it
   */
  footerText(text: string | RegExp): Locator {
    return this.footer.getByText(text);
  }

  /**
   * Opens the mobile navigation panel.
   * @returns resolves after the click
   */
  async openMobileMenu(): Promise<void> {
    await this.mobileMenuButton.click();
  }

  /**
   * Closes the mobile navigation panel.
   * @returns resolves after the click
   */
  async closeMobileMenu(): Promise<void> {
    await this.mobileMenuCloseButton.click();
  }

  /**
   * Hovers a main menu entry to reveal its submenu (desktop).
   * @param label - entry label or RegExp
   */
  async hoverMenuItem(label: string | RegExp): Promise<void> {
    await this.menuItem(label).hover();
  }

  /**
   * Header logo image and its home link (class names observed on the live site).
   * @returns alt of the logo image and the accessible name of its link
   */
  async logoInfo(): Promise<LogoInfo> {
    await this.page
      .waitForFunction(() => document.querySelector('img.wnd-logo-img') !== null, null, { timeout: 10_000 })
      .catch(() => undefined);
    const info = await this.page.evaluate(() => {
      const img = document.querySelector<HTMLImageElement>('img.wnd-logo-img');
      if (!img) return null;
      const link = img.closest('a');
      const linkName = link
        ? (link.getAttribute('aria-label') ?? link.getAttribute('title') ?? link.innerText ?? '').trim() ||
          (img.getAttribute('alt') ?? '').trim()
        : '';
      return {
        altPresent: img.hasAttribute('alt'),
        alt: (img.getAttribute('alt') ?? '').trim(),
        linkHref: link?.getAttribute('href') ?? null,
        linkName,
      };
    });
    if (info === null) {
      throw new InfraError('selector-drift', 'header logo image (img.wnd-logo-img) not found');
    }
    return info;
  }

  /**
   * Hrefs of the third menu level under a second-level entry, read from the DOM
   * (the level is not revealed by hover in headless Chromium, see TC-HOME-NAV-004).
   * @param secondLevelLabel - e.g. 'Ediciones anteriores'
   * @returns absolute hrefs, in DOM order
   */
  async thirdLevelHrefs(secondLevelLabel: string): Promise<string[]> {
    return this.page.evaluate((label) => {
      const anchor = [...document.querySelectorAll<HTMLAnchorElement>('nav a')].find(
        (a) => a.innerText.trim() === label,
      );
      const item = anchor?.closest('li');
      if (!item) return [];
      return [...item.querySelectorAll<HTMLAnchorElement>('ul a[href]')].map((a) => a.href);
    }, secondLevelLabel);
  }
}
