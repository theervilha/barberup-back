import { AppError } from "../../../infra/errors/AppError";

export class MissingTokenError extends AppError {
  constructor() {
    super(`Authorization token is missing`, 401, "MISSING_TOKEN");
  }
}
