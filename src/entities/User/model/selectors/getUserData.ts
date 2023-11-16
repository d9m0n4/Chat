import { RootState } from 'app/providers/storeProvider/config/store';

export const getUserData = (state: RootState) => state.user.authData;
export const getUser = (state: RootState) => state.user;
