import { RootState } from 'app/providers/storeProvider/config/store';

export const getAttachments = (state: RootState) =>
  state.attachments.attachments;
