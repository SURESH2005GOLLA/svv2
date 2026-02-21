import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';

setDefaultTimeout(60000);

let browser: Browser;
let page: Page;

Before(async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
});

After(async () => {
    await browser.close();
});

Given('I am on the login page', async () => {
    await page.goto('http://localhost:5173');
});

When('I enter {string} as username', async (username: string) => {
    await page.fill('#username', username);
});

When('I enter {string} as password', async (password: string) => {
    await page.fill('#password', password);
});

When('I click the login button', async () => {
    await page.click('#login-button');
});

Then('I should see {string}', async (expectedMessage: string) => {
    // Wait for the text to appear anywhere on the page
    await expect(page.getByText(expectedMessage)).toBeVisible();
});

Then('I should be redirected to the dashboard', async () => {
    // In our app, we show a dashboard view
    const dashboardHeader = page.locator('h2');
    await expect(dashboardHeader).toBeVisible();
    const text = await dashboardHeader.textContent();
    expect(text).toContain('Welcome');
});

Then('I should see an error message {string}', async (expectedMessage: string) => {
    // Wait for the text to appear
    await expect(page.getByText(expectedMessage)).toBeVisible();
});

When('I enter a username with 51 characters', async () => {
    const longUsername = 'a'.repeat(51);
    await page.fill('#username', longUsername);
});
