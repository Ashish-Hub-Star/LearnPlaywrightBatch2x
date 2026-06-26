import { test, expect } from '@playwright/test'

// page - Inbuilt fixture is automatically given to you, 
// which are the functions you can directly use in Playwright. 

test("Verify that the title will be TTA Cart", async ({ page }) => {
  await page.goto("https://app.thetestingacademy.com/playwright/ttacart/");
  await expect(page).toHaveTitle("TTACart - Login");
  await page.waitForTimeout(5000);

});