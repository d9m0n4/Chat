import { ThemeCard } from 'features/ChangeTheme';
import React, { FC } from 'react';

import cls from './SettingsPage.module.scss';

// interface SettingsPageProps {}

export const SettingsPage: FC = () => {
  return (
    <div className={cls.page__content}>
      <div className={cls.body}>
        <ThemeCard themeName="w" />
      </div>
    </div>
  );
};
