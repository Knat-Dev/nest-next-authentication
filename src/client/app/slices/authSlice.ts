import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { NextRouter } from 'next/dist/client/router';
import { IncomingHttpHeaders } from 'node:http';
import { User } from '../../../server/common/types/user';
import { axios } from '../../utils';
import { AppState } from '../store';

type AuthState = {
  user: User | null;
};

export const fetchMe = createAsyncThunk(
  'auth/me',
  async ({ headers }: { headers: IncomingHttpHeaders }) => {
    const response = await axios.get<User>('/auth/me', { headers });
    return response.data;
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ router }: { router: NextRouter }) => {
    try {
      await axios.post('/auth/logout');
      await router.push('/login');
      return null;
    } catch (error) {
      console.log(error);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      console.log('invalidated logged in user');
      state.user = null;
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(HYDRATE, (state, action: any) => action.payload.auth); // for next-redux-wrapper to update
  },
});

export const { setUser } = authSlice.actions;

export const selectCurrentUser = (state: AppState) => state.auth.user;
