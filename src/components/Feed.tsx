import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText, IonItemGroup, IonItem, useIonViewDidEnter, IonImg, isPlatform,
} from '@ionic/react';
import { FEED_STORAGE } from '@/utils/variables';
import { Preferences } from '@capacitor/preferences';
import {Directory, Filesystem} from "@capacitor/filesystem";

const Feed = () => {
  const [feed, setFeed] = useState<Array<IFeedItem>>([]);

  const getFeed = async (): Promise<Array<IFeedItem>> => {
    const { value } = await Preferences.get({ key: FEED_STORAGE });
    if (value) {
      const feed = JSON.parse(value);
      if (!isPlatform('hybrid')) {
        for (const feedItem of feed) {
          const image = feedItem.images[0];
          const file = await Filesystem.readFile({
            path: image.filepath,
            directory: Directory.Data,
          });
          image.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
      }

      return feed;
    }

    return [];
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
        <IonText>
          This is feed page
        </IonText>
        <IonItemGroup>
          {
            feed.map((feedItem: IFeedItem) => <IonItem key={feedItem.id} routerLink={`/feed/${feedItem.id}`}>
              <div>name: {feedItem.name}</div>
              <div>price: {feedItem.price}</div>
              <div>description: {feedItem.description}</div>
              <div>
                <IonImg src={feedItem.images[0].webviewPath} />
              </div>
            </IonItem>)
          }
        </IonItemGroup>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
