import test, { expect } from "@playwright/test";

test("Should logout sucessfully", async ({ page }) => {
  const UI_URL = "http://localhost:5173/";
  await page.goto(UI_URL);

  //login first

  await page.getByRole("button", { name: "Login" }).click();
  await page.locator("[name=email]").fill("eswar@gmail.com");
  await page.locator("[name=password]").fill("12345678");
  await page.getByTestId("login button").click();

  await expect(page).toHaveURL(UI_URL);
  await expect(page.getByRole("button", { name: "logout" })).toBeVisible();

  await page.getByRole("button", { name: "logout" }).click();

  await page.locator("text=Sign Out!");
  await expect(page).toHaveURL(UI_URL);
  await expect(
    page.getByRole("button", { name: "My Bookings" })
  ).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "My hotels" })
  ).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
