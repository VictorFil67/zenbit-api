export interface UserPayload {
  id: number;
  email: string;
  token: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
  }
}

export {};
