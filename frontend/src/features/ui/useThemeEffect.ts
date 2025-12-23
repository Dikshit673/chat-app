import { useEffect } from 'react';
import { THEME_KEY, useTheme } from './themeSlice';

export const useThemeEffect = () => {
  const theme = useTheme();

  useEffect(() => {
    console.log(theme);
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
  return null;
};
