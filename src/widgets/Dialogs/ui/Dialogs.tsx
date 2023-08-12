import { DialogList } from 'entities/Dialog';
import { CreateDialogModal } from 'features/CreateDialog';
import React from 'react';
import { ReactComponent as Add } from 'shared/assets/icons/plus.svg';
import { Button } from 'shared/ui/Button';

import cls from './Dialogs.module.scss';

export const Dialogs = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className={cls.dialogs}>
      <div className={cls.dialogs__wrapper}>
        <div className={cls.dialogs__heading}>
          <div className={cls.title}>
            <p>Диалоги</p>
            <Button onClick={() => setIsOpen(true)}>
              <Add className="icon" />
            </Button>
          </div>
        </div>
        <div className={cls.dialogs__body}>
          <DialogList />
        </div>
      </div>

      {isOpen && (
        <CreateDialogModal isOpened={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};
