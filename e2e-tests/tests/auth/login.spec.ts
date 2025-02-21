import test, { expect } from "@playwright/test";

test.describe("Login functionality", () => {
  const UI_URL = "http://localhost:5173/";
  test("Should login when correct credentials are provided", async ({
    page,
  }) => {
    await page.goto(UI_URL);
    const loginButton = await page.getByRole("button", { name: "Login" });
    await loginButton.click();
    await expect(page).toHaveURL(UI_URL + "login");
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    await page.locator("[name=email]").fill("eswar@gmail.com");
    await page.locator("[name=password]").fill("12345678");
    await page.getByTestId("login button").click();

    await expect(page).toHaveURL(UI_URL);
    await expect(page.locator("text=Login Successful")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "My Booking" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "My hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "logout" })).toBeVisible();

    page.reload();
    await expect(
      page.getByRole("button", { name: "My Booking" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "My hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "logout" })).toBeVisible();
  });

  test("Should not login if credentials are invalid", async ({ page }) => {
    await page.goto(UI_URL);
    const loginButton = await page.getByRole("button", { name: "Login" });
    await loginButton.click();
    await expect(page).toHaveURL(UI_URL + "login");
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    await page.locator("[name=email]").fill("eswar@gmail.com");
    //incorrect password
    await page.locator("[name=password]").fill("123456789");
    await page.getByTestId("login button").click();

    await expect(page.locator("text=Password dont match")).toBeVisible();

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("Should not allow login with the empty feilds", async ({ page }) => {
    await page.goto(UI_URL);
    await page.getByRole("button", { name: "Login" }).click();

    await page.getByTestId("login button").click();
    await expect(page.locator("text=Email field is required")).toBeVisible();
    await expect(page.locator("text=Password field is required")).toBeVisible();

    await page.locator("[name=email]").fill("eswar@gmail.com");
    await page.getByTestId("login button").click();
    await expect(page.locator("text=Password field is required")).toBeVisible();
  });

  test("Password show and hide functionality", async ({ page }) => {
    await page.goto(UI_URL);
    await page.getByRole("button", { name: "Login" }).click();

    let passwordFeild = await page.locator("[name=password]");
    let type = await passwordFeild.getAttribute("type");
    expect(type).toBe("password");

    await page.getByTestId("FaEye").click();
    passwordFeild = await page.locator("[name=password]");
    type = await passwordFeild.getAttribute("type");
    expect(type).toBe("text");

    await page.getByTestId("FaEyeSlash").click();
    passwordFeild = await page.locator("[name=password]");
    type = await passwordFeild.getAttribute("type");
    expect(type).toBe("password");
  });
});
