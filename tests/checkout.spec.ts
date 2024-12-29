import { test, expect } from "@playwright/test";

test.describe("Checkout challenge", async () => {
    // Use the storageState from the .auth/customer01.json which is what gets generated in our auth.setup.ts file
    test.use({ storageState: "ToolShop-WebApp_PlaywrightTests/.auth/customer01.json" });


    // Let the page to go to the ToolShop website
    test.beforeEach(async ({ page }) => {
        await page.goto("https://practicesoftwaretesting.com");
    });
});