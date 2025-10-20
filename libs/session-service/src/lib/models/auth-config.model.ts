export interface AuthConfig {
  clientId: string;
  authority: string;
  redirectUri: string;
  scopes?: string[];
  cacheLocation?: 'localStorage' | 'sessionStorage';
  logLevel?: 'error' | 'warning' | 'info' | 'verbose';
  postLogoutRedirectUri?: string;
}