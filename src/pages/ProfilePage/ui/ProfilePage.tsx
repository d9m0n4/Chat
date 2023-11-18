import { getUserData } from 'entities/User/model/selectors/getUserData';
import React, { FC, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';
import { ButtonVariants } from 'shared/ui/Button/ui/Button';
import { Input } from 'shared/ui/Input/Input';

import cls from './ProfilePage.module.scss';

// interface ProfilePageProps {}

export const ProfilePage: FC = () => {
  const userData = useSelector(getUserData);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={cls.profile}>
      <div className={cls.info}>
        <input type="file" ref={inputRef} hidden />
        <Avatar
          width={100}
          src={userData?.avatar}
          onClick={() => inputRef.current?.click()}
          className={cls.profile__avatar}
        />
        <form className={cls.profile__form}>
          <Input value={userData?.name} />
          <Input value={userData?.nickName} />
          <Button variant={ButtonVariants.PRIMARY}>Сохранить</Button>
        </form>
      </div>
    </div>
  );
};
