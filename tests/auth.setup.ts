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

    // Following steps should take you to an authentication place
    // 1. Fill the email
    await page.getByTestId("email").fill(email);

    // 2. Fill the password field
    await page.getByTestId("password").fill(password);

    // 3. Click the submit button
    await page.getByTestId("login-submit").click();

    // Confirm that the username is logged in successfully using assertion for username appearing in the site
    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");

    // 4. Save the authentication file
    await context.storageState({ path: customer01AuthFile }); // when this runs, it'll create the folder .auth, then create the file customer01.json file and within this file is all the cookie info that that customer01 browser session has
    // Make sure to include the .auth folder in the .gitignore file for it to be ignored as it will change everytime a new user is logged in to the ToolShop system
    // and a new .json file will be created in the .auth folder
});