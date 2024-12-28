import { test, expect } from "@playwright/test" // to interact with test and expect in this ToolShop's home page test

// Playwright test for title verification of home page
// Refactor and structure the test code using "describe" block used to group tests together
// Before All, Before Each, After Each blocks - these are things that can be run within the describe block outside of a test context
// Then, split up test into different checks
test.describe("Home page with no auth", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://practicesoftwaretesting.com/"); // 'goto' command allows testers to go and browse the site
    });

    // Visual test for no auth
    test("visual test", async ({ page }) => {
        await expect(page).toHaveScreenshot("home-page-no-auth.png");
        // Execute only this test starting on line 13 by "$ npx playwright test tests/home.spec.ts:13"
    });

    // Ensure the sign in link is present
    test("Check sign in", async ({ page }) => {

        // 1. Open up the site, right-click on "Sign In" link on top right in nav bar and click "Inspect" to open Developer tools and note down the data-test's value
        await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
    });

    // Check and validate the title of the page
    test("Validate page title", async ({ page }) => {
        await expect(page).toHaveTitle(
            "Practice Software Testing - Toolshop - v5.0"
        ); // tests the title present in the tab of the web
        // Important to note when writing Playwright tests - for every test block, you have a brand new browser context (think of it like a clean web browser with no history, no cookies) - this prevents you from having a lot of flaky tests in the future
        // To handle this scenario, we can use "before all" block or "before each" - for this specific scenario, we will need a "before each" block
    });

    // Check the count of items displayed - Expect 9 items are displayed initially in the home page
    // Consider: What kind of div each of the items are in or where are they in the DOM? How can we find them? - use the Developer tools hover functionality and hover over each element to inspect it
    // Use the Legacy locator pattern (the . in .col-md-9 indicates the class name)
    test("Grid loads with 9 items initially", async ({ page }) => {
        const productGrid = page.locator(".col-md-9"); // The const syntax will set productGrid as a variable which can never change
        await expect(productGrid.getByRole("link")).toHaveCount(9); // Withint he product grid, go get all the links (<a> tags) and we expect that that should have a count of 9
        // We can also use a non-locator assertion for the above
        expect(await productGrid.getByRole("link").count()).toBe(9);
    });

    // Search for "Thor Hammer" (action) and check the result in the grid (assertion)
    test("Searching for Thor Hammer", async ({ page }) => {
        const productGrid = page.locator(".col-md-9"); // The const syntax will set productGrid as a variable which can never change
        await page.getByTestId("search-query").fill("Thor Hammer"); // Fill the search field with "Thor Hammer"
        await page.getByTestId("search-submit").click(); // Click the search button
        await expect(productGrid.getByRole("link")).toHaveCount(1); // Ensures that only 1 product result is shown in the productGrid which is Thor Hammer
        await expect(page.getByAltText("Thor Hammer")).toBeVisible(); // The AltText of the image can be our locator to test appearance of Thor Hammer tool picture in the product grid
    });
});

// So far we are able to save the browser context, but now how do we use that in our test:
test.describe("Home page customer 01 auth", () => {

    test.use({ storageState: "ToolShop-WebApp_PlaywrightTests/.auth/customer01.json" });

    test.beforeEach(async ({ page }) => {
        await page.goto("https://practicesoftwaretesting.com/");
    });

    test("visual test authorized", async ({ page }) => {
        await expect(page).toHaveScreenshot("home-page-customer01.png");
        // To ensure this test doesn't fail when running initially, run the command: # npx playwright test tests/home.spec.ts --update-snapshots
        // It will regenerate snapshots for any of these assertions by default and it will create a new one but won't fail on first run
    });

    test("check customer 01 is signed in", async ({ page }) => {
        await expect(page.getByTestId("nav-sign-in")).not.toBeVisible(); // to verify the "Sign in" hypertext is not present anymore as the customer 01 is already logged in now
        await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe"); // to verify the customer name is logged in and their name appears in place of "Sign in" hypertext
    });
});

// To run all the above tests together in the same file, use "$ npx playwright test"
// From here, we have a pattern to follow and we could create an admin setup step, a customer O2 setup step or any other username and password combination we wish to create