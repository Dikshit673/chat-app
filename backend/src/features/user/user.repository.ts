import type { InputUserPayload, User, UserId } from './user.types.js';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: UserId): Promise<User | null>;
  create(user: InputUserPayload): Promise<User>;
}
