import { getDialogPartner } from 'entities/Dialog/model/selectors/getDialogPartner';
import { SearchDialogs } from 'features/SearchDialogs';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Dots } from 'shared/assets/icons/dots-horizontal.svg';
import { Button } from 'shared/ui/Button';
import { Online } from 'shared/ui/Online';

import cls from './ChatHeader.module.scss';

export const ChatHeader = () => {
  const partner = useSelector(getDialogPartner);
  const location = useLocation();
  return (
    <div className={cls.header}>
      {location.pathname.includes('dialogs') && (
        <>
          <SearchDialogs />
          <div className={cls.name}>
            {partner && (
              <>
                {partner.name}
                {partner.isOnline && <Online className={cls.online} />}
              </>
            )}
          </div>
          <Button>
            <Dots className="icon" />
          </Button>
        </>
      )}
    </div>
  );
};
