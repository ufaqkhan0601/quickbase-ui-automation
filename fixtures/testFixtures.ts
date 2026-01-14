import { test as base, expect } from '@playwright/test';
import { config } from '../config';
import { LoginPage } from '../pages/LoginPage';

export const test = base.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto(config.baseUrl);
    await use(loginPage);

    // teardown
    await page.close();
  },
});

export { expect };
