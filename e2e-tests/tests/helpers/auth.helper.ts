import { Page, expect } from "@playwright/test";

export async function login(page: Page, email: string, password: string) {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL("http://localhost:5173/login");

  await page.locator("[name=email]").fill(email);
  await page.locator("[name=password]").fill(password);
  await page.getByTestId("login button").click();

  await expect(page).toHaveURL("http://localhost:5173/");
  await expect(page.locator("text=Login Successful")).toBeVisible();
}

export async function logout(page: Page) {
  await page.getByRole("button", { name: "logout" }).click();
  await expect(page.locator("text=Sign Out!")).toBeVisible();
}
