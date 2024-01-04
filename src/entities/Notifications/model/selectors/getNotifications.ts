import { IState } from 'app/providers/storeProvider/types/Store';

export const getNotifications = (state: IState) =>
  state.notifications?.notifications;
