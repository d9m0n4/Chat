import {
  getAuthMessage,
  getIsAuthState,
} from 'features/Auth/model/selectors/getAuthState';
import { authActions } from 'features/Auth/model/slices/authSlice';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from 'shared/assets/icons/logo.svg';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

import cls from './AuthPage.module.scss';

export const AuthPage: FC = () => {
  const isAuth = useSelector(getIsAuthState);
  const navigate = useNavigate();
  const authMessage = useSelector(getAuthMessage);
  const dispatch = useAppDispatch();

  if (authMessage) {
    setTimeout(() => {
      dispatch(authActions.resetMessage());
    }, 3000);
  }

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

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
