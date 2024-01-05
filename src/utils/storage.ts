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

const readImage = async (image?: UserPhoto) => {
  if (image) {
    const file = await Filesystem.readFile({
      path: image.filepath,
      directory: Directory.Data,
    });
    image.webviewPath = `data:image/jpeg;base64,${file.data}`;
  }
};

export const readCoverForFeedItem = async (feedItem: IFeedItem) => {
  const image = feedItem.images[0];
  await readImage(image);
};

export const readAllImagesForFeedItem = async (feedItem: IFeedItem) => {
  for (const image of feedItem.images) {
    await readImage(image);
  }
};
