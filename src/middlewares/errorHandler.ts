import { NextFunction, Request, Response } from "express";
import { AppError } from "../infra/errors/AppError";
import { logger } from "../infra/logger";
import { ValidationError } from "../infra/errors/ValidationError";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const isAppError = err instanceof AppError;

  const statusCode = isAppError ? err.statusCode : 500;
  const code = isAppError ? err.code : "INTERNAL_ERROR";
  const message =
    isAppError && statusCode < 500
      ? err.message
      : "An unexpected error occurred";

  // Log estruturado com contexto da request
  logger.error("Request failed", {
    code,
    statusCode,
    // Em produção, cuidado com dados sensíveis: não logar senha, tokens, etc.
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
    // Se você anexar userId no req (middleware de auth), coloque aqui também
    // userId: (req as any).userId,
    // Se err for Error, logar stack
    stack: err instanceof Error ? err.stack : undefined,
  });

  const baseResponse = {
    code,
    message,
    // Em desenvolvimento, expor detalhes extras:
    ...(process.env.NODE_ENV !== "production" &&
      err instanceof Error && {
        details: err.message,
      }),
    ...(err instanceof ValidationError && {
      errors: err.errors
    }),
  }

  res.status(statusCode).json(baseResponse);
}
