export const SELECTORS = {
    usernameField: '#user-name',
    passwordField: '#password',
    loginButton: '#login-button',
    addToCartButton: (itemName) => `//div[@class='inventory_item' and .//div[@class='inventory_item_name' and text()='${itemName}']]//button[contains(@class, 'btn_inventory') and text()='ADD TO CART']`,
    cartLink: "//a[contains(@class, 'shopping_cart_link')]",
    checkoutButton: "//a[contains(@class, 'btn_action checkout_button')]", // XPath for checkout button
    firstNameField: '#first-name',
    lastNameField: '#last-name',
    zipCodeField: '#postal-code',
    continueButton: "//input[contains(@class, 'btn_primary cart_button') and @value='CONTINUE']", // XPath for continue button
    finishButton: "//a[contains(@class, 'btn_action cart_button') and text()='FINISH']", // XPath for finish button
    errorMessageXPath: "//h3[@data-test='error']", //Xpath for error message while login in
    removeButton: (itemName) => `//div[contains(@class, 'cart_item') and .//div[text()='${itemName}']]//button[contains(@class, 'btn_secondary')]`,
    continueShoppingButton: "//a[contains(@class, 'btn_secondary') and contains(text(), 'Continue Shopping')]",
    cartPageContainer: ".cart_list"
 };

 // Selectors for sorting functionality
 export const SORTING_SELECTORS = {
    sortDropdown: "//select[@class='product_sort_container']", // XPath for the sorting dropdown
    itemPrices: "//div[@class='inventory_item_price']", // XPath for the displayed item prices
    itemNames: "//div[@class='inventory_item_name']", // XPath for the displayed item names
};