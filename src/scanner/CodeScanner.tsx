import {
  BarcodeScanner,
  SupportedFormat,
} from '@capacitor-community/barcode-scanner';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import { useHistory } from 'react-router';
import { validateCode } from '@/utils/security';

const CodeScanner = () => {
  const { push } = useHistory();

  const startScan = async () => {
    const granded = await didUserGrantPermission();
    if (granded) {
      BarcodeScanner.hideBackground().then(() => {
        // So I can access navigation
        document.querySelector('body')!.classList.add('scanner-active');
      });
      const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] });
      if (result.hasContent) {
        stopScan();
        validateCode(result.content).then((isValid) => {
          if (isValid) {
            push(`/feed/${result.content}`);
          } else {
            // TODO: notify with wrong QR code
            push(`/feed`);
          }
        });
      }
    } else {
      console.log('no permission');
    }
  };

  const didUserGrantPermission = async () => {
    // check if user already granted permission
    const status = await BarcodeScanner.checkPermission({ force: false });

    if (status.granted) {
      // user granted permission
      return true;
    }

    if (status.denied) {
      // user denied permission
      return false;
    }

    if (status.asked) {
      // system requested the user for permission during this call
      // only possible when force set to true
    }

    if (status.neverAsked) {
      // user has not been requested this permission before
      // it is advised to show the user some sort of prompt
      // this way you will not waste your only chance to ask for the permission
      const c = confirm('We need your permission to use your camera to be able to scan barcodes');
      if (!c) {
        return false;
      }
    }

    if (status.restricted || status.unknown) {
      // ios only
      // probably means the permission has been denied
      return false;
    }

    // user has not denied permission
    // but the user also has not yet granted the permission
    // so request it
    const statusRequest = await BarcodeScanner.checkPermission({ force: true });

    if (statusRequest.asked) {
      // system requested the user for permission during this call
      // only possible when force set to true
    }

    if (statusRequest.granted) {
      // the user did grant the permission now
      return true;
    }

    // user did not grant the permission, so he must have declined the request
    return false;
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  };

  useIonViewDidEnter(() => {
    startScan()
      .catch((error) => console.log('error: ', error));

    return () => {
      stopScan();
      push('/feed');
    };
  }, []);

  useIonViewWillLeave(() => {
    stopScan();
  });

  return (
    <IonPage className="scanner-ui">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={stopScan}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default CodeScanner;
