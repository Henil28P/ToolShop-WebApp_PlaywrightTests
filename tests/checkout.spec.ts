import { test, expect } from "@playwright/test";

test.describe("Checkout challenge", async () => {
    // Use the storageState from the .auth/customer01.json which is what gets generated in our auth.setup.ts file
    test.use({ storageState: "ToolShop-WebApp_PlaywrightTests/.auth/customer01.json" });
});