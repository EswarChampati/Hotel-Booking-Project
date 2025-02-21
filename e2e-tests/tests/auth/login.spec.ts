import { expect, test } from "../fixtures/auth.fixture";
import { login } from "../helpers/auth.helper";

test.describe("Login functionality", () => {
  const UI_URL = "http://localhost:5173/";

  test("Should login when correct credentials are provided", async ({
    page,
    authUser,
  }) => {
    await login(page, authUser.email, authUser.password);

    await expect(
      page.getByRole("button", { name: "My Booking" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "My hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "logout" })).toBeVisible();

    await page.reload();
    await expect(
      page.getByRole("button", { name: "My Booking" })
    ).toBeVisible();
  });

  test("Should not login if credentials are invalid", async ({ page }) => {
    await page.goto(UI_URL);
    await page.getByRole("button", { name: "Login" }).click();

    await page.locator("[name=email]").fill("eswar@gmail.com");
    await page.locator("[name=password]").fill("wrongpassword");
    await page.getByTestId("login button").click();

    await expect(page.locator("text=Password dont match")).toBeVisible();
  });

  test("Should not allow login with empty fields", async ({ page }) => {
    await page.goto(UI_URL);
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByTestId("login button").click();

    await expect(page.locator("text=Email field is required")).toBeVisible();
    await expect(page.locator("text=Password field is required")).toBeVisible();
  });

  test("Password show and hide functionality", async ({ page }) => {
    await page.goto(UI_URL);
    await page.getByRole("button", { name: "Login" }).click();

    let passwordField = await page.locator("[name=password]");
    expect(await passwordField.getAttribute("type")).toBe("password");

    await page.getByTestId("FaEye").click();
    expect(await passwordField.getAttribute("type")).toBe("text");

    await page.getByTestId("FaEyeSlash").click();
    expect(await passwordField.getAttribute("type")).toBe("password");
  });
});
