import {
  type InputUserPayload,
  type User,
  type UserId,
} from '@/features/user/domain/user.types.js';

export interface UserRepo {
  findByEmail(email: string): Promise<User | null>;
  findById(id: UserId): Promise<User | null>;
  create(user: InputUserPayload): Promise<User>;
}
