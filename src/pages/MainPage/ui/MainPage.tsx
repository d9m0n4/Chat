import React, { FC } from 'react';
import { Dialogs } from 'widgets/Dialogs';
import { Interlocutor } from 'widgets/Interlocutor';
import { Messages } from 'widgets/Messages';

// interface MainPageProps {}

export const MainPage: FC = () => {
  return (
    <div className="main-section">
      <Dialogs />
      <Messages />
      <Interlocutor />
    </div>
  );
};
