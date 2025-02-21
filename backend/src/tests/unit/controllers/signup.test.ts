import { Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import userModel from "../../../models/User.model";
import registerUser from "../../../controllers/v1/signup.controller";
import httpStatusCode from "../../../constants/httpStatusCode";
import { USER_ALREADT_EXISTS } from "../../../constants/errorMessage";
import * as JWTConfig from "../../../config/jwt.config";
import { COOKIE_SETTINGS } from "../../../constants/cookies";

vi.mock("../../../models/User.model");
vi.mock("../../../config/jwt.config");

describe("Signup component testing", () => {
  const mockResponse = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnThis();
    res.json = vi.fn().mockReturnThis();
    res.cookie = vi.fn().mockReturnThis();
    return res;
  };
  it("Should conflict if user already exists", async () => {
    const req = {
      body: {
        email: "eswar@gmail.com",
        firstName: "Eswar",
        lastName: "Champati",
        password: "password123",
      },
    } as Partial<Request> as Request;
    const res = mockResponse();

    userModel.findOne = vi.fn().mockResolvedValue({ email: "eswar@gmail.com" });
    await registerUser(req, res);
    expect(res.status).toHaveBeenCalledWith(httpStatusCode.CONFLICT);
    expect(res.json).toHaveBeenCalledWith({ msg: USER_ALREADT_EXISTS });
  });

  it("should create a new user, generate token, set cookie, and return created user", async () => {
    const req = {
      body: {
        email: "eswar@gmail.com",
        firstName: "Eswar",
        lastName: "Champati",
        password: "password123",
      },
    } as Partial<Request> as Request;
    const res = mockResponse();
    userModel.findOne = vi.fn().mockResolvedValue(null);
    const mockCreatedUser = { _id: "123", ...req.body };
    userModel.create = vi.fn().mockResolvedValue(mockCreatedUser);
    vi.spyOn(JWTConfig, "generateToken").mockReturnValue("MockToken");

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(httpStatusCode.CREATED);
    expect(res.json).toHaveBeenCalledWith(mockCreatedUser);
    expect(res.cookie).toHaveBeenCalledWith(
      COOKIE_SETTINGS.authCookie.name,
      "MockToken",
      {
        httpOnly: COOKIE_SETTINGS.authCookie.httpOnly,
        secure: COOKIE_SETTINGS.authCookie.secure,
        maxAge: COOKIE_SETTINGS.authCookie.maxAge,
      }
    );
  });
});
