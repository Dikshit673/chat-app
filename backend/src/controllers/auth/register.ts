import { User } from '@/models/user.model.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { sendApiResponse, throwApiError } from '@/utils/sendResponse.js';
import { registerUserSchema } from '@/validations/user.validation.js';

export const register = asyncHandler(async (req, res) => {
  // validate credentials
  const { success, data, error } = registerUserSchema.safeParse(req.body);
  if (!success) {
    const errorMsg = error.issues[0].message || 'invalid credentials';
    return throwApiError(400, errorMsg);
  }
  const { name, email, password, profilePic } = data;

  // check if user already exist
  const isUserExist = await User.findByEmail(email);
  if (isUserExist) return throwApiError(400, 'Email already exist.');

  // create user
  await User.create({ name, email, password, profilePic });

  // send response
  return sendApiResponse(res, 201, 'User created successfully.');
});
