import { test, expect } from "@playwright/test" // to interact with test and expect in this ToolShop's home page test

// Playwright test for title verification of home page
test("Home page", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/"); // 'goto' command allows testers to go and browse the site

    // Ensure the sign in link is present
    // 1. Open up the site, right-click on "Sign In" link on top right in nav bar and click "Inspect" to open Developer tools and note down the data-test's value
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");

    // Check the title of the page
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0") // tests the title present in the tab of the web
});