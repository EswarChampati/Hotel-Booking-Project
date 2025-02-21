import test, { expect } from "@playwright/test";

test.describe("Register functionality", () => {
  const UI_URL = "http://localhost:5173/";

  test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL + "register");
  });

  test("Successful creation of the user", async ({ page }) => {
    const testEmail = `eswar${Date.now()}@gmail.com`;

    await expect(
      page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible();

    await page.getByPlaceholder("Enter the First Name").fill("Eswar");
    await page.getByPlaceholder("Enter the Last Name").fill("Champati");
    await page.getByPlaceholder("Enter the Email Address").fill(testEmail);
    await page.getByPlaceholder("Enter the password").nth(0).fill("12345678");
    await page.getByPlaceholder("Re-Enter the password").fill("12345678");

    await page.getByRole("button", { name: "Create User" }).click();
    await expect(page.locator("text=user Created")).toBeVisible();
    expect(page).toHaveURL(UI_URL);
    await expect(
      page.getByRole("button", { name: "My Booking" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "My hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "logout" })).toBeVisible();
  });

  test("Should not allow login with the empty feilds", async ({ page }) => {
    await page.getByRole("button", { name: "Create User" }).click();
    await expect(
      page.locator("text=FirstName field is required")
    ).toBeVisible();
    await expect(page.locator("text=LastName field is required")).toBeVisible();
    await expect(page.locator("text=Email field is required")).toBeVisible();
    await expect(
      page.locator("text=Password field is required").nth(0)
    ).toBeVisible();
    await expect(
      page.locator("text=Confirm-Password field is required")
    ).toBeVisible();
  });

  test("Should not allow login with the mismatched passwords", async ({
    page,
  }) => {
    await page.getByPlaceholder("Enter the First Name").fill("Eswar");
    await page.getByPlaceholder("Enter the Last Name").fill("Champati");
    await page
      .getByPlaceholder("Enter the Email Address")
      .fill("eswar@gmail.com");
    await page.getByPlaceholder("Enter the password").nth(0).fill("12345678");
    await page.getByPlaceholder("Re-Enter the password").fill("87654321");

    await page.getByRole("button", { name: "Create User" }).click();
    await expect(page.locator("text=Passwords don't match")).toBeVisible();
  });
});
