import { Router } from "express";
import authControllers from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/register", authControllers.signup);

export default authRouter;
