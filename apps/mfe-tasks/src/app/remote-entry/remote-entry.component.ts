import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { NgClass, NgFor, CommonModule } from '@angular/common';
import { CardComponent, IconComponent } from '@appshell/ui';
import { SessionService, User, SessionEvent } from '@app/session-service';
import { Subscription } from 'rxjs';

type TaskStatus = 'Pendiente' | 'En progreso' | 'Completada';

interface TaskItem {
  title: string;
  assignee: string;
  status: TaskStatus;
  due: string;
}

@Component({
  selector: 'mfe-tasks-entry',
  standalone: true,
  imports: [NgClass, NgFor, CommonModule, CardComponent, IconComponent],
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
  protected readonly tasks: TaskItem[] = [
    { title: 'Diseñar wireframes de onboarding', assignee: 'Patricia Gómez', status: 'En progreso', due: '23 AGO' },
    { title: 'Publicar campaña SEM', assignee: 'Luis Rodríguez', status: 'Pendiente', due: '21 AGO' },
    { title: 'Actualizar políticas IAM', assignee: 'Fernanda Ruiz', status: 'Completada', due: '18 AGO' },
    { title: 'Analizar churn mensual', assignee: 'Iván Torres', status: 'En progreso', due: '26 AGO' }
  ];

  constructor(private sessionService: SessionService) {
    console.log('[MFE-Tasks] Component initialized');
    this.loadSessionData();
  }

  ngOnInit(): void {
    console.log('[MFE-Tasks] OnInit - Setting up session monitoring');
    this.setupSessionSubscription();
  }

  ngOnDestroy(): void {
    console.log('[MFE-Tasks] OnDestroy - Cleaning up subscriptions');
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
      
      console.log('[MFE-Tasks] Session loaded:', {
        authenticated: this.isAuthenticated,
        user: this.user?.displayName,
        status: this.sessionStatus
      });
    } catch (error) {
      console.error('[MFE-Tasks] Error loading session:', error);
      this.sessionStatus = '⚠️ Error en sesión';
    }
  }

  private setupSessionSubscription(): void {
    if (this.sessionService) {
      this.subscription.add(
        this.sessionService.onSessionChange().subscribe((event: SessionEvent) => {
          this.eventCount++;
          console.log('[MFE-Tasks] Session event received:', event.type, event);
          this.loadSessionData();
        })
      );
    }
  }

  initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  statusClass(status: TaskStatus): string {
    switch (status) {
      case 'Completada':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200';
      case 'En progreso':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200';
    }
  }

  statusIcon(status: TaskStatus): string {
    switch (status) {
      case 'Completada':
        return 'check_circle';
      case 'En progreso':
        return 'hourglass_top';
      default:
        return 'radio_button_unchecked';
    }
  }
}
