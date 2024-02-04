import { AxiosError } from 'axios';
import { userActions } from 'entities/User/model/slices/userSlice';
import { IUserData } from 'entities/User/model/types/user';
import React, { FC } from 'react';
import { api } from 'shared/config/api';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

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
    try {
      const { data: UserData } = await api.post<IUserData>('auth/signIn', data);
      localStorage.setItem('jwt', UserData.accessToken);
      await dispatch(userActions.setAuthData(UserData));
    } catch (e) {
      if (e && e instanceof AxiosError) {
        console.log(e);
      }
    }
  };
  return (
    <AuthForm
      onSubmitForm={(data: LoginData) => onSubmitForm(data)}
      schema={schema}
      fields={loginFields}
    />
  );
};
