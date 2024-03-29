import React, { FC, HTMLAttributes } from 'react';

import clsx from 'classnames';
import { generateAvatarColor } from 'shared/utils/generateAvatarColor/generateAvatarColor';
import { getInitials } from 'shared/utils/getInitials/getInitials';

import { AppImage } from '../../Image';
import { Skeleton } from '../../Skeleton';
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
  name,
  onClick,
  className,
}) => {
  const color =
    name && generateAvatarColor(getInitials(`${name} ${name.length}`));

  return (
    <div
      className={cls.avatar__container}
      onClick={onClick}
      style={{
        maxWidth: `${width}px`,
        width: `${width}px`,
        height: `${width}px`,
      }}
    >
      {src ? (
        <AppImage
          height={width}
          width={width}
          className={className}
          src={src}
          fallback={
            <Skeleton height={width} width={width} borderRadius={'50%'} />
          }
        />
      ) : (
        <div
          className={clsx(cls.avatar, className)}
          style={{
            maxWidth: `${width}px`,
            width: `${width}px`,
            height: `${width}px`,
            background: `linear-gradient(#fff -95%, ${
              color ||
              getComputedStyle(document.body).getPropertyValue(
                '--app-secondary-bg'
              )
            })`,
          }}
        >
          {name && getInitials(name)}
        </div>
      )}
    </div>
  );
};
