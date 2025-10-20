import { User } from './user.model';
export enum SessionEventType {
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  LOGOUT = 'LOGOUT',
  TOKEN_REFRESHED = 'TOKEN_REFRESHED',
  USER_SWITCHED = 'USER_SWITCHED',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE'
}

export interface SessionEvent {
  type: SessionEventType;
  timestamp: Date;
  data?: any;
  error?: any;
}

export interface SessionState {
  isAuthenticated: boolean;
  user: User | null;
  roles: string[];
  accessToken: string | null;
  expiresAt: Date | null;
}