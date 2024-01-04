import { ReactNode } from 'react';
import { Metadata } from 'next';

import '@/styles/global.css';
import '@/styles/vars.css';

export const metadata: Metadata = {
  title: 'Marketplace App',
  description: 'A marketplace app built with Ionic Framework and Next.js',
};

function MyApp({ children }: { children: ReactNode; }) {
  return (
    <html suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}

export default MyApp;
