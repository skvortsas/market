import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';
import { Directory, Filesystem } from '@capacitor/filesystem';

import ItemContent from './ItemContent';

import { getFeedItemById, readAllImagesForFeedItem } from '@/utils/storage';

const Index = () => {
  const [feedItem, setFeedItem] = useState<IFeedItem | null>(null);
  const params = useParams<{ id: string; }>();
  const { id } = params;

  const getFeedItem = async () => {
    const feedItem = await getFeedItemById(id);
    if (feedItem) {
      await readAllImagesForFeedItem(feedItem);
      return feedItem;
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
      <ItemContent feedItem={feedItem} />
    </IonPage>
  );
};

export default Index;
