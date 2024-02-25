import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { LoginForm, getAuthMessage } from 'features/Auth';

import cls from './Auth.module.scss';

export const Login = () => {
  const authMessage = useSelector(getAuthMessage);

  return (
    <div className={cls.wrapper}>
      <div className={cls.title}>Войти</div>
      <LoginForm />
      <div className={cls['next-form']}>
        <p>Нет аккаунта? </p>
        <Link className={cls.link} to={'/register'}>
          Зарегистрироваться
        </Link>
      </div>
      {authMessage && <div className={cls['submit-error']}>{authMessage}</div>}
    </div>
  );
};
