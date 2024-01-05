import dynamic from 'next/dynamic';

import { getFeed } from '@/utils/storage';

const AppShell = dynamic(() => import('@/components/AppShell'), {
  ssr: false,
});

const Index = async () => {
  return (
    <main>
      <AppShell />
    </main>
  );
};

// It would work if add a storage somewhere on a server
export const generateStaticParams = async () => {
  const feed = await getFeed();

  return feed.map((feedItem: IFeedItem) => feedItem.id);
};

export default Index;
