import { useEffect } from 'react';
import { RouterProvider } from 'react-router';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { SocketProvider } from './contexts/socket/SocketProvider';
import { checkMe } from './features/auth/authThunks';
import { useThemeEffect } from './features/ui/useThemeEffect';
import { rootRouter } from './router/RootRouter';

function App() {
  useThemeEffect();
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);

  useEffect(() => {
    let isFirstTry = true;
    if (isFirstTry && token) {
      dispatch(checkMe());
    }
    isFirstTry = false;
  }, [token, dispatch]);

  return (
    <SocketProvider>
      <RouterProvider router={rootRouter} />
    </SocketProvider>
  );
}

export default App;
