import { Router } from "express";
import picturesControllers from "../controllers/picturesControllers.js";
import authtenticate from "../middlewares/authenticate.js";

const picturesRouter = Router();

picturesRouter.get("/", authtenticate, picturesControllers.getAllPictures);

export default picturesRouter;
