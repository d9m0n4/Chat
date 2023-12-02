import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import clsx from 'classnames';
import { userActions } from 'entities/User/model/slices/userSlice';
import { IUserData } from 'entities/User/model/types/user';
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
  const [submitError, setSubmitError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginData>({ mode: 'onChange', resolver: yupResolver(schema) });
  const onSubmitForm = async (data: LoginData) => {
    try {
      const { data: UserData } = await api.post<IUserData>('auth/signIn', data);
      localStorage.setItem('jwt', JSON.stringify({ jwt: UserData.accessToken }));
      await dispatch(userActions.setAuthData(UserData));
      reset();
    } catch (e) {
      if (e && e instanceof AxiosError) {
        setSubmitError(e.response?.data.message);
      }
      reset();
      setTimeout(() => setSubmitError(null), 5000);
    }
  };

  return (
    <>
      <div className={cls.wrapper}>
        <div className={cls.title}>Войти</div>
        <form onSubmit={handleSubmit((data) => onSubmitForm(data))} className={cls.form}>
          <div className={cls['form__input-control']}>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  className={clsx(cls.input, !!errors.nickName && cls['input--error'])}
                  {...field}
                  placeholder="Имя пользователя"
                />
              )}
              name={'nickName'}
              defaultValue={''}
            />
            {errors.nickName && <span className={cls.error}>{errors['nickName']?.message}</span>}
          </div>
          <div className={cls['form__input-control']}>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  className={clsx(cls.input, !!errors.password && cls['input--error'])}
                  {...field}
                  placeholder="Пароль"
                  type={isPasswordShown ? 'text' : 'password'}
                  after={isPasswordShown ? <EyeOff className="icon" /> : <Eye className="icon" />}
                  onAfterIconClick={() => setIsPasswordShown(!isPasswordShown)}
                />
              )}
              name={'password'}
              defaultValue={''}
            />
            {errors.password && <span className={cls.error}>{errors['password']?.message}</span>}
          </div>
          <Button
            type="submit"
            variant={ButtonVariants.PRIMARY}
            className={cls.button}
            disabled={!isValid || isSubmitting}
          >
            <Arrow />
          </Button>
          <div className={cls['submit-error']}>{submitError}</div>
        </form>
      </div>
    </>
  );
};
