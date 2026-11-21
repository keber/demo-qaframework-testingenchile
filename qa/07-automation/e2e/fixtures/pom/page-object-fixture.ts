import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/home/home.page';
import { NavigationComponent } from '../../pages/components/navigation.component';
import { CatalogPage } from '../../pages/capacitaciones/catalog.page';
import { CoursePage } from '../../pages/capacitaciones/course.page';
import { BootcampPage } from '../../pages/capacitaciones/bootcamp.page';

export type PageObjects = {
  homePage: HomePage;
  navigation: NavigationComponent;
  catalogPage: CatalogPage;
  coursePage: CoursePage;
  bootcampPage: BootcampPage;
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
});
