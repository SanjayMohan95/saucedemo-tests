import { test, expect } from '@playwright/test';
import {SELECTORS} from'../utils/selectors';
import {TEST_DATA} from '../utils/testData';



// Define selectors as constants with flexibility for custom XPaths



// Define test data separately for flexibility


// Helper function to add items to cart
async function addItemToCart(page, itemName) {
   await page.waitForSelector(SELECTORS.addToCartButton(itemName), { state: 'visible', timeout: 10000 });
   await page.click(SELECTORS.addToCartButton(itemName));
}


// Helper function to scroll to an element and click it
async function scrollToAndClick(page, selector) {
   await page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
   await page.locator(selector).scrollIntoViewIfNeeded();
   await page.click(selector);
}


// Main test case for the standard user checkout flow
test('Standard user checkout flow', async ({ page }) => {
   // Login
   await page.goto('https://www.saucedemo.com/v1/index.html');
   await page.fill(SELECTORS.usernameField, TEST_DATA.username);
   await page.fill(SELECTORS.passwordField, TEST_DATA.password);
   await page.click(SELECTORS.loginButton);
   await page.waitForURL(/.*inventory/);


   // Add specified items to the cart
   for (const item of TEST_DATA.itemsToAdd) {
       await addItemToCart(page, item);
   }


   // Go to the cart page
   await page.click(SELECTORS.cartLink);


   // Scroll to and click on the Checkout button
   await scrollToAndClick(page, SELECTORS.checkoutButton);


   // Fill in checkout information
   await page.fill(SELECTORS.firstNameField, 'John');
   await page.fill(SELECTORS.lastNameField, 'Doe');
   await page.fill(SELECTORS.zipCodeField, '12345');


   // Scroll to and click on the Continue button
   await scrollToAndClick(page, SELECTORS.continueButton);


   // Scroll to and click on the Finish button
   await scrollToAndClick(page, SELECTORS.finishButton);


   // Assert the final confirmation message
   await page.waitForSelector('.complete-header', { timeout: 10000 });
   const confirmationMessage = await page.textContent('.complete-header');
   expect(confirmationMessage).toBe('THANK YOU FOR YOUR ORDER');
});
