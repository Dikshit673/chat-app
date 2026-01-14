import z from 'zod';

import type { ConversationId } from './conversation.types.js';

export const conversationIdSchema = z
  .string()
  .transform((v) => v as ConversationId);
