import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function BaseLayout() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
