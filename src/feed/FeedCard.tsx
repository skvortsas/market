import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
} from '@ionic/react';

const FeedCard = ({ name, price, id, images }: IFeedItem) => {
  const cover = images[0];

  return (
    <IonCard routerLink={`/feed/${id}`}>
      <IonCardTitle className="text-center">
        {name}
      </IonCardTitle>
      <IonCardSubtitle className="text-center" role="price">
        {price} $
      </IonCardSubtitle>
      <IonCardContent>
        {
          cover
            ? <IonImg src={cover.webviewPath} className="-mb-4 -mx-4 rounded-b-md overflow-hidden" />
            : null
        }
      </IonCardContent>
    </IonCard>
  );
};

export default FeedCard;
