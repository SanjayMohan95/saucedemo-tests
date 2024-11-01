import { test, expect } from '@playwright/test';

// Test Case: Locked Out User Cannot Log In with Slower Execution
test('Locked out user cannot log in (slowed)', async ({ page }) => {
  // Set default timeout for actions to slow down the test
  page.setDefaultTimeout(5000); // 5 seconds for each action

  // Navigate to the site
  console.log("Navigating to the login page...");
  await page.goto('https://www.saucedemo.com/v1/index.html');

  // Wait for the username field to be visible
  console.log("Waiting for the username field to be visible...");
  await page.waitForSelector('#user-name', { state: 'visible' });
  
  // Enter username and password
  console.log("Entering locked_out_user as username...");
  await page.fill('#user-name', 'locked_out_user');
  
  console.log("Entering secret_sauce as password...");
  await page.fill('#password', 'secret_sauce');

  // Adding a small delay before click for visibility
  console.log("Waiting briefly before clicking the login button...");
  await page.waitForTimeout(2000); // Wait 2 seconds before clicking

  // Click the login button
  console.log("Attempting to click the login button...");
  await page.click('#login-button');
  console.log("Login button clicked.");

  // Adding a delay to observe the page response
  await page.waitForTimeout(2000); // Wait 2 seconds after clicking

  // Check for the error message
  console.log("Checking for the error message...");
  const errorMessage = await page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  
  // Validate the error message content
  console.log("Validating the error message content...");
  await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  
  console.log("Test completed.");
});