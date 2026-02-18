import type { Types } from 'mongoose';

import { convertToBrandId } from '@/application/db/mongo/utils/convertToBrandId.js';

import { conversationIdSchema } from '../../validation/conversation.schema.js';

export function parseAsConversationId(id: Types.ObjectId | string) {
  return convertToBrandId(id, conversationIdSchema);
}
