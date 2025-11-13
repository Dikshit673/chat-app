import { model, Schema } from 'mongoose';

const userTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

userTokenSchema.index({ userId: 1, deviceId: 1 }, { unique: true });
userTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const UserToken = model('userToken', userTokenSchema);
