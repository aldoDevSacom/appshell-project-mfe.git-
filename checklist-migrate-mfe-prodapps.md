# CHECKLIST DE MIGRACIÓN: SI-B-PRODAPPSFRONT-2025 A MICROFRONTEND

## INFORMACIÓN DE PROYECTOS

### Proyecto AppShell (Contenedor Principal)
- **Ubicación**: `/Users/aldo/Aldo_en_mi_mac/ADNDigital/AppShell/AppShell-DevSacom/`
- **Rol**: Aplicación contenedora (Shell) que gestiona múltiples MFEs
- **Estructura actual**: Manager AppShell + varios MFEs remotos

### Proyecto SI-B-PRODAPPSFRONT-2025 (A Migrar)
- **Ubicación**: `/Users/aldo/Aldo_en_mi_mac/ADNDigital/ProdAppsAngular17/SI-B-PRODAPPSFRONT-2025/prod-apps/`
- **Versión Angular**: 19.2.15
- **Arquitectura**: Standalone components
- **Estado actual**: Aplicación Angular standalone (NO es MFE)
- **SSR**: Habilitado con Express
- **Características clave**:
  - Task management (lista y detalle de tareas)
  - Integración con Sinergia
  - Campos dinámicos
  - Autenticación con tokens
  - Layouts duales (Main + Iframe)

---

## FASE 1: PREPARACIÓN Y ANÁLISIS

### 1.1 Análisis de Dependencias Compartidas
- [ ] Documentar versiones de Angular en AppShell vs SI-B-PRODAPPSFRONT-2025
- [ ] Verificar compatibilidad de versiones de Angular Material
- [ ] Identificar dependencias compartidas (RxJS, Angular CDK, etc.)
- [ ] Analizar conflictos potenciales de versiones
- [ ] Crear matriz de dependencias compartidas

**Archivos a revisar**:
- AppShell: `package.json`
- ProdApps: `/prod-apps/package.json`

### 1.2 Análisis de Arquitectura del AppShell
- [ ] Revisar configuración de Module Federation en AppShell
- [ ] Identificar webpack.config.js del Shell
- [ ] Documentar MFEs existentes como referencia
- [ ] Analizar estructura de routing del Shell
- [ ] Revisar cómo se cargan MFEs remotos actualmente
- [ ] Documentar patrón de comunicación entre Shell y MFEs

**Archivos clave AppShell**:
- `webpack.config.js` o `custom-webpack.config.js`
- `angular.json`
- Archivos de routing del Shell

### 1.3 Auditoría de Estado y Servicios Compartidos
- [ ] Identificar servicios que necesitan ser compartidos (AuthService, TaskService)
- [ ] Analizar uso de localStorage y sessionStorage
- [ ] Documentar flujos de autenticación actuales
- [ ] Identificar state management (TaskStateService)
- [ ] Planificar estrategia de shared state entre Shell y MFE

**Servicios críticos en ProdApps**:
- `/src/app/services/auth.service.ts`
- `/src/app/services/task.service.ts`
- `/src/app/services/task-state.service.ts`

### 1.4 Planificación de Rutas
- [ ] Mapear rutas actuales de ProdApps
  - `/task-list`
  - `/task-details/:taskId`
  - `/login`
  - `/unauthorized`
  - `/frame/*` (iframe routes)
- [ ] Definir prefijo de ruta en AppShell (ej: `/prodapps/...`)
- [ ] Planificar integración con routing del Shell
- [ ] Decidir qué hacer con rutas iframe (`/frame/*`)

---

## FASE 2: CONFIGURACIÓN DEL ENTORNO

### 2.1 Backup y Control de Versiones
- [x] Crear branch `task-mfe-prodapps` (COMPLETADO)
- [ ] Hacer backup completo de SI-B-PRODAPPSFRONT-2025
- [ ] Documentar estado actual en git (commit antes de cambios)
- [ ] Crear branch en AppShell para integración

### 2.2 Instalación de Dependencias Module Federation
- [ ] Instalar `@angular-architects/module-federation` en ProdApps
  ```bash
  cd /Users/aldo/Aldo_en_mi_mac/ADNDigital/ProdAppsAngular17/SI-B-PRODAPPSFRONT-2025/prod-apps
  npm install @angular-architects/module-federation --save-dev
  ```
- [ ] Verificar compatibilidad con Angular 19
- [ ] Instalar @angular-architects/module-federation-tools si es necesario

### 2.3 Configuración de Webpack en ProdApps
- [ ] Ejecutar schematic de Module Federation
  ```bash
  ng add @angular-architects/module-federation --project prod-apps --type remote --port 4201
  ```
- [ ] Revisar `webpack.config.js` generado
- [ ] Configurar nombre del MFE: `prodapps`
- [ ] Definir puerto de desarrollo: `4201` (o según necesidad)
- [ ] Actualizar `angular.json` con custom webpack config

**Configuración esperada en webpack.config.js**:
```javascript
new ModuleFederationPlugin({
  name: 'prodapps',
  filename: 'remoteEntry.js',
  exposes: {
    './Module': './src/app/app.routes.ts',
  },
  shared: share({
    "@angular/core": { singleton: true, strictVersion: true },
    "@angular/common": { singleton: true, strictVersion: true },
    "@angular/router": { singleton: true, strictVersion: true },
    "@angular/material": { singleton: true, strictVersion: true },
    "rxjs": { singleton: true, strictVersion: true },
  })
})
```

### 2.4 Actualización de AppShell para Consumir MFE
- [ ] Actualizar `webpack.config.js` del Shell con remote ProdApps
- [ ] Agregar entrada en `remotes`:
  ```javascript
  remotes: {
    "prodapps": "http://localhost:4201/remoteEntry.js",
  }
  ```
- [ ] Configurar mismas versiones compartidas que el remote

---

## FASE 3: TRANSFORMACIÓN A MFE REMOTO

### 3.1 Ajustes en Estructura de Aplicación ProdApps
- [ ] Modificar `app.routes.ts` para exportar rutas como módulo
- [ ] Crear archivo de exportación de rutas para Module Federation
- [ ] Remover o adaptar AppComponent si es necesario
- [ ] Configurar bootstrap dinámico para MFE standalone

**Crear archivo**: `/src/app/mfe.routes.ts`
```typescript
import { Routes } from '@angular/router';
import { APP_ROUTES } from './app.routes';

export const MFE_ROUTES: Routes = APP_ROUTES;
```

### 3.2 Manejo de Layouts en Contexto MFE
- [ ] Evaluar si mantener MainLayoutComponent dentro del MFE
- [ ] Decidir si IframeLayoutComponent sigue siendo necesario
- [ ] Considerar usar layout del AppShell en lugar del propio
- [ ] Adaptar componentes de header/sidebar si se delegan al Shell

**Opciones**:
- Opción A: MFE mantiene sus layouts completos
- Opción B: MFE usa layout del Shell (recomendado)
- Opción C: Híbrido (sidebar del Shell, header del MFE)

### 3.3 Configuración de Publicación (Expose)
- [ ] Definir qué se expone en Module Federation
  - Rutas principales
  - Componentes standalone específicos
  - Servicios compartidos (si aplica)
- [ ] Configurar `exposes` en webpack.config.js
- [ ] Probar carga del remoteEntry.js

**Ejemplo de exposición**:
```javascript
exposes: {
  './Routes': './src/app/mfe.routes.ts',
  './TaskListComponent': './src/app/views/task-list/task-list.component.ts',
  './TaskDetailComponent': './src/app/views/task-detail/task-detail.component.ts',
}
```

### 3.4 Configuración de Environment Variables
- [ ] Adaptar `environment.ts` para contexto MFE
- [ ] Configurar `IN_IFRAME: false` (ya no se ejecuta en iframe)
- [ ] Actualizar `URL_PARENT_APP` si es necesario
- [ ] Validar que API_URI sea accesible desde el Shell
- [ ] Considerar mover configuración al Shell si es compartida

---

## FASE 4: INTEGRACIÓN DE SERVICIOS Y ESTADO

### 4.1 Servicios de Autenticación
- [ ] Decidir dónde vive AuthService (Shell vs MFE)
  - **Recomendado**: Servicio compartido en el Shell
- [ ] Adaptar mecanismo de tokens para comunicación Shell->MFE
- [ ] Configurar providedIn: 'root' o provider en el Shell
- [ ] Probar flujo de login desde el Shell

**Consideraciones**:
- Token actual se pasa por URL (`/task-list/:id`)
- Puede ser mejor manejarlo via servicio compartido del Shell

### 4.2 Estado Compartido (TaskStateService)
- [ ] Evaluar si TaskStateService debe ser singleton global
- [ ] Configurar shared singleton en Module Federation si es necesario
- [ ] Probar que el estado persiste entre navegaciones Shell<->MFE
- [ ] Validar uso de localStorage en contexto MFE

### 4.3 Servicios API (TaskService, OperatorService, etc.)
- [ ] Mantener servicios dentro del MFE (providedIn: 'root')
- [ ] Validar que HttpClient funciona correctamente
- [ ] Probar llamadas a API desde el MFE cargado en el Shell
- [ ] Verificar headers de autenticación en requests

### 4.4 Comunicación Shell <-> MFE
- [ ] Definir eventos o servicios para comunicación bidireccional
- [ ] Implementar patrón de comunicación si es necesario
  - CustomEvents
  - Shared RxJS Subject
  - Message Bus pattern
- [ ] Documentar contratos de comunicación

---

## FASE 5: AJUSTES DE ROUTING

### 5.1 Configuración de Rutas en AppShell
- [ ] Agregar lazy loading de rutas del MFE ProdApps
- [ ] Configurar prefijo de ruta (ej: `/prodapps`)
- [ ] Implementar loadRemoteModule en routing del Shell

**Ejemplo de routing en Shell**:
```typescript
{
  path: 'prodapps',
  loadChildren: () =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './Routes'
    }).then(m => m.MFE_ROUTES)
}
```

### 5.2 Navegación y Deep Linking
- [ ] Probar navegación a `/prodapps/task-list`
- [ ] Probar navegación con parámetros `/prodapps/task-details/:taskId`
- [ ] Validar que RouterLink funciona correctamente
- [ ] Probar navegación programática con Router.navigate()
- [ ] Verificar que URL se actualiza correctamente en el navegador

### 5.3 Guards y Resolvers
- [ ] Migrar guards de autenticación si existen
- [ ] Configurar guards a nivel de Shell si es necesario
- [ ] Probar protección de rutas

---

## FASE 6: ESTILOS Y TEMAS

### 6.1 Material Theme
- [ ] Decidir si el tema Material viene del Shell o del MFE
  - **Recomendado**: Theme global en el Shell
- [ ] Configurar shared styles en Module Federation
- [ ] Probar que componentes Material se ven correctamente
- [ ] Validar indigo-pink theme o personalizar

### 6.2 Tailwind CSS
- [ ] Verificar si Tailwind debe compartirse con el Shell
- [ ] Configurar build de Tailwind en contexto MFE
- [ ] Probar que clases Tailwind funcionan correctamente
- [ ] Prevenir conflictos de CSS entre Shell y MFE

**Opciones**:
- Opción A: Cada MFE tiene su propio Tailwind (posible duplicación)
- Opción B: Tailwind compartido desde el Shell (recomendado)

### 6.3 CSS Scoping y Aislamiento
- [ ] Verificar que estilos del MFE no afectan al Shell
- [ ] Usar View Encapsulation si es necesario
- [ ] Probar con diferentes componentes

---

## FASE 7: MANEJO DE SSR (Server-Side Rendering)

### 7.1 Desactivación de SSR en MFE
- [ ] **IMPORTANTE**: MFEs remotos típicamente NO usan SSR
- [ ] Remover configuración SSR de angular.json del MFE
- [ ] Eliminar server.ts si ya no es necesario
- [ ] Actualizar scripts de build en package.json
- [ ] Configurar build solo para browser

**Nota**: El AppShell puede mantener SSR, pero los MFEs remotos generalmente se sirven como CSR (Client-Side Rendering).

### 7.2 Actualización de Build Scripts
- [ ] Modificar script `build` para generar solo bundle del browser
- [ ] Agregar script para build de producción del MFE
- [ ] Configurar outputPath si es necesario

**Nuevo package.json scripts**:
```json
{
  "build": "ng build --configuration production",
  "build:mfe": "ng build --configuration production --output-hashing=none",
  "serve:mfe": "ng serve --port 4201"
}
```

---

## FASE 8: TESTING Y VALIDACIÓN

### 8.1 Testing Local
- [ ] Iniciar AppShell en modo desarrollo
  ```bash
  cd /Users/aldo/Aldo_en_mi_mac/ADNDigital/AppShell/AppShell-DevSacom
  npm start
  ```
- [ ] Iniciar MFE ProdApps en modo desarrollo
  ```bash
  cd /Users/aldo/Aldo_en_mi_mac/ADNDigital/ProdAppsAngular17/SI-B-PRODAPPSFRONT-2025/prod-apps
  npm run serve:mfe
  ```
- [ ] Verificar que remoteEntry.js se carga correctamente
- [ ] Navegar a rutas del MFE desde el Shell

### 8.2 Pruebas Funcionales
- [ ] **Task List**:
  - [ ] Cargar lista de tareas
  - [ ] Aplicar filtros
  - [ ] Paginación funciona
  - [ ] Auto-refresh cada 60s
  - [ ] Navegación a task detail
- [ ] **Task Detail**:
  - [ ] Cargar detalle de tarea
  - [ ] Mostrar datos de cuenta
  - [ ] Mostrar datos de contacto (Sinergia)
  - [ ] Mostrar datos de producto
  - [ ] Historial de asignaciones
  - [ ] Campos dinámicos se renderizan correctamente
  - [ ] Acciones: Completar tarea, Rechazar tarea
- [ ] **Autenticación**:
  - [ ] Login funciona desde el Shell
  - [ ] Token se pasa correctamente al MFE
  - [ ] Redirección a /unauthorized funciona
  - [ ] Validación de usuario en task-detail
- [ ] **Navegación**:
  - [ ] Navegación entre task-list y task-detail
  - [ ] Back button del navegador funciona
  - [ ] Deep linking funciona

### 8.3 Pruebas de Integración
- [ ] Probar con múltiples MFEs cargados simultáneamente
- [ ] Verificar que no hay memory leaks
- [ ] Probar navegación entre diferentes MFEs
- [ ] Validar que servicios singleton funcionan correctamente

### 8.4 Pruebas de Performance
- [ ] Medir tiempo de carga inicial del MFE
- [ ] Verificar tamaño de bundles (main.js, remoteEntry.js)
- [ ] Validar lazy loading de componentes
- [ ] Probar con network throttling

---

## FASE 9: OPTIMIZACIÓN Y BUILD DE PRODUCCIÓN

### 9.1 Optimización de Bundles
- [ ] Configurar shared dependencies correctamente
- [ ] Minimizar duplicación de código
- [ ] Configurar tree-shaking
- [ ] Revisar budget limits en angular.json

### 9.2 Build de Producción del MFE
- [ ] Ejecutar build de producción
  ```bash
  npm run build:mfe
  ```
- [ ] Verificar output en `/dist/prod-apps`
- [ ] Verificar que remoteEntry.js está generado
- [ ] Validar hashing de archivos (considerar desactivarlo para MFE)

### 9.3 Configuración de URLs de Producción
- [ ] Actualizar webpack.config.js con URLs de producción
- [ ] Configurar publicPath dinámico si es necesario
- [ ] Actualizar remotes en AppShell para producción

**Ejemplo de configuración dinámica**:
```javascript
output: {
  publicPath: 'auto',
  uniqueName: 'prodapps'
}
```

### 9.4 Testing en Ambiente de Producción
- [ ] Hacer build de producción de ambos proyectos
- [ ] Servir archivos estáticos (ej: con http-server)
- [ ] Probar carga del MFE en producción
- [ ] Validar todas las funcionalidades

---

## FASE 10: DEPLOYMENT Y DOCUMENTACIÓN

### 10.1 Estrategia de Deployment
- [ ] Definir servidores/CDN para cada proyecto
  - AppShell: Servidor principal
  - MFE ProdApps: Servidor independiente o CDN
- [ ] Configurar CORS si Shell y MFE están en dominios diferentes
- [ ] Configurar cache headers para remoteEntry.js (no cachear)
- [ ] Configurar cache headers para bundles (cachear con hash)

### 10.2 CI/CD Pipeline
- [ ] Configurar pipeline de build para MFE ProdApps
- [ ] Configurar pipeline de build para AppShell
- [ ] Definir estrategia de versionado
- [ ] Configurar rollback strategy

### 10.3 Monitoreo y Logging
- [ ] Implementar logging de errores en carga de MFE
- [ ] Configurar error boundaries
- [ ] Implementar fallback UI si MFE falla al cargar
- [ ] Configurar analytics/monitoreo

### 10.4 Documentación
- [ ] Documentar arquitectura final
- [ ] Crear diagrama de arquitectura MFE
- [ ] Documentar proceso de desarrollo local
- [ ] Documentar proceso de deployment
- [ ] Crear guía de troubleshooting
- [ ] Documentar contratos de comunicación entre Shell y MFE

---

## FASE 11: MIGRACIÓN DE CARACTERÍSTICAS ESPECÍFICAS

### 11.1 Manejo de Iframe Layout
- [ ] **DECISIÓN CRÍTICA**: ¿Eliminar o mantener IframeLayout?
  - Si se mantiene: Documentar casos de uso
  - Si se elimina: Refactorizar componentes que lo usan
- [ ] Actualizar environment variable `IN_IFRAME`
- [ ] Probar rutas `/frame/*` si se mantienen

### 11.2 Dynamic Fields Component
- [ ] Validar que campos dinámicos se cargan correctamente en MFE
- [ ] Probar con diferentes tipos de campos
- [ ] Validar integración con TaskService

### 11.3 Sinergia Integration
- [ ] Probar componentes de Sinergia:
  - TaskDataContactComponent
  - TaskSinergiaAccountDataComponent
  - TaskSinergiaDataProductComponent
- [ ] Validar llamadas API a endpoints de Sinergia
- [ ] Probar renderizado de datos

### 11.4 Material Dialogs
- [ ] Probar TaskCompleteTaskDialogComponent
- [ ] Probar TaskRejectDialogComponent
- [ ] Probar ModalSkeletonDialogComponent
- [ ] Validar overlay backdrop en contexto MFE

---

## FASE 12: VALIDACIÓN FINAL

### 12.1 Checklist de Funcionalidades
- [ ] Login y autenticación
- [ ] Lista de tareas (filtros, búsqueda, paginación)
- [ ] Detalle de tarea (todos los componentes)
- [ ] Acciones de tarea (completar, rechazar)
- [ ] Navegación completa
- [ ] Auto-refresh
- [ ] Manejo de errores
- [ ] Loading states (skeletons)
- [ ] Responsive design

### 12.2 Checklist Técnico
- [ ] No hay errores en consola del navegador
- [ ] No hay memory leaks
- [ ] Performance es aceptable
- [ ] Bundles tienen tamaño razonable
- [ ] Shared dependencies no están duplicadas
- [ ] CORS está configurado correctamente
- [ ] Environment variables están correctamente configuradas

### 12.3 Checklist de Seguridad
- [ ] Tokens se manejan de forma segura
- [ ] No hay credenciales expuestas en código frontend
- [ ] HTTPS en producción
- [ ] Headers de seguridad configurados
- [ ] Validación de usuario funciona correctamente

### 12.4 Sign-off
- [ ] Code review completado
- [ ] Testing de QA completado
- [ ] Documentación revisada
- [ ] Deployment plan aprobado
- [ ] Stakeholders notificados

---

## NOTAS IMPORTANTES

### Riesgos Identificados
1. **Versiones de Angular**: AppShell podría estar en versión diferente a Angular 19
   - **Mitigación**: Actualizar AppShell o downgradear ProdApps si es necesario

2. **SSR en MFE**: MFEs remotos típicamente no soportan SSR
   - **Mitigación**: Desactivar SSR en ProdApps, mantenerlo solo en Shell si es necesario

3. **Shared State**: localStorage y servicios singleton pueden causar problemas
   - **Mitigación**: Configurar correctamente shared singletons en Module Federation

4. **Material Theme**: Posible duplicación o conflicto de estilos
   - **Mitigación**: Compartir theme desde el Shell

5. **Token Management**: Paso de tokens por URL puede necesitar refactoring
   - **Mitigación**: Implementar servicio de autenticación compartido

### Recomendaciones Adicionales
- **Versionado semántico**: Usar versionado para el MFE
- **Feature flags**: Considerar implementar para rollout gradual
- **Fallback**: Implementar fallback UI si MFE falla al cargar
- **Logging**: Implementar logging robusto para debugging
- **Testing**: Mantener cobertura de tests durante migración

### Enlaces de Referencia
- [Module Federation Official Docs](https://webpack.js.org/concepts/module-federation/)
- [Angular Architects Module Federation](https://www.npmjs.com/package/@angular-architects/module-federation)
- [Micro Frontends Best Practices](https://micro-frontends.org/)

---

## TIMELINE ESTIMADO (REFERENCIA)

- **Fase 1-2**: Preparación y configuración - Complejidad media
- **Fase 3-4**: Transformación a MFE - Complejidad alta
- **Fase 5-6**: Routing y estilos - Complejidad media
- **Fase 7**: SSR - Complejidad baja (desactivación)
- **Fase 8**: Testing - Complejidad alta
- **Fase 9**: Optimización - Complejidad media
- **Fase 10-12**: Deployment y validación - Complejidad media

**TOTAL ESTIMADO**: Proyecto de complejidad alta, requiere planificación cuidadosa

---

## CONTROL DE VERSIONES

- **Versión del checklist**: 1.0
- **Fecha de creación**: 2025-11-19
- **Última actualización**: 2025-11-19
- **Branch objetivo**: task-mfe-prodapps
- **Responsable**: Equipo de desarrollo

---

**NOTA FINAL**: Este checklist es una guía comprehensiva. Algunos pasos pueden requerir ajustes según las especificidades del AppShell existente y los requerimientos del negocio. Se recomienda revisión técnica antes de iniciar la implementación.
