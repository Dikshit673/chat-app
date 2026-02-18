import { type HydratedDocument, Model, model, Schema } from 'mongoose';

import { ENV } from '@/configs/env/index.js';
import { bcryptLib } from '@/lib/bcrypt/index.js';

import {
  MODEL_NAMES,
  USER_ROLE_DEFAULT,
  USER_ROLES,
  type UserRolesType,
} from '../domain/model.constants.js';

/* 1️⃣ types */
interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRolesType;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserDocument = HydratedDocument<IUser> & {
  toSafeObject: () => Omit<IUser, 'password'>;
  isPasswordMatch: (password: string) => Promise<boolean>;
};

type IUserModel = Model<IUserDocument> & {
  findByEmail(email: string): Promise<IUserDocument | null>;
};

/* 2️⃣ Schema */
const UserSchema = new Schema<IUser, IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    role: { type: String, enum: USER_ROLES, default: USER_ROLE_DEFAULT },
    profilePic: { type: String, default: '' },
  },
  { timestamps: true }
);

/* 3️⃣ Hook */
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcryptLib.genSalt(ENV.BCRYPT_SALT_ROUNDS);
  this.password = await bcryptLib.hash(this.password, salt);
});

/* 4️⃣ Statics */
UserSchema.statics = {
  findByEmail: async function (email: string) {
    return this.findOne({ email });
  },
};

/* 5️⃣ Methods */
// UserSchema.methods = {
//   toSafeObject: function () {
//     const { password, _id, __v, ...user } = this.toObject();
//     const newUser = { ...user, id: _id.toString() };
//     return newUser;
//   },
//   isPasswordMatch: async function (password: string) {
//     const isMatch = await bcryptLib.compare(password, this.password);
//     return isMatch;
//   },
// };

/* 6️⃣ Index */
// UserSchema.index({ email: 1 }, { unique: true });

/* 7️⃣ Export */
export const UserModel = model<IUser, IUserModel>(MODEL_NAMES.USER, UserSchema);
