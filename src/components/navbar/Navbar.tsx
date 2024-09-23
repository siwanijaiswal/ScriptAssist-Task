import { signOutUser, auth } from '../../utils/firebase';
import { Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/users');
    }
  }, [user, loading]);

  const logout = () => {
    try {
      signOutUser()
        .then(() => {
          toast.success('user logged out');
          navigate('/');
        })
        .catch((error: any) => {
          toast.error(error.message);
        });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="navbar-menu">
      {user && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '1rem',
          }}
        >
          <Text weight={500} size={23} onClick={logout}>
            Logout
          </Text>
        </div>
      )}
    </div>
  );
};

export default Navbar;
