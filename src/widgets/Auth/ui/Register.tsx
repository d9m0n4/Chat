import { RegisterForm } from 'features/Auth';
import React from 'react';
import { Link } from 'react-router-dom';

import cls from './Auth.module.scss';

export const Register = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.title}>Регистрация</div>
      <RegisterForm />
      <div className={cls['next-form']}>
        <p>Уже зарегистрированы? </p>
        <Link className={cls.link} to={'/login'}>
          Войти
        </Link>
      </div>
    </div>
  );
};
