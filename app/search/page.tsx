import dynamic from 'next/dynamic';

const ClientSearchPage = dynamic(() => import('./ClientSearchPage'), {
  ssr: false,
});

export default function SearchPage() {
  return <ClientSearchPage />;
}
