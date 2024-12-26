import { Request, Response, NextFunction } from "express";
import signUpSchema from "../validations/v1/signup.validator";
import httpStatusCode from "../constants/httpStatusCode";
import { INVALID_INPUT } from "../constants/errorMessage";

const validateUserSignUp = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const result = signUpSchema.safeParse(req.body);
  if (!result.success) {
    res.status(httpStatusCode.BAD_REQUEST).json({ msg: INVALID_INPUT });
    return;
  }
  next();
};
export default validateUserSignUp;
