import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import clsx from 'classnames';
import { User } from 'entities/User/model/types/user';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ReactComponent as Arrow } from 'shared/assets/icons/arrowR.svg';
import { ReactComponent as EyeOff } from 'shared/assets/icons/eye-off.svg';
import { ReactComponent as Eye } from 'shared/assets/icons/eye.svg';
import { api } from 'shared/config/api/api';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button';
import { ButtonVariants } from 'shared/ui/Button/ui/Button';
import { Input } from 'shared/ui/Input/Input';

import { schema } from '../model/validators/formValidator';
import cls from './LoginForm.module.scss';

interface LoginData {
  nickName: string;
  password: string;
}
export const LoginForm: FC = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const dispatch = useAppDispatch();
  const onSubmitForm = async (data: LoginData) => {
    try {
      const { data: UserData } = await api.post<User>('auth/signIn', data);
      console.log(UserData);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.data);
      }
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginData>({ mode: 'onChange', resolver: yupResolver(schema) });

  return (
    <div className={cls.wrapper}>
      <div className={cls.title}>Войти</div>
      <form
        onSubmit={handleSubmit((data, event) => onSubmitForm(data))}
        className={cls.form}
      >
        <div className={cls['form__input-control']}>
          <Controller
            control={control}
            render={({ field: { value, onChange, ref } }) => (
              <Input
                placeholder="Имя пользователя"
                value={value}
                onChange={onChange}
                ref={ref}
              />
            )}
            name={'nickName'}
          />
          <span>{errors['nickName']?.message}</span>
        </div>
        <div className={cls['form__input-control']}>
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                className={clsx(
                  cls.input,
                  !!errors.password && cls['input--error']
                )}
                {...field}
                placeholder="Пароль"
                type={isPasswordShown ? 'text' : 'password'}
                after={
                  isPasswordShown ? (
                    <EyeOff className="icon" />
                  ) : (
                    <Eye className="icon" />
                  )
                }
                onAfterIconClick={() => setIsPasswordShown(!isPasswordShown)}
              />
            )}
            name={'password'}
          />
        </div>
        <Button
          type="submit"
          variant={ButtonVariants.PRIMARY}
          className={cls.button}
          disabled={!isValid || isSubmitting}
        >
          <Arrow />
        </Button>
      </form>
    </div>
  );
};
