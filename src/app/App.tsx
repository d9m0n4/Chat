import { Theme } from 'features/ChangeTheme/ui/ThemeCard';
import { useLayoutEffect } from 'react';

import { fetchUserData } from '../entities/User/model/services/fetchUserData';
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

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;
