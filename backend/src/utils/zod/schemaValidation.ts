import type z from 'zod';

export function schemaValidation<T>(
  schema: z.Schema<T>,
  inputData: unknown
): T {
  const { success, data, error } = schema.safeParse(inputData);
  if (!success) throw new Error(error.message);
  return data;
}
