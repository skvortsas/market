import { FormEvent, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonActionSheet,
  // IonCard,
  IonInput,
  // IonList,
  IonItem,
  // IonImg,
  IonIcon,
  IonButton,
  // IonText,
  // IonCardTitle,
  IonLabel, IonTextarea
} from '@ionic/react';
import { FEED_STORAGE } from '@/utils/variables';
import { usePhotoGallery, UserPhoto } from '@/hooks/usePhotoGallery';
import { trash, close, images } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';

const Create = () => {
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const {
    // takePhoto,
    // pictures,
    deletePicture,
    pickPictures,
  } = usePhotoGallery();

  const createCard = async (event: FormEvent<Element>) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const name = data.get('name');
    const description = data.get('description');
    const price = data.get('price');
    const { value } = await Preferences.get({ key: FEED_STORAGE });
    const existingFeed = value ? JSON.parse(value) : [];
    existingFeed.push({ name, description, price });
    Preferences.set({
      key: FEED_STORAGE,
      value: JSON.stringify(existingFeed),
    });
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
