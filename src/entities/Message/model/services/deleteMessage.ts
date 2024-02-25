import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from 'shared/config/api/api';

interface IDeleteProps {
  messageId: number;
  forAll?: boolean;
}

interface IDeleteResult {
  message: string;
  messageId: number;
  success: boolean;
}

export const deleteMessage = createAsyncThunk<
  IDeleteResult,
  IDeleteProps,
  { rejectValue: SerializedError | undefined }
>('message/delete', async ({ messageId, forAll }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await api.post<IDeleteResult>(
      `messages/delete/${messageId}`,
      {
        deleteForEveryone: forAll,
      }
    );
    return response.data;
  } catch (err) {
    const axiosError = err as AxiosError<SerializedError>;
    if (!axiosError.response) {
      throw err;
    }
    return rejectWithValue(axiosError.response.data);
  }
});
