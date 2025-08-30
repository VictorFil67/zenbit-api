import { Router } from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../decorators/validateBody.js";
import {
  forgotPasswordSchema,
  signinSchema,
  signupSchema,
  updatePasswordSchema,
} from "../schemas/usersSchemas.js";
import authtenticate from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(signupSchema),
  authControllers.signup
);
authRouter.post("/login", validateBody(signinSchema), authControllers.signin);
authRouter.put(
  "/forgot-password",
  validateBody(forgotPasswordSchema),
  authControllers.forgotPassword
);
authRouter.put(
  "/update-password/:tempCode",
  validateBody(updatePasswordSchema),
  authControllers.updatePassword
);
authRouter.post("/logout", authtenticate, authControllers.logout);
authRouter.get("/current", authtenticate, authControllers.getCurrent);

export default authRouter;
