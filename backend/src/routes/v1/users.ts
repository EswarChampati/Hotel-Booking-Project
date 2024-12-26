import express, { Router } from "express";
import registerUser from "../../controllers/v1/signup.controller";
import validateUserSignUp from "../../middlewares/validateUserSignUp";
import { ROUTES } from "../../constants/routes";
import validateUserSignIn from "../../middlewares/validateUserSignIn";
import signIn from "../../controllers/v1/signin.controller";

const router: Router = express.Router();

router.post(ROUTES.API.V1.USERS.REGISTER, validateUserSignUp, registerUser);
router.post(ROUTES.API.V1.USERS.LOGIN, validateUserSignIn, signIn);
export default router;
