import React from 'react';
import { Button } from 'shared/ui/Button';
import { ButtonVariants } from 'shared/ui/Button/ui/Button';

import cls from './AppError.module.scss';

export const AppError = () => {
  const handleReload = () => {
    location.reload();
  };
  return (
    <div className={cls['app-error']}>
      <p className={cls['error-text']}>Что то пошло не так...</p>
      <Button variant={ButtonVariants.PRIMARY} onClick={handleReload}>
        Перезагрузить страницу
      </Button>
    </div>
  );
};
