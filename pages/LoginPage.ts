import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { config } from '../config';
import { HomePage } from './HomePage';

export class LoginPage extends BasePage {
  private noSsoButton: Locator;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.noSsoButton = page.locator('#quickbaseSignin');
    this.usernameInput = page.locator('input[name="loginid"]').first();
    this.passwordInput = page.locator('input[name="password"]').first();
    this.loginButton = page.locator('#signin');
  }

  async login(username: string = config.username,password: string = config.password) {
    await this.click(this.noSsoButton);
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    await expect(this.page).toHaveTitle(/Home/);
     return new HomePage(this.page);
  }
}
