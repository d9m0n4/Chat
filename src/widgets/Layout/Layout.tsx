import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { ChatHeader } from 'widgets/ChatHeader';

import { messagesActions } from '../../entities/Message/model/slices/messageSlice';
import { Notifications } from '../../entities/Notifications';
import { fetchUserData } from '../../entities/User/model/services/fetchUserData';
import { Portal } from '../../shared/ui/Portal';
import { Sidebar } from '../Sidebar';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const { socket } = useSocket();

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  useEffect(() => {
    socket?.on('message_deleted', (m) => {
      dispatch(messagesActions.deleteMessage({ messageId: m.messageId }));
    });
    return () => {
      socket?.off('message_deleted');
    };
  }, [socket]);

  return (
    <div className="main">
      <Sidebar />
      <div className="main__wrapper">
        <ChatHeader />
        <Outlet />
      </div>
      <Portal>
        <Notifications />
      </Portal>
    </div>
  );
};
