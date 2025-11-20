# Workspace Schema – AppShell-DevSacom

## Toolchain y dependencias base
- Angular CLI/Build `^20.3.3`, Angular core `^20.3.0`, TypeScript `~5.9.2`
- Module Federation nativa vía `@angular-architects/native-federation` `^20.1.6` con `esbuild`
- Librerías clave: `@azure/msal-browser`, `@azure/msal-angular`, `rxjs ~7.8`, `zone.js ~0.15`
- Styling: TailwindCSS `^3.4.15` + PostCSS (`tailwind.config.js`, `postcss.config.cjs`)
- Scripts npm (`package.json`) para servir/compilar cada micro y el shell (`ng serve/build <project>`)

## Estructura del workspace
- `apps/app-shell`: Host que orquesta navegación, autenticación y carga remota.
- `apps/mfe-<domain>`: Microfrontends dashboard, tasks, iam, marketing y billing.
- `libs/session-service`: Contrato compartido para sesión/autenticación, expuesto como singleton federado.
- `libs/ui`: Componentes UI standalone (card, icon, button, skeleton) reutilizados en shell y remotos.
- Configuración centralizada en `angular.json`, `tsconfig.json` (paths `@appshell/ui`, `@app/session-service`).

## App Shell (Host)
- **Bootstrap**: `apps/app-shell/src/main.ts` inicializa federation con `environment.remotes` antes de `bootstrapApplication`.
- **Config standalone**: `app.config.ts` provee router, HTTP y enlaza `SessionService` → `MSALSessionService` (`core/services/msal-session.service.ts`) usando `AUTH_CONFIG_TOKEN` (`core/config/auth-config.ts`).
- **Ruteo dinámico**: `app.routes.ts` arma rutas hijas a partir de `MODULE_CATALOG` (`shared/constants/module-catalog.ts`) y carga `RemoteContainerComponent` (`features/remote/remote-container.component.ts`) que realiza `loadRemoteModule(remoteName, './Component')`.
- **Guards**: `AuthGuard` y `RoleGuard` (`core/guards`) preparados para activar `sessionService.login()` y filtrar por claims; están comentados en `app.routes.ts` para pruebas.
- **Layout**: `layout/components` (header, sidebar, shell-layout) consumen `AppStateService` (`core/services/app-state.service.ts`) que traduce `MODULE_CATALOG` → secciones del menú según claims simulados por `AuthService`.
- **Estado/autenticación**:
  - `AuthService` genera un JWT simulado (almacenado en `localStorage`) para habilitar claims en modo prueba.
  - `MSALSessionService` implementa el contrato de `SessionService` consumiendo MSAL + Microsoft Graph (`GraphApiService`) para usuario real, foto y roles.
- **Entornos**: `environment(.development).ts` define endpoints `remoteEntry.json` por micro (puertos 4300–4304). Se permite override vía `globalThis.__appShellRemotes__`.
- **Construcción**: Arquitectura `@angular-architects/native-federation:build` que apunta a target secundario `:esbuild`. `serve-original` usa `@angular/build:dev-server` en puerto 4200.

## Microfrontends
Cada micro usa componentes standalone, arranca con `initFederation()` sin remotos adicionales y expone `RemoteEntryComponent` como `./Component`.

| Proyecto | Remote name | Exposed file | Puerto dev (`serve-original`) | Descripción principal |
|----------|-------------|--------------|-------------------------------|-----------------------|
| `mfe-dashboard` | `mfe-dashboard` | `apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.ts` | 4300 | Dashboard con `DashboardLayout`, monitoriza eventos de `SessionService`, muestra estado de sesión MSAL. |
| `mfe-tasks` | `mfe-tasks` | `apps/mfe-tasks/src/app/remote-entry/remote-entry.component.ts` | 4301 | Lista de tareas con badges dinámicas; escucha `SessionService.onSessionChange()` para refrescar encabezado. |
| `mfe-iam` | `mfe-iam` | `apps/mfe-iam/src/app/remote-entry/remote-entry.component.ts` | 4302 | Gestión IAM (tabla de miembros) reflejando roles y eventos de sesión. |
| `mfe-marketing` | `mfe-marketing` | `apps/mfe-marketing/src/app/remote-entry/remote-entry.component.ts` | 4303 | Panel de campañas de marketing con cards y estado de sesión compartido. |
| `mfe-billing` | `mfe-billing` | `apps/mfe-billing/src/app/remote-entry/remote-entry.ts` | 4304 | Vista de facturación (use `CardComponent`), mismo patrón de suscripción a sesión. |

Aspectos comunes:
- `app.config.ts` provee router simple (`path: '' → RemoteEntryComponent`).
- Importan `SessionService` desde `@app/session-service`; dependen de que el host provea la implementación concreta vía federation (en modo standalone requerirá un stub provider equivalente).
- Comparten UI (`@appshell/ui`) y estilos Tailwind.
- `federation.config.js` de cada micro comparte `@app/session-service` y `rxjs` en modo singleton (estricto, `requiredVersion: 'auto'`).

## Librerías compartidas
- **Session Service (`libs/session-service`)**:
  - `SessionService` clase abstracta con API para usuario, roles, token, claims y eventos (`SessionEvent`, `SessionEventType`).
  - Modelos `User`, `SessionEvent`, `AuthConfig` para tipar la información intercambiada entre host y remotos.
  - Exposición vía `public-api.ts` para consumo federado; el host aporta `MSALSessionService`.
- **UI (`libs/ui`)**:
  - Componentes standalone: `CardComponent`, `IconComponent`, `ButtonComponent`, `SkeletonComponent`.
  - Diseñados para reuso en shell y microfrontends, con estilos compatibles con Tailwind (clases utilitarias en templates).

## Flujo de sesión compartida
1. `app-shell` inicializa `MSALSessionService` y lo comparte como singleton (`federation.config.js`).
2. Cada micro importa `SessionService` (contrato) y, al montarse, llama métodos como `isAuthenticated`, `getUser`, `onSessionChange`.
3. `MSALSessionService` emite eventos (`SessionEventType.LOGIN_SUCCESS`, `LOGOUT`, etc.) que los remotos escuchan para actualizar UI en tiempo real.
4. La autorización local (menú, guards) usa claims simulados por `AuthService` hasta integrar completamente MSAL + Graph.

## Configuración adicional
- **Tailwind**: `tailwind.config.js` escanea `./apps/**/*.{html,ts}` y define tema (colores `primary`, `accent`, `surface`, tipografía `system-ui`). `darkMode` por clase.
- **PostCSS**: `postcss.config.cjs` aplica Tailwind + Autoprefixer.
- **Testing**: Cada app tiene `ng test <project>` apuntando a `@angular/build:karma` con `zone.js/testing`. Lib UI incluye `ui.spec.ts`.
- **Build budgets**: En modo producción se aplican budgets (`initial 500kB warning/1MB error`, `anyComponentStyle 4/8kB`).

## Consideraciones para replicar en Angular 19
1. **Compatibilidad de federation**: Usar la versión de `@angular-architects/native-federation` soportada para Angular 19 y ajustar configuración de builder si cambian opciones de `@angular/build`.
2. **APIs standalone**: Mantener `bootstrapApplication`, `ApplicationConfig` y rutas standalone introducidas en Angular 14+ (vigentes en 19). Verificar flags `provideZoneChangeDetection` y `provideBrowserGlobalErrorListeners`.
3. **SessionService**: Reutilizar el contrato exacto; asegurar que el host Angular 19 exponga la implementación como singleton compartido y que los remotos comparten la misma versión del paquete.
4. **MSAL + Graph**: Confirmar que dependencias `@azure/msal-angular`/`@azure/msal-browser` soporten Angular 19 (probado desde Angular 15+). Ajustar `AuthConfig` con IDs/URIs reales.
5. **Styling y tooling**: Tailwind/PostCSS funcionan sin cambios, pero validar que configuración de `content` cubra nuevas rutas/templates.
6. **Ports y manifests**: Replicar `environment.remotes` y puertos 4300–4304 (o personalizarlos) para la federación durante el desarrollo.

Esta radiografía cubre los elementos necesarios para recrear la arquitectura en una nueva base de código (Angular 19) manteniendo la orquestación de Module Federation, el contrato de sesión compartida y la capa UI común.
