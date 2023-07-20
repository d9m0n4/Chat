import React, { FC } from 'react';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';
import { ButtonVariants } from 'shared/ui/Button/ui/Button';
import { Input } from 'shared/ui/Input/Input';

import cls from './ProfilePage.module.scss';

// interface ProfilePageProps {}

export const ProfilePage: FC = () => {
  return (
    <div className={cls.profile}>
      <div className={cls.info}>
        <Avatar width={100} />
        <form className={cls.profile__form} action="">
          <Input />
          <Input />
          <Input />
          <Button variant={ButtonVariants.PRIMARY}>Сохранить</Button>
        </form>
      </div>
    </div>
  );
};
