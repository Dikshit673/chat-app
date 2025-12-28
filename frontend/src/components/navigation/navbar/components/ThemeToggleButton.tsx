// import { type ComponentProps } from 'react';
import { MoonStar, Sun } from 'lucide-react';
import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui';
import { toggleTheme } from '@/features/ui/themeSlice';

// type ThemeButtonProps = ComponentProps<'button'>;

export const ThemeToggleButton = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.ui.theme);

  const handleClick = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <Button
      className='rounded-full p-2 text-xl active:scale-95'
      intent='icon'
      type='button'
      onClick={handleClick}
    >
      {theme === 'light' ? <Sun /> : <MoonStar />}
    </Button>
  );
};
