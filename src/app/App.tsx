import { useLayoutEffect } from 'react';

import { defaultTheme } from '../features/ChangeTheme/consts/themes';
import { AppRouter } from './providers/routerProvider';
import './styles/index.scss';

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
