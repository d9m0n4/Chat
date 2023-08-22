import React, { FC, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from 'shared/assets/icons/arrowR.svg';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button';
import { ButtonVariants } from 'shared/ui/Button/ui/Button';
import { Input } from 'shared/ui/Input/Input';

import { Login } from '../model/services/Login';
import cls from './LoginForm.module.scss';

export const LoginForm: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(Login({ nickName: login, password }));
    navigate('/');
  };
  return (
    <div className={cls.wrapper}>
      <div className={cls.title}>Войти</div>
      <form onSubmit={handleSubmit} className={cls.form}>
        <Input placeholder="Имя" value={login} onChange={setLogin} />
        <Input placeholder="Пароль" value={password} onChange={setPassword} />
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
