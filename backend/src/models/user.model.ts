import { HydratedDocument, Model, model, Schema } from 'mongoose';

import {
  SALT_ROUNDS,
  USER_MODEL_NAME,
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
  profilePic?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserObjectWithId = IUser & {
  _id: string;
};

export type SafeUserObject = Omit<UserObjectWithId, 'password'>;

// Methods types
interface UserMethods {
  toSafeObject(): SafeUserObject;
  isPasswordMatch(password: string): Promise<boolean>;
}

// Document type
type UserDocument = HydratedDocument<IUser, UserMethods>;

// Model types
interface IUserModel extends Model<IUser, object, UserMethods> {
  findByEmail(email: string): Promise<UserDocument | null>;
}

/* 2️⃣ Schema */
const userSchema = new Schema<IUser, IUserModel, UserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    role: { type: String, enum: USER_ROLES, default: 'USER' },
    profilePic: { type: String, default: '' },
  },
  {
    timestamps: true,
    /* 3️⃣ Statics */
    statics: {
      findByEmail: function (email: string) {
        return this.findOne({ email });
      },
    },
    /* 4️⃣  Methods */
    methods: {
      toSafeObject: function () {
        const { password, _id, __v, ...user } = this.toObject();
        const newUser = { ...user, _id: _id.toString() };
        return newUser;
      },
      isPasswordMatch: async function (password: string) {
        const isMatch = await comparePassword(password, this.password);
        return isMatch;
      },
    },
  }
);

/* 5️⃣ Hook */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await generateSalt(SALT_ROUNDS);
  this.password = await hashPassword(this.password, salt);
});

/* 6️⃣ Model */
export const User = model<IUser, IUserModel>(USER_MODEL_NAME, userSchema);
