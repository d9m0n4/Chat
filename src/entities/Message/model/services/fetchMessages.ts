import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

import { IMessage } from '../types/Message';

export const fetchMessages = createAsyncThunk('messages', async (id: number, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await api.get<IMessage[]>(`messages?dialogId=${id}`);
    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
