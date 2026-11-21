import { test, expect } from '../../fixtures/pom/test-options';
import { A11yName, PageTitle } from '../../enums/messages';
import {
  FOOTER_LEGAL_LINKS,
  HEADER_SOCIAL_LINKS,
  MAIN_MENU_ITEMS,
} from '../../test-data/static/home/navigation';

// The Webnode menu exposes one extra menuitem: the "Abrir submenú" toggle button.
const SUBMENU_TOGGLES = 1;

// Read-only smoke checks of the public home page: navigation only, no form
// submission, no state change.
test.describe('HOME - smoke de inicio y navegación global', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test(
    '[TC-HOME-SMOKE-001] La página de inicio carga con título, header y footer @P0',
    { tag: '@smoke' },
    async ({ page, homePage }) => {
      await test.step('GIVEN the home page is open', async () => {
        // Arrange: done in beforeEach (homePage.goto)
        await expect(page).toHaveTitle(PageTitle.Home);
      });

      await test.step('WHEN the global layout renders', async () => {
        // Act: no interaction, the layout is rendered on load
        await expect(homePage.nav.header).toBeVisible();
      });

      await test.step('THEN header, main heading and footer are visible', async () => {
        // Assert
        await expect(homePage.mainHeadings).not.toHaveCount(0);
        await expect(homePage.nav.footer).toBeVisible();
        for (const network of HEADER_SOCIAL_LINKS) {
          await expect(homePage.nav.headerSocialLink(network)).toBeVisible();
        }
      });
    },
  );

  test(
    '[TC-HOME-SMOKE-002] El menú principal muestra las secciones con su ruta @P0',
    { tag: '@smoke' },
    async ({ navigation }) => {
      await test.step('GIVEN the main menu is present', async () => {
        // Arrange
        await expect(navigation.mainMenu).toBeVisible();
        await expect(navigation.mainMenu).toHaveAccessibleName(A11yName.MainMenu);
      });

      await test.step('WHEN each expected section is looked up by name', async () => {
        // Act: lookup only, no click (the menu is checked, not exercised)
        await expect(navigation.mainMenuItems).toHaveCount(
          MAIN_MENU_ITEMS.length + SUBMENU_TOGGLES,
        );
      });

      await test.step('THEN every section is visible and links to its route', async () => {
        // Assert
        for (const item of MAIN_MENU_ITEMS) {
          await expect(navigation.menuItem(item.label)).toBeVisible();
          await expect(navigation.menuItem(item.label)).toHaveAttribute('href', item.path);
        }
      });
    },
  );

  test(
    '[TC-HOME-SMOKE-003] El footer enlaza términos y condiciones y política de privacidad @P1',
    { tag: '@smoke' },
    async ({ navigation }) => {
      await test.step('GIVEN the footer is rendered', async () => {
        // Arrange
        await navigation.footer.scrollIntoViewIfNeeded();
      });

      await test.step('WHEN the legal links are looked up', async () => {
        // Act
        await expect(navigation.footer).toBeVisible();
      });

      await test.step('THEN each legal link is visible and points to its route', async () => {
        // Assert
        for (const link of FOOTER_LEGAL_LINKS) {
          await expect(navigation.footerLink(link.label)).toBeVisible();
          await expect(navigation.footerLink(link.label)).toHaveAttribute('href', link.path);
        }
      });
    },
  );
});
