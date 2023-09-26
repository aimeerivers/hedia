import { Given, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from '@playwright/test';

Given('I go to {string}', async function (url: string) {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  await this.page.goto(url);
});

Then('the page heading should be {string}', async function (expectedHeading: string) {
  await this.page.getByRole('heading', { name: expectedHeading }).waitFor();
});
