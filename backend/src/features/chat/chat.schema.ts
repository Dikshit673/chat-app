import z from 'zod';

import type { ChatId } from './chat.types.js';

export const chatIdSchema = z.string().transform((v) => v as ChatId);
