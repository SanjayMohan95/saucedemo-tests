import { test, expect } from '@playwright/test';
import { SELECTORS } from '../utils/selectors';
import { TEST_DATA } from '../utils/testData';

// Main test case for verifying user cannot proceed to checkout with an empty cart
test('Verify user cannot proceed to checkout with an empty cart', async ({ page }) => {
   // Login
   await page.goto('https://www.saucedemo.com/v1/index.html');
   await page.fill(SELECTORS.usernameField, TEST_DATA.username);
   await page.fill(SELECTORS.passwordField, TEST_DATA.password);
   await page.click(SELECTORS.loginButton);
   await page.waitForURL(/.*inventory/);

   console.log("Logged in successfully, now navigating to the cart...");

   // Go to the cart page
   await page.click(SELECTORS.cartLink);
   await page.waitForURL(/.*cart/);

   console.log("Attempting to click on checkout button...");

   // Attempt to proceed to checkout
   await page.click(SELECTORS.checkoutButton);

   // Check if user is redirected to checkout page and display a bug message
   if (await page.url().includes('/checkout-step-one.html')) {
       console.log("\n\n***** BUG DETECTED: User is able to proceed to checkout with an empty cart *****\n\n");
   } else {
       console.log("Test passed: User is still on cart page as expected, cannot proceed with an empty cart.");
   }
});