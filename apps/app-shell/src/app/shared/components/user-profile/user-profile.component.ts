import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService, User, SessionEvent, SessionEventType } from '@app/session-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-profile" *ngIf="user">
      <div class="profile-header">
        <div class="profile-photo-container">
          <img 
            *ngIf="user.profilePhoto; else defaultAvatar"
            [src]="user.profilePhoto" 
            [alt]="user.displayName + ' profile photo'"
            class="profile-photo"
            (error)="onImageError()"
          />
          <ng-template #defaultAvatar>
            <div class="default-avatar">
              <span class="avatar-initials">{{ getInitials(user.displayName) }}</span>
            </div>
          </ng-template>
          
          <!-- Indicador de carga -->
          <div *ngIf="isLoadingPhoto" class="loading-indicator">
            <div class="spinner"></div>
          </div>
        </div>
        
        <div class="profile-info">
          <h2 class="user-name">{{ user.displayName }}</h2>
          <p class="user-email">{{ user.email }}</p>
          <p class="user-title" *ngIf="user.jobTitle">{{ user.jobTitle }}</p>
          <p class="user-location" *ngIf="user.officeLocation">{{ user.officeLocation }}</p>
        </div>
        
        <button 
          class="refresh-photo-btn"
          (click)="refreshProfilePhoto()"
          [disabled]="isLoadingPhoto"
          title="Actualizar foto de perfil"
        >
          <span class="refresh-icon">🔄</span>
        </button>
      </div>
      
      <!-- Información adicional del usuario -->
      <div class="user-details">
        <div class="detail-item" *ngIf="user.givenName">
          <strong>Nombre:</strong> {{ user.givenName }}
        </div>
        <div class="detail-item" *ngIf="user.familyName">
          <strong>Apellido:</strong> {{ user.familyName }}
        </div>
        <div class="detail-item" *ngIf="user.roles.length > 0">
          <strong>Roles:</strong> {{ user.roles.join(', ') }}
        </div>
        <div class="detail-item" *ngIf="user.preferredLanguage">
          <strong>Idioma preferido:</strong> {{ user.preferredLanguage }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  isLoadingPhoto = false;
  private sessionSubscription?: Subscription;

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    // Obtener usuario actual
    this.user = this.sessionService.getUser();
    
    // Suscribirse a cambios de sesión
    this.sessionSubscription = this.sessionService.onSessionChange().subscribe(
      (event: SessionEvent) => {
        this.handleSessionEvent(event);
      }
    );
  }

  ngOnDestroy(): void {
    this.sessionSubscription?.unsubscribe();
  }

  /**
   * Maneja eventos de sesión
   */
  private handleSessionEvent(event: SessionEvent): void {
    switch (event.type) {
      case SessionEventType.LOGIN_SUCCESS:
        this.user = this.sessionService.getUser();
        
        // Si se cargó la foto de perfil en el evento
        if (event.data?.profilePhotoLoaded) {
          this.isLoadingPhoto = false;
        }
        break;
        
      case SessionEventType.LOGOUT:
        this.user = null;
        this.isLoadingPhoto = false;
        break;
    }
  }

  /**
   * Obtiene las iniciales del nombre del usuario
   */
  getInitials(name: string): string {
    if (!name) return '?';
    
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  }

  /**
   * Maneja errores de carga de imagen
   */
  onImageError(): void {
    console.warn('Error loading profile photo, falling back to default avatar');
    if (this.user) {
      this.user.profilePhoto = undefined;
    }
  }

  /**
   * Actualiza la foto de perfil
   */
  async refreshProfilePhoto(): Promise<void> {
    if (!this.user || this.isLoadingPhoto) return;

    this.isLoadingPhoto = true;
    
    try {
      // Si el servicio tiene el método refreshUserProfilePhoto
      if ('refreshUserProfilePhoto' in this.sessionService) {
        await (this.sessionService as any).refreshUserProfilePhoto();
      }
      
      // Actualizar el usuario después de la carga
      this.user = this.sessionService.getUser();
    } catch (error) {
      console.error('Error refreshing profile photo:', error);
    } finally {
      this.isLoadingPhoto = false;
    }
  }
}