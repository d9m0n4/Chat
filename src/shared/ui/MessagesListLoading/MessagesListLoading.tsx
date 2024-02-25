import React from 'react';

import { TypingDots } from '../TypingMessage';
import cls from './MessagesListLoading.module.scss';

export const MessagesListLoading = () => {
  return (
    <div className={cls.messagesList__loading}>
      <TypingDots />
    </div>
  );
};
