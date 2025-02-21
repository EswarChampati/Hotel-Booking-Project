import { NextFunction, Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import validateUserSignUp from "../../../middlewares/validateUserSignUp";

const mockResponse = () => {
  const res = {} as Response;
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn();
  return res;
};
describe("validate user SignUp", () => {
  it("Should call the next Function if inputis valid", () => {
    const next = vi.fn() as NextFunction;
    const req = {
      body: {
        email: "Eswar@gmail.com",
        firstName: "Eswar",
        lastName: "Champati",
        password: "12345678",
      },
    };
    const res = mockResponse();
    validateUserSignUp(req as Request, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
  it("Should call the not call the next() Function if input is invalid", () => {
    const next = vi.fn() as NextFunction;
    const req = {
      body: {
        email: "Eswar123",
        firstName: "Eswar",
        lastName: "Champati",
        password: "12345678",
      },
    };
    const res = mockResponse();
    validateUserSignUp(req as Request, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });
});
