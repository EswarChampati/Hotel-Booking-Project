import { describe, expect, it } from "vitest";
import signInSchema from "../../../validations/v1/signin.validator";
import { PASSWORD_MIN_LENGTH } from "../../../constants/errorMessage";

describe("SigninSChema", () => {
  it("Should pass the validations for valid email and password", () => {
    const inputData = {
      email: "eswar@gmail.com",
      password: "password123",
    };
    const result = signInSchema.safeParse(inputData);
    expect(result.success).toBeTruthy();
    expect(result.data).toEqual(inputData);
  });
  it("Should fail if email is missing", () => {
    const inputData = {
      password: "password123",
    };
    const result = signInSchema.safeParse(inputData);
    expect(result.success).toBeFalsy();
    expect(result.error?.format()).toHaveProperty("email");
  });
  it("Should fail if email is less than 8 or more than 16 character", () => {
    const inputData = {
      email: "eswar@gmail.com",
      password: "passwor",
    };
    const result = signInSchema.safeParse(inputData);
    expect(result.success).toBeFalsy();
    expect(result.error?.format()).toHaveProperty("password");
  });
});
