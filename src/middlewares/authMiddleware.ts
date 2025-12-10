import { NextFunction, Request, Response } from "express";
import { MissingTokenError } from "../modules/auth/errors/MissingTokenError";
import { UnauthorizedError } from "../modules/auth/errors/UnauthorizedError";
import { authService } from "../modules/auth/service";

export async function authMiddleware(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new MissingTokenError();
  }

  const token = authHeader.replace("Bearer ", "");
  const user = await authService.getUserFromToken(token);
  if (!user) {
    throw new UnauthorizedError();
  }

  const { password, ...userWithoutPassword } = user;
  req.user = userWithoutPassword;
  _next();
}
