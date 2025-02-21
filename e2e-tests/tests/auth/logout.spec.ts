import { test, expect } from "../fixtures/auth.fixture";
import { login, logout } from "../helpers/auth.helper";

test("Should logout successfully", async ({ page, authUser }) => {
  await login(page, authUser.email, authUser.password);
  await logout(page);

  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "My Bookings" })
  ).not.toBeVisible();
});
