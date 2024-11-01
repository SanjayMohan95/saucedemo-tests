import { test, expect } from '@playwright/test';
import { SELECTORS } from '../utils/selectors';
import { TEST_DATA } from '../utils/testData';

// Helper function to add items to cart
async function addItemToCart(page, itemName) {
    await page.waitForSelector(SELECTORS.addToCartButton(itemName), { state: 'visible', timeout: 10000 });
    await page.click(SELECTORS.addToCartButton(itemName));
}

// Helper function to remove an item from the cart
async function removeItemFromCart(page, itemName) {
    const removeButtonSelector = SELECTORS.removeButton(itemName);
    
    // Wait for the item to be available, scroll into view, and then click remove
    await page.waitForSelector(removeButtonSelector, { state: 'visible', timeout: 10000 });
    
    // Scroll to the remove button
    await page.locator(removeButtonSelector).scrollIntoViewIfNeeded();
    
    // Small delay after scrolling to ensure UI has settled
    await page.waitForTimeout(500); 
    
    // Attempt to click the remove button
    await page.click(removeButtonSelector);
}

// Main test case for removing an item from the cart and continuing shopping
test('Remove an item from the cart and continue shopping', async ({ page }) => {
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

    // Remove one item from the cart
    await removeItemFromCart(page, TEST_DATA.itemsToAdd[1]); // Remove the second item in the list

    // Verify the item was removed
    const removedItemSelector = `text=${TEST_DATA.itemsToAdd[1]}`;
    await expect(page.locator(removedItemSelector)).not.toBeVisible();

    // Click on Continue Shopping button
    await page.click(SELECTORS.continueShoppingButton);

    // Verify we're back on the inventory page
    await page.waitForURL(/.*inventory/);
    expect(await page.url()).toContain('inventory');
});