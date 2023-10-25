import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

export const updateMessagesStatus = createAsyncThunk(
  'messages/update',
  async (dialogId: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await api.patch(`messages/update`, { dialogId });
      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
);
