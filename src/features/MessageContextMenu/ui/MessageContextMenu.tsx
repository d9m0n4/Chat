import React, { FC } from 'react';
import { Portal } from 'shared/ui/Portal';

import cls from './MessageContextMenu.module.scss';

type Postion = {
  x: number;
  y: number;
};
interface MessageContextMenuProps {
  position: Postion;
  options: any;
  onClose: () => void;
}

export const MessageContextMenu: FC<MessageContextMenuProps> = ({ position, options, onClose }) => {
  const handleClick = (action: any) => {
    onClose();
    if (options[action] && typeof options[action] === 'function') {
      options[action]();
    }
  };

  return (
    <Portal>
      <div
        className={cls.context__menu}
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          zIndex: 9999,
        }}
      >
        {Object.keys(options).map((option) => (
          <div className={cls['context__menu-item']} key={option} onClick={() => handleClick(option)}>
            {option}
          </div>
        ))}
      </div>
    </Portal>
  );
};
