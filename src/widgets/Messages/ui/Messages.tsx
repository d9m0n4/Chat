import { Message } from 'entities/Message/ui/Message';
import React from 'react';
import { Input } from 'shared/ui/Input/Input';
import { MessageInput } from 'widgets/MessageInput';

import cls from './Messages.module.scss';
import { MessagesList } from './MessagesList/MessagesList';

export const Messages = () => {
  return (
    <div className={cls.messages__wrapper}>
      <MessagesList messages={[1, 2]} />
      <MessageInput />
    </div>
  );
};
