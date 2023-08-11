import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

import { Message } from '../types/Message';

export const sendMessage = createAsyncThunk(
  'sendMessage',
  async (message: Message, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await api.post('messages', message);
      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
