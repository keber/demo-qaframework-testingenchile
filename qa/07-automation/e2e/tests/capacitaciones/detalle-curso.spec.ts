// INSPECTION: 2026-11-21 (Chromium headless 1366x900, trackers aborted)
// Course template: several h1; Webnode form rendered after load with fieldset:
//   "Nombre y Apellido" (text, required), "E-mail" (email, required, placeholder "@"),
//   "Celular" (tel, optional, pattern [\.\+\-\(\)0-9 ]+), "Mensaje" (textarea, required),
//   checkbox "Acepto el uso de mis datos personales con fines comerciales *" (required),
//   g-recaptcha-response textarea, button "¡Enviar mensaje!" (never clicked, S7).
// /aiugenaia/: extra combobox "Asunto | Elige una opción" (required) with options
//   "Inscripción formación Gen AiA-TE", "Más Información Gen AiA-TE", "Otra pregunta";
//   "Pagar Curso + Examen" -> https://www.flow.cl/btn.php?token=... target=_blank.
// /new-curso-istqb/: "CURSO + EXAMEN" -> https://www.flow.cl/btn.php?... target=_blank.
import { test, expect, skipPending } from '../../fixtures/pom/test-options';
import { Route } from '../../enums/routes';
import { buildContactForm } from '../../test-data/factories/contact.factory';
import {
  AIU_SUBJECT_LABEL,
  AIU_SUBJECT_OPTIONS,
  CONSULTATION_FORM,
  FORM_COURSE_PATH,
  INVALID_INPUT,
  PAYMENT_HOST,
  PAYMENT_ORIGIN,
  PAYMENT_PAGES,
} from '../../test-data/static/capacitaciones/capacitaciones';
import { CONTACT_LINK } from '../../test-data/static/home/navigation';
import type { LinkInfo } from '../../pages/components/document-audit.component';

const HTTP_OK = 200;
const COURSE_PAGES_TIMEOUT_MS = 240_000;

// Read-only checks of the course detail pages (module CAP, submodule CUR). The
// consultation form is filled with synthetic data but NEVER submitted (S7).
test.describe('CAP - detalle de curso', () => {
  test(
    '[TC-CAP-CUR-001] Las páginas de curso del catálogo cargan con título y H1 @P0',
    { tag: '@smoke' },
    async ({ catalogPage, coursePage }) => {
      test.setTimeout(COURSE_PAGES_TIMEOUT_MS);
      let paths: string[] = [];
      const pages: Array<{ path: string; status: number; hasTitle: boolean; visibleH1: boolean }> = [];

      await test.step('GIVEN the course destinations listed in the catalog', async () => {
        // Arrange
        await catalogPage.goto();
        const hrefs = await catalogPage.hrefsOf(catalogPage.saberMasLinks);
        paths = [...new Set(hrefs.map((h) => new URL(h).pathname))];
        expect(paths.length).toBeGreaterThan(0);
      });

      await test.step('WHEN each course page is opened', async () => {
        // Act
        for (const path of paths) {
          const status = await coursePage.goto(path);
          const meta = await coursePage.audit.metadata();
          const visibleH1 = (await coursePage.h1.filter({ visible: true }).count()) > 0;
          pages.push({ path, status, hasTitle: meta.title.length > 0, visibleH1 });
        }
      });

      await test.step('THEN every page answers 200 with a title and a visible h1', async () => {
        // Assert
        expect(pages).toEqual(paths.map((path) => ({ path, status: HTTP_OK, hasTitle: true, visibleH1: true })));
      });
    },
  );

  test(
    '[TC-CAP-CUR-002] El formulario de consulta muestra sus campos y obligatoriedad @P1',
    { tag: '@sanity' },
    async ({ coursePage }) => {
      const form = coursePage.form;

      await test.step('GIVEN the Selenium Java course page', async () => {
        // Arrange
        await coursePage.goto(FORM_COURSE_PATH);
      });

      await test.step('WHEN the form controls are located by label', async () => {
        // Act
        await form.waitForField(CONSULTATION_FORM.name);
      });

      await test.step('THEN the five controls exist and all but "Celular" are required', async () => {
        // Assert
        for (const label of [CONSULTATION_FORM.name, CONSULTATION_FORM.email, CONSULTATION_FORM.message]) {
          await expect(form.field(label), label).toHaveAttribute('required');
        }
        await expect(form.field(CONSULTATION_FORM.consent)).toHaveAttribute('required');
        await expect(form.field(CONSULTATION_FORM.phone)).toBeVisible();
        await expect(form.field(CONSULTATION_FORM.phone)).not.toHaveAttribute('required');
      });
    },
  );

  test(
    '[TC-CAP-CUR-003] El formulario vacío es inválido sin enviarlo @P1',
    { tag: '@sanity' },
    async ({ coursePage }) => {
      const form = coursePage.form;
      let formValid = true;
      const messages: string[] = [];

      await test.step('GIVEN the empty consultation form', async () => {
        // Arrange
        await coursePage.goto(FORM_COURSE_PATH);
        await form.waitForField(CONSULTATION_FORM.name);
      });

      await test.step('WHEN checkValidity() and the validation messages are read', async () => {
        // Act: no click on "¡Enviar mensaje!" (S7)
        formValid = await form.formIsValid(form.field(CONSULTATION_FORM.name));
        for (const label of [CONSULTATION_FORM.name, CONSULTATION_FORM.message, CONSULTATION_FORM.consent]) {
          messages.push(await form.validationMessage(form.field(label)));
        }
      });

      await test.step('THEN the form is invalid and each required control has a message', async () => {
        // Assert: the native text depends on the browser language, only presence is checked
        expect(formValid).toBe(false);
        expect(messages.filter((m) => m.trim() === '')).toEqual([]);
      });
    },
  );

  test(
    '[TC-CAP-CUR-004] El formulario completo con datos sintéticos es válido en el cliente @P1',
    { tag: '@sanity' },
    async ({ coursePage, requestLog }) => {
      const form = coursePage.form;
      const data = buildContactForm();
      const validity: Record<string, boolean> = {};

      await test.step('GIVEN the consultation form', async () => {
        // Arrange
        await coursePage.goto(FORM_COURSE_PATH);
        await form.waitForField(CONSULTATION_FORM.name);
      });

      await test.step('WHEN it is filled with synthetic data (not submitted)', async () => {
        // Act
        await form.field(CONSULTATION_FORM.name).fill(data.name);
        await form.field(CONSULTATION_FORM.email).fill(data.email);
        await form.field(CONSULTATION_FORM.phone).fill(data.phone);
        await form.field(CONSULTATION_FORM.message).fill(data.message);
        await form.field(CONSULTATION_FORM.consent).check();
        for (const [key, label] of Object.entries(CONSULTATION_FORM)) {
          validity[key] = await form.isValid(form.field(label));
        }
      });

      await test.step('THEN every visible control is valid and nothing was posted to the site', async () => {
        // Assert
        expect(validity).toEqual({ name: true, email: true, phone: true, message: true, consent: true });
        expect(requestLog.toHost(coursePage.siteHost(), 'POST')).toEqual([]);
      });
    },
  );

  test(
    '[TC-CAP-CUR-005] Un e-mail sin "@" es rechazado por la validación @P1',
    { tag: '@sanity' },
    async ({ coursePage }) => {
      const form = coursePage.form;
      const email = form.field(CONSULTATION_FORM.email);
      let invalidAccepted = true;
      let validAccepted = false;

      await test.step('GIVEN the consultation form', async () => {
        // Arrange
        await coursePage.goto(FORM_COURSE_PATH);
        await form.waitForField(CONSULTATION_FORM.email);
      });

      await test.step('WHEN an address without "@" and then a synthetic valid one are typed', async () => {
        // Act
        await email.fill(INVALID_INPUT.email);
        invalidAccepted = await form.isValid(email);
        await email.fill(buildContactForm().email);
        validAccepted = await form.isValid(email);
      });

      await test.step('THEN the first is invalid and the second valid', async () => {
        // Assert
        expect(invalidAccepted).toBe(false);
        expect(validAccepted).toBe(true);
      });
    },
  );

  test(
    '[TC-CAP-CUR-006] El celular rechaza letras @P2',
    { tag: '@regression' },
    async ({ coursePage }) => {
      const form = coursePage.form;
      let state = { valid: true, patternMismatch: false, typeMismatch: false };

      await test.step('GIVEN the consultation form', async () => {
        // Arrange
        await coursePage.goto(FORM_COURSE_PATH);
        await form.waitForField(CONSULTATION_FORM.phone);
      });

      await test.step('WHEN letters are typed in "Celular"', async () => {
        // Act
        await form.field(CONSULTATION_FORM.phone).fill(INVALID_INPUT.phone);
        state = await form.validity(form.field(CONSULTATION_FORM.phone));
      });

      await test.step('THEN the field is invalid by pattern', async () => {
        // Assert
        expect(state.valid).toBe(false);
        expect(state.patternMismatch).toBe(true);
      });
    },
  );

  test(
    '[TC-CAP-CUR-007] En AiU el asunto es obligatorio y ofrece tres opciones @P1',
    { tag: '@sanity' },
    async ({ coursePage }) => {
      const subject = coursePage.form.field(AIU_SUBJECT_LABEL);

      await test.step('GIVEN the AiU course page', async () => {
        // Arrange
        await coursePage.goto(Route.CursoAiu);
      });

      await test.step('WHEN the "Asunto" select is located', async () => {
        // Act
        await expect(subject).toBeVisible();
      });

      await test.step('THEN it is required and offers the three options', async () => {
        // Assert
        await expect(subject).toHaveAttribute('required');
        await expect(subject.getByRole('option')).toHaveText([...AIU_SUBJECT_OPTIONS]);
      });
    },
  );

  test(
    '[TC-CAP-CUR-008] El botón de pago apunta a la pasarela externa en pestaña nueva @P1',
    { tag: '@sanity' },
    async ({ coursePage }) => {
      const buttons: Array<{ page: string; links: LinkInfo[] }> = [];

      await test.step('GIVEN the ISTQB and AiU course pages', async () => {
        // Arrange: NEVER click the payment button (real transaction)
      });

      await test.step('WHEN the payment links of each page are read', async () => {
        // Act
        for (const path of PAYMENT_PAGES) {
          await coursePage.goto(path);
          buttons.push({ page: path, links: await coursePage.audit.linksTo(PAYMENT_ORIGIN) });
        }
      });

      await test.step('THEN each page has a payment link to www.flow.cl opening a new tab', async () => {
        // Assert
        for (const button of buttons) {
          expect(button.links.length, `payment links on ${button.page}`).toBeGreaterThan(0);
          for (const link of button.links) {
            expect(new URL(link.href).hostname).toBe(PAYMENT_HOST);
            expect(link.target, `${link.text} on ${button.page}`).toBe(CONTACT_LINK.blankTarget);
          }
        }
      });
    },
  );

  test(
    '[TC-CAP-CUR-009] El consentimiento enlaza a la política de privacidad @P2',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-012: RN-CAP-015 is pending confirmation and today the consent has no privacy link (HC-16)',
      );
    },
  );

  test(
    '[TC-CAP-CUR-010] El envío real del formulario de consulta muestra confirmación @P3',
    { tag: '@destructive' },
    async () => {
      skipPending(
        'PENDING-CODE',
        '@destructive: a real submission is forbidden on production (S7, W9) and protected by reCAPTCHA; needs a test environment that does not exist',
      );
    },
  );
});
