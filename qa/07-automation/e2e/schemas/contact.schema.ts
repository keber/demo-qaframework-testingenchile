import { z } from 'zod/v4';

// Shape of the data a contact-form test would type. The real form fields are
// not confirmed yet (PENDING-BROWSER: the form renders inside an embed); update
// this schema when /qa-module-analysis of module CON observes them.
export const ContactFormSchema = z.strictObject({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().regex(/^\+569\d{8}$/),
  company: z.string().min(1),
  message: z.string().min(10).max(500),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
