import { Outlet } from 'react-router-dom';

import Footer from 'widgets/Footer';
import Header from 'widgets/Header';

const Layout = () => {
  return (
    <div className="grid h-screen gap-5 grid-rows-layout">
      <Header />
      <main className="container px-2.5 md:px-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
