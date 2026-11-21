import type { Locator, Page } from '@playwright/test';

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

  get mainMenu(): Locator {
    return this.header.getByRole('navigation').getByRole('menubar');
  }

  get mainMenuItems(): Locator {
    return this.mainMenu.getByRole('menuitem');
  }

  /**
   * Main menu entry by its accessible name.
   * @param label - exact visible label, e.g. 'Contacto'
   * @returns the menu item locator
   */
  menuItem(label: string): Locator {
    return this.mainMenu.getByRole('menuitem', { name: label, exact: true });
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
}
