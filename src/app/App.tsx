import { Theme } from 'features/ChangeTheme/ui/ThemeCard';
import { useEffect, useLayoutEffect } from 'react';

import { fetchUserData } from '../entities/User/model/services/fetchUserData';
import { socket } from '../shared/config/api/ws';
import { useAppDispatch } from '../shared/hooks/useAppDispatch/useAppDispatch';
import { AppRouter } from './providers/routerProvider';
import './styles/index.scss';

const defaultTheme = Theme.DEFAULT;

function App() {
  const dispatch = useAppDispatch();
  const theme = localStorage.getItem('theme') || defaultTheme;
  dispatch(fetchUserData());

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
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
