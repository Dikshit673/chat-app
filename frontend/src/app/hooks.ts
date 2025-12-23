import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

import { createSelector } from '@reduxjs/toolkit';
import type { Message } from '@/features/messages/message.types';

const EMPTY_ARRAY: Message[] = [];

export const selectMessagesByChat = createSelector(
  [
    (s: RootState) => s.messages.byChat,
    (_: RootState, chatId?: string) => chatId,
  ],
  (byChat, chatId) => {
    if (!chatId) return EMPTY_ARRAY;
    return (
      byChat.filter(
        (m) =>
          (m.from === chatId && m.to === 'me') ||
          (m.to === chatId && m.from === 'me')
      ) ?? EMPTY_ARRAY
    );
  }
);
