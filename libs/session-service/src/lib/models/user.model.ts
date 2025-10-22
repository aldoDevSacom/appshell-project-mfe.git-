export interface User {
  id: string;
  email: string;
  name: string;
  displayName: string;
  givenName?: string;
  familyName?: string;
  jobTitle?: string;
  officeLocation?: string;
  preferredLanguage?: string;
  roles: string[];
  groups?: string[];
  tenantId: string;
  profilePhoto?: string; // Base64 encoded image or URL
}