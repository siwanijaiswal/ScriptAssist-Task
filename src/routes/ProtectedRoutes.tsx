import { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import { Navigate } from 'react-router-dom';
import { Loader } from '../components/common/Loader';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth);
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
