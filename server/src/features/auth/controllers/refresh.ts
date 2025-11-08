import { sendSuccess } from '@/utils/sendResponse.js';
import { Request, Response } from 'express';

export const refresh = async (_req: Request, res: Response) => {
  return sendSuccess(res, 200, 'refresh route');
};
