import { useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader } from '../components/common/Loader';
import { toast } from 'react-toastify';
import { useAppStore } from '../store/app.store';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppStore((state: any) => state.user);
  const loading = useAppStore((state: any) => state.loading);
  const toastDisplayed = useRef(false);

  if (loading) {
    return <Loader />;
  }
  if (!user) {
    if (!toastDisplayed.current) {
      toast.info('Please login to continue...');
      toastDisplayed.current = true;
    }
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
