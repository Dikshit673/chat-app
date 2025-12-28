import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Message } from './message.types';

const EMPTY_ARRAY: Message[] = [];
const initialState = { byChat: EMPTY_ARRAY };

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      const m = action.payload;
      state.byChat.push(m);
    },
    setMessages(
      state,
      action: PayloadAction<{ chatId: string; messages: Message[] }>
    ) {
      state.byChat = action.payload.messages;
    },
  },
});

const { actions, reducer: messageReducer } = messageSlice;

export const { addMessage, setMessages } = actions;
export default messageReducer;
