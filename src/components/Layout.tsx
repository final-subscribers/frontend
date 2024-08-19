import { Outlet } from 'react-router-dom';
import GNB from './GNB/GNB';
import FAB from './common/FAB';

function Layout() {
  return (
    <>
      <GNB />
      <main>
        <Outlet />
        <FAB />
      </main>
    </>
  );
}

export default Layout;
