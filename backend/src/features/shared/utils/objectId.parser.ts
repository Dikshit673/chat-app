import { Types } from 'mongoose';

import { sessionIdSchema } from '@/features/auth/session/session.schema.js';
import { chatIdSchema } from '@/features/chat/chat.schema.js';
import { conversationIdSchema } from '@/features/conversation/conversation.schema.js';
import { messageIdSchema } from '@/features/message/message.schema.js';
import { userIdSchema } from '@/features/user/user.schema.js';

export const objectIdParser = Object.freeze({
  asUserId: (id: Types.ObjectId) => userIdSchema.parse(id),
  asSessionId: (id: Types.ObjectId) => sessionIdSchema.parse(id),
  asMessageId: (id: Types.ObjectId) => messageIdSchema.parse(id),
  asChatId: (id: Types.ObjectId) => chatIdSchema.parse(id),
  asConversationId: (id: Types.ObjectId) => conversationIdSchema.parse(id),
});
