import { test, expect } from '@playwright/test';

// Test Case: Problem User Login
test('Problem user login test', async ({ page }) => {
  // Navigate to the site
  await page.goto('https://www.saucedemo.com/v1/index.html');

  // Wait for the username field to be visible
  await page.waitForSelector('#user-name', { state: 'visible' });

  // Enter username and password
  await page.fill('#user-name', 'problem_user');
  await page.fill('#password', 'secret_sauce');

  // Click the login button
  await page.waitForSelector('#login-button', { state: 'visible' });
  await page.click('#login-button');

  // Wait for the URL to contain "inventory" to confirm successful login
  await page.waitForURL(/.*inventory/);

  // Assert to confirm login success
  await expect(page).toHaveURL(/.*inventory/);

  // Optional: You can add checks here if you notice any issues during manual testing
});