'use client';

import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

import Tabs from './Tabs';

setupIonicReact({});

const AppShell = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/" render={() => <Tabs />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
