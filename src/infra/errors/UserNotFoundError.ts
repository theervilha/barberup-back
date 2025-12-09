import { AppError } from "./AppError";

export class UserNotFoundError extends AppError {
  constructor() {
    super(`User not found`, 404, "USER_NOT_FOUND");
  }
}
