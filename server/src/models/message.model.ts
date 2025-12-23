import { model, Schema } from 'mongoose';

import { MESSAGE_MODEL_NAME } from '@/constants.js';

const messageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recieverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent',
  },
  edited: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

export const Message = model(MESSAGE_MODEL_NAME, messageSchema);
