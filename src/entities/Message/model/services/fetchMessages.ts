import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from 'shared/config/api/api';

import { MessagesData } from '../types/Message';

export const fetchMessages = createAsyncThunk(
  'messages',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await api.get<MessagesData>(`messages?dialogId=${id}`);
      return data;
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log('Request canceled', e.message);
      }
      return rejectWithValue('error');
    }
  }
);
