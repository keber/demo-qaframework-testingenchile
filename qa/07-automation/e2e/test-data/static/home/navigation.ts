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

export const FOOTER_LEGAL_LINKS = [
  { label: 'Términos y condiciones.', path: '/terminos-y-condiciones/' },
  { label: 'Políticas de privacidad.', path: '/politica-de-privacidad/' },
] as const satisfies ReadonlyArray<{ label: string; path: `${Route}` }>;

export const HEADER_SOCIAL_LINKS = ['Facebook', 'Twitter', 'Instagram', 'Linkedin'] as const;
