import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { CardComponent, IconComponent } from '@appshell/ui';
import { SessionService, User, SessionEvent } from '@app/session-service';
import { Subscription } from 'rxjs';

interface Member {
  name: string;
  email: string;
  role: string;
  status: 'Activo' | 'Invitado' | 'Suspendido';
}

@Component({
  selector: 'mfe-iam-entry',
  standalone: true,
  imports: [NgFor, CommonModule, CardComponent, IconComponent],
  templateUrl: './remote-entry.component.html',
  styleUrls: ['./remote-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  
  // Estado de sesión
  isAuthenticated = false;
  user: User | null = null;
  sessionStatus = 'Verificando...';
  eventCount = 0;
  userRoles: string[] = [];

  protected readonly members: Member[] = [
    { name: 'Sandra Páez', email: 'sandra.paez@example.com', role: 'Administrador', status: 'Activo' },
    { name: 'Marco Cárdenas', email: 'marco.cardenas@example.com', role: 'Auditor', status: 'Activo' },
    { name: 'Ingrid Flores', email: 'ingrid.flores@example.com', role: 'Soporte', status: 'Invitado' },
    { name: 'David Pino', email: 'david.pino@example.com', role: 'Marketing', status: 'Activo' }
  ];

  constructor(private sessionService: SessionService) {
    console.log('[MFE-IAM] Component initialized');
    this.loadSessionData();
  }

  ngOnInit(): void {
    console.log('[MFE-IAM] OnInit - Setting up session monitoring');
    this.setupSessionSubscription();
  }

  ngOnDestroy(): void {
    console.log('[MFE-IAM] OnDestroy - Cleaning up subscriptions');
    this.subscription.unsubscribe();
  }

  private loadSessionData(): void {
    try {
      this.isAuthenticated = this.sessionService?.isAuthenticated() ?? false;
      this.user = this.sessionService?.getUser() ?? null;
      this.userRoles = this.sessionService?.getRoles() ?? [];
      
      if (this.isAuthenticated && this.user) {
        this.sessionStatus = `✅ Sesión activa - ${this.user.displayName}`;
      } else {
        this.sessionStatus = '❌ Sin sesión activa';
      }
      
      console.log('[MFE-IAM] Session loaded:', {
        authenticated: this.isAuthenticated,
        user: this.user?.displayName,
        roles: this.userRoles,
        status: this.sessionStatus
      });
    } catch (error) {
      console.error('[MFE-IAM] Error loading session:', error);
      this.sessionStatus = '⚠️ Error en sesión';
    }
  }

  private setupSessionSubscription(): void {
    if (this.sessionService) {
      this.subscription.add(
        this.sessionService.onSessionChange().subscribe((event: SessionEvent) => {
          this.eventCount++;
          console.log('[MFE-IAM] Session event received:', event.type, event);
          this.loadSessionData();
        })
      );
    }
  }
}
