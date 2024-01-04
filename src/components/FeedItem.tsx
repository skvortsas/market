import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { Preferences } from '@capacitor/preferences';

import { FEED_STORAGE } from '@/utils/variables';

const FeedItem = () => {
  const [feedItem, setFeedItem] = useState<IFeedItem | null>(null);
  const params = useParams<{ id: string; }>();
  const { id } = params;

  useEffect(() => {
    Preferences.get({ key: FEED_STORAGE })
      .then(({ value }) => {
        if (value) return JSON.parse(value);
        return [];
      })
      .then((feed: Array<IFeedItem>) => {
        const desiredFeedItem = feed.find((feedItem: IFeedItem) => feedItem.id === id);
        if (desiredFeedItem) {
          setFeedItem(desiredFeedItem);
        }
      })
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/feed" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{background: 'white', padding: '16px'}}>
          <QRCode value={id}/>
        </div>
        {
          feedItem && (
            <div>
              <div>{feedItem.name}</div>
              <div>{feedItem.description}</div>
              <div>{feedItem.price}</div>
            </div>
          )
        }
      </IonContent>
    </IonPage>
);
};

export default FeedItem;
