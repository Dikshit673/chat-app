import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Chat } from './chat.types';

const chatSlice = createSlice({
  name: 'chat',
  initialState: { rooms: [] as Chat[] },
  reducers: {
    setRooms(state, action: PayloadAction<Chat[]>) {
      state.rooms = action.payload;
    },
    updateRoom(state, action: PayloadAction<Partial<Chat> & { id: string }>) {
      const idx = state.rooms.findIndex((r) => r.id === action.payload.id);
      if (idx >= 0)
        state.rooms[idx] = { ...state.rooms[idx], ...action.payload };
    },
  },
});

const { actions, reducer: chatReducer } = chatSlice;

export const { setRooms, updateRoom } = actions;
export default chatReducer;
