// INSPECTION: 2026-11-21 (Chromium headless 1366x900, trackers aborted)
// /testing-day-chile-ediciones-anteriores/ -> 200; h1 "Testing Day Chile 2019" / "2018" /
//   "2017", h2 "CapTI presente en Córdoba Testing Day 2016"; "Ver lo más destacado ->"
//   -> http://claudia-badell.com/resumen-testing-en-chile-2019/; "Saber más de esta
//   edición ->" -> /testing-day-en-latam-2018/ (404, DEF-TCH-001); 4 img, all alt="".
// Menu third level "Ediciones anteriores" (DOM only): 2025, 2024, Mega Testing Week 2020,
//   2022, 2023, 2021 with their children pages.
// /testing-day-chile-2025/: iframe youtube-nocookie.com, "¡Conócelos aquí!" ->
//   /nuestros-sponsors-2025/; 13 img, all alt="" (DEF-TCH-005).
import { test, expect, expectOpenDefect, skipPending, unreachable } from '../../fixtures/pom/test-options';
import { EventText } from '../../enums/messages';
import { Route } from '../../enums/routes';
import {
  EDITION_HEADINGS,
  EXTERNAL_LINK_TIMEOUT_MS,
  VIDEO_EMBED_HOST,
} from '../../test-data/static/eventos/eventos';
import { CANONICAL_ORIGIN } from '../../test-data/static/home/navigation';
import { imagesWithoutAlt, type ImageInfo } from '../../pages/components/document-audit.component';
import type { LinkStatus } from '../../fixtures/pom/test-options';

const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;

// Read-only checks of the past editions pages (module EVT, submodule EDI).
test.describe('EVT - ediciones anteriores', () => {
  test(
    '[TC-EVT-EDI-001] La página de ediciones anteriores carga con sus bloques @P0',
    { tag: '@smoke' },
    async ({ editionsPage }) => {
      let status = 0;

      await test.step('GIVEN an anonymous visitor', async () => {
        // Arrange: clean context, trackers aborted
      });

      await test.step('WHEN the past editions page is opened', async () => {
        // Act
        status = await editionsPage.open(Route.EdicionesAnteriores);
      });

      await test.step('THEN it answers 200 with the 2019, 2018, 2017 and Córdoba 2016 blocks', async () => {
        // Assert
        expect(status).toBe(HTTP_OK);
        for (const heading of EDITION_HEADINGS) {
          await expect(editionsPage.editionHeading(heading), String(heading)).toBeVisible();
        }
      });
    },
  );

  test(
    '[TC-EVT-EDI-002] Todas las páginas del submenú "Ediciones anteriores" responden 200 @P1',
    { tag: '@sanity' },
    async ({ homePage, linkChecker }) => {
      let hrefs: string[] = [];
      let results: LinkStatus[] = [];

      await test.step('GIVEN the third menu level read from the DOM of the home page', async () => {
        // Arrange
        await homePage.goto();
        hrefs = await homePage.nav.thirdLevelHrefs(EventText.PreviousEditions);
      });

      await test.step('WHEN every edition page is requested', async () => {
        // Act
        results = await linkChecker.statuses(hrefs);
      });

      await test.step('THEN every edition page answers 200', async () => {
        // Assert
        expect(hrefs.length).toBeGreaterThan(0);
        expect(results.filter((r) => r.status !== HTTP_OK)).toEqual([]);
      });
    },
  );

  test(
    '[TC-EVT-EDI-003] Los enlaces internos de la página de ediciones no devuelven 404 @P1',
    { tag: '@sanity' },
    async ({ editionsPage, linkChecker }) => {
      let results: LinkStatus[] = [];

      await test.step('GIVEN the internal links of the past editions page', async () => {
        // Arrange
        await editionsPage.open(Route.EdicionesAnteriores);
      });

      await test.step('WHEN each internal link is requested', async () => {
        // Act
        const links = await editionsPage.audit.linksTo(CANONICAL_ORIGIN, 'main');
        results = await linkChecker.statuses(links.map((l) => l.href));
        expect(results.length).toBeGreaterThan(0);
      });

      await test.step('THEN none of them answers 404', async () => {
        // Assert
        await expectOpenDefect(
          'DEF-TCH-001',
          'RN-EVT-009 requires internal links to resolve; /testing-day-en-latam-2018/ answers 404',
          () => {
            expect(results.filter((r) => r.status === HTTP_NOT_FOUND)).toEqual([]);
          },
        );
      });
    },
  );

  test(
    '[TC-EVT-EDI-004] El título de cada página de edición contiene su año @P2',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-006: RN-EVT-016 is pending confirmation and today /entrevistas-sponsors-2021/ fails it (HC-10)',
      );
    },
  );

  test(
    '[TC-EVT-EDI-005] La edición 2025 enlaza a sus sponsors y muestra el video @P2',
    { tag: '@e2e' },
    async ({ editionsPage }) => {
      let iframes: string[] = [];
      let status = 0;

      await test.step('GIVEN the 2025 edition page', async () => {
        // Arrange
        await editionsPage.open(Route.TestingDay2025);
        iframes = await editionsPage.iframeSources();
      });

      await test.step('WHEN "¡Conócelos aquí!" is clicked', async () => {
        // Act
        status = await editionsPage.followLink(editionsPage.meetSponsorsLink, Route.Sponsors2025);
      });

      await test.step('THEN a youtube-nocookie iframe was present and the sponsors page answers 200', async () => {
        // Assert
        expect(iframes.filter((src) => src.includes(VIDEO_EMBED_HOST))).not.toHaveLength(0);
        expect(status).toBe(HTTP_OK);
        expect(editionsPage.pathname()).toBe(Route.Sponsors2025);
      });
    },
  );

  test(
    '[TC-EVT-EDI-006] Los enlaces externos de resumen de ediciones responden @P3',
    { tag: '@regression' },
    async ({ editionsPage, linkChecker }) => {
      let results: LinkStatus[] = [];

      await test.step('GIVEN the past editions page', async () => {
        // Arrange
        await editionsPage.open(Route.EdicionesAnteriores);
      });

      await test.step('WHEN the "Ver lo más destacado" target is requested', async () => {
        // Act
        const hrefs = await editionsPage.hrefsOf(editionsPage.highlightsLink);
        results = await linkChecker.statuses(hrefs, EXTERNAL_LINK_TIMEOUT_MS);
      });

      await test.step('THEN it answers 2xx or 3xx', async () => {
        // Assert
        expect(results.length).toBeGreaterThan(0);
        expect(unreachable(results)).toEqual([]);
      });
    },
  );

  test(
    '[TC-EVT-EDI-007] "Ver detalles de la edición más reciente" apunta a la última edición @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-018: RN-EVT-018 is pending confirmation and today the link points to 2022 (HC-22)',
      );
    },
  );

  test(
    '[TC-EVT-EDI-008] Las páginas de edición tienen un único H1 con texto @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-005: RN-HOME-020 is an SEO criterion not confirmed as a business rule; several edition pages fail it (HC-09)',
      );
    },
  );

  test(
    '[TC-EVT-EDI-009] Las imágenes de las páginas de edición tienen texto alternativo @P3',
    { tag: '@regression' },
    async ({ editionsPage }) => {
      const images: Array<{ path: string; images: ImageInfo[] }> = [];

      await test.step('GIVEN the 2025 edition page and the past editions page', async () => {
        // Arrange: both pages are read in the next step
      });

      await test.step('WHEN the alt of every informative image is read on each page', async () => {
        // Act
        for (const path of [Route.TestingDay2025, Route.EdicionesAnteriores]) {
          await editionsPage.open(path);
          images.push({ path, images: await editionsPage.audit.informativeImages() });
        }
      });

      await test.step('THEN no informative image has an empty or missing alt', async () => {
        // Assert
        await expectOpenDefect(
          'DEF-TCH-005',
          'RN-HOME-012 (WCAG 1.1.1) requires a non-empty alt on informative images; edition pages have none',
          () => {
            for (const page of images) {
              expect(page.images.length, page.path).toBeGreaterThan(0);
              expect(imagesWithoutAlt(page.images), page.path).toEqual([]);
            }
          },
        );
      });
    },
  );
});
