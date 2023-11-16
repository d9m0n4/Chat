import React from 'react';

import { Portal } from '../../Portal';
import { TypingDots } from '../../TypingMessage';
import cls from './Loader.module.scss';

export const Loader = () => {
  return (
    <Portal>
      <div className={cls.loader}>
        <TypingDots />
      </div>
    </Portal>
  );
};
