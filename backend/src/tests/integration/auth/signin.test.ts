import { afterEach, beforeEach, describe, expect, it } from "vitest";
import userModel from "../../../models/User.model";
import request from "supertest";
import app from "../../../app";
import { ROUTES } from "../../../constants/routes";
import httpStatusCode from "../../../constants/httpStatusCode";
import { COOKIE_SETTINGS } from "../../../constants/cookies";
import {
  INVALID_INPUT,
  PASSWORD_MISMATCH,
} from "../../../constants/errorMessage";

describe("Post /login", () => {
  let userData: { email: string; password: string };
  beforeEach(async () => {
    userData = {
      email: "Eswar@gmail.com",
      password: "12345678",
    };
    await userModel.create({
      email: userData.email,
      password: userData.password,
      firstName: "Eswar",
      lastName: "Champati",
    });
  });
  afterEach(async () => {
    await userModel.deleteMany();
  });

  it("should return 200 and set a cookie when credentials are valid", async () => {
    const response = await request(app)
      .post(ROUTES.API.V1.BASE + ROUTES.API.V1.AUTH.LOGIN)
      .send({ email: "Eswar@gmail.com", password: "12345678" })
      .expect(httpStatusCode.OK);

    expect(response.body).toEqual({
      _id: expect.any(String),
      firstName: "Eswar",
      lastName: "Champati",
    });

    expect(response.headers["set-cookie"]).toBeDefined();
    expect(response.headers["set-cookie"][0]).toContain(
      COOKIE_SETTINGS.authCookie.name
    );
  });
  it("should return 401 when the user is not found", async () => {
    const res = await request(app)
      .post(ROUTES.API.V1.BASE + ROUTES.API.V1.AUTH.LOGIN)
      .send({
        email: "wrong@gmail.com",
        password: userData.password,
      })
      .expect(httpStatusCode.UNAUTHORIZED);

    expect(res.body).toEqual({ msg: INVALID_INPUT });
  });

  it("should return 401 when the password is incorrect", async () => {
    const res = await request(app)
      .post(ROUTES.API.V1.BASE + ROUTES.API.V1.AUTH.LOGIN)
      .send({
        email: userData.email,
        password: "WrongPassword",
      })
      .expect(httpStatusCode.UNAUTHORIZED);

    expect(res.body).toEqual({ msg: PASSWORD_MISMATCH });
  });
});
