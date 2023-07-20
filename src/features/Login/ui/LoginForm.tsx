import React, { FC } from 'react';
import { ReactComponent as Arrow } from 'shared/assets/icons/arrowR.svg';
import { Button } from 'shared/ui/Button';
import { ButtonVariants } from 'shared/ui/Button/ui/Button';
import { Input } from 'shared/ui/Input/Input';

import cls from './LoginForm.module.scss';

export const LoginForm: FC = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.title}>Войти</div>
      <form className={cls.form}>
        <Input placeholder="Имя" />
        <Input placeholder="Пароль" />
        <Button variant={ButtonVariants.PRIMARY} className={cls.button}>
          <Arrow />
        </Button>
      </form>
    </div>
  );
};
