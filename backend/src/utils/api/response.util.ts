import { Response } from 'express';

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

export const sendApiResponse = <T = unknown>(
  res: Response,
  status: number,
  message: string,
  data?: T
) => {
  res.status(status).json(new ApiResponse(status, message, data || null));
};
