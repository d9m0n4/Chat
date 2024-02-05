import { LoginForm } from 'features/Auth';
import { getAuthError } from 'features/Auth/model/selectors/getAuthState';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import cls from './Auth.module.scss';

export const Login = () => {
  const errorMessage = useSelector(getAuthError);
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
      {errorMessage && (
        <div className={cls['submit-error']}>{errorMessage}</div>
      )}
    </div>
  );
};
