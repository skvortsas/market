import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  useIonViewDidEnter,
  isPlatform,
} from '@ionic/react';

import { getFeed as getFeedFromStorage, readCoverForFeedItem } from '@/utils/storage';

import FeedCard from './FeedCard';

const Index = () => {
  const [feed, setFeed] = useState<Array<IFeedItem>>([]);

  const getFeed = async (): Promise<Array<IFeedItem>> => {
    const feed = await getFeedFromStorage();

    if (!isPlatform('hybrid')) {
      for (const feedItem of feed) {
        if (feedItem.images.length) {
          feedItem.images[0] = await readCoverForFeedItem(feedItem);
        }
      }
    }

    return feed;
  };

  useIonViewDidEnter(() => {
    getFeed()
      .then(setFeed)
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
        <IonGrid>
          <IonRow>
            {
              feed.map((feedItem: IFeedItem) => <IonCol key={feedItem.id} size="12" sizeMd="6" sizeLg="3">
                <FeedCard {...feedItem} />
              </IonCol>)
            }
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Index;
