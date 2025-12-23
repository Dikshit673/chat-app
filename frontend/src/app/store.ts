import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/authSlice';
import chatReducer from '@/features/chat/chatSlice';
import messagesReducer from '@/features/messages/messageSlice';
import usersReducer from '@/features/users/userSlice';
import uiReducer from '@/features/ui/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    messages: messagesReducer,
    users: usersReducer,
    ui: uiReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
