import { HydratedDocument, Model, model, Schema, Types } from 'mongoose';

import {
  MESSAGE_STATUS,
  MESSAGE_STATUS_DEFAULT,
  MessageStatusType,
  MODEL_NAMES,
} from '../db.constants.js';

type IMessage = {
  conversationId: Types.ObjectId;
  senderId: Types.ObjectId;
  recieverId: Types.ObjectId;
  text: string;
  status: MessageStatusType;
  seenBy: Types.ObjectId[];
  edited: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type IMessageDocument = HydratedDocument<IMessage>;

type IMessageModel = Model<IMessageDocument>;

const MessageSchema = new Schema<IMessage, IMessageModel>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.conversation,
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.user,
      required: true,
    },
    recieverId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.user,
      required: true,
    },
    text: { type: String },
    status: {
      type: String,
      enum: MESSAGE_STATUS,
      default: MESSAGE_STATUS_DEFAULT,
    },
    edited: { type: Boolean, default: false },
    seenBy: [{ type: Schema.Types.ObjectId, ref: MODEL_NAMES.user }],
  },
  { timestamps: true }
);

export const MessageModel = model<IMessage, IMessageModel>(
  MODEL_NAMES.message,
  MessageSchema
);
