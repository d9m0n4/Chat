import clsx from 'classnames';
import React from 'react';

import { Theme } from '../consts/themes';
import cls from './ThemeCard.module.scss';

export const ThemeCard = ({
  themeName,
  classname,
}: {
  themeName: Theme;
  classname?: string;
}) => {
  const changeTheme = () => {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
  };

  return (
    <div
      className={clsx(cls.theme__card, classname && cls[classname])}
      onClick={changeTheme}
    />
  );
};
