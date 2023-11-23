import { EditProfile } from 'features/EditProfile';
import React, { FC } from 'react';

import cls from './ProfilePage.module.scss';

export const ProfilePage: FC = () => {
  return (
    <div className={cls.profile}>
      <div className={cls.info}>
        <EditProfile />
      </div>
    </div>
  );
};
