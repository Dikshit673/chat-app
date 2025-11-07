// src/models/User.model.ts
import { Schema, Document, Model, model } from 'mongoose';
import { IUser } from '@/features/user/types/user.js';

// Combine IUser with Mongoose's Document to include _id, timestamps, etc.
export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

export type IUserNoPassDocument = Omit<IUserDocument, 'password'>;

// Optionally define instance methods or statics here
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

// Example static method
userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

export const User = model<IUserDocument, IUserModel>('User', userSchema);
