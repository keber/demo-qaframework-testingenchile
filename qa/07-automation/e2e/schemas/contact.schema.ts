import { z } from 'zod/v4';

// Shape of the data a consultation-form test types into a course page (fields
// observed 2026-11-21: Nombre y Apellido, E-mail, Celular, Mensaje). Never submitted (S7).
// `company` is kept for the shared factory; the company form has its own schema.
export const ContactFormSchema = z.strictObject({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().regex(/^\+569\d{8}$/),
  company: z.string().min(1),
  message: z.string().min(10).max(500),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
