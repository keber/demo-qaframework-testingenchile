import type { Route } from '../../../enums/routes';

// Curated, observed on the live site (2026-11-21). Course names and counts are
// volatile (project rule 7): only filters, structure and routes are asserted.

// Category filters other than "Todos" (RN-CAP-002).
export const CATALOG_FILTERS = ['Bootcamp', 'IA', 'SAP', 'Automation', 'Performance', 'Cursos'] as const;

// Course page with the consultation form (TC-CAP-CUR-002..006).
export const FORM_COURSE_PATH = '/curso-automatizacion-pruebas-software-web-selenium-java/' as const satisfies `${Route}`;

// Labels of the consultation form controls (RN-CAP-010).
export const CONSULTATION_FORM = {
  name: 'Nombre y Apellido',
  email: 'E-mail',
  phone: 'Celular',
  message: 'Mensaje',
  consent: /Acepto el uso de mis datos personales/,
} as const;

// AiU subject select (RN-CAP-012).
export const AIU_SUBJECT_LABEL = 'Asunto | Elige una opción';
export const AIU_SUBJECT_OPTIONS = [
  'Inscripción formación Gen AiA-TE',
  'Más Información Gen AiA-TE',
  'Otra pregunta',
] as const;

// Negative inputs of the consultation form (04-test-data.md).
export const INVALID_INPUT = {
  email: 'qa-invalido',
  phone: 'abc',
} as const;

// Payment gateway host (RN-CAP-014) and the pages with a payment button.
export const PAYMENT_HOST = 'www.flow.cl';
export const PAYMENT_ORIGIN = 'https://www.flow.cl';
export const PAYMENT_PAGES = ['/new-curso-istqb/', '/aiugenaia/'] as const satisfies ReadonlyArray<`${Route}`>;

// Self-assessment questions (group names) with their options ordered by score 0, 1, 2 (RN-CAP-019).
export const QUIZ_QUESTIONS = [
  {
    group: '1. Cuando algo no resulta, ¿qué haces?',
    options: ['Espero instrucciones', 'Busco ejemplos', 'Investigo, pruebo y pregunto'],
  },
  {
    group: '2. ¿Qué buscas profesionalmente?',
    options: ['Sumar un curso', 'Actualizarme', 'Especializarme o reconvertirme'],
  },
  {
    group: '3. ¿Cómo aprendes mejor?',
    options: ['Leyendo', 'Con ejemplos', 'Haciendo y corrigiendo'],
  },
  {
    group: '4. Ante un problema tecnológico...',
    options: ['Me bloqueo', 'Intento entenderlo', 'Lo analizo y busco evidencia'],
  },
] as const;

// Score combinations of 04-test-data.md (borders included) and the expected result.
export const QUIZ_CASES = [
  { scores: [2, 2, 2, 2], total: 8, result: 'Muy alineada' },
  { scores: [2, 2, 1, 1], total: 6, result: 'Muy alineada' },
  { scores: [2, 1, 1, 1], total: 5, result: 'Con potencial de desarrollo' },
  { scores: [1, 1, 1, 0], total: 3, result: 'Con potencial de desarrollo' },
  { scores: [1, 1, 0, 0], total: 2, result: 'Vale la pena conversar' },
  { scores: [0, 0, 0, 0], total: 0, result: 'Vale la pena conversar' },
] as const;

export const BOOTCAMP_FAQ_COUNT = 5;
