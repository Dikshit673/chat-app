import { Schema, Document, Model, model } from 'mongoose';
import { IUser } from '@/features/user/types/user.js';

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Model<IUserDocument> {
  findByEmail(email: string): Promise<IUserDocument | null>;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profilePic: { type: String, default: '' },
  },
  { timestamps: true }
);

userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

export const User = model<IUserDocument, IUserModel>('User', userSchema);
