import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';

const FeedItem = () => {
  const params = useParams<{ id: string; }>();
  const { id } = params;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        This page is for {id} feed item
      </IonContent>
    </IonPage>
  );
};

export default FeedItem;
