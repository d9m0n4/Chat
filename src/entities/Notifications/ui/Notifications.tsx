import { FC, useCallback, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Notification } from 'shared/ui/Notification';
import { Portal } from 'shared/ui/Portal';

import { getNotifications } from '../model/selectors/getNotifications';
import { notificationActions } from '../model/slices/notifications';
import { INotification } from '../model/types/notification';
import cls from './Notifications.module.scss';

interface INotificationsProps {
  notifications: INotification[];
}
export const Notifications: FC<INotificationsProps> = ({ notifications }) => {
  const { notifications: n } = useSelector(getNotifications);

  if (notifications.length < 1) {
    return null;
  }

  return (
    <div id="notifications" className={cls.notifications}>
      {n.map(({ message, id }) => (
        <Notification key={id} message={message} id={id} />
      ))}
    </div>
  );
};
