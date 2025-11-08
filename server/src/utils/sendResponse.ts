import { ApiResponse } from '@/types/response.js';
import { Response } from 'express';

export const sendSuccess = <T>(
  res: Response,
  status: number,
  message: string,
  data?: ApiResponse<T>
) => {
  const resData = {
    ...data,
    success: true,
    message,
  } as const;
  return res.status(status).json(resData);
};

export const sendError = <T>(
  res: Response,
  status: number,
  message: string,
  data?: ApiResponse<T>
) => {
  const resData = {
    ...data,
    success: false,
    message,
  } as const;
  return res.status(status).json(resData);
};
