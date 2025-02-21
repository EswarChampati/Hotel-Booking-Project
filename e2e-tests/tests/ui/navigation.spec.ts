import test, { expect } from "@playwright/test";

test("Should verify navigation happens properly", async ({ page }) => {
  const UI_URL = "http://localhost:5173/";
  await page.goto(UI_URL);

  const loginButton = page.getByRole("button", { name: "Login" });
  await loginButton.click();
  await expect(page).toHaveURL(UI_URL + "login");

  const register = page.getByRole("link", {
    name: "Click here to Create an account",
  });
  await register.click();
  await expect(page).toHaveURL(UI_URL + "register");

  const homeButton = await page.locator("text=Booking.com");
  homeButton.click();
  await expect(page).toHaveURL(UI_URL);
});
