import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getAttachmentByDialogId } from '../services/getAttachmentByDialogId';
import { Attachment, IAttachmentsState } from '../types/Attachment';

const initialState: IAttachmentsState = {};
export const AttachmentSlice = createSlice({
  name: 'attachments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAttachmentByDialogId.pending, (state) => {
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
        if (action.payload) {
          state.error = action.payload?.message;
          state.isLoading = false;
        } else {
          state.error = action.error.message;
          state.isLoading = false;
        }
      });
  },
});

export const { reducer: attachmentsReducer, actions: attachmentsActions } =
  AttachmentSlice;
