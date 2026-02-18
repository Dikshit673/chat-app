export interface ApiErrorDetail {
  message: string;
  field?: string;
  [key: string]: unknown;
}

export class ApiError {
  public name: string;
  public message: string;
  public statusCode: number;
  public errors: ApiErrorDetail[];
  public stack?: string;
  public cause?: unknown;

  constructor(
    statusCode: number,
    message: string = 'Something went wrong.',
    errors: ApiErrorDetail[] = [],
    stack?: string
  ) {
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
    this.message = message;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
