import { Page, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { resizeViewportByPercent } from '../utils/CommonUtils';
import { loadConfig } from '../utils/ConfigLoader';

// Load environment variables silently
dotenv.config();

export class DealershipSettingsPage {
    private page: Page;
    private readonly config = loadConfig();
    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private drpDownCompanySelection = '#ddlCompanies_chzn';
    private inpCompany = '.chzn-search>input';
    private btnGo = '(//input[contains(@id,"btnGo")])[2]';
    private appointmentCapacityHeaderSelector = 'h1:has-text("Appointment Capacity by Advisor")';
    private enableACAButtonSelector = '#btnEnableACAButton';
    private enableACTButtonSelector = '#btnTechEnable';
    private disableACTButtonSelector = '#btnTechDisable';

    async navigateToDashboard() {
        await this.page.waitForLoadState('networkidle');
        // Wait for and click the dropdown
        const dropdown = this.page.locator(this.drpDownCompanySelection);
        await dropdown.waitFor({ state: 'visible', timeout: 8000 });
        await dropdown.click();
    }

    async navigateToDealershipSettings(){
        const currentUrl = this.config.urls.baseUrl;
        const baseUrl = currentUrl.split('.com')[0] + '.com';
        const settingsUrl = baseUrl + '/App/Settings/EnableACA.aspx';
        console.log("Settings URL: ", settingsUrl)
        await this.page.goto(settingsUrl, { waitUntil: 'networkidle', timeout: 90000 });
    }

    async openDealershipSettings() {
        const settingsBtn = this.page.locator('//div[@id="collapseSFSidebar"]/i[contains(@class,"right")]');
       
       await resizeViewportByPercent(this.page);
        if (await settingsBtn.isVisible()) {
            const settingsSideBar = this.page.locator('#collapseSFSidebar').first();
            await settingsSideBar.waitFor({ state: 'visible', timeout: 60000 });
            
            await settingsSideBar.click();
        }
        
            const settingsButton = this.page.locator('//li[contains(@class,"settings")]');
            await settingsButton.waitFor({ state: 'attached', timeout: 60000 });
            await settingsButton.scrollIntoViewIfNeeded();
            await settingsButton.waitFor({ state: 'visible', timeout: 60000 });
            await settingsButton.click();
        
        const dealershipSettings = this.page.locator('(//a[@title="Manage Dealership Settings"])[2]');
        await this.page.evaluate(() => {
            const element = document.evaluate('(//a[@title="Manage Dealership Settings"])[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLElement;
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        await dealershipSettings.waitFor({ state: 'visible', timeout: 60000 });
        await dealershipSettings.click();
     }

    async openAppointmentCapacity() {
        await this.page.waitForLoadState('networkidle');
        const appointmentLink = this.page.locator('h5', { hasText: 'Appointment Capacity by Technician' });

        await appointmentLink.nth(0).waitFor({ state: 'visible', timeout: 60000 });
        await appointmentLink.nth(0).click();
    }

    async verifyAppointmentCapacityPage() {
        await expect(this.page.getByRole('heading', { name: 'Appointment Capacity by Advisor' }))
            .toBeVisible({ timeout: 60000 });
        await expect(this.page.locator(this.enableACAButtonSelector)).toBeVisible();
    }

    async isEnableActPopUpDisplayed(): Promise<boolean> {
        await this.page.waitForLoadState('networkidle');
        const enableButton = this.page.locator(this.enableACTButtonSelector);
        await enableButton.waitFor({ state: 'visible', timeout: 60000 });
        await enableButton.click();
        
        try {
            await this.page.getByText('By Proceeding with Appointment Capacity by Technician, existing constraints by Advisor will be disabled. ').waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async enableAppointmentCapacityByTechnician() {
        await this.page.waitForLoadState('networkidle');
        const enableButton = this.page.locator(this.enableACTButtonSelector);
        await enableButton.waitFor({ state: 'visible', timeout: 60000 });
        const value = await this.page.getAttribute(this.enableACTButtonSelector, 'disabled');
      
        if (value === null || value.trim() === '') {
            await enableButton.click();
            await expect(this.page.getByText('By Proceeding with')).toBeVisible();
            await this.page.getByLabel('Enable ACT').getByRole('button', { name: 'Enable' }).click();
        }
    }

    async getEnableButtonValue(): Promise<string | null> {
        await this.page.waitForLoadState('networkidle');
        const value = await this.page.getAttribute(this.enableACTButtonSelector, 'value');
        return value;
    }
}