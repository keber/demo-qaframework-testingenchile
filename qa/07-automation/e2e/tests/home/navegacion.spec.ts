// INSPECTION: 2026-11-21 (Chromium headless 1366x900 and Pixel 5, trackers aborted)
// Menu: navigation > menubar "Menú" with 6 menuitems + toggle "Abrir submenú";
//   hover on "Testing Day Chile 2026" opens menu "Testing Day Chile 2026" with
//   Agenda Online, Nuestros Sponsors 2026, Ediciones anteriores, Otras Actividades
//   (toggle renamed "Cerrar submenú"); third level not revealed by hover (HC, Q10).
// Mobile (Pixel 5): header link "Menú"; panel close link "Close Menu"; no overflow (393/393).
// Cookies: buttons "Aceptar solo lo necesario" / "Aceptar todo"; cookies stored:
//   cookieAccepted, cookieWarning; footer link "Cookies" (href '#') reopens the banner.
// Header: top-bar links mailto:cursos@..., tel:+56...; logo img.wnd-logo-img alt="" (DEF-TCH-004).
// Footer: contacto@/eventos@/cursos@ as text; links LinkedIn, Instagram, Facebook, X;
//   legal links target=_blank. Floating link "Consultar por WhatsApp" -> wa.me ?text=.
// 404: /qa-pagina-inexistente-1/ -> HTTP 404, title "404 - Página no encontrada :: ...".
import { test, expect, expectOpenDefect, skipPending, PIXEL_5 } from '../../fixtures/pom/test-options';
import { HomeText, PageTitle } from '../../enums/messages';
import { Route } from '../../enums/routes';
import { execIdx } from '../../fixtures/test-helpers';
import {
  CANONICAL_ORIGIN,
  CONTACT_LINK,
  DOMAIN_VARIANTS,
  EVENT_MENU_LABEL,
  EVENT_SUBMENU_ITEMS,
  FOOTER_EMAIL_PREFIXES,
  FOOTER_LEGAL_LINKS,
  FOOTER_SOCIAL_LINKS,
  MAIN_MENU_ARIA,
  MAIN_MENU_ITEMS,
  MAIN_MENU_LOOKUP,
  SITE_EMAIL_DOMAIN,
  SITE_NAME_PATTERN,
} from '../../test-data/static/home/navigation';

const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;
const HTTP_MOVED_PERMANENTLY = 301;

// Read-only checks of the global navigation of testingenchile.cl (module HOME,
// submodule NAV). No form submission; external targets checked with `request`.
test.describe('HOME - navegación global', () => {
  test(
    '[TC-HOME-NAV-001] La página de inicio carga con header, menú y footer @P0',
    { tag: '@smoke' },
    async ({ page, homePage }) => {
      let status = 0;

      await test.step('GIVEN a clean anonymous context on the home page', async () => {
        // Arrange
        status = await homePage.goto(false);
      });

      await test.step('WHEN the cookie banner is resolved with "Aceptar solo lo necesario"', async () => {
        // Act
        await homePage.cookieBanner.acceptNecessaryOnly();
      });

      await test.step('THEN the page answers 200 with title, main menu and footer', async () => {
        // Assert
        expect(status).toBe(HTTP_OK);
        await expect(page).toHaveTitle(new RegExp(PageTitle.Home));
        await expect(homePage.nav.mainMenu).toBeVisible();
        await homePage.nav.footer.scrollIntoViewIfNeeded();
        await expect(homePage.nav.footer).toBeVisible();
      });
    },
  );

  test(
    '[TC-HOME-NAV-002] El menú principal muestra los seis ítems y cada uno navega a su ruta @P0',
    { tag: '@smoke' },
    async ({ homePage }) => {
      test.slow();
      const statuses: Array<{ path: string; status: number; reached: string }> = [];

      await test.step('GIVEN the home page in a desktop viewport', async () => {
        // Arrange
        await homePage.goto();
      });

      await test.step('WHEN each menu item is clicked from the home page', async () => {
        // Act
        await expect(homePage.nav.mainMenu).toMatchAriaSnapshot(MAIN_MENU_ARIA);
        for (const item of MAIN_MENU_LOOKUP.slice(1)) {
          await homePage.goto();
          const status = await homePage.followLink(homePage.nav.menuItem(item.label), item.path);
          statuses.push({ path: item.path, status, reached: homePage.pathname() });
        }
      });

      await test.step('THEN every item reaches its route with HTTP 200', async () => {
        // Assert
        expect(statuses).toEqual(
          MAIN_MENU_ITEMS.slice(1).map((i) => ({ path: i.path, status: HTTP_OK, reached: i.path })),
        );
      });
    },
  );

  test(
    '[TC-HOME-NAV-003] El submenú de Testing Day se despliega al pasar el puntero @P1',
    { tag: '@sanity' },
    async ({ homePage }) => {
      await test.step('GIVEN the home page in a desktop viewport', async () => {
        // Arrange
        await homePage.goto();
      });

      await test.step('WHEN the pointer rests on the event menu item', async () => {
        // Act
        await homePage.nav.hoverMenuItem(EVENT_MENU_LABEL);
      });

      await test.step('THEN the four submenu items are visible', async () => {
        // Assert
        const submenu = homePage.nav.submenu(EVENT_MENU_LABEL);
        for (const label of EVENT_SUBMENU_ITEMS) {
          await expect(submenu.getByRole('menuitem', { name: label })).toBeVisible();
        }
      });
    },
  );

  test(
    '[TC-HOME-NAV-004] El tercer nivel de "Ediciones anteriores" muestra las ediciones pasadas @P2',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-BROWSER',
        'the third menu level is not revealed by hover in headless Chromium (open question 10, RN-HOME-003 pending); observe it in a real desktop browser (K12) before automating',
      );
    },
  );

  test(
    '[TC-HOME-NAV-006] El banner de cookies acepta solo lo necesario y la elección persiste @P1',
    { tag: '@sanity' },
    async ({ homePage }) => {
      await test.step('GIVEN a context without cookies on the home page', async () => {
        // Arrange
        await homePage.goto(false);
        await expect(homePage.cookieBanner.acceptNecessaryButton).toBeVisible();
        await expect(homePage.cookieBanner.acceptAllButton).toBeVisible();
      });

      await test.step('WHEN "Aceptar solo lo necesario" is chosen and the page reloads', async () => {
        // Act
        await homePage.cookieBanner.acceptNecessaryOnly();
        expect(await homePage.cookieBanner.hasConsentCookie()).toBe(true);
        await homePage.reload();
      });

      await test.step('THEN the banner does not come back', async () => {
        // Assert
        await expect(homePage.nav.mainMenu).toBeVisible();
        await expect(homePage.cookieBanner.acceptNecessaryButton).toBeHidden();
        expect(await homePage.cookieBanner.hasConsentCookie()).toBe(true);
      });
    },
  );

  test(
    '[TC-HOME-NAV-007] El enlace "Cookies" del footer reabre el banner @P2',
    { tag: '@regression' },
    async ({ homePage }) => {
      await test.step('GIVEN the home page with the consent already given', async () => {
        // Arrange
        await homePage.goto();
        await homePage.nav.cookiesLink.scrollIntoViewIfNeeded();
      });

      await test.step('WHEN the footer link "Cookies" is clicked', async () => {
        // Act
        await homePage.nav.cookiesLink.click();
      });

      await test.step('THEN the cookie banner is visible again', async () => {
        // Assert
        await expect(homePage.cookieBanner.acceptNecessaryButton).toBeVisible();
      });
    },
  );

  test(
    '[TC-HOME-NAV-008] El footer muestra contacto, redes y enlaces legales operativos @P1',
    { tag: '@sanity' },
    async ({ homePage, linkChecker }) => {
      let legalStatuses: Array<{ url: string; status: number }> = [];

      await test.step('GIVEN the footer of the home page', async () => {
        // Arrange
        await homePage.goto();
        await homePage.nav.footer.scrollIntoViewIfNeeded();
      });

      await test.step('WHEN the legal targets are requested', async () => {
        // Act
        const results = await linkChecker.statuses(FOOTER_LEGAL_LINKS.map((l) => l.path));
        legalStatuses = results.map((r) => ({ url: r.url, status: r.status }));
      });

      await test.step('THEN mailboxes, social links and legal links are present and operative', async () => {
        // Assert
        for (const prefix of FOOTER_EMAIL_PREFIXES) {
          await expect(homePage.nav.footerText(`${prefix}@${SITE_EMAIL_DOMAIN}`)).toBeVisible();
        }
        for (const social of FOOTER_SOCIAL_LINKS) {
          const link = homePage.nav.footerLink(social.label);
          await expect(link).toBeVisible();
          const [href] = await homePage.hrefsOf(link);
          expect(new URL(href).hostname).toMatch(social.host);
        }
        for (const legal of FOOTER_LEGAL_LINKS) {
          await expect(homePage.nav.footerLink(legal.label)).toHaveAttribute('href', legal.path);
          await expect(homePage.nav.footerLink(legal.label)).toHaveAttribute('target', CONTACT_LINK.blankTarget);
        }
        expect(legalStatuses).toEqual(FOOTER_LEGAL_LINKS.map((l) => ({ url: l.path, status: HTTP_OK })));
      });
    },
  );

  test(
    '[TC-HOME-NAV-009] Los enlaces de contacto rápido apuntan a destinos válidos @P1',
    { tag: '@sanity' },
    async ({ homePage }) => {
      let whatsapp = new URL(CANONICAL_ORIGIN);

      await test.step('GIVEN the home page', async () => {
        // Arrange
        await homePage.goto();
      });

      await test.step('WHEN the quick contact links are read without clicking them', async () => {
        // Act
        const [href] = await homePage.hrefsOf(homePage.nav.whatsappFloatingLink);
        whatsapp = new URL(href);
      });

      await test.step('THEN WhatsApp, mail and phone links use the expected schemes', async () => {
        // Assert
        expect(whatsapp.href.startsWith(CONTACT_LINK.whatsappPrefix)).toBe(true);
        expect(whatsapp.searchParams.get(CONTACT_LINK.whatsappTextParam)).toBeTruthy();
        await expect(homePage.nav.whatsappFloatingLink).toHaveAttribute('target', CONTACT_LINK.blankTarget);
        await expect(homePage.nav.topBarEmailLink).toHaveAttribute(
          'href',
          new RegExp(`^${CONTACT_LINK.mailtoScheme}[\\w.-]+@${SITE_EMAIL_DOMAIN.replace('.', '\\.')}$`),
        );
        await expect(homePage.nav.topBarPhoneLink).toHaveAttribute(
          'href',
          new RegExp(`^${CONTACT_LINK.phonePrefix.replace('+', '\\+')}\\d+$`),
        );
      });
    },
  );

  test(
    '[TC-HOME-NAV-010] Una ruta inexistente responde 404 con navegación @P1',
    { tag: '@sanity' },
    async ({ homePage }) => {
      let status = 0;

      await test.step('GIVEN a path that does not exist', async () => {
        // Arrange: unique suffix per execution window
      });

      await test.step('WHEN the path is opened', async () => {
        // Act
        status = await homePage.open(`${Route.NotFoundPrefix}${execIdx()}/`);
      });

      await test.step('THEN the site answers 404 with its error heading and menu', async () => {
        // Assert
        expect(status).toBe(HTTP_NOT_FOUND);
        await expect(homePage.audit.h1Headings).toHaveText([HomeText.NotFoundHeading]);
        await expect(homePage.nav.mainMenu).toBeVisible();
      });
    },
  );

  test(
    '[TC-HOME-NAV-011] Las variantes de dominio redirigen con 301 a la URL canónica @P2',
    { tag: '@regression' },
    async ({ linkChecker }) => {
      const hops: Array<{ variant: string; status: number; location: string }> = [];

      await test.step('GIVEN the non-canonical URL variants', async () => {
        // Arrange: DOMAIN_VARIANTS plus the catalog path without trailing slash
      });

      await test.step('WHEN each variant is requested without following redirects', async () => {
        // Act
        for (const variant of [...DOMAIN_VARIANTS, Route.CapacitacionesNoSlash]) {
          const hop = await linkChecker.firstHop(variant);
          const location = new URL(hop.location, `${CANONICAL_ORIGIN}/`).href;
          hops.push({ variant, status: hop.status, location });
        }
      });

      await test.step('THEN each one answers 301 towards the canonical URL with trailing slash', async () => {
        // Assert
        expect(hops).toEqual([
          { variant: DOMAIN_VARIANTS[0], status: HTTP_MOVED_PERMANENTLY, location: `${CANONICAL_ORIGIN}/` },
          { variant: DOMAIN_VARIANTS[1], status: HTTP_MOVED_PERMANENTLY, location: `${CANONICAL_ORIGIN}/` },
          {
            variant: Route.CapacitacionesNoSlash,
            status: HTTP_MOVED_PERMANENTLY,
            location: `${CANONICAL_ORIGIN}${Route.Capacitaciones}`,
          },
        ]);
      });
    },
  );

  test(
    '[TC-HOME-NAV-012] El logo del header tiene texto alternativo @P2',
    { tag: '@regression' },
    async ({ homePage }) => {
      const logos: Array<{ path: string; alt: string; linkName: string }> = [];

      await test.step('GIVEN the home page and the catalog page', async () => {
        // Arrange: both pages share the Webnode header
      });

      await test.step('WHEN the logo image and its link are read on each page', async () => {
        // Act
        for (const path of [Route.Home, Route.Capacitaciones]) {
          await homePage.open(path);
          const logo = await homePage.nav.logoInfo();
          logos.push({ path, alt: logo.alt, linkName: logo.linkName });
        }
      });

      await test.step('THEN the logo declares a descriptive alt and its link has a name', async () => {
        // Assert
        await expectOpenDefect(
          'DEF-TCH-004',
          'RN-HOME-012 (WCAG 1.1.1) requires a descriptive alt on the header logo; it is alt=""',
          () => {
            for (const logo of logos) {
              expect(logo.alt, `logo alt on ${logo.path}`).toMatch(SITE_NAME_PATTERN);
              expect(logo.linkName, `logo link name on ${logo.path}`).not.toBe('');
            }
          },
        );
      });
    },
  );

  test(
    '[TC-HOME-NAV-013] Los perfiles sociales son consistentes entre páginas @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-013: RN-HOME-013 is pending confirmation and today the profiles differ (HC-17); manual track until the owner confirms the rule',
      );
    },
  );

  test.describe('móvil (Pixel 5)', () => {
    test.use(PIXEL_5);

    test(
      '[TC-HOME-NAV-005] El menú móvil se abre, expande el submenú y se cierra @P1',
      { tag: '@sanity' },
      async ({ homePage }) => {
        await test.step('GIVEN the home page on a Pixel 5', async () => {
          // Arrange
          await homePage.goto();
        });

        await test.step('WHEN the menu opens and the event submenu is expanded', async () => {
          // Act
          await homePage.nav.openMobileMenu();
          for (const item of MAIN_MENU_LOOKUP) {
            await expect(homePage.nav.menuItem(item.label)).toBeVisible();
          }
          await homePage.nav.submenuToggle.click();
        });

        await test.step('THEN the event items show and the panel hides after closing', async () => {
          // Assert
          const submenu = homePage.nav.submenu(EVENT_MENU_LABEL);
          for (const label of EVENT_SUBMENU_ITEMS) {
            await expect(submenu.getByRole('menuitem', { name: label })).toBeVisible();
          }
          await homePage.nav.closeMobileMenu();
          for (const item of MAIN_MENU_LOOKUP) {
            await expect(homePage.nav.menuItem(item.label)).toBeHidden();
          }
        });
      },
    );

    test(
      '[TC-HOME-NAV-014] La página de inicio no desborda horizontalmente en móvil @P2',
      { tag: '@regression' },
      async ({ homePage }) => {
        let size = { scrollWidth: -1, clientWidth: 0 };

        await test.step('GIVEN the home page on a Pixel 5', async () => {
          // Arrange
          await homePage.goto();
        });

        await test.step('WHEN the document width is measured', async () => {
          // Act
          size = await homePage.audit.horizontalSize();
        });

        await test.step('THEN there is no horizontal scroll', async () => {
          // Assert
          expect(size.scrollWidth).toBe(size.clientWidth);
        });
      },
    );
  });
});
