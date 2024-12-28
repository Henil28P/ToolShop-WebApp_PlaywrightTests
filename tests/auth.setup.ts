// Handle authentication within the system once and saving the state to be used within another tests
import { test as setup, expect } from "@playwright/test";

// Name the setup step as "create customer 01 auth" and need to pass both the page and the context as the browser context is needed to save the storage seat
setup("Create customer 01 auth", async ({ page, context }) => {
    // Create the steps
    // Rather than typing out the email in the test, create a variable
    const email = "customer@practicesoftwaretesting.com";
    const password = "welcome01";
    const customer01AuthFile = ".auth/customer01.json";

    // Log in to the site
    await page.goto("https://practicesoftwaretesting.com/auth/login"); // go directly to the login page rather than home page and then login
})