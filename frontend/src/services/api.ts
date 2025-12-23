import { JWT_TOKEN_KEY } from '@/features/auth/auth.constants';
import { AppEnvs } from '@/utils/AppEnvs';
import { storage } from '@/utils/storage';
import axios from 'axios';

export const API = axios.create({
  baseURL: AppEnvs.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

// add token to auth header
API.interceptors.request.use((config) => {
  const token = storage.get<string | null>(JWT_TOKEN_KEY, null);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
