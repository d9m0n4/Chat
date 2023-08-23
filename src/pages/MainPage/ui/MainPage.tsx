import { getDialogPartner } from 'entities/Dialog/model/selectors/getDialogPartner';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Dialogs } from 'widgets/Dialogs';
import { Interlocutor } from 'widgets/Interlocutor';

// interface MainPageProps {}

export const MainPage: FC = () => {
  const partner = useSelector(getDialogPartner);
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
