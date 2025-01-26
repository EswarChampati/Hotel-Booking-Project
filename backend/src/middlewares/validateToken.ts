import { NextFunction, Request, Response } from "express";
import { COOKIE_SETTINGS } from "../constants/cookies";
import httpStatusCode from "../constants/httpStatusCode";
import { AUTHENTICATION_REQUIRED } from "../constants/errorMessage";
import { verifyToken } from "../config/jwt.config";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[COOKIE_SETTINGS.authCookie.name];
  if (!token) {
    res
      .status(httpStatusCode.UNAUTHORIZED)
      .json({ message: AUTHENTICATION_REQUIRED });
    return;
  }
  try {
    const decoded = verifyToken(token);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (err) {
    res
      .status(httpStatusCode.UNAUTHORIZED)
      .json({ message: AUTHENTICATION_REQUIRED });
    return;
  }
};

export default validateToken;
