import React, { FC } from 'react';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { useTypingIndicator } from 'shared/hooks/useTypingIndicator/useTypingIndicator';
import { Avatar } from 'shared/ui/Avatar';
import { Online } from 'shared/ui/Online';
import { TypingDots } from 'shared/ui/TypingMessage';
import { formatDate } from 'shared/utils/formatDate/formatDate';

import { IDialog } from '../../model/types/dialogs';
import cls from './DialogItem.module.scss';

interface IDialogItem extends IDialog {
  isActive?: boolean;
  isOnline: boolean | undefined;
  onClick: () => void;
  myId: number | undefined;
}

export const DialogItem: FC<IDialogItem> = ({
  isActive,
  latestMessage,
  unreadMessagesCount,
  partner,
  isOnline,
  onClick,
  id,
  myId,
}) => {
  const { socket } = useSocket();
  const isTyping = useTypingIndicator(id, socket);

  return (
    <li className={`${cls.item} ${isActive && cls.active}`} onClick={onClick}>
      <div className={cls.user}>
        {isOnline && <Online className={cls.isOnline} />}
        <Avatar width={40} height={40} className={cls.avatar} />
        {unreadMessagesCount > 0 && (
          <span className={cls.count}>{unreadMessagesCount}</span>
        )}
      </div>
      <div className={cls.body}>
        <div className={cls.title}>
          <span>{partner && partner.name}</span>
        </div>

        <div className={cls.subtitle}>
          {isTyping ? (
            <>
              <div>
                <TypingDots width={4} />
              </div>
              печатает
            </>
          ) : (
            <span>{latestMessage && latestMessage.content}</span>
          )}
        </div>
      </div>
      <div className={cls.info}>
        {latestMessage && (
          <div className={cls.wrapper}>
            <span className={cls.date}>
              {formatDate(latestMessage.created_at)}
            </span>
            {!latestMessage.isRead && latestMessage.user.id === myId && (
              <span className={cls.status}></span>
            )}
          </div>
        )}
      </div>
    </li>
  );
};
