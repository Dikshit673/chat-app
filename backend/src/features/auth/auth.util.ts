import { User } from '../user/user.types.js';

export function sanitizeUser(user: User) {
  const { password, ...safe } = user;
  return safe;
}
