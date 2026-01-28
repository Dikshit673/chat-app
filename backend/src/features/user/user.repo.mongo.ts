import { IUserDocument, UserModel2 } from '@/infra/db/models/user.model.js';

import { objectIdParser } from '../shared/utils/objectId.parser.js';
import type { UserRepo } from './user.repo.js';
import type { InputUserPayload, User, UserId } from './user.types.js';

export class UserRepoMongo implements UserRepo {
  async create(user: InputUserPayload): Promise<User> {
    const { name, email, password } = user;
    const doc = await UserModel2.create({ name, email, password });
    return this.mapUserDoc(doc);
  }

  async findById(id: UserId): Promise<User | null> {
    const doc = await UserModel2.findById(id);
    if (!doc) return null;
    return this.mapUserDoc(doc);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel2.findOne({ email });
    if (!doc) return null;
    return this.mapUserDoc(doc);
  }

  private mapUserDoc(doc: IUserDocument): User {
    return {
      id: objectIdParser.asUserId(doc._id),
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
