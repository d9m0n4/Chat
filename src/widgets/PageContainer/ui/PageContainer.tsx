import React, { FC } from 'react';

import cls from './PageContainer.module.scss';

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return (
    <div className={cls.page__content}>
      <div className={cls.page__container}>{children}</div>
    </div>
  );
};
