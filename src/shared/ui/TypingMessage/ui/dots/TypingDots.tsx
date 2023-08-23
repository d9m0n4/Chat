import React from 'react';

import cls from './TypingDots.module.scss';

export const TypingDots = ({ width = 9 }: { width?: number }) => {
  return (
    <div className={cls.dots}>
      <span
        style={{ width: `${width}px`, height: `${width}px` }}
        className={cls.dots__item}
      />
      <span
        style={{ width: `${width}px`, height: `${width}px` }}
        className={cls.dots__item}
      />
      <span
        style={{ width: `${width}px`, height: `${width}px` }}
        className={cls.dots__item}
      />
    </div>
  );
};
