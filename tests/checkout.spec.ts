import { test, expect } from "@playwright/test";

test.describe("Checkout challenge", async () => {
    // Use the storageState from the .auth/customer01.json which is what gets generated in our auth.setup.ts file
    test.use({ storageState: "ToolShop-WebApp_PlaywrightTests/.auth/customer01.json" });


    // Let the page to go to the ToolShop website
    test.beforeEach(async ({ page }) => {
        await page.goto("https://practicesoftwaretesting.com");
    });

    // Test for automating checkout process
    test("Buy now pay later", async ({ page, headless }) => {
        await page.getByText("Claw Hammer with Shock Reduction Grip").click(); // Find the Claw Hammer
        await page.getByTestId("add-to-cart").click(); // Add the Claw Hammer to cart
        await expect(page.getByTestId("cart-quantity")).toHaveText("1"); // Make an assertion to validate the cart quantity is 1
        await page.getByTestId("nav-cart").click(); // Click on the nav-cart (cart icon on nav bar to check the cart)
        await page.getByTestId("proceed-1").click(); // Complete the 1st part of checkout process (cart)
        await page.getByTestId("proceed-2").click(); // Complete the 2nd part of checkout process (sign in page)
        await expect(
            page.locator(".step-indicator").filter({ hasText: "2" })
        ).toHaveCSS("background-color", "rgb(51,153,51)"); // Validate the background color of the Sign In circle is green and it has "2" as its step number
        // Fill out the billing address info
        await page.getByTestId("address").fill("123 Testing Way");
        await page.getByTestId("city").fill("Sacramento");
        await page.getByTestId("country").fill("USA");
        await page.getByTestId("postcode").fill("98765");
        await page.getByTestId("proceed-3").click(); // Click next after filling all billing address info
        await expect(page.getByTestId("finish")).toBeDisabled(); // A negative test that by default the Confirm button should be disabled (not be active) on the 4th step without selecting a payment option
        await page.getByTestId("payment-method").selectOption("By now pay later"); // Select this option from the dropdown field
        await page
        .getByTestId("monthly_installments")
        .selectOption("6 Monthly Installments"); // Select "6 Monthly Installments" option from the new dropdown pops up upon selecting the "By now pay later" option from previous dropdown field
        await page.getByTestId("finish").click(); // Now click the finish button which as it enables the button upon selecting payment method
        await expect(page.locator(".help-block")).toHaveText("Payment was successful"); // confirm the payment was successful by the success text shown on screen

        // Headless lets us know if we're running the test with the browser open or closed in behind the scene (it's a ternary operator as shown by ?)
        headless
            // when headless is false, it will skip the following test after ? and jump straight to the console.log statement
            ? await test.step("Visual test", async() => {
                await expect(page).toHaveScreenshot("checkout.png", {
                    mask: [page.getByTitle("Practice Software Testing - Toolshop")],
                });
            })
        : console.log("Running in Headed mode, no screenshot comparison");
        // Screenshot comparison is different if running in headless mode vs. running in browser, specifically if using VS code extension to run test opening the browser, your visual comparisons are going to be pixels off which may be frustrating.
    });
});

// API tests for search item process
test.describe("API process", async () => {

    // Validate the Thor Hammer by getting the ID and then make a GET request against that product ID
    test("GET /products/{id}", async ({ request }) => {
        const apiUrl = "https://api.practicesoftwaretesting.com"; // shown in the Network tab of the Dev tools of site
        // type "Thor Hammer" in search bar on site and observe the Headers tab in the Network tab of Dev tools after clicking "Search" button and see the API Request URL
        // To see the Thor Hammer's API generated data, see the Preview tab in the Network tab and note the ID
        // Then, on the site filtered results of the "Thor Hammer", click the product to generate a new API request and then see the Headers tab of the product's ID and then see the Preview tab to get this API request info
        // Therefore, 2 API calls in the test: 1st for getting the ID and 2nd to do the assertions
        const getProductResponse = await request.get(
            apiUrl + "/products/search?q=thor%20hammer"
        ); // make the 1st API request by request.get()
        expect(getProductResponse.status()).toBe(200); // confirm status code of product response (Thor Hammer's) to be 200
        const productBody = await getProductResponse.json(); // get the product info
        // create productId variable and get the 1st item in the productBody array and set the id to the productId variable
        const productId = productBody.data[0].id;

        // Make the 2nd API call
        const response = await request.get(apiUrl + "/products/" + productId); // pass the productId to the GET request

        expect(response.status()).toBe(200); // verify status code of response to be 200
        const body = await response.json(); // set the body variable to the response body

        // Validate expected items values of response body using assertions
        expect(body.in_stock).toBe(true);
        expect(body.is_location_offer).toBe(false);
        expect(body.is_rental).toBe(false);
        expect(body.name).toBe("Thor Hammer");
        expect(body.price).toBe(11.14);
    });
});