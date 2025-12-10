import { type UserPublic } from "../PublicUser";
export {};

declare global {
  namespace Express {
    interface Request {
      user?: UserPublic;
      validatedBody?: any;
      validatedQuery?: any;
    }
  }
}
