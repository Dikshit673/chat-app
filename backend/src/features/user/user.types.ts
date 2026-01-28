import type { Brand } from '@/types/brand.js';

export type UserId = Brand<string, 'UserId'>;

export interface User {
  id: UserId;
  email: string;
  name: string;
  password: string;
  role: string;
  profilePic?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type InputUserPayload = Pick<User, 'email' | 'name' | 'password'>;
