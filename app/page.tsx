import Header from '@/components/Header';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <LandingPage />
      </main>
    </div>
  );
}
