import React, { FC } from 'react';
import { ReactComponent as ScrollDown } from 'shared/assets/icons/chevronDoubleDown.svg';

import cls from './ScrollButton.module.scss';

interface ScrollButtonProps {
  onClick: () => void;
  style?: React.CSSProperties;
}

export const ScrollButton: FC<ScrollButtonProps> = ({ onClick, style }) => {
  return (
    <button className={cls['scroll-button']} onClick={onClick} style={style}>
      <ScrollDown className="icon" />
    </button>
  );
};
