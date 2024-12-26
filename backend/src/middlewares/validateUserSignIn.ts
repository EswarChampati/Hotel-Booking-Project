import { Request, Response, NextFunction } from "express";
import signInSchema from "../validations/v1/signin.validator";
import httpStatusCode from "../constants/httpStatusCode";
import { INVALID_INPUT } from "../constants/errorMessage";

const validateUserSignIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = signInSchema.safeParse(req.body);
  if (!result.success) {
    res.status(httpStatusCode.BAD_REQUEST).json({ msg: INVALID_INPUT });
    return;
  }
  next();
};
export default validateUserSignIn;
