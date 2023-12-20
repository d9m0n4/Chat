import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ValidationErrors } from 'shared/config/api';
import { api } from 'shared/config/api/api';

import { IUser } from '../types/user';

export const fetchUserData = createAsyncThunk('fetchUserData', async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await api.get<IUser>('user/me');
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});
