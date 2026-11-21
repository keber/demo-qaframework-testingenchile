import { z } from 'zod/v4';

// Shape of the data a company-form test types into /contacto-empresa/ (fields
// observed 2026-11-21, RN-CON-008). Never submitted (rule S7).
export const SENCE_OPTIONS = ['Si', 'No', 'Aún no sabemos'] as const;

export const CompanyContactSchema = z.strictObject({
  name: z.string().min(2),
  email: z.email(),
  company: z.string().min(1),
  sence: z.enum(SENCE_OPTIONS),
  people: z.number().int().min(1).max(999),
  interest: z.string().min(5).max(500),
});

export type CompanyContactData = z.infer<typeof CompanyContactSchema>;
