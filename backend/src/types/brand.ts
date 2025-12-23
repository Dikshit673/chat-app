import { z } from 'zod';

/* ---------- Brand utility ---------- */
declare const brand: unique symbol;

type Brand<T, B extends string> = T & {
  readonly [brand]: B;
};

/* ---------- Branded ID types ---------- */
export type UserId = Brand<string, 'UserId'>;
export type MessageId = Brand<string, 'MessageId'>;
export type PostId = Brand<string, 'PostId'>;

/* ---------- Zod schemas ---------- */
export const userIdSchema = z.string().transform((v) => v as UserId);

export const messageIdSchema = z.string().transform((v) => v as MessageId);

export const postIdSchema = z.string().transform((v) => v as PostId);
