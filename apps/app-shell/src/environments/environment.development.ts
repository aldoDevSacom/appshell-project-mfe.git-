export const environment = {
  production: false,
  remotes: {
    'mfe-dashboard': 'http://localhost:4201/remoteEntry.json',
    'mfe-tasks': 'http://localhost:4202/remoteEntry.json',
    'mfe-iam': 'http://localhost:4203/remoteEntry.json',
    'mfe-marketing': 'http://localhost:4204/remoteEntry.json',
    'mfe-billing': 'http://localhost:4205/remoteEntry.json'
  }
} as const;
