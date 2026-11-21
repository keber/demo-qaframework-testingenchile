import type { Route } from '../../../enums/routes';

// Curated, observed on the live site (2026-11-21). Labels are the accessible
// names of the main menu items and footer links, in display order.
export const MAIN_MENU_ITEMS = [
  { label: 'Inicio', path: '/' },
  { label: 'Capacitaciones', path: '/capacitaciones2/' },
  { label: 'Testing Day Chile 2026', path: '/testing-day-chile/' },
  { label: 'Blog', path: '/blog/' },
  { label: 'Fotogalería', path: '/galeria/' },
  { label: 'Contacto', path: '/formulario-contacto/' },
] as const satisfies ReadonlyArray<{ label: string; path: `${Route}` }>;

// The event label carries a volatile year: match it by pattern (TC-HOME-NAV-002 data).
export const EVENT_MENU_LABEL = /^Testing Day Chile \d{4}$/;

// Menu items, in display order, with the label used to look them up (event year volatile).
export const MAIN_MENU_LOOKUP = [
  { label: 'Inicio', path: '/' },
  { label: 'Capacitaciones', path: '/capacitaciones2/' },
  { label: EVENT_MENU_LABEL, path: '/testing-day-chile/' },
  { label: 'Blog', path: '/blog/' },
  { label: 'Fotogalería', path: '/galeria/' },
  { label: 'Contacto', path: '/formulario-contacto/' },
] as const;

// Accessibility template of the desktop main menu, in display order (TC-HOME-NAV-002).
// The event year is volatile, hence the regex; "Abrir submenú" is the Webnode toggle.
export const MAIN_MENU_ARIA = `
- menubar "Menú":
  - menuitem "Inicio"
  - menuitem "Capacitaciones"
  - menuitem /Testing Day Chile \\d{4}/
  - menuitem "Abrir submenú"
  - menuitem "Blog"
  - menuitem "Fotogalería"
  - menuitem "Contacto"
`;

// Second level of the event entry (RN-HOME-002); the sponsors label carries the year.
export const EVENT_SUBMENU_ITEMS = [
  /^Agenda Online$/,
  /^Nuestros Sponsors \d{4}$/,
  /^Ediciones anteriores$/,
  /^Otras Actividades$/,
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: 'Términos y condiciones.', path: '/terminos-y-condiciones/' },
  { label: 'Políticas de privacidad.', path: '/politica-de-privacidad/' },
] as const satisfies ReadonlyArray<{ label: string; path: `${Route}` }>;

export const HEADER_SOCIAL_LINKS = ['Facebook', 'Twitter', 'Instagram', 'Linkedin'] as const;

// Footer social links (RN-HOME-006): accessible name and expected host.
export const FOOTER_SOCIAL_LINKS = [
  { label: 'LinkedIn', host: /(^|\.)linkedin\.com$/ },
  { label: 'Instagram', host: /(^|\.)instagram\.com$/ },
  { label: 'Facebook', host: /(^|\.)facebook\.com$/ },
  { label: 'X', host: /(^|\.)(x|twitter)\.com$/ },
] as const;

// Role mailboxes of the site, stored as prefix + domain (no personal addresses, S4).
export const SITE_EMAIL_DOMAIN = 'testingenchile.cl';
export const FOOTER_EMAIL_PREFIXES = ['contacto', 'eventos', 'cursos'] as const;

// Contact link schemes and prefixes (RN-HOME-005, RN-HOME-010). Numbers are not versioned.
export const CONTACT_LINK = {
  whatsappPrefix: 'https://wa.me/',
  whatsappTextParam: 'text',
  mailtoScheme: 'mailto:',
  phonePrefix: 'tel:+56',
  blankTarget: '_blank',
} as const;

// Canonical redirects (RN-HOME-014). Hosts only, the scheme is part of the variant.
export const CANONICAL_ORIGIN = 'https://www.testingenchile.cl';
export const DOMAIN_VARIANTS = [
  'http://www.testingenchile.cl/',
  'https://testingenchile.cl/',
] as const;

// Accessible name expected in the header logo alt (RN-HOME-012).
export const SITE_NAME_PATTERN = /testing en chile/i;
