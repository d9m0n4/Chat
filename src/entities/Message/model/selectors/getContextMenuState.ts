import { RootState } from 'app/providers/storeProvider/config/store';

export const getContextMenuState = (state: RootState) => state.messageContextMenu;
