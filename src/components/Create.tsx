import { IonContent, IonPage, IonText } from '@ionic/react';

const Create = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <IonText>this is create page</IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Create;
