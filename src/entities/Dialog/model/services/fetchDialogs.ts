import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

import { IDialog } from '../types/dialogs';

export const fetchDialogs = createAsyncThunk('dialogs', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await api.get<IDialog[]>('dialogs/my');
    return response.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});
