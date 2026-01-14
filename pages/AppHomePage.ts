import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { TablesPage } from './TablesPage';

export class AppHomePage extends BasePage {
  private appSettingsLink: Locator;
  private tablesLink: Locator;

  constructor(page: Page) {
    super(page);
    this.appSettingsLink = page.locator("//*[text()='App settings']");
    this.tablesLink = page.locator('#appSettingsNav_tables');
  }

  async goToTables(){
    await this.click(this.appSettingsLink);
    await this.click(this.tablesLink);
    await expect(this.page).toHaveTitle(/Tables/);
    return new TablesPage(this.page);
  }
}
