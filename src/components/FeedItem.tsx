import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import QRCode from 'react-qr-code';
import { Preferences } from '@capacitor/preferences';

import { FEED_STORAGE } from '@/utils/variables';

const FeedItem = () => {
  const [feedItem, setFeedItem] = useState(null);
  const params = useParams<{ id: string; }>();
  const { id } = params;

  const startScan = async () => {
    const granded = await didUserGrantPermission();
    if (granded) {
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        console.log(result.content);
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

  useEffect(() => {
    Preferences.get({ key: FEED_STORAGE })
      .then(({ value }) => {
        if (value) return JSON.parse(value);
        return [];
      })
      .then((feed) => {
        const desiredFeedItem = feed.find((feedItem: any) => feedItem.id === id);
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
        This page is for {id} feed item
        <IonButton onClick={startScan}>Scan</IonButton>
        <div style={{background: 'white', padding: '16px'}}>
          <QRCode value={id}/>
        </div>
        {
          feedItem && (
            <div>
              <div>{feedItem!.name}</div>
              <div>{feedItem!.description}</div>
              <div>{feedItem.price}</div>
            </div>
          )
        }
      </IonContent>
    </IonPage>
);
};

export default FeedItem;
