import { RegisterForm } from 'features/Auth';
import { getAuthError } from 'features/Auth/model/selectors/getAuthState';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import cls from './Auth.module.scss';

export const Register = () => {
  const errorMessage = useSelector(getAuthError);

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
      {errorMessage && (
        <div className={cls['submit-error']}>{errorMessage}</div>
      )}
    </div>
  );
};
