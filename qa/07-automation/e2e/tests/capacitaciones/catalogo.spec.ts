// INSPECTION: 2026-11-21 (Chromium headless 1366x900, trackers aborted)
// /capacitaciones2/ -> 200, title "Capacitaciones", no h1 (REC-TCH-005/006).
// Search: searchbox "Buscar curso o certificación..."; filter buttons "Todos" [pressed],
//   Certificaciones, Cursos, Bootcamp, IA, SAP, Automation, Performance.
// Cards: 15 x role group (img "Logo de ...", category/level text, h2 title,
//   link "Saber más" -> https://www.testingenchile.cl/{curso}/ target=_blank, "Programa Completo").
//   Badge text "Certificación" in 6 cards (volatile).
// "Hablemos" -> https://wa.me/569... (number differs from the general one, HC-18).
// Images: header logo alt="" and SENCE image alt="" (DEF-TCH-005); card logos have alt.
import { test, expect, expectOpenDefect, skipPending } from '../../fixtures/pom/test-options';
import { CourseText } from '../../enums/messages';
import { CATALOG_FILTERS } from '../../test-data/static/capacitaciones/capacitaciones';
import { CONTACT_LINK } from '../../test-data/static/home/navigation';
import { imagesWithoutAlt, type ImageInfo } from '../../pages/components/document-audit.component';

const HTTP_OK = 200;

// Read-only checks of the course catalog (module CAP, submodule CAT).
test.describe('CAP - catálogo de capacitaciones', () => {
  test(
    '[TC-CAP-CAT-001] El catálogo carga con tarjetas y enlaces "Saber más" @P0',
    { tag: '@smoke' },
    async ({ catalogPage }) => {
      let status = 0;

      await test.step('GIVEN an anonymous visitor', async () => {
        // Arrange: clean context, trackers aborted
      });

      await test.step('WHEN the catalog is opened', async () => {
        // Act
        status = await catalogPage.goto();
      });

      await test.step('THEN it answers 200 and every card has a "Saber más" link', async () => {
        // Assert
        expect(status).toBe(HTTP_OK);
        await expect(catalogPage.cards).not.toHaveCount(0);
        const cardCount = await catalogPage.cards.count();
        await expect(catalogPage.saberMasLinks).toHaveCount(cardCount);
      });
    },
  );

  test(
    '[TC-CAP-CAT-002] Todos los "Saber más" responden HTTP 200 @P1',
    { tag: '@sanity' },
    async ({ catalogPage, linkChecker }) => {
      let hrefs: string[] = [];
      let broken: Array<{ url: string; status: number }> = [];

      await test.step('GIVEN the catalog page', async () => {
        // Arrange
        await catalogPage.goto();
      });

      await test.step('WHEN every "Saber más" target is requested sequentially', async () => {
        // Act
        hrefs = await catalogPage.hrefsOf(catalogPage.saberMasLinks);
        const results = await linkChecker.statuses(hrefs);
        broken = results.filter((r) => r.status !== HTTP_OK).map((r) => ({ url: r.url, status: r.status }));
      });

      await test.step('THEN every target answers 200', async () => {
        // Assert
        expect(hrefs.length).toBeGreaterThan(0);
        expect(broken).toEqual([]);
      });
    },
  );

  test(
    '[TC-CAP-CAT-003] El filtro "Certificaciones" muestra solo tarjetas con insignia "Certificación" @P1',
    { tag: '@sanity' },
    async ({ catalogPage }) => {
      let withBadge: string[] = [];

      await test.step('GIVEN the catalog with the cards that carry the badge recorded', async () => {
        // Arrange
        await catalogPage.goto();
        withBadge = await catalogPage.certificationTitles();
        expect(withBadge.length).toBeGreaterThan(0);
      });

      await test.step('WHEN the "Certificaciones" filter is applied', async () => {
        // Act
        await catalogPage.applyFilter(CourseText.CertificationsFilter);
      });

      await test.step('THEN the visible cards are exactly the badged ones', async () => {
        // Assert
        await expect.poll(() => catalogPage.visibleTitles()).toEqual(withBadge);
      });
    },
  );

  test(
    '[TC-CAP-CAT-004] Cada filtro reduce la lista y "Todos" la restaura @P1',
    { tag: '@sanity' },
    async ({ catalogPage }) => {
      let total = 0;
      let url = '';

      await test.step('GIVEN the catalog with its total of visible cards', async () => {
        // Arrange
        await catalogPage.goto();
        total = await catalogPage.cards.count();
        url = catalogPage.pathname();
      });

      await test.step('WHEN each filter is applied in turn', async () => {
        // Act + intermediate checks: each filter shows at least one card and fewer than the total
        for (const filter of CATALOG_FILTERS) {
          await catalogPage.applyFilter(filter);
          await expect
            .poll(() => catalogPage.cards.count(), { message: `cards with filter ${filter}` })
            .toBeLessThan(total);
          expect(await catalogPage.cards.count(), `cards with filter ${filter}`).toBeGreaterThan(0);
        }
        await catalogPage.applyFilter(CourseText.AllFilter);
      });

      await test.step('THEN "Todos" restores the total and the URL did not change', async () => {
        // Assert
        await expect(catalogPage.cards).toHaveCount(total);
        expect(catalogPage.pathname()).toBe(url);
      });
    },
  );

  test(
    '[TC-CAP-CAT-005] Los enlaces "Saber más" abren en pestaña nueva @P2',
    { tag: '@regression' },
    async ({ catalogPage }) => {
      let targets: string[] = [];

      await test.step('GIVEN the catalog page', async () => {
        // Arrange
        await catalogPage.goto();
      });

      await test.step('WHEN the target of every "Saber más" is read', async () => {
        // Act
        targets = await catalogPage.targetsOf(catalogPage.saberMasLinks);
      });

      await test.step('THEN all of them declare target=_blank', async () => {
        // Assert
        expect(targets.length).toBeGreaterThan(0);
        expect(targets.filter((t) => t !== CONTACT_LINK.blankTarget)).toEqual([]);
      });
    },
  );

  test(
    '[TC-CAP-CAT-006] El botón "Hablemos" apunta a WhatsApp @P2',
    { tag: '@regression' },
    async ({ catalogPage }) => {
      let href = '';

      await test.step('GIVEN the catalog page', async () => {
        // Arrange
        await catalogPage.goto();
      });

      await test.step('WHEN the "Hablemos" button is read without clicking it', async () => {
        // Act
        [href] = await catalogPage.hrefsOf(catalogPage.hablemosLink);
      });

      await test.step('THEN it points to wa.me in a new tab', async () => {
        // Assert: the number is not asserted (HC-18, REC-TCH-014)
        expect(href.startsWith(CONTACT_LINK.whatsappPrefix)).toBe(true);
        await expect(catalogPage.hablemosLink).toHaveAttribute('target', CONTACT_LINK.blankTarget);
      });
    },
  );

  test(
    '[TC-CAP-CAT-007] El catálogo tiene un H1 y un título descriptivo @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-005, REC-TCH-006: RN-CAP-006 is an SEO criterion not confirmed as a business rule (today no h1, title "Capacitaciones")',
      );
    },
  );

  test(
    '[TC-CAP-CAT-008] Las imágenes del catálogo tienen texto alternativo @P3',
    { tag: '@regression' },
    async ({ catalogPage }) => {
      let images: ImageInfo[] = [];

      await test.step('GIVEN the catalog page', async () => {
        // Arrange
        await catalogPage.goto();
      });

      await test.step('WHEN the alt of every informative image is read', async () => {
        // Act: logo, SENCE and card images
        images = await catalogPage.audit.informativeImages();
      });

      await test.step('THEN no informative image has an empty or missing alt', async () => {
        // Assert
        await expectOpenDefect(
          'DEF-TCH-005',
          'RN-HOME-012 (WCAG 1.1.1) requires a non-empty alt on informative images; logo and SENCE have alt=""',
          () => {
            expect(images.length).toBeGreaterThan(0);
            expect(imagesWithoutAlt(images)).toEqual([]);
          },
        );
      });
    },
  );

  test(
    '[TC-CAP-CAT-009] Filtros y tarjetas son usables en móvil @P2',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-BROWSER',
        'the mobile view of the catalog was not observed; observe it (K12) before automating',
      );
    },
  );
});
