import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RegisterForm, getAuthMessage } from 'features/Auth';

import cls from './Auth.module.scss';

export const Register = () => {
  const authMessage = useSelector(getAuthMessage);

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
      {authMessage && <div className={cls['submit-error']}>{authMessage}</div>}
    </div>
  );
};
