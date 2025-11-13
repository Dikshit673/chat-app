import { IUserPayload } from '@/features/user/types/user.js';

export interface ApiResponse {
  success: boolean;
  message: string;
}

export type ApiResponseData = {
  jwtToken?: string;
  authUser?: IUserPayload;
};
