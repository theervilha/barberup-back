import { NextFunction, Request, Response } from "express";
import { AuthInput } from "./validators/auth.schema";
import { authService } from "./service";

export function helloAuth(req: Request, res: Response) {
  res.json({ message: "Hello auth!" });
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(req);
  const data = req.body; //.validatedBody as AuthInput;

  try {
    const user = await authService.register(data);
    res.status(201).json(user);
  } catch (err) {
    // Em vez de console.error + res.status(500),
    // delega para o middleware global
    next(err);
  }
}
