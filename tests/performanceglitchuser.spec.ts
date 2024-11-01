import { test, expect } from '@playwright/test';

// Test Case: Performance Glitch User Login
test('Performance Glitch User login test', async ({ page }) => {
  // Navigate to the site
  await page.goto('https://www.saucedemo.com/v1/index.html');

  // Wait for the username field to be visible
  await page.waitForSelector('#user-name', { state: 'visible' });
  
  // Enter username and password
  await page.fill('#user-name', 'performance_glitch_user');
  await page.fill('#password', 'secret_sauce');

  // Click the login button with an extended wait time
  await page.waitForSelector('#login-button', { state: 'visible', timeout: 15000 });
  await page.click('#login-button');

  // Wait for the URL to contain "inventory" to confirm successful login
  await page.waitForURL(/.*inventory/, { timeout: 15000 });
  
  // Assert to confirm login success
  await expect(page).toHaveURL(/.*inventory/);
});