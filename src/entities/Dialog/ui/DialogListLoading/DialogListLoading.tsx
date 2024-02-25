import React from 'react';

import { Skeleton } from 'shared/ui/Skeleton';

import cls from './DialogListLoading.module.scss';

export const DialogListLoading = () => {
  return (
    <div className={cls.dialogList__loading}>
      <Skeleton width={268} height={56} borderRadius={16} />
      <Skeleton width={268} height={56} borderRadius={16} />
      <Skeleton width={268} height={56} borderRadius={16} />
      <Skeleton width={268} height={56} borderRadius={16} />
      <Skeleton width={268} height={56} borderRadius={16} />
      <Skeleton width={268} height={56} borderRadius={16} />
      <Skeleton width={268} height={56} borderRadius={16} />
      <Skeleton width={268} height={56} borderRadius={16} />
      <Skeleton width={268} height={56} borderRadius={16} />
      <Skeleton width={268} height={56} borderRadius={16} />
      <Skeleton width={268} height={56} borderRadius={16} />
      <Skeleton width={268} height={56} borderRadius={16} />
    </div>
  );
};
