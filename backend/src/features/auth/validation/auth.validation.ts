import type z from 'zod';

import { schemaValidation } from '@/utils/zod/schemaValidation.js';

import {
  type LoginUserPayload,
  type RegisterUserPayload,
} from './auth.schema.js';

export class AuthValidation {
  private loginUserSchema: z.Schema<LoginUserPayload>;
  private registerUserSchema: z.Schema<RegisterUserPayload>;
  private schemaValidation: <T>(schema: z.Schema<T>, inputData: unknown) => T;
  constructor(
    loginUserSchema: z.Schema<LoginUserPayload>,
    registerUserSchema: z.Schema<RegisterUserPayload>
  ) {
    this.loginUserSchema = loginUserSchema;
    this.registerUserSchema = registerUserSchema;
    this.schemaValidation = schemaValidation;
  }
  login(inputData: unknown) {
    return this.schemaValidation(this.loginUserSchema, inputData);
  }
  register(inputData: unknown) {
    return this.schemaValidation(this.registerUserSchema, inputData);
  }
}
