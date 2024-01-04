import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText, IonItemGroup, IonItem, useIonViewDidEnter,
} from '@ionic/react';
import { FEED_STORAGE } from '@/utils/variables';
import { Preferences } from '@capacitor/preferences';

const Feed = () => {
  const [feed, setFeed] = useState<Array<any>>([]);

  useIonViewDidEnter(() => {
    Preferences.get({ key: FEED_STORAGE })
      .then(({ value }) => {
        if (value) return JSON.parse(value);
        return [];
      })
      .then((fetchedFeed) => setFeed(fetchedFeed))
      .catch((error) => {
        console.error('Something went wrong while getting feed: ', error);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Feed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Feed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonText>
          This is feed page
        </IonText>
        <IonItemGroup>
          {
            feed.map((feedItem: any) => <IonItem key={feedItem.id} routerLink={`/feed/${feedItem.id}`}>
              <div>name: {feedItem.name}</div>
              <div>price: {feedItem.price}</div>
              <div>description: {feedItem.description}</div>
            </IonItem>)
          }
        </IonItemGroup>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
