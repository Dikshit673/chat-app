import { User } from '@/models/user.model.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { sendApiResponse, throwApiError } from '@/utils/sendResponse.js';
import { registerSchema } from '@/validations/zod.js';

export const register = asyncHandler(async (req, res) => {
  const { success, data, error } = registerSchema.safeParse(req.body);
  if (!success) {
    const errorMsg = error.issues[0].message || 'invalid credentials';
    return throwApiError(400, errorMsg);
  }
  const { name, email, password, profilePic } = data;

  const isUserExist = await User.findByEmail(email);
  if (isUserExist) return throwApiError(400, 'Email already exist.');

  await User.create({ name, email, password, profilePic });
  return sendApiResponse(res, 201, 'User created successfully.');
});
