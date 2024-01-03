import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api';

import { MessagesData } from '../types/Message';

export const getMessagesHistory = createAsyncThunk(
  'getMessagesHistory',
  async ({ dialogId, skip }: { dialogId?: number; skip: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await api.get<MessagesData>(
        `messages/history?dialogId=${dialogId}&skip=${skip}`
      );
      return data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
