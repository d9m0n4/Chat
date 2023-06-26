import React, { FC, HTMLAttributes } from 'react';
import img from 'shared/assets/icons/Ellipse.png';

import cls from './Avatar.module.scss';

interface AvatarProps extends HTMLAttributes<HTMLImageElement> {
  src?: string;
  width?: number;
  height?: number;
}

export const Avatar: FC<AvatarProps> = ({ src, width = 48 }) => {
  return (
    <div className={cls.avatar} style={{ maxWidth: `${width}px` }}>
      {<img src={img} width={width} height={width} alt="avatar" />}
    </div>
  );
};
