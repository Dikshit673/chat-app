// ==================== DB MODELS ====================
export const MODEL_NAMES = Object.freeze({
  USER: 'User',
  MESSAGE: 'Message',
  CONVERSATION: 'Conversation',
  USERTOKEN: 'UserToken',
  SESSION: 'Session',
});

export const USER_ROLES = ['USER', 'ADMIN', 'SUPER_ADMIN'] as const;
export const USER_ROLE_DEFAULT = USER_ROLES[0];
export type UserRolesType = (typeof USER_ROLES)[number];

export const MESSAGE_STATUS = ['sent', 'delivered', 'read'] as const;
export const MESSAGE_STATUS_DEFAULT = MESSAGE_STATUS[0];
export type MessageStatusType = (typeof MESSAGE_STATUS)[number];
