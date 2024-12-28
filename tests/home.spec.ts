import { test, expect } from "@playwright/test" // to interact with test and expect in this ToolShop's home page test

// Playwright test for title verification of home page
test("Home page", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/"); // 'goto' command allows testers to go and browse the site

    // Ensure the sign in link is present
    // 1. Open up the site, right-click on "Sign In" link on top right in nav bar and click "Inspect" to open Developer tools and note down the data-test's value
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");

    // Check the title of the page
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0") // tests the title present in the tab of the web

    // Check the count of items displayed - Expect 9 items are displayed initially in the home page
    // Consider: What kind of div each of the items are in or where are they in the DOM? How can we find them? - use the Developer tools hover functionality and hover over each element to inspect it
    // Use the Legacy locator pattern (the . in .col-md-9 indicates the class name)
    const productGrid = page.locator(".col-md-9"); // The const syntax will set productGrid as a variable which can never change
    await expect(productGrid.getByRole("link")).toHaveCount(9); // Withint he product grid, go get all the links (<a> tags) and we expect that that should have a count of 9
    // We can also use a non-locator assertion for the above
    expect(await productGrid.getByRole("link").count()).toBe(9);
});