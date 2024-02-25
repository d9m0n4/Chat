import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ValidationErrors } from 'shared/config/api';
import { api } from 'shared/config/api/api';

export const sendMessage = createAsyncThunk(
  'sendMessage',
  async (message: FormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await api.post('messages', message);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<ValidationErrors>;
      if (!axiosError.response) {
        throw err;
      }
      return rejectWithValue(axiosError.response.data);
    }
  }
);
