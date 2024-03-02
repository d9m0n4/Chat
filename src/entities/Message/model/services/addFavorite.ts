import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from 'shared/config/api/api';

interface IAddFavoritesProps {
  messageId: number;
}

interface IDeleteResult {
  message: string;
  messageId: number;
  success: boolean;
}

export const addFavorite = createAsyncThunk<
  IDeleteResult,
  IAddFavoritesProps,
  { rejectValue: SerializedError | undefined }
>('message/favorites', async ({ messageId }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await api.post(`/messages/favorites`, {
      message: messageId,
    });
    return response.data;
  } catch (err) {
    const axiosError = err as AxiosError<SerializedError>;
    if (!axiosError.response) {
      throw err;
    }
    return rejectWithValue(axiosError.response.data);
  }
});
