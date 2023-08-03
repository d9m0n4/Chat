import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/config/api/api';

export const fetchUserData = createAsyncThunk('fetchUserData', async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await api.get('user/me');
    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
