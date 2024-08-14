import { Outlet } from 'react-router-dom';
import GNB from './GNB/GNB';

function Layout() {
  return (
    <>
      <main>
        <GNB />
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
