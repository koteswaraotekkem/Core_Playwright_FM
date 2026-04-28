import { Page } from '@playwright/test';

export class WaitHelper {
    constructor(private readonly page: Page) {}

    /**
     * Waits for both DOM content and network to be idle
     * @param timeoutMs Optional timeout in milliseconds
     */
    async waitForPageReady(timeoutMs = 30000) {
        await this.page.waitForLoadState('networkidle', { timeout: timeoutMs });
        await this.page.waitForLoadState('domcontentloaded', { timeout: timeoutMs });
    }

    /**
     * Waits for navigation and network to be idle after an action
     */
    async waitForNavigationComplete() {
       await this.waitForPageReady();
    }

    /**
     * Waits for element to be visible and actionable
     * @param selector Element selector
     * @param timeoutMs Optional timeout in milliseconds
     */
    async waitForElement(selector: string, timeoutMs = 15000) {
        await this.page.locator(selector).waitFor({ 
            state: 'visible', 
            timeout: timeoutMs 
        });
    }

    /**
     * Waits for element to be visible and clickable
     * @param selector Element selector
     * @param timeoutMs Optional timeout in milliseconds
     */
    async waitForClickable(selector: string, timeoutMs = 15000) {
        const element = this.page.locator(selector);
        await element.waitFor({ state: 'visible', timeout: timeoutMs });
        
        // Ensure element is actionable
        await this.page.waitForFunction(
            (selector) => {
                const el = document.querySelector(selector) as HTMLElement;
                if (!el) return false;
                const rect = el.getBoundingClientRect();
                return rect.width > 0 && rect.height > 0 && rect.top >= 0;
            },
            selector,
            { timeout: timeoutMs }
        );
    }

    async waitForelementToHidden(selctor: string, timeOuts: number){
const element =  this.page.locator(selctor);
element.waitFor({state: 'hidden', timeout:timeOuts});
this.page.waitForFunction
    }
}
