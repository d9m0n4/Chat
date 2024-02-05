import { IState } from 'app/providers/storeProvider/types/Store';

export const getIsAuthState = (state: IState) => state.auth.isAuth;
export const getAuthError = (state: IState) => state.auth.error;
