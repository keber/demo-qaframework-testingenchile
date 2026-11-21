// INSPECTION: 2026-11-21 (Chromium headless 1366x900, trackers aborted)
// /galeria/ -> 200, title "Galería de Cursos, Eventos y capacitaciones - CapTI de Tesitng
//   en Chile" (REC-TCH-006); album h2 "10° Edición Testing Day Chile - 2026 | Santiago",
//   "9° Edición ... 2025", "Testing Day Chile 2018", ...; thumbnails = unnamed links to
//   the full image (img alt="" in 558/572, DEF-TCH-005).
// Viewer: PhotoSwipe, role dialog with counter "1 / 16"; ArrowRight -> "2 / 16";
//   Escape closes it; the URL does not change.
import { test, expect, expectOpenDefect, skipPending } from '../../fixtures/pom/test-options';
import { Route } from '../../enums/routes';
import { MAIN_MENU_ITEMS } from '../../test-data/static/home/navigation';
import { imagesWithoutAlt, type ImageInfo } from '../../pages/components/document-audit.component';

const HTTP_OK = 200;
const GALLERY_MENU = MAIN_MENU_ITEMS[4];

// Read-only checks of the photo gallery (module LEG, submodule GAL).
test.describe('LEG - fotogalería', () => {
  test(
    '[TC-LEG-GAL-001] La galería carga con álbumes y miniaturas @P0',
    { tag: '@smoke' },
    async ({ homePage, galleryPage }) => {
      let status = 0;

      await test.step('GIVEN the home page', async () => {
        // Arrange
        await homePage.goto();
      });

      await test.step('WHEN "Fotogalería" is clicked in the main menu', async () => {
        // Act
        status = await homePage.followLink(homePage.nav.menuItem(GALLERY_MENU.label), Route.Galeria);
        await galleryPage.markFirstThumbnail();
      });

      await test.step('THEN the gallery answers 200 with album headings and thumbnails', async () => {
        // Assert
        expect(status).toBe(HTTP_OK);
        expect(galleryPage.pathname()).toBe(Route.Galeria);
        await expect(galleryPage.albumHeadings).not.toHaveCount(0);
        await expect(galleryPage.firstThumbnail).toBeVisible();
      });
    },
  );

  test(
    '[TC-LEG-GAL-002] Una miniatura abre el visor y Escape lo cierra @P1',
    { tag: '@sanity' },
    async ({ galleryPage }) => {
      let urlBefore = '';
      let urlWithViewer = '';

      await test.step('GIVEN the gallery', async () => {
        // Arrange
        await galleryPage.goto();
        urlBefore = galleryPage.pathname();
      });

      await test.step('WHEN the first thumbnail is clicked and then Escape is pressed', async () => {
        // Act
        await galleryPage.openFirstPhoto();
        await expect(galleryPage.viewerCounter).toHaveText(/^1 \/ \d+$/);
        urlWithViewer = galleryPage.pathname();
        await galleryPage.closeViewer();
      });

      await test.step('THEN the viewer opened on "1 / N" without changing the URL and is closed', async () => {
        // Assert
        expect(urlWithViewer).toBe(urlBefore);
        await expect(galleryPage.viewer).toBeHidden();
      });
    },
  );

  test(
    '[TC-LEG-GAL-003] La flecha derecha avanza a la siguiente foto @P2',
    { tag: '@regression' },
    async ({ galleryPage }) => {
      await test.step('GIVEN the viewer open on an album with more than one photo', async () => {
        // Arrange
        await galleryPage.goto();
        await galleryPage.openFirstPhoto();
        await expect(galleryPage.viewerCounter).toHaveText(/^1 \/ ([2-9]|\d{2,})$/);
      });

      await test.step('WHEN the right arrow key is pressed', async () => {
        // Act
        await galleryPage.nextPhoto();
      });

      await test.step('THEN the counter moves to "2 / N"', async () => {
        // Assert
        await expect(galleryPage.viewerCounter).toHaveText(/^2 \/ \d+$/);
      });
    },
  );

  test(
    '[TC-LEG-GAL-004] El álbum más reciente aparece primero @P2',
    { tag: '@regression' },
    async ({ galleryPage }) => {
      let years = { first: 0, latest: -1 };

      await test.step('GIVEN the gallery', async () => {
        // Arrange
        await galleryPage.goto();
      });

      await test.step('WHEN the year of every album heading is extracted', async () => {
        // Act
        years = await galleryPage.albumYears();
      });

      await test.step('THEN the first album belongs to the most recent year', async () => {
        // Assert
        expect(years.first).toBe(years.latest);
      });
    },
  );

  test(
    '[TC-LEG-GAL-005] El título de la galería no tiene errores tipográficos @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-006: RN-LEG-016 is an editorial criterion not confirmed as a business rule (HC-10)',
      );
    },
  );

  test(
    '[TC-LEG-GAL-006] Las fotos de la galería tienen texto alternativo @P3',
    { tag: '@regression' },
    async ({ galleryPage }) => {
      let images: ImageInfo[] = [];

      await test.step('GIVEN the gallery', async () => {
        // Arrange
        await galleryPage.goto();
      });

      await test.step('WHEN every image without alt is counted', async () => {
        // Act
        images = await galleryPage.audit.informativeImages();
      });

      await test.step('THEN no informative image lacks an alt', async () => {
        // Assert
        await expectOpenDefect(
          'DEF-TCH-005',
          'RN-HOME-012 (WCAG 1.1.1) requires a non-empty alt on gallery photos; most have alt=""',
          () => {
            expect(images.length).toBeGreaterThan(0);
            expect(imagesWithoutAlt(images)).toHaveLength(0);
          },
        );
      });
    },
  );

  test(
    '[TC-LEG-GAL-007] La galería tiene un único H1 @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-005: RN-HOME-020 is an SEO criterion not confirmed as a business rule (HC-09)',
      );
    },
  );

  test(
    '[TC-LEG-GAL-008] La galería es usable en móvil @P2',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-BROWSER',
        'the mobile view of the gallery was not observed; observe it (K12) before automating',
      );
    },
  );
});
