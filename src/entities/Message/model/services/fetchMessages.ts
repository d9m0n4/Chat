import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

import { GroupedMessages } from '../types/Message';

export const fetchMessages = createAsyncThunk(
  'messages',
  async (
    { id, count, offset }: { id?: number; count: number; offset: number },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await api.get<GroupedMessages>(
        `messages?dialogId=${id}&offset=${offset}&count=${count}`
      );
      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
