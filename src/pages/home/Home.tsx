import { FC } from 'react';
import { Title } from '@mantine/core';
import { SignUp } from '../../auth/SignUp/SignUp';

const Landing: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <SignUp style={{ height: 'auto', width: '30%' }} />
    </div>
  );
};

export default Landing;
