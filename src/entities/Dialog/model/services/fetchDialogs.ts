import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

const fetchDialogs = createAsyncThunk('dialogs', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await api.get('dialogs/my');
  } catch (e) {
    return rejectWithValue(e);
  }
});
