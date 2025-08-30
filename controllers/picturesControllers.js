import ctrlWrapper from "../decorators/ctrlWrapper.js";
import picturesServices from "../services/picturesServices.js";

const getAllPictures = async (req, res) => {
  const result = await picturesServices.listPictures();
  res.json(result);
};

export default {
  getAllPictures: ctrlWrapper(getAllPictures),
};
