import { type User } from './user.types.js';

export function sanitizeUser(user: User) {
  const { password, ...safe } = user;
  return safe;
}

export type SanitizedUser = ReturnType<typeof sanitizeUser>;
