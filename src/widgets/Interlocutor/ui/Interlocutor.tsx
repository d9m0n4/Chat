import React, { FC, memo, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Attach, getAttachments } from 'entities/ChatAttachment';
import { getAttachmentByDialogId } from 'entities/ChatAttachment/model/services/getAttachmentByDialogId';
import { getActiveDialog } from 'entities/Dialog';
import { ReactComponent as Chevron } from 'shared/assets/icons/cheveron-down.svg';
import { BASE_URL } from 'shared/config/api';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';

import cls from './Interlocutor.module.scss';

type InterlocutorProps = {
  name?: string;
  avatar?: string | null;
  id?: number;
  nickName?: string;
  isOnline?: boolean;
};

export const Interlocutor: FC<InterlocutorProps> = memo(
  ({ avatar, nickName, name, isOnline }) => {
    const dispatch = useAppDispatch();
    const activeDialog = useSelector(getActiveDialog);
    const dialogAttachments = useSelector(getAttachments);

    useEffect(() => {
      if (activeDialog) {
        dispatch(getAttachmentByDialogId(activeDialog?.id));
      }
    }, [activeDialog, dispatch]);

    const attachmentsList = useMemo(() => {
      return dialogAttachments?.map((attachment) => (
        <Attach
          key={attachment.id}
          ext={attachment.ext}
          name={attachment.name}
          url={attachment.url}
          originalName={attachment.originalName}
          size={attachment.size}
          created_at={attachment.created_at}
        />
      ));
    }, [dialogAttachments]);

    return (
      <div className={cls.interlocutor}>
        <div className={cls.info}>
          <Avatar
            name={name}
            width={100}
            height={100}
            src={avatar ? `${BASE_URL}${avatar}` : null}
          />
          <div className={cls.name}>
            {name} {nickName}
          </div>
          <span className={cls.isOnline}>{isOnline && 'в сети'}</span>
        </div>
        <div className={cls.attaches}>
          <div className={cls.attaches__heading}>
            <p>Вложения</p>
            <Button>
              <Chevron className="icon" />
            </Button>
          </div>
          <div className={cls.attaches__body}>
            <ul className={cls.attaches__list}>{attachmentsList}</ul>
          </div>
        </div>
      </div>
    );
  }
);

Interlocutor.displayName = 'Interlocutor';
