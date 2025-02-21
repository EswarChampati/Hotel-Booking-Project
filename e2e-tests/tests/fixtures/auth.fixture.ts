import { test as base } from "@playwright/test";

export const test = base.extend<{
  authUser: { email: string; password: string };
}>({
  authUser: async ({}, use) => {
    await use({ email: "eswar@gmail.com", password: "12345678" });
  },
});

export { expect } from "@playwright/test";
