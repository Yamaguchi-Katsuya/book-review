import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function BaseLayout() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  );
}
