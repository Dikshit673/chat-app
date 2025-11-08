import { ApiResponse, ApiResponseData } from '@/types/response.js';
import { Response } from 'express';

type FullApiResponse = ApiResponse & ApiResponseData;

export const sendSuccess = (
  res: Response,
  status: number,
  message: string,
  data?: ApiResponseData
) => {
  const response = {
    success: true,
    message,
    ...data,
  } satisfies FullApiResponse;
  return res.status(status).json(response);
};

export const sendError = (
  res: Response,
  status: number,
  message: string,
  data?: ApiResponseData
) => {
  const response = {
    success: false,
    message,
    ...data,
  } satisfies FullApiResponse;
  return res.status(status).json(response);
};
