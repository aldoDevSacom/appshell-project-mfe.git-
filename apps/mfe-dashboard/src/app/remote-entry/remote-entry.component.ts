import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { DashboardLayout } from '../components/dashboard-layout/dashboard-layout';

// Importar SessionService desde la librería compartida
import { SessionService, User, SessionEvent, SessionEventType } from '@app/session-service';

@Component({
  selector: 'mfe-dashboard-entry',
  standalone: true,
  imports: [CommonModule, DashboardLayout],
  template: `
    <div class="mfe-dashboard-container">
      <!-- Indicador de estado de sesión -->
      <div class="session-indicator" [ngClass]="sessionStatusClass">
        <div class="session-info">
          <span class="status-icon">{{ sessionIcon }}</span>
          <span class="status-text">{{ sessionStatusText }}</span>
          <span *ngIf="user" class="user-name">{{ user.displayName }}</span>
        </div>
      </div>

      <!-- Contenido principal del dashboard -->
      <app-dashboard-layout></app-dashboard-layout>
    </div>
  `,
  styles: [`
    .mfe-dashboard-container {
      position: relative;
    }

    .session-indicator {
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 1000;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .session-indicator.authenticated {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }

    .session-indicator.not-authenticated {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: white;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    }

    .session-indicator.loading {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: white;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }

    .session-info {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-icon {
      font-size: 14px;
    }

    .user-name {
      margin-left: 4px;
      opacity: 0.9;
    }

    .debug-panel {
      position: fixed;
      bottom: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 12px;
      border-radius: 8px;
      font-size: 11px;
      max-width: 300px;
      z-index: 999;
    }

    .debug-panel h4 {
      margin: 0 0 8px 0;
      color: #60a5fa;
    }

    .debug-panel p {
      margin: 4px 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent implements OnInit, OnDestroy {
  // Inyectar SessionService
  private sessionService = inject(SessionService);
  private subscription = new Subscription();

  // Estado del componente
  isAuthenticated = false;
  user: User | null = null;
  roles: string[] = [];
  hasToken = false;
  eventCount = 0;
  showDebug = true; // Cambiar a false en producción

  // Propiedades computadas para la UI
  get sessionStatusClass(): string {
    if (!this.isAuthenticated) return 'not-authenticated';
    if (this.user) return 'authenticated';
    return 'loading';
  }

  get sessionIcon(): string {
    if (!this.isAuthenticated) return '🔒';
    if (this.user) return '✅';
    return '⏳';
  }

  get sessionStatusText(): string {
    if (!this.isAuthenticated) return 'No autenticado';
    if (this.user) return 'Sesión activa';
    return 'Cargando...';
  }

  ngOnInit(): void {
    console.log('🏗️ MFE Dashboard: Inicializando con SessionService compartido');
    
    // Verificar que el SessionService esté disponible
    if (!this.sessionService) {
      console.error('❌ MFE Dashboard: SessionService no está disponible!');
      return;
    }

    console.log('✅ MFE Dashboard: SessionService detectado, configurando suscripciones...');
    
    // Cargar estado inicial
    this.loadSessionState();
    
    // Suscribirse a cambios de sesión
    this.subscribeToSessionChanges();
  }

  ngOnDestroy(): void {
    console.log('🧹 MFE Dashboard: Limpiando suscripciones');
    this.subscription.unsubscribe();
  }

  private loadSessionState(): void {
    try {
      this.isAuthenticated = this.sessionService.isAuthenticated();
      this.user = this.sessionService.getUser();
      this.roles = this.sessionService.getRoles();
      this.hasToken = !!this.sessionService.getToken();

      console.log('📊 MFE Dashboard: Estado de sesión cargado', {
        isAuthenticated: this.isAuthenticated,
        user: this.user?.displayName,
        roles: this.roles,
        hasToken: this.hasToken
      });
    } catch (error) {
      console.error('❌ MFE Dashboard: Error al cargar estado de sesión', error);
    }
  }

  private subscribeToSessionChanges(): void {
    this.subscription.add(
      this.sessionService.onSessionChange().subscribe(event => {
        this.eventCount++;
        console.log('🔔 MFE Dashboard: Evento de sesión recibido', event);
        
        switch (event.type) {
          case SessionEventType.LOGIN_SUCCESS:
            console.log('✅ MFE Dashboard: Login exitoso detectado');
            this.loadSessionState();
            break;
            
          case SessionEventType.LOGOUT:
            console.log('🚪 MFE Dashboard: Logout detectado');
            this.clearSessionState();
            break;
            
          case SessionEventType.TOKEN_REFRESHED:
            console.log('🔄 MFE Dashboard: Token renovado');
            this.loadSessionState();
            break;
            
          case SessionEventType.SESSION_EXPIRED:
            console.log('⏰ MFE Dashboard: Sesión expirada');
            this.clearSessionState();
            break;
            
          case SessionEventType.USER_SWITCHED:
            console.log('👤 MFE Dashboard: Usuario cambiado');
            this.loadSessionState();
            break;
        }
      })
    );
  }

  private clearSessionState(): void {
    this.isAuthenticated = false;
    this.user = null;
    this.roles = [];
    this.hasToken = false;
  }
}
