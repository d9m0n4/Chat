import { IState } from 'app/providers/storeProvider/types/Store';

export const getUserData = (state: IState) => state.auth.authData;
export const getUser = (state: IState) => state.auth;
