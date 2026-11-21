// Curated, observed on the live site (2026-11-21).

// Footer inquiry types and their role mailbox prefix (RN-CON-003); the sponsor
// label carries a volatile year, hence the pattern. Domain in home/navigation.ts.
export const INQUIRY_MAILBOXES = [
  { label: /Consultas generales/, prefix: 'contacto' },
  { label: /Consultas evento/, prefix: 'eventos' },
  { label: /Cursos y certificaciones/, prefix: 'cursos' },
] as const;

// Social links of the contact page content and the expected host (RN-CON-004).
export const CONTACT_SOCIAL_LINKS = [
  { label: 'LinkedIn', host: /(^|\.)linkedin\.com$/ },
  { label: 'Facebook', host: /(^|\.)facebook\.com$/ },
  { label: 'Instagram', host: /(^|\.)instagram\.com$/ },
  { label: 'Twitter', host: /(^|\.)(twitter|x)\.com$/ },
] as const;

// Labels of the company form (RN-CON-008), as published (spelling: REC-TCH-010).
export const COMPANY_FORM = {
  name: 'Nombre',
  email: 'Email',
  company: 'Empresa',
  people: 'Número de personas',
  interest: 'Indícanos que capacitación estas interesado',
} as const;

// "Código Sence" radio options, as published ("Si" without accent: HC-14).
export const SENCE_RADIOS = ['Si', 'No', 'Aún no sabemos'] as const;

// Negative inputs (04-test-data.md).
export const COMPANY_INVALID_INPUT = {
  email: 'qa-invalido',
  people: 'abc',
} as const;
