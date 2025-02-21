import { Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userModel from "../../../models/User.model";
import bcrypt from "bcryptjs";
import * as jwtConfig from "../../../config/jwt.config";
import Login from "../../../controllers/v1/signin.controller";
import httpStatusCode from "../../../constants/httpStatusCode";
import {
  INVALID_INPUT,
  PASSWORD_MISMATCH,
} from "../../../constants/errorMessage";

describe("Sign in Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        email: "Eswar@gmail.com",
        password: "12345678",
      },
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      cookie: vi.fn().mockReturnThis(),
    } as Partial<Response>;

    vi.clearAllMocks();
  });

  it("should return 401 and invalid input data if user is not found", async () => {
    vi.spyOn(userModel, "findOne").mockResolvedValue(null);

    await Login(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(httpStatusCode.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({ msg: INVALID_INPUT });
  });

  it("should return 401 and password mismatch if password is invalid", async () => {
    const mockUser = {
      _id: "123",
      email: "Eswar@gmail.com",
      password: "hashedPassword",
    };

    vi.spyOn(userModel, "findOne").mockResolvedValue(mockUser);
    vi.spyOn(bcrypt, "compare").mockImplementation(() =>
      Promise.resolve(false)
    );

    await Login(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(httpStatusCode.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({ msg: PASSWORD_MISMATCH });
  });

  it("should return 200 and user data if login is successful", async () => {
    const mockUser = {
      _id: "123",
      email: "Eswar@gmail.com",
      password: "hashedPassword",
      firstName: "Eswar",
      lastName: "Dev",
    };
    vi.spyOn(userModel, "findOne").mockResolvedValue(mockUser);
    vi.spyOn(bcrypt, "compare").mockImplementation(() => Promise.resolve(true));

    vi.spyOn(jwtConfig, "generateToken").mockImplementation(
      () => "mock-jwt-token"
    );

    await Login(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(httpStatusCode.OK);
    expect(res.cookie).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      _id: mockUser._id,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
    });
  });
});
