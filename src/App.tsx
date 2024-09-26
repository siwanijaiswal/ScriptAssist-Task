import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Navbar from './components/navbar/Navbar';
import { theme } from './theme';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { useSyncAuthState } from './store/app.store';

export default function App() {
  const { pathname } = useLocation();

  useSyncAuthState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </MantineProvider>
  );
}
