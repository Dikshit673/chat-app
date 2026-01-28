import { loginUserSchema, registerUserSchema } from './auth.schema.js';

export class AuthValidation {
  login(inputData: unknown) {
    const { success, data, error } = loginUserSchema.safeParse(inputData);
    if (!success) throw new Error(error.message);
    return data;
  }
  register(inputData: unknown) {
    const { success, data, error } = registerUserSchema.safeParse(inputData);
    if (!success) throw new Error(error.message);
    return data;
  }
}
