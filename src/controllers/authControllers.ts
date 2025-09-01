import HttpError from "../helpers/HttpError";
import ctrlWrapper from "../decorators/ctrlWrapper";
import userServices from "../services/userServices";
import authServices from "../services/authServices";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { generateRandomCode } from "../helpers/generateRandomCode";
import sendEmail from "../helpers/sendEmail";
import { Request, Response } from "express";

const { JWT_SECRET, DEPLOY_HOST } = process.env;

const DELAY = 30 * 60 * 1000; // 30 minutes

const signup = async (req: Request, res: Response) => {
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

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userServices.findUser(email);
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: "23h",
  });
  await authServices.setToken(user.id, token);
  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await userServices.findUser(email);
  if (!user) {
    throw HttpError(404, "User not found");
  }

  const id = user.id;
  const tempCode = generateRandomCode();
  const tempCodeExpiresAt = BigInt(Date.now() + DELAY);

  await authServices.updateUserTempCode(id, tempCode, tempCodeExpiresAt);
  const userEmail = {
    to: email,
    subject: "Forgot password",
    html: `
        <h1>Hello, did you forget your password?</h1>
        <p>If no, ignore this email.</p>
         <p>Otherwise, please click on the link below, <span style="font-weight: bold;">but remember that this link will expire in <span style="color: red;">${
           DELAY / 60000
         } min</span></p>
        <div style="margin-bottom: 20px;">
          <a href="${DEPLOY_HOST}/update-password/${tempCode}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #407bff; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 15px;">Click to update your password!</a>
        </div>
         <p>If you have any questions, you can always contact our support team.</p>
        <p style="margin-top: 10px;">Best regards,</p>
        <p style="margin-top: 10px;">The ZenBit Team</p>`,
  };

  await sendEmail(userEmail);

  res.json({
    message:
      "An email has been sent to your email address to recover your password",
  });
};

const updatePassword = async (req: Request, res: Response) => {
  const { tempCode } = req.params;
  const { newPassword } = req.body;

  const user = await userServices.getUser(tempCode);
  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (!user.tempCodeExpiresAt || user.tempCodeExpiresAt < Date.now()) {
    throw HttpError(
      403,
      "Unfortunately, your link has expired, so you can't access this action. Try to recover your password again."
    );
  }

  await authServices.recoverPassword(tempCode, newPassword);

  res.status(200).json({
    message: "Your password has been updated successfully",
  });
};

const logout = async (req: Request, res: Response) => {
  if (!req.user || !req.user.id) {
    throw HttpError(401, "Unauthorized");
  }
  const { id } = req.user;
  await authServices.setToken(id);
  res.json({
    message: "Logout success",
  });
};

const getCurrent = async (req: Request, res: Response) => {
  if (!req.user) {
    throw HttpError(401, "Unauthorized");
  }
  const { email } = req.user;
  res.json({
    email,
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  forgotPassword: ctrlWrapper(forgotPassword),
  updatePassword: ctrlWrapper(updatePassword),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
};
