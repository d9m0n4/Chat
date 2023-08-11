import { getActiveDialog } from 'entities/Dialog';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Dialogs } from 'widgets/Dialogs';
import { Interlocutor } from 'widgets/Interlocutor';
import { Messages } from 'widgets/Messages';

// interface MainPageProps {}

export const MainPage: FC = () => {
  const activeDialog = useSelector(getActiveDialog);
  const partner = activeDialog?.partner;
  return (
    <div className="main-section">
      <Dialogs />
      <Messages />
      {activeDialog && (
        <Interlocutor
          id={partner?.id}
          name={partner?.name}
          avatar={partner?.avatar}
          nickName={partner?.nickName}
        />
      )}
    </div>
  );
};
