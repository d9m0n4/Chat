import { Theme } from 'features/ChangeTheme/ui/ThemeCard';
import { useLayoutEffect } from 'react';

import { Loader } from '../shared/ui/Loader/ui/Loader';
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
