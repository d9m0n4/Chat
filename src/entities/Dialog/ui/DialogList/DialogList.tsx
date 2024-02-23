import { getUserState } from 'entities/User';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from 'shared/hooks/useSocket/useSocket';

import {
  getActiveDialog,
  getPrevActiveDialog,
} from '../../model/selectors/getActiveDialog';
import { isDialogLoading } from '../../model/selectors/getDialogs';
import { getFilteredDialogs } from '../../model/selectors/getFilteredDialogs';
import { fetchDialogs } from '../../model/services/fetchDialogs';
import { dialogActions } from '../../model/slices/dialogSlice';
import { IDialog } from '../../model/types/dialogs';
import { DialogItem } from '../DialogItem/DialogItem';
import { DialogListLoading } from '../DialogListLoading/DialogListLoading';
import cls from './DialogList.module.scss';

export const DialogList = () => {
  const dialogs = useSelector(getFilteredDialogs);
  const loading = useSelector(isDialogLoading);
  const currentDialog = useSelector(getActiveDialog);
  const prevActiveDialogId = useSelector(getPrevActiveDialog);
  const { user } = useSelector(getUserState);
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDialogs());
    return () => {
      dispatch(dialogActions.setActiveDialog(null));
    };
  }, []);

  useEffect(() => {
    const setUserOnline = (user: number) => {
      dispatch(dialogActions.setUserOnline({ userId: user, isOnline: true }));
    };
    const setUserOffline = (user: number) => {
      dispatch(dialogActions.setUserOnline({ userId: user, isOnline: false }));
    };

    socket?.on('new_dialog_created', (dialog: IDialog) =>
      dispatch(dialogActions.addNewDialog(dialog))
    );

    socket?.on('friends_online', (ids: number[]) => {
      ids.forEach((id) => setUserOnline(id));
    });
    socket?.on('set_friend_online', setUserOnline);
    socket?.on('set_friend_offline', setUserOffline);

    return () => {
      socket?.off('set_friend_online', setUserOnline);
      socket?.off('set_friend_offline', setUserOffline);
      socket?.off('friends_online');
      socket?.off('new_dialog_created');
    };
  }, [socket]);

  const setActiveDialog = ({ id, partner }: { id: number; partner: any }) => {
    if (id !== prevActiveDialogId) {
      dispatch(dialogActions.setActiveDialog({ id, partner }));
      if (prevActiveDialogId) {
        socket?.emit('on_dialog_leave', { dialogId: prevActiveDialogId });
      }
      socket?.emit('on_dialog_join', { dialogId: id });
    }
  };

  if (loading) {
    return <DialogListLoading />;
  }

  return (
    <ul className={cls.list}>
      {dialogs &&
        dialogs.map((dialog) => (
          <li key={dialog.id}>
            <Link to={`${dialog.id}`}>
              <DialogItem
                myId={user?.id}
                isActive={dialog.id === currentDialog?.id}
                {...dialog}
                isOnline={dialog.partner.isOnline}
                onClick={() =>
                  setActiveDialog({ id: dialog.id, partner: dialog.partner })
                }
                unreadMessagesCount={dialog.unreadMessagesCount}
              />
            </Link>
          </li>
        ))}
    </ul>
  );
};
