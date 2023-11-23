import clsx from 'classnames';
import React, { FC, HTMLAttributes } from 'react';

import cls from './Avatar.module.scss';

interface AvatarProps extends HTMLAttributes<HTMLImageElement> {
  src?: string | null;
  width?: number;
  height?: number;
  name?: string;
  onClick?: () => void;
  className?: string;
}

export const Avatar: FC<AvatarProps> = ({
  src,
  width = 48,
  name = 'Grach',
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(cls.avatar, className)}
      style={{
        maxWidth: `${width}px`,
        width: `${width}px`,
        height: `${width}px`,
      }}
    >
      {src ? (
        <img
          className={cls.avatar__image}
          src={src}
          width={width}
          height={width}
          alt="avatar"
        />
      ) : (
        <span>{name.slice(0, 1)}</span>
      )}
    </div>
  );
};
