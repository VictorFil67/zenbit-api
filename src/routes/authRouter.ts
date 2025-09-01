import { Router } from "express";
import authControllers from "../controllers/authControllers";
import authtenticate from "../middlewares/authenticate";
import { validate } from "../middlewares/validate";
import { authValidation } from "../validations/authValidation";

const authRouter = Router();

authRouter.post(
  "/register",
  validate(authValidation.register),
  authControllers.signup
);
authRouter.post(
  "/login",
  validate(authValidation.login),
  authControllers.signin
);
authRouter.put(
  "/forgot-password",
  validate(authValidation.forgotPassword),
  authControllers.forgotPassword
);
authRouter.put(
  "/update-password/:tempCode",
  validate(authValidation.updatePassword),
  authControllers.updatePassword
);
authRouter.post("/logout", authtenticate, authControllers.logout);
authRouter.get("/current", authtenticate, authControllers.getCurrent);

export default authRouter;
