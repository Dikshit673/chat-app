import { UserModel2 } from '@/models/user.model.js';

import type { UserRepository } from './user.repository.js';
import type { InputUserPayload, User, UserId } from './user.types.js';
import { userIdSchema } from './user.validation.schema.js';

export class UserRepositoryMongo implements UserRepository {
  async create(user: InputUserPayload): Promise<User> {
    const { name, email, password } = user;
    const doc = await UserModel2.create({ name, email, password });
    const userId = userIdSchema.parse(doc._id.toString());
    return {
      id: userId,
      name: doc.name,
      email: doc.email,
      password: doc.password,
      role: doc.role,
      profilePic: doc.profilePic,
    };
  }
  async findById(id: UserId): Promise<User | null> {
    const doc = await UserModel2.findById(id);
    if (!doc) return null;
    const userId = userIdSchema.parse(doc._id.toString());
    return {
      id: userId,
      name: doc.name,
      email: doc.email,
      password: doc.password,
      role: doc.role,
      profilePic: doc.profilePic,
    };
  }
  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel2.findOne({ email });
    if (!doc) return null;
    const userId = userIdSchema.parse(doc._id.toString());
    return {
      id: userId,
      name: doc.name,
      email: doc.email,
      password: doc.password,
      role: doc.role,
      profilePic: doc.profilePic,
    };
  }
}
