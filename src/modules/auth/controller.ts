import { Request, Response } from "express";

export function helloAuth(req: Request, res: Response) {
  res.json({ message: "Hello auth!" });
}
