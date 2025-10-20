import { Routes } from '@angular/router';

import { MODULE_CATALOG } from './shared/constants/module-catalog';
import { ShellLayoutComponent } from './layout/components/shell-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const ROUTE_COMPONENT = () =>
  import('./features/remote/remote-container.component').then((m) => m.RemoteContainerComponent);

const LOGIN_TEST_COMPONENT = () =>
  import('./features/auth/login-test.component').then((m) => m.LoginTestComponent);

const SESSION_TEST_COMPONENT = () =>
  import('./features/auth/session-test.component').then((m) => m.SessionTestComponent);

const MFE_VALIDATION_COMPONENT = () =>
  import('./features/auth/mfe-validation.component').then((m) => m.MfeValidationComponent);

const remoteModules = MODULE_CATALOG.filter((item) => item.kind === 'route' && item.remoteName);

const childRoutes = remoteModules.map((item) => {
  const path = item.route?.replace(/^\//, '') ?? item.id;
  
  // Configurar guards según los requisitos del módulo
  const guards: any[] = [];
  
  // TEMPORALMENTE DESHABILITAMOS LOS GUARDS PARA TESTING
  // Si el módulo requiere autenticación (tiene requiredClaim), añadir AuthGuard
  // if (item.requiredClaim) {
  //   guards.push(AuthGuard, RoleGuard);
  // } else {
  //   // Para módulos públicos como dashboard, solo verificar autenticación sin roles
  //   guards.push(AuthGuard);
  // }
  
  return {
    path,
    loadComponent: ROUTE_COMPONENT,
    canActivate: guards,
    data: {
      moduleId: item.id,
      remoteName: item.remoteName,
      title: item.label,
      icon: item.icon,
      requiredClaim: item.requiredClaim
    }
  };
});

const defaultPath = 'login-test'; // childRoutes[0]?.path ?? 'dashboard';

export const routes: Routes = [
  // Ruta de prueba de login (SIN guards)
  {
    path: 'login-test',
    loadComponent: LOGIN_TEST_COMPONENT
  },
  // Ruta de prueba de sesión compartida
  {
    path: 'session-test',
    loadComponent: SESSION_TEST_COMPONENT
  },
  // Ruta de validación completa de MFEs
  {
    path: 'mfe-validation',
    loadComponent: MFE_VALIDATION_COMPONENT
  },
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: defaultPath },
      ...childRoutes
    ]
  },
  { path: '**', redirectTo: defaultPath }
];
