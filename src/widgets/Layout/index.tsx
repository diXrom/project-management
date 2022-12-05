import { Outlet } from 'react-router-dom';

import Footer from 'widgets/Footer';
import Header from 'widgets/Header';
import { useInitApp } from 'widgets/Routes/model/useInitApp';

const Layout = () => {
  const load = useInitApp();
  if (load) return null;

  return (
    <div className="grid h-screen gap-4 grid-rows-layout">
      <Header />
      <main className="container px-2.5 md:px-5 w-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
