# ToolShop-WebApp_PlaywrightTests

A Playwright Automation Software Testing project for ToolShop Web Application to test its functionalities of features and user interaction components on the web

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
