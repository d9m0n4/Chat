import React, { useState } from 'react';
import { Button } from 'shared/ui/Button';
import { Modal } from 'shared/ui/Modal/ui/Modal';

import cls from './DeleteMessageModal.module.scss';

export const DeleteMessageModal = ({
  isOpened,
  onClose,
  onConfirm,
  onCancel,
}: {
  isOpened: boolean;
  onClose: () => void;
  onConfirm: (isChecked: boolean) => void;
  onCancel: () => void;
}) => {
  if (!isOpened) {
    return null;
  }
  const [isChecked, setChecked] = useState(true);
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <div className={cls.confirm__modal}>
        <p>Вы точно хотите удлить это сообщение?</p>
        <div className={cls['confirm__modal-checkbox']}>
          <input
            type="checkbox"
            id="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label className={cls.label} htmlFor="checkbox"></label>
          <p>А так же удалить для test</p>
        </div>
        <div className={cls['confirm__modal-actions']}>
          <Button className={cls.button} onClick={onClose}>
            Отмена
          </Button>
          <Button className={cls.button} onClick={() => onConfirm(isChecked)}>
            Удалить
          </Button>
        </div>
      </div>
    </Modal>
  );
};
