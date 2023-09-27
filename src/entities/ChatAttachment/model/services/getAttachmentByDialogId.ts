import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

import { Attachment } from '../types/Attachment';

export const getAttachmentByDialogId = createAsyncThunk(
  'dialog/attachment',
  async (dialogId: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await api.get<Attachment[]>(
        `files?dialogId=${dialogId}`
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
