import { fakerES as faker } from '@faker-js/faker';
import { ContactFormSchema, type ContactFormData } from '../../schemas/contact.schema';

const PHONE_DIGITS = 8;
const MESSAGE_SENTENCES = 2;

/**
 * Builds synthetic, obviously fictitious contact-form data (rule S5).
 * The email domain is reserved (example.com), so nothing can reach a real inbox.
 * Never submit it to the production site: CON tests only check presence and
 * client-side validation; any submission test is @destructive and skipped.
 * @param overrides - fields to force, e.g. an invalid email for a negative test
 * @returns data validated against ContactFormSchema
 */
export function buildContactForm(overrides: Partial<ContactFormData> = {}): ContactFormData {
  const candidate: ContactFormData = {
    name: `QA ${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email({ provider: 'example.com' }).toLowerCase(),
    phone: `+569${faker.string.numeric(PHONE_DIGITS)}`,
    company: `QA ${faker.company.name()}`,
    message: `[QA automatizado] ${faker.lorem.sentences(MESSAGE_SENTENCES)}`,
    ...overrides,
  };
  return ContactFormSchema.parse(candidate);
}
