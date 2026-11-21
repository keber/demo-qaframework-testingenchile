import type { Route } from '../../../enums/routes';

// Curated, observed on the live site (2026-11-21). Values (counters, course names)
// are volatile: only counts, routes and formats are asserted (project rule 7).
export const COUNTER_COUNT = 4;
export const FEATURED_COURSE_COUNT = 3;

// "Nuestros Servicios" CTAs and their target route (RN-HOME-018).
export const SERVICE_CTAS = [
  { label: 'Ver cursos', path: '/capacitaciones2/' },
  { label: 'Ver certificaciones', path: '/capacitaciones2/' },
  { label: 'Solicitar cotización', path: '/contacto-empresa/' },
] as const satisfies ReadonlyArray<{ label: string; path: `${Route}` }>;

// Home metadata required by RN-HOME-021.
export const EXPECTED_HOME_META = {
  lang: 'es',
  canonical: 'https://www.testingenchile.cl/',
  robots: 'index,follow',
  openGraph: ['og:url', 'og:title', 'og:type', 'og:description', 'og:site_name', 'og:image'],
} as const;
