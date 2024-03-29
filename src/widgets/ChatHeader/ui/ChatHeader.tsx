import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getDialogPartner } from 'entities/Dialog/model/selectors/getDialogPartner';
import { SearchDialogs } from 'features/SearchDialogs';
import { ToggleRightBar } from 'features/ToggleRightBar';
import { Online } from 'shared/ui/Online';

import cls from './ChatHeader.module.scss';

export const ChatHeader = () => {
  const partner = useSelector(getDialogPartner);
  const location = useLocation();
  return (
    <div className={cls.header}>
      {location.pathname.includes('dialogs') && (
        <>
          <SearchDialogs classname={cls.search__field} />
          <div className={cls.name}>
            {partner && (
              <>
                {partner.name}
                {partner.isOnline && <Online className={cls.online} />}
              </>
            )}
          </div>
          {partner && <ToggleRightBar classname={cls.button} />}
        </>
      )}
    </div>
  );
};
