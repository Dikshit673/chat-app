// import { authUserSchema } from '@/lib/zod.js';
import { sendError, sendSuccess } from '@/utils/sendResponse.js';
import { Request, Response } from 'express';

export const checkAuth = async (req: Request, res: Response) => {
  try {
    // console.log('check auth');
    const user = req.user;
    if (!user) {
      return sendError(res, 400, 'User not found.');
    }
    return sendSuccess(res, 200, 'Authenticated successfully', {
      authUser: user,
    });
  } catch (error) {
    const errorMsg = (error as Error).message || 'Something went wrong.';
    return sendError(res, 500, errorMsg);
  }
};
