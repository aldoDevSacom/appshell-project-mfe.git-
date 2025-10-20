import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SessionService, User, SessionEvent, SessionEventType } from '@app/session-service';

@Component({
  selector: 'mfe-dashboard-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <!-- Información del usuario -->
      <div class="user-info-panel" *ngIf="user">
        <h2>Bienvenido, {{ user.displayName }}</h2>
        <p>Email: {{ user.email }}</p>
        <p>Roles: {{ roles.join(', ') }}</p>
      </div>

      <!-- Contenido basado en roles -->
      <div class="content-section">
        <h3>Dashboard</h3>
        
        <!-- Contenido público -->
        <div class="public-content">
          <p>Este contenido está disponible para todos los usuarios autenticados.</p>
        </div>
        
        <!-- Contenido restringido por rol -->
        <div *ngIf="canViewBilling" class="restricted-content">
          <h4>Sección de Facturación</h4>
          <p>Solo visible para usuarios con rol 'module:billing'</p>
        </div>
        
        <div *ngIf="canViewTasks" class="restricted-content">
          <h4>Sección de Tareas</h4>
          <p>Solo visible para usuarios con rol 'module:tasks'</p>
        </div>
        
        <div *ngIf="isAdmin" class="admin-content">
          <h4>Panel de Administración</h4>
          <p>Solo visible para administradores</p>
        </div>
      </div>

      <!-- Estado de la sesión -->
      <div class="session-status">
        <p>Estado de autenticación: {{ isAuthenticated ? 'Activo' : 'Inactivo' }}</p>
        <p>Token expira pronto: {{ isTokenExpiring ? 'Sí' : 'No' }}</p>
        <button (click)="refreshData()" class="refresh-btn">
          Refrescar Datos
        </button>
      </div>

      <!-- Log de eventos -->
      <div class="events-log">
        <h4>Eventos de Sesión (últimos 5)</h4>
        <ul>
          <li *ngFor="let event of recentEvents" class="event-item">
            <strong>{{ event.type }}</strong> - {{ event.timestamp | date:'short' }}
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .user-info-panel {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .content-section {
      margin-bottom: 30px;
    }

    .restricted-content,
    .admin-content {
      background: #e3f2fd;
      padding: 15px;
      border-radius: 6px;
      margin: 10px 0;
    }

    .admin-content {
      background: #fff3e0;
    }

    .session-status {
      background: #f1f3f4;
      padding: 15px;
      border-radius: 6px;
      margin-bottom: 20px;
    }

    .refresh-btn {
      background: #1976d2;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }

    .events-log {
      background: #fafafa;
      padding: 15px;
      border-radius: 6px;
    }

    .event-item {
      padding: 5px 0;
      border-bottom: 1px solid #eee;
    }
  `]
})
export class DashboardExampleComponent implements OnInit, OnDestroy {
  private sessionService = inject(SessionService);
  private subscription = new Subscription();

  // Estado del componente
  user: User | null = null;
  roles: string[] = [];
  isAuthenticated = false;
  isTokenExpiring = false;
  recentEvents: SessionEvent[] = [];

  // Propiedades computadas para control de acceso
  get canViewBilling(): boolean {
    return this.sessionService.hasRole('module:billing');
  }

  get canViewTasks(): boolean {
    return this.sessionService.hasRole('module:tasks');
  }

  get isAdmin(): boolean {
    return this.sessionService.hasAnyRole(['admin', 'super-admin']);
  }

  ngOnInit(): void {
    this.loadSessionData();
    this.subscribeToSessionChanges();
    this.checkTokenExpiration();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadSessionData(): void {
    this.isAuthenticated = this.sessionService.isAuthenticated();
    
    if (this.isAuthenticated) {
      this.user = this.sessionService.getUser();
      this.roles = this.sessionService.getRoles();
      
      // Ejemplo de uso de claims adicionales
      const claims = this.sessionService.getTokenClaims();
      console.log('Claims del usuario:', claims);
      
      // Verificar expiración del token
      this.isTokenExpiring = this.sessionService.isTokenExpiring(15); // 15 minutos
    }
  }

  private subscribeToSessionChanges(): void {
    this.subscription.add(
      this.sessionService.onSessionChange().subscribe(event => {
        this.handleSessionEvent(event);
      })
    );
  }

  private handleSessionEvent(event: SessionEvent): void {
    // Mantener log de eventos recientes
    this.recentEvents.unshift(event);
    if (this.recentEvents.length > 5) {
      this.recentEvents.pop();
    }

    // Manejar tipos específicos de eventos
    switch (event.type) {
      case SessionEventType.LOGIN_SUCCESS:
        console.log('Usuario logueado exitosamente');
        this.loadSessionData();
        break;

      case SessionEventType.LOGOUT:
        console.log('Usuario deslogueado');
        this.clearSessionData();
        break;

      case SessionEventType.SESSION_EXPIRED:
        console.log('Sesión expirada');
        this.handleSessionExpired();
        break;

      case SessionEventType.TOKEN_REFRESHED:
        console.log('Token renovado');
        this.loadSessionData();
        break;

      case SessionEventType.USER_SWITCHED:
        console.log('Usuario cambiado');
        this.loadSessionData();
        break;

      case SessionEventType.LOGIN_FAILURE:
        console.error('Error en el login:', event.error);
        break;
    }
  }

  private clearSessionData(): void {
    this.user = null;
    this.roles = [];
    this.isAuthenticated = false;
    this.isTokenExpiring = false;
  }

  private handleSessionExpired(): void {
    this.clearSessionData();
    // Aquí podrías mostrar un modal o notificación
    alert('Tu sesión ha expirado. Serás redirigido al login.');
  }

  private checkTokenExpiration(): void {
    // Verificar periódicamente si el token está por expirar
    setInterval(() => {
      if (this.sessionService.isAuthenticated()) {
        this.isTokenExpiring = this.sessionService.isTokenExpiring(15);
      }
    }, 60000); // Verificar cada minuto
  }

  refreshData(): void {
    // Ejemplo de cómo usar el token para hacer llamadas a API
    const token = this.sessionService.getToken();
    if (token) {
      console.log('Refreshing data with token:', token);
      // Aquí harías llamadas a tu API usando el token
      // this.http.get('/api/data', { headers: { Authorization: \`Bearer \${token}\` }})
    }
  }

  // Ejemplo de métodos para acciones específicas
  async performAdminAction(): Promise<void> {
    if (!this.isAdmin) {
      alert('No tienes permisos para realizar esta acción');
      return;
    }

    // Lógica de administración
    console.log('Ejecutando acción de administrador');
  }

  async accessBillingModule(): Promise<void> {
    if (!this.canViewBilling) {
      alert('No tienes acceso al módulo de facturación');
      return;
    }

    // Lógica específica de billing
    console.log('Accediendo al módulo de facturación');
  }
}