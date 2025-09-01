import { Router } from "express";
import picturesControllers from "../controllers/picturesControllers";
import authtenticate from "../middlewares/authenticate";

const picturesRouter = Router();

picturesRouter.get("/", authtenticate, picturesControllers.getAllPictures);

export default picturesRouter;
