import { Page } from "@playwright/test";
import { DateUtility } from "./DateUtility";
import { test } from "@playwright/test";
import { Locator } from 'playwright';  // Import both Page and Locator


/**
 * Utility class for capturing screenshots in Playwright.
 */
export class ScreenshotUtility {
    /**
     * The Playwright page instance.
     */
    public page: Page;

    /**
     * Constructs a ScreenshotUtility instance.
     * @param page - The Playwright page instance.
     */
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Captures a screenshot of the current page.
     * @param screenshotName - The base name for the screenshot file.
     * The method appends a random number to the name to ensure uniqueness.
     */
    async captureScreenot(screenshotName: string) {
        const dateUtility = new DateUtility();
        const path ='screenshots/' + dateUtility.appendRandomNumberToString(screenshotName) + '.png';
        await this.page.screenshot({
            path: path
        });
        return path
    }

    /**
     * Captures a screenshot of the current page and attaches it to the Allure report.
     * @param screenshotName - The base name for the screenshot file.
     * The method appends a random number to the name to ensure uniqueness.
     */
    async captureScreenshotAndAttachToAllure(screenshotName: string): Promise<void> {
    const dateUtility = new DateUtility();
    const screenshotPath =
        'screenshots/' + dateUtility.appendRandomNumberToString(screenshotName) + '.png';

    // Wait for the page to be fully rendered (best practice)
    await this.page.waitForLoadState('networkidle');

    // Reliable screenshot (no clip, increased timeout)
    await this.page.screenshot({
        path: screenshotPath,
        fullPage: true,
        timeout: 20000,
        animations: 'disabled',
    });

    const fs = require('fs');
    const buffer = fs.readFileSync(screenshotPath);
    test.info().attach(screenshotName, { body: buffer, contentType: 'image/png' });
}

}