import { notificationActions } from 'entities/Notifications';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Portal } from '../../Portal';
import cls from './Notification.module.scss';

interface NotificationProps {
  message: React.ReactNode;
  duration?: number;
  id: string;
}

export const Notification: FC<NotificationProps> = ({ id, message, duration = 3000 }) => {
  const [isShown, setIsShown] = useState(true);
  const timeRef = useRef<ReturnType<typeof setTimeout> | undefined>();
  const dispatch = useDispatch();

  const handleClose = () => {
    setIsShown(false);
    dispatch(notificationActions.clearNotification({ id }));
  };

  useEffect(() => {
    timeRef.current = setTimeout(handleClose, duration);

    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
        timeRef.current = undefined;
      }
    };
  }, [duration]);

  if (!isShown) {
    return null;
  }

  return (
    <>
      <div className={cls.notification}>
        <p className={cls['notification-message']}>{message}</p>
      </div>
    </>
  );
};
