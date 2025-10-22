import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SessionService, User, SessionEvent, SessionEventType } from '@app/session-service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-info" *ngIf="isAuthenticated">
      <div class="user-avatar">
        <img 
          *ngIf="user?.profilePhoto; else initialsAvatar"
          [src]="user?.profilePhoto"
          [alt]="(user?.displayName || 'Usuario') + ' profile photo'"
          class="profile-photo"
          (error)="onImageError()"
        />
        <ng-template #initialsAvatar>
          <span class="user-initials">{{ getUserInitials() }}</span>
        </ng-template>
        
        <!-- Indicador de carga de foto -->
        <div *ngIf="isLoadingPhoto" class="loading-indicator">
          <div class="spinner"></div>
        </div>
      </div>
      <div class="user-details">
        <div class="user-name">{{ user?.displayName }}</div>
        <div class="user-email">{{ user?.email }}</div>
        <div class="user-roles" *ngIf="roles.length > 0">
          <span class="role-badge" *ngFor="let role of roles">{{ role }}</span>
        </div>
      </div>
      <button class="logout-btn" (click)="logout()" title="Cerrar sesión">
        <span class="logout-icon">🚪</span>
      </button>
    </div>
    
    <div class="login-prompt" *ngIf="!isAuthenticated">
      <button class="login-btn" (click)="login()">
        Iniciar Sesión
      </button>
    </div>
  `,
  styles: [`
    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 12px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }

    .profile-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .user-initials {
      color: white;
      font-weight: bold;
      font-size: 14px;
    }

    .loading-indicator {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #e5e7eb;
      border-top: 2px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .user-details {
      flex: 1;
      min-width: 0;
    }

    .user-name {
      font-weight: 600;
      font-size: 14px;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-email {
      font-size: 12px;
      color: #666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-roles {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
      margin-top: 4px;
    }

    .role-badge {
      background: #e3f2fd;
      color: #1976d2;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 12px;
      font-weight: 500;
    }

    .logout-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .logout-btn:hover {
      background-color: #f5f5f5;
    }

    .logout-icon {
      font-size: 16px;
    }

    .login-prompt {
      padding: 8px 12px;
    }

    .login-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.2s;
    }

    .login-btn:hover {
      transform: translateY(-1px);
    }
  `]
})
export class UserInfoComponent implements OnInit, OnDestroy {
  user: User | null = null;
  roles: string[] = [];
  isAuthenticated = false;
  isLoadingPhoto = false;
  private subscription = new Subscription();

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.updateUserInfo();
    
    // Suscribirse a cambios de sesión
    this.subscription.add(
      this.sessionService.onSessionChange().subscribe((event: SessionEvent) => {
        this.handleSessionChange(event);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateUserInfo(): void {
    this.isAuthenticated = this.sessionService.isAuthenticated();
    this.user = this.sessionService.getUser();
    this.roles = this.sessionService.getRoles();
  }

  private handleSessionChange(event: SessionEvent): void {
    switch (event.type) {
      case SessionEventType.LOGIN_SUCCESS:
        this.updateUserInfo();
        
        // Si se cargó la foto de perfil en el evento
        if (event.data?.profilePhotoLoaded) {
          this.isLoadingPhoto = false;
        } else {
          // Marcar como cargando si aún no se ha cargado la foto
          this.isLoadingPhoto = true;
        }
        break;
      
      case SessionEventType.TOKEN_REFRESHED:
        this.updateUserInfo();
        break;
      
      case SessionEventType.LOGOUT:
      case SessionEventType.SESSION_EXPIRED:
        this.isAuthenticated = false;
        this.user = null;
        this.roles = [];
        this.isLoadingPhoto = false;
        break;
    }
  }

  getUserInitials(): string {
    if (!this.user?.displayName) return '?';
    
    const names = this.user.displayName.split(' ');
    if (names.length >= 2) {
      return names[0][0].toUpperCase() + names[1][0].toUpperCase();
    }
    return names[0][0].toUpperCase();
  }

  onImageError(): void {
    console.warn('Error loading profile photo, falling back to initials');
    if (this.user) {
      this.user.profilePhoto = undefined;
    }
  }

  async login(): Promise<void> {
    try {
      await this.sessionService.login();
    } catch (error) {
      console.error('Error durante el login:', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.sessionService.logout();
    } catch (error) {
      console.error('Error durante el logout:', error);
    }
  }
}