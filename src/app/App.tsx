import { Theme } from 'features/ChangeTheme/ui/ThemeCard';
import { useEffect } from 'react';

import { fetchUserData } from '../entities/User/model/services/fetchUserData';
import { useAppDispatch } from '../shared/hooks/useAppDispatch/useAppDispatch';
import { AppRouter } from './providers/routerProvider';
import './styles/index.scss';

const defaultTheme = Theme.DEFAULT;

function App() {
  const dispatch = useAppDispatch();
  const theme = localStorage.getItem('theme') || defaultTheme;
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    dispatch(fetchUserData());
  }, [theme]);

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;
