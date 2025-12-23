import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from './user.types';

const userSlice = createSlice({
  name: 'users',
  initialState: { list: [] as User[] },
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.list = action.payload;
    },
    updateUser(state, action: PayloadAction<Partial<User> & { id: string }>) {
      const idx = state.list.findIndex((u) => u._id === action.payload.id);
      if (idx >= 0) state.list[idx] = { ...state.list[idx], ...action.payload };
    },
  },
});

const { actions, reducer: userReducer } = userSlice;

export const { setUsers, updateUser } = actions;
export default userReducer;
