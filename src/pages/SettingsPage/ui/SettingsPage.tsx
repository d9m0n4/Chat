import { ThemeCard } from 'features/ChangeTheme';
import { Theme } from 'features/ChangeTheme/consts/themes';
import React, { FC } from 'react';
import { PageContainer } from 'widgets/PageContainer';

export const SettingsPage: FC = () => {
  return (
    <PageContainer>
      <ThemeCard classname={Theme.DEFAULT} themeName={Theme.DEFAULT} />
      <ThemeCard classname={Theme.DARK} themeName={Theme.DARK} />
      <ThemeCard classname={Theme.DARK_G} themeName={Theme.DARK_G} />
    </PageContainer>
  );
};
