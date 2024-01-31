import { IState } from 'app/providers/storeProvider/types/Store';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { Skeleton } from 'shared/ui/Skeleton';

import {
  getActiveDialog,
  getPrevActiveDialog,
} from '../../model/selectors/getActiveDialog';
import { getDialogsState } from '../../model/selectors/getDialogs';
import { getFilteredDialogs } from '../../model/selectors/getFilteredDialogs';
import { fetchDialogs } from '../../model/services/fetchDialogs';
import { dialogActions } from '../../model/slices/dialogSlice';
import { DialogItem } from '../DialogItem/DialogItem';
import { DialogListLoading } from '../DialogListLoading/DialogListLoading';
import cls from './DialogList.module.scss';

export const DialogList = () => {
  const dialogs = useSelector(getFilteredDialogs);
  const { loading } = useSelector(getDialogsState);
  const currentDialog = useSelector(getActiveDialog);
  const prevActiveDialogId = useSelector(getPrevActiveDialog);
  const user = useSelector((state: IState) => state.auth.authData); // убрать!!!!!!!
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDialogs());
    return () => {
      dispatch(dialogActions.setActiveDialog(null));
    };
  }, []);

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
                isOnline={dialog.partner ? dialog.partner.isOnline : false}
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
