import { FormEvent, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonActionSheet,
  IonInput,
  IonItem,
  // IonImg,
  IonIcon,
  IonButton,
  IonLabel,
  IonTextarea
} from '@ionic/react';
import { useHistory } from 'react-router';
import { FEED_STORAGE } from '@/utils/variables';
import { usePhotoGallery, UserPhoto } from '@/hooks/usePhotoGallery';
import { trash, close, images } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';
import { fetchRandomUUID } from '@/utils/fetch/feed';

const Create = () => {
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const {
    // takePhoto,
    // pictures,
    deletePicture,
    pickPictures,
  } = usePhotoGallery();
  const { push } = useHistory();

  const createCard = async (event: FormEvent<Element>) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const name = data.get('name');
    const description = data.get('description');
    const price = data.get('price');
    // Generating id coz we can have the same name, description and price
    // so we can't use it as an id
    const uid = await fetchRandomUUID();
    const { value } = await Preferences.get({ key: FEED_STORAGE });
    const existingFeed = value ? JSON.parse(value) : [];
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
              required
            />
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
            />
          </IonItem>
          <IonItem>
            <IonInput
              name="price"
              label="Price:"
              labelPlacement="floating"
              type="number"
              fill="outline"
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
