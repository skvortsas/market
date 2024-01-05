import { Preferences } from '@capacitor/preferences';
import { Directory, Filesystem } from '@capacitor/filesystem';

import { FEED_STORAGE } from '@/utils/variables';

export const getFeed = async (): Promise<Array<IFeedItem>> => {
  const { value } = await Preferences.get({ key: FEED_STORAGE });
  return value ? JSON.parse(value) : [];
};

export const getFeedItemById = async (feedItemID: string): Promise<IFeedItem | undefined> => {
  const feed = await getFeed();
  const desiredFeedItem = feed.find((feedItem) => feedItem.id === feedItemID);
  return desiredFeedItem;
};

const readImage = async (image: UserPhoto): Promise<UserPhoto> => {
  const imageCopy: UserPhoto = { ...image };
  const file = await Filesystem.readFile({
    path: imageCopy.filepath,
    directory: Directory.Data,
  });
  imageCopy.webviewPath = `data:image/jpeg;base64,${file.data}`;
  return imageCopy;
};

export const readCoverForFeedItem = async (feedItem: IFeedItem) => {
  return readImage(feedItem.images[0]);
};

export const readAllImagesForFeedItem = async (feedItem: IFeedItem) => {
  const imagesPromises = feedItem.images.map((image) => readImage(image));
  return Promise.all(imagesPromises);
};
