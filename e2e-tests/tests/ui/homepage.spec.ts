import test, { expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("Should render the home page properly", async ({ page }) => {
  await page.goto(UI_URL);

  //testing header
  const homeButton = await page.locator("text=Booking.com");
  await homeButton.click();
  await expect(page).toHaveURL(UI_URL);

  const loginButton = page.getByRole("button", { name: "Login" });
  await expect(loginButton).toBeVisible();

  // testing footer
  await expect(
    page.getByRole("link", { name: "Privacy policy" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Terms and Conditions" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Partners" })).toBeVisible();
  await expect(page.getByRole("link", { name: "About" })).toBeVisible();
});
