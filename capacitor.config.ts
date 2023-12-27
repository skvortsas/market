import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'market',
  webDir: 'out',
  server: {
    url: 'http://192.168.0.101:3000',
    cleartext: true,
  }
};

export default config;
