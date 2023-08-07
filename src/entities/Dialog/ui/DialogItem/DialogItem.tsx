import React, { FC } from 'react';
import { Avatar } from 'shared/ui/Avatar';
import { Online } from 'shared/ui/Online';

import { IDialog } from '../../model/types/dialogs';
import cls from './DialogItem.module.scss';

interface IDialogItem extends IDialog {
  isActive?: boolean;
  isOnline: boolean;
  onClick: () => void;
}

export const DialogItem: FC<IDialogItem> = ({
  isActive,
  created_at,
  latestMessage,
  partner,
  isOnline,
  onClick,
}) => {
  return (
    <li className={`${cls.item} ${isActive && cls.active}`} onClick={onClick}>
      <div className={cls.user}>
        {isOnline && <Online className={cls.isOnline} />}
        <Avatar width={40} height={40} className={cls.avatar} />
        <span className={cls.count}>99</span>
      </div>
      <div className={cls.body}>
        <div className={cls.title}>
          <span>{partner.name}</span>
        </div>
        <div className={cls.subtitle}>
          <span>{latestMessage && latestMessage.content}</span>
        </div>
      </div>
      <div className={cls.info}>
        <span className={cls.date}>{new Date(created_at).toLocaleDateString()}</span>
      </div>
    </li>
  );
};
