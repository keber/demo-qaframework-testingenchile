// INSPECTION: 2026-11-21 (Chromium headless 1366x900, trackers aborted)
// Footer links "Términos y condiciones." -> /terminos-y-condiciones/ and "Políticas de
//   privacidad." -> /politica-de-privacidad/, both target=_blank.
// /terminos-y-condiciones/ -> 200, title "Términos y Condiciones :: Testing en Chile",
//   lang=es, one h1 "Términos y Condiciones" (Webnode template text, REC-TCH-001).
// /politica-de-privacidad/ -> 200, lang=es, one h1 "Política de privacidad", 8 h2: Normas
//   generales ... Disposiciones finales (online-store template with blank markers, REC-TCH-002).
import { test, expect, skipPending } from '../../fixtures/pom/test-options';
import { CONTACT_LINK } from '../../test-data/static/home/navigation';
import { DOCUMENT_LANG, LEGAL_PAGES, PRIVACY_SECTIONS } from '../../test-data/static/legal/legal';

const HTTP_OK = 200;

// Read-only checks of the legal pages (module LEG, submodule LGL).
test.describe('LEG - páginas legales', () => {
  test(
    '[TC-LEG-LGL-001] Los enlaces legales del footer abren páginas existentes en pestaña nueva @P0',
    { tag: '@smoke' },
    async ({ homePage, legalPage }) => {
      const visited: Array<{ path: string; status: number; h1: string }> = [];

      await test.step('GIVEN the legal links of the home footer', async () => {
        // Arrange
        await homePage.goto();
        for (const legal of LEGAL_PAGES) {
          await expect(homePage.nav.footerLink(legal.link)).toHaveAttribute('href', legal.path);
          await expect(homePage.nav.footerLink(legal.link)).toHaveAttribute('target', CONTACT_LINK.blankTarget);
        }
      });

      await test.step('WHEN each legal destination is opened', async () => {
        // Act
        for (const legal of LEGAL_PAGES) {
          const status = await legalPage.open(legal.path);
          visited.push({ path: legal.path, status, h1: (await legalPage.h1.innerText()).trim() });
        }
      });

      await test.step('THEN both answer 200 with their heading', async () => {
        // Assert
        expect(visited).toEqual(LEGAL_PAGES.map((l) => ({ path: l.path, status: HTTP_OK, h1: l.h1 })));
      });
    },
  );

  test(
    '[TC-LEG-LGL-002] Términos y Condiciones no contiene texto de plantilla @P1',
    { tag: '@sanity' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-001: RN-LEG-002 is pending confirmation (open question 5) and today the page holds Webnode template text (HC-01); escalated to business and legal',
      );
    },
  );

  test(
    '[TC-LEG-LGL-003] La política de privacidad no contiene marcadores sin completar @P1',
    { tag: '@sanity' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-002: RN-LEG-003 and RN-LEG-004 are pending confirmation and today the policy has blank markers (HC-02); escalated',
      );
    },
  );

  test(
    '[TC-LEG-LGL-004] La política identifica al responsable y el canal para ejercer derechos @P1',
    { tag: '@sanity' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'manual track (REC-TCH-002): content review that needs human and legal judgement; RN-LEG-003 pending confirmation (HC-02)',
      );
    },
  );

  test(
    '[TC-LEG-LGL-005] La política de privacidad presenta sus secciones @P2',
    { tag: '@regression' },
    async ({ legalPage }) => {
      let sections: string[] = [];

      await test.step('GIVEN the privacy policy page', async () => {
        // Arrange
        await legalPage.open(LEGAL_PAGES[1].path);
      });

      await test.step('WHEN its h2 sections are listed', async () => {
        // Act
        sections = await legalPage.sectionTitles();
      });

      await test.step('THEN the 8 sections of the inventory are present', async () => {
        // Assert
        expect(sections).toEqual(expect.arrayContaining([...PRIVACY_SECTIONS]));
      });
    },
  );

  test(
    '[TC-LEG-LGL-006] El banner de cookies enlaza a la información de cookies @P2',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-002: RN-LEG-005 is pending confirmation and today the banner has no cookie policy link (HC-02)',
      );
    },
  );

  test(
    '[TC-LEG-LGL-007] Las páginas legales tienen description representativa @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-007: RN-LEG-006 is an SEO criterion not confirmed as a business rule (HC-11)',
      );
    },
  );

  test(
    '[TC-LEG-LGL-008] Las páginas legales declaran idioma y un único H1 @P3',
    { tag: '@regression' },
    async ({ legalPage }) => {
      const pages: Array<{ path: string; lang: string; h1: number }> = [];

      await test.step('GIVEN both legal pages', async () => {
        // Arrange: read in the next step
      });

      await test.step('WHEN lang and the number of h1 are read on each page', async () => {
        // Act
        for (const legal of LEGAL_PAGES) {
          await legalPage.open(legal.path);
          const meta = await legalPage.audit.metadata();
          pages.push({ path: legal.path, lang: meta.lang, h1: await legalPage.audit.h1Count() });
        }
      });

      await test.step('THEN each page declares lang="es" and exactly one h1', async () => {
        // Assert
        expect(pages).toEqual(LEGAL_PAGES.map((l) => ({ path: l.path, lang: DOCUMENT_LANG, h1: 1 })));
      });
    },
  );
});
