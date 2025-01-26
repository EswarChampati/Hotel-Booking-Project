// import express, { Request, Response, Router } from "express";
// import registerUser from "../../controllers/v1/signup.controller";
// import validateUserSignUp from "../../middlewares/validateUserSignUp";
// import { ROUTES } from "../../constants/routes";
// import validateUserSignIn from "../../middlewares/validateUserSignIn";
// import signIn from "../../controllers/v1/signin.controller";
// import httpStatusCode from "../../constants/httpStatusCode";
// import validateToken from "../../middlewares/validateToken";

// const router: Router = express.Router();

// router.post(ROUTES.API.V1.AUTH.REGISTER, validateUserSignUp, registerUser);
// router.post(ROUTES.API.V1.AUTH.LOGIN, validateUserSignIn, signIn);
// router.get(
//   ROUTES.API.V1.AUTH.VALIDATE_TOKEN,
//   validateToken,
//   (req: Request, res: Response) => {
//     res.status(httpStatusCode.OK).send({ userId: req.userId });
//   }
// );
// export default router;

import express, { Request, Response, Router } from "express";
import registerUser from "../../controllers/v1/signup.controller";
import validateUserSignUp from "../../middlewares/validateUserSignUp";
import { ROUTES } from "../../constants/routes";
import validateUserSignIn from "../../middlewares/validateUserSignIn";
import signIn from "../../controllers/v1/signin.controller";
import httpStatusCode from "../../constants/httpStatusCode";
import validateToken from "../../middlewares/validateToken";

const router: Router = express.Router();

router.post(ROUTES.API.V1.AUTH.REGISTER, validateUserSignUp, registerUser);
router.post(ROUTES.API.V1.AUTH.LOGIN, validateUserSignIn, signIn);
router.get(
  ROUTES.API.V1.AUTH.VALIDATE_TOKEN,
  validateToken,
  (req: Request, res: Response) => {
    res.status(httpStatusCode.OK).send({ userId: req.userId });
  }
);

export default router;
