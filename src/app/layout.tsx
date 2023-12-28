import { ReactNode } from 'react';
import { Metadata } from 'next';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

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
