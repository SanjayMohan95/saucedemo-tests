import { test, expect } from '@playwright/test';
import { SELECTORS } from '../utils/selectors';
import { TEST_DATA } from '../utils/testData';

test('Login with invalid credentials', async ({ page }) => {
    // Go to the login page
    await page.goto('https://www.saucedemo.com/v1/index.html');
    
    // Fill in invalid credentials from test data
    await page.fill(SELECTORS.usernameField, TEST_DATA.invalidUsername);
    await page.fill(SELECTORS.passwordField, TEST_DATA.invalidPassword);
    await page.click(SELECTORS.loginButton);

    // Wait and verify error message is displayed
    const errorMessageXPath = await page.locator(SELECTORS.errorMessageXPath);
    await errorMessageXPath.waitFor({ state: 'visible', timeout: 10000 }); // Increased timeout
    await expect(errorMessageXPath).toHaveText('Epic sadface: Username and password do not match any user in this service');
});