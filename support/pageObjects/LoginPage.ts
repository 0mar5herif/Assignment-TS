import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly submit: Locator;

    constructor(page: Page) { 
        this.page = page;
        this.email = page.locator('#email');
        this.password = page.locator('#password');
        this.submit = page.locator('button[type="submit"]');
    }

    async goto() {
        await this.page.goto('https://staging.alt.art/login');
    }

    async fillForm(email,password) {
        await this.email.fill(email)
        await this.password.fill(password)
        await this.submit.click()
        await this.page.waitForURL('https://staging.alt.art/')
    }
}