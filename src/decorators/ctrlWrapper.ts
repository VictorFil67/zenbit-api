import { Request, Response, NextFunction, RequestHandler } from "express";

type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const ctrlWrapper = (ctrl: Controller): RequestHandler => {
  interface Func extends RequestHandler {}

  const func: Func = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

export default ctrlWrapper;
