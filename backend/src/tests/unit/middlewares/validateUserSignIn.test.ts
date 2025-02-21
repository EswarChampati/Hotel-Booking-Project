import { NextFunction, Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import validateUserSignIn from "../../../middlewares/validateUserSignIn";
import httpStatusCode from "../../../constants/httpStatusCode";
import { INVALID_INPUT } from "../../../constants/errorMessage";

const mockResponse = () => {
  const res = {} as Response;
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn();
  return res;
};
describe("Validate User sign in", () => {
  it("Should call the next if input is valid", () => {
    const next = vi.fn() as NextFunction;
    const res = mockResponse();
    const req = {
      body: {
        email: "Eswar@gmail.com",
        password: "12345678",
      },
    };
    validateUserSignIn(req as Request, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
  it("Should not call the next if input is invalid", () => {
    const next = vi.fn() as NextFunction;
    const res = mockResponse();
    const req = {
      body: {
        email: "Eswar",
        password: "12345678",
      },
    };
    validateUserSignIn(req as Request, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(httpStatusCode.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ msg: INVALID_INPUT });
  });
});
