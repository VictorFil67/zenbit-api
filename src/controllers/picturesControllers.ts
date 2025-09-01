import { Request, Response } from "express";
import ctrlWrapper from "../decorators/ctrlWrapper";
import picturesServices from "../services/picturesServices";

const getAllPictures = async (req: Request, res: Response) => {
  const result = await picturesServices.listPictures();
  res.json(result);
};

export default {
  getAllPictures: ctrlWrapper(getAllPictures),
};
