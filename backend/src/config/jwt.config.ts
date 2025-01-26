import jwt, { JwtPayload, SignOptions, VerifyOptions } from "jsonwebtoken";
import { JWT_CONSTANT, JWT_ERROR_MESSAGE } from "../constants/jwt";

interface JwtConfig {
  secretKey: string;
  expiresIn: string | number;
}

const jwtConfig: JwtConfig = {
  secretKey: JWT_CONSTANT.SECRET_KEY,
  expiresIn: JWT_CONSTANT.DEFAULT_EXPIRATION,
};

export const generateToken = (
  payload: object,
  options?: SignOptions
): string => {
  return jwt.sign(payload, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expiresIn,
    ...options,
  });
};

export const verifyToken = (
  token: string,
  options?: VerifyOptions
): string | JwtPayload => {
  try {
    return jwt.verify(token, jwtConfig.secretKey, options);
  } catch (err) {
    throw new Error(JWT_ERROR_MESSAGE.INVALID);
  }
};
