import { model, Schema } from 'mongoose';

import { MODEL_NAMES } from '@/constants.js';

const ConversationSchema = new Schema(
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

export const ConversationModel = model(
  MODEL_NAMES.conversation,
  ConversationSchema
);
