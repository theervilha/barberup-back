//import { type UserPublic } from "../types/user.types";
export {}

declare global {
  namespace Express {
    interface Request {
      //user?: UserPublic;
      validatedBody?: any;
      validatedQuery?: any;
    }
  }
}