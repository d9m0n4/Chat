import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ValidationErrors } from 'shared/config/api';
import { api } from 'shared/config/api/api';

export const updateMessagesStatus = createAsyncThunk('messages/update', async (dialogId: number, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await api.patch(`messages/update`, { dialogId });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const axiosError = e as AxiosError<ValidationErrors>;
      return axiosError.response?.data.message;
    }
    throw rejectWithValue(e);
  }
});
