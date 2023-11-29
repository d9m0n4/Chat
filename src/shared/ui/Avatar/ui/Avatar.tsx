import clsx from 'classnames';
import React, { FC, HTMLAttributes } from 'react';

// eslint-disable-next-line no-restricted-imports
import { getInitials } from '../../../utils/getInitials/getInitials';
import cls from './Avatar.module.scss';

interface AvatarProps extends HTMLAttributes<HTMLImageElement> {
  src?: string | null;
  width?: number;
  height?: number;
  name?: string;
  onClick?: () => void;
  className?: string;
}

export const Avatar: FC<AvatarProps> = ({ src, width = 48, name, onClick, className }) => {
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
        <img className={cls.avatar__image} src={src} width={width} height={width} alt="avatar" />
      ) : (
        <span>{name && getInitials(name)}</span>
      )}
    </div>
  );
};
