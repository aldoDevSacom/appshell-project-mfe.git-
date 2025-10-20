import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SessionService, User, SessionEvent, SessionEventType } from '@app/session-service';

@Component({
  selector: 'app-session-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="session-test-container">
      <h2>🧪 Prueba de Sesión Compartida</h2>
      <p class="subtitle">Validación de SessionService entre App Shell y MFEs</p>
      
      <div class="test-grid">
        <!-- Estado de autenticación -->
        <div class="test-card" [ngClass]="isAuthenticated ? 'success' : 'error'">
          <h3>🔐 Estado de Autenticación</h3>
          <p><strong>Autenticado:</strong> {{ isAuthenticated ? 'Sí' : 'No' }}</p>
          <p><strong>SessionService disponible:</strong> {{ sessionServiceAvailable ? 'Sí' : 'No' }}</p>
        </div>

        <!-- Información del usuario -->
        <div class="test-card" [ngClass]="user ? 'success' : 'warning'">
          <h3>👤 Información del Usuario</h3>
          <div *ngIf="user; else noUser">
            <p><strong>Nombre:</strong> {{ user.displayName }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>ID:</strong> {{ user.id }}</p>
            <p><strong>Tenant:</strong> {{ user.tenantId }}</p>
          </div>
          <ng-template #noUser>
            <p>No hay información de usuario disponible</p>
          </ng-template>
        </div>

        <!-- Roles y permisos -->
        <div class="test-card" [ngClass]="roles.length > 0 ? 'success' : 'info'">
          <h3>🎭 Roles y Permisos</h3>
          <div *ngIf="roles.length > 0; else noRoles">
            <p><strong>Roles asignados:</strong></p>
            <ul>
              <li *ngFor="let role of roles">{{ role }}</li>
            </ul>
          </div>
          <ng-template #noRoles>
            <p>No hay roles asignados o es un usuario básico</p>
          </ng-template>
        </div>

        <!-- Token de acceso -->
        <div class="test-card" [ngClass]="hasToken ? 'success' : 'error'">
          <h3>🎫 Token de Acceso</h3>
          <p><strong>Token disponible:</strong> {{ hasToken ? 'Sí' : 'No' }}</p>
          <p *ngIf="hasToken"><strong>Longitud del token:</strong> {{ tokenLength }} caracteres</p>
          <p *ngIf="tokenExpiring"><strong>⚠️ Token expirando pronto</strong></p>
        </div>

        <!-- Eventos de sesión -->
        <div class="test-card info">
          <h3>📡 Eventos de Sesión</h3>
          <p><strong>Eventos recibidos:</strong> {{ eventCount }}</p>
          <div class="events-list">
            <div *ngFor="let event of recentEvents" class="event-item">
              <span class="event-type">{{ event.type }}</span>
              <span class="event-time">{{ event.timestamp | date:'HH:mm:ss' }}</span>
            </div>
          </div>
        </div>

        <!-- Pruebas de funcionalidad -->
        <div class="test-card info">
          <h3>🧪 Pruebas de Funcionalidad</h3>
          <div class="function-tests">
            <div class="test-result">
              <span>getUser():</span>
              <span [ngClass]="user ? 'pass' : 'fail'">{{ user ? 'PASS' : 'FAIL' }}</span>
            </div>
            <div class="test-result">
              <span>getRoles():</span>
              <span class="pass">PASS</span>
            </div>
            <div class="test-result">
              <span>getToken():</span>
              <span [ngClass]="hasToken ? 'pass' : 'fail'">{{ hasToken ? 'PASS' : 'FAIL' }}</span>
            </div>
            <div class="test-result">
              <span>isAuthenticated():</span>
              <span [ngClass]="isAuthenticated ? 'pass' : 'fail'">{{ isAuthenticated ? 'PASS' : 'FAIL' }}</span>
            </div>
            <div class="test-result">
              <span>onSessionChange():</span>
              <span [ngClass]="eventCount > 0 ? 'pass' : 'info'">{{ eventCount > 0 ? 'PASS' : 'PENDING' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="actions-section">
        <button (click)="refreshSessionData()" class="refresh-btn">
          🔄 Refrescar Estado
        </button>
        <button (click)="testSessionMethods()" class="test-btn">
          🧪 Probar Métodos
        </button>
        <button *ngIf="!isAuthenticated" (click)="triggerLogin()" class="login-btn">
          🔑 Iniciar Sesión
        </button>
      </div>

      <!-- Log de debug -->
      <div class="debug-log">
        <h4>📋 Log de Debug</h4>
        <div class="log-entries">
          <div *ngFor="let log of debugLogs" [ngClass]="'log-' + log.level">
            <span class="log-time">{{ log.timestamp | date:'HH:mm:ss.SSS' }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .session-test-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      font-family: system-ui, sans-serif;
    }

    h2 {
      text-align: center;
      color: #1e40af;
      margin-bottom: 8px;
    }

    .subtitle {
      text-align: center;
      color: #6b7280;
      margin-bottom: 30px;
    }

    .test-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .test-card {
      padding: 20px;
      border-radius: 12px;
      border: 2px solid;
      background: white;
    }

    .test-card.success {
      border-color: #10b981;
      background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
    }

    .test-card.error {
      border-color: #ef4444;
      background: linear-gradient(135deg, #fef2f2, #fff5f5);
    }

    .test-card.warning {
      border-color: #f59e0b;
      background: linear-gradient(135deg, #fffbeb, #fefce8);
    }

    .test-card.info {
      border-color: #3b82f6;
      background: linear-gradient(135deg, #eff6ff, #f0f9ff);
    }

    .test-card h3 {
      margin: 0 0 15px 0;
      color: #374151;
    }

    .test-card p {
      margin: 8px 0;
      color: #4b5563;
    }

    .events-list {
      max-height: 120px;
      overflow-y: auto;
      margin-top: 10px;
    }

    .event-item {
      display: flex;
      justify-content: space-between;
      padding: 4px 8px;
      background: rgba(255,255,255,0.7);
      border-radius: 4px;
      margin: 2px 0;
      font-size: 12px;
    }

    .event-type {
      font-weight: 600;
      color: #1e40af;
    }

    .event-time {
      color: #6b7280;
    }

    .function-tests {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .test-result {
      display: flex;
      justify-content: space-between;
      padding: 8px;
      background: rgba(255,255,255,0.7);
      border-radius: 4px;
      font-size: 14px;
    }

    .pass {
      color: #10b981;
      font-weight: 600;
    }

    .fail {
      color: #ef4444;
      font-weight: 600;
    }

    .actions-section {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-bottom: 30px;
    }

    .refresh-btn, .test-btn, .login-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .refresh-btn {
      background: #3b82f6;
      color: white;
    }

    .test-btn {
      background: #10b981;
      color: white;
    }

    .login-btn {
      background: #f59e0b;
      color: white;
    }

    .refresh-btn:hover, .test-btn:hover, .login-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .debug-log {
      background: #1f2937;
      border-radius: 8px;
      padding: 16px;
      color: #e5e7eb;
    }

    .debug-log h4 {
      margin: 0 0 12px 0;
      color: #60a5fa;
    }

    .log-entries {
      max-height: 200px;
      overflow-y: auto;
      font-family: 'Courier New', monospace;
      font-size: 12px;
    }

    .log-entries div {
      margin: 2px 0;
      padding: 2px 0;
    }

    .log-time {
      color: #9ca3af;
      margin-right: 8px;
    }

    .log-info {
      color: #60a5fa;
    }

    .log-success {
      color: #34d399;
    }

    .log-error {
      color: #f87171;
    }

    .log-warning {
      color: #fbbf24;
    }
  `]
})
export class SessionTestComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  
  // Estado del componente
  sessionServiceAvailable = false;
  isAuthenticated = false;
  user: User | null = null;
  roles: string[] = [];
  hasToken = false;
  tokenLength = 0;
  tokenExpiring = false;
  eventCount = 0;
  recentEvents: SessionEvent[] = [];
  debugLogs: Array<{timestamp: Date, level: string, message: string}> = [];

  constructor(private sessionService: SessionService) {
    this.sessionServiceAvailable = !!sessionService;
    this.addDebugLog('info', 'SessionTestComponent inicializado');
    
    if (!sessionService) {
      this.addDebugLog('error', 'SessionService no está disponible!');
    } else {
      this.addDebugLog('success', 'SessionService detectado correctamente');
    }
  }

  ngOnInit(): void {
    if (this.sessionService) {
      this.loadSessionData();
      this.subscribeToSessionEvents();
      this.addDebugLog('info', 'Suscripciones configuradas');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.addDebugLog('info', 'Componente destruido, suscripciones limpiadas');
  }

  private loadSessionData(): void {
    try {
      this.isAuthenticated = this.sessionService.isAuthenticated();
      this.user = this.sessionService.getUser();
      this.roles = this.sessionService.getRoles();
      
      const token = this.sessionService.getToken();
      this.hasToken = !!token;
      this.tokenLength = token ? token.length : 0;
      this.tokenExpiring = this.sessionService.isTokenExpiring(15);
      
      this.addDebugLog('success', `Estado cargado: auth=${this.isAuthenticated}, user=${!!this.user}, token=${this.hasToken}`);
    } catch (error) {
      this.addDebugLog('error', `Error cargando sesión: ${error}`);
    }
  }

  private subscribeToSessionEvents(): void {
    this.subscription.add(
      this.sessionService.onSessionChange().subscribe(event => {
        this.eventCount++;
        this.recentEvents.unshift(event);
        if (this.recentEvents.length > 10) {
          this.recentEvents.pop();
        }
        
        this.addDebugLog('info', `Evento recibido: ${event.type}`);
        
        // Recargar datos cuando hay cambios
        this.loadSessionData();
      })
    );
  }

  refreshSessionData(): void {
    this.addDebugLog('info', 'Refrescando datos de sesión...');
    this.loadSessionData();
  }

  testSessionMethods(): void {
    this.addDebugLog('info', 'Probando métodos del SessionService...');
    
    try {
      // Probar cada método
      const user = this.sessionService.getUser();
      this.addDebugLog('success', `getUser(): ${user ? 'OK' : 'NULL'}`);
      
      const roles = this.sessionService.getRoles();
      this.addDebugLog('success', `getRoles(): ${roles.length} roles`);
      
      const token = this.sessionService.getToken();
      this.addDebugLog('success', `getToken(): ${token ? 'OK' : 'NULL'}`);
      
      const isAuth = this.sessionService.isAuthenticated();
      this.addDebugLog('success', `isAuthenticated(): ${isAuth}`);
      
      const claims = this.sessionService.getTokenClaims();
      this.addDebugLog('success', `getTokenClaims(): ${claims ? 'OK' : 'NULL'}`);
      
    } catch (error) {
      this.addDebugLog('error', `Error en test: ${error}`);
    }
  }

  async triggerLogin(): Promise<void> {
    try {
      this.addDebugLog('info', 'Iniciando proceso de login...');
      await this.sessionService.login();
    } catch (error) {
      this.addDebugLog('error', `Error en login: ${error}`);
    }
  }

  private addDebugLog(level: string, message: string): void {
    this.debugLogs.unshift({
      timestamp: new Date(),
      level,
      message
    });
    
    if (this.debugLogs.length > 50) {
      this.debugLogs.pop();
    }
    
    // También loguear en consola
    console.log(`[SessionTest] ${level.toUpperCase()}: ${message}`);
  }
}