import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from 'shared/config/api/api';

export const createDialog = createAsyncThunk(
  'createDialog',
  async (partnerId: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await api.post('dialog', { partner: partnerId });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data.message);
      } else {
        return new Error('Непредвиденная ошибка');
      }
    }
  }
);
