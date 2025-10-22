const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    
    // Configuración específica para el SessionService
    '@app/session-service': {
      singleton: true,
      eager: true,
      strictVersion: true
    },
    
    // Asegurarse que RxJS sea singleton para el manejo de observables
    'rxjs': {
      singleton: true,
      eager: false,
      strictVersion: true
    },
    
    // Compartir las librerías MSAL
    '@azure/msal-browser': {
      singleton: true,
      eager: true,
      strictVersion: true
    },
    
    '@azure/msal-angular': {
      singleton: true,
      eager: true,
      strictVersion: true
    }
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

  features: {
    // New feature for more performance and avoiding
    // issues with node libs. Comment this out to
    // get the traditional behavior:
    ignoreUnusedDeps: true
  }
  
});
