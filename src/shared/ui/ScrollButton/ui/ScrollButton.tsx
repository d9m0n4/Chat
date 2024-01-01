import React, { FC } from 'react';
import { ReactComponent as ScrollDown } from 'shared/assets/icons/chevronDoubleDown.svg';

import cls from './ScrollButton.module.scss';

interface ScrollButtonProps {
  onClick: () => void;
}

export const ScrollButton: FC<ScrollButtonProps> = ({ onClick }) => {
  return (
    <button className={cls['scroll-button']} onClick={onClick}>
      <ScrollDown className="icon" />
    </button>
  );
};
