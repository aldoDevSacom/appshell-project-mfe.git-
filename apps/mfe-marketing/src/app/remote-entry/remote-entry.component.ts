import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { CardComponent, IconComponent } from '@appshell/ui';
import { SessionService, User, SessionEvent } from '@app/session-service';
import { Subscription } from 'rxjs';

interface Campaign {
  name: string;
  channel: string;
  ctr: string;
  cpa: string;
  status: 'Activa' | 'Programada' | 'Pausada';
}

@Component({
  selector: 'mfe-marketing-entry',
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

  protected readonly campaigns: Campaign[] = [
    { name: 'Lanzamiento Q3 SaaS', channel: 'LinkedIn Ads', ctr: '3.2%', cpa: '$18', status: 'Activa' },
    { name: 'Retención clientes', channel: 'Email Automation', ctr: '4.9%', cpa: '$8', status: 'Programada' },
    { name: 'Campaña SEO contenidos', channel: 'Blog + PR', ctr: '2.1%', cpa: '$12', status: 'Activa' },
    { name: 'Upsell product tour', channel: 'In-app Messages', ctr: '5.4%', cpa: '$6', status: 'Pausada' }
  ];

  constructor(private sessionService: SessionService) {
    console.log('[MFE-Marketing] Component initialized');
    this.loadSessionData();
  }

  ngOnInit(): void {
    console.log('[MFE-Marketing] OnInit - Setting up session monitoring');
    this.setupSessionSubscription();
  }

  ngOnDestroy(): void {
    console.log('[MFE-Marketing] OnDestroy - Cleaning up subscriptions');
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
      
      console.log('[MFE-Marketing] Session loaded:', {
        authenticated: this.isAuthenticated,
        user: this.user?.displayName,
        status: this.sessionStatus
      });
    } catch (error) {
      console.error('[MFE-Marketing] Error loading session:', error);
      this.sessionStatus = '⚠️ Error en sesión';
    }
  }

  private setupSessionSubscription(): void {
    if (this.sessionService) {
      this.subscription.add(
        this.sessionService.onSessionChange().subscribe((event: SessionEvent) => {
          this.eventCount++;
          console.log('[MFE-Marketing] Session event received:', event.type, event);
          this.loadSessionData();
        })
      );
    }
  }
}
