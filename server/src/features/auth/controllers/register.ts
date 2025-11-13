import { Request, Response } from 'express';
import { User } from '@/models/user.model.js';
import { sendError, sendSuccess } from '@/utils/sendResponse.js';
import { SALT_ROUNDS } from '@/constants/bcrypt.constant.js';
import { generateSalt, hashPassword } from '@/lib/bcrypt.js';
import { registerSchema } from '@/lib/zod.js';

export const register = async (req: Request, res: Response) => {
  const registerData = registerSchema.safeParse(req.body);
  if (!registerData.success) {
    const errorMsg =
      registerData.error.issues[0].message || 'invalid credentials';
    return sendError(res, 400, errorMsg);
  }
  const { name, email, password, profilePic } = registerData.data;

  try {
    const isUserExistWithEmail = await User.findByEmail(email);
    if (isUserExistWithEmail) {
      return sendError(res, 400, 'Email already exist.');
    }

    const salt = await generateSalt(SALT_ROUNDS);
    const hashedPassword = await hashPassword(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic,
      role: 'user',
    });
    if (!user) {
      return sendError(res, 500, 'Something went wrong while creating user.');
    }
    return sendSuccess(res, 201, 'User created successfully.');
  } catch (error) {
    const errorMsg = (error as Error).message || 'Something went wrong.';
    return sendError(res, 500, errorMsg);
  }
};
