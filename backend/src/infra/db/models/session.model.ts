import { HydratedDocument, Model, model, Schema, Types } from 'mongoose';

import { MODEL_NAMES } from '../db.constants.js';

/* 1️⃣ types */
type ISession = {
  userId: Types.ObjectId;
  refreshTokenHash: string;
  userAgent?: string;
  ip?: string;
  isValid: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ISessionDocument = HydratedDocument<ISession>;

type ISessionModel = Model<ISession, object, object, object, ISessionDocument>;

/* 2️⃣ Schema */
const SessionSchema = new Schema<ISession, ISessionModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.user,
      required: true,
      index: true,
    },
    refreshTokenHash: { type: String, required: true },
    userAgent: { type: String, default: '' },
    ip: { type: String, default: '' },
    isValid: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// SessionSchema.methods

/* 3️⃣ Model */
export const SessionModel = model<ISession, ISessionModel>(
  MODEL_NAMES.session,
  SessionSchema
);
