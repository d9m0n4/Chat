import { AxiosError } from 'axios';
import { IUserData } from 'entities/User/model/types/user';
import React, { FC } from 'react';
import { api } from 'shared/config/api';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

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
    try {
      const { data: UserData } = await api.post<IUserData>('auth/signUp', data);
    } catch (e) {
      if (e && e instanceof AxiosError) {
        console.log(e);
      }
    }
  };
  return (
    <AuthForm
      onSubmitForm={(data: RegisterData) => onSubmitForm(data)}
      schema={schema}
      fields={loginFields}
    />
  );
};
