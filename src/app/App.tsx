import { Theme } from 'features/ChangeTheme/ui/ThemeCard';
import { useEffect } from 'react';

import { AppRouter } from './providers/routerProvider';
import './styles/index.scss';

const defaultTheme = Theme.DEFAULT;

function App() {
  const theme = localStorage.getItem('theme') || defaultTheme;
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;
