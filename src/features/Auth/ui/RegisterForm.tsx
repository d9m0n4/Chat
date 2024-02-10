import React, { FC } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

import { register } from '../model/services/Register';
import { RegisterData } from '../model/types/register';
import { schema } from '../model/validators/loginFormValidator';
import { AuthForm } from './AuthForm/AuthForm';

export const RegisterForm: FC = () => {
  const loginFields = [
    { name: 'name', placeholder: 'Имя' },
    { name: 'nickName', placeholder: 'Имя пользователя' },
    { name: 'password', placeholder: 'Пароль', type: 'password' },
  ];

  const dispatch = useAppDispatch();

  const onSubmitForm = async (data: RegisterData) => {
    await dispatch(register(data));
  };

  return (
    <AuthForm
      onSubmitForm={(data: RegisterData) => onSubmitForm(data)}
      schema={schema}
      fields={loginFields}
    />
  );
};
