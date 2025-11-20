type RemoteMap = Record<string, string>;

declare global {
  // eslint-disable-next-line no-var
  var __appShellRemotes__: RemoteMap | undefined;
}

const overrides: RemoteMap = globalThis.__appShellRemotes__ ?? {};

export const environment = {
  production: true,
  remotes: {
    'mfe-dashboard': overrides['mfe-dashboard'] ?? 'http://localhost:4201/remoteEntry.json',
    'mfe-tasks': overrides['mfe-tasks'] ?? 'http://localhost:4202/remoteEntry.json',
    'mfe-iam': overrides['mfe-iam'] ?? 'http://localhost:4203/remoteEntry.json',
    'mfe-marketing': overrides['mfe-marketing'] ?? 'http://localhost:4204/remoteEntry.json',
    'mfe-billing': overrides['mfe-billing'] ?? 'http://localhost:4205/remoteEntry.json',
    'mfe-prodapps': overrides['mfe-prodapps'] ?? 'http://localhost:4206/remoteEntry.json'
  }
} as const;
