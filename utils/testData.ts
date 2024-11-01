export const TEST_DATA = {
    username: 'standard_user',
    password: 'secret_sauce',
    itemsToAdd: ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Onesie'],
    firstName: 'John',
    lastName: 'Doe',
    zipCode: '12345',

    // Invalid credentials
    invalidUsername: 'invalid_user',
    invalidPassword: 'wrong_password'
};

// Sorting-related test data
export const SORTING_TEST_DATA = {
    sortedNamesAZ: [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)'
    ],
    sortedNamesZA: [
        'Test.allTheThings() T-Shirt (Red)',
        'Sauce Labs Onesie',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Bike Light',
        'Sauce Labs Backpack'
    ],
    sortedPricesLowToHigh: [
        '7.99',
        '9.99',
        '15.99',
        '15.99',
        '29.99',
        '49.99'
    ],
    sortedPricesHighToLow: [
        '49.99',
        '29.99',
        '15.99',
        '15.99',
        '9.99',
        '7.99'
    ]
};