import { Injectable, Inject, InjectionToken } from '@angular/core';
import { 
  PublicClientApplication, 
  InteractionRequiredAuthError,
  SilentRequest,
  RedirectRequest,
  AccountInfo
} from '@azure/msal-browser';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';
import { SessionService, User, SessionEvent, SessionEventType, AuthConfig } from '@app/session-service';
import { GraphApiService } from './graph-api.service';

export const AUTH_CONFIG_TOKEN = new InjectionToken<AuthConfig>('AUTH_CONFIG');

@Injectable({
  providedIn: 'root'
})
export class MSALSessionService extends SessionService {
  private msalInstance!: PublicClientApplication;
  private currentUser: User | null = null;
  private currentRoles: string[] = [];
  private currentToken: string | null = null;
  private sessionChangeSubject = new Subject<SessionEvent>();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private initialized = false;
  private initializationPromise: Promise<void>;

  constructor(
    @Inject(AUTH_CONFIG_TOKEN) private config: AuthConfig,
    private graphApiService: GraphApiService
  ) {
    super();
    this.initializationPromise = this.initializeMSAL();
  }

  private async initializeMSAL(): Promise<void> {
    this.msalInstance = new PublicClientApplication({
      auth: {
        clientId: this.config.clientId,
        authority: this.config.authority,
        redirectUri: this.config.redirectUri,
        postLogoutRedirectUri: this.config.postLogoutRedirectUri
      },
      cache: {
        cacheLocation: this.config.cacheLocation || 'sessionStorage',
        storeAuthStateInCookie: false
      },
      system: {
        loggerOptions: {
          loggerCallback: (level, message, containsPii) => {
            if (this.config.logLevel === 'verbose') {
              console.log(message);
            }
          }
        }
      }
    });

    await this.msalInstance.initialize();
    await this.handleRedirectResponse();
    this.loadExistingSession();
    this.initialized = true;
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initializationPromise;
    }
  }

  private async handleRedirectResponse(): Promise<void> {
    try {
      const response = await this.msalInstance.handleRedirectPromise();
      if (response) {
        await this.processAuthResponse(response.account);
        this.emitSessionEvent(SessionEventType.LOGIN_SUCCESS, { account: response.account });
      }
    } catch (error) {
      console.error('Error handling redirect response:', error);
      this.emitSessionEvent(SessionEventType.LOGIN_FAILURE, null, error);
    }
  }

  private loadExistingSession(): void {
    const accounts = this.msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      this.processAuthResponse(accounts[0]);
    }
  }

  private async processAuthResponse(account: AccountInfo): Promise<void> {
    if (!account) return;

    try {
      // Obtener token de acceso
      const tokenRequest: SilentRequest = {
        scopes: this.config.scopes || ['User.Read'],
        account: account
      };

      const response = await this.msalInstance.acquireTokenSilent(tokenRequest);
      this.currentToken = response.accessToken;

      // Procesar información del usuario y roles
      const idTokenClaims = response.idTokenClaims || account.idTokenClaims;
      
      this.currentUser = this.mapToUser(account, idTokenClaims);
      this.currentRoles = this.extractRoles(idTokenClaims);
      
      // Cargar foto de perfil de forma asíncrona
      this.loadUserProfilePhoto(response.accessToken);
      
      this.isAuthenticatedSubject.next(true);
      
      // Configurar renovación automática del token
      this.scheduleTokenRenewal(response.expiresOn);
      
    } catch (error) {
      console.error('Error processing auth response:', error);
      this.clearSession();
    }
  }

  private mapToUser(account: AccountInfo, claims: any): User {
    return {
      id: account.homeAccountId || account.localAccountId,
      email: account.username,
      name: account.name || claims?.name || account.username,
      displayName: account.name || claims?.name || account.username,
      givenName: claims?.given_name,
      familyName: claims?.family_name,
      jobTitle: claims?.jobTitle,
      officeLocation: claims?.officeLocation,
      preferredLanguage: claims?.preferred_username,
      roles: this.extractRoles(claims),
      groups: claims?.groups || [],
      tenantId: account.tenantId || claims?.tid,
      profilePhoto: undefined // Se cargará de forma asíncrona
    };
  }

  /**
   * Carga la foto de perfil del usuario de forma asíncrona
   */
  private loadUserProfilePhoto(accessToken: string): void {
    this.graphApiService.getCurrentUserPhoto(accessToken).subscribe({
      next: (photoData) => {
        if (photoData && this.currentUser) {
          this.currentUser = {
            ...this.currentUser,
            profilePhoto: photoData
          };
          
          // Emitir evento de actualización del perfil
          this.emitSessionEvent(SessionEventType.LOGIN_SUCCESS, { 
            profilePhotoLoaded: true,
            user: this.currentUser 
          });
        }
      },
      error: (error) => {
        console.warn('Failed to load user profile photo:', error);
        // No es un error crítico, solo logeamos la advertencia
      }
    });
  }

  private extractRoles(claims: any): string[] {
    if (!claims) return [];
    
    // Extraer roles del claim 'roles'
    const roles = claims.roles || [];
    
    // También podemos extraer de otros claims si es necesario
    const appRoles = claims.app_roles || [];
    
    return [...roles, ...appRoles].filter(Boolean);
  }

  private scheduleTokenRenewal(expiresOn: Date | null): void {
    if (!expiresOn) return;

    const renewTime = new Date(expiresOn.getTime() - (5 * 60 * 1000)); // 5 minutos antes
    const timeUntilRenew = renewTime.getTime() - Date.now();

    if (timeUntilRenew > 0) {
      setTimeout(async () => {
        await this.renewToken();
      }, timeUntilRenew);
    }
  }

  private async renewToken(): Promise<void> {
    try {
      const accounts = this.msalInstance.getAllAccounts();
      if (accounts.length === 0) {
        this.clearSession();
        return;
      }

      const tokenRequest: SilentRequest = {
        scopes: this.config.scopes || ['User.Read'],
        account: accounts[0]
      };

      const response = await this.msalInstance.acquireTokenSilent(tokenRequest);
      this.currentToken = response.accessToken;
      
      this.emitSessionEvent(SessionEventType.TOKEN_REFRESHED, { 
        accessToken: response.accessToken,
        expiresOn: response.expiresOn 
      });
      
      this.scheduleTokenRenewal(response.expiresOn);
      
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        this.emitSessionEvent(SessionEventType.SESSION_EXPIRED);
        this.clearSession();
      }
    }
  }

  private clearSession(): void {
    this.currentUser = null;
    this.currentRoles = [];
    this.currentToken = null;
    this.isAuthenticatedSubject.next(false);
  }

  private emitSessionEvent(type: SessionEventType, data?: any, error?: any): void {
    const event: SessionEvent = {
      type,
      timestamp: new Date(),
      data,
      error
    };
    this.sessionChangeSubject.next(event);
  }

  // Implementación de métodos públicos del contrato SessionService

  getUser(): User | null {
    return this.currentUser;
  }

  getRoles(): string[] {
    return [...this.currentRoles];
  }

  getToken(): string | null {
    return this.currentToken;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value && !!this.currentToken;
  }

  onSessionChange(): Observable<SessionEvent> {
    return this.sessionChangeSubject.asObservable();
  }

  async login(): Promise<void> {
    try {
      await this.ensureInitialized();
      
      console.log('Starting login process with config:', {
        clientId: this.config.clientId,
        authority: this.config.authority,
        redirectUri: this.config.redirectUri
      });
      
      const loginRequest: RedirectRequest = {
        scopes: this.config.scopes || ['User.Read'],
        redirectUri: this.config.redirectUri,
        prompt: 'select_account'
      };

      await this.msalInstance.loginRedirect(loginRequest);
    } catch (error) {
      console.error('Login error:', error);
      this.emitSessionEvent(SessionEventType.LOGIN_FAILURE, null, error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      this.emitSessionEvent(SessionEventType.LOGOUT);
      this.clearSession();
      
      await this.msalInstance.logoutRedirect({
        postLogoutRedirectUri: this.config.postLogoutRedirectUri
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  getTokenClaims(): any | null {
    if (!this.isAuthenticated()) return null;
    
    const accounts = this.msalInstance.getAllAccounts();
    return accounts.length > 0 ? accounts[0].idTokenClaims : null;
  }

  hasRole(role: string): boolean {
    return this.currentRoles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.currentRoles.includes(role));
  }

  isTokenExpiring(thresholdMinutes: number = 5): boolean {
    if (!this.currentToken) return false;
    
    const accounts = this.msalInstance.getAllAccounts();
    if (accounts.length === 0) return false;

    // Nota: MSAL no expone directamente la fecha de expiración del access token
    // Esta implementación es básica. En producción, podrías decodificar el JWT
    // o usar la información disponible en el cache de MSAL
    return false; // Implementación simplificada
  }

  /**
   * Obtiene la foto de perfil del usuario actual
   */
  async getUserProfilePhoto(size?: string): Promise<string | null> {
    if (!this.currentToken) {
      throw new Error('No access token available');
    }

    try {
      if (size) {
        return await firstValueFrom(this.graphApiService.getUserPhotoBySize(this.currentToken, size));
      } else {
        return await firstValueFrom(this.graphApiService.getCurrentUserPhoto(this.currentToken));
      }
    } catch (error) {
      console.error('Error getting user profile photo:', error);
      return null;
    }
  }

  /**
   * Actualiza la foto de perfil del usuario actual
   */
  async refreshUserProfilePhoto(): Promise<void> {
    if (!this.currentToken) return;
    
    this.loadUserProfilePhoto(this.currentToken);
  }
}