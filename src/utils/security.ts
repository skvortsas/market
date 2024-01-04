import { Preferences } from '@capacitor/preferences';
import { FEED_STORAGE } from '@/utils/variables';

export const validateCode = async (scanResult: string) => {
  const { value } = await Preferences.get({ key: FEED_STORAGE });
  if (value) {
    const feed: Array<IFeedItem> = JSON.parse(value);
    const feedItem = feed.find((feedItem: IFeedItem) => feedItem.id === scanResult);

    return !!feedItem;
  }
  return false;
};