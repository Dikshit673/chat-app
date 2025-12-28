import axios from 'axios';

import type { AppStore } from '@/app/store';
import { AppEnvs } from '@/utils/AppEnvs';

let store: AppStore;

export const injectStore = (_store: AppStore) => {
  store = _store;
};

export const API = axios.create({
  baseURL: AppEnvs.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

// add token to auth header
API.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
