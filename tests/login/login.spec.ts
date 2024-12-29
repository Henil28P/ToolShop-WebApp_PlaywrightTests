import { test, expect } from '@playwright/test';
import { LoginPage } from "../../pages/login/loginPage";

test('login test without page object', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="nav-sign-in"]').click();
  await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
  await page.locator('[data-test="password"]').fill('welcome01');
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
  await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
});

// Test follows same steps as above but this time with using the 'login' page object created and using its methods
test("Login test with page object", async ({ page }) => {
  const loginPage = new LoginPage(page); // create a object of loginPage (new instance of LoginPage)
  await loginPage.goto(); // use the goto() method of LoginPage class/page object
  await loginPage.emailInput.fill("customer@practicesoftwaretesting.com");
  await loginPage.passwordInput.fill("welcome01");
  await loginPage.loginButton.click();
  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
});