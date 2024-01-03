import dynamic from 'next/dynamic';

const AppShell = dynamic(() => import('@/components/AppShell'), {
  ssr: false,
});

const Index = () => {
  return (
    <main>
      <AppShell />
    </main>
  );
};

export default Index;
