import React, { FC } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

import { login } from '../model/services/Login';
import { schema } from '../model/validators/loginFormValidator';
import { AuthForm } from './AuthForm/AuthForm';

interface LoginData {
  nickName: string;
  password: string;
}

export const LoginForm: FC = () => {
  const loginFields = [
    { name: 'nickName', placeholder: 'Имя пользователя' },
    { name: 'password', placeholder: 'Пароль', type: 'password' },
  ];

  const dispatch = useAppDispatch();

  const onSubmitForm = async (data: LoginData) => {
    dispatch(login(data));
  };
  return (
    <AuthForm
      onSubmitForm={(data: LoginData) => onSubmitForm(data)}
      schema={schema}
      fields={loginFields}
    />
  );
};
