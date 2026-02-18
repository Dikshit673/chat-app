import type { Types } from 'mongoose';
import type z from 'zod';

export function convertToBrandId<T>(
  id: Types.ObjectId | string,
  schema: z.ZodType<T>
): T {
  const value = typeof id === 'string' ? id : id.toHexString();
  return schema.parse(value);
}
