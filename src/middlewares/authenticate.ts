import jwt from "jsonwebtoken";
import userServices from "../services/userServices";
import HttpError from "../helpers/HttpError";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { UserPayload } from "../types/express";

const { JWT_SECRET } = process.env;

const authtenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401));
  }
  try {
    if (!JWT_SECRET) {
      return next(HttpError(500, "JWT secret is not defined"));
    }
    const { id } = jwt.verify(token, JWT_SECRET as string) as { id: number };

    const user = (await userServices.findUserById(id)) as UserPayload;

    if (!user || !user.token) {
      return next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

export default authtenticate;
