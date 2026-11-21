import { fakerES as faker } from '@faker-js/faker';
import { CompanyContactSchema, type CompanyContactData } from '../../schemas/company-contact.schema';

const MAX_PEOPLE = 50;

/**
 * Builds synthetic, obviously fictitious company-form data (rule S5): QA prefix
 * and the reserved example.com domain. Never submit it to the production site.
 * @param overrides - fields to force, e.g. a specific Sence option
 * @returns data validated against CompanyContactSchema
 */
export function buildCompanyContact(overrides: Partial<CompanyContactData> = {}): CompanyContactData {
  const candidate: CompanyContactData = {
    name: `QA ${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email({ provider: 'example.com' }).toLowerCase(),
    company: `QA ${faker.company.name()}`,
    sence: 'Aún no sabemos',
    people: faker.number.int({ min: 1, max: MAX_PEOPLE }),
    interest: `[QA automatizado] capacitación de prueba ${faker.lorem.words(3)}`,
    ...overrides,
  };
  return CompanyContactSchema.parse(candidate);
}
