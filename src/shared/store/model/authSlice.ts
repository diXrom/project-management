import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'shared/api/lib/types';

type authState = { user: IUser | null };

const initialState: authState = { user: null };
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<IUser | null>) {
      state.user = payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice;
