import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/home/home.page';
import { NavigationComponent } from '../../pages/components/navigation.component';
import { CatalogPage } from '../../pages/capacitaciones/catalog.page';
import { CoursePage } from '../../pages/capacitaciones/course.page';
import { BootcampPage } from '../../pages/capacitaciones/bootcamp.page';
import { TestingDayPage } from '../../pages/eventos/testing-day.page';
import { AgendaOnlinePage } from '../../pages/eventos/agenda-online.page';
import { EditionsPage } from '../../pages/eventos/editions.page';
import { ContactPage } from '../../pages/contacto/contact.page';
import { CompanyContactPage } from '../../pages/contacto/company-contact.page';
import { LegalPage } from '../../pages/legal/legal.page';
import { BlogPage } from '../../pages/legal/blog.page';
import { GalleryPage } from '../../pages/legal/gallery.page';

export type PageObjects = {
  homePage: HomePage;
  navigation: NavigationComponent;
  catalogPage: CatalogPage;
  coursePage: CoursePage;
  bootcampPage: BootcampPage;
  testingDayPage: TestingDayPage;
  agendaOnlinePage: AgendaOnlinePage;
  editionsPage: EditionsPage;
  contactPage: ContactPage;
  companyContactPage: CompanyContactPage;
  legalPage: LegalPage;
  blogPage: BlogPage;
  galleryPage: GalleryPage;
};

// Every page object is created here and injected; specs never call `new`.
export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  navigation: async ({ page }, use) => {
    await use(new NavigationComponent(page));
  },
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
  coursePage: async ({ page }, use) => {
    await use(new CoursePage(page));
  },
  bootcampPage: async ({ page }, use) => {
    await use(new BootcampPage(page));
  },
  testingDayPage: async ({ page }, use) => {
    await use(new TestingDayPage(page));
  },
  agendaOnlinePage: async ({ page }, use) => {
    await use(new AgendaOnlinePage(page));
  },
  editionsPage: async ({ page }, use) => {
    await use(new EditionsPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  companyContactPage: async ({ page }, use) => {
    await use(new CompanyContactPage(page));
  },
  legalPage: async ({ page }, use) => {
    await use(new LegalPage(page));
  },
  blogPage: async ({ page }, use) => {
    await use(new BlogPage(page));
  },
  galleryPage: async ({ page }, use) => {
    await use(new GalleryPage(page));
  },
});
