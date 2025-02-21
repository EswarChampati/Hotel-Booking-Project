import { Request, Response } from "express";
import UserModel from "../../models/User.model";
import { generateToken } from "../../config/jwt.config";
import IUser from "../../interfaces/IUser";
import httpStatusCode from "../../constants/httpStatusCode";
import { COOKIE_SETTINGS } from "../../constants/cookies";
import { USER_ALREADT_EXISTS } from "../../constants/errorMessage";

type IUserReqBody = Pick<
  IUser,
  "email" | "firstName" | "lastName" | "password"
>;
const registerUser = async (
  req: Request<{}, {}, IUserReqBody>,
  res: Response
) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (user) {
      res.status(httpStatusCode.CONFLICT).json({
        msg: USER_ALREADT_EXISTS,
      });
      return;
    }
    const createUser = await UserModel.create(req.body);
    const token = generateToken({ userId: createUser._id });

    res.cookie(COOKIE_SETTINGS.authCookie.name, token, {
      httpOnly: COOKIE_SETTINGS.authCookie.httpOnly,
      secure: COOKIE_SETTINGS.authCookie.secure,
      maxAge: COOKIE_SETTINGS.authCookie.maxAge,
    });

    res.status(httpStatusCode.CREATED).json(createUser);
    return;
  } catch (err) {
    console.log(httpStatusCode.INTERNAL_SERVER_ERROR);
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: "Internal server error during registration",
    });
    return;
  }
};
export default registerUser;
