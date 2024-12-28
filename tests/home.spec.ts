import { test, expect } from "@playwright/test" // to interact with test and expect in this ToolShop's home page test

// Playwright test for title verification of home page
test("Home page", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/"); // 'goto' command allows testers to go and browse the site
});