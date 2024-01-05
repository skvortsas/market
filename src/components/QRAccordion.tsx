import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from '@ionic/react';
import QRCode from 'react-qr-code';

const QRAccordion = ({ qrValue } : { qrValue: string }) => {
  return (
    <IonAccordionGroup>
      <IonAccordion value="Show QR code">
        <IonItem slot="header" color="light">
          <IonLabel>Show QR code</IonLabel>
        </IonItem>
        <div className="ion-padding" slot="content">
          <div className="bg-white p-4 m-auto w-fit">
            <QRCode value={qrValue}/>
          </div>
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
};

export default QRAccordion;
