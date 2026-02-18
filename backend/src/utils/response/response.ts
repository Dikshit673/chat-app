export class ApiResponse<T = unknown> {
  public success: boolean;
  public message: string;
  public statusCode: number;
  public data: T | null;

  constructor(
    statusCode: number,
    message: string = 'Success',
    data: T | null = null
  ) {
    this.success = statusCode >= 200 && statusCode < 300;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}
