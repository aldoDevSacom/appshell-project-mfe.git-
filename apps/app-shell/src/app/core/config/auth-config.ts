import { AuthConfig } from '@app/session-service';

/**
 * Configuración de Microsoft Entra ID (Azure AD) para la autenticación
 * Este archivo debe ser configurado con los valores específicos de tu tenant de Azure AD.
 */
export const authConfig: AuthConfig = {
  // Client ID de la aplicación registrada en Microsoft Entra ID
  clientId: '856cbb0e-8e1f-4139-8372-0d450c2a31f1',
  
  // Authority URL para tu tenant de Azure AD
  // Formato: https://login.microsoftonline.com/{tenant-id}
  // O puedes usar: https://login.microsoftonline.com/common para multi-tenant
  authority: 'https://login.microsoftonline.com/be74a56e-46e6-4049-925e-31e9f9930f55',
  
  // URI de redirección después del login
  redirectUri: window.location.origin,
  
  // URI de redirección después del logout
  postLogoutRedirectUri: window.location.origin,
  
  // Scopes solicitados durante el login
  // User.Read: Necesario para obtener información básica del usuario y foto de perfil
  scopes: [
    'openid',
    'profile',
    'email',
    'User.Read'  // Incluye acceso a la foto de perfil del usuario
  ],
  
  // Ubicación del cache (sessionStorage para mayor seguridad en esta fase inicial)
  cacheLocation: 'sessionStorage',
  
  // Nivel de logging para debugging
  logLevel: 'info'
};