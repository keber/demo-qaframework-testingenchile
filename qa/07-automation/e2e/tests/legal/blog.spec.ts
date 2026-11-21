// INSPECTION: 2026-11-21 (Chromium headless 1366x900, trackers aborted)
// /blog/ -> 200, title "Blog - CapTI de Testing en Chile", no h1 (REC-TCH-005).
// 10 x article: image link (img alt="", DEF-TCH-005) + h2 > link "/l/{slug}/", date
//   "dd.mm.yyyy" as text, excerpt paragraph. Pagination: "Artículos antiguos" ->
//   /blog/p-e0nza2ma/1/ ("Artículos recientes" -> '#' on page 1, -> /blog/ on page 2).
// Article: h1 = listing title, same date text; title "{title} :: Testing en Chile".
import { test, expect, expectOpenDefect, skipPending } from '../../fixtures/pom/test-options';
import { PageTitle } from '../../enums/messages';
import { Route } from '../../enums/routes';
import { BLOG_DATE_PATTERN, BLOG_PAGINATED_PATH } from '../../test-data/static/legal/legal';
import { MAIN_MENU_ITEMS } from '../../test-data/static/home/navigation';
import { imagesWithoutAlt, type ImageInfo } from '../../pages/components/document-audit.component';
import type { ArticleSummary } from '../../pages/legal/blog.page';
import type { LinkStatus } from '../../fixtures/pom/test-options';

const HTTP_OK = 200;
const BLOG_MENU = MAIN_MENU_ITEMS[3];

// Read-only checks of the blog (module LEG, submodule BLG).
test.describe('LEG - blog', () => {
  test(
    '[TC-LEG-BLG-001] El blog carga con al menos un artículo @P0',
    { tag: '@smoke' },
    async ({ homePage, blogPage }) => {
      let status = 0;

      await test.step('GIVEN the home page', async () => {
        // Arrange
        await homePage.goto();
      });

      await test.step('WHEN "Blog" is clicked in the main menu', async () => {
        // Act
        status = await homePage.followLink(homePage.nav.menuItem(BLOG_MENU.label), Route.Blog);
      });

      await test.step('THEN the blog answers 200 with at least one article', async () => {
        // Assert
        expect(status).toBe(HTTP_OK);
        expect(blogPage.pathname()).toBe(Route.Blog);
        await expect(blogPage.articles).not.toHaveCount(0);
      });
    },
  );

  test(
    '[TC-LEG-BLG-002] Cada artículo del listado muestra título enlazado, fecha y extracto @P1',
    { tag: '@sanity' },
    async ({ blogPage }) => {
      let summaries: ArticleSummary[] = [];

      await test.step('GIVEN the blog listing', async () => {
        // Arrange
        await blogPage.goto();
      });

      await test.step('WHEN every article card is read', async () => {
        // Act
        summaries = await blogPage.summaries();
      });

      await test.step('THEN each card has a /l/ title link, a dd.mm.yyyy date and an excerpt', async () => {
        // Assert
        expect(summaries.length).toBeGreaterThan(0);
        for (const s of summaries) {
          expect(s.href, s.title).toMatch(new RegExp(`^${Route.BlogArticlePrefix}`));
          expect(s.title).not.toBe('');
          expect(s.date, s.title).toMatch(BLOG_DATE_PATTERN);
          expect(s.excerpt, s.title).not.toBe('');
        }
      });
    },
  );

  test(
    '[TC-LEG-BLG-003] Los artículos están en orden cronológico descendente @P1',
    { tag: '@sanity' },
    async ({ blogPage }) => {
      let keys: number[] = [];

      await test.step('GIVEN the dates of the first listing page', async () => {
        // Arrange
        await blogPage.goto();
        keys = await blogPage.dateKeys();
      });

      await test.step('WHEN the next page ("Artículos antiguos") is opened and read', async () => {
        // Act
        const [href] = await blogPage.hrefsOf(blogPage.olderArticlesLink);
        await blogPage.followLink(blogPage.olderArticlesLink, new URL(href).pathname);
        keys = [...keys, ...(await blogPage.dateKeys())];
      });

      await test.step('THEN the whole date sequence is non-increasing', async () => {
        // Assert
        expect(keys.every((k) => !Number.isNaN(k))).toBe(true);
        expect(keys).toEqual([...keys].sort((a, b) => b - a));
      });
    },
  );

  test(
    '[TC-LEG-BLG-004] La paginación avanza y retrocede @P1',
    { tag: '@e2e' },
    async ({ blogPage }) => {
      let lastOfFirstPage = 0;
      let firstOfSecondPage = Number.NaN;
      let olderPath = '';
      let backStatus = 0;

      await test.step('GIVEN the first listing page', async () => {
        // Arrange
        await blogPage.goto();
        lastOfFirstPage = Math.min(...(await blogPage.dateKeys()));
      });

      await test.step('WHEN "Artículos antiguos" and then "Artículos recientes" are clicked', async () => {
        // Act
        const [href] = await blogPage.hrefsOf(blogPage.olderArticlesLink);
        olderPath = new URL(href).pathname;
        await blogPage.followLink(blogPage.olderArticlesLink, olderPath);
        firstOfSecondPage = Math.max(...(await blogPage.dateKeys()));
        backStatus = await blogPage.followLink(blogPage.newerArticlesLink, Route.Blog);
      });

      await test.step('THEN the second page holds older articles and the way back reaches /blog/', async () => {
        // Assert
        expect(olderPath).toMatch(BLOG_PAGINATED_PATH);
        expect(firstOfSecondPage).toBeLessThanOrEqual(lastOfFirstPage);
        expect(backStatus).toBe(HTTP_OK);
        expect(blogPage.pathname()).toBe(Route.Blog);
      });
    },
  );

  test(
    '[TC-LEG-BLG-005] Los artículos de la primera página responden 200 @P1',
    { tag: '@sanity' },
    async ({ blogPage, linkChecker }) => {
      let results: LinkStatus[] = [];

      await test.step('GIVEN the article links of the first listing page', async () => {
        // Arrange
        await blogPage.goto();
      });

      await test.step('WHEN every article is requested', async () => {
        // Act
        const summaries = await blogPage.summaries();
        results = await linkChecker.statuses(summaries.map((s) => s.href));
      });

      await test.step('THEN every article answers 200', async () => {
        // Assert
        expect(results.length).toBeGreaterThan(0);
        expect(results.filter((r) => r.status !== HTTP_OK)).toEqual([]);
      });
    },
  );

  test(
    '[TC-LEG-BLG-006] El artículo muestra H1 igual al título del listado y su fecha @P2',
    { tag: '@e2e' },
    async ({ blogPage }) => {
      let first: ArticleSummary = { title: '', href: '', date: '', excerpt: '' };
      let status = 0;

      await test.step('GIVEN the title and date of the first article in the listing', async () => {
        // Arrange
        await blogPage.goto();
        [first] = await blogPage.summaries();
      });

      await test.step('WHEN its title is clicked', async () => {
        // Act
        status = await blogPage.followLink(blogPage.articleTitleLink(first.title), first.href);
      });

      await test.step('THEN the article h1 equals the listing title and shows the same date', async () => {
        // Assert
        expect(status).toBe(HTTP_OK);
        await expect(blogPage.h1).toHaveText(first.title);
        await expect(blogPage.text(first.date)).toBeVisible();
      });
    },
  );

  test(
    '[TC-LEG-BLG-007] El título de los artículos sigue el patrón del sitio @P2',
    { tag: '@regression' },
    async ({ blogPage, linkChecker }) => {
      const titles: Array<{ href: string; title: string }> = [];

      await test.step('GIVEN the article links of the first listing page', async () => {
        // Arrange
        await blogPage.goto();
      });

      await test.step('WHEN the document title of every article is read', async () => {
        // Act: GET without a browser, one request at a time
        for (const summary of await blogPage.summaries()) {
          titles.push({ href: summary.href, title: await linkChecker.documentTitle(summary.href) });
        }
      });

      await test.step('THEN each title ends with " :: Testing en Chile"', async () => {
        // Assert
        expect(titles.length).toBeGreaterThan(0);
        expect(titles.filter((t) => !t.title.endsWith(PageTitle.SiteSuffix))).toEqual([]);
      });
    },
  );

  test(
    '[TC-LEG-BLG-008] El listado del blog tiene H1 y description @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-005, REC-TCH-007: RN-LEG-012 is an SEO criterion not confirmed as a business rule (HC-09, HC-11)',
      );
    },
  );

  test(
    '[TC-LEG-BLG-009] Las imágenes del listado tienen texto alternativo @P3',
    { tag: '@regression' },
    async ({ blogPage }) => {
      let images: ImageInfo[] = [];

      await test.step('GIVEN the blog listing', async () => {
        // Arrange
        await blogPage.goto();
      });

      await test.step('WHEN the alt of every article image is read', async () => {
        // Act
        await expect(blogPage.articles).not.toHaveCount(0);
        images = await blogPage.audit.informativeImages('articles');
      });

      await test.step('THEN every article image has a non-empty alt', async () => {
        // Assert
        await expectOpenDefect(
          'DEF-TCH-005',
          'RN-HOME-012 (WCAG 1.1.1) requires a non-empty alt on article images; all of them have alt=""',
          () => {
            expect(images.length).toBeGreaterThan(0);
            expect(imagesWithoutAlt(images)).toEqual([]);
          },
        );
      });
    },
  );
});
