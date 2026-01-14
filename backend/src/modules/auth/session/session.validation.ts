import z from 'zod';

import type { SessionId } from './session.types.js';

export const sessionIdSchema = z.string().transform((v) => v as SessionId);
