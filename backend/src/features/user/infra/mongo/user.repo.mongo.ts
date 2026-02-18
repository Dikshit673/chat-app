import {
  type IUserDocument,
  UserModel,
} from '@/application/db/mongo/models/user.model.js';
import {
  type InputUserPayload,
  type User,
  type UserId,
} from '@/features/user/domain/user.types.js';

import { type UserRepo } from '../interface/user.repo.js';
import { parseAsUserId } from './parseAsUserId.js';

export class UserRepoMongo implements UserRepo {
  async create(user: InputUserPayload): Promise<User> {
    const { name, email, password } = user;
    const doc = await UserModel.create({ name, email, password });
    return this.mapUserDoc(doc);
  }

  async findById(id: UserId): Promise<User | null> {
    const doc = await UserModel.findById(id);
    if (!doc) return null;
    return this.mapUserDoc(doc);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email });
    if (!doc) return null;
    return this.mapUserDoc(doc);
  }

  private mapUserDoc(doc: IUserDocument): User {
    return {
      id: parseAsUserId(doc._id),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      role: doc.role,
      profilePic: doc.profilePic,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
