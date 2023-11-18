import axios from 'axios';
import { User } from 'entities/User/model/types/user';
import React, { FC, useState } from 'react';
import { ReactComponent as Arrow } from 'shared/assets/icons/arrowR.svg';
import { ReactComponent as EyeOff } from 'shared/assets/icons/eye-off.svg';
import { ReactComponent as Eye } from 'shared/assets/icons/eye.svg';
import { api } from 'shared/config/api/api';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button';
import { ButtonVariants } from 'shared/ui/Button/ui/Button';
import { Input } from 'shared/ui/Input/Input';

import cls from './LoginForm.module.scss';

interface LoginData {
  nickName: string;
  password: string;
}
export const LoginForm: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const dispatch = useAppDispatch();

  const handleLogin = async (data: LoginData) => {
    try {
      const { data: UserData } = await api.post<User>('auth/signIn', data);
      console.log(UserData);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.data);
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin({ nickName: login, password });
  };
  return (
    <div className={cls.wrapper}>
      <div className={cls.title}>Войти</div>
      <form onSubmit={handleSubmit} className={cls.form}>
        <Input
          placeholder="Имя пользователя"
          value={login}
          onChange={setLogin}
          aria-invalid={'true'}
        />
        <Input
          placeholder="Пароль"
          value={password}
          onChange={setPassword}
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
        <Button
          type="submit"
          variant={ButtonVariants.PRIMARY}
          className={cls.button}
        >
          <Arrow />
        </Button>
      </form>
    </div>
  );
};
