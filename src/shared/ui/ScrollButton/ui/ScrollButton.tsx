import clsx from 'classnames';
import React, { FC } from 'react';
import { ReactComponent as ScrollDown } from 'shared/assets/icons/chevronDoubleDown.svg';

import cls from './ScrollButton.module.scss';

interface ScrollButtonProps {
  onClick: () => void;
  className?: string;
}

export const ScrollButton: FC<ScrollButtonProps> = ({ onClick, className }) => {
  return (
    <button className={clsx(cls['scroll-button'], className)} onClick={onClick}>
      <ScrollDown className="icon" />
    </button>
  );
};
