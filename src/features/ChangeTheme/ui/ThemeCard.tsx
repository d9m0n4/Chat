import clsx from 'classnames';
import React, { useEffect, useState } from 'react';

import cls from './ThemeCard.module.scss';

export enum Theme {
  DEFAULT = 'default',
  DARK = 'dark',
}

const defaultTheme = Theme.DEFAULT;

export const ThemeCard = ({ themeName }: { themeName: string }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || defaultTheme);

  const changeTheme = () => {
    setTheme((prev) => (prev === Theme.DARK ? Theme.DEFAULT : Theme.DARK));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return <div className={clsx(cls.theme__card, cls[themeName])} onClick={changeTheme} />;
};
