// INSPECTION: 2026-11-21 (Chromium headless 1366x900, trackers aborted)
// /bootcamp-de-testing/ -> 200, title "Bootcamp"; h1 "¿QUIERES TRABAJAR EN TESTING ...".
// Hero links: "Quiero evaluar mi postulación" -> #btc-postula, "Ver la ruta de aprendizaje" -> #btc-ruta.
// Self-assessment: 4 radio groups "1. Cuando algo no resulta, ¿qué haces?" ... "4. Ante un
//   problema tecnológico..." (3 options each, score 0..2 in display order), button
//   "Ver mi orientación" (client-side; fires a Google Ads purchase conversion, HC-21:
//   trackers aborted by the network fixture). Result in #btc-result "Tu orientación: ...".
// FAQ: 5 details (role group) "¿Debo saber Testing antes de comenzar?" ...
// CTAs: "Hablar por WhatsApp" / dialog link "Iniciar chat en WhatsApp" -> wa.me ?text=;
//   "Consultar por correo" -> mailto:cursos@...?subject=Postulación Bootcamp de Testing.
import { test, expect, skipPending } from '../../fixtures/pom/test-options';
import { BootcampText } from '../../enums/messages';
import { Anchor } from '../../enums/routes';
import {
  BOOTCAMP_FAQ_COUNT,
  QUIZ_CASES,
  QUIZ_QUESTIONS,
} from '../../test-data/static/capacitaciones/capacitaciones';
import { CONTACT_LINK } from '../../test-data/static/home/navigation';

const HTTP_OK = 200;

// Read-only checks of the Bootcamp landing (module CAP, submodule BTC).
test.describe('CAP - Bootcamp de Testing', () => {
  test(
    '[TC-CAP-BTC-001] La landing del Bootcamp carga con hero y CTAs @P0',
    { tag: '@smoke' },
    async ({ bootcampPage }) => {
      let status = 0;

      await test.step('GIVEN an anonymous visitor', async () => {
        // Arrange: clean context, trackers aborted
      });

      await test.step('WHEN the Bootcamp landing is opened', async () => {
        // Act
        status = await bootcampPage.goto();
      });

      await test.step('THEN it answers 200 with the hero heading and both CTAs', async () => {
        // Assert
        expect(status).toBe(HTTP_OK);
        await expect(bootcampPage.heroHeading).toBeVisible();
        await expect(bootcampPage.evaluateCta).toBeVisible();
        await expect(bootcampPage.routeCta).toBeVisible();
      });
    },
  );

  test(
    '[TC-CAP-BTC-002] Las anclas del hero llevan a su sección @P2',
    { tag: '@regression' },
    async ({ bootcampPage }) => {
      const visited: Array<{ fragment: string; inViewport: boolean }> = [];

      await test.step('GIVEN the Bootcamp landing', async () => {
        // Arrange
        await bootcampPage.goto();
      });

      await test.step('WHEN each hero anchor is clicked in turn', async () => {
        // Act
        await bootcampPage.routeCta.click();
        await expect.poll(() => bootcampPage.audit.isAnchorInViewport(Anchor.BootcampRuta)).toBe(true);
        visited.push({ fragment: bootcampPage.fragment(), inViewport: true });
        await bootcampPage.heroHeading.scrollIntoViewIfNeeded();
        await bootcampPage.evaluateCta.click();
        await expect.poll(() => bootcampPage.audit.isAnchorInViewport(Anchor.BootcampPostula)).toBe(true);
        visited.push({ fragment: bootcampPage.fragment(), inViewport: true });
      });

      await test.step('THEN the URL carries each fragment and its section is in the viewport', async () => {
        // Assert
        expect(visited).toEqual([
          { fragment: Anchor.BootcampRuta, inViewport: true },
          { fragment: Anchor.BootcampPostula, inViewport: true },
        ]);
      });
    },
  );

  test(
    '[TC-CAP-BTC-003] El autodiagnóstico sin respuestas no muestra resultado @P1',
    { tag: '@sanity' },
    async ({ bootcampPage }) => {
      let urlBefore = '';

      await test.step('GIVEN the self-assessment with no option checked', async () => {
        // Arrange
        await bootcampPage.goto();
        await bootcampPage.submitQuizButton.scrollIntoViewIfNeeded();
        urlBefore = bootcampPage.pathname() + bootcampPage.fragment();
      });

      await test.step('WHEN "Ver mi orientación" is clicked', async () => {
        // Act
        await bootcampPage.submitQuiz();
      });

      await test.step('THEN no result is shown and the URL does not change', async () => {
        // Assert
        await expect(bootcampPage.result).toBeHidden();
        expect(bootcampPage.pathname() + bootcampPage.fragment()).toBe(urlBefore);
      });
    },
  );

  test(
    '[TC-CAP-BTC-004] El autodiagnóstico clasifica según el puntaje @P1',
    { tag: '@sanity' },
    async ({ bootcampPage, requestLog }) => {
      const outcomes: Array<{ total: number; result: string }> = [];
      let siteRequests = 0;

      await test.step('GIVEN the Bootcamp landing', async () => {
        // Arrange
        await bootcampPage.goto();
      });

      await test.step('WHEN every score combination of the test data is submitted', async () => {
        // Act: client-side only; trackers aborted (HC-21)
        const host = bootcampPage.siteHost();
        const before = requestLog.toHost(host).length;
        for (const quizCase of QUIZ_CASES) {
          await bootcampPage.answerQuiz(QUIZ_QUESTIONS, quizCase.scores);
          await bootcampPage.submitQuiz();
          await expect(bootcampPage.result).toContainText(quizCase.result);
          outcomes.push({ total: quizCase.total, result: (await bootcampPage.result.innerText()).trim() });
        }
        siteRequests = requestLog.toHost(host).length - before;
      });

      await test.step('THEN each score maps to its orientation, with the apply link and no request to the site', async () => {
        // Assert
        expect(outcomes).toEqual(
          QUIZ_CASES.map((c) => ({ total: c.total, result: `${BootcampText.ResultPrefix} ${c.result}` })),
        );
        await expect(bootcampPage.howToApplyLink).toBeVisible();
        expect(siteRequests).toBe(0);
      });
    },
  );

  test(
    '[TC-CAP-BTC-005] La fecha de próximo inicio no está vencida @P1',
    { tag: '@sanity' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-004: RN-CAP-016 is pending confirmation (open question 2) and today the start date is past (HC-05)',
      );
    },
  );

  test(
    '[TC-CAP-BTC-006] Las preguntas frecuentes se expanden al hacer clic @P2',
    { tag: '@regression' },
    async ({ bootcampPage }) => {
      let faqCount = 0;
      let state = { open: false, answerLength: 0 };

      await test.step('GIVEN the FAQ section of the Bootcamp landing', async () => {
        // Arrange
        await bootcampPage.goto();
        faqCount = await bootcampPage.faqCount();
      });

      await test.step('WHEN the first question is clicked', async () => {
        // Act
        await bootcampPage.openFaq(BootcampText.FaqQuestion);
        await expect.poll(async () => (await bootcampPage.faqState(BootcampText.FaqQuestion)).open).toBe(true);
        state = await bootcampPage.faqState(BootcampText.FaqQuestion);
      });

      await test.step('THEN there are five questions and the clicked one shows its answer', async () => {
        // Assert
        expect(faqCount).toBe(BOOTCAMP_FAQ_COUNT);
        expect(state.open).toBe(true);
        expect(state.answerLength).toBeGreaterThan(0);
      });
    },
  );

  test(
    '[TC-CAP-BTC-007] Los CTAs de WhatsApp y correo apuntan a destinos válidos @P2',
    { tag: '@regression' },
    async ({ bootcampPage }) => {
      let whatsapp: URL[] = [];
      let mail = '';

      await test.step('GIVEN the Bootcamp landing', async () => {
        // Arrange
        await bootcampPage.goto();
      });

      await test.step('WHEN the contact CTAs are read without clicking them', async () => {
        // Act
        const hrefs = [
          ...(await bootcampPage.hrefsOf(bootcampPage.whatsappCta)),
          ...(await bootcampPage.hrefsOf(bootcampPage.whatsappChatLink)),
        ];
        whatsapp = hrefs.map((h) => new URL(h));
        [mail] = await bootcampPage.hrefsOf(bootcampPage.emailCta);
      });

      await test.step('THEN WhatsApp links carry a text and the mail link the expected subject', async () => {
        // Assert
        expect(whatsapp).toHaveLength(2);
        for (const link of whatsapp) {
          expect(link.href.startsWith(CONTACT_LINK.whatsappPrefix)).toBe(true);
          expect(link.searchParams.get(CONTACT_LINK.whatsappTextParam)).toBeTruthy();
        }
        const mailUrl = new URL(mail);
        expect(mailUrl.protocol).toBe(CONTACT_LINK.mailtoScheme);
        expect(mailUrl.searchParams.get('subject')).toBe(BootcampText.EmailSubject);
      });
    },
  );

  test(
    '[TC-CAP-BTC-008] El autodiagnóstico no dispara conversiones de compra @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-CODE',
        'manual track (REC-TCH-017): running it unblocked fires a real Google Ads conversion (HC-21); single manual run for evidence with the owner approval',
      );
    },
  );
});
