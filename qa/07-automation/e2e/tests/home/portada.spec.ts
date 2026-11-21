// INSPECTION: 2026-11-21 (Chromium headless 1366x900 and Pixel 5, trackers aborted)
// Hero: main links "Ver Capacitaciones" -> /capacitaciones2/ and "Bootcamp de Testing"
//   -> https://www.testingenchile.cl/bootcamp-de-testing/ (target=_blank).
// Counters: 4 x span.contador[data-target] starting at 0 (animated on scroll),
//   captions "Profesionales Capacitados", "Cursos Impartidos", ...
// Services: "Ver cursos", "Ver certificaciones" -> /capacitaciones2/; "Solicitar
//   cotización" -> /contacto-empresa/ (link names end with an icon glyph).
// Featured: 3 x "Ver Temario" (course pages), "Ir a todas las Capacitaciones" -> /capacitaciones2/.
// Sections: h2 "Lo que dice nuestra comunidad", h1 "Nuestros Partners" (2 logos alt=""),
//   h2 "Han confiado en nosotros" (18 logos with alt). 5 h1 in the page (REC-TCH-005).
// Meta: title "Testing en Chile", lang=es, canonical https://www.testingenchile.cl/,
//   robots index,follow, og:url/title/type/description/site_name/image present.
import { test, expect, expectOpenDefect, skipPending, PIXEL_5 } from '../../fixtures/pom/test-options';
import { HomeText } from '../../enums/messages';
import { Route } from '../../enums/routes';
import {
  COUNTER_COUNT,
  EXPECTED_HOME_META,
  FEATURED_COURSE_COUNT,
  SERVICE_CTAS,
} from '../../test-data/static/home/portada';
import { CONTACT_LINK } from '../../test-data/static/home/navigation';
import { imagesWithoutAlt, type ImageInfo, type PageMetadata } from '../../pages/components/document-audit.component';

const HTTP_OK = 200;

// Read-only checks of the home page content (module HOME, submodule POR).
test.describe('HOME - portada', () => {
  test(
    '[TC-HOME-POR-001] Los CTAs del hero llevan al catálogo y al Bootcamp @P0',
    { tag: '@smoke' },
    async ({ homePage }) => {
      let status = 0;

      await test.step('GIVEN the home page with both hero CTAs', async () => {
        // Arrange
        await homePage.goto();
        await expect(homePage.heroCatalogCta).toBeVisible();
        await expect(homePage.heroBootcampCta).toBeVisible();
      });

      await test.step('WHEN "Ver Capacitaciones" is clicked', async () => {
        // Act
        await expect(homePage.heroBootcampCta).toHaveAttribute('href', new RegExp(`${Route.Bootcamp}$`));
        await expect(homePage.heroBootcampCta).toHaveAttribute('target', CONTACT_LINK.blankTarget);
        status = await homePage.followLink(homePage.heroCatalogCta, Route.Capacitaciones);
      });

      await test.step('THEN the catalog opens with HTTP 200', async () => {
        // Assert
        expect(status).toBe(HTTP_OK);
        expect(homePage.pathname()).toBe(Route.Capacitaciones);
      });
    },
  );

  test(
    '[TC-HOME-POR-002] Los contadores muestran cifras mayores que cero tras hacer scroll @P1',
    { tag: '@sanity' },
    async ({ homePage }) => {
      await test.step('GIVEN the home page', async () => {
        // Arrange
        await homePage.goto();
      });

      await test.step('WHEN the counters section is scrolled into view', async () => {
        // Act
        await homePage.scrollToCounters(HomeText.CountersCaption);
      });

      await test.step('THEN the four counters reach a value greater than zero', async () => {
        // Assert
        await expect
          .poll(async () => (await homePage.counterValues()).filter((v) => v > 0).length)
          .toBe(COUNTER_COUNT);
        expect(await homePage.counterValues()).toHaveLength(COUNTER_COUNT);
      });
    },
  );

  test(
    '[TC-HOME-POR-003] Los CTAs de "Nuestros Servicios" apuntan al destino correcto @P1',
    { tag: '@sanity' },
    async ({ homePage, linkChecker }) => {
      const targets: Array<{ label: string; path: string; status: number }> = [];

      await test.step('GIVEN the services section of the home page', async () => {
        // Arrange
        await homePage.goto();
      });

      await test.step('WHEN each service CTA target is read and requested', async () => {
        // Act
        for (const cta of SERVICE_CTAS) {
          const [href] = await homePage.hrefsOf(homePage.serviceCta(cta.label));
          const result = await linkChecker.status(href);
          targets.push({ label: cta.label, path: new URL(href).pathname, status: result.status });
        }
      });

      await test.step('THEN each CTA points to its route and the route answers 200', async () => {
        // Assert
        expect(targets).toEqual(SERVICE_CTAS.map((c) => ({ label: c.label, path: c.path, status: HTTP_OK })));
      });
    },
  );

  test(
    '[TC-HOME-POR-004] Las capacitaciones destacadas enlazan a páginas de curso existentes @P1',
    { tag: '@sanity' },
    async ({ homePage, linkChecker }) => {
      let hrefs: string[] = [];
      let broken: Array<{ url: string; status: number }> = [];

      await test.step('GIVEN the featured courses of the home page', async () => {
        // Arrange
        await homePage.goto();
      });

      await test.step('WHEN every "Ver Temario" target is requested', async () => {
        // Act
        hrefs = await homePage.hrefsOf(homePage.featuredSyllabusLinks);
        const results = await linkChecker.statuses(hrefs);
        broken = results.filter((r) => r.status !== HTTP_OK).map((r) => ({ url: r.url, status: r.status }));
      });

      await test.step('THEN there are three cards, all targets answer 200 and the catalog link is right', async () => {
        // Assert
        expect(hrefs).toHaveLength(FEATURED_COURSE_COUNT);
        expect(broken).toEqual([]);
        await expect(homePage.allCoursesLink).toHaveAttribute('href', Route.Capacitaciones);
      });
    },
  );

  test(
    '[TC-HOME-POR-005] Las secciones de testimonios y partners están presentes @P2',
    { tag: '@regression' },
    async ({ homePage }) => {
      let trustedLogos: ImageInfo[] = [];

      await test.step('GIVEN the home page', async () => {
        // Arrange
        await homePage.goto();
      });

      await test.step('WHEN the social proof sections are scrolled into view', async () => {
        // Act
        await homePage.sectionHeading(HomeText.Testimonials).scrollIntoViewIfNeeded();
        await homePage.sectionHeading(HomeText.TrustedBy).scrollIntoViewIfNeeded();
        trustedLogos = await homePage.audit.imagesAfterHeading(HomeText.TrustedBy);
      });

      await test.step('THEN both headings are visible and the partners section has logos', async () => {
        // Assert
        await expect(homePage.sectionHeading(HomeText.Testimonials)).toBeVisible();
        await expect(homePage.sectionHeading(HomeText.TrustedBy)).toBeVisible();
        expect(trustedLogos.length).toBeGreaterThanOrEqual(1);
      });
    },
  );

  test(
    '[TC-HOME-POR-006] Los logos de partners tienen texto alternativo @P2',
    { tag: '@regression' },
    async ({ homePage }) => {
      let logos: ImageInfo[] = [];

      await test.step('GIVEN the partner sections of the home page', async () => {
        // Arrange
        await homePage.goto();
      });

      await test.step('WHEN the alt of every partner logo is read', async () => {
        // Act: images from "Nuestros Partners" down to the footer (both sections)
        logos = await homePage.audit.imagesAfterHeading(HomeText.Partners);
      });

      await test.step('THEN every logo declares a non-empty alt', async () => {
        // Assert
        await expectOpenDefect(
          'DEF-TCH-005',
          'RN-HOME-012 (WCAG 1.1.1) requires a non-empty alt on every partner logo; "Nuestros Partners" logos have alt=""',
          () => {
            expect(imagesWithoutAlt(logos)).toEqual([]);
          },
        );
      });
    },
  );

  test(
    '[TC-HOME-POR-007] La portada declara metadatos SEO completos @P1',
    { tag: '@sanity' },
    async ({ homePage }) => {
      await test.step('GIVEN the home page', async () => {
        // Arrange
        await homePage.goto();
      });

      const meta: PageMetadata = await test.step('WHEN its metadata is read', async () => {
        // Act
        return homePage.audit.metadata();
      });

      await test.step('THEN title, description, lang, canonical, robots and Open Graph are complete', async () => {
        // Assert
        expect(meta.title).toBeTruthy();
        expect(meta.description).toBeTruthy();
        expect(meta.lang).toBe(EXPECTED_HOME_META.lang);
        expect(meta.canonical).toBe(EXPECTED_HOME_META.canonical);
        expect(meta.robots.replace(/\s/g, '')).toBe(EXPECTED_HOME_META.robots);
        for (const property of EXPECTED_HOME_META.openGraph) {
          expect(meta.openGraph[property], property).toBeTruthy();
        }
      });
    },
  );

  test(
    '[TC-HOME-POR-008] La portada tiene un único H1 @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-005: RN-HOME-020 is an SEO criterion not confirmed as a business rule (today 5 h1, HC-09); reactivate when the owner confirms it',
      );
    },
  );

  test.describe('móvil (Pixel 5)', () => {
    test.use(PIXEL_5);

    test(
      '[TC-HOME-POR-009] Los CTAs del hero son visibles y operables en móvil @P2',
      { tag: '@regression' },
      async ({ homePage }) => {
        await test.step('GIVEN the home page on a Pixel 5', async () => {
          // Arrange
          await homePage.goto();
        });

        await test.step('WHEN the hero CTAs are brought into view', async () => {
          // Act: minimal scroll, only if needed
          await homePage.heroCatalogCta.scrollIntoViewIfNeeded();
        });

        await test.step('THEN both CTAs are visible, enabled and have a target', async () => {
          // Assert
          await expect(homePage.heroCatalogCta).toBeInViewport();
          await expect(homePage.heroBootcampCta).toBeVisible();
          await expect(homePage.heroBootcampCta).toBeEnabled();
          await expect(homePage.heroCatalogCta).toHaveAttribute('href', /\S+/);
          await expect(homePage.heroBootcampCta).toHaveAttribute('href', /\S+/);
        });
      },
    );
  });
});
