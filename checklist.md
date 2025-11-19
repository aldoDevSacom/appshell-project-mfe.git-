# 📋 Checklist de Migración a Angular 19 LTS

> **Proyecto:** AppShell MFE Project
> **Versión Actual:** Angular 20.3.0
> **Versión Objetivo:** Angular 19.2.15 (LTS en mayo 2025)
> **Fecha:** 2025-11-19

---

## 🎯 Objetivo

Migrar el proyecto de Angular 20.3.0 a Angular 19.2.15 para mantener una versión con soporte LTS extendido hasta mayo 2026, garantizando compatibilidad total con todas las dependencias del proyecto.

---

## ✅ Checklist de Pre-Migración

### 1. Verificación del Entorno

- [ ] **Verificar versión de Node.js**
  ```bash
  node --version  # Debe ser >= 18.19.0
  ```
  - ✅ Versión actual: v23.11.0

- [ ] **Verificar versión de npm**
  ```bash
  npm --version  # Debe ser >= 9.0.0
  ```
  - ✅ Versión actual: 10.2.4

- [ ] **Confirmar que estamos en la rama correcta**
  ```bash
  git branch --show-current  # Debe ser: feature-angular-lts
  ```

- [ ] **Verificar que no hay cambios sin commitear**
  ```bash
  git status
  ```

### 2. Backup y Preparación

- [ ] **Crear commit de seguridad antes de migración**
  ```bash
  git add .
  git commit -m "chore: Checkpoint before Angular 19 migration"
  ```

- [ ] **Crear tag de backup (opcional pero recomendado)**
  ```bash
  git tag pre-angular-19-migration
  ```

---

## 📦 Checklist de Actualización de Dependencias

### 3. Actualizar package.json

- [ ] **Actualizar dependencias de Angular Core**
  - [ ] `@angular/animations`: `^20.3.0` → `^19.2.15`
  - [ ] `@angular/common`: `^20.3.0` → `^19.2.15`
  - [ ] `@angular/compiler`: `^20.3.0` → `^19.2.15`
  - [ ] `@angular/core`: `^20.3.0` → `^19.2.15`
  - [ ] `@angular/forms`: `^20.3.0` → `^19.2.15`
  - [ ] `@angular/platform-browser`: `^20.3.0` → `^19.2.15`
  - [ ] `@angular/router`: `^20.3.0` → `^19.2.15`

- [ ] **Actualizar dependencias de desarrollo de Angular**
  - [ ] `@angular/cli`: `^20.3.3` → `^19.2.5`
  - [ ] `@angular/compiler-cli`: `^20.3.0` → `^19.2.15`
  - [ ] `@angular-devkit/build-angular`: `^20.3.3` → `^19.2.5`
  - [ ] `@angular/build`: `^20.3.3` → `^19.2.5`
  - [ ] `ng-packagr`: `^20.3.0` → `^19.2.1`

- [ ] **Actualizar Native Federation**
  - [ ] `@angular-architects/native-federation`: `^20.1.6` → `^19.0.23`

- [ ] **Verificar zone.js (debe permanecer en 0.15.0)**
  - [ ] `zone.js`: `~0.15.0` ✅ (compatible con Angular 19)

- [ ] **Verificar TypeScript (ya compatible)**
  - [ ] `typescript`: `~5.9.2` ✅ (compatible con Angular 19)

- [ ] **Verificar dependencias de Azure MSAL (sin cambios)**
  - [ ] `@azure/msal-angular`: `^4.0.20` ✅
  - [ ] `@azure/msal-browser`: `^4.25.0` ✅

### 4. Limpieza de Dependencias

- [ ] **Eliminar node_modules**
  ```bash
  rm -rf node_modules
  ```

- [ ] **Eliminar package-lock.json**
  ```bash
  rm -f package-lock.json
  ```

- [ ] **Eliminar cache de Angular**
  ```bash
  rm -rf .angular
  ```

- [ ] **Eliminar dist/**
  ```bash
  rm -rf dist
  ```

### 5. Instalación de Dependencias

- [ ] **Instalar todas las dependencias**
  ```bash
  npm install
  ```
  - Verificar que no haya errores de peer dependencies
  - Si hay warnings de peer dependencies, revisar pero generalmente son seguros de ignorar

- [ ] **Verificar instalación correcta**
  ```bash
  npm list @angular/core
  ```
  - Debe mostrar: `@angular/core@19.2.15`

---

## 🔧 Checklist de Configuración

### 6. Verificar y Ajustar Configuraciones

- [ ] **Revisar angular.json**
  - [ ] Verificar que los builders sean compatibles con Angular 19
  - [ ] Builder `@angular/build:application` ✅ (disponible desde Angular 17)
  - [ ] Builder `@angular-architects/native-federation:build` ✅

- [ ] **Revisar tsconfig.json**
  - [ ] `"target": "ES2022"` ✅
  - [ ] `"module": "preserve"` ✅ (compatible con Angular 19)
  - [ ] `"strict": true` ✅

- [ ] **Verificar federation.config.js (si existe)**
  - Verificar que la configuración de Native Federation sea compatible

---

## 🏗️ Checklist de Compilación

### 7. Compilar Aplicaciones Principales

- [ ] **Compilar app-shell**
  ```bash
  npm run build:shell
  ```
  - Anotar errores si los hay
  - Verificar que compile sin errores

- [ ] **Compilar mfe-dashboard**
  ```bash
  npm run build:dashboard
  ```

- [ ] **Compilar mfe-tasks**
  ```bash
  npm run build:tasks
  ```

- [ ] **Compilar mfe-iam**
  ```bash
  npm run build:iam
  ```

- [ ] **Compilar mfe-marketing**
  ```bash
  npm run build:marketing
  ```

- [ ] **Compilar mfe-billing**
  ```bash
  npm run build:billing
  ```

### 8. Verificar Outputs de Compilación

- [ ] **Verificar que dist/ contiene todos los builds**
  ```bash
  ls -la dist/
  ```

- [ ] **Verificar tamaños de bundles (comparar con versión anterior)**
  ```bash
  du -sh dist/*/browser
  ```

---

## 🧪 Checklist de Testing

### 9. Ejecutar Tests Unitarios

- [ ] **Test app-shell**
  ```bash
  npm run test
  ```
  - Todos los tests deben pasar

- [ ] **Test mfe-dashboard**
  ```bash
  npm run test:dashboard
  ```

- [ ] **Test mfe-tasks**
  ```bash
  npm run test:tasks
  ```

- [ ] **Test mfe-iam**
  ```bash
  npm run test:iam
  ```

- [ ] **Test mfe-marketing**
  ```bash
  npm run test:marketing
  ```

- [ ] **Test mfe-billing**
  ```bash
  npm run test:billing
  ```

### 10. Testing Manual

- [ ] **Levantar servidor de desarrollo**
  ```bash
  npm run serve:shell
  ```

- [ ] **Verificar funcionalidades principales**
  - [ ] La aplicación carga correctamente
  - [ ] Los microfrontends se cargan dinámicamente
  - [ ] La autenticación con Azure MSAL funciona
  - [ ] La navegación entre módulos funciona
  - [ ] No hay errores en consola del navegador

- [ ] **Verificar hot reload**
  - Hacer un cambio menor en un componente
  - Verificar que se recarga automáticamente

---

## 🔍 Checklist de Verificación Post-Migración

### 11. Verificar Dependencias Críticas

- [ ] **Verificar Native Federation**
  - [ ] Los remoteEntry.json se generan correctamente
  - [ ] Los importmap.json se generan correctamente
  - [ ] La carga dinámica de módulos funciona

- [ ] **Verificar Azure MSAL**
  - [ ] Login funciona correctamente
  - [ ] Token refresh funciona
  - [ ] Logout funciona correctamente

- [ ] **Verificar Tailwind CSS**
  - [ ] Los estilos se aplican correctamente
  - [ ] No hay clases faltantes

### 12. Revisar Logs y Warnings

- [ ] **Revisar warnings de compilación**
  ```bash
  npm run build:shell 2>&1 | grep -i "warning"
  ```

- [ ] **Revisar deprecations**
  - Anotar cualquier API deprecada para futuras actualizaciones

---

## 📝 Checklist de Documentación

### 13. Actualizar Documentación

- [ ] **Crear archivo MIGRATION.md con detalles de la migración**
  - Versiones anteriores
  - Versiones nuevas
  - Problemas encontrados y soluciones
  - Cambios de configuración

- [ ] **Actualizar README.md**
  - [ ] Actualizar versión de Angular mencionada
  - [ ] Actualizar requisitos de Node.js si cambió
  - [ ] Actualizar comandos si cambió algo

- [ ] **Actualizar package.json descripción/versión**
  - Incrementar versión del proyecto si aplica

---

## 🚀 Checklist de Commit y Deploy

### 14. Commit de Cambios

- [ ] **Revisar todos los cambios**
  ```bash
  git status
  git diff package.json
  ```

- [ ] **Agregar archivos al staging**
  ```bash
  git add package.json package-lock.json checklist.md
  ```

- [ ] **Crear commit descriptivo**
  ```bash
  git commit -m "feat: Migrate to Angular 19.2.15 LTS

  - Update all Angular packages to 19.2.15
  - Update Angular CLI and build tools to 19.2.5
  - Update @angular-architects/native-federation to 19.0.23
  - Maintain zone.js 0.15.0 and TypeScript 5.9.2
  - All builds passing
  - All tests passing

  🤖 Generated with [Claude Code](https://claude.com/claude-code)

  Co-Authored-By: Claude <noreply@anthropic.com>"
  ```

### 15. Verificación Final

- [ ] **Compilación limpia desde cero**
  ```bash
  rm -rf node_modules dist .angular
  npm install
  npm run build
  ```

- [ ] **Todos los tests pasan**
  ```bash
  npm test
  ```

- [ ] **La aplicación arranca correctamente**
  ```bash
  npm start
  ```

---

## 📊 Resumen de Versiones

### Versiones ANTES de la migración:
```json
{
  "@angular/core": "^20.3.0",
  "@angular/cli": "^20.3.3",
  "@angular-architects/native-federation": "^20.1.6",
  "zone.js": "~0.15.0",
  "typescript": "~5.9.2"
}
```

### Versiones DESPUÉS de la migración:
```json
{
  "@angular/core": "^19.2.15",
  "@angular/cli": "^19.2.5",
  "@angular-architects/native-federation": "^19.0.23",
  "zone.js": "~0.15.0",
  "typescript": "~5.9.2"
}
```

---

## ⚠️ Problemas Comunes y Soluciones

### Problema 1: Errores de Peer Dependencies
**Síntoma:** Warnings sobre peer dependencies durante `npm install`
**Solución:**
- Revisar que las versiones sean compatibles
- En la mayoría de casos, los warnings son seguros de ignorar
- Si hay errores (no warnings), usar `npm install --legacy-peer-deps`

### Problema 2: Errores de TypeScript
**Síntoma:** Errores de compilación TypeScript
**Solución:**
- Verificar que `typescript` sea versión `~5.6.x` a `~5.9.x`
- Revisar `tsconfig.json` para opciones incompatibles
- Ejecutar `npm install` de nuevo

### Problema 3: Native Federation no carga módulos
**Síntoma:** Error 404 o "Cannot load remote module"
**Solución:**
- Verificar que todos los MFEs estén compilados
- Verificar `remoteEntry.json` en `dist/*/browser/`
- Verificar puertos en federation.config.js

### Problema 4: Tests fallan
**Síntoma:** Tests que pasaban ahora fallan
**Solución:**
- Revisar cambios en Angular testing utilities
- Actualizar mocks si es necesario
- Verificar imports de testing modules

---

## 🎉 Migración Completada

Una vez completados todos los pasos del checklist:

- ✅ Proyecto migrado a Angular 19.2.15
- ✅ Soporte LTS hasta mayo 2026
- ✅ Compatible con todas las dependencias
- ✅ Builds funcionando
- ✅ Tests pasando
- ✅ Documentación actualizada

---

## 📞 Soporte y Referencias

- [Angular 19 Release Notes](https://angular.dev/reference/releases)
- [Angular Update Guide](https://update.angular.io/)
- [Native Federation Docs](https://www.npmjs.com/package/@angular-architects/native-federation)
- [Azure MSAL Angular](https://github.com/AzureAD/microsoft-authentication-library-for-js)

---

**Última actualización:** 2025-11-19
**Autor:** Claude Code
**Proyecto:** AppShell MFE Project
