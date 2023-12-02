import { EditProfile } from 'features/EditProfile';
import React, { FC } from 'react';
import { PageContainer } from 'widgets/PageContainer';

import cls from './ProfilePage.module.scss';

export const ProfilePage: FC = () => {
  return (
    <PageContainer>
      <div className={cls.profile}>
        <EditProfile />
      </div>
    </PageContainer>
  );
};
