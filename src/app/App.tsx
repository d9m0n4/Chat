import { Theme } from 'features/ChangeTheme/ui/ThemeCard';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';

import { dialogActions } from '../entities/Dialog/model/slices/dialogSlice';
import { getUserData } from '../entities/User/model/selectors/getUserData';
import { fetchUserData } from '../entities/User/model/services/fetchUserData';
import { useAppDispatch } from '../shared/hooks/useAppDispatch/useAppDispatch';
import { AppRouter } from './providers/routerProvider';
import './styles/index.scss';

const defaultTheme = Theme.DEFAULT;

function App() {
  const theme = localStorage.getItem('theme') || defaultTheme;
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;
