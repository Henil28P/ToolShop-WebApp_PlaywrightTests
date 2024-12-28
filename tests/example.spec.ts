import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

// Can run this specific test by `$ npx playwright test --grep @first` which should only run the @first tag in the test
// To run all the tests EXCEPT for the test with @first tag: `$ npx playwright test --grep-invert @first`
test('get started link', {tag: "@first"}, async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
