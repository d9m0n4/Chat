import { getDialogPartner } from 'entities/Dialog/model/selectors/getDialogPartner';
import { dialogActions } from 'entities/Dialog/model/slices/dialogSlice';
import { messagesActions } from 'entities/Message/model/slices/messageSlice';
import { IMessage } from 'entities/Message/model/types/Message';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { socket } from 'shared/config/api/ws';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Dialogs } from 'widgets/Dialogs';
import { Interlocutor } from 'widgets/Interlocutor';

// interface MainPageProps {}

export const MainPage: FC = () => {
  const partner = useSelector(getDialogPartner);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('message_created', (message: IMessage) => {
      dispatch(messagesActions.addNewMessage(message));
      dispatch(dialogActions.updateLastMessage(message));
      console.log(message);
    });
    return () => {
      socket.off('message_created');
    };
  }, []);

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
