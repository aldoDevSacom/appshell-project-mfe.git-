import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { SessionService } from '@app/session-service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private sessionService: SessionService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredClaim = route.data['requiredClaim'];
    
    if (!requiredClaim) {
      return true; // Si no se especifica claim, permitir acceso
    }
    
    if (!this.sessionService.isAuthenticated()) {
      return false;
    }

    const userRoles = this.sessionService.getRoles();
    
    // Verificar si el usuario tiene el claim/rol requerido
    return userRoles.includes(requiredClaim);
  }
}