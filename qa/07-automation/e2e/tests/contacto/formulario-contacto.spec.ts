// INSPECTION: 2026-11-21 (Chromium headless 1366x900, trackers aborted)
// /formulario-contacto/ -> 200, title "Contacto - Testing en Chile"; no form element
//   (REC-TCH-008); h1 "¡Hablemos!", h1 "¿Quieres estar al tanto de nuestros próximos cursos...".
// CTA link "Consultar por WhatsApp" (text "¡Hablemos por WhatsApp!") -> https://wa.me/569...?text=..., target=_blank.
// Content social links: LinkedIn (company page differs from the footer one, HC-17),
//   Facebook, Instagram, Twitter (target=_blank).
// Footer: "Consultas generales: contacto@...", "Consultas evento, Sponsor 2026: eventos@...",
//   "Cursos y certificaciones: cursos@..." as plain text (no mailto, REC-TCH-008).
import { test, expect, skipPending } from '../../fixtures/pom/test-options';
import { Route } from '../../enums/routes';
import { CONTACT_SOCIAL_LINKS, INQUIRY_MAILBOXES } from '../../test-data/static/contacto/contacto';
import { CONTACT_LINK, MAIN_MENU_ITEMS, SITE_EMAIL_DOMAIN } from '../../test-data/static/home/navigation';

const HTTP_OK = 200;
const CONTACT_MENU = MAIN_MENU_ITEMS[5];

// Read-only checks of the contact page (module CON, submodule FCO).
test.describe('CON - página de contacto', () => {
  test(
    '[TC-CON-FCO-001] El ítem "Contacto" lleva a la página de contacto @P0',
    { tag: '@smoke' },
    async ({ homePage, contactPage }) => {
      let status = 0;

      await test.step('GIVEN the home page', async () => {
        // Arrange
        await homePage.goto();
      });

      await test.step('WHEN "Contacto" is clicked in the main menu', async () => {
        // Act
        status = await homePage.followLink(homePage.nav.menuItem(CONTACT_MENU.label), Route.Contacto);
      });

      await test.step('THEN the contact page answers 200 with its heading', async () => {
        // Assert
        expect(status).toBe(HTTP_OK);
        expect(contactPage.pathname()).toBe(Route.Contacto);
        await expect(contactPage.heading).toBeVisible();
      });
    },
  );

  test(
    '[TC-CON-FCO-002] El CTA de WhatsApp apunta a una conversación prellenada @P1',
    { tag: '@sanity' },
    async ({ contactPage }) => {
      let whatsapp = new URL(CONTACT_LINK.whatsappPrefix);

      await test.step('GIVEN the contact page', async () => {
        // Arrange
        await contactPage.goto();
      });

      await test.step('WHEN the WhatsApp CTA is read without clicking it', async () => {
        // Act
        const [href] = await contactPage.hrefsOf(contactPage.whatsappCta);
        whatsapp = new URL(href);
      });

      await test.step('THEN it targets wa.me with a prefilled text in a new tab', async () => {
        // Assert
        expect(whatsapp.href.startsWith(CONTACT_LINK.whatsappPrefix)).toBe(true);
        expect(whatsapp.searchParams.get(CONTACT_LINK.whatsappTextParam)).toBeTruthy();
        await expect(contactPage.whatsappCta).toHaveAttribute('target', CONTACT_LINK.blankTarget);
      });
    },
  );

  test(
    '[TC-CON-FCO-003] Los correos por tipo de consulta están visibles @P1',
    { tag: '@sanity' },
    async ({ contactPage }) => {
      await test.step('GIVEN the contact page', async () => {
        // Arrange
        await contactPage.goto();
      });

      await test.step('WHEN the footer is scrolled into view', async () => {
        // Act
        await contactPage.nav.footer.scrollIntoViewIfNeeded();
      });

      await test.step('THEN each inquiry type shows its mailbox of the site domain', async () => {
        // Assert
        for (const inquiry of INQUIRY_MAILBOXES) {
          await expect(contactPage.nav.footerText(inquiry.label)).toBeVisible();
          await expect(contactPage.nav.footerText(`${inquiry.prefix}@${SITE_EMAIL_DOMAIN}`)).toBeVisible();
        }
      });
    },
  );

  test(
    '[TC-CON-FCO-004] Las redes sociales de la página abren en pestaña nueva @P2',
    { tag: '@regression' },
    async ({ contactPage }) => {
      const links: Array<{ label: string; hostOk: boolean }> = [];

      await test.step('GIVEN the contact page', async () => {
        // Arrange
        await contactPage.goto();
      });

      await test.step('WHEN the social links of the content are read', async () => {
        // Act: the concrete profile is not asserted (HC-17, REC-TCH-013)
        for (const social of CONTACT_SOCIAL_LINKS) {
          const [href] = await contactPage.hrefsOf(contactPage.socialLink(social.label));
          links.push({ label: social.label, hostOk: social.host.test(new URL(href).hostname) });
        }
      });

      await test.step('THEN each one points to its network domain in a new tab', async () => {
        // Assert
        expect(links).toEqual(CONTACT_SOCIAL_LINKS.map((s) => ({ label: s.label, hostOk: true })));
        for (const social of CONTACT_SOCIAL_LINKS) {
          await expect(contactPage.socialLink(social.label)).toHaveAttribute('target', CONTACT_LINK.blankTarget);
        }
      });
    },
  );

  test(
    '[TC-CON-FCO-005] La página de contacto ofrece un formulario @P1',
    { tag: '@sanity' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-008: RN-CON-005 is pending confirmation (open question 3) and today the page has no form (HC-12)',
      );
    },
  );

  test(
    '[TC-CON-FCO-006] La página de contacto declara metadatos y un único H1 @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-005: RN-CON-006 is an SEO criterion not confirmed as a business rule (HC-09)',
      );
    },
  );

  test(
    '[TC-CON-FCO-007] Los correos del footer son enlaces mailto @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-008: no rule requires the mailto link (HC-12); automate only if the owner raises it to a rule',
      );
    },
  );

  test(
    '[TC-CON-FCO-008] La página de contacto es usable en móvil @P2',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-BROWSER',
        'the mobile view of the contact page was not observed; observe it (K12) before automating',
      );
    },
  );
});
