import { IState } from 'app/providers/storeProvider/types/Store';

export const getUsers = (state: IState) => state?.addDialog?.users;
export const getIsLoadingFindUsers = (state: IState) =>
  state?.addDialog?.loading;
