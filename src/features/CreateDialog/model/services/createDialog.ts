import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

export const createDialog = createAsyncThunk(
  'createDialog',
  async (partnerId: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await api.post('dialogs', { partner: partnerId });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
