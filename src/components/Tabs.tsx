import { Route, Redirect } from 'react-router-dom';
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from '@ionic/react';
import { addCircle, cameraOutline, list } from 'ionicons/icons';

import Feed from '@/feed';
import Create from '@/create/Create';
import FeedItem from '@/feed/item';
import Scanner from '@/scanner/CodeScanner';

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/feed" render={() => <Feed />} />
        <Route path="/feed/:id" render={() => <FeedItem />} />
        <Route path="/scanner" render={() => <Scanner />} />
        <Route path="/create" render={() => <Create />} />
        <Route path="/" render={() => <Redirect to="/feed" />} exact />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="feed" href="/feed">
          <IonIcon icon={list} />
        </IonTabButton>
        <IonTabButton tab="camera" href="/scanner">
          <IonIcon icon={cameraOutline} />
        </IonTabButton>
        <IonTabButton tab="create" href="/create">
          <IonIcon icon={addCircle} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
