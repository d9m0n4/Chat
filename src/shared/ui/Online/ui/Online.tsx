import React, { FC } from 'react';

import cls from './Online.module.scss';

interface OnlineProps {
  className?: string;
}

export const Online: FC<OnlineProps> = ({ className }) => {
  return <span className={`${cls.online} ${className}`} />;
};
