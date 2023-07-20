import React, { FC, HTMLAttributes } from 'react';

import cls from './Avatar.module.scss';

interface AvatarProps extends HTMLAttributes<HTMLImageElement> {
  src?: string;
  width?: number;
  height?: number;
  name?: string;
}

export const Avatar: FC<AvatarProps> = ({ src, width = 48, name = 'Grach' }) => {
  return (
    <div
      className={cls.avatar}
      style={{ maxWidth: `${width}px`, width: `${width}px`, height: `${width}px` }}
    >
      {src ? (
        <img src={src} width={width} height={width} alt="avatar" />
      ) : (
        <span>{name.slice(0, 1)}</span>
      )}
    </div>
  );
};
