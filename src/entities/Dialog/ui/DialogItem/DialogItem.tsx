import React, { FC } from 'react';
import { Avatar } from 'shared/ui/Avatar';
import { Online } from 'shared/ui/Online';

import cls from './DialogItem.module.scss';

interface IDialogItem {
  isActive?: boolean;
  isOnline: boolean;
  partnerName: string;
  lastMessage: string;
  date: number;
}

export const DialogItem: FC<IDialogItem> = ({
  isActive,
  date,
  lastMessage,
  partnerName,
  isOnline,
}) => {
  return (
    <li className={`${cls.item} ${isActive && cls.active}`}>
      <div className={cls.user}>
        {isOnline && <Online className={cls.isOnline} />}
        <Avatar width={40} height={40} className={cls.avatar} />
        <span className={cls.count}>99</span>
      </div>
      <div className={cls.body}>
        <div className={cls.title}>
          <span>{partnerName}</span>
        </div>
        <div className={cls.subtitle}>
          <span>{lastMessage}</span>
        </div>
      </div>
      <div className={cls.info}>
        <span className={cls.date}>{date}</span>
      </div>
    </li>
  );
};
