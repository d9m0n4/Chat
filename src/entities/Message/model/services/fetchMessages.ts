import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

import { MessagesData } from '../types/Message';

export const fetchMessages = createAsyncThunk(
  'messages',
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await api.get<MessagesData>(`messages?dialogId=${id}`);
      return data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
