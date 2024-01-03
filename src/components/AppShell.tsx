'use client';

import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

import Tabs from './Tabs';

setupIonicReact({});
defineCustomElements(window);

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
