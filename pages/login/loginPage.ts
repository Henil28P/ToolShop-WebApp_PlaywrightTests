import { type Locator, type Page } from "@playwright/test";

// Constructor with the locators
export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByTestId("email");
        this.passwordInput = page.getByTestId("password");
        this.loginButton = page.getByTestId("login-submit");
    }

    async goto() {
        await this.page.goto(process.env.URL + "/auth/login");
    }

    async login(email: string, password: string) {
        // input the email and password into their respective fields when 'login' function is called
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click(); // click the login button
    }
}