import { Outlet } from 'react-router-dom';
import Navbar     from './Navbar';
import Footer     from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#FFF8EE' }}>
      <ScrollToTop />
      <Navbar />
      <main style={{ flex:1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
