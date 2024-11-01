import { test, expect } from '@playwright/test';
import { SELECTORS, SORTING_SELECTORS } from '../utils/selectors';
import { TEST_DATA, SORTING_TEST_DATA } from '../utils/testData';

// Helper function to fetch parsed prices from the page
const getParsedPrices = async (page) => {
    const prices = await page.$$eval(SORTING_SELECTORS.itemPrices, elements =>
        elements.map(el => parseFloat(el.textContent.replace('$', '').trim()))
    );
    return prices.filter(price => !isNaN(price));
};

// Helper function to fetch item names from the page
const getItemNames = async (page) => {
    return await page.$$eval(SORTING_SELECTORS.itemNames, elements =>
        elements.map(el => el.textContent.trim())
    );
};

// Main sorting test case
test('Verify sorting functionality on inventory page', async ({ page }) => {
    // Log in
    await page.goto('https://www.saucedemo.com/v1/index.html');
    await page.fill(SELECTORS.usernameField, TEST_DATA.username);
    await page.fill(SELECTORS.passwordField, TEST_DATA.password);
    await page.click(SELECTORS.loginButton);
    await page.waitForURL('**/inventory.html');

    // Test sorting by 'Price (low to high)'
    await page.selectOption(SORTING_SELECTORS.sortDropdown, 'lohi');
    console.log("Selecting 'Price (low to high)' option...");
    const displayedPricesLowToHigh = await getParsedPrices(page);
    const expectedPricesLowToHigh = SORTING_TEST_DATA.sortedPricesLowToHigh.map(price => parseFloat(price.trim()));
    console.log('Expected Prices Low to High:', expectedPricesLowToHigh);
    expect(displayedPricesLowToHigh).toEqual(expectedPricesLowToHigh);

    // Test sorting by 'Price (high to low)'
    await page.selectOption(SORTING_SELECTORS.sortDropdown, 'hilo');
    console.log("Selecting 'Price (high to low)' option...");
    const displayedPricesHighToLow = await getParsedPrices(page);
    const expectedPricesHighToLow = SORTING_TEST_DATA.sortedPricesHighToLow.map(price => parseFloat(price.trim()));
    console.log('Expected Prices High to Low:', expectedPricesHighToLow);
    expect(displayedPricesHighToLow).toEqual(expectedPricesHighToLow);

    // Test sorting by 'Name (A to Z)'
    await page.selectOption(SORTING_SELECTORS.sortDropdown, 'az');
    console.log("Selecting 'Name (A to Z)' option...");
    const displayedNamesAZ = await getItemNames(page);
    const expectedNamesAZ = SORTING_TEST_DATA.sortedNamesAZ;
    console.log('Expected Names A to Z:', expectedNamesAZ);
    expect(displayedNamesAZ).toEqual(expectedNamesAZ);

    // Test sorting by 'Name (Z to A)'
    await page.selectOption(SORTING_SELECTORS.sortDropdown, 'za');
    console.log("Selecting 'Name (Z to A)' option...");
    const displayedNamesZA = await getItemNames(page);
    const expectedNamesZA = SORTING_TEST_DATA.sortedNamesZA;
    console.log('Expected Names Z to A:', expectedNamesZA);
    expect(displayedNamesZA).toEqual(expectedNamesZA);
});