import { getUserData } from 'entities/User';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from 'shared/assets/icons/logo.svg';

import cls from './AuthPage.module.scss';

export const AuthPage: FC = () => {
  const user = useSelector(getUserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className={cls.auth}>
      <div className={cls.auth__title}>
        <div className={cls.logo}>
          <Logo />
        </div>
      </div>
      <div className={cls.auth__form}>
        <Outlet />
      </div>
    </div>
  );
};
