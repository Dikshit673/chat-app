import { HydratedDocument, Model, model, Schema } from 'mongoose';

import {
  MODEL_NAMES,
  SALT_ROUNDS,
  USER_ROLE_DEFAULT,
  USER_ROLES,
  UserRolesType,
} from '@/constants.js';
import { comparePassword, generateSalt, hashPassword } from '@/lib/bcrypt.js';

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

type IUserDocument = HydratedDocument<IUser> & {
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
  const salt = await generateSalt(SALT_ROUNDS);
  this.password = await hashPassword(this.password, salt);
});

/* 4️⃣ Statics */
UserSchema.statics = {
  findByEmail: async function (email: string) {
    return this.findOne({ email });
  },
};

/* 5️⃣ Methods */
UserSchema.methods = {
  toSafeObject: function () {
    const { password, _id, __v, ...user } = this.toObject();
    const newUser = { ...user, id: _id.toString() };
    return newUser;
  },
  isPasswordMatch: async function (password: string) {
    const isMatch = await comparePassword(password, this.password);
    return isMatch;
  },
};

/* 6️⃣ Index */
// UserSchema.index({ email: 1 }, { unique: true });

/* 7️⃣ Export */
export const UserModel2 = model<IUser, IUserModel>(
  MODEL_NAMES.user,
  UserSchema
);
