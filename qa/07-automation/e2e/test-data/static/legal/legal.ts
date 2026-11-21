// Curated, observed on the live site (2026-11-21).

// Legal pages, their footer link and expected h1 (RN-LEG-001).
export const LEGAL_PAGES = [
  { link: 'Términos y condiciones.', path: '/terminos-y-condiciones/', h1: 'Términos y Condiciones' },
  { link: 'Políticas de privacidad.', path: '/politica-de-privacidad/', h1: 'Política de privacidad' },
] as const;

// The 8 h2 sections of the privacy policy listed in the inventory (RN-LEG-007).
export const PRIVACY_SECTIONS = [
  'Normas generales',
  'La fuente de los datos personales',
  'Propósito del procesamiento de datos',
  'Duración del almacenamiento de datos personales',
  'Destinatarios y procesadores de datos personales',
  'Derechos del cliente',
  'Seguridad de datos personales',
  'Disposiciones finales',
] as const;

export const DOCUMENT_LANG = 'es';

// Blog listing formats (RN-LEG-008, RN-LEG-009).
export const BLOG_DATE_PATTERN = /^\d{2}\.\d{2}\.\d{4}$/;
export const BLOG_PAGINATED_PATH = /^\/blog\/p-[\w-]+\/\d+\/$/;
