import { messageContextMenuReducer } from 'entities/Message/model/slices/messageContextMenuSlice';
import React, { FC, useRef } from 'react';
import { useOutsideClick } from 'shared/hooks/useOutsideClick/useOutsideClick';
import { DynamicModuleLoader } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { ReducersList } from 'shared/types/Store';
import { Portal } from 'shared/ui/Portal';

import cls from './MessageContextMenu.module.scss';

type Position = {
  x: number;
  y: number;
};
interface MessageContextMenuProps {
  isOpen: boolean | undefined;
  position?: Position;
  options: Record<string, (b?: boolean) => void>;
  onClose: () => void;
}

const reducers: ReducersList = {
  messageContextMenu: messageContextMenuReducer,
};

export const MessageContextMenu: FC<MessageContextMenuProps> = ({
  position,
  options,
  onClose,
  isOpen,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref, callback: onClose });
  const handleClick = (action: string) => {
    onClose();
    if (options[action] && typeof options[action] === 'function') {
      options[action]();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <DynamicModuleLoader reducers={reducers} willUnmount={false}>
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
            <div
              className={cls['context__menu-item']}
              key={option}
              onClick={() => handleClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </Portal>
    </DynamicModuleLoader>
  );
};
