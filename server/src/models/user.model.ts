import {
  HydratedDocument,
  InferSchemaType,
  Model,
  model,
  Schema,
  Types,
} from 'mongoose';

import { USER_MODEL_NAME } from '@/constants.js';

/* 1️⃣ Pure schema data */
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  profilePic?: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserObject = InferSchemaType<typeof userSchema>;

type UserObjectWithId = UserObject & {
  _id: Types.ObjectId;
};

export type SafeUserObject = Omit<UserObjectWithId, 'password'>;

/* 2️⃣ Methods */
export interface UserMethods {
  toSafeObject(): SafeUserObject;
}

/* 3️⃣ Document */
export type UserDocument = HydratedDocument<IUser, UserMethods>;

/* 4️⃣ Model */
export interface IUserModel extends Model<IUser, object, UserMethods> {
  findByEmail(email: string): Promise<UserDocument | null>;
}

/* 5️⃣ Schema */
const userSchema = new Schema<IUser, IUserModel, UserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profilePic: { type: String, default: '' },
  },
  { timestamps: true }
);

/* 6️⃣ Static */
userSchema.static('findByEmail', function (email: string) {
  return this.findOne({ email });
});

/* 7️⃣ Method */
userSchema.method('toSafeObject', function () {
  const { password, __v, ...user } = this.toObject();
  return user;
});

/* 8️⃣ Model */
export const User = model<IUser, IUserModel>(USER_MODEL_NAME, userSchema);
