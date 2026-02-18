// ==================== COOKIE CONSTANTS ====================
export const AUTH_HEADER = Object.freeze({
  ACCESS: 'Authorization',
  CSRF: 'x-chat-app-csrf-token',
});

export type AuthHeaderKey = keyof typeof AUTH_HEADER;
