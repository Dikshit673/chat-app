export interface ApiErrorDetail {
  message: string;
  field?: string;
  [key: string]: unknown;
}

export interface ApiErrorData {
  [key: string]: unknown;
}

export class ApiError extends Error {
  public statusCode: number;
  public errors: ApiErrorDetail[];
  public data: ApiErrorData | null;

  constructor(
    statusCode: number,
    message: string = 'Something went wrong.',
    errors: ApiErrorDetail[] = [],
    data: ApiErrorData | null = null,
    stack?: string
  ) {
    super(message);

    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = data;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace?.(this, this.constructor);
    }
  }
}
