import { RootState } from 'app/providers/storeProvider/config/store';

export const getRightBarState = (state: RootState) => state.rightBar.isOpened;
