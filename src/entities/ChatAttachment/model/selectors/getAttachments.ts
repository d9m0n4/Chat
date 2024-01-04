import { IState } from 'app/providers/storeProvider/types/Store';

export const getAttachments = (state: IState) => state.attachments.attachments;
