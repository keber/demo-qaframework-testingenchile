import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/home/home.page';
import { NavigationComponent } from '../../pages/components/navigation.component';

export type PageObjects = {
  homePage: HomePage;
  navigation: NavigationComponent;
};

// Every page object is created here and injected; specs never call `new`.
export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  navigation: async ({ page }, use) => {
    await use(new NavigationComponent(page));
  },
});
