import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

import { GroupedMessages, IMessage } from '../types/Message';

export const fetchMessages = createAsyncThunk(
  'messages',
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await api.get<GroupedMessages>(
        `messages?dialogId=${id}`
      );
      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
