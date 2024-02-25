import React, { FC } from 'react';
import { DeepPartial } from 'react-hook-form';

import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

import { register } from '../model/services/Register';
import { RegisterData } from '../model/types/register';
import { schema } from '../model/validators/registerFormValidator';
import { AuthForm } from './AuthForm/AuthForm';

export const RegisterForm: FC = () => {
  const loginFields = [
    { name: 'name', placeholder: 'Имя' },
    { name: 'nickName', placeholder: 'Имя пользователя' },
    { name: 'password', placeholder: 'Пароль', type: 'password' },
  ];

  const dispatch = useAppDispatch();

  const onSubmitForm = async (data: DeepPartial<RegisterData>) => {
    await dispatch(register(data as RegisterData));
  };

  return (
    <AuthForm
      onSubmitForm={onSubmitForm}
      schema={schema}
      fields={loginFields}
    />
  );
};
