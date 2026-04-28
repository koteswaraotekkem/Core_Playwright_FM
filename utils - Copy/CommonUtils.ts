import { Page, test } from "@playwright/test";
import * as allure from "allure-js-commons";



export class CommonUtils {
    /**
     * Generates a random name with a specified length.
     * @param length - The length of the random name (default is 7).
     * @returns A random string of the specified length.
     */
    static generateRandomName(length: number = 13): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    public static async addTestCaseDetails(owner:string, testcaseId:string){
            
            test.info().annotations.push({ type: 'Owner', description: owner });
            test.info().annotations.push({ type: 'TestcaseId', description: `https://projec.com/browse/${testcaseId}` });
            await allure.label('owner', owner);
            await allure.label('testcaseId',testcaseId);
            await allure.link(`https://projk.com/browse/${testcaseId}`, testcaseId);
    }
}

/**
 * Set browser zoom level to specified percentage.
 * @param page Playwright Page object
 * @param percent Zoom level as decimal (e.g., 0.8 for 80%)
 */
export async function resizeViewportByPercent(page: Page, percent: number = 0.8) {
    const context = page.context();
    await context.addInitScript(`
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    `);
    
    await page.evaluate((zoomLevel) => {
        (document.body.style as any).zoom = zoomLevel;
    }, percent);
}
