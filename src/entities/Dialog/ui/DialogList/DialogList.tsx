import { RootState } from 'app/providers/storeProvider/config/store';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

import { getActiveDialog } from '../../model/selectors/getActiveDialog';
import { getFilteredDialogs } from '../../model/selectors/getFilteredDialogs';
import { fetchDialogs } from '../../model/services/fetchDialogs';
import { dialogActions } from '../../model/slices/dialogSlice';
import { DialogItem } from '../DialogItem/DialogItem';
import cls from './DialogList.module.scss';

export const DialogList = () => {
  const dialogs = useSelector(getFilteredDialogs);
  const dialogId = useSelector(getActiveDialog);
  const user = useSelector((state: RootState) => state.user.authData); // убрать!!!!!!!

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDialogs());
  }, []);

  const setActiveDialog = ({ id, partner }: { id: number; partner: any }) => {
    dispatch(dialogActions.setActiveDialog({ id, partner }));
  };

  const dialogsData = useMemo(() => {
    return dialogs
      .map((dialog) => dialog)
      .sort((a, b) => {
        const aDate = a.latestMessage
          ? new Date(a.latestMessage.created_at).getTime()
          : 0;
        const bDate = b.latestMessage
          ? new Date(b.latestMessage.created_at).getTime()
          : 0;
        return bDate - aDate;
      });
  }, [dialogs]);

  return (
    <ul className={cls.list}>
      {dialogsData &&
        dialogsData.map((dialog) => (
          <Link key={dialog.id} to={`${dialog.id}`}>
            <DialogItem
              myId={user?.id}
              isActive={dialog.id === dialogId?.id}
              {...dialog}
              isOnline={dialog.partner.isOnline}
              onClick={() =>
                setActiveDialog({ id: dialog.id, partner: dialog.partner })
              }
              unreadMessagesCount={dialog.unreadMessagesCount}
            />
          </Link>
        ))}
    </ul>
  );
};
