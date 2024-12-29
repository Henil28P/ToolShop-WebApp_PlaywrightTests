import { test, expect } from "@playwright/test";

test.describe("Checkout challenge", async () => {
    // Use the storageState from the .auth/customer01.json which is what gets generated in our auth.setup.ts file
    test.use({ storageState: "ToolShop-WebApp_PlaywrightTests/.auth/customer01.json" });


    // Let the page to go to the ToolShop website
    test.beforeEach(async ({ page }) => {
        await page.goto("https://practicesoftwaretesting.com");
    });

    // Test for automating checkout process
    test("Buy now pay later", async ({ page }) => {
        await page.getByText("Claw Hammer with Shock Reduction Grip").click(); // Find the Claw Hammer
        await page.getByTestId("add-to-cart").click(); // Add the Claw Hammer to cart
        await expect(page.getByTestId("cart-quantity")).toHaveText("1"); // Make an assertion to validate the cart quantity is 1
        await page.getByTestId("nav-cart").click(); // Click on the nav-cart (cart icon on nav bar to check the cart)
        await page.getByTestId("proceed-1").click(); // Complete the 1st part of checkout process (cart)
        await page.getByTestId("proceed-2").click(); // Complete the 2nd part of checkout process (sign in page)
        await expect(
            page.locator(".step-indicator").filter({ hasText: "2" })
        ).toHaveCSS("background-color", "rgb(51,153,51)"); // Validate the background color of the Sign In circle is green and it has "2" as its step numb
    });
});