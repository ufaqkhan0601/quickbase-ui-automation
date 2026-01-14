import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppHomePage } from './AppHomePage';
import testData from '../data/test_data.json';

export class HomePage extends BasePage {
  private assignedAppLink: Locator;

  constructor(page: Page) {
    super(page);
    this.assignedAppLink = page.getByRole('button', {name: testData.data.appName});
  }

  async openApp(){
    await this.click(this.assignedAppLink);
    await expect(this.page).toHaveTitle(/Dashboard\s*$/i);
    return new AppHomePage(this.page);
  }
}
