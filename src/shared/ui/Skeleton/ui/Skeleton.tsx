import React, { FC } from 'react';

import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  width: number | string;
  height: number | string;
  borderRadius: number | string;
}

export const Skeleton: FC<SkeletonProps> = ({
  height,
  borderRadius,
  width,
  className,
}) => {
  return (
    <div
      className={`${cls.skeleton} ${className || ''}`}
      style={{ width, height, borderRadius }}
    />
  );
};
