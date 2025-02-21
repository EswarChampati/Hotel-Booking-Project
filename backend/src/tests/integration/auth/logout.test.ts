import { expect, it } from "vitest";
import { describe } from "vitest";
import request from "supertest";
import app from "../../../app";
import { ROUTES } from "../../../constants/routes";
import userModel from "../../../models/User.model";
import httpStatusCode from "../../../constants/httpStatusCode";
import { COOKIE_SETTINGS } from "../../../constants/cookies";

describe("POST logout functionality", () => {
  it("should clear the auth cookie and return 200 OK on logout", async () => {
    const userData = {
      email: "Eswar@gmail.com",
      password: "12345678",
    };
    await userModel.create({
      email: userData.email,
      password: userData.password,
      firstName: "Eswar",
      lastName: "Champati",
    });

    const loginResponse = await request(app)
      .post(ROUTES.API.V1.BASE + ROUTES.API.V1.AUTH.LOGIN)
      .send({
        email: "Eswar@gmail.com",
        password: "12345678",
      });
    const cookies = loginResponse.headers["set-cookie"];
    expect(cookies).toBeDefined();

    const logoutResponse = await request(app)
      .post(ROUTES.API.V1.BASE + ROUTES.API.V1.AUTH.LOGOUT)
      .set("Cookie", cookies);

    expect(logoutResponse.status).toBe(httpStatusCode.OK);
    const logoutCookies = logoutResponse.headers["set-cookie"];
    expect(logoutCookies).toBeDefined();

    expect(logoutCookies[0]).toContain("Expires=Thu, 01 Jan 1970");
    expect(logoutCookies[0]).toContain(COOKIE_SETTINGS.authCookie.name);
  });
  it("Should return 200  even if no cookie was set previously", async () => {
    const response = await request(app).post(
      ROUTES.API.V1.BASE + ROUTES.API.V1.AUTH.LOGOUT
    );
    expect(response.status).toBe(httpStatusCode.OK);
  });

  it("Should clear cookie after logout even if cookie is not set", async () => {
    const res = await request(app).post(
      ROUTES.API.V1.BASE + ROUTES.API.V1.AUTH.LOGOUT
    );
    expect(res.status).toBe(httpStatusCode.OK);
    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toContain("Expires=Thu, 01 Jan 1970");
  });
});
