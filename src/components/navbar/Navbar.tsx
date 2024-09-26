import { signOutUser, auth } from '../../utils/firebase';
import { Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import ArrowIcon from '../../assets/arrow.png';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

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
          toast.success('Logged Out');
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
            justifyContent: 'space-between',
            margin: '1rem',
          }}
        >
          <Link to="/users">
            <Button
              color="blue"
              style={{
                width: '180px',
                marginLeft: '1rem',
              }}
              radius="xl"
            >
              <img
                src={ArrowIcon}
                width={30}
                height={30}
                alt="back_arrow"
                style={{ marginRight: '10px' }}
              />{' '}
              Back
            </Button>
          </Link>
          <Text weight={500} onClick={logout} className="logout-btn">
            Logout
          </Text>
        </div>
      )}
    </div>
  );
};

export default Navbar;
