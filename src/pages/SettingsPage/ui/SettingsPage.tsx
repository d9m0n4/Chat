import { ThemeCard } from 'features/ChangeTheme';
import React, { FC } from 'react';
import { PageContainer } from 'widgets/PageContainer';

import cls from './SettingsPage.module.scss';

export const SettingsPage: FC = () => {
  return (
    <PageContainer>
      <ThemeCard themeName="w" />
    </PageContainer>
  );
};
