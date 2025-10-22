import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { SessionEvent } from './models/session-event.model';

/**
 * Contrato público del SessionService para ser consumido por todos los micro frontends.
 * Este servicio es compartido como singleton a través de Module Federation.
 */
export abstract class SessionService {
  /**
   * Obtiene el usuario autenticado actual
   * @returns User object or null if not authenticated
   */
  abstract getUser(): User | null;

  /**
   * Obtiene los roles del usuario autenticado
   * @returns Array of role strings
   */
  abstract getRoles(): string[];

  /**
   * Obtiene el token de acceso actual
   * @returns Access token string or null if not authenticated
   */
  abstract getToken(): string | null;

  /**
   * Verifica si el usuario está autenticado
   * @returns true if authenticated, false otherwise
   */
  abstract isAuthenticated(): boolean;

  /**
   * Observable para escuchar cambios en la sesión
   * @returns Observable that emits SessionEvent objects
   */
  abstract onSessionChange(): Observable<SessionEvent>;

  /**
   * Inicia el proceso de autenticación
   * @returns Promise that resolves when login is complete
   */
  abstract login(): Promise<void>;

  /**
   * Cierra la sesión del usuario
   * @returns Promise that resolves when logout is complete
   */
  abstract logout(): Promise<void>;

  /**
   * Obtiene información detallada del token (claims)
   * @returns Object with token claims or null if not authenticated
   */
  abstract getTokenClaims(): any | null;

  /**
   * Verifica si el usuario tiene un rol específico
   * @param role Role to check
   * @returns true if user has the role, false otherwise
   */
  abstract hasRole(role: string): boolean;

  /**
   * Verifica si el usuario tiene alguno de los roles especificados
   * @param roles Array of roles to check
   * @returns true if user has any of the roles, false otherwise
   */
  abstract hasAnyRole(roles: string[]): boolean;

  /**
   * Verifica si el token está próximo a expirar
   * @param thresholdMinutes Minutes before expiration to consider as "about to expire"
   * @returns true if token expires within threshold, false otherwise
   */
  abstract isTokenExpiring(thresholdMinutes?: number): boolean;
}