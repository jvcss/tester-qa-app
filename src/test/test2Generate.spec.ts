import { expect } from 'chai';

import { describe, it } from 'node:test';

import { Builder, By, Key, WebDriver, until } from 'selenium-webdriver';

describe('Test Suite: Basic Steps Flow', () => {
    let driver: WebDriver;

    before(async () => {
        // Initialize the Selenium WebDriver
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async () => {
        // Quit the WebDriver after all tests are completed
        await driver.quit();
    });

    // Test Case 1
    it('should perform step 1 with value "fashion"', async () => {
        try {
            // 1. Visit https://commerceos.staging.devpayever.com/registration
            await driver.get('https://commerceos.staging.devpayever.com/registration');

            // 2. Fill out the user information
            await driver.findElement(By.css('[formcontrolname="firstName"]')).sendKeys('John');
            await driver.findElement(By.css('[formcontrolname="lastName"]')).sendKeys('Doe');
            await driver.findElement(By.css('[formcontrolname="email"]')).sendKeys('johndoe@example.com');
            await driver.findElement(By.css('[formcontrolname="password"]')).sendKeys('password123!');
            await driver.findElement(By.css('[formcontrolname="confirmPass"]')).sendKeys('password123!');

            // 3. Click 'Next'
            await driver.findElement(By.css('.signup-button')).click();

            //easy automated blocks
            await driver.findElement(By.css('[formcontrolname="businessStatus"]')).click();
            const optionBStatusToSelect = 'Registered Business';
            const optionBStatusElement = await driver.findElement(
                By.xpath(`//[@id="cdk-overlay-8"]/div/peb-select-option[1]/span[text()="${optionBStatusToSelect}"]`));
            await optionBStatusElement.click();

            await driver.findElement(By.css('[formcontrolname="name"]')).sendKeys('John');


            await driver.findElement(By.css('[formcontrolname="status"]')).click();
            const optionStatusToSelect = 'Just looking around';
            const optionSatusElement = await driver.findElement(
                By.xpath(`//[@id="cdk-overlay-11"]/div/peb-select-option[1]/span[text()="${optionStatusToSelect}"]`));
            await optionSatusElement.click()

            await driver.findElement(By.css('[formcontrolname="salesRange"]')).click();
            const optionSalesToSelect = '0 EUR (I just started)';
            const optionSalesElement = await driver.findElement(
                By.xpath(`//[@id="cdk-overlay-13"]/div/peb-select-option[1]/span[text()="${optionSalesToSelect}"]`));
            await optionSalesElement.click()

            await driver.findElement(By.xpath('[@id="layout-container"]/div/entry-default-business-registration/entry-create-business-form/form/peb-form-background/div/pe-autocomplete/div/peb-form-field-input/div/div[1]/div/input'))
            .sendKeys('santander');

            // 4. Fill comboboxes for the dashboard to load 

            await driver.findElement(By.css('[formcontrolname="countryPhoneCode"]')).click();
            const optionContryCodeToSelect = '+49 Germany';
            const optionContryCodeElement = await driver.findElement(
                By.xpath(`//[@id="cdk-overlay-13"]/div/peb-select-option[1]/span[text()="${optionContryCodeToSelect}"]`));
            await optionContryCodeElement.click()

            
            await driver.findElement(By.css('[formcontrolname="phoneNumber"]')).sendKeys('62985031343');

            await driver.findElement(By.css('.signup-button')).click();

            await driver.findElement(By.css('.welcome-screen-content-button')).click();

            // 5. Validate the current URL (dashboard page)
            const currentUrl = await driver.getCurrentUrl();
            const regexPattern = /https:\/\/commerceos\.staging\.devpayever\.com\/business\/[a-f\d-]+\/info\/overview/;

            expect(currentUrl).to.match(regexPattern);
            
            // 6. Validate the apps on the dashboard
            const expectedApps = ['Transactions', 'Checkout', 'Connect', 'Products', 'Shop', 'Message', 'settings'];
            const actualApps = await driver.findElements(By.css('.icons__title'))
            const actualAppNames = await Promise.all(actualApps.map((el: { getText: () => any; }) => el.getText()));

            expect(actualAppNames).to.deep.equal(expectedApps);
        } catch (error) {
            console.error(error);
            throw error;
        }
    });
});
