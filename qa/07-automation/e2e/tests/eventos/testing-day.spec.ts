// INSPECTION: 2026-11-21 (Chromium headless 1366x900, trackers aborted)
// /testing-day-chile/ -> 200; h1 "TESTING DAY CHILE 2026"; text "27 y 28 de Agosto",
//   "Hotel Plaza San Francisco Santiago, Chile & Online".
// CTAs: " Asegura tu entrada", "🎟️ Comprar Entrada", "Comprar Entrada " -> https://www.ecopass.cl/events/...
//   (target=_blank); "Convertirse en Sponsor" -> #sponsors-cta (h2 "Sé parte del evento: Impulsa tu Marca").
// Agenda: h2 "Conoce nuestra Agenda", blocks "08:30 - 09:00 Acreditación" + h4 titles.
// "Ver Agenda Completa e Inscribirse" -> https://www.testingenchile.cl/agenda-online/.
// Sponsors: h2 "Sponsors Oficiales", h3 Platinum/Oro/Plata/Bronce, logo links to sponsor sites;
//   "Conoce más de nuestros sponsors" -> /nuestros-sponsors-2026/. Communities and hotels: logo links.
// Brochure: mailto:eventos@...?subject=Solicitud de Brochure - Planes de Sponsor Testing Day 2026.
// /agenda-online/: h2 "Agenda Online - 27 de Agosto"; 7 sessions "HH:MM - HH:MM Taller|Charla",
//   h3 titles, "Inscribirse" -> streamyard.com/watch/... (3 of 4 unique answer 404, DEF-TCH-002).
import { test, expect, expectOpenDefect, skipPending, unreachable } from '../../fixtures/pom/test-options';
import { EventText } from '../../enums/messages';
import { Anchor, Route } from '../../enums/routes';
import {
  ANTI_BOT_STATUSES,
  BROCHURE_MAILBOX_PREFIX,
  EVENT_DATE_PATTERN,
  EVENT_VENUE_PATTERN,
  EXTERNAL_LINK_TIMEOUT_MS,
  SPONSOR_TIERS,
  SPONSORS_PATH_PATTERN,
  TICKET_HOST,
} from '../../test-data/static/eventos/eventos';
import { CONTACT_LINK, SITE_EMAIL_DOMAIN } from '../../test-data/static/home/navigation';
import type { LinkStatus } from '../../fixtures/pom/test-options';

const HTTP_OK = 200;

// Read-only checks of the Testing Day landing and its online agenda (module EVT,
// submodule TDY). Ticket and registration links are read, never clicked (S7).
test.describe('EVT - Testing Day Chile', () => {
  test(
    '[TC-EVT-TDY-001] La página del evento carga con edición, fechas, sede y CTAs @P0',
    { tag: '@smoke' },
    async ({ testingDayPage }) => {
      let status = 0;

      await test.step('GIVEN an anonymous visitor', async () => {
        // Arrange: clean context, trackers aborted
      });

      await test.step('WHEN the event landing is opened', async () => {
        // Act
        status = await testingDayPage.goto();
      });

      await test.step('THEN it answers 200 with heading, dates, venue and both CTAs', async () => {
        // Assert
        expect(status).toBe(HTTP_OK);
        await expect(testingDayPage.h1).toContainText(EventText.HeadingFragment);
        await expect(testingDayPage.visibleText(EVENT_DATE_PATTERN)).not.toHaveCount(0);
        await expect(testingDayPage.visibleText(EVENT_VENUE_PATTERN)).not.toHaveCount(0);
        await expect(testingDayPage.ticketCta).toBeVisible();
        await expect(testingDayPage.sponsorCta).toBeVisible();
      });
    },
  );

  test(
    '[TC-EVT-TDY-002] Los CTAs de entrada apuntan a ecopass en pestaña nueva @P1',
    { tag: '@sanity' },
    async ({ testingDayPage }) => {
      let links: Array<{ host: string; target: string }> = [];

      await test.step('GIVEN the event landing', async () => {
        // Arrange
        await testingDayPage.goto();
      });

      await test.step('WHEN the ticket CTAs are read without clicking them', async () => {
        // Act
        const hrefs = [
          ...(await testingDayPage.hrefsOf(testingDayPage.ticketCta)),
          ...(await testingDayPage.hrefsOf(testingDayPage.buyTicketLinks)),
        ];
        const targets = [
          ...(await testingDayPage.targetsOf(testingDayPage.ticketCta)),
          ...(await testingDayPage.targetsOf(testingDayPage.buyTicketLinks)),
        ];
        links = hrefs.map((h, i) => ({ host: new URL(h).hostname, target: targets[i] }));
      });

      await test.step('THEN every ticket CTA points to ecopass in a new tab', async () => {
        // Assert
        expect(links.length).toBeGreaterThanOrEqual(2);
        expect(links).toEqual(links.map(() => ({ host: TICKET_HOST, target: CONTACT_LINK.blankTarget })));
      });
    },
  );

  test(
    '[TC-EVT-TDY-003] "Convertirse en Sponsor" desplaza a la sección de sponsors @P2',
    { tag: '@regression' },
    async ({ testingDayPage }) => {
      await test.step('GIVEN the event landing', async () => {
        // Arrange
        await testingDayPage.goto();
      });

      await test.step('WHEN "Convertirse en Sponsor" is clicked', async () => {
        // Act
        await testingDayPage.sponsorCta.click();
      });

      await test.step('THEN the URL carries #sponsors-cta and the sponsor section is in view', async () => {
        // Assert
        await expect.poll(() => testingDayPage.fragment()).toBe(Anchor.SponsorsCta);
        await expect(testingDayPage.sponsorSectionHeading).toBeInViewport();
      });
    },
  );

  test(
    '[TC-EVT-TDY-004] La agenda presencial muestra bloques con horario y título @P1',
    { tag: '@sanity' },
    async ({ testingDayPage }) => {
      await test.step('GIVEN the event landing', async () => {
        // Arrange
        await testingDayPage.goto();
      });

      await test.step('WHEN the agenda section is located', async () => {
        // Act
        await testingDayPage.agendaHeading.scrollIntoViewIfNeeded();
      });

      await test.step('THEN there is at least one block with an HH:MM - HH:MM range and a title', async () => {
        // Assert
        await expect(testingDayPage.agendaHeading).toBeVisible();
        await expect(testingDayPage.agendaTimeRanges).not.toHaveCount(0);
        await expect(testingDayPage.agendaTitles).not.toHaveCount(0);
      });
    },
  );

  test(
    '[TC-EVT-TDY-005] "Ver Agenda Completa e Inscribirse" lleva a Agenda Online @P1',
    { tag: '@e2e' },
    async ({ testingDayPage, agendaOnlinePage }) => {
      let status = 0;

      await test.step('GIVEN the event landing', async () => {
        // Arrange
        await testingDayPage.goto();
      });

      await test.step('WHEN "Ver Agenda Completa e Inscribirse" is clicked', async () => {
        // Act
        status = await testingDayPage.followLink(testingDayPage.fullAgendaCta, Route.AgendaOnline);
      });

      await test.step('THEN the online agenda opens with HTTP 200 and its heading', async () => {
        // Assert
        expect(status).toBe(HTTP_OK);
        expect(agendaOnlinePage.pathname()).toBe(Route.AgendaOnline);
        await expect(agendaOnlinePage.agendaHeading).toBeVisible();
      });
    },
  );

  test(
    '[TC-EVT-TDY-006] La Agenda Online lista sesiones con inscripción @P1',
    { tag: '@sanity' },
    async ({ agendaOnlinePage }) => {
      await test.step('GIVEN the online agenda', async () => {
        // Arrange
        await agendaOnlinePage.goto();
      });

      await test.step('WHEN its sessions are located', async () => {
        // Act
        await expect(agendaOnlinePage.agendaHeading).toBeVisible();
      });

      await test.step('THEN sessions show time, type, title and an "Inscribirse" link', async () => {
        // Assert
        await expect(agendaOnlinePage.sessionTimes).not.toHaveCount(0);
        await expect(agendaOnlinePage.sessionTypes).not.toHaveCount(0);
        await expect(agendaOnlinePage.sessionTitles).not.toHaveCount(0);
        await expect(agendaOnlinePage.registerLinks).not.toHaveCount(0);
      });
    },
  );

  test(
    '[TC-EVT-TDY-007] Los enlaces "Inscribirse" de la Agenda Online responden @P2',
    { tag: '@regression' },
    async ({ agendaOnlinePage, linkChecker }) => {
      let results: LinkStatus[] = [];

      await test.step('GIVEN the online agenda', async () => {
        // Arrange
        await agendaOnlinePage.goto();
      });

      await test.step('WHEN every unique "Inscribirse" target is requested', async () => {
        // Act
        const hrefs = await agendaOnlinePage.hrefsOf(agendaOnlinePage.registerLinks);
        results = await linkChecker.statuses(hrefs, EXTERNAL_LINK_TIMEOUT_MS);
        expect(results.length).toBeGreaterThan(0);
      });

      await test.step('THEN every target answers 2xx or 3xx', async () => {
        // Assert
        await expectOpenDefect(
          'DEF-TCH-002',
          'RN-EVT-009 requires every registration link to resolve; StreamYard targets answer 404',
          () => {
            expect(unreachable(results)).toEqual([]);
          },
        );
      });
    },
  );

  test(
    '[TC-EVT-TDY-008] Los sponsors se muestran por nivel y enlazan a la página de sponsors @P2',
    { tag: '@e2e' },
    async ({ testingDayPage, editionsPage }) => {
      let status = 0;
      let sponsorsPath = '';

      await test.step('GIVEN the official sponsors section of the event landing', async () => {
        // Arrange
        await testingDayPage.goto();
        await testingDayPage.officialSponsorsHeading.scrollIntoViewIfNeeded();
        for (const tier of SPONSOR_TIERS) {
          await expect(testingDayPage.tierHeading(tier), tier).toBeVisible();
        }
      });

      await test.step('WHEN "Conoce más de nuestros sponsors" is clicked', async () => {
        // Act
        const [href] = await testingDayPage.hrefsOf(testingDayPage.moreSponsorsLink);
        sponsorsPath = new URL(href).pathname;
        status = await testingDayPage.followLink(testingDayPage.moreSponsorsLink, sponsorsPath);
      });

      await test.step('THEN the sponsors page answers 200 with at least one "Sitio web" card', async () => {
        // Assert
        expect(sponsorsPath).toMatch(SPONSORS_PATH_PATTERN);
        expect(status).toBe(HTTP_OK);
        await expect(editionsPage.sponsorWebsiteLinks).not.toHaveCount(0);
      });
    },
  );

  test(
    '[TC-EVT-TDY-009] Los logos de sponsors, comunidades y hoteles enlazan a dominios operativos @P2',
    { tag: '@regression' },
    async ({ testingDayPage, linkChecker }) => {
      test.slow();
      let results: LinkStatus[] = [];

      await test.step('GIVEN the external logo links of the event landing', async () => {
        // Arrange
        await testingDayPage.goto();
      });

      await test.step('WHEN each external domain is requested (20 s limit)', async () => {
        // Act
        const hrefs = await testingDayPage.externalLogoHrefs();
        expect(hrefs.length).toBeGreaterThan(0);
        results = await linkChecker.statuses(hrefs, EXTERNAL_LINK_TIMEOUT_MS);
      });

      await test.step('THEN every domain resolves and answers 2xx or 3xx, anti-bot answers aside', async () => {
        // Assert
        await expectOpenDefect(
          'DEF-TCH-003',
          'RN-EVT-015 requires external sponsor, community and hotel links to resolve; some domains do not answer',
          () => {
            expect(unreachable(results, ANTI_BOT_STATUSES)).toEqual([]);
          },
        );
      });
    },
  );

  test(
    '[TC-EVT-TDY-010] Tras el evento no se ofrecen CTAs de compra @P1',
    { tag: '@sanity' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-003: RN-EVT-010 is pending confirmation (open question 1) and today the purchase CTAs remain after the event (HC-04)',
      );
    },
  );

  test(
    '[TC-EVT-TDY-011] El brochure de sponsors se solicita por correo con asunto @P2',
    { tag: '@regression' },
    async ({ testingDayPage }) => {
      let mail = new URL(`${CONTACT_LINK.mailtoScheme}placeholder@example.com`);

      await test.step('GIVEN the event landing', async () => {
        // Arrange
        await testingDayPage.goto();
      });

      await test.step('WHEN the brochure link is read without clicking it', async () => {
        // Act
        const [href] = await testingDayPage.hrefsOf(testingDayPage.brochureLink);
        mail = new URL(href);
      });

      await test.step('THEN it is a mailto to the events mailbox with a subject', async () => {
        // Assert
        expect(mail.protocol).toBe(CONTACT_LINK.mailtoScheme);
        expect(mail.pathname).toBe(`${BROCHURE_MAILBOX_PREFIX}@${SITE_EMAIL_DOMAIN}`);
        expect(mail.searchParams.get('subject')).toMatch(/\S/);
      });
    },
  );

  test(
    '[TC-EVT-TDY-012] Las páginas del evento tienen título, description y H1 coherentes @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-005, REC-TCH-006, REC-TCH-007, REC-TCH-016: RN-EVT-012 is an editorial/SEO criterion not confirmed as a business rule (HC-09, HC-10, HC-11, HC-20)',
      );
    },
  );
});
