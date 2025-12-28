import { createSlice } from '@reduxjs/toolkit';

import { useAppSelector } from '@/app/hooks';

type Theme = 'light' | 'dark';

export const THEME_KEY = 'theme';

function loadTheme(): Theme {
  const theme = localStorage.getItem(THEME_KEY) as Theme | null;
  return theme ?? 'light';
}

type InitialState = {
  theme: Theme;
};

const initialState: InitialState = {
  theme: loadTheme(),
};

const themeSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      const isDark = state.theme === 'dark';
      state.theme = isDark ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, state.theme);
    },
  },
});

const { actions, reducer: themeReducer } = themeSlice;

export const { toggleTheme } = actions;
export default themeReducer;

export const useTheme = () => useAppSelector((s) => s.ui.theme);
