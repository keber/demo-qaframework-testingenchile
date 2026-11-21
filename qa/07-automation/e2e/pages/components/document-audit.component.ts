import type { Locator, Page } from '@playwright/test';
import { InfraError } from '../../fixtures/defects';

export interface PageMetadata {
  title: string;
  description: string;
  lang: string;
  canonical: string;
  robots: string;
  openGraph: Record<string, string>;
}

export interface ImageInfo {
  src: string;
  // null when the attribute is absent.
  alt: string | null;
}

export interface LinkInfo {
  text: string;
  href: string;
  target: string;
}

// Read-only audits of the rendered document (metadata, images, links, layout).
// Values are collected in the browser and asserted by the spec; the selectors
// inside evaluate() were observed on the live site (Step 0 inspection).
export class DocumentAuditComponent {
  constructor(private readonly page: Page) {}

  get h1Headings(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  /**
   * Reads title, description, lang, canonical, robots and og:* metadata.
   * @returns the page metadata (empty string when a tag is missing)
   */
  async metadata(): Promise<PageMetadata> {
    return this.page.evaluate(() => {
      const meta = (sel: string): string =>
        document.querySelector<HTMLMetaElement>(sel)?.content.trim() ?? '';
      const openGraph: Record<string, string> = {};
      document.querySelectorAll<HTMLMetaElement>('meta[property^="og:"]').forEach((m) => {
        openGraph[m.getAttribute('property') ?? ''] = m.content.trim();
      });
      return {
        title: document.title.trim(),
        description: meta('meta[name="description"]'),
        lang: document.documentElement.lang,
        canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? '',
        robots: meta('meta[name="robots"]'),
        openGraph,
      };
    });
  }

  /**
   * Number of h1 elements in the document (visible or not).
   * @returns the h1 count
   */
  async h1Count(): Promise<number> {
    return this.page.evaluate(() => document.querySelectorAll('h1').length);
  }

  /**
   * Informative images of the page: every img except tracking pixels (<= 1px)
   * and images explicitly hidden from assistive technology (aria-hidden, role=none).
   * An empty alt is NOT an exclusion: it is what WCAG 1.1.1 checks.
   * @param scope - 'document', 'main' (main element) or 'articles' (article elements)
   * @returns src and alt of each image
   */
  async informativeImages(scope: 'document' | 'main' | 'articles' = 'document'): Promise<ImageInfo[]> {
    return this.page.evaluate((s) => {
      const selector = { document: 'img', main: 'main img', articles: 'article img' }[s];
      return [...document.querySelectorAll<HTMLImageElement>(selector)]
        .filter((img) => {
          const hiddenFromAt =
            img.closest('[aria-hidden="true"]') !== null ||
            ['none', 'presentation'].includes(img.getAttribute('role') ?? '');
          const pixel = img.naturalWidth > 0 && img.naturalWidth <= 1 && img.naturalHeight <= 1;
          return !hiddenFromAt && !pixel;
        })
        .map((img) => ({ src: img.currentSrc || img.src, alt: img.getAttribute('alt') }));
    }, scope);
  }

  /**
   * Images that follow a heading in document order, up to the footer.
   * @param headingText - exact text of the heading that opens the section
   * @returns src and alt of each image
   * @throws InfraError (selector-drift) when the heading is absent
   */
  async imagesAfterHeading(headingText: string): Promise<ImageInfo[]> {
    const images = await this.page.evaluate((text) => {
      const heading = [...document.querySelectorAll('h1, h2, h3, h4')].find(
        (h) => (h.textContent ?? '').replace(/\s+/g, ' ').trim() === text,
      );
      if (!heading) return null;
      const footer = document.querySelector('footer');
      return [...document.querySelectorAll<HTMLImageElement>('img')]
        .filter((img) => heading.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_FOLLOWING)
        .filter((img) => !footer || !(footer.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_CONTAINED_BY))
        .map((img) => ({ src: img.currentSrc || img.src, alt: img.getAttribute('alt') }));
    }, headingText);
    if (images === null) {
      throw new InfraError('selector-drift', `heading "${headingText}" not found`);
    }
    return images;
  }

  /**
   * Links of the document whose resolved href starts with an origin.
   * @param origin - e.g. 'https://www.testingenchile.cl'
   * @param scope - 'document' or 'main'
   * @returns absolute href (without fragment), text and target of each link
   */
  async linksTo(origin: string, scope: 'document' | 'main' = 'document'): Promise<LinkInfo[]> {
    return this.page.evaluate(
      ([o, s]) =>
        [...document.querySelectorAll<HTMLAnchorElement>(s === 'main' ? 'main a[href]' : 'a[href]')]
          .filter((a) => a.href.startsWith(o))
          .map((a) => ({
            text: a.innerText.trim(),
            href: a.href.split('#')[0],
            target: a.target,
          })),
      [origin, scope] as const,
    );
  }

  /**
   * Horizontal layout size of the document.
   * @returns scrollWidth and clientWidth of the root element
   */
  async horizontalSize(): Promise<{ scrollWidth: number; clientWidth: number }> {
    return this.page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
  }

  /**
   * Whether an element with the given id is inside the viewport.
   * @param id - element id (anchor target)
   * @returns true when any part of the element is visible in the viewport
   */
  async isAnchorInViewport(id: string): Promise<boolean> {
    return this.page.evaluate((anchor) => {
      const el = document.getElementById(anchor);
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    }, id);
  }
}

/**
 * Sources of the images whose alt is missing or blank (WCAG 1.1.1 check).
 * @param images - images collected by DocumentAuditComponent
 * @returns the src of each image without a usable alt
 */
export function imagesWithoutAlt(images: readonly ImageInfo[]): string[] {
  return images.filter((i) => (i.alt ?? '').trim() === '').map((i) => i.src);
}
