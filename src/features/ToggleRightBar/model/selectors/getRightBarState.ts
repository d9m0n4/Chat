import { IState } from 'app/providers/storeProvider/types/Store';

export const getRightBarState = (state: IState) => state?.rightBar?.isOpen;
