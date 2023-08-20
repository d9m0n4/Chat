import { Theme } from 'features/ChangeTheme/ui/ThemeCard';
import { useEffect, useLayoutEffect } from 'react';

import { dialogActions } from '../entities/Dialog/model/slices/dialogSlice';
import { fetchUserData } from '../entities/User/model/services/fetchUserData';
import { socket } from '../shared/config/api/ws';
import { useAppDispatch } from '../shared/hooks/useAppDispatch/useAppDispatch';
import { AppRouter } from './providers/routerProvider';
import './styles/index.scss';

const defaultTheme = Theme.DEFAULT;

function App() {
  const theme = localStorage.getItem('theme') || defaultTheme;
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    dispatch(fetchUserData());
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;
