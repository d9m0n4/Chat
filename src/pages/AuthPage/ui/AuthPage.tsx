import { getUserData } from 'entities/User/model/selectors/getUserData';
import { LoginForm } from 'features/Login';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from 'shared/assets/icons/logo.svg';

import cls from './AuthPage.module.scss';

export const AuthPage: FC = () => {
  const userData = useSelector(getUserData);
  const navigate = useNavigate();

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
