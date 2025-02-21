import { describe, expect, it } from "vitest";
import signUpschema from "../../../validations/v1/signup.validator";

describe("SignIn", () => {
  it("Should pass for valid input", () => {
    const inputData = {
      email: "eswar@gmail.com",
      firstName: "Eswar",
      lastName: "Champati",
      password: "password123",
    };
    const result = signUpschema.safeParse(inputData);
    expect(result.success).toBeTruthy();
    expect(result.data).toEqual(inputData);
  });

  it("Should fail for missing required fields", () => {
    const inputData = {
      email: "",
      firstName: "Eswar",
      lastName: "Champati",
      password: "password123",
    };
    const result = signUpschema.safeParse(inputData);
    expect(result.success).toBeFalsy();
    expect(result.error?.format()).toHaveProperty("email");
  });
});
