import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';

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
        <div style={{background: 'white', padding: '16px'}}>
          <QRCode value={id}/>
        </div>
      </IonContent>
    </IonPage>
);
};

export default FeedItem;
