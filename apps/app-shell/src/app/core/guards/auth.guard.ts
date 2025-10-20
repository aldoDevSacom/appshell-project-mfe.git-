import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SessionService } from '@app/session-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication();
  }

  private async checkAuthentication(): Promise<boolean | UrlTree> {
    if (this.sessionService.isAuthenticated()) {
      return true;
    } else {
      try {
        // Si no está autenticado, iniciar el proceso de login
        console.log('User not authenticated, starting login process...');
        await this.sessionService.login();
        return false; // La redirección manejará la navegación
      } catch (error) {
        console.error('Error during authentication:', error);
        // En caso de error, podrías redirigir a una página de error
        return false;
      }
    }
  }
}