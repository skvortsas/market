import {
  IonCol,
  IonContent,
  IonImg,
  IonRow,
} from '@ionic/react';
import QRAccordion from "@/components/QRAccordion";

const ItemContent = ({ feedItem }: { feedItem: IFeedItem | null }) => {
  if (!feedItem) return 'No such item';

  return (
    <IonContent>
      <IonRow>
        {
          feedItem.images.map((image) => (
            <IonCol key={image.webviewPath}>
              <IonImg src={image.webviewPath}/>
            </IonCol>
          ))
        }
      </IonRow>
      <h1>{feedItem.name}</h1>
      <p role="price" className="text-center text-gray-500 font-semibold">
        {feedItem.price} $
      </p>
      <p>{feedItem.description}</p>
      <QRAccordion qrValue={feedItem.id} />
    </IonContent>
  )
};

export default ItemContent;
