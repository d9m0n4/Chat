import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Notification } from 'shared/ui/Notification';

import { getNotifications } from '../model/selectors/getNotifications';
import { INotification } from '../model/types/notification';
import cls from './Notifications.module.scss';

interface INotificationsProps {
  notifications?: INotification[];
}
export const Notifications: FC<INotificationsProps> = () => {
  const notificationsList = useSelector(getNotifications);

  if (
    (notificationsList && notificationsList.length < 1) ||
    !notificationsList
  ) {
    return null;
  }

  return (
    <div id="notifications" className={cls.notifications}>
      {notificationsList?.map(({ message, id }) => (
        <Notification key={id} message={message} id={id} />
      ))}
    </div>
  );
};
