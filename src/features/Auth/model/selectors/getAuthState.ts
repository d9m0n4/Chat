import { IState } from 'app/providers/storeProvider/types/Store';

export const getIsAuthState = (state: IState) => state.auth.isAuth;
export const getAuthMessage = (state: IState) => state.auth.message;
