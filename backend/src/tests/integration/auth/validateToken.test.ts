import { describe, expect, it } from "vitest";
import { generateToken } from "../../../config/jwt.config";
import request from "supertest";
import app from "../../../app";
import { ROUTES } from "../../../constants/routes";
import { COOKIE_SETTINGS } from "../../../constants/cookies";
import httpStatusCode from "../../../constants/httpStatusCode";
import { AUTHENTICATION_REQUIRED } from "../../../constants/errorMessage";

describe("GET /api/v1/auth/valiateToken", () => {
  const validUserId = "12345678";
  const validtoken = generateToken({ userId: validUserId });
  it("Should return 200 status code and userId when token is valid", async () => {
    const response = await request(app)
      .get(ROUTES.API.V1.BASE + ROUTES.API.V1.AUTH.VALIDATE_TOKEN)
      .set("Cookie", `${COOKIE_SETTINGS.authCookie.name}=${validtoken}`);
    expect(response.status).toBe(httpStatusCode.OK);
    expect(response.body).toHaveProperty("userId", validUserId);
  });

  it("should return 401 Unauthorized when no token is provided", async () => {
    const response = await request(app).get(
      ROUTES.API.V1.BASE + ROUTES.API.V1.AUTH.VALIDATE_TOKEN
    );

    expect(response.status).toBe(httpStatusCode.UNAUTHORIZED);
    expect(response.body).toHaveProperty("message", AUTHENTICATION_REQUIRED);
  });

  it("should return 401 Unauthorized when an invalid token is provided", async () => {
    const invalidToken = "invalid.token.string";

    const response = await request(app)
      .get(ROUTES.API.V1.BASE + ROUTES.API.V1.AUTH.VALIDATE_TOKEN)
      .set("Cookie", `${COOKIE_SETTINGS.authCookie.name}=${invalidToken}`);

    expect(response.status).toBe(httpStatusCode.UNAUTHORIZED);
    expect(response.body).toHaveProperty("message", AUTHENTICATION_REQUIRED);
  });
});
