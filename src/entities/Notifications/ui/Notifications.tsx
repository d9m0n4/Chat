import { useSelector } from 'react-redux';

import { Notification } from 'shared/ui/Notification';

import { getNotifications } from '../model/selectors/getNotifications';
import cls from './Notifications.module.scss';

export const Notifications = () => {
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
