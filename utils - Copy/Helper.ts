import { Page, TestInfo } from '@playwright/test';

export class Helper {
    private page: Page;
    private testInfo: TestInfo;

    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }

    async takeScreenshot(name: string) {
        const screenshot = await this.page.screenshot();
        await this.testInfo.attach(name, {
            body: screenshot,
            contentType: 'image/png'
        });
    }

    async clickAndScreenshot(element: any, name: string) {
        await element.click();
        await this.takeScreenshot(name + ' screenshot');
    }

    async waitForStableState() {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000); // Give the app a moment to initialize
    }
}
