import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import userServices from "../services/userServices.js";
import authServices from "../services/authServices.js";

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await userServices.findUser(email);
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const newUser = await authServices.register(req.body);
  res.status(201).json({
    email: newUser.email,
  });
};

export default { signup: ctrlWrapper(signup) };
