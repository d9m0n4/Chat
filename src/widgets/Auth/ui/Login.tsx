import { LoginForm } from 'features/Auth';
import React from 'react';
import { Link } from 'react-router-dom';

import cls from './Auth.module.scss';

export const Login = () => {
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
    </div>
  );
};
