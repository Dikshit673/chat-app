import { UserModel } from '@/models/user.model.js';
import { sendError, sendSuccess } from '@/utils/sendResponse.js';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, profilePic = '' } = req.body;
  if (name || email || password)
    return sendError(res, 400, 'Invalid credentials.');

  try {
    const isEmailExist = await UserModel.findOne({ email });
    if (isEmailExist) return sendError(res, 400, 'Email already exist.');
    const user = await UserModel.create({
      name,
      email,
      password,
      profilePic,
      role: 'user',
    });
    return sendSuccess(res, 201, 'User created successfully.', { user });
  } catch (error) {
    const err = error as Error;
    return sendError(res, 500, err.message);
  }
};
