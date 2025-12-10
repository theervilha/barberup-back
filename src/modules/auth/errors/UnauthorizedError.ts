import { AppError } from "../../../infra/errors/AppError";

export class UnauthorizedError extends AppError {
  constructor() {
    super(`Invalid credentials`, 401, "UNAUTHORIZED");
  }
}
