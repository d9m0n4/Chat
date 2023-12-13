import React, { FC, useRef } from 'react';
import { useOutsideClick } from 'shared/hooks/useOutsideClick/useOutsideClick';
import { Portal } from 'shared/ui/Portal';

import cls from './MessageContextMenu.module.scss';

type Position = {
  x: number;
  y: number;
};
interface MessageContextMenuProps {
  position?: Position;
  options: Record<string, () => void>;
  onClose: () => void;
}

export const MessageContextMenu: FC<MessageContextMenuProps> = ({ position, options, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref, callback: onClose });
  const handleClick = (action: string) => {
    onClose();
    if (options[action] && typeof options[action] === 'function') {
      options[action]();
    }
  };

  return (
    <Portal>
      <div
        ref={ref}
        className={cls.context__menu}
        style={{
          position: 'absolute',
          top: position?.y || 0,
          left: position?.x || 0,
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
