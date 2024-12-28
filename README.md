# ToolShop-WebApp_PlaywrightTests

A Playwright Automation Software Testing project for ToolShop Web Application to test its functionalities of features and user interaction components on the web

# Website under test:

- It's always a good idea to take some time and explore the website we plan to automate and understanding the site under test will make it easier as we start automating certain actions in the site.
- Link: https://practicesoftwaretesting.com - ToolShop E-commerce website for tools
- Useful site for practicing software testing

Features:

- Filter tools by brand, wrenches
- Sign in/Log in page (sample login details are in https://github.com/testsmith-io/practice-software-testing in README file and also has different versions of website such as bug version, clean version, etc.)
- Add tool to cart option
- Increase/Decrease quantity, enter billing details (address, postal code), payment method, click "Confirm"

# Playwright

- Playwright is an open-source tool built by Microsoft that enables reliable end-to-end UI and API automation testing for modern web apps (such as this project of ToolShop).
- Playwright provides access to multiple browsers including Chromium, Chrome, Microsoft Edge, Firefox, Webkit (Safari) - every Playwright release will have a set version of each of these browsers bundled when installing Playwright.

What makes Playwright special?

- Highly rated on GitHub (66,000+ stars)
- Monthly release cycle
- Languages supported: TypeScript, JavaScript, Python, .NET, Java (as well as Ruby/Go) - this project focuses on `TypeScript`
- Playwright is closer to Selenium WebDriver than Cypress - because Playwright is an out-of-process automation driver that is not limited by the scope of in-page JavaScript execution (this is one of the Cypress limitations).
- Playwright drives the browser that's being used from the outside like Selenium WebDriver rather than being baked into the browser.
- Playwright can be used as a `library` or as a `test framework` - this project will be focusing on covering the Playwright test framework.

What is Playwright Test?

- Built-in test runner with similar syntax to Jest - this allows you to build out test steps using Playwright-specific syntax.
- Ability to run tests in parallel with the ability to enable retries with no cost restrictions.
- Useful built-in reporters to view detailed test runs, screenshots, videos, and a trace viewer that show the exact state of the browser was in when the test was running.
- There's also a VS Code extension to help in building, maintaining and debugging tests all within VS Code.

Why Choose Playwright over any other tool?

- Playwright has the ability to run API and UI regression tests in the same framework unlike other test tools.
- The rich feature set that comes built in to Playwright.
- Excellent error handling when tests fail
- Flexibility provided when project configurations.
- Locators auto-waiting and retry-ability.
- Therefore, using Playwright for regression testing can give you confidence in future software releases - we want to ensure we have high-quality releases and Playwright allows testers to do this.

# Set and build up the project development environment

1. Installing Node

- Can download from the Node Prebuilt installer --> https://nodejs.org/en/download/prebuilt-installer
- After installing Node, enter `$ node --version` command on a CLI to check the version of the recently downloaded Node

2. Installing Playwright through the terminal commands

- Install Playwright with Node Package Manager (npm) using the command `$ npm init playwright@latest` and press "Enter" key
- Then, press Enter everytime for each question with the following values: TypeScript for Q1, tests for Q2, False for Q3, true for Q4 - can take 3 or 4 minutes to install all the browsers used by Playwright.
- Run the test by `$ npx playwright test` and press Enter - this will kick off all the tests

One of the main ways that Playwright tests are run is through the CLI.
A full list of Playwright test commands can be found at https://playwright.dev/docs/test-cli

- Note: Any options passed into the Playwright command when running from the CLI will override any configuration settings that are set in the Playwright config (playwright.config.ts).

- `$ npx playwright test --headed` --> run all the tests in headed mode meaning the browsers will pop up and tester will be able to see the actions (this will override the setting defined in the playwright.config.ts file which is "headless: true" and this setting will be ignored)
- `$ npx playwright test --project chromium` --> will only run the chromium project (2 tests) instead of for all 3 projects (Webkit and Firefox are excluded which reduces 6 total tests running to only 2 running)
- `$ npx playwright test --project chromium --project firefox` --> will only run 4 tests instead of 6 (as it excludes the Webkit project's 2 tests)

Another thing nice about the `--project` option is that it's an argument and can be matched to regular expressions.

- For example: `$ npx playwright test --project "\*omium"`

There are some useful commands that can come in handy as the Playwright project grows:

- For example: you can narrow down your runs further by running all the tests within a specific file (eg. `example.spec.ts`) and run only the tests in this file:
  --> `$ npx playwright test tests/example.spec.ts`
- You can also run a specific test from that file by specifying the line number of the test start in the file. --> `$ npx playwright test tests/example.spec.ts:10` where 10 is to indicate only run the test starting on 10th line in the test file.
- The `grep` option allows you to not group a group of tests in the same folder but you wish to run them all together.
  Firstly, categorise those tests using the Playwright's tagging functionality.

# Overview of the package.json file

- It's a file that gets generated as a part of the initialization of a project - cookbook for your project.
- It tells you what packages and versions should be installed in the "node_modules" directory (ignored by .gitignore).
- Features:

1. All the `npm` commands ran from the command line, those are commands that use the NPM CLI (eg. `npm install` - this command creates and updates the "package-lock.json" file and it installs all the different libraries in the "node_modules" folder).

- For test automation frameworks in general, there are 2 areas of the package.json that matter most:

1. `devDependencies` - where new packages will get installed and you can manage the versions of these packages (eg. when Playwright 48 gets released, you can update the version of "@playwright/test" key from "^1.47.2" to "^1.48.2") --> then save the file and do `$ npm install` and it will install the latest version of Playwright.
2. `scripts` section in package.json - allows testers to create an alias for longer commands to be run from the terminal making testers and developers lives easier as the project grows.

- For example: in the package.json file, add a "test" alias in the `scripts` section and assign its value as `npx playwright test` --> save the file --> type `$ npm run test` will run that command defined in the test alias.
- Another example: in the package,json file, add a "test:chromium" alias in the `scripts` section and assign its value as `npx playwright test:chromium` --> save the file --> type `$ npm run test:chromium` will run that command defined in the test:chromium alias.

- Hence having scripts built and stored in the package.json file will empower developers and testers and CI pipelines to the project have easy access in specific ways to run your automated tests.

# Generating tests with codegen

- Code Generator (codegen) - helps testers give a headstart by recording locators that theey interact with to built out their first test from scratch against the website that they are testing against (eg. ToolShop E-commerce web).
- To run the Codegen tool, run the command: `$ npx playwright codegen` --> 2 windows will pop up (1. Playwright inspector which is where all the code will be generated to and 2. Chrome browser where we can browse the web page).

# Overview of locator strategies in Playwright

- Much like other test automation tools, Playwright is able to interact with the DOM (Document Object Model). In many cases, the DOM will look different than the original HTML as the DOM includes anu JavaScript modifications.
- The DOM is what is viewable when you use Chrome Dev tools and look in the "Elements" tab.
- Playwright interacts with a DOM using 2 types of locators:

1. Recommended built-in locators
2. Legacy locators which include things like CSS selectors, and XPATH.

- Different types of locators and some examples

1. `page.getByRole()` - eg. `await page.getByRole('button',{ name: 'Sign in' }).click();` --> getting the role button with the name 'Sign in' and clicking the button as the action. Note that if you're interacting with or asserting against an element, you will need the `await` syntax at the beginning of the locator.
2. `page.getByText()` - eg. `await expect(page.getByText('Alex Crisp')).toBeVisible();` --> The element within the DOM we want to interact with has text 'Alex Crisp'. This specific line of test code is expecting this element to be visible. If for some reason an element that was matching this locator didn't exist or was in hidden state, the Playwright test would fail.
3. `page.getByLabel()` - eg. `await page.getByLabel('username').fill('email@test.com')` --> this is typically useful for inputs within applications as labels are used for making websites more accessible. The .fill() method will automatically add the email string into the input box (it uses JS to do this).
4. `page.getByPlaceholder()` -
5. `page.getByAltText()`
6. `page.getByTitle()`
7. `page.getByTestId()` - eg. `await page.getByTestId('nav-sign-in').click()` which will click the "Sign in" button - However, before we cover all the previous, we will need to add `testIdAttribute: 'data-test'` option in the our playwright.config.ts in the "use" section of the "defineConfig" - this is because the ToolShop website being tested uses this as the testID attribute which overwrites the Playwright default.

- The above is a list of built-in locators recommended to use first by the Playwright dev team.

8. `page.locator()` - eg. `await page.locator('[data-test="nav-sign-in"]').click()` - this is the legacy locator pattern/syntax following same thing as previous `page.getByTestId()` and this sets the locator based on the data test ID custom attribute.

- CSS locators --> `await page.locator('css=button').click();` - The CSS locators example allows you to pass any CSS selector after CSS equals. If there is more than 1 button within the DOM, this test would likely fail with an error message letting us know that there were multiple buttons that were matched.
- CSS and matching text --> `await page.locator('article:hastext("Playwright")').click();` - to combine locators, you can use any CSS selector.

- Legacy locators can also have 2 locators when splitting them with a comma (,):

1. Example: Clicks a <button> that has either a "Log in" or "Sign in" text --> `await page.locator('button:has-text("Log in"), button:has-text("Sign in")').click();` - could be useful when writing tests for A/B testing scenarios.

- Using XPath within the legacy locators: `await page.locator('xpath=//button').click();` - usually use it as the last alternative as it's more difficult to maintain and less readable.

Therefore:

1. Use recommended locators - it's a good indication if your website is testable or not.
2. Chain and filter locators - to get to specific elements within the DOM that you want to interact or assert against.
3. Use legacy locators if needed
4. Remember to use `await` when interacting with or asserting against elements.
