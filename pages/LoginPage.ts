import { Page } from '@playwright/test';
import { WaitHelper } from '../utils/WaitHelper';
import { loadConfig } from '../utils/ConfigLoader';
import { DealershipSettingsPage } from './DealershipSettingsPage';


export class LoginPage {
    private readonly usernameInputSelector = 'input[id*="Username"]';
    private readonly passwordInputSelector = 'input[id*="Password"]';
    private readonly signInButtonSelector = '#ctl00_ctl00_Main_Main_btnLogin';
    private readonly goButtonSelector = '#ctl00_ctl00_Main_Main_btnGo';
    private readonly waitHelper: WaitHelper;
    private readonly config = loadConfig();

    constructor(private readonly page: Page) {
        this.waitHelper = new WaitHelper(page);
    }

    async goto() {
        const fullUrl = this.config.urls.baseUrl + this.config.cid;
        await this.page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 90000 });
    }

    async login(username: string, password: string): Promise<DealershipSettingsPage> {
        await this.waitHelper.waitForPageReady();
        const usernameInput = this.page.locator(this.usernameInputSelector).first();
        const passwordInput = this.page.locator(this.passwordInputSelector).first();
        await usernameInput.waitFor({ state: 'visible' });
        await usernameInput.fill(username);
        await passwordInput.fill(password);

        await this.waitHelper.waitForClickable(this.signInButtonSelector);
        await this.page.click(this.signInButtonSelector);
        

        await this.waitHelper.waitForClickable(this.goButtonSelector);
        await this.page.click(this.goButtonSelector);
        
        return new DealershipSettingsPage(this.page);
    }
}