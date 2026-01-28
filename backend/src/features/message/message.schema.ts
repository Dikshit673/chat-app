import z from 'zod';

import type { MessageId } from './message.types.js';

export const messageIdSchema = z.string().transform((v) => v as MessageId);
