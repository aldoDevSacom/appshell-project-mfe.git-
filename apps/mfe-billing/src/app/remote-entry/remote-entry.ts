import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@appshell/ui';
import { SessionService, User, SessionEvent } from '@app/session-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mfe-billing-entry',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './remote-entry.html',
  styleUrl: './remote-entry.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  
  // Estado de sesión
  isAuthenticated = false;
  user: User | null = null;
  sessionStatus = 'Verificando...';
  eventCount = 0;

  protected readonly invoices = [
    { id: 'INV-001', customer: 'MALLAS ORIÓN', amount: '$1,250.00', status: 'Paid', date: '2025-01-15' },
    { id: 'INV-002', customer: 'FUMICOUNTRY AMBIENTAL', amount: '$890.50', status: 'Pending', date: '2025-01-20' },
    { id: 'INV-003', customer: 'GRÚAS ECONÓMICAS DELTA', amount: '$2,100.00', status: 'Overdue', date: '2025-01-10' },
  ];

  constructor(private sessionService: SessionService) {
    console.log('[MFE-Billing] Component initialized');
    this.loadSessionData();
  }

  ngOnInit(): void {
    console.log('[MFE-Billing] OnInit - Setting up session monitoring');
    this.setupSessionSubscription();
  }

  ngOnDestroy(): void {
    console.log('[MFE-Billing] OnDestroy - Cleaning up subscriptions');
    this.subscription.unsubscribe();
  }

  private loadSessionData(): void {
    try {
      this.isAuthenticated = this.sessionService?.isAuthenticated() ?? false;
      this.user = this.sessionService?.getUser() ?? null;
      
      if (this.isAuthenticated && this.user) {
        this.sessionStatus = `✅ Sesión activa - ${this.user.displayName}`;
      } else {
        this.sessionStatus = '❌ Sin sesión activa';
      }
      
      console.log('[MFE-Billing] Session loaded:', {
        authenticated: this.isAuthenticated,
        user: this.user?.displayName,
        status: this.sessionStatus
      });
    } catch (error) {
      console.error('[MFE-Billing] Error loading session:', error);
      this.sessionStatus = '⚠️ Error en sesión';
    }
  }

  private setupSessionSubscription(): void {
    if (this.sessionService) {
      this.subscription.add(
        this.sessionService.onSessionChange().subscribe((event: SessionEvent) => {
          this.eventCount++;
          console.log('[MFE-Billing] Session event received:', event.type, event);
          this.loadSessionData();
        })
      );
    }
  }
}
