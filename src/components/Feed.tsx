import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
} from '@ionic/react';

const Feed = () => {
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
      </IonContent>
    </IonPage>
  );
};

export default Feed;
