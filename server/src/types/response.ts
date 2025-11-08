import { IuserNoPass } from '@/features/user/types/user.js';

export interface ApiResponse {
  success: boolean;
  message: string;
}

export type ApiResponseData = {
  jwt?: string;
  user?: IuserNoPass;
};
