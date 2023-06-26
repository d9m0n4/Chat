import React, { FC } from 'react';
import { ChatHeader } from 'widgets/ChatHeader';
import { Dialogs } from 'widgets/Dialogs';
import { Interlocutor } from 'widgets/Interlocutor';
import { Messages } from 'widgets/Messages';

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = ({}) => {
  return (
    <div className="main-section">
      <Dialogs />
      <Messages />
      <Interlocutor />
    </div>
  );
};
