import type { Types } from 'mongoose';

import { convertToBrandId } from '@/application/db/mongo/utils/convertToBrandId.js';

import { messageIdSchema } from '../../validation/message.schema.js';

export function parseAsMessageId(id: Types.ObjectId | string) {
  return convertToBrandId(id, messageIdSchema);
}
