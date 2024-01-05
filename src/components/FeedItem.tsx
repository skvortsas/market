import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonImg
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { Preferences } from '@capacitor/preferences';

import { FEED_STORAGE } from '@/utils/variables';
import {Directory, Filesystem} from "@capacitor/filesystem";

const FeedItem = () => {
  const [feedItem, setFeedItem] = useState<IFeedItem | null>(null);
  const params = useParams<{ id: string; }>();
  const { id } = params;

  const getFeedItem = async () => {
    const { value } = await Preferences.get({ key: FEED_STORAGE });
    if (value) {
      const feed: Array<IFeedItem> = JSON.parse(value);
      const feedItem = feed.find((feedItem: IFeedItem) => feedItem.id === id);
      if (feedItem) {
        for (const image of feedItem.images) {
          const file = await Filesystem.readFile({
            path: image.filepath,
            directory: Directory.Data,
          });
          image.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
        return feedItem;
      }
    }
    return null;
  };

  useEffect(() => {
    getFeedItem()
      .then(setFeedItem)
      .catch((error) => {
        console.error('Something went wrong while getting feed: ', error);
      });
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
              <div>
                {
                  feedItem.images.map((image) => (
                    <IonImg src={image.webviewPath} key={image.webviewPath} />
                  ))
                }
              </div>
            </div>
          )
        }
      </IonContent>
    </IonPage>
);
};

export default FeedItem;
