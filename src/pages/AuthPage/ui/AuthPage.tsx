import { LoginForm } from 'features/Login';
import React, { FC } from 'react';
import { ReactComponent as Logo } from 'shared/assets/icons/logo.svg';

import cls from './AuthPage.module.scss';

export const AuthPage: FC = () => {
  return (
    <div className={cls.auth}>
      <div className={cls.auth__title}>
        <div className={cls.logo}>
          <Logo />
        </div>
      </div>
      <div className={cls.auth__form}>
        <LoginForm />
      </div>
    </div>
  );
};
