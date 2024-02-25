import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { api } from 'shared/config/api/api';

import { MessagesData } from '../types/Message';

export const fetchMessages = createAsyncThunk<
  MessagesData,
  number,
  { rejectValue: SerializedError | undefined }
>('messages', async (id: number, { rejectWithValue }) => {
  try {
    const { data } = await api.get<MessagesData>(`messages?dialogId=${id}`);
    return data;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Request canceled', err.message);
    }
    const axiosError = err as AxiosError<SerializedError>;
    if (!axiosError.response) {
      throw err;
    }
    return rejectWithValue(axiosError.response.data);
  }
});
