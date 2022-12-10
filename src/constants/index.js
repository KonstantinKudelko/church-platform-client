export const API_URL = import.meta.env.VITE_API_URL;

export const CHAT_STATUSES = Object.freeze({
  REQUEST: "REQUEST",
  QUALIFIED_REQUEST: "QUALIFIED_REQUEST",
  MQL: "MQL",
  SQL: "SQL",
});

export const MESSAGE_STATUSES = Object.freeze({
  DRAFT: "DRAFT",
  REJECTED: "REJECTED",
  ACCEPTED: "ACCEPTED",
});

export const USER_ROLES = Object.freeze({
  ADMIN: "ADMIN",
  SALES: "SALES",
  OPERATIONS: "OPERATIONS",
});

export const SORT_OPTIONS = Object.freeze({
  ASC: "asc",
  DESC: "desc",
});

export const RULES_TYPES = Object.freeze({
  GLOBAL: "GLOBAL",
  INCLUDED: "INCLUDED",
  EXCLUDED: "EXCLUDED",
});

export const ERROR_WORKSPACE_STATUS = "AUTH_ERROR";
export const NOT_AUTH_WORKSPACE_STATUS = "NOT_AUTH";
export const AUTHORIZED_WORKSPACE_STATUS = "AUTHORIZED";
export const PROGRESS_WORKSPACE_STATUS = "AUTH_IN_PROGRESS";

export const SORT_FIELDS = Object.freeze({
  UPDATED_AT: "updatedAt",
  CREATED_AT: "createdAt",
});

export const MENU_TITLES = Object.freeze({
  CHATS: "Chats",
  ARCHIVE: "Archive",
  REQUESTS: "Requests",
});
