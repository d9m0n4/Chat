import React, { FC, memo } from 'react';

import { BASE_URL } from 'shared/config/api/api';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { useTypingIndicator } from 'shared/hooks/useTypingIndicator/useTypingIndicator';
import { Avatar } from 'shared/ui/Avatar';
import { Online } from 'shared/ui/Online';
import { RippleEffect } from 'shared/ui/RippleEffect';
import { TypingDots } from 'shared/ui/TypingMessage';
import { formatDate } from 'shared/utils/formatDate/formatDate';

import { IDialog } from '../../model/types/dialogs';
import cls from './DialogItem.module.scss';

interface IDialogItem extends IDialog {
  isActive?: boolean;
  isOnline?: boolean;
  onClick: () => void;
  myId: number | undefined;
}

// eslint-disable-next-line react/display-name
export const DialogItem: FC<IDialogItem> = memo(
  ({
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
      <div
        className={`${cls.item} ${isActive && cls.active}`}
        onClick={onClick}
      >
        <RippleEffect />
        <div className={cls.user}>
          {isOnline && <Online className={cls.isOnline} />}
          <Avatar
            src={partner.avatar && `${BASE_URL}${partner.avatar}`}
            width={40}
            height={40}
            className={cls.avatar}
            name={partner.name}
          />
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
      </div>
    );
  }
);
