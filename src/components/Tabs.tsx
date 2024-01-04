import { Route, Redirect } from 'react-router-dom';
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from '@ionic/react';
import { addCircle, cameraOutline, list } from 'ionicons/icons';

import Feed from './Feed';
import Create from './Create';
import FeedItem from './FeedItem';
import Scanner from './CodeScanner';

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
