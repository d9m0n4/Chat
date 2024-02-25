import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IUser } from 'entities/User';
import { api } from 'shared/config/api/api';

export const findUsers = createAsyncThunk<
  IUser[],
  string,
  { rejectValue: SerializedError | undefined }
>('createDialog/fetchUsers', async (query, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await api.get<IUser[]>(
      `/dialogs/search?nickname=${query}`
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
