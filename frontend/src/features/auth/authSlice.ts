import { createSlice } from '@reduxjs/toolkit';

import { AUTH_STATE_COOKIE_NAME } from '@/constants';

import type { AuthUser } from './auth.types';
import { checkMe, login, logout, refresh, register } from './authThunks';

interface AuthState {
  loading: boolean;
  error?: string | null;
  token?: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const loadAuthState = () => {
  const cookies = document.cookie.split('; ');
  const stateCookie = cookies.find((cookie) => {
    const [name] = cookie.split('=');
    return name === AUTH_STATE_COOKIE_NAME;
  });

  if (!stateCookie) return false;
  const [_, value] = stateCookie.split('=');
  if (value !== 'true') return false;
  return true;
};

const initialState: AuthState = {
  isAuthenticated: loadAuthState(), //TODO; initial false
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(register.fulfilled, (s, { payload }) => {
        const { data } = payload;
        if (!data) return;
        const { jwtToken, user } = data;
        s.loading = false;
        s.error = null;
        s.user = user;
        s.token = jwtToken;
        s.isAuthenticated = true;
      })
      .addCase(register.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload?.message || 'register failed';
        s.token = null;
        s.isAuthenticated = false;
      });

    builder
      .addCase(login.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(login.fulfilled, (s, { payload }) => {
        const { data } = payload;
        if (!data) return;
        const { jwtToken, user } = data;
        s.loading = false;
        s.error = null;
        s.user = user;
        s.token = jwtToken;
        s.isAuthenticated = true;
      })
      .addCase(login.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload?.message || 'login failed';
        s.token = null;
        s.isAuthenticated = false;
      });

    builder
      .addCase(logout.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(logout.fulfilled, (s) => {
        s.loading = false;
        s.error = null;
        s.token = null;
        s.user = null;
        s.isAuthenticated = false;
      })
      .addCase(logout.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload?.message || 'logout failed';
      });

    builder
      .addCase(refresh.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(refresh.fulfilled, (s, { payload }) => {
        const { data } = payload;
        if (!data) return;
        const { jwtToken } = data;
        s.loading = false;
        s.token = jwtToken;
      })
      .addCase(refresh.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload?.message || 'refresh failed';
        s.token = null;
      });

    builder
      .addCase(checkMe.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(checkMe.fulfilled, (s, { payload }) => {
        const { data } = payload;
        if (!data) return;
        s.loading = false;
        s.isAuthenticated = true;
        s.user = data.user;
      })
      .addCase(checkMe.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload?.message || 'check auth failed';
        s.isAuthenticated = false;
      });
  },
});

const { reducer: authReducer } = authSlice;

// export const { loadAuthStateByLS } = actions;
export default authReducer;
