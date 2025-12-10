import { NextFunction, Request, Response } from "express";
import { AuthInput } from "./validators/auth.schema";
import { authService } from "./service";
import { UnauthorizedError } from "./errors/UnauthorizedError";

export function helloAuth(req: Request, res: Response) {
  res.json({ message: "Hello auth!" });
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const data = req.validatedBody as AuthInput;

  try {
    const user = await authService.register(data);
    res.status(201).json(user);
  } catch (err) {
    // Em vez de console.error + res.status(500),
    // delega para o middleware global
    next(err);
  }
}

export async function login(req: Request, res: Response) {
  const data = req.validatedBody as AuthInput;

  const user = await authService.login(data);
  res.status(200).json(user);
}

export async function verify(req: Request, res: Response) {
  if (!req.user) {
    throw new UnauthorizedError();
  }

  res.status(200).json(req.user);
}
