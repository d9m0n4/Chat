import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

export const sendMessage = createAsyncThunk(
  'sendMessage',
  async (message: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await api.post('messages', message);
      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
