import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ValidationErrors, api } from 'shared/config/api';

import { MessagesData } from '../types/Message';

interface IGetHistoryProps {
  dialogId?: number;
  skip: number;
}

export const getMessagesHistory = createAsyncThunk<
  MessagesData,
  IGetHistoryProps,
  { rejectValue: SerializedError | undefined }
>('getMessagesHistory', async ({ dialogId, skip }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await api.get<MessagesData>(
      `messages/history?dialogId=${dialogId}&skip=${skip}`
    );
    return data;
  } catch (err) {
    const axiosError = err as AxiosError<ValidationErrors>;
    if (!axiosError.response) {
      throw err;
    }
    return rejectWithValue(axiosError.response.data);
  }
});
