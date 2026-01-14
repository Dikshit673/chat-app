import { Response } from 'express';

import { ApiResponse } from './ApiResponse.js';

export const sendApiResponse = <T = unknown>(
  res: Response,
  status: number,
  message: string,
  data?: T
) => {
  res.status(status).json(new ApiResponse(status, message, data || null));
};
