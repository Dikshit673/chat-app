import type { Types } from 'mongoose';

import { convertToBrandId } from '@/application/db/mongo/utils/convertToBrandId.js';

import { userIdSchema } from '../../validation/user.schema.js';

export function parseAsUserId(id: Types.ObjectId | string) {
  return convertToBrandId(id, userIdSchema);
}
