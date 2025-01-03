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

# Overview of Assertions in Playwright

- Without an assertion to validate what you're expecting, you're not considered testing anything.
- With Playwright, there are 2 general categories of assertions:

1. Locator assertions - are special in that this type of assertion fails, it will automatically get retried until it either passes or it reaches the timeout.
2. Value assertions - will be evaluated in either "pass" or "fail"

- Locator assertions examples:

1. `await expect(locator).toBeVisible()`
2. `await expect(locator).toContainText()`
3. `await expect(locator).toHaveCount()`
4. `await expect(page).toHaveURL()`

- Note that there is `await` before each of the assertions above - this is because we are interacting with and asserting against the browser or the DOM.
  The way this works is that if we are on a page URL and we click a button which submits a form, if there are a few redirects to different URL before landing on the final URL, if we use `await expect(page).toHaveURL()`, we can put the final URL we would expect and the test won't fail immediately if it gets back one of the URLs that are still a part of the redirect process. This can be really useful to ensure that your page is on the correct page before moving on with any further automation.
  This assertion acts as an Implicit Wait in our test.

- Value assertions examples:

1. `expect(value).toBe()`
2. `expect(value).toContain()`
3. `expect(value).toEqual()`
4. `expect(value).toBeTruthy()`
5. `expect(value).toHaveLength()`

- Note that this does not have any `await` syntax in front of any assertions though we may need to await certain values in our test depending on what values are used.
- A full list of assertions can be found in the Test Assertions Documentation: https://playwright.dev/docs/test-assertions

# Handle cookie authentication in Playwright

- Challenge: every test creates a new browser context. How can we quickly and easily get out test into a logged-in state for the tests that require login? Going through the login steps before each step will add a lot of time to our test execution time and it'd be a lot of repeated codde. --> We can instead use some tools to store an authentication state, all within Playwright.
  When setting the Projects section in the `playwright.config.ts` file, with the setup project, we can use this to handle authentication within the system once and saving the state to be used within other tests.

# Visual testing in Playwright

- Another popular way to test web applications.
- The concept here is while the test is in a certain state, you take a screenshot of the page or certain elements on the page and save them as a snapshot - this snapshot is a part of the repository and is used as a baseline image to compare future screenshots against.
- Useful strategy to use depending on the app and context you are testing in.
- For this project, add 2 different visual tests within each "describe" block of `home.spec.ts` test file - the syntax is to add `.toHaveScreenshot` with a name assetion to a test file (1 for auth and 1 for no-auth).

- At times, you may run into an issue where certain fields maybe an ad block is actually not rendering and you may need a way to hide that. 1 way to hide that:

1. Playwright documentation of `toHaveScreenshot(name)`, check out the <b>mask</b> argument where we can specify specific locators that can be masked by default with a pink box but you can also change the colours if you want.

- One other thing you want to do is ensure the browser is in a consistent state before you take screenshot during visual testing - 1 way to help ensure this is by adding in `await page.waitForLoadState` and best option would be <b>network idle</b> as it's a good thing to wait for - it waits for all of the network requests to complete before taking the screenshot, which typically by that time all thee elements on the page will load.

- One caveat to note is that if you are running visual tests in CI servers and they have different OS than the tests you are building the test on or generating the snapshots on, you will have to generate CI-specific snapshots (can be done that through Docker containers - available through the Playwright documentation: https://playwright.dev/docs/test-snapshots)

# API testing in Playwright

- Most modern websites are built with an API-first approach where the business logic lives behind an API.
- The major feature that Playwright supports is the ability to interact with network traffic during a UI test, but it also provides tools to test APIs directly.
- You can use Playwright test framework for both UI and API test, all within the same repository.
- This project focuses on 2 API test examples:

1. GET request
2. POST request

- For more information, the Playwright docs provide even greater detail into the possibilities of what you can do when testing API requests with Playwright: https://playwright.dev/docs/api/class-apirequestcontext

# Automating the right things with Playwright

- It's easy to get carried away and want to automate all the things due to Playwright offerring a lot of the core functionality. However, it's all about automating the right things only - utilise Playwright for its strengths and utilise other tooling for their strengths.
- Different types of test automation that can be done:

1. Unit/component tests
2. API regression tests (Playwright)
3. UI regression tests (Playwright)
4. Smoke tests (Playwright)
5. Performance tests
6. Security tests

Example of a Login Flow model and what happens from a technical perspective:
<img src="">

- This is an example of what happens in a web app when you try and log in.
- From the highest level, you're interacting with the UI entering the username and password.
- JavaScript on the page fires when you press "Submit" - this will send an API request to the API server, potentially with a CSFR token - this may talk to a security service to ensure that you're able to connect to a database, and validate the CSFR token, then a call is made to the database to validate the username and password that they're valid.
  At that point, an access token could be granted giving you access to the site that would get returned in an API response, in a response header or in a body. Typically, the JavaScript on the UI will get this authenticated response and load the authenticated homepage along with any additional information that would be retrieved from the API.
- Where we can focus with Playwright are the interfaces that are exposed to test with, specifically the UI (or the DOM to the database) or through the API all the way down to the database.

# Maintaining Playwright Tests

- The time maintaining an automated test is close to equal of the time it takes to create a specific test.
- Once written, the test is there to provide the testers and developers on the team feedback automatically.
- Typically, most of the maintaining time is looking into the failed tests.
- Failed tests typically fall into 4 different categories:

1. Found a bug - the code we're testing is broken. A bug was introduced that failed our assertion or prevented automation actions from occurring.
2. The system changed, but it was intended - the code we're testing has changed. A change to the system was made but it was intended and we need to update our automated test to acccount for it.
3. Flakey test - this means when your tests pass sometimes and other times, it fails regardless of the state of the website being tested. Typically, the test doesn't follow best practices or web-first assertions.

- Example 1: Like you're making assertion for a value that may not be loaded on the page yet
- Example 2: The test doesn't account for certain actions within the webpage like a page is redirecting or content that dynamically loads after scrolling down a page isn't there to assert against or interact with.
- Example 3: It could be a test is using test data which causes a failure something like an invalid email address or invalid phone number
- Example 4: It also could be a test that may reely on some specific configuration or state of the website that another test might've changed.

4. Flakey infrastructure - the infrastructure that the code is running on is having issues. This could mean the code is fine and the logic in the code is fine but the server is crashing or is causing some network errors.

- Examples: the site may be under too much load and it just crashed OR it could be that the database responses were taking longer than 20 seconds and the test just times out and it failed the test (this could be a bug too) OR it could be a domain name that expired for a test site, etc.

Playwright's rich feature set can help testers maintain their test as their automation project grows.

# Playwright screenshots, videos, and reporters

- As you execute automated tests, it's critical that you inspect the results of each run - by default, Playwright has many built-in test reporters.
- Check the https://playwright.dev/docs/test-reporters to see all built-in reports (also mentioned in the playwright.config.ts)
- After setting "video" and "screenshot" to "on", run `$ npm run test` command in the terminal
- Then, run `$ npx playwright show-report` command to view the HTML reporter and this will open up a HTTP server to quickly view any of the tests and can search by tags, or by projects. You can also click into each of the tests and see all different test steps, screenshot of where the test completed, option to view traces, and see the video (see what was happening on the screen during the test).
- By default, the HTML report is saved to the <b>playwright-report</b> folder - this folder can be uploaded to an S3 bucket or any kind of web server to be vieweable for any of these single test runs.

- Example of a HTML reporter --> `list` reporter - useful when you're debugging tests that are running in parallel or with multiple workers and also visualise what tests are running in a CI environment.
- The list reporter can be useful when debugging tests locally or running tests in CI - you can watch the progress in real time.
- Some other reporters include:

1. Blob reporter - allows you to easily manage parallel runs when running in a CI environment and combine the reports back together.
2. Line reporter -
3. JSON reporter - provides JSON output of the test run.
4. JUnit reporter - most standardised test reporter format in the testing industry. These reports can be imported into many different tools.

- You can also build your own custom reporter or use an existing 3rd party Playwright reporter that exists.

# Scaling Playwright tests

- As your Playwright test automation suite grows, you'll find the need for greater organisation and maintainability is needed within your test.
- You'll also need some strategies in order to abstract away duplicate code and simplify your code as much as possible.
- The abilty to abstract away complex logic from our test files into other files can be done in Playwright using functions that can be used across any of the tests using a page object class or utilising Playwright fixtures.

Running our test automation scripts across multiple environments - can be done using a .env file and update your test with a process.env URL (can be implemented within a page object):

- Before commenting out the importing of dotenv in the `playwright.config.ts` file, install the dotenv module from terminal by the `$ npm install dotenv --save-dev` command to install the .env plugin from it and it'll update the package.json file as it will add a new devDependency of "dotenv" and also installs dotenv information into the "node_modules" folder. Finally, create a new file and name it ".env" in the project root and add `URL=https://practicesoftwaretesting.com` and replace the URL string in the loginPage page object with `process.env.URL` and then run the login spec test with page object to make sure everything passes.

Test knowledge:

1. What command is included in Playwright to view the HTML report after a test run? `$ npx playwright show-report` --> By default, if all tests pass, the HTML report isn't shown. You can use this command to view it. If there is a failure during a test run, this command runs automatically, and the HTML report will pop up on its own.
2. What tools are available when viewing traces through the trace viewer? browser console history, network traffic history, snapshot of the dom, locator selector, playwright logging, playwright step history, a visual timeline, test source code, and light/dark mode.
