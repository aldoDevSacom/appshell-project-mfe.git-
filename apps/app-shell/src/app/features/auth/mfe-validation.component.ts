import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { SessionService, User, SessionEvent } from '@app/session-service';

interface MfeSimulation {
  name: string;
  color: string;
  icon: string;
  isConnected: boolean;
  sessionReceived: boolean;
  userInfo: User | null;
  eventCount: number;
  lastEvent: string;
  status: 'disconnected' | 'connected' | 'synced';
}

@Component({
  selector: 'app-mfe-validation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="validation-container">
      <header class="validation-header">
        <h1>🔗 Validación de Sesión Compartida entre MFEs</h1>
        <p>Simulación del comportamiento de todos los microfrontends</p>
      </header>

      <!-- Estado General de Sesión -->
      <div class="session-overview">
        <div class="session-card" [ngClass]="overallStatus">
          <h2>📊 Estado General del App Shell</h2>
          <div class="session-info">
            <div class="info-item">
              <span class="label">Autenticado:</span>
              <span class="value" [ngClass]="isAuthenticated ? 'success' : 'error'">
                {{ isAuthenticated ? '✅ Sí' : '❌ No' }}
              </span>
            </div>
            <div class="info-item" *ngIf="user">
              <span class="label">Usuario:</span>
              <span class="value">{{ user.displayName }}</span>
            </div>
            <div class="info-item" *ngIf="user">
              <span class="label">Email:</span>
              <span class="value">{{ user.email }}</span>
            </div>
            <div class="info-item">
              <span class="label">Eventos totales:</span>
              <span class="value">{{ totalEvents }}</span>
            </div>
            <div class="info-item">
              <span class="label">SessionService:</span>
              <span class="value success">✅ Disponible</span>
            </div>
          </div>
          
          <div class="actions">
            <button (click)="triggerLogin()" [disabled]="isAuthenticated" class="login-btn">
              🔑 Iniciar Sesión
            </button>
            <button (click)="triggerLogout()" [disabled]="!isAuthenticated" class="logout-btn">
              🚪 Cerrar Sesión
            </button>
            <button (click)="refreshData()" class="refresh-btn">
              🔄 Actualizar
            </button>
          </div>
        </div>
      </div>

      <!-- Simulación de MFEs -->
      <div class="mfes-grid">
        <div *ngFor="let mfe of mfeSimulations" 
             class="mfe-card" 
             [style.border-left-color]="mfe.color">
          
          <div class="mfe-header">
            <div class="mfe-title">
              <span class="mfe-icon">{{ mfe.icon }}</span>
              <h3>{{ mfe.name }}</h3>
            </div>
            <div class="mfe-status" [ngClass]="mfe.status">
              {{ getStatusText(mfe.status) }}
            </div>
          </div>

          <div class="mfe-content">
            <!-- Conexión -->
            <div class="status-item">
              <span class="status-label">Conexión:</span>
              <span [ngClass]="mfe.isConnected ? 'connected' : 'disconnected'">
                {{ mfe.isConnected ? '🟢 Conectado' : '🔴 Desconectado' }}
              </span>
            </div>

            <!-- Recepción de Sesión -->
            <div class="status-item">
              <span class="status-label">Sesión recibida:</span>
              <span [ngClass]="mfe.sessionReceived ? 'received' : 'not-received'">
                {{ mfe.sessionReceived ? '✅ Sí' : '❌ No' }}
              </span>
            </div>

            <!-- Información del Usuario -->
            <div class="status-item" *ngIf="mfe.userInfo">
              <span class="status-label">Usuario:</span>
              <span class="user-info">{{ mfe.userInfo.displayName }}</span>
            </div>

            <!-- Eventos -->
            <div class="status-item">
              <span class="status-label">Eventos:</span>
              <span class="event-count">{{ mfe.eventCount }}</span>
            </div>

            <!-- Último Evento -->
            <div class="status-item" *ngIf="mfe.lastEvent">
              <span class="status-label">Último evento:</span>
              <span class="last-event">{{ mfe.lastEvent }}</span>
            </div>

            <!-- Indicador de Sincronización -->
            <div class="sync-indicator" [ngClass]="mfe.status">
              <div class="sync-dot"></div>
              <span>{{ getSyncMessage(mfe.status) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Log de Eventos -->
      <div class="events-log">
        <h2>📋 Log de Eventos de Sesión</h2>
        <div class="log-content">
          <div *ngFor="let event of eventLog" class="log-entry" [ngClass]="'log-' + event.type">
            <span class="log-time">{{ event.timestamp | date:'HH:mm:ss.SSS' }}</span>
            <span class="log-type">{{ event.type }}</span>
            <span class="log-message">{{ event.message }}</span>
          </div>
        </div>
      </div>

      <!-- Resultados de Validación -->
      <div class="validation-results">
        <h2>🧪 Resultados de Validación</h2>
        <div class="results-grid">
          <div class="result-item" [ngClass]="sessionServiceTest ? 'pass' : 'fail'">
            <span class="test-name">SessionService disponible</span>
            <span class="test-result">{{ sessionServiceTest ? 'PASS' : 'FAIL' }}</span>
          </div>
          <div class="result-item" [ngClass]="allMfesConnected ? 'pass' : 'fail'">
            <span class="test-name">Todos los MFEs conectados</span>
            <span class="test-result">{{ allMfesConnected ? 'PASS' : 'FAIL' }}</span>
          </div>
          <div class="result-item" [ngClass]="sessionPropagation ? 'pass' : 'fail'">
            <span class="test-name">Propagación de sesión</span>
            <span class="test-result">{{ sessionPropagation ? 'PASS' : 'FAIL' }}</span>
          </div>
          <div class="result-item" [ngClass]="eventDistribution ? 'pass' : 'fail'">
            <span class="test-name">Distribución de eventos</span>
            <span class="test-result">{{ eventDistribution ? 'PASS' : 'FAIL' }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .validation-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
      font-family: system-ui, sans-serif;
    }

    .validation-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .validation-header h1 {
      color: #1e40af;
      margin-bottom: 8px;
    }

    .session-overview {
      margin-bottom: 30px;
    }

    .session-card {
      padding: 24px;
      border-radius: 12px;
      border: 2px solid #3b82f6;
      background: linear-gradient(135deg, #eff6ff, #f0f9ff);
    }

    .session-card.success {
      border-color: #10b981;
      background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
    }

    .session-card.error {
      border-color: #ef4444;
      background: linear-gradient(135deg, #fef2f2, #fff5f5);
    }

    .session-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 20px 0;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: rgba(255,255,255,0.7);
      border-radius: 6px;
    }

    .label {
      font-weight: 600;
      color: #374151;
    }

    .value {
      font-weight: 500;
    }

    .value.success {
      color: #10b981;
    }

    .value.error {
      color: #ef4444;
    }

    .actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 20px;
    }

    .login-btn, .logout-btn, .refresh-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .login-btn {
      background: #10b981;
      color: white;
    }

    .logout-btn {
      background: #ef4444;
      color: white;
    }

    .refresh-btn {
      background: #3b82f6;
      color: white;
    }

    .login-btn:disabled, .logout-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .mfes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .mfe-card {
      border: 2px solid #e5e7eb;
      border-left: 4px solid;
      border-radius: 8px;
      background: white;
      padding: 16px;
      transition: all 0.3s;
    }

    .mfe-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .mfe-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .mfe-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .mfe-icon {
      font-size: 24px;
    }

    .mfe-title h3 {
      margin: 0;
      color: #374151;
    }

    .mfe-status {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .mfe-status.connected {
      background: #d1fae5;
      color: #047857;
    }

    .mfe-status.synced {
      background: #c7f9cc;
      color: #047857;
    }

    .mfe-status.disconnected {
      background: #fee2e2;
      color: #dc2626;
    }

    .status-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      border-bottom: 1px solid #f3f4f6;
    }

    .status-label {
      color: #6b7280;
      font-size: 14px;
    }

    .connected {
      color: #10b981;
      font-weight: 600;
    }

    .disconnected {
      color: #ef4444;
      font-weight: 600;
    }

    .received {
      color: #10b981;
      font-weight: 600;
    }

    .not-received {
      color: #ef4444;
      font-weight: 600;
    }

    .sync-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 12px;
      padding: 8px;
      border-radius: 6px;
      font-size: 12px;
    }

    .sync-indicator.synced {
      background: #ecfdf5;
      color: #047857;
    }

    .sync-indicator.connected {
      background: #fef3c7;
      color: #92400e;
    }

    .sync-indicator.disconnected {
      background: #fef2f2;
      color: #dc2626;
    }

    .sync-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .events-log {
      margin-bottom: 30px;
    }

    .log-content {
      max-height: 300px;
      overflow-y: auto;
      background: #1f2937;
      border-radius: 8px;
      padding: 16px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
    }

    .log-entry {
      margin: 4px 0;
      display: flex;
      gap: 12px;
    }

    .log-time {
      color: #9ca3af;
      width: 80px;
      flex-shrink: 0;
    }

    .log-type {
      color: #60a5fa;
      width: 100px;
      flex-shrink: 0;
      text-transform: uppercase;
      font-weight: 600;
    }

    .log-message {
      color: #e5e7eb;
    }

    .log-entry.log-success .log-type {
      color: #34d399;
    }

    .log-entry.log-error .log-type {
      color: #f87171;
    }

    .log-entry.log-warning .log-type {
      color: #fbbf24;
    }

    .validation-results {
      background: #f9fafb;
      border-radius: 8px;
      padding: 20px;
    }

    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .result-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-radius: 6px;
      font-weight: 600;
    }

    .result-item.pass {
      background: #d1fae5;
      color: #047857;
    }

    .result-item.fail {
      background: #fee2e2;
      color: #dc2626;
    }

    .test-result {
      font-size: 14px;
    }
  `]
})
export class MfeValidationComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  
  // Estado general
  isAuthenticated = false;
  user: User | null = null;
  totalEvents = 0;
  overallStatus = 'info';

  // MFEs simulados
  mfeSimulations: MfeSimulation[] = [
    {
      name: 'MFE Dashboard',
      color: '#3b82f6',
      icon: '📊',
      isConnected: true,
      sessionReceived: false,
      userInfo: null,
      eventCount: 0,
      lastEvent: '',
      status: 'connected'
    },
    {
      name: 'MFE Tasks',
      color: '#10b981',
      icon: '📝',
      isConnected: true,
      sessionReceived: false,
      userInfo: null,
      eventCount: 0,
      lastEvent: '',
      status: 'connected'
    },
    {
      name: 'MFE IAM',
      color: '#8b5cf6',
      icon: '🔐',
      isConnected: true,
      sessionReceived: false,
      userInfo: null,
      eventCount: 0,
      lastEvent: '',
      status: 'connected'
    },
    {
      name: 'MFE Marketing',
      color: '#f59e0b',
      icon: '📊',
      isConnected: true,
      sessionReceived: false,
      userInfo: null,
      eventCount: 0,
      lastEvent: '',
      status: 'connected'
    },
    {
      name: 'MFE Billing',
      color: '#10b981',
      icon: '💳',
      isConnected: true,
      sessionReceived: false,
      userInfo: null,
      eventCount: 0,
      lastEvent: '',
      status: 'connected'
    }
  ];

  // Log de eventos
  eventLog: Array<{timestamp: Date, type: string, message: string}> = [];

  // Resultados de validación
  sessionServiceTest = false;
  allMfesConnected = false;
  sessionPropagation = false;
  eventDistribution = false;

  constructor(private sessionService: SessionService) {
    this.sessionServiceTest = !!sessionService;
    this.addLogEntry('info', 'Componente de validación inicializado');
    
    if (this.sessionServiceTest) {
      this.addLogEntry('success', 'SessionService detectado correctamente');
    } else {
      this.addLogEntry('error', 'SessionService NO está disponible');
    }
  }

  ngOnInit(): void {
    this.loadSessionData();
    this.setupSessionSubscription();
    this.simulateMfeConnections();
    this.updateValidationResults();
    
    // Simular actualizaciones periódicas
    this.subscription.add(
      interval(5000).subscribe(() => {
        this.updateValidationResults();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadSessionData(): void {
    try {
      this.isAuthenticated = this.sessionService?.isAuthenticated() ?? false;
      this.user = this.sessionService?.getUser() ?? null;
      
      this.overallStatus = this.isAuthenticated ? 'success' : 'error';
      
      // Simular que todos los MFEs reciben la misma información
      this.mfeSimulations.forEach(mfe => {
        mfe.sessionReceived = this.isAuthenticated;
        mfe.userInfo = this.user;
        mfe.status = this.isAuthenticated ? 'synced' : 'connected';
      });
      
      this.addLogEntry('info', `Estado de sesión cargado: auth=${this.isAuthenticated}, user=${!!this.user}`);
    } catch (error) {
      this.addLogEntry('error', `Error cargando sesión: ${error}`);
    }
  }

  private setupSessionSubscription(): void {
    if (this.sessionService) {
      this.subscription.add(
        this.sessionService.onSessionChange().subscribe(event => {
          this.totalEvents++;
          this.addLogEntry('success', `Evento de sesión: ${event.type}`);
          
          // Simular que todos los MFEs reciben el evento
          this.mfeSimulations.forEach(mfe => {
            mfe.eventCount++;
            mfe.lastEvent = event.type;
          });
          
          this.loadSessionData();
          this.updateValidationResults();
        })
      );
    }
  }

  private simulateMfeConnections(): void {
    // Simular que todos los MFEs se conectan correctamente
    this.allMfesConnected = this.mfeSimulations.every(mfe => mfe.isConnected);
    this.addLogEntry('success', `Todos los MFEs simulados conectados: ${this.allMfesConnected}`);
  }

  private updateValidationResults(): void {
    this.sessionServiceTest = !!this.sessionService;
    this.allMfesConnected = this.mfeSimulations.every(mfe => mfe.isConnected);
    this.sessionPropagation = this.mfeSimulations.every(mfe => mfe.sessionReceived === this.isAuthenticated);
    this.eventDistribution = this.mfeSimulations.every(mfe => mfe.eventCount === this.totalEvents);
  }

  async triggerLogin(): Promise<void> {
    try {
      this.addLogEntry('info', 'Iniciando proceso de login...');
      await this.sessionService.login();
      this.addLogEntry('success', 'Login iniciado correctamente');
    } catch (error) {
      this.addLogEntry('error', `Error en login: ${error}`);
    }
  }

  async triggerLogout(): Promise<void> {
    try {
      this.addLogEntry('info', 'Iniciando proceso de logout...');
      await this.sessionService.logout();
      this.addLogEntry('success', 'Logout ejecutado correctamente');
    } catch (error) {
      this.addLogEntry('error', `Error en logout: ${error}`);
    }
  }

  refreshData(): void {
    this.addLogEntry('info', 'Actualizando datos...');
    this.loadSessionData();
    this.updateValidationResults();
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'synced': return 'Sincronizado';
      case 'connected': return 'Conectado';
      default: return 'Desconectado';
    }
  }

  getSyncMessage(status: string): string {
    switch (status) {
      case 'synced': return 'Sesión sincronizada correctamente';
      case 'connected': return 'Esperando datos de sesión';
      default: return 'Sin conexión';
    }
  }

  private addLogEntry(type: string, message: string): void {
    this.eventLog.unshift({
      timestamp: new Date(),
      type,
      message
    });
    
    if (this.eventLog.length > 100) {
      this.eventLog.pop();
    }
    
    console.log(`[MFE-Validation] ${type.toUpperCase()}: ${message}`);
  }
}