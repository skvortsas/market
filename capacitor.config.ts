import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'market',
  webDir: 'out',
  server: {
    url: 'http://10.0.0.12:3000',
    cleartext: true,
  }
};

export default config;
