import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import app from "../../../app";
import { ROUTES } from "../../../constants/routes";
import userModel from "../../../models/User.model";
import {
  INVALID_INPUT,
  USER_ALREADT_EXISTS,
} from "../../../constants/errorMessage";

describe("Post /register", () => {
  it("Should register the user successfully", async () => {
    const userBody = {
      email: "eswar@gmail.com",
      firstName: "Eswar",
      lastName: "Champati",
      password: "password123",
    };
    const res = await request(app)
      .post(ROUTES.API.V1.BASE + ROUTES.API.V1.AUTH.REGISTER)
      .send(userBody)
      .expect(201);

    expect(res.body.email).toBe(userBody.email);
    expect(res.body.firstName).toBe(userBody.firstName);
    expect(res.body.lastName).toBe(userBody.lastName);
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("should return 409 if the user already exists", async () => {
    const userData = {
      email: "Eswar@gmail.com",
      firstName: "Eswar",
      lastName: "Champati",
      password: "123456789",
    };

    await userModel.create(userData);

    const response = await request(app)
      .post(ROUTES.API.V1.BASE + ROUTES.API.V1.AUTH.REGISTER)
      .send(userData)
      .expect(409);

    expect(response.body.msg).toBe(USER_ALREADT_EXISTS);
  });

  it("should return 400 for invalid input", async () => {
    const invalidUserData = {
      email: "invalid-email",
      firstName: "Test",
      lastName: "User",
      password: "short",
    };

    const response = await request(app)
      .post(ROUTES.API.V1.BASE + ROUTES.API.V1.AUTH.REGISTER)
      .send(invalidUserData)
      .expect(400);

    expect(response.body.msg).toBe(INVALID_INPUT);
  });
});
