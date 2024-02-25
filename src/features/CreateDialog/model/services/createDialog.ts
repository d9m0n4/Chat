import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from 'shared/config/api/api';

export const createDialog = createAsyncThunk(
  'createDialog',
  async (partnerId: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await api.post('dialogs', { partner: partnerId });
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<SerializedError>;
      if (!axiosError.response) {
        throw err;
      }
      return rejectWithValue(axiosError.response.data);
    }
  }
);
