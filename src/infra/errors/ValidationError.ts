import { AppError } from "./AppError";

type ValidationIssue = {
    field: string,
    message: string
}

export class ValidationError extends AppError {
    public readonly errors: ValidationIssue[];

    constructor(errors: ValidationIssue[]) {
        super("Validation failed", 400, "VALIDATION_ERROR");
        this.errors = errors
    }
}