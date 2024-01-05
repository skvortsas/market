import { getFeedItemById } from '@/utils/storage';

export const validateCode = async (scanResult: string) => {
  const feedItem = await getFeedItemById(scanResult);
  return !!feedItem;
};
