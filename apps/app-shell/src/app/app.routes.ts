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

const baseChildRoutes = remoteModules.map((item) => {
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

// Para ciertos remotos (p.ej. prodapps) necesitamos capturar rutas hijas arbitrarias (/prodapps/frame/task-list/:id).
// Agregamos un wildcard interno que apunte al mismo remote.
const prodappsMatcher = (prefix: string) => (segments: any[]) => {
  if (segments.length < 3) return null;
  if (segments[0].path !== prefix) return null;

  const isTaskList = segments[1]?.path === 'frame' && segments[2]?.path === 'task-list';
  const tokenSegment = segments[3];

  if (isTaskList && tokenSegment) {
    return {
      consumed: segments,
      posParams: { id: tokenSegment }
    };
  }

  // Fallback: consume todo bajo el prefijo para otras rutas del remote
  return { consumed: segments };
};

const childRoutes = [
  ...baseChildRoutes,
  {
    matcher: prodappsMatcher('prodapps'),
    loadComponent: ROUTE_COMPONENT,
    data: {
      moduleId: 'prodapps',
      remoteName: 'mfe-prodapps',
      title: 'Gestión de Tareas',
      icon: 'task_alt'
    }
  },
  {
    matcher: prodappsMatcher('frame'),
    loadComponent: ROUTE_COMPONENT,
    data: {
      moduleId: 'prodapps',
      remoteName: 'mfe-prodapps',
      title: 'Gestión de Tareas',
      icon: 'task_alt'
    }
  }
];

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
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/unauthorized/unauthorized.component').then((m) => m.UnauthorizedComponent),
    data: {
      title: 'Token inválido'
    }
  },
  {
    path: 'access-denied',
    loadComponent: () =>
      import('./features/access-denied/access-denied.component').then((m) => m.AccessDeniedComponent),
    data: {
      title: 'Acceso denegado'
    }
  },
  { path: '**', redirectTo: defaultPath }
];
