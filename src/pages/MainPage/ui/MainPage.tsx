import { getActiveDialog } from 'entities/Dialog';
import { getDialogPartner } from 'entities/Dialog/model/selectors/getDialogPartner';
import { dialogActions } from 'entities/Dialog/model/slices/dialogSlice';
import { messagesActions } from 'entities/Message/model/slices/messageSlice';
import { IMessage } from 'entities/Message/model/types/Message';
import { getUserData } from 'entities/User/model/selectors/getUserData';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { Dialogs } from 'widgets/Dialogs';
import { Interlocutor } from 'widgets/Interlocutor';

// interface MainPageProps {}

export const MainPage: FC = () => {
  const partner = useSelector(getDialogPartner);
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const activeDialog = useSelector(getActiveDialog);
  const user = useSelector(getUserData);
  // const dialog = useSelector(getActiveDialog)

  useEffect(() => {
    socket?.on('message_created', (message: IMessage) => {
      dispatch(
        messagesActions.addNewMessage({ message, dialogId: activeDialog?.id })
      );
      dispatch(dialogActions.updateLastMessage(message));
      dispatch(
        dialogActions.updateUnreadMessagesCount({ message, userId: user?.id })
      );
    });

    return () => {
      socket?.off('message_created');
    };
  }, [socket, activeDialog, user]);

  useEffect(() => {
    socket?.on('update_messages_status', ({ userId, dialogId }) => {
      if (userId !== user?.id) {
        dispatch(dialogActions.updateReadStatus(dialogId));
      }
      if (userId === user?.id) {
        dispatch(
          dialogActions.updateMessagesCount({
            dialogId,
            activeDialogId: activeDialog?.id,
          })
        );
      }
      if (userId === partner?.id) {
        dispatch(messagesActions.updateMyMessageReadStatus());
      }
    });
    return () => {
      socket?.off('update_messages_status');
    };
  }, [socket, activeDialog, partner, user]);

  return (
    <div className="main-section">
      <Dialogs />
      <Outlet />
      {partner && (
        <Interlocutor
          id={partner?.id}
          name={partner?.name}
          avatar={partner?.avatar}
          nickName={partner?.nickName}
          isOnline={partner.isOnline}
        />
      )}
    </div>
  );
};
