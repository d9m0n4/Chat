import React, { FC } from 'react';

import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  width: number;
  height: number;
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
