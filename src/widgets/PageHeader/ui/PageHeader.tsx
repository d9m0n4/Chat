import React, { FC, PropsWithChildren } from 'react';

import cls from './PageHeader.module.scss';

export const PageHeader: FC<PropsWithChildren> = ({ children }) => {
  return <div className={cls.page__header}>{children}</div>;
};
