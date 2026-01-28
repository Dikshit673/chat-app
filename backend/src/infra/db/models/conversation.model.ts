import { HydratedDocument, Model, model, Schema, Types } from 'mongoose';

import { MODEL_NAMES } from '../db.constants.js';

interface IConversation {
  participants: Types.ObjectId[];
  isGroup: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IConversationDocument = HydratedDocument<IConversation>;

type IConversationModel = Model<IConversationDocument>;

const ConversationSchema = new Schema<IConversation, IConversationModel>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: MODEL_NAMES.user,
        index: true,
      },
    ],
    isGroup: Boolean,
  },
  { timestamps: true }
);

export const ConversationModel = model<IConversation, IConversationModel>(
  MODEL_NAMES.conversation,
  ConversationSchema
);
