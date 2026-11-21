// INSPECTION: 2026-11-21 (Chromium headless 1366x900, trackers aborted)
// /contacto-empresa/ -> 200, title "Contacto empresa :: Testing en Chile"; form rendered
//   after load (document.querySelector('form') is null right after load event).
// h1 "Potencia a tu Equipo de QA"; fieldset: textbox "Nombre" (required), "Email"
//   (type=email, required, placeholder "@"), "Empresa" (required), radios "Si" / "No" /
//   "Aún no sabemos" (one group, each required), spinbutton "Número de personas"
//   (type=number, required), textbox "Indícanos que capacitación estas interesado"
//   (textarea, required), g-recaptcha-response, button "Enviar" (never clicked, S7).
import { test, expect, skipPending } from '../../fixtures/pom/test-options';
import { buildCompanyContact } from '../../test-data/factories/company-contact.factory';
import {
  COMPANY_FORM,
  COMPANY_INVALID_INPUT,
  SENCE_RADIOS,
} from '../../test-data/static/contacto/contacto';

const HTTP_OK = 200;

// Read-only checks of the company form (module CON, submodule EMP). Synthetic
// data only; the form is NEVER submitted (rule S7, reCAPTCHA protected).
test.describe('CON - formulario de contacto empresa', () => {
  test(
    '[TC-CON-EMP-001] El formulario empresa carga con su H1 @P0',
    { tag: '@smoke' },
    async ({ companyContactPage }) => {
      let status = 0;

      await test.step('GIVEN an anonymous visitor', async () => {
        // Arrange: clean context, trackers aborted
      });

      await test.step('WHEN the company form page is opened and the form renders', async () => {
        // Act
        status = await companyContactPage.goto(COMPANY_FORM.name);
      });

      await test.step('THEN it answers 200 with its heading and the "Enviar" button', async () => {
        // Assert
        expect(status).toBe(HTTP_OK);
        await expect(companyContactPage.heading).toBeVisible();
        await expect(companyContactPage.sendButton).toBeVisible();
      });
    },
  );

  test(
    '[TC-CON-EMP-002] El formulario muestra sus seis campos obligatorios @P1',
    { tag: '@sanity' },
    async ({ companyContactPage }) => {
      const form = companyContactPage.form;

      await test.step('GIVEN the rendered company form', async () => {
        // Arrange
        await companyContactPage.goto(COMPANY_FORM.name);
      });

      await test.step('WHEN its controls are located by label', async () => {
        // Act
        await expect(form.field(COMPANY_FORM.interest)).toBeVisible();
      });

      await test.step('THEN the six fields are required and "Código Sence" has three options', async () => {
        // Assert
        for (const label of Object.values(COMPANY_FORM)) {
          await expect(form.field(label), label).toHaveAttribute('required');
        }
        for (const option of SENCE_RADIOS) {
          await expect(form.radio(option), option).toHaveAttribute('required');
        }
        await expect(companyContactPage.senceRadios).toHaveCount(SENCE_RADIOS.length);
      });
    },
  );

  test(
    '[TC-CON-EMP-003] El formulario vacío es inválido sin enviarlo @P1',
    { tag: '@sanity' },
    async ({ companyContactPage }) => {
      const form = companyContactPage.form;
      let formValid = true;
      const messages: string[] = [];

      await test.step('GIVEN the empty company form', async () => {
        // Arrange
        await companyContactPage.goto(COMPANY_FORM.name);
      });

      await test.step('WHEN checkValidity() and the validation messages are read', async () => {
        // Act: no click on "Enviar" (S7)
        formValid = await form.formIsValid(form.field(COMPANY_FORM.name));
        for (const label of [COMPANY_FORM.name, COMPANY_FORM.company, COMPANY_FORM.people, COMPANY_FORM.interest]) {
          messages.push(await form.validationMessage(form.field(label)));
        }
        messages.push(await form.validationMessage(form.radio(SENCE_RADIOS[0])));
      });

      await test.step('THEN the form is invalid and each required control has a message', async () => {
        // Assert: the native text depends on the browser language, only presence is checked
        expect(formValid).toBe(false);
        expect(messages.filter((m) => m.trim() === '')).toEqual([]);
      });
    },
  );

  test(
    '[TC-CON-EMP-004] Un email sin "@" es inválido @P1',
    { tag: '@sanity' },
    async ({ companyContactPage }) => {
      const form = companyContactPage.form;
      let valid = true;

      await test.step('GIVEN the rendered company form', async () => {
        // Arrange
        await companyContactPage.goto(COMPANY_FORM.name);
      });

      await test.step('WHEN an address without "@" is typed in "Email"', async () => {
        // Act
        await form.field(COMPANY_FORM.email).fill(COMPANY_INVALID_INPUT.email);
        valid = await form.isValid(form.field(COMPANY_FORM.email));
      });

      await test.step('THEN the field is invalid', async () => {
        // Assert
        expect(valid).toBe(false);
      });
    },
  );

  test(
    '[TC-CON-EMP-005] "Número de personas" no admite letras @P2',
    { tag: '@regression' },
    async ({ companyContactPage }) => {
      const form = companyContactPage.form;
      let value = COMPANY_INVALID_INPUT.people as string;

      await test.step('GIVEN the rendered company form', async () => {
        // Arrange
        await companyContactPage.goto(COMPANY_FORM.name);
      });

      await test.step('WHEN letters are typed in "Número de personas"', async () => {
        // Act
        await companyContactPage.typeInto(form.field(COMPANY_FORM.people), COMPANY_INVALID_INPUT.people);
        value = await form.value(form.field(COMPANY_FORM.people));
      });

      await test.step('THEN the field stays empty or without letters', async () => {
        // Assert
        expect(value).not.toMatch(/[a-z]/i);
      });
    },
  );

  test(
    '[TC-CON-EMP-006] "Número de personas" rechaza cero y negativos @P2',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-009: RN-CON-011 is pending confirmation (open question 4) and today 0 and negatives are valid (HC-13)',
      );
    },
  );

  test(
    '[TC-CON-EMP-007] Código Sence es obligatorio con tres opciones @P1',
    { tag: '@sanity' },
    async ({ companyContactPage }) => {
      const form = companyContactPage.form;
      let groupValid = true;

      await test.step('GIVEN the rendered company form', async () => {
        // Arrange
        await companyContactPage.goto(COMPANY_FORM.name);
      });

      await test.step('WHEN the "Código Sence" group is read with no option checked', async () => {
        // Act
        groupValid = await form.isValid(form.radio(SENCE_RADIOS[0]));
      });

      await test.step('THEN the three radios exist and the group is required', async () => {
        // Assert
        for (const option of SENCE_RADIOS) {
          await expect(form.radio(option), option).toBeVisible();
          await expect(form.radio(option), option).toHaveAttribute('required');
        }
        expect(groupValid).toBe(false);
      });
    },
  );

  test(
    '[TC-CON-EMP-008] El formulario completo con datos sintéticos es válido en el cliente @P1',
    { tag: '@sanity' },
    async ({ companyContactPage, requestLog }) => {
      const form = companyContactPage.form;
      const data = buildCompanyContact();
      const validity: Record<string, boolean> = {};

      await test.step('GIVEN the rendered company form', async () => {
        // Arrange
        await companyContactPage.goto(COMPANY_FORM.name);
      });

      await test.step('WHEN it is filled with synthetic data (not submitted)', async () => {
        // Act
        await form.field(COMPANY_FORM.name).fill(data.name);
        await form.field(COMPANY_FORM.email).fill(data.email);
        await form.field(COMPANY_FORM.company).fill(data.company);
        await form.radio(data.sence).check();
        await form.field(COMPANY_FORM.people).fill(String(data.people));
        await form.field(COMPANY_FORM.interest).fill(data.interest);
        for (const [key, label] of Object.entries(COMPANY_FORM)) {
          validity[key] = await form.isValid(form.field(label));
        }
        validity.sence = await form.isValid(form.radio(data.sence));
      });

      await test.step('THEN every control is valid and nothing was posted to the site', async () => {
        // Assert
        expect(validity).toEqual({
          name: true,
          email: true,
          company: true,
          people: true,
          interest: true,
          sence: true,
        });
        expect(requestLog.toHost(companyContactPage.siteHost(), 'POST')).toEqual([]);
      });
    },
  );

  test(
    '[TC-CON-EMP-009] El formulario informa la política de privacidad @P2',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-012: RN-CON-013 is pending confirmation (open question 6) and today the form has no privacy notice (HC-16)',
      );
    },
  );

  test(
    '[TC-CON-EMP-010] Las etiquetas del formulario tienen ortografía correcta @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-010: RN-CON-014 is an editorial criterion not confirmed as a business rule (HC-14)',
      );
    },
  );

  test(
    '[TC-CON-EMP-011] Los campos obligatorios tienen indicador visual @P3',
    { tag: '@regression' },
    async () => {
      skipPending(
        'PENDING-SPEC',
        'REC-TCH-011: RN-CON-015 is a good practice (WCAG 3.3.2 is met by required + label), not a business rule (HC-15)',
      );
    },
  );

  test(
    '[TC-CON-EMP-012] El envío real muestra una confirmación @P3',
    { tag: '@destructive' },
    async () => {
      skipPending(
        'PENDING-CODE',
        '@destructive: a real submission is forbidden on production (S7, W9) and protected by reCAPTCHA; needs a test environment that does not exist',
      );
    },
  );
});
