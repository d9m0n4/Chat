import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getAttachmentByDialogId } from '../services/getAttachmentByDialogId';
import { Attachment, AttachmentsState } from '../types/Attachment';

const initialState: AttachmentsState = {};
export const AttachmentSlice = createSlice({
  name: 'attachments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAttachmentByDialogId.pending, (state, action) => {
        state.attachments = undefined;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getAttachmentByDialogId.fulfilled,
        (state, action: PayloadAction<Attachment[]>) => {
          state.attachments = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(getAttachmentByDialogId.rejected, (state, action) => {
        state.attachments = undefined;
        state.isLoading = false;
        state.error = 'ошибка получения вложений';
      });
  },
});

export const { reducer: attachmentsReducer, actions: attachmentsActions } =
  AttachmentSlice;
