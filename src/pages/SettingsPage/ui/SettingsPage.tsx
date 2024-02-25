import React, { FC } from 'react';

import { ThemeCard } from 'features/ChangeTheme';
import { Theme } from 'features/ChangeTheme/consts/themes';
import { PageContainer } from 'widgets/PageContainer';

import cls from './SettingsPage.module.scss';

export const SettingsPage: FC = () => {
  return (
    <PageContainer>
      <div className={cls.settings}>
        <div className={cls.settings__theme}>
          <ThemeCard classname={Theme.DEFAULT} themeName={Theme.DEFAULT} />
          <ThemeCard classname={Theme.DARK} themeName={Theme.DARK} />
          <ThemeCard classname={Theme.DARK_G} themeName={Theme.DARK_G} />
        </div>
      </div>
    </PageContainer>
  );
};
