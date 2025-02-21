import { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import validateToken from "../../../middlewares/validateToken";
import httpStatusCode from "../../../constants/httpStatusCode";
import { AUTHENTICATION_REQUIRED } from "../../../constants/errorMessage";
vi.mock("../../../config/jwt.config", () => ({
  verifyToken: vi.fn(),
}));

describe("ValidateToken", () => {
  let req: Partial<Request> & { userId?: string } = { cookies: {} };
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { cookies: {} };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as Partial<Response> as Response;
    next = vi.fn();
  });

  it("Should return 401 if token is not present", () => {
    validateToken(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(httpStatusCode.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({ message: AUTHENTICATION_REQUIRED });
    expect(next).not.toHaveBeenCalled();
  });

  it("Should return 401 is token verfication fails", () => {
    req.cookies = { authToken: "invalid token" };
    vi.mock("../../../middlewares/valdiateToken", () => ({
      default: vi.fn(() => {
        throw new Error("Invalid Token");
      }),
    }));
    validateToken(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(httpStatusCode.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({
      message: AUTHENTICATION_REQUIRED,
    });
    expect(next).not.toHaveBeenCalled();
  });

  // it("Should call next() and set userid if token is valid", () => {
  //   vi.mocked(verifyToken).mockReturnValue({ userId: "12345" });
  //   req.cookies = { authToken: "valid-token" };

  //   validateToken(req as Request, res as Response, next);

  //   expect((req as Request).userId).toBe("12345");
  //   expect(next).toHaveBeenCalled();
  // });
});
