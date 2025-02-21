import { Request, Response } from "express";
import IUser from "../../interfaces/IUser";
import UserModel from "../../models/User.model";
import httpStatusCode from "../../constants/httpStatusCode";
import {
  INVALID_INPUT,
  PASSWORD_MISMATCH,
  SERVER_ERROR,
} from "../../constants/errorMessage";
import bcrypt from "bcryptjs";
import { generateToken } from "../../config/jwt.config";
import { COOKIE_SETTINGS } from "../../constants/cookies";

type IUserReqBody = Pick<IUser, "email" | "password">;

const Login = async (req: Request<{}, {}, IUserReqBody>, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(httpStatusCode.UNAUTHORIZED).json({ msg: INVALID_INPUT });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(httpStatusCode.UNAUTHORIZED).json({ msg: PASSWORD_MISMATCH });
      return;
    }

    const token = generateToken({ userId: user._id });
    res.cookie(COOKIE_SETTINGS.authCookie.name, token, {
      httpOnly: COOKIE_SETTINGS.authCookie.httpOnly,
      secure: COOKIE_SETTINGS.authCookie.secure,
      maxAge: COOKIE_SETTINGS.authCookie.maxAge,
    });
    res.status(httpStatusCode.OK).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (err) {
    console.log((err as Error).message);
    res
      .status(httpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: SERVER_ERROR });
  }
};

export default Login;
