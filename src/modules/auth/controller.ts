import { NextFunction, Request, Response } from "express";
import { AuthInputSchema } from "./validators/auth.schema";

export function helloAuth(req: Request, res: Response) {
  res.json({ message: "Hello auth!" });
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { success, data, error } = AuthInputSchema.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      code: "VALIDATION_ERROR",
      errors: error.flatten().fieldErrors,
    });
    return
  }

  try {
    const user = {}; //await authService.register(data);
    res.status(201).json(user);
  } catch (err) {
    // Em vez de console.error + res.status(500),
    // delega para o middleware global
    next(err);
  }
}
