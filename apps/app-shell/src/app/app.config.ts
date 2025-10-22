import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SessionService } from '@app/session-service';

import { routes } from './app.routes';
import { authConfig } from './core/config/auth-config';
import { MSALSessionService, AUTH_CONFIG_TOKEN } from './core/services/msal-session.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    
    // Configuración de autenticación
    { provide: AUTH_CONFIG_TOKEN, useValue: authConfig },
    
    // Proveedor del SessionService usando la implementación MSAL
    { provide: SessionService, useClass: MSALSessionService }
  ]
};
