import { FormEvent, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonActionSheet,
  IonInput,
  IonItem,
  IonImg,
  IonIcon,
  IonButton,
  IonLabel,
  IonTextarea,
  IonRow,
  IonGrid,
  IonCol
} from '@ionic/react';
import { useHistory } from 'react-router';
import { FEED_STORAGE } from '@/utils/variables';
import { usePhotoGallery } from '@/hooks/usePhotoGallery';
import { trash, close, images } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';
import { fetchRandomUUID } from '@/utils/fetch/feed';

import { getFeed } from '@/utils/storage';

const Create = () => {
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const {
    pictures,
    deletePicture,
    pickPictures,
  } = usePhotoGallery();
  const { push } = useHistory();

  const createCard = async (event: FormEvent<Element>) => {
    event.preventDefault();
    // Generating id coz we can have the same name, description and price
    // so we can't use it as an id
    const uid = await fetchRandomUUID();
    const existingFeed = await getFeed();
    // Better destruct array here than sort it on feed page
    // but if we would have filtering or any other types of sorting
    // I wouldn't bother do it here
    await Preferences.set({
      key: FEED_STORAGE,
      value: JSON.stringify([
        {
          name,
          description,
          price,
          id: uid,
          images: pictures,
        },
        ...existingFeed
      ]),
    });
    push(`/feed/${uid}`);
  };

  return (
    <IonPage>
      <IonContent>
        <form
          onSubmit={createCard}
          className="flex flex-col justify-center items-center gap-2 h-full"
        >
          <IonItem>
            <IonInput
              label="Name:"
              labelPlacement="floating"
              name="name"
              value={name}
              type="text"
              onIonInput={(e) => setName(e.target.value as string)}
              required
            />
          </IonItem>
          <IonItem>
            <IonGrid>
              <IonRow>
                {
                  pictures.map((picture) => <IonCol size="3" key={picture.webviewPath}>
                    <IonImg src={picture.webviewPath} onClick={() => setPhotoToDelete(picture)} />
                  </IonCol>)
                }
              </IonRow>
            </IonGrid>
          </IonItem>
          <IonButton onClick={pickPictures}>
            <IonIcon icon={images} size="medium" />
            <IonLabel className="ml-2">Add images</IonLabel>
          </IonButton>
          <IonItem>
            <IonTextarea
              name="description"
              label="Description:"
              labelPlacement="floating"
              value={description}
              onIonInput={(e) => setDescription(e.target.value as string)}
            />
          </IonItem>
          <IonItem>
            <IonInput
              name="price"
              label="Price:"
              labelPlacement="floating"
              type="number"
              value={price}
              onIonInput={(e) => setPrice(e.target.value as string)}
              required
            />
          </IonItem>
          <IonButton type="submit">
            <IonLabel>Create</IonLabel>
          </IonButton>
        </form>
        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[
            {
              text: 'Delete',
              role: 'destructive',
              icon: trash,
              handler: () => {
                if (photoToDelete) {
                  deletePicture(photoToDelete);
                  setPhotoToDelete(undefined);
                }
              },
            },
            {
              text: 'Cancel',
              icon: close,
              role: 'cancel',
            },
          ]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Create;
