import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService, SessionEventType } from '@app/session-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>SACOM - Sistema de Autenticación</h2>
        
        <div class="status-section">
          <h3>Estado de la Sesión</h3>
          <p>Autenticado: <strong>{{ isAuthenticated ? 'Sí' : 'No' }}</strong></p>
          <p *ngIf="user">Usuario: <strong>{{ user.displayName }}</strong></p>
          <p *ngIf="user">Email: <strong>{{ user.email }}</strong></p>
          <p *ngIf="roles.length > 0">Roles: <strong>{{ roles.join(', ') }}</strong></p>
        </div>

        <div class="config-section">
          <h3>Configuración Actual</h3>
          <pre>{{ configInfo }}</pre>
        </div>

        <div class="actions-section">
          <button 
            *ngIf="!isAuthenticated" 
            (click)="login()" 
            [disabled]="isLoading"
            class="login-btn">
            {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión con Microsoft' }}
          </button>
          
          <button 
            *ngIf="isAuthenticated" 
            (click)="logout()" 
            class="logout-btn">
            Cerrar Sesión
          </button>
        </div>

        <div class="debug-section" *ngIf="lastError">
          <h3>Último Error</h3>
          <pre class="error">{{ lastError }}</pre>
        </div>

        <div class="events-section">
          <h3>Eventos de Sesión</h3>
          <div class="events-list">
            <div *ngFor="let event of recentEvents" class="event-item">
              <strong>{{ event.type }}</strong> - {{ event.timestamp | date:'medium' }}
              <div *ngIf="event.error" class="event-error">Error: {{ event.error.message || event.error }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      max-width: 600px;
      width: 100%;
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }

    h3 {
      color: #555;
      border-bottom: 2px solid #eee;
      padding-bottom: 8px;
      margin: 20px 0 10px 0;
    }

    .status-section, .config-section, .actions-section, .debug-section, .events-section {
      margin-bottom: 20px;
    }

    pre {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      font-size: 12px;
      overflow-x: auto;
    }

    .error {
      background: #ffe6e6;
      color: #d32f2f;
      border: 1px solid #ffcdd2;
    }

    .login-btn, .logout-btn {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .login-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .login-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    .login-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .logout-btn {
      background: #f44336;
      color: white;
    }

    .logout-btn:hover {
      background: #d32f2f;
    }

    .events-list {
      max-height: 200px;
      overflow-y: auto;
    }

    .event-item {
      padding: 8px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
    }

    .event-error {
      color: #d32f2f;
      font-size: 12px;
      margin-top: 4px;
    }
  `]
})
export class LoginTestComponent implements OnInit {
  private sessionService = inject(SessionService);
  private subscription = new Subscription();

  isAuthenticated = false;
  isLoading = false;
  user: any = null;
  roles: string[] = [];
  lastError: string | null = null;
  recentEvents: any[] = [];
  configInfo = '';

  ngOnInit(): void {
    // Mostrar configuración
    this.configInfo = JSON.stringify({
      redirectUri: window.location.origin,
      currentUrl: window.location.href
    }, null, 2);

    this.updateAuthStatus();
    this.subscribeToSessionEvents();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateAuthStatus(): void {
    this.isAuthenticated = this.sessionService.isAuthenticated();
    this.user = this.sessionService.getUser();
    this.roles = this.sessionService.getRoles();
  }

  private subscribeToSessionEvents(): void {
    this.subscription.add(
      this.sessionService.onSessionChange().subscribe(event => {
        console.log('Session event received:', event);
        this.recentEvents.unshift(event);
        if (this.recentEvents.length > 5) {
          this.recentEvents.pop();
        }

        switch (event.type) {
          case SessionEventType.LOGIN_SUCCESS:
            this.isLoading = false;
            this.lastError = null;
            this.updateAuthStatus();
            break;
          case SessionEventType.LOGIN_FAILURE:
            this.isLoading = false;
            this.lastError = event.error ? JSON.stringify(event.error, null, 2) : 'Error desconocido';
            break;
          case SessionEventType.LOGOUT:
            this.updateAuthStatus();
            break;
        }
      })
    );
  }

  async login(): Promise<void> {
    try {
      this.isLoading = true;
      this.lastError = null;
      console.log('Iniciando proceso de login...');
      await this.sessionService.login();
    } catch (error) {
      console.error('Error en login:', error);
      this.isLoading = false;
      this.lastError = error instanceof Error ? error.message : String(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.sessionService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }
}