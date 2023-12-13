import React, { useState } from 'react';
import { Button } from 'shared/ui/Button';
import { ButtonVariants } from 'shared/ui/Button/ui/Button';
import { Modal } from 'shared/ui/Modal/ui/Modal';

import cls from './DeleteMessageModal.module.scss';

export const DeleteMessageModal = ({ isOpened, onClose }: { isOpened: boolean; onClose: () => void }) => {
  const [isChecked, setChecked] = useState(false);
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };
  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <div className={cls.confirm__modal}>
        <p>Вы точно хотите удлить это сообщение?</p>
        <div className={cls['confirm__modal-checkbox']}>
          <input type="checkbox" id="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <label className={cls.label} htmlFor="checkbox"></label>
          <p>А так же удалить для test</p>
        </div>
        <div className={cls['confirm__modal-actions']}>
          <Button className={cls.button} onClick={onClose}>
            Отмена
          </Button>
          <Button className={cls.button} onClick={onClose}>
            Удалить
          </Button>
        </div>
      </div>
    </Modal>
  );
};
