# FASE 1: ANÁLISIS COMPLETO - MIGRACIÓN PRODAPPS A MFE

## RESUMEN EJECUTIVO

### Compatibilidad de Versiones ✅
**AppShell y SI-B-PRODAPPSFRONT-2025 tienen PERFECTA compatibilidad de versiones Angular:**

| Dependencia | AppShell | ProdApps | Compatibilidad |
|-------------|----------|----------|----------------|
| Angular Core | ^19.2.15 | ^19.2.15 | ✅ IDÉNTICA |
| Angular Common | ^19.2.15 | ^19.2.15 | ✅ IDÉNTICA |
| Angular Router | ^19.2.15 | ^19.2.15 | ✅ IDÉNTICA |
| RxJS | ~7.8.0 | ^7.8.2 | ✅ COMPATIBLE |
| Zone.js | ~0.15.0 | ^0.15.1 | ✅ COMPATIBLE |
| TypeScript | ~5.8.0 | ^5.4.5 | ⚠️ DIFERENTE (pero compatible) |

**Conclusión**: Excelente compatibilidad. No se requieren ajustes de versiones.

---

## 1. ARQUITECTURA DEL APPSHELL

### 1.1 Sistema de Module Federation
**Tecnología**: `@angular-architects/native-federation` v19.0.23

El AppShell usa **Native Federation** (evolución de Webpack Module Federation para Angular):
- Builder: `@angular-architects/native-federation:build`
- Configuración por archivo: `federation.config.js`
- Sistema de carga dinámica de remotes

### 1.2 MFEs Existentes en AppShell
```
apps/
├── app-shell/          → Puerto 4200 (Shell principal)
├── mfe-dashboard/      → Puerto 4201
├── mfe-tasks/          → Puerto 4202
├── mfe-iam/            → Puerto 4203
├── mfe-marketing/      → Puerto 4204
└── mfe-billing/        → Puerto 4205
```

**Puerto asignado para mfe-prodapps**: `4206`

### 1.3 Patrón de Registro de MFEs

Los MFEs se registran en [apps/app-shell/src/app/shared/constants/module-catalog.ts](apps/app-shell/src/app/shared/constants/module-catalog.ts):

```typescript
{
  id: 'tasks',                      // ID único
  label: 'Lista de tareas',         // Label para menú
  icon: 'tasks',                    // Material icon
  kind: 'route',                    // 'route' o 'action'
  category: 'workflow',             // Categoría del menú
  route: '/tasks',                  // Ruta en el Shell
  remoteName: 'mfe-tasks',          // Nombre del remote
  requiredClaim: 'module:tasks'     // Claim de seguridad (opcional)
}
```

### 1.4 Carga Dinámica de MFEs

**RemoteContainerComponent** ([apps/app-shell/src/app/features/remote/remote-container.component.ts](apps/app-shell/src/app/features/remote/remote-container.component.ts:50-66)):
- Usa `loadRemoteModule(remoteName, './Component')`
- Busca `RemoteEntryComponent` o export default
- Renderiza el componente con `NgComponentOutlet`

---

## 2. DEPENDENCIAS COMPARTIDAS

### 2.1 Configuración de Shared en AppShell

[apps/app-shell/federation.config.js](apps/app-shell/federation.config.js):
```javascript
shared: {
  ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),

  '@app/session-service': { singleton: true, eager: true, strictVersion: true },
  'rxjs': { singleton: true, eager: false, strictVersion: true },
  '@azure/msal-browser': { singleton: true, eager: true, strictVersion: true },
  '@azure/msal-angular': { singleton: true, eager: true, strictVersion: true }
}
```

### 2.2 Dependencias Exclusivas de ProdApps (NO en AppShell)

Estas dependencias necesitarán incluirse en el MFE:
- `@angular/material` (^19.2.19) - **CRÍTICO**: Material Design no está en el Shell
- `@angular/cdk` (^19.2.19) - **CRÍTICO**: CDK no está en el Shell
- `class-transformer` (^0.5.1)
- `sweetalert2` (^11.12.4)
- `tailwindcss` (^3.3.5) - También está en el Shell (^3.4.15)

**Decisión**: Material y CDK NO se compartirán desde el Shell. ProdApps los cargará independientemente.

---

## 3. SERVICIOS Y ESTADO COMPARTIDO

### 3.1 Servicios en AppShell

El AppShell comparte un servicio crítico:
- **`@app/session-service`**: Servicio de sesión compartido (singleton, eager)
- **MSAL Services**: Autenticación Azure AD

### 3.2 Servicios en ProdApps (a migrar)

**Servicios críticos** ([/prod-apps/src/app/services/]()):
1. **AuthService** - Autenticación con tokens OAuth
   - Método: `getToken(token)`
   - Almacena en localStorage: `bridge_context`, `sys_bridge`

2. **TaskService** - API de tareas
   - Base URL: Configurable por environment
   - Autenticación: Basic Auth headers

3. **TaskStateService** - Estado simple con BehaviorSubject
   - Almacena: `taskId`

4. **OperatorService, DynamicsFieldsService, PaginationService, AlertService**

### 3.3 Estrategia de Integración

**OPCIÓN A (Recomendada)**: Mantener servicios en ProdApps MFE
- AuthService, TaskService, etc. permanecen en el MFE
- Configurados como `providedIn: 'root'` dentro del MFE
- No se comparten con otros MFEs

**OPCIÓN B**: Integrar con SessionService del Shell
- Usar `@app/session-service` para autenticación global
- Refactorizar AuthService para delegar al Shell
- **NO RECOMENDADO inicialmente** (más complejo)

**Decisión**: Opción A - Mantener servicios independientes en el MFE.

---

## 4. PLANIFICACIÓN DE RUTAS

### 4.1 Rutas Actuales en ProdApps

```
/task-list
/task-details/:taskId
/login
/unauthorized
/frame/task-list/:id         (iframe mode)
/frame/task-details/:taskId  (iframe mode)
```

### 4.2 Rutas en AppShell para ProdApps MFE

**Prefijo propuesto**: `/prodapps`

```
/prodapps/task-list
/prodapps/task-details/:taskId
/prodapps/login
/prodapps/unauthorized
```

**Rutas iframe**: ELIMINAR (ya no necesarias en contexto MFE)

### 4.3 Entrada en MODULE_CATALOG

```typescript
{
  id: 'prodapps',
  label: 'Gestión de Tareas',
  icon: 'task_alt',
  kind: 'route',
  category: 'workflow',
  route: '/prodapps',
  remoteName: 'mfe-prodapps',
  requiredClaim: 'module:prodapps'  // Opcional
}
```

---

## 5. LAYOUT Y UI

### 5.1 Layouts en ProdApps

**MainLayoutComponent**: Layout con sidebar + header + content
**IframeLayoutComponent**: Layout para modo iframe

### 5.2 Decisión de Layout

**OPCIÓN A**: Usar ShellLayoutComponent del AppShell
- El MFE solo expone las vistas (TaskList, TaskDetail)
- Sidebar y header del Shell

**OPCIÓN B**: MFE mantiene su propio layout
- Más autonomía
- Posible duplicación de UI

**Decisión**: Opción A - Usar layout del Shell, eliminar layouts del MFE.

### 5.3 Estilos

**AppShell**: Tailwind CSS v3.4.15
**ProdApps**: Tailwind CSS v3.3.5 + Material Design (indigo-pink theme)

**Estrategia**:
- Tailwind se compartirá desde el Shell
- Material Theme se cargará en el MFE (no está en el Shell)

---

## 6. SERVER-SIDE RENDERING (SSR)

### 6.1 Estado Actual

**ProdApps**: SSR habilitado con Express
- `@angular/ssr` v19.2.15
- `@angular/platform-server` v19.2.15
- `server.ts` con Express

**AppShell**: NO usa SSR (CSR puro)

### 6.2 Decisión

**ELIMINAR SSR de ProdApps**:
- Los MFEs remotos NO soportan SSR en Native Federation
- Eliminar configuración SSR de angular.json
- Remover server.ts
- Remover dependencias: `@angular/ssr`, `@angular/platform-server`, `express`

---

## 7. ENVIRONMENT VARIABLES

### 7.1 Variables en ProdApps

[/prod-apps/src/environments/environment.ts]():
```typescript
API_URI: 'http://10.34.7.172:8087/api/v1/'
API_USER: 'dev_frontend_user'
API_PASSWORD: 'ap1Fr0nt3nd_2025'
REFRESH_PAGE: 60000
URL_PARENT_APP: 'http://localhost:5500/task-details'
IN_IFRAME: false
URL_FORMS: 'https://test-wfm-forms.seccionamarilla.com.mx/'
```

### 7.2 Ajustes Necesarios

- **IN_IFRAME**: Eliminar (ya no relevante)
- **URL_PARENT_APP**: Eliminar (no hay parent en MFE)
- Resto de variables: Mantener

---

## 8. RESUMEN DE CAMBIOS REQUERIDOS

### 8.1 En SI-B-PRODAPPSFRONT-2025 (ProdApps)

1. ✅ Instalar `@angular-architects/native-federation`
2. ✅ Crear `federation.config.js`
3. ✅ Actualizar `angular.json` con builder de Native Federation
4. ✅ Crear componente de entrada (RemoteEntryComponent)
5. ✅ Eliminar SSR (angular.json, server.ts, dependencias)
6. ✅ Ajustar rutas (remover prefijos, eliminar rutas iframe)
7. ✅ Eliminar layouts (usar layout del Shell)
8. ✅ Limpiar environment variables

### 8.2 En AppShell

1. ✅ Agregar entrada en `federation.manifest.json`
2. ✅ Agregar entrada en `module-catalog.ts`
3. ✅ Configurar puerto 4206 para mfe-prodapps

---

## 9. PRÓXIMOS PASOS

### FASE 2: Configuración del Entorno
- [ ] Crear backup de ProdApps
- [ ] Instalar @angular-architects/native-federation en ProdApps
- [ ] Configurar federation.config.js
- [ ] Actualizar angular.json

### FASE 3: Transformación a MFE
- [ ] Crear RemoteEntryComponent
- [ ] Configurar exposes en federation.config.js
- [ ] Eliminar SSR
- [ ] Ajustar rutas

---

**Fecha**: 2025-11-19
**Estado**: FASE 1 COMPLETADA ✅
**Siguiente fase**: FASE 2 - Configuración del Entorno
