import { SALT_ROUNDS } from '@/constants.js';
import { generateSalt, hashPassword } from '@/lib/bcrypt.js';
import { User } from '@/models/user.model.js';
import { asyncHandler } from '@/utils/helpers/asyncHandler.js';
import {
  sendApiResponse,
  throwApiError,
} from '@/utils/helpers/sendResponse.js';
import { registerSchema } from '@/validations/zod.js';

export const register = asyncHandler(async (req, res) => {
  const registerData = registerSchema.safeParse(req.body);
  if (!registerData.success) {
    const errorMsg =
      registerData.error.issues[0].message || 'invalid credentials';
    return throwApiError(400, errorMsg);
  }
  const { name, email, password, profilePic } = registerData.data;

  const isUserExist = await User.findByEmail(email);
  if (isUserExist) {
    return throwApiError(400, 'Email already exist.');
  }

  const salt = await generateSalt(SALT_ROUNDS);
  const hashedPassword = await hashPassword(password, salt);

  await User.create({
    name,
    email,
    password: hashedPassword,
    profilePic,
    role: 'user',
  });

  return sendApiResponse(res, 201, 'User created successfully.');
});
