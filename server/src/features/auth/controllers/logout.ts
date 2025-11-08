import { sendSuccess } from '@/utils/sendResponse.js';
import { Request, Response } from 'express';

export const logout = async (_req: Request, res: Response) => {
  return sendSuccess(res, 200, 'logout route');
};
