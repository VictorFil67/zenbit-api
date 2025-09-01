import { ZodObject, z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  <T extends ZodObject>(schema: T) =>
  (req: Request<{}, {}, z.infer<T>>, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    req.body = parsed.data;
    next();
  };
