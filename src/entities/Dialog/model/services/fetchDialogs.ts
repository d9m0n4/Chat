import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ValidationErrors } from 'shared/config/api';
import { api } from 'shared/config/api/api';

import { IDialog } from '../types/dialogs';

export const fetchDialogs = createAsyncThunk<
  IDialog[],
  undefined,
  { rejectValue: ValidationErrors | undefined }
>('dialogs', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await api.get<IDialog[]>('dialogs/my');
    return response.data;
  } catch (err) {
    const axiosError = err as AxiosError<ValidationErrors>;
    if (!axiosError.response) {
      throw err;
    }
    return rejectWithValue(axiosError.response.data);
  }
});
