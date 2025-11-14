import { Response } from 'express';
import { ApiResponse } from './ApiResponse.js';

export const sendSuccess = <T = unknown>(
  res: Response,
  status: number,
  message: string,
  data?: T
) => {
  return res.status(status).json(new ApiResponse(status, message, data));
};

export const sendError = (res: Response, status: number, message: string) => {
  return res.status(status).json(new ApiResponse(status, message, null));
};
